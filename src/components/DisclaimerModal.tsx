import React, { useEffect, useState } from 'react';
import { ShieldCheck, X, ArrowRight, Sparkles, Globe2, BookOpen } from 'lucide-react';

interface DisclaimerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DisclaimerModal: React.FC<DisclaimerModalProps> = ({ isOpen, onClose }) => {
  const [isClosing, setIsClosing] = useState(false);
  const [shouldRender, setShouldRender] = useState(isOpen);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      setIsClosing(false);
    } else {
      setIsClosing(true);
      const timer = setTimeout(() => {
        setShouldRender(false);
        setIsClosing(false);
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleDismiss();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleDismiss = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  if (!shouldRender) return null;

  return (
    <div
      id="disclaimer-modal-overlay"
      className={`fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#1A232E]/70 backdrop-blur-md transition-opacity duration-300 overflow-y-auto ${
        isClosing ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="disclaimer-modal-title"
    >
      <div
        className={`w-full max-w-xl bg-[#FFFDF9] rounded-2xl border-2 border-[#E48C35] shadow-2xl overflow-hidden transform transition-all duration-300 my-auto max-h-[90vh] flex flex-col ${
          isClosing ? 'scale-95 opacity-0' : 'scale-100 opacity-100'
        }`}
      >
        {/* Top 4-Color Palette Header Strip */}
        <div className="h-2 w-full flex shrink-0">
          <div className="h-full w-1/4 bg-[#E48C35]" title="Warm Orange" />
          <div className="h-full w-1/4 bg-[#FFB852]" title="Cream Yellow" />
          <div className="h-full w-1/4 bg-[#008AA1]" title="Antwerp Blue" />
          <div className="h-full w-1/4 bg-[#ACE6CF]" title="Nile Blue" />
        </div>

        {/* Modal Header */}
        <div className="px-5 sm:px-6 pt-5 sm:pt-6 pb-3.5 sm:pb-4 bg-[#FAF4EB] border-b border-[#E8DFCFA] flex items-start justify-between shrink-0">
          <div className="flex items-start space-x-3 sm:space-x-3.5">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#008AA1] text-white flex items-center justify-center shadow-sm shrink-0 mt-0.5">
              <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-0.5 sm:mb-1">
                <span
                  id="disclaimer-modal-title"
                  className="font-mono-tag font-bold text-[11px] sm:text-xs uppercase tracking-wider text-[#008AA1]"
                >
                  Linguistic Reflection Disclaimer
                </span>
                <span className="px-2 sm:px-2.5 py-0.5 rounded-full text-[9px] sm:text-[11px] font-mono-tag font-bold bg-[#ACE6CF] text-[#005B6B] border border-[#7BD7B9]">
                  Descriptive Parity
                </span>
              </div>
              <h2 className="text-lg sm:text-2xl font-bold font-serif-display text-[#242A36] leading-tight">
                Will It Travel?
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={handleDismiss}
            className="p-1 sm:p-1.5 rounded-lg text-[#8A7E6E] hover:text-[#242A36] hover:bg-[#EFE6DA] transition-colors cursor-pointer shrink-0 ml-2"
            aria-label="Close disclaimer modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body - Scrollable on short screens */}
        <div className="p-4 sm:p-6 space-y-4 sm:space-y-5 bg-[#FFFDF9] overflow-y-auto">
          {/* Main Statement */}
          <div className="p-4 sm:p-4.5 rounded-xl bg-[#FFF8EC] border-l-4 border-l-[#E48C35] border-y border-r border-[#F5E2CC] shadow-xs warm-elevated">
            <p className="text-xs sm:text-[15px] text-[#3E3427] leading-relaxed font-medium">
              Will It Travel is a tool for understanding message perception across English varieties. It does not determine correct English. Results are for reflection, not authority. This tool is built for cross-cultural understanding and is not intended for impersonation or misrepresentation of any dialect or its speakers.
            </p>
          </div>

          {/* Three Key Pillars with Color Theme */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 text-xs">
            <div className="p-3 sm:p-3.5 bg-[#EBF7FA] rounded-xl border border-[#BCE4ED] space-y-1 shadow-2xs">
              <div className="flex items-center space-x-1.5 text-[#008AA1] font-mono-tag font-bold text-[11px]">
                <Globe2 className="w-3.5 h-3.5 shrink-0" />
                <span>Descriptive</span>
              </div>
              <p className="text-[#3A4E54] text-[10px] sm:text-[11px] leading-snug">
                Equal standing for American, Indian, and Singaporean Englishes.
              </p>
            </div>

            <div className="p-3 sm:p-3.5 bg-[#FFF9ED] rounded-xl border border-[#FDE0A8] space-y-1 shadow-2xs">
              <div className="flex items-center space-x-1.5 text-[#B87010] font-mono-tag font-bold text-[11px]">
                <Sparkles className="w-3.5 h-3.5 shrink-0" />
                <span>Reflective</span>
              </div>
              <p className="text-[#594B34] text-[10px] sm:text-[11px] leading-snug">
                Highlights pragmatic differences, not "right vs wrong" grammar.
              </p>
            </div>

            <div className="p-3 sm:p-3.5 bg-[#F0FAF5] rounded-xl border border-[#ACE6CF] space-y-1 shadow-2xs">
              <div className="flex items-center space-x-1.5 text-[#0B6B4D] font-mono-tag font-bold text-[11px]">
                <BookOpen className="w-3.5 h-3.5 shrink-0" />
                <span>Collaborative</span>
              </div>
              <p className="text-[#34594C] text-[10px] sm:text-[11px] leading-snug">
                Provides international rewrites to ensure clarity across borders.
              </p>
            </div>
          </div>
        </div>

        {/* Modal Footer CTA */}
        <div className="px-5 sm:px-6 py-3.5 sm:py-4 bg-[#FAF4EB] border-t border-[#E8DFCFA] flex flex-col sm:flex-row items-center justify-between gap-2.5 sm:gap-3 shrink-0">
          <span className="text-[10px] sm:text-[11px] font-mono-tag text-[#7D7160] text-center sm:text-left hidden xs:inline">
            Press <strong>ESC</strong> or click below to enter
          </span>

          <button
            type="button"
            onClick={handleDismiss}
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl font-mono-tag font-bold text-xs uppercase tracking-wider text-white bg-[#E48C35] hover:bg-[#C97420] active:bg-[#AF6014] shadow-md hover:shadow-lg transition-all cursor-pointer group"
          >
            <span>I Understand & Enter</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};
