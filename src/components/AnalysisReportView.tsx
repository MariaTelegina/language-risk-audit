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
  Layers,
  Users,
  Compass,
  FileText,
  Lightbulb,
} from 'lucide-react';
import { RiskGaugeDial } from './RiskGaugeDial';
import { AudienceAccordion } from './AudienceAccordion';

interface AnalysisReportViewProps {
  report: AnalysisReport;
  originalText: string;
  context: CommunicationContext;
  selectedAudiences: EnglishVariety[];
  isExample?: boolean;
}

const CATEGORY_LABELS: Record<RiskCategory, string> = {
  lexical: 'Lexical Difference',
  idiom: 'Idiomatic Expression',
  grammar: 'Grammar & Syntax',
  pragmatics: 'Pragmatic Nuance',
  tone: 'Tone & Register',
  cultural_reference: 'Cultural Reference',
  general_ambiguity: 'General Ambiguity',
};

const RISK_CONFIG: Record<
  RiskLevel,
  { label: string; badgeClass: string; icon: React.ComponentType<{ className?: string }> }
> = {
  low: {
    label: 'Low Risk',
    badgeClass: 'badge-green-editorial',
    icon: CheckCircle2,
  },
  medium: {
    label: 'Medium Risk',
    badgeClass: 'badge-terracotta',
    icon: AlertTriangle,
  },
  high: {
    label: 'High Risk',
    badgeClass: 'badge-terracotta',
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

  const riskConfig = RISK_CONFIG[report.overallRisk] || RISK_CONFIG.low;
  const RiskIcon = riskConfig.icon;

  const handleCopyRewrite = async () => {
    try {
      await navigator.clipboard.writeText(report.clearRewrite);
      setCopiedRewrite(true);
      setTimeout(() => setCopiedRewrite(false), 2000);
    } catch {}
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
                `   - Linguistic Explanation: ${item.explanation}\n` +
                `   - Alternative Reading: ${item.possibleReading}\n` +
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
    } catch {}
  };

  const handlePrint = () => {
    setPopupBlocked(false);

    const reportElement = document.getElementById('printable-report');
    if (!reportElement) return;

    const printWindow = window.open('', '_blank', 'width=850,height=950');

    if (!printWindow) {
      setPopupBlocked(true);
      return;
    }

    const clone = reportElement.cloneNode(true) as HTMLElement;
    const noPrintElements = clone.querySelectorAll('.no-print');
    noPrintElements.forEach((el) => el.remove());

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
      @page { margin: 12mm; size: auto; }
      body { margin: 0 !important; padding: 0 !important; background: #ffffff !important; color: #242a36 !important; font-family: 'DM Sans', sans-serif; }
      .no-print { display: none !important; }
      .print-card { break-inside: avoid !important; page-break-inside: avoid !important; }
      #printable-report { display: block !important; width: 100% !important; margin: 0 !important; padding: 0 !important; }
    </style>
  </head>
  <body>
    <div id="printable-report">${clone.innerHTML}</div>
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
        console.error('Print failed:', err);
      }
    };

    printWindow.addEventListener('afterprint', () => {
      try {
        printWindow.close();
      } catch {}
    });

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
      {/* Pop-up blocked notice */}
      {popupBlocked && (
        <div className="p-4 bg-[#FFF6E6] border border-[#F5C26B] rounded-xl flex items-start space-x-3 text-xs text-[#82540D] no-print shadow-sm">
          <AlertTriangle className="w-4 h-4 text-[#DE5736] shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <strong className="font-bold block mb-0.5 font-mono-tag">POP-UP WINDOW WAS BLOCKED</strong>
            <span>
              Please allow pop-ups for this site in your browser to print or export as PDF, then click <strong>PRINT / PDF</strong> again.
            </span>
          </div>
        </div>
      )}

      {/* Example badge */}
      {isExample && (
        <div className="p-3.5 bg-[#FCECE8] border border-[#F5C6BC] rounded-xl flex items-center justify-between text-xs text-[#B83B1D] no-print shadow-sm">
          <div className="flex items-center space-x-2">
            <span className="badge-terracotta text-[10px] py-0.5 px-2.5 font-mono-tag">CASE STUDY</span>
            <span className="font-medium">Loaded from pre-verified linguistic archive.</span>
          </div>
          <span className="text-[10px] font-mono-tag text-[#DE5736] bg-white px-2.5 py-0.5 rounded-full border border-[#F5C6BC] shadow-2xs">
            BENCHMARK
          </span>
        </div>
      )}

      {/* Main Slide-Card Analysis Spread */}
      <div
        id="report-overview"
        className="slide-frame rounded-2xl border-2 border-[#E6DDD1] overflow-hidden print:border-slate-300 shadow-md warm-card"
      >
        {/* Top Header Bar & Metadata */}
        <div className="p-6 sm:p-7 border-b border-[#E6DDD1] bg-[#FAF5EE] print:bg-white print:p-4">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div>
              {/* Tags */}
              <div className="flex flex-wrap items-center gap-2 mb-2.5">
                <span className={riskConfig.badgeClass}>
                  <RiskIcon className="w-3.5 h-3.5" />
                  <span>{riskConfig.label}</span>
                </span>

                <span className="badge-antwerp">
                  <Compass className="w-3 h-3" />
                  <span>Context: {context}</span>
                </span>

                <span className="text-xs font-mono-tag text-[#006C7E] bg-[#E6F6F9] px-3 py-1 rounded-full border border-[#BCE4ED] font-bold shadow-2xs">
                  Audiences: {selectedAudiences.join(', ')}
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold text-[#242A36] font-serif-display tracking-tight">
                Cross-Variety Clarity Breakdown
              </h2>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-2 no-print shrink-0">
              <button
                type="button"
                onClick={handleCopyFullReport}
                className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold font-mono-tag bg-[#FFFDF9] text-[#463D31] hover:bg-[#F3ECE0] border border-[#D9CFC2] transition-all cursor-pointer shadow-xs hover:shadow-sm"
                title="Copy structured insights"
              >
                {copiedFullReport ? (
                  <Check className="w-3.5 h-3.5 text-[#187557]" />
                ) : (
                  <Copy className="w-3.5 h-3.5 text-[#7A7061]" />
                )}
                <span>{copiedFullReport ? 'COPIED' : 'COPY REPORT'}</span>
              </button>

              <button
                type="button"
                onClick={handlePrint}
                className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold font-mono-tag bg-[#FFFDF9] text-[#463D31] hover:bg-[#F3ECE0] border border-[#D9CFC2] transition-all cursor-pointer shadow-xs hover:shadow-sm"
                title="Print or Save PDF"
              >
                <Printer className="w-3.5 h-3.5 text-[#7A7061]" />
                <span>PRINT / PDF</span>
              </button>
            </div>
          </div>

          {/* Evaluated Original Message */}
          <div className="mt-5 p-4 sm:p-5 bg-[#FFFDF9] rounded-xl border-2 border-[#E2D8CB] relative shadow-inner warm-input">
            <span className="text-[10px] font-mono-tag font-bold text-[#E48C35] uppercase tracking-wider block mb-1">
              Your Message
            </span>
            <p className="text-base font-semibold text-[#242A36] italic font-serif leading-relaxed">
              “{originalText}”
            </p>
          </div>

          {/* Layout Grid: Gauge Dial & Breakdown Cards */}
          <div className="mt-5 grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
            {/* Dialect Risk Gauge Card (5 cols on lg) */}
            <div className="lg:col-span-5 flex">
              <RiskGaugeDial riskLevel={report.overallRisk} className="w-full h-full" />
            </div>

            {/* Meaning and Summary Cards (7 cols on lg) */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-3.5">
              <div className="bg-[#FFF8EC] p-4.5 rounded-xl border-t-4 border-t-[#E48C35] border-x border-b border-[#FFE2A8] print-card flex-1 shadow-sm warm-elevated">
                <span className="text-[10px] font-mono-tag font-bold text-[#C97420] uppercase tracking-wider block mb-1">
                  What You Intended to Say
                </span>
                <p className="text-xs sm:text-sm font-medium text-[#242A36] leading-relaxed">
                  {report.intendedMeaning}
                </p>
              </div>

              <div className="bg-[#EBF7FA] p-4.5 rounded-xl border-t-4 border-t-[#008AA1] border-x border-b border-[#BCE4ED] print-card flex-1 shadow-sm warm-elevated">
                <span className="text-[10px] font-mono-tag font-bold text-[#006C7E] uppercase tracking-wider block mb-1">
                  How It Reads Across Regions
                </span>
                <p className="text-xs sm:text-sm text-[#38484E] leading-relaxed">
                  {report.summary}
                </p>
              </div>
            </div>
          </div>

          {/* Low risk confirmation banner if applicable */}
          {report.overallRisk === 'low' && (
            <div className="mt-4 p-4.5 bg-[#EEFAF5] border-2 border-[#ACE6CF] rounded-xl flex items-start space-x-3 text-xs text-[#12634C] print-card shadow-sm">
              <CheckCircle2 className="w-4 h-4 text-[#187557] shrink-0 mt-0.5" />
              <div>
                <strong className="font-bold block mb-0.5 font-mono-tag">
                  LOOKS GREAT — HIGH REGIONAL CLARITY
                </strong>
                <span>
                  Your wording is natural and universally understood across all selected varieties. No significant cross-cultural misunderstandings are expected!
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Clear International Rewrite Box */}
        <div
          id="clear-rewrite"
          className="p-6 sm:p-7 bg-[#FFFDF9] border-b border-[#E6DDD1] relative"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <span className="w-5 h-5 rounded-md bg-[#E48C35] text-white flex items-center justify-center text-[10px] font-bold font-mono-tag shadow-2xs">
                ★
              </span>
              <h3 className="text-xs font-bold text-[#242A36] uppercase tracking-wider font-mono-tag">
                Universal Rewrite Suggestion
              </h3>
            </div>

            <button
              type="button"
              onClick={handleCopyRewrite}
              className="no-print inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-mono-tag font-bold text-[#C97420] bg-[#FFF5EB] hover:bg-[#FFEADA] border border-[#FAD6B4] transition-colors cursor-pointer shadow-2xs"
            >
              {copiedRewrite ? (
                <Check className="w-3.5 h-3.5 text-[#187557]" />
              ) : (
                <Copy className="w-3.5 h-3.5 text-[#E48C35]" />
              )}
              <span>{copiedRewrite ? 'COPIED' : 'COPY REWRITE'}</span>
            </button>
          </div>

          <div className="bg-[#FFF8EC] p-5 sm:p-6 rounded-xl border-2 border-[#E48C35] relative shadow-md warm-elevated">
            <div className="text-base sm:text-lg font-bold text-[#242A36] leading-relaxed font-serif-display">
              “{report.clearRewrite}”
            </div>
            {report.rewriteRationale && (
              <div className="mt-3.5 text-xs text-[#5E503F] border-t border-[#FFE2A8] pt-2.5 leading-relaxed">
                <strong className="text-[#A06408] font-mono-tag uppercase text-[10px] mr-1">
                  Why this works well globally:
                </strong>
                {report.rewriteRationale}
              </div>
            )}
          </div>
        </div>

        {/* Audience Breakdown with Accordion */}
        <div id="audience-perspectives" className="p-6 sm:p-7 bg-[#FAF5EE] border-b border-[#E6DDD1]">
          <AudienceAccordion audienceNotes={report.audienceNotes} />
        </div>

        {/* Flagged Phrases Section */}
        {report.riskItems.length > 0 && (
          <div id="flagged-phrases" className="p-6 sm:p-7 bg-[#FFFDF9]">
            <div className="flex items-center space-x-2 mb-4">
              <Layers className="w-4 h-4 text-[#E48C35]" />
              <h3 className="text-xs font-bold text-[#242A36] uppercase tracking-wider font-mono-tag">
                Regional Nuances & Specific Phrases ({report.riskItems.length})
              </h3>
            </div>

            <div className="space-y-4">
              {report.riskItems.map((item, idx) => {
                const itemRisk = RISK_CONFIG[item.riskLevel] || RISK_CONFIG.low;
                const categoryLabel = CATEGORY_LABELS[item.category] || item.category;

                return (
                  <div
                    key={idx}
                    className="p-5 bg-[#FAF5EE] rounded-xl border-2 border-[#E2D8CB] space-y-3.5 print-card print:bg-white shadow-sm warm-elevated"
                  >
                    {/* Item Header */}
                    <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 border-b border-[#EAE0D4]">
                      <div className="flex items-center space-x-2">
                        <span className="w-5 h-5 rounded-md bg-[#008AA1] text-white flex items-center justify-center text-[10px] font-mono-tag font-bold shadow-2xs">
                          0{idx + 1}
                        </span>
                        <span className="font-mono-tag text-sm font-bold text-[#242A36] bg-white px-2.5 py-0.5 rounded-lg border border-[#D9CFC2] shadow-2xs">
                          “{item.phrase}”
                        </span>
                        <span className="text-[10px] font-mono-tag font-bold px-2.5 py-0.5 rounded-full bg-[#E6F6F9] text-[#006C7E] border border-[#BCE4ED]">
                          {categoryLabel}
                        </span>
                      </div>

                      <div className="flex items-center space-x-2">
                        <span className={itemRisk.badgeClass}>
                          {itemRisk.label}
                        </span>
                        <span className="text-[10px] font-mono-tag text-[#7A7061] bg-white px-2.5 py-0.5 rounded-full border border-[#DFD6CA] font-bold shadow-2xs">
                          CONF: {item.confidence.toUpperCase()}
                        </span>
                      </div>
                    </div>

                    {/* Breakdown Columns */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                      <div className="bg-white p-4 rounded-xl border border-[#E0D7CB] shadow-xs">
                        <span className="font-mono-tag font-bold text-[#7A7061] block mb-1 text-[10px] uppercase">
                          Linguistic Explanation
                        </span>
                        <p className="text-[#3A3226] leading-relaxed">{item.explanation}</p>
                      </div>

                      <div className="bg-white p-4 rounded-xl border border-[#E0D7CB] shadow-xs">
                        <span className="font-mono-tag font-bold text-[#7A7061] block mb-1 text-[10px] uppercase">
                          Alternative Interpretation
                        </span>
                        <p className="text-[#3A3226] leading-relaxed">{item.possibleReading}</p>
                      </div>
                    </div>

                    {/* Bottom Metadata & Suggested Alternative */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pt-1 text-xs">
                      <div className="flex items-center space-x-1.5">
                        <span className="text-[10px] font-mono-tag text-[#7A7061] font-semibold uppercase">
                          RELEVANT AUDIENCES:
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {item.relevantAudiences.map((aud, aIdx) => (
                            <span
                              key={aIdx}
                              className="px-2.5 py-0.5 bg-white text-[#3A3226] rounded-full border border-[#DFD6CA] font-mono-tag text-[10px] shadow-2xs"
                            >
                              {aud}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <span className="text-[10px] font-mono-tag text-[#7A7061] font-semibold uppercase">
                          SUGGESTION:
                        </span>
                        <span className="font-bold font-mono-tag text-xs text-[#C97420] bg-[#FFF5EB] px-3 py-1 rounded-lg border border-[#FAD6B4] shadow-xs">
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
      </div>

      {/* Disclaimer Card with Descriptive Parity tag */}
      <div className="p-4.5 bg-[#FAF7F2] rounded-xl border border-[#DFD6CA] text-xs text-[#63594B] leading-relaxed flex items-start space-x-3 print-card shadow-sm warm-elevated">
        <Lightbulb className="w-4 h-4 text-[#DE5736] shrink-0 mt-0.5 no-print" />
        <div>
          <span className="inline-block px-2 py-0.5 rounded-full font-mono-tag font-bold text-[9px] bg-[#EDF4FA] text-[#265B88] border border-[#C7DFEE] mr-1.5 uppercase shadow-2xs">
            Descriptive Parity Principle
          </span>
          <span>
            This prototype highlights possible differences in interpretation across English varieties. Individual language use and regional nuance vary, so review findings in contextual perspective.
          </span>
        </div>
      </div>

      {/* Expandable Methodology */}
      <div className="border border-[#DFD6CA] rounded-xl bg-[#FCFAF7] overflow-hidden no-print shadow-sm warm-elevated">
        <button
          type="button"
          onClick={() => setShowMethodology(!showMethodology)}
          className="w-full px-5 py-3.5 bg-[#FAF7F2] hover:bg-[#F2EAE0] flex items-center justify-between text-xs font-mono-tag font-bold text-[#463D31] transition-colors cursor-pointer"
        >
          <div className="flex items-center space-x-2">
            <FileText className="w-3.5 h-3.5 text-[#3874A6]" />
            <span>METHOD AND LIMITATIONS</span>
          </div>
          {showMethodology ? (
            <ChevronUp className="w-4 h-4 text-[#7A7061]" />
          ) : (
            <ChevronDown className="w-4 h-4 text-[#7A7061]" />
          )}
        </button>

        {showMethodology && (
          <div className="p-5 sm:p-6 text-xs text-[#5E5445] space-y-2.5 leading-relaxed border-t border-[#DFD6CA] bg-[#FCFAF7]">
            <ul className="list-disc list-inside space-y-2 text-[#5E5445]">
              <li>
                <strong className="text-[#242A36] font-mono-tag">Scope:</strong> The system considers American English, Indian English,
                and Singapore English.
              </li>
              <li>
                <strong className="text-[#242A36] font-mono-tag">Engine:</strong> The analysis is generated using a research-informed
                linguistic framework and Gemini.
              </li>
              <li>
                <strong className="text-[#242A36] font-mono-tag">Validation Status:</strong> Linguistic structures are based on Braj Kachru (1985) and World Englishes corpora.
              </li>
              <li>
                <strong className="text-[#242A36] font-mono-tag">Intended Use:</strong> Results should be treated as prompts for thoughtful
                review, not authoritarian grammar enforcement.
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
