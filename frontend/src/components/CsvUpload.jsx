// components/CsvUpload.jsx
//
// Lets a user upload their own model's rubric scores as a CSV, parses it
// entirely in the browser (PapaParse), validates required columns, scores
// it with the same engine used for the demo dataset, and renders a report.
//
// Expected CSV columns (matches the internal Test Runs rubric):
//   case_id, variety, meaning, variety_awareness, risk_identification,
//   non_stereotyping, recommendation, confidence, failure_label, priority
// Score columns are 0/1/2. failure_label and priority are optional.

import { useState, useCallback } from "react";
import Papa from "papaparse";
import { buildReport, RUBRIC_FIELDS } from "../lib/riskAudit";

const REQUIRED_COLUMNS = ["case_id", "variety", ...RUBRIC_FIELDS];

export default function CsvUpload({ onReportReady }) {
  const [status, setStatus] = useState("idle"); // idle | parsing | error | done
  const [error, setError] = useState(null);
  const [fileName, setFileName] = useState(null);

  const handleFile = useCallback(
    (file) => {
      if (!file) return;
      setFileName(file.name);
      setStatus("parsing");
      setError(null);

      // PapaParse does the heavy lifting: streams the file, infers types
      // with dynamicTyping (so "2" becomes the number 2, not a string),
      // and hands back clean row objects keyed by header — no server call.
      Papa.parse(file, {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
        complete: (results) => {
          if (results.errors.length) {
            setStatus("error");
            setError(`CSV parse error: ${results.errors[0].message}`);
            return;
          }

          const rows = results.data;
          const columns = results.meta.fields || [];
          const missing = REQUIRED_COLUMNS.filter((c) => !columns.includes(c));
          if (missing.length) {
            setStatus("error");
            setError(`Missing required columns: ${missing.join(", ")}`);
            return;
          }

          const cases = rows.map((row) => {
            const scores = {};
            const pass_fail = {};
            for (const field of RUBRIC_FIELDS) {
              const val = row[field];
              scores[field] = val ?? null;
              pass_fail[field] = val === 2;
            }
            return {
              case_id: String(row.case_id),
              variety: String(row.variety),
              scores,
              pass_fail,
              failure_label: row.failure_label || "NO_FAILURE",
              priority: row.priority || null,
              notes: row.notes || null,
            };
          });

          const baseline = cases[0]?.variety || "American English";
          const report = buildReport(cases, baseline);

          setStatus("done");
          onReportReady?.(report, cases);
        },
        error: (err) => {
          setStatus("error");
          setError(err.message);
        },
      });
    },
    [onReportReady]
  );

  return (
    <div className="border border-dashed rounded-lg p-6 text-center">
      <input
        type="file"
        accept=".csv"
        id="csv-upload"
        className="hidden"
        onChange={(e) => handleFile(e.target.files?.[0])}
      />
      <label htmlFor="csv-upload" className="cursor-pointer inline-block px-4 py-2 rounded-md border">
        {fileName ? `Change file (${fileName})` : "Upload your model results (.csv)"}
      </label>

      {status === "parsing" && <p className="mt-3 text-sm text-gray-500">Parsing…</p>}
      {status === "error" && <p className="mt-3 text-sm text-red-600">{error}</p>}
      {status === "done" && <p className="mt-3 text-sm text-green-600">Report generated below.</p>}

      <p className="mt-4 text-xs text-gray-400">
        Required columns: {REQUIRED_COLUMNS.join(", ")}
      </p>
    </div>
  );
}
