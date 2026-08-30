import React, { useEffect, useState } from 'react';
import {
  AnalysisReport,
  CommunicationContext,
  EnglishVariety,
} from '../types';
import { EXAMPLE_CASES, ExampleCase } from '../data/exampleReports';
import { AnalysisReportView } from './AnalysisReportView';
import {
  ArrowRight,
  Loader2,
  AlertCircle,
  Sparkles,
  CheckSquare,
  Square,
  RefreshCw,
} from 'lucide-react';

const ALL_VARIETIES: EnglishVariety[] = [
  'American English',
  'Indian English',
  'Singapore English',
];

const ALL_CONTEXTS: CommunicationContext[] = [
  'Workplace',
  'Customer support',
  'Marketing',
  'General communication',
];

const MAX_CHARS = 1500;

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
  const [remaining, setRemaining] = useState<number | null>(null);

  // Analysis result state
  const [report, setReport] = useState<AnalysisReport | null>(null);
  const [isExample, setIsExample] = useState<boolean>(false);
  const [activeReportContext, setActiveReportContext] = useState<CommunicationContext>('Workplace');
  const [activeReportAudiences, setActiveReportAudiences] = useState<EnglishVariety[]>([]);
  const [activeReportText, setActiveReportText] = useState<string>('');

  useEffect(() => {
    let cancelled = false;
    fetch('/api/health', { credentials: 'include' })
      .then(async (response) => {
        const data = await response.json();
        if (!cancelled && typeof data.remaining === 'number') {
          setRemaining(data.remaining);
        }
      })
      .catch(() => {
        if (!cancelled) setRemaining(null);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const handleAudienceToggle = (variety: EnglishVariety) => {
    setSelectedAudiences((prev) => {
      if (prev.includes(variety)) {
        // Prevent deselecting if it would drop below 2
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

    // Set example report immediately with zero live API calls
    setReport(example.report);
    setIsExample(true);
    setActiveReportContext(example.context);
    setActiveReportAudiences(example.selectedAudiences);
    setActiveReportText(example.text);
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

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          text: trimmed,
          selectedAudiences,
          context,
        }),
      });

      const data = await response.json();
      if (typeof data.remaining === 'number') {
        setRemaining(data.remaining);
      }

      if (!response.ok) {
        throw new Error(data.error || 'Failed to analyze message. Please try again.');
      }

      if (data.report) {
        setReport(data.report);
        setIsExample(false);
        setActiveReportContext(context);
        setActiveReportAudiences(selectedAudiences);
        setActiveReportText(trimmed);
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
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 print:p-0 print:m-0 print:max-w-full">
      {/* Header section placed directly above fold */}
      <div className="mb-8 no-print">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Will your English travel?
        </h1>
        <p className="mt-2 text-base sm:text-lg text-slate-600 max-w-3xl leading-relaxed">
          Check where a message could be interpreted differently across Englishes—and make it
          clearer without erasing anyone’s variety.
        </p>
      </div>

      {/* Pre-written Examples Bar */}
      <div className="mb-6 p-4 bg-white rounded-xl border border-slate-200 shadow-2xs no-print">
        <div className="flex items-center space-x-2 mb-2.5">
          <Sparkles className="w-4 h-4 text-blue-600" />
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            Try a common cross-variety example
          </span>
          <span className="text-[11px] text-slate-500 font-normal hidden sm:inline">
            (instant evaluation, no API calls)
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {EXAMPLE_CASES.map((example) => (
            <button
              key={example.id}
              type="button"
              onClick={() => handleLoadExample(example)}
              className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-blue-700 border border-slate-200 hover:border-blue-200 transition-all text-left"
            >
              {example.buttonLabel}
            </button>
          ))}
        </div>
      </div>

      {/* Main Checker Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl border border-slate-200 shadow-2xs p-6 sm:p-8 space-y-6 no-print"
      >
        {/* Text Input Area */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label
              htmlFor="message-input"
              className="text-sm font-bold text-slate-900"
            >
              Paste the message you want to check
            </label>
            <span
              className={`text-xs font-medium ${
                text.length > MAX_CHARS ? 'text-rose-600 font-bold' : 'text-slate-400'
              }`}
            >
              {text.length} / {MAX_CHARS.toLocaleString()} characters
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
            placeholder="e.g. Please revert by tomorrow with the revised deck..."
            className="w-full p-4 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 text-sm text-slate-900 placeholder:text-slate-400 outline-hidden transition-all resize-y leading-relaxed font-sans"
          />
        </div>

        {/* Configuration Row: Audiences & Context */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 border-t border-slate-100">
          {/* Target Audiences Selector */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Target English Audiences
              </label>
              <span className="text-[11px] text-slate-500">Select at least 2</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {ALL_VARIETIES.map((variety) => {
                const isSelected = selectedAudiences.includes(variety);
                return (
                  <button
                    key={variety}
                    type="button"
                    onClick={() => handleAudienceToggle(variety)}
                    className={`inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                      isSelected
                        ? 'bg-blue-50 text-blue-700 border-blue-300 shadow-2xs font-semibold'
                        : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {isSelected ? (
                      <CheckSquare className="w-3.5 h-3.5 text-blue-600" />
                    ) : (
                      <Square className="w-3.5 h-3.5 text-slate-400" />
                    )}
                    <span>{variety}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Context Selector */}
          <div>
            <label
              htmlFor="context-select"
              className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2"
            >
              Communication Context
            </label>
            <select
              id="context-select"
              value={context}
              onChange={(e) => setContext(e.target.value as CommunicationContext)}
              className="w-full px-3 py-2 bg-white rounded-lg border border-slate-300 text-xs font-medium text-slate-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-hidden transition-all"
            >
              {ALL_CONTEXTS.map((ctx) => (
                <option key={ctx} value={ctx}>
                  {ctx}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Error message alert */}
        {error && (
          <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-lg flex items-start space-x-2.5 text-xs text-rose-800">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <div className="leading-relaxed">{error}</div>
          </div>
        )}

        {/* Primary Action Row */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex flex-col gap-1">
            {text ? (
              <button
                type="button"
                onClick={handleClear}
                className="inline-flex items-center space-x-1 text-xs text-slate-500 hover:text-slate-700 font-medium transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Clear message</span>
              </button>
            ) : (
              <span />
            )}
            {remaining !== null && (
              <span className="text-[11px] text-slate-500">
                {remaining} live Gemini {remaining === 1 ? 'check' : 'checks'} remaining this hour
              </span>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading || !text.trim() || selectedAudiences.length < 2 || remaining === 0}
            className="inline-flex items-center space-x-2 px-6 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed text-white font-semibold text-sm shadow-2xs transition-all"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-white" />
                <span>Checking message...</span>
              </>
            ) : (
              <>
                <span>Check my message</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </form>

      {/* Live / Example Report Results Section */}
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
  );
};
