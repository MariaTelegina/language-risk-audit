import React from 'react';
import { BookOpen, ShieldCheck, Sparkles, HelpCircle } from 'lucide-react';
import { GlobeLogo } from './GlobeLogo';

interface FooterProps {
  onOpenDisclaimer?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenDisclaimer }) => {
  return (
    <footer className="bg-[#FAF5EE] text-[#635B4E] border-t-2 border-[#E6DDD1] mt-auto no-print">
      {/* 4-color palette top accent stripe */}
      <div className="h-1 w-full flex">
        <div className="h-full w-1/4 bg-[#E48C35]" />
        <div className="h-full w-1/4 bg-[#FFB852]" />
        <div className="h-full w-1/4 bg-[#008AA1]" />
        <div className="h-full w-1/4 bg-[#ACE6CF]" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
        {/* Editorial summary grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-6 border-b border-[#EAE0D4] text-xs">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <GlobeLogo size={24} />
              <span className="font-serif-display font-bold text-sm text-[#242A36]">
                Will It Travel
              </span>
              <span className="px-1.5 py-0.2 rounded-xs text-[9px] font-bold font-mono-tag bg-[#FFF4DC] text-[#B87010] border border-[#FFDE9E]">
                WIT
              </span>
            </div>
            <p className="text-[#6E6455] leading-relaxed font-sans">
              An exploratory linguistic evaluation prototype examining cross-variety semantics, pragmatic tone, and regional idioms.
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center space-x-1.5 text-[#242A36] font-bold">
              <BookOpen className="w-3.5 h-3.5 text-[#E48C35]" />
              <span>Covered Englishes</span>
            </div>
            <p className="text-[#6E6455] leading-relaxed">
              Evaluating variations across American English, Indian English, and Singapore English (Singlish / SgE).
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center space-x-1.5 text-[#242A36] font-bold">
              <ShieldCheck className="w-3.5 h-3.5 text-[#008AA1]" />
              <span>Descriptive Parity Standard</span>
            </div>
            <p className="text-[#6E6455] leading-relaxed">
              Designed to support mutual intelligibility across global teams without prescribing native-speaker hegemony.
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#7A7061]">
          <div className="flex items-center space-x-2">
            <span className="font-mono-tag font-bold text-[#E48C35]">WILL IT TRAVEL</span>
            <span>·</span>
            <span>Cross-Variety Linguistic Evaluation Suite</span>
          </div>

          <div className="flex items-center space-x-3">
            {onOpenDisclaimer && (
              <button
                type="button"
                onClick={onOpenDisclaimer}
                className="inline-flex items-center space-x-1 font-mono-tag text-[11px] font-bold text-[#008AA1] hover:text-[#E48C35] transition-colors cursor-pointer"
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>View Disclaimer</span>
              </button>
            )}
            <p className="text-center sm:text-right text-[11px] text-[#867B6C]">
              Guidance on cross-variety English interpretation. Review findings in contextual nuance.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
