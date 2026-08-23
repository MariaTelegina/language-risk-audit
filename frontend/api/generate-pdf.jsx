// api/generate-pdf.jsx
//
// Single Vercel serverless function — this is the "minimal serverless
// function" we discussed instead of a full Flask service. Takes a report
// object (same shape buildReport() produces) and streams back a styled PDF.
//
// Uses @react-pdf/renderer: pure JS PDF rendering, no headless browser, so
// it stays well within Vercel's function size/time limits.
//
// npm install @react-pdf/renderer
//
// NOTE on the .jsx extension: Vercel's Node builder (esbuild-based) needs
// the .jsx extension to transform JSX in API routes. If your build setup
// complains, swap the JSX below for React.createElement(...) calls instead.

import React from "react";
import { renderToStream } from "@react-pdf/renderer";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: { padding: 40, fontSize: 11, fontFamily: "Helvetica" },
  title: { fontSize: 20, marginBottom: 4, fontWeight: 700 },
  subtitle: { fontSize: 11, color: "#666", marginBottom: 20 },
  sectionHeading: { fontSize: 13, fontWeight: 700, marginTop: 18, marginBottom: 8 },
  statRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 6 },
  statLabel: { color: "#444" },
  statValue: { fontWeight: 700 },
  varietyRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  gapCallout: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#FEF3EF",
    borderRadius: 4,
  },
  riskRow: { marginBottom: 8 },
  riskLabel: { fontWeight: 700 },
  footer: { position: "absolute", bottom: 30, left: 40, right: 40, fontSize: 9, color: "#999" },
});

function ReportDocument({ report }) {
  const baselineStats = report.by_variety[report.baseline_variety] || {};

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>Language Risk Audit — Summary</Text>
        <Text style={styles.subtitle}>
          {report.sample_size} cases evaluated · Generated {new Date().toLocaleDateString()}
        </Text>

        <View style={styles.statRow}>
          <Text style={styles.statLabel}>Overall accuracy</Text>
          <Text style={styles.statValue}>{report.overall_accuracy}%</Text>
        </View>
        <View style={styles.statRow}>
          <Text style={styles.statLabel}>Baseline ({report.baseline_variety})</Text>
          <Text style={styles.statValue}>{baselineStats.overall_accuracy}%</Text>
        </View>

        {report.largest_gap.variety && (
          <View style={styles.gapCallout}>
            <Text>
              Largest gap: {report.largest_gap.variety} scores {report.largest_gap.points} points
              below the {report.baseline_variety} baseline.
            </Text>
          </View>
        )}

        <Text style={styles.sectionHeading}>Accuracy by variety</Text>
        {Object.entries(report.by_variety).map(([variety, stats]) => (
          <View key={variety} style={styles.varietyRow}>
            <Text>{variety}</Text>
            <Text>
              {stats.overall_accuracy}% ({stats.case_count} cases)
            </Text>
          </View>
        ))}

        <Text style={styles.sectionHeading}>Failure types</Text>
        {Object.entries(report.failure_type_counts).map(([label, count]) => (
          <View key={label} style={styles.varietyRow}>
            <Text>{label}</Text>
            <Text>{count}</Text>
          </View>
        ))}

        <Text style={styles.sectionHeading}>Priority risks requiring review</Text>
        {report.priority_risks.map((risk) => (
          <View key={risk.case_id} style={styles.riskRow}>
            <Text style={styles.riskLabel}>
              [{risk.priority}] {risk.case_id} — {risk.variety}
            </Text>
            <Text>{risk.failure_label}{risk.notes ? `: ${risk.notes}` : ""}</Text>
          </View>
        ))}

        <Text style={styles.footer}>
          Language Risk Audit · Provider-independent multilingual evaluation tool
        </Text>
      </Page>
    </Document>
  );
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Use POST with a report object in the body." });
  }

  const { report } = req.body;
  if (!report) {
    return res.status(400).json({ error: "Missing 'report' in request body." });
  }

  try {
    const stream = await renderToStream(<ReportDocument report={report} />);
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", 'attachment; filename="language_risk_audit.pdf"');
    stream.pipe(res);
  } catch (err) {
    res.status(500).json({ error: `PDF generation failed: ${err.message}` });
  }
}
