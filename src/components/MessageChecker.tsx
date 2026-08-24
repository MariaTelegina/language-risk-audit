import React, { useState } from 'react';
import {
  AnalysisReport,
  CommunicationContext,
  EnglishVariety,
} from '../types';
import { EXAMPLE_CASES, ExampleCase } from '../data/exampleReports';
import { AnalysisReportView } from './AnalysisReportView';
import { HowItWorks } from './HowItWorks';
import { HorizontalAuditNav } from './HorizontalAuditNav';
import {
  ArrowRight,
  Loader2,
  AlertCircle,
  Sparkles,
  CheckSquare,
  Square,
  RefreshCw,
  Send,
  Compass,
  CheckCircle2,
  ShieldCheck,
} from 'lucide-react';

const ALL_VARIETIES: { name: EnglishVariety; flag: string; region: string }[] = [
  { name: 'American English', flag: '🇺🇸', region: 'North America' },
  { name: 'Indian English', flag: '🇮🇳', region: 'South Asia' },
  { name: 'Singapore English', flag: '🇸🇬', region: 'Southeast Asia' },
];

const ALL_CONTEXTS: { label: CommunicationContext; desc: string }[] = [
  { label: 'Workplace', desc: 'Team emails, Slack channels, sprint memos, executive briefs' },
  { label: 'Customer support', desc: 'Help desk tickets, client communication, service chats' },
  { label: 'Marketing', desc: 'Product slogans, campaign announcements, public collateral' },
  { label: 'General communication', desc: 'Casual discussions, peer dialogue, forum postings' },
];

const MAX_CHARS = 1500;

const API_BASE = import.meta.env.VITE_API_BASE_URL || '';

export const MessageChecker: React.FC = () => {
  const [text, setText] = useState<string>('');
  const [selectedAudiences, setSelectedAudiences] = useState<EnglishVariety[]>([
    'American English',
    'Indian English',
    'Singapore English',
  ]);
  const [context, setContext] = useState<CommunicationContext>('Workplace');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Analysis result state
  const [report, setReport] = useState<AnalysisReport | null>(null);
  const [isExample, setIsExample] = useState<boolean>(false);
  const [activeReportContext, setActiveReportContext] = useState<CommunicationContext>('Workplace');
  const [activeReportAudiences, setActiveReportAudiences] = useState<EnglishVariety[]>([]);
  const [activeReportText, setActiveReportText] = useState<string>('');
  const [showCompleteNotification, setShowCompleteNotification] = useState<boolean>(false);

  const handleAudienceToggle = (variety: EnglishVariety) => {
    setSelectedAudiences((prev) => {
      if (prev.includes(variety)) {
        if (prev.length <= 2) {
          setError('Please select at least two English varieties to evaluate cross-variety friction.');
          return prev;
        }
        setError(null);
        return prev.filter((v) => v !== variety);
      } else {
        setError(null);
        return [...prev, variety];
      }
    });
  };

  const handleLoadExample = (example: ExampleCase) => {
    setError(null);
    setText(example.text);
    setContext(example.context);
    setSelectedAudiences(example.selectedAudiences);

    setReport(example.report);
    setIsExample(true);
    setActiveReportContext(example.context);
    setActiveReportAudiences(example.selectedAudiences);
    setActiveReportText(example.text);

    setShowCompleteNotification(true);
    setTimeout(() => {
      const element = document.getElementById('report-overview');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;

    const trimmed = text.trim();
    if (!trimmed) {
      setError('Please paste or type a message to check.');
      return;
    }

    if (selectedAudiences.length < 2) {
      setError('Please select at least two English varieties to compare.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setShowCompleteNotification(false);

    try {
      const response = await fetch(`${API_BASE}/api/analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: trimmed,
          selectedAudiences,
          context,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to analyze message. Please try again.');
      }

      if (data.report) {
        setReport(data.report);
        setIsExample(false);
        setActiveReportContext(context);
        setActiveReportAudiences(selectedAudiences);
        setActiveReportText(trimmed);
        setShowCompleteNotification(true);

        setTimeout(() => {
          const element = document.getElementById('report-overview');
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 150);
      } else {
        throw new Error('No analysis data received from service.');
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setText('');
    setReport(null);
    setError(null);
    setIsExample(false);
    setShowCompleteNotification(false);
  };

  return (
    <>
      {/* Horizontal Sticky Sub-Navigation directly below main navbar */}
      {report && (
        <HorizontalAuditNav hasFlaggedPhrases={report.riskItems.length > 0} />
      )}

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 print:p-0 print:m-0 print:max-w-full relative">
        {/* Editorial Slide Hero Banner */}
        <div className="slide-frame rounded-2xl mb-6 overflow-hidden relative no-print border border-[#E6DDD1] shadow-md warm-card">
          {/* Top banner metadata & palette */}
          <div className="bg-[#FFFDF9] px-6 py-3.5 border-b border-[#E6DDD1] flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="font-mono-tag text-[11px] font-bold text-[#E48C35] tracking-widest uppercase">
                CROSS-CULTURAL WRITING COMPANION · WILL IT TRAVEL
              </span>
            </div>

            <div className="flex items-center space-x-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#E48C35]" title="Warm Orange" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#FFB852]" title="Cream Yellow" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#008AA1]" title="Antwerp Blue" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#ACE6CF]" title="Nile Blue" />
            </div>
          </div>

          {/* Hero Marbled & Warm Accent Area */}
          <div className="relative p-6 sm:p-10 marble-banner text-white overflow-hidden">
            {/* Subtle overlay */}
            <div className="absolute inset-0 bg-black/10 mix-blend-overlay pointer-events-none" />

            <div className="relative z-10 max-w-2xl">
              <span className="font-script-accent text-xl sm:text-2xl text-[#FFF0E0] block mb-1">
                Warm greetings & cross-cultural clarity
              </span>
              <h1 className="text-3xl sm:text-5xl font-black font-serif-display tracking-tight text-white drop-shadow-xs">
                Will your message travel well?
              </h1>
              <p className="mt-3 text-sm sm:text-base text-[#FFF6EE] leading-relaxed max-w-xl font-normal">
                Ever wondered how your email or update sounds to colleagues in India, Singapore, or the US? We'll help you spot regional nuances and craft phrasing that feels natural, respectful, and universally clear to everyone.
              </p>
            </div>
          </div>
        </div>

        {/* How It Works Section (Placed directly after hero, before input) */}
        <HowItWorks />

        {/* Explore Common Cross-Variety Phrases Section */}
        <section
          id="common-phrases-section"
          className="slide-frame rounded-2xl p-6 sm:p-7 mb-8 border border-[#E6DDD1] bg-[#FFFDF9] no-print shadow-md warm-card"
        >
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#EAE0D4]">
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FFB852]" />
              <h2 className="text-xs font-bold text-[#242A36] uppercase tracking-wider font-mono-tag">
                Try a Common Cross-Cultural Phrase
              </h2>
            </div>
            <span className="text-[11px] text-[#7E7465] font-mono-tag hidden sm:inline">
              Click any phrase to see how it reads across regions
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {EXAMPLE_CASES.map((example) => (
              <button
                key={example.id}
                type="button"
                onClick={() => handleLoadExample(example)}
                className="p-4 rounded-xl text-left bg-[#FFF8EC] hover:bg-[#FFF2DF] text-[#242A36] border-2 border-[#FFE2A8] hover:border-[#E48C35] transition-all group cursor-pointer shadow-sm hover:shadow-md"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold font-mono-tag px-2.5 py-0.5 rounded-full bg-[#E6F6F9] text-[#006C7E] border border-[#BCE4ED]">
                    {example.dialectPair}
                  </span>
                  <span className="text-[10px] text-[#5C4C38] bg-[#FFF4DC] px-2.5 py-0.5 rounded-full border border-[#FFDE9E] font-mono-tag">
                    {example.context}
                  </span>
                </div>
                <p className="text-xs font-bold text-[#242A36] group-hover:text-[#E48C35] transition-colors leading-snug font-serif-display">
                  {example.buttonLabel}
                </p>
              </button>
            ))}
          </div>
        </section>

        {/* Main Checker Form */}
        <form
          onSubmit={handleSubmit}
          className="slide-frame rounded-2xl p-6 sm:p-8 space-y-8 no-print shadow-md warm-card border border-[#E6DDD1] bg-[#FFFDF9]"
        >
          {/* Step 1: Input text */}
          <div>
            <div className="flex items-start sm:items-center justify-between gap-4 mb-3.5">
              <div className="flex items-center space-x-3.5">
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-[#E48C35] text-white flex items-center justify-center text-xl sm:text-2xl font-mono-tag font-bold shadow-sm shrink-0 tracking-tight">
                  01
                </div>
                <div>
                  <label
                    htmlFor="message-input"
                    className="text-sm sm:text-base font-bold text-[#242A36] uppercase tracking-wider font-mono-tag block"
                  >
                    Your Draft Message
                  </label>
                  <span className="text-[11px] text-[#7A7061] font-mono-tag block">
                    Type or paste the email, update, or phrase you'd like to share
                  </span>
                </div>
              </div>
              <span
                className={`text-xs font-mono-tag shrink-0 px-3 py-1 rounded-full bg-[#FAF5EE] border border-[#E0D5C7] shadow-2xs ${
                  text.length > MAX_CHARS ? 'text-[#E48C35] font-bold border-[#FCDAB8]' : 'text-[#847A6B]'
                }`}
              >
                {text.length} / {MAX_CHARS} CHARS
              </span>
            </div>

            <textarea
              id="message-input"
              rows={4}
              maxLength={MAX_CHARS}
              value={text}
              onChange={(e) => {
                setText(e.target.value);
                if (error) setError(null);
              }}
              placeholder="e.g. Hi team, please revert by tomorrow with your feedback so we can table the motion..."
              className="w-full p-4 rounded-xl border-2 border-[#E2D8CB] bg-[#FAF5EE] focus:bg-[#FFFDF9] focus:border-[#E48C35] focus:ring-2 focus:ring-[#E48C35]/20 text-sm text-[#242A36] placeholder:text-[#9C9182] outline-hidden transition-all resize-y leading-relaxed font-sans shadow-inner focus:shadow-md"
            />
          </div>

          {/* Step 2 & 3: Configuration */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-[#EAE0D4]">
            {/* Target English Audiences */}
            <div>
              <div className="flex items-start sm:items-center justify-between gap-3 mb-3.5">
                <div className="flex items-center space-x-3.5">
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-[#008AA1] text-white flex items-center justify-center text-xl sm:text-2xl font-mono-tag font-bold shadow-sm shrink-0 tracking-tight">
                    02
                  </div>
                  <div>
                    <label className="text-sm sm:text-base font-bold text-[#242A36] uppercase tracking-wider font-mono-tag block">
                      Who Are You Writing To?
                    </label>
                    <span className="text-[11px] text-[#7A7061] font-mono-tag block">
                      Select the English varieties of your teammates or readers
                    </span>
                  </div>
                </div>
                <span className="text-[10px] font-mono-tag text-[#006C7E] bg-[#E6F6F9] px-2.5 py-1 rounded-full border border-[#BCE4ED] shrink-0 hidden sm:inline font-bold">
                  Min. 2
                </span>
              </div>

              <div className="space-y-2.5">
                {ALL_VARIETIES.map((item) => {
                  const isSelected = selectedAudiences.includes(item.name);
                  
                  // Variety specific colors
                  let selectedStyle = 'bg-[#E6F6F9] text-[#006C7E] border-[#008AA1]';
                  let activeBadgeStyle = 'bg-[#008AA1] text-white';
                  let activeIconColor = 'text-[#008AA1]';

                  if (item.name === 'Indian English') {
                    selectedStyle = 'bg-[#FFF5EB] text-[#C97420] border-[#E48C35]';
                    activeBadgeStyle = 'bg-[#E48C35] text-white';
                    activeIconColor = 'text-[#E48C35]';
                  } else if (item.name === 'Singapore English') {
                    selectedStyle = 'bg-[#EEFAF5] text-[#12634C] border-[#187557]';
                    activeBadgeStyle = 'bg-[#187557] text-white';
                    activeIconColor = 'text-[#187557]';
                  }

                  return (
                    <button
                      key={item.name}
                      type="button"
                      onClick={() => handleAudienceToggle(item.name)}
                      className={`w-full flex items-center justify-between p-3.5 rounded-xl border-2 transition-all text-left cursor-pointer ${
                        isSelected
                          ? `${selectedStyle} font-semibold shadow-sm`
                          : 'bg-[#FAF5EE] text-[#554C3E] border-[#E2D8CB] hover:bg-[#F3ECE0]'
                      }`}
                    >
                      <div className="flex items-center space-x-2.5">
                        {isSelected ? (
                          <CheckSquare className={`w-4 h-4 ${activeIconColor} shrink-0`} />
                        ) : (
                          <Square className="w-4 h-4 text-[#A19584] shrink-0" />
                        )}
                        <span className="text-lg leading-none">{item.flag}</span>
                        <div>
                          <span className="text-xs font-bold block">{item.name}</span>
                          <span className="text-[10px] opacity-80 font-mono-tag">{item.region}</span>
                        </div>
                      </div>

                      {isSelected && (
                        <span className={`text-[10px] font-mono-tag font-bold px-2.5 py-0.5 rounded-full ${activeBadgeStyle}`}>
                          SELECTED
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Context Selector */}
            <div>
              <div className="flex items-center space-x-3.5 mb-3.5">
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-[#FFB852] text-[#4A2D00] flex items-center justify-center text-xl sm:text-2xl font-mono-tag font-bold shadow-sm shrink-0 tracking-tight">
                  03
                </div>
                <div>
                  <label
                    htmlFor="context-select"
                    className="text-sm sm:text-base font-bold text-[#242A36] uppercase tracking-wider font-mono-tag block"
                  >
                    Conversation Setting
                  </label>
                  <span className="text-[11px] text-[#7A7061] font-mono-tag block">
                    Tell us where this message will be shared
                  </span>
                </div>
              </div>

              <div className="space-y-2.5">
                <select
                  id="context-select"
                  value={context}
                  onChange={(e) => setContext(e.target.value as CommunicationContext)}
                  className="w-full p-3 bg-[#FAF5EE] rounded-xl border-2 border-[#E2D8CB] text-xs font-bold text-[#242A36] focus:border-[#E48C35] focus:ring-2 focus:ring-[#E48C35]/20 outline-hidden transition-all cursor-pointer shadow-inner"
                >
                  {ALL_CONTEXTS.map((ctx) => (
                    <option key={ctx.label} value={ctx.label}>
                      {ctx.label}
                    </option>
                  ))}
                </select>

                <div className="p-4 bg-[#FFF9EC] rounded-xl border-2 border-[#FFE4A6] text-xs space-y-1 shadow-xs">
                  <span className="text-[10px] font-bold font-mono-tag text-[#A36B09] block uppercase">
                    Setting Description
                  </span>
                  <p className="text-[#594833] text-[11px] leading-relaxed">
                    {ALL_CONTEXTS.find((c) => c.label === context)?.desc}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Error message */}
          {error && (
            <div className="p-4 bg-[#FFF0ED] border-2 border-[#FCA592] rounded-xl flex items-start space-x-3 text-xs text-[#B52C14] shadow-sm">
              <AlertCircle className="w-4 h-4 text-[#E48C35] shrink-0 mt-0.5" />
              <div className="leading-relaxed font-medium">{error}</div>
            </div>
          )}

          {/* Action Row */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-3 border-t border-[#EAE0D4]">
            {text ? (
              <button
                type="button"
                onClick={handleClear}
                className="inline-flex items-center space-x-1.5 text-xs text-[#7A7061] hover:text-[#242A36] font-semibold transition-colors cursor-pointer px-3 py-1.5 rounded-lg hover:bg-[#FAF5EE]"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Start fresh</span>
              </button>
            ) : (
              <div />
            )}

            <button
              type="submit"
              disabled={isLoading || !text.trim() || selectedAudiences.length < 2}
              className="inline-flex items-center justify-center space-x-2 px-8 py-3.5 rounded-xl bg-[#E48C35] hover:bg-[#C97420] active:bg-[#AF6014] disabled:bg-[#E2D8CC] disabled:text-[#9A8F7F] disabled:cursor-not-allowed text-white font-bold text-xs uppercase tracking-wider font-mono-tag shadow-md hover:shadow-lg transition-all cursor-pointer"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                  <span>CHECKING HOW THIS TRAVELS...</span>
                </>
              ) : (
                <>
                  <span>SEE HOW THIS SOUNDS</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>

        {/* Analysis Complete Notification Status Banner */}
        {showCompleteNotification && report && (
          <div
            id="analysis-complete-banner"
            className="mt-8 p-4 bg-[#EEFAF5] border-2 border-[#ACE6CF] rounded-xl flex items-center justify-between text-xs text-[#12634C] shadow-md no-print animate-in fade-in slide-in-from-top-2 duration-300"
          >
            <div className="flex items-center space-x-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#187557] shrink-0" />
              <span className="font-bold font-mono-tag tracking-wider uppercase">
                All done!
              </span>
              <span className="text-[#1E7D5F] hidden sm:inline">
                — Here is how your message is understood across your chosen regions.
              </span>
            </div>
            <span className="text-[10px] font-mono-tag font-bold bg-white text-[#187557] px-3 py-0.5 rounded-full border border-[#ACE6CF] shadow-2xs">
              READY
            </span>
          </div>
        )}

        {/* Analysis Report View */}
        {report && (
          <AnalysisReportView
            report={report}
            originalText={activeReportText}
            context={activeReportContext}
            selectedAudiences={activeReportAudiences}
            isExample={isExample}
          />
        )}
      </div>
    </>
  );
};
