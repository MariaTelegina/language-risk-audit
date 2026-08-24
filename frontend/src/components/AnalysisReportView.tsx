import React, { useState } from 'react';
import {
  AnalysisReport,
  CommunicationContext,
  EnglishVariety,
  RiskLevel,
  RiskCategory,
} from '../types';
import {
  AlertTriangle,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  Printer,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Info,
  Layers,
  Users,
} from 'lucide-react';

interface AnalysisReportViewProps {
  report: AnalysisReport;
  originalText: string;
  context: CommunicationContext;
  selectedAudiences: EnglishVariety[];
  isExample?: boolean;
}

const CATEGORY_LABELS: Record<RiskCategory, string> = {
  lexical: 'Lexical difference',
  idiom: 'Idiomatic expression',
  grammar: 'Grammatical syntax',
  pragmatics: 'Pragmatic nuance / Discourse',
  tone: 'Tone & Register',
  cultural_reference: 'Cultural reference',
  general_ambiguity: 'General ambiguity',
};

const RISK_BADGES: Record<
  RiskLevel,
  { label: string; bg: string; text: string; border: string; icon: React.ComponentType<{ className?: string }> }
> = {
  low: {
    label: 'Low Risk',
    bg: 'bg-emerald-50',
    text: 'text-emerald-800',
    border: 'border-emerald-200',
    icon: CheckCircle2,
  },
  medium: {
    label: 'Medium Risk',
    bg: 'bg-amber-50',
    text: 'text-amber-800',
    border: 'border-amber-200',
    icon: AlertTriangle,
  },
  high: {
    label: 'High Risk',
    bg: 'bg-rose-50',
    text: 'text-rose-800',
    border: 'border-rose-200',
    icon: AlertCircle,
  },
};

export const AnalysisReportView: React.FC<AnalysisReportViewProps> = ({
  report,
  originalText,
  context,
  selectedAudiences,
  isExample = false,
}) => {
  const [copiedRewrite, setCopiedRewrite] = useState(false);
  const [copiedFullReport, setCopiedFullReport] = useState(false);
  const [showMethodology, setShowMethodology] = useState(false);
  const [popupBlocked, setPopupBlocked] = useState(false);

  const riskBadge = RISK_BADGES[report.overallRisk] || RISK_BADGES.low;
  const RiskIcon = riskBadge.icon;

  const handleCopyRewrite = async () => {
    try {
      await navigator.clipboard.writeText(report.clearRewrite);
      setCopiedRewrite(true);
      setTimeout(() => setCopiedRewrite(false), 2000);
    } catch {
      // Fallback
    }
  };

  const handleCopyFullReport = async () => {
    const textSections = [
      `=== LANGUAGE RISK AUDIT REPORT ===`,
      `Original Message: "${originalText}"`,
      `Context: ${context}`,
      `Evaluated Audiences: ${selectedAudiences.join(', ')}`,
      `Overall Risk: ${report.overallRisk.toUpperCase()}`,
      `\nLikely Intended Meaning:`,
      report.intendedMeaning,
      `\nSummary:`,
      report.summary,
      report.riskItems.length > 0
        ? `\nFlagged Items:\n` +
          report.riskItems
            .map(
              (item, i) =>
                `${i + 1}. "${item.phrase}" [${CATEGORY_LABELS[item.category] || item.category}] (Risk: ${item.riskLevel})\n` +
                `   - Explanation: ${item.explanation}\n` +
                `   - Possible Reading: ${item.possibleReading}\n` +
                `   - Suggestion: ${item.suggestion}`
            )
            .join('\n\n')
        : `\nNo specific phrase-level friction flagged.`,
      `\nAudience-Specific Notes:\n` +
        report.audienceNotes
          .map(
            (note) =>
              `- ${note.audience}:\n  Likely reading: ${note.likelyReading}\n  Potential friction: ${note.potentialFriction}`
          )
          .join('\n\n'),
      `\nClear International Rewrite:\n"${report.clearRewrite}"`,
      `Rationale: ${report.rewriteRationale}`,
      `\n---\nDisclaimer: This prototype highlights possible differences in interpretation across English varieties. Individual language use and interpretation vary, so review the findings in context.`,
    ].join('\n');

    try {
      await navigator.clipboard.writeText(textSections);
      setCopiedFullReport(true);
      setTimeout(() => setCopiedFullReport(false), 2000);
    } catch {
      // Fallback
    }
  };

  // Isolated print document implementation
  const handlePrint = () => {
    setPopupBlocked(false);

    const reportElement = document.getElementById('printable-report');
    if (!reportElement) return;

    // Open a new temporary browser window directly from user click
    const printWindow = window.open('', '_blank', 'width=850,height=950');

    if (!printWindow) {
      setPopupBlocked(true);
      return;
    }

    // Clone only the printable report
    const clone = reportElement.cloneNode(true) as HTMLElement;

    // Remove all .no-print elements from the cloned report
    const noPrintElements = clone.querySelectorAll('.no-print');
    noPrintElements.forEach((el) => el.remove());

    // Gather active stylesheets and style tags
    let stylesHtml = '';
    const styleNodes = document.querySelectorAll('style, link[rel="stylesheet"]');
    styleNodes.forEach((node) => {
      stylesHtml += node.outerHTML;
    });

    const printDocumentHtml = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Language Risk Audit Report</title>
    <base href="${window.location.origin}/" />
    ${stylesHtml}
    <style>
      @page {
        margin: 16mm;
        size: auto;
      }
      *, *::before, *::after {
        box-sizing: border-box;
      }
      html, body {
        margin: 0 !important;
        padding: 0 !important;
        background: #ffffff !important;
        color: #0f172a !important;
        font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
        font-size: 11pt;
        line-height: 1.5;
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      }
      .no-print {
        display: none !important;
      }
      .print-card {
        break-inside: avoid !important;
        page-break-inside: avoid !important;
      }
      #printable-report {
        display: block !important;
        position: static !important;
        width: 100% !important;
        margin: 0 !important;
        padding: 0 !important;
        transform: none !important;
      }
    </style>
  </head>
  <body>
    <div id="printable-report">
      ${clone.innerHTML}
    </div>
  </body>
</html>`;

    printWindow.document.open();
    printWindow.document.write(printDocumentHtml);
    printWindow.document.close();

    const triggerPrint = () => {
      try {
        printWindow.focus();
        printWindow.print();
      } catch (err) {
        console.error('Print trigger failed:', err);
      }
    };

    // Close after print
    printWindow.addEventListener('afterprint', () => {
      try {
        printWindow.close();
      } catch {}
    });

    // Wait until document and stylesheets load before printing
    if (printWindow.document.readyState === 'complete') {
      setTimeout(triggerPrint, 250);
    } else {
      printWindow.onload = () => {
        setTimeout(triggerPrint, 250);
      };
    }
  };

  return (
    <div
      id="printable-report"
      className="printable-report space-y-6 pt-4 print:pt-0 print:space-y-4"
    >
      {/* Popup blocked warning message */}
      {popupBlocked && (
        <div className="p-4 bg-amber-50 border border-amber-300 rounded-lg flex items-start space-x-2.5 text-xs text-amber-900 no-print">
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <strong className="font-semibold block mb-0.5">Pop-up window blocked</strong>
            <span>
              Please allow pop-ups for this site in your browser settings to print or save the
              report as PDF, then click <strong>Print / Save PDF</strong> again.
            </span>
          </div>
        </div>
      )}

      {/* Example Notice Banner (no-print) */}
      {isExample && (
        <div className="p-3 bg-blue-50/70 border border-blue-200 rounded-lg flex items-center justify-between text-xs text-blue-800 no-print">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-blue-600 shrink-0" />
            <span className="font-medium">Example analysis — no live AI request used.</span>
          </div>
          <span className="text-[11px] text-blue-600 bg-white px-2 py-0.5 rounded border border-blue-200">
            Instant Reference
          </span>
        </div>
      )}

      {/* Main Report Container */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden print:border print:border-slate-300 print:shadow-none">
        {/* Header summary strip */}
        <div className="p-6 border-b border-slate-200 bg-slate-50/50 print:bg-white print:border-slate-300 print:p-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="flex items-center space-x-2 mb-1.5">
                <span
                  className={`inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${riskBadge.bg} ${riskBadge.text} ${riskBadge.border} print:border print:border-slate-400`}
                >
                  <RiskIcon className="w-3.5 h-3.5" />
                  <span>{riskBadge.label}</span>
                </span>
                <span className="text-xs text-slate-500 font-medium">
                  Context: <strong className="text-slate-700">{context}</strong>
                </span>
                <span className="text-xs text-slate-400">·</span>
                <span className="text-xs text-slate-500 font-medium">
                  Audiences: <strong className="text-slate-700">{selectedAudiences.join(', ')}</strong>
                </span>
              </div>
              <h2 className="text-xl font-bold text-slate-900 print:text-lg">
                Language Risk Audit Report
              </h2>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex items-center flex-wrap gap-2 no-print">
              <button
                type="button"
                onClick={handleCopyFullReport}
                className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-md text-xs font-medium bg-white text-slate-700 hover:bg-slate-50 border border-slate-200 shadow-2xs transition-colors"
                title="Copy structured report to clipboard"
              >
                {copiedFullReport ? (
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                ) : (
                  <Copy className="w-3.5 h-3.5 text-slate-400" />
                )}
                <span>{copiedFullReport ? 'Report Copied' : 'Copy Full Report'}</span>
              </button>

              <button
                type="button"
                onClick={handlePrint}
                className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-md text-xs font-medium bg-white text-slate-700 hover:bg-slate-50 border border-slate-200 shadow-2xs transition-colors"
                title="Print or export as PDF"
              >
                <Printer className="w-3.5 h-3.5 text-slate-400" />
                <span>Print / Save PDF</span>
              </button>
            </div>
          </div>

          {/* Original Message Display */}
          <div className="mt-4 p-3 bg-white rounded-lg border border-slate-200 print:border-slate-300">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
              Checked Message
            </span>
            <p className="text-sm font-medium text-slate-900 italic font-serif">
              "{originalText}"
            </p>
          </div>

          {/* Executive Summary & Intended Meaning */}
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg border border-slate-200 print-card print:border-slate-300 print:p-3">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                Likely Intended Meaning
              </span>
              <p className="text-sm font-medium text-slate-900 leading-relaxed">
                {report.intendedMeaning}
              </p>
            </div>

            <div className="bg-white p-4 rounded-lg border border-slate-200 print-card print:border-slate-300 print:p-3">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                Audit Summary
              </span>
              <p className="text-sm text-slate-700 leading-relaxed">{report.summary}</p>
            </div>
          </div>

          {/* Low risk callout if no friction */}
          {report.overallRisk === 'low' && (
            <div className="mt-4 p-3.5 bg-emerald-50/60 border border-emerald-200 rounded-lg flex items-start space-x-2.5 text-xs text-emerald-900 print-card print:bg-white print:border-slate-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="font-semibold block mb-0.5">
                  No clear variety-specific concern was identified
                </strong>
                <span>
                  The message uses terminology and syntax that should travel smoothly across the
                  selected varieties without substantial interpretation friction.
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Clear International Rewrite Section */}
        <div className="p-6 bg-blue-50/30 border-b border-slate-200 print-card print:bg-white print:border-slate-300 print:p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                Clearer International Rewrite
              </h3>
            </div>
            <button
              type="button"
              onClick={handleCopyRewrite}
              className="no-print inline-flex items-center space-x-1.5 px-3 py-1 rounded-md text-xs font-semibold text-blue-700 bg-white hover:bg-blue-50 border border-blue-200 shadow-2xs transition-colors"
            >
              {copiedRewrite ? (
                <Check className="w-3.5 h-3.5 text-emerald-600" />
              ) : (
                <Copy className="w-3.5 h-3.5 text-blue-500" />
              )}
              <span>{copiedRewrite ? 'Copied' : 'Copy Rewrite'}</span>
            </button>
          </div>

          <div className="bg-white p-4 rounded-lg border border-blue-200 shadow-2xs print:border-slate-300 print:shadow-none">
            <p className="text-base font-semibold text-slate-900 leading-relaxed font-sans">
              "{report.clearRewrite}"
            </p>
            {report.rewriteRationale && (
              <p className="mt-2 text-xs text-slate-600 border-t border-slate-100 pt-2 leading-relaxed print:border-slate-200">
                <strong className="text-slate-700">Rationale: </strong>
                {report.rewriteRationale}
              </p>
            )}
          </div>
        </div>

        {/* Flagged Phrases (if any) */}
        {report.riskItems.length > 0 && (
          <div className="p-6 border-b border-slate-200 print:border-slate-300 print:p-4">
            <div className="flex items-center space-x-2 mb-4">
              <Layers className="w-4 h-4 text-slate-600" />
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                Flagged Phrases & Interpretations ({report.riskItems.length})
              </h3>
            </div>

            <div className="space-y-4">
              {report.riskItems.map((item, idx) => {
                const itemRisk = RISK_BADGES[item.riskLevel] || RISK_BADGES.low;
                return (
                  <div
                    key={idx}
                    className="print-card p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-3 print:bg-white print:border-slate-300 print:p-3"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center space-x-2">
                        <span className="font-mono text-sm font-bold text-slate-900 bg-white px-2 py-0.5 rounded border border-slate-200 print:border-slate-300">
                          "{item.phrase}"
                        </span>
                        <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-slate-200/70 text-slate-700 print:bg-slate-100">
                          {CATEGORY_LABELS[item.category] || item.category}
                        </span>
                      </div>

                      <div className="flex items-center space-x-2">
                        <span
                          className={`text-[11px] font-semibold px-2 py-0.5 rounded border ${itemRisk.bg} ${itemRisk.text} ${itemRisk.border} print:border-slate-400`}
                        >
                          {itemRisk.label}
                        </span>
                        <span className="text-[11px] text-slate-500 font-medium">
                          Confidence: {item.confidence}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                      <div className="bg-white p-3 rounded border border-slate-200 print:border-slate-300">
                        <span className="font-semibold text-slate-700 block mb-0.5">
                          Linguistic Explanation
                        </span>
                        <p className="text-slate-600 leading-relaxed">{item.explanation}</p>
                      </div>

                      <div className="bg-white p-3 rounded border border-slate-200 print:border-slate-300">
                        <span className="font-semibold text-slate-700 block mb-0.5">
                          Possible Alternative Reading
                        </span>
                        <p className="text-slate-600 leading-relaxed">{item.possibleReading}</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-200/60 text-xs print:border-slate-200">
                      <div className="flex items-center space-x-1.5">
                        <span className="text-slate-500 font-medium">Relevant Audiences:</span>
                        <div className="flex flex-wrap gap-1">
                          {item.relevantAudiences.map((aud, aIdx) => (
                            <span
                              key={aIdx}
                              className="px-2 py-0.5 bg-white text-slate-700 rounded border border-slate-200 font-medium text-[11px] print:border-slate-300"
                            >
                              {aud}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center space-x-1.5">
                        <span className="text-slate-500 font-medium">Suggested Alternative:</span>
                        <span className="font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200 print:bg-white print:border-slate-300 print:text-slate-900">
                          {item.suggestion}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Audience-by-Audience Notes */}
        <div className="p-6 print:p-4">
          <div className="flex items-center space-x-2 mb-4">
            <Users className="w-4 h-4 text-slate-600" />
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Audience-Specific Perspectives ({report.audienceNotes.length})
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 print:grid-cols-3 print:gap-3">
            {report.audienceNotes.map((note, idx) => (
              <div
                key={idx}
                className="print-card p-4 bg-slate-50 rounded-lg border border-slate-200 flex flex-col justify-between print:bg-white print:border-slate-300 print:p-3"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-xs text-slate-900">{note.audience}</span>
                    <span className="text-[10px] uppercase font-semibold text-slate-400">
                      Conf: {note.confidence}
                    </span>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div>
                      <span className="text-slate-500 font-medium block text-[11px]">
                        Likely Reading:
                      </span>
                      <p className="text-slate-800 leading-relaxed">{note.likelyReading}</p>
                    </div>

                    <div className="pt-2 border-t border-slate-200/60 print:border-slate-200">
                      <span className="text-slate-500 font-medium block text-[11px]">
                        Potential Friction:
                      </span>
                      <p className="text-slate-700 leading-relaxed">{note.potentialFriction}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mandatory Essential Disclaimer */}
      <div className="print-card p-4 bg-slate-100 rounded-lg border border-slate-200 text-xs text-slate-600 leading-relaxed flex items-start space-x-2.5 print:bg-white print:border-slate-300 print:p-3">
        <Info className="w-4 h-4 text-slate-500 shrink-0 mt-0.5 no-print" />
        <p>
          This prototype highlights possible differences in interpretation across English varieties.
          Individual language use and interpretation vary, so review the findings in context.
        </p>
      </div>

      {/* Expandable Method and Limitations (hidden in print) */}
      <div className="border border-slate-200 rounded-lg bg-white overflow-hidden no-print">
        <button
          type="button"
          onClick={() => setShowMethodology(!showMethodology)}
          className="w-full px-4 py-3 bg-slate-50 hover:bg-slate-100/80 flex items-center justify-between text-xs font-semibold text-slate-700 transition-colors"
        >
          <span>Method and limitations</span>
          {showMethodology ? (
            <ChevronUp className="w-4 h-4 text-slate-500" />
          ) : (
            <ChevronDown className="w-4 h-4 text-slate-500" />
          )}
        </button>

        {showMethodology && (
          <div className="p-4 text-xs text-slate-600 space-y-2 leading-relaxed border-t border-slate-200 bg-white">
            <ul className="list-disc list-inside space-y-1.5 text-slate-600">
              <li>
                <strong>Scope:</strong> The MVP currently considers American English, Indian English,
                and Singapore English.
              </li>
              <li>
                <strong>Engine:</strong> The analysis is generated using a research-informed
                linguistic framework and Gemini.
              </li>
              <li>
                <strong>Validation Status:</strong> It has not yet been comprehensively validated by
                speakers of all three varieties.
              </li>
              <li>
                <strong>Future Work:</strong> Multi-VALUE integration and systematic human evaluation
                are planned for subsequent milestones.
              </li>
              <li>
                <strong>Intended Use:</strong> Results should be treated as prompts for thoughtful
                review, not authoritative linguistic evidence.
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
