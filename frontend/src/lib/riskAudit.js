// lib/riskAudit.js
//
// Direct port of risk_audit.py. Pure functions, no side effects — used by
// both the CSV upload flow and the precomputed demo dataset, so the exact
// same math produces the dashboard numbers and the PDF report.

export const RUBRIC_FIELDS = [
  "meaning",
  "variety_awareness",
  "risk_identification",
  "non_stereotyping",
  "recommendation",
  "confidence",
];

export const DEFAULT_BASELINE = "American English";

/** Per-variety pass rate for each rubric dimension, plus overall. */
export function varietyBreakdown(cases) {
  const byVariety = {};

  for (const c of cases) {
    const variety = c.variety || "Unknown";
    if (!byVariety[variety]) {
      byVariety[variety] = Object.fromEntries(RUBRIC_FIELDS.map((f) => [f, []]));
    }
    for (const field of RUBRIC_FIELDS) {
      const val = c.pass_fail?.[field];
      if (val !== null && val !== undefined) byVariety[variety][field].push(val);
    }
  }

  const result = {};
  for (const [variety, fields] of Object.entries(byVariety)) {
    const fieldRates = {};
    const allVals = [];
    for (const [field, vals] of Object.entries(fields)) {
      if (vals.length) {
        fieldRates[field] = round1((100 * sum(vals)) / vals.length);
        allVals.push(...vals);
      }
    }
    const overall = allVals.length ? round1((100 * sum(allVals)) / allVals.length) : null;
    result[variety] = {
      overall_accuracy: overall,
      by_dimension: fieldRates,
      case_count: fields[RUBRIC_FIELDS[0]].length,
    };
  }
  return result;
}

/** Percentage-point gap of each variety's overall accuracy vs baseline. */
export function baselineGaps(breakdown, baseline = DEFAULT_BASELINE) {
  const base = breakdown[baseline];
  if (!base || base.overall_accuracy === null) return {};
  const gaps = {};
  for (const [variety, stats] of Object.entries(breakdown)) {
    if (variety === baseline || stats.overall_accuracy === null) continue;
    gaps[variety] = round1(base.overall_accuracy - stats.overall_accuracy);
  }
  return gaps;
}

export function failureTypeCounts(cases) {
  const counts = {};
  for (const c of cases) {
    const label = c.failure_label || "NO_FAILURE";
    counts[label] = (counts[label] || 0) + 1;
  }
  return Object.fromEntries(Object.entries(counts).sort((a, b) => b[1] - a[1]));
}

/** Highest-priority failing cases, for the "priority risk" callout line. */
export function priorityRiskSummary(cases, topN = 3) {
  const priorityOrder = { P0: 0, P1: 1, P2: 2 };
  const failing = cases.filter((c) => c.failure_label && c.failure_label !== "NO_FAILURE");
  failing.sort((a, b) => (priorityOrder[a.priority] ?? 99) - (priorityOrder[b.priority] ?? 99));
  return failing.slice(0, topN).map((c) => ({
    case_id: c.case_id,
    variety: c.variety,
    failure_label: c.failure_label,
    priority: c.priority,
    notes: c.notes,
  }));
}

/** Full risk audit report — what the dashboard and PDF both consume. */
export function buildReport(cases, baseline = DEFAULT_BASELINE) {
  const breakdown = varietyBreakdown(cases);
  const gaps = baselineGaps(breakdown, baseline);
  const failures = failureTypeCounts(cases);
  const topRisks = priorityRiskSummary(cases);

  const overallVals = Object.values(breakdown).map((s) => s.overall_accuracy || 0);
  const overallAccuracy = overallVals.length ? round1(sum(overallVals) / overallVals.length) : null;

  const largestGapVariety = Object.keys(gaps).length
    ? Object.entries(gaps).reduce((a, b) => (b[1] > a[1] ? b : a))[0]
    : null;

  return {
    sample_size: cases.length,
    overall_accuracy: overallAccuracy,
    baseline_variety: baseline,
    by_variety: breakdown,
    gaps_vs_baseline: gaps,
    largest_gap: {
      variety: largestGapVariety,
      points: largestGapVariety ? gaps[largestGapVariety] : null,
    },
    failure_type_counts: failures,
    priority_risks: topRisks,
  };
}

// --- helpers ---
function sum(arr) {
  return arr.reduce((a, b) => a + b, 0);
}
function round1(n) {
  return Math.round(n * 10) / 10;
}
