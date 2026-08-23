// components/PdfDownloadButton.jsx
//
// Sends the current report (already computed client-side by riskAudit.js)
// to the serverless PDF function and triggers a browser download.

import { useState } from "react";

export default function PdfDownloadButton({ report }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleDownload() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/generate-pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ report }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || `Request failed (${res.status})`);
      }

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "language_risk_audit.pdf";
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <button
        onClick={handleDownload}
        disabled={!report || loading}
        className="px-4 py-2 rounded-md border font-medium disabled:opacity-50"
      >
        {loading ? "Generating PDF…" : "Download audit summary (PDF)"}
      </button>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
}
