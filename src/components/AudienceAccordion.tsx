import React, { useState } from 'react';
import { AudienceNote } from '../types';
import { ChevronDown, ChevronUp, Users, ShieldAlert, CheckCircle2 } from 'lucide-react';

interface AudienceAccordionProps {
  audienceNotes: AudienceNote[];
}

const VARIETY_FLAGS: Record<string, string> = {
  'American English': '🇺🇸',
  'Indian English': '🇮🇳',
  'Singapore English': '🇸🇬',
};

const VARIETY_REGIONS: Record<string, string> = {
  'American English': 'North America · Inner Circle',
  'Indian English': 'South Asia · Outer Circle',
  'Singapore English': 'Southeast Asia · Outer Circle',
};

export const AudienceAccordion: React.FC<AudienceAccordionProps> = ({ audienceNotes }) => {
  // Store open state for each audience by index or name (open all by default for immediate clarity)
  const [openIndexes, setOpenIndexes] = useState<number[]>(
    audienceNotes.map((_, i) => i)
  );

  const toggleIndex = (index: number) => {
    setOpenIndexes((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const handleExpandAll = () => {
    setOpenIndexes(audienceNotes.map((_, i) => i));
  };

  const handleCollapseAll = () => {
    setOpenIndexes([]);
  };

  return (
    <div className="space-y-3.5">
      {/* Header controls */}
      <div className="flex items-center justify-between pb-1 border-b border-[#EAE0D4]">
        <div className="flex items-center space-x-2">
          <Users className="w-4 h-4 text-[#008AA1]" />
          <h3 className="text-xs font-bold text-[#242A36] uppercase tracking-wider font-mono-tag">
            Audience-Specific Perspectives ({audienceNotes.length})
          </h3>
        </div>

        <div className="flex items-center space-x-2 no-print">
          <button
            type="button"
            onClick={handleExpandAll}
            className="text-[10px] font-mono-tag font-bold text-[#7A7061] hover:text-[#E48C35] transition-colors cursor-pointer"
          >
            EXPAND ALL
          </button>
          <span className="text-[#CCC0B2]">·</span>
          <button
            type="button"
            onClick={handleCollapseAll}
            className="text-[10px] font-mono-tag font-bold text-[#7A7061] hover:text-[#E48C35] transition-colors cursor-pointer"
          >
            COLLAPSE ALL
          </button>
        </div>
      </div>

      {/* Accordion list */}
      <div className="space-y-3">
        {audienceNotes.map((note, idx) => {
          const isOpen = openIndexes.includes(idx);
          const flag = VARIETY_FLAGS[note.audience] || '🌐';
          const region = VARIETY_REGIONS[note.audience] || 'Global English Variety';
          const hasFriction =
            note.potentialFriction &&
            !note.potentialFriction.toLowerCase().includes('none') &&
            !note.potentialFriction.toLowerCase().includes('no friction') &&
            !note.potentialFriction.toLowerCase().includes('minimal');

          return (
            <div
              key={idx}
              className="rounded-xl border-2 border-[#E2D8CB] bg-[#FFFDF9] overflow-hidden transition-all shadow-sm warm-elevated print-card"
            >
              {/* Accordion Trigger Header */}
              <button
                type="button"
                onClick={() => toggleIndex(idx)}
                className="w-full p-4 bg-[#FAF5EE] hover:bg-[#F3ECE0] flex items-center justify-between text-left transition-colors cursor-pointer"
                aria-expanded={isOpen}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-2xl leading-none">{flag}</span>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-xs sm:text-sm text-[#242A36] font-serif-display">
                        {note.audience}
                      </span>
                      {hasFriction ? (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono-tag font-bold bg-[#FFF5EB] text-[#C97420] border border-[#FAD6B4]">
                          FRICTION DETECTED
                        </span>
                      ) : (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono-tag font-bold bg-[#EEFAF5] text-[#187557] border border-[#ACE6CF]">
                          SMOOTH ALIGNMENT
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] font-mono-tag text-[#7A7061] block mt-0.5">
                      {region}
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-2.5">
                  <span className="text-[10px] font-mono-tag uppercase font-bold text-[#554A3B] bg-white px-2.5 py-0.5 rounded-full border border-[#DFD6CA] hidden sm:inline shadow-2xs">
                    CONF: {note.confidence.toUpperCase()}
                  </span>
                  <div className="w-7 h-7 rounded-lg bg-white border border-[#DFD6CA] flex items-center justify-center text-[#7A7061] no-print shadow-2xs">
                    {isOpen ? (
                      <ChevronUp className="w-3.5 h-3.5" />
                    ) : (
                      <ChevronDown className="w-3.5 h-3.5" />
                    )}
                  </div>
                </div>
              </button>

              {/* Accordion Content */}
              {isOpen && (
                <div className="p-4 sm:p-5 border-t border-[#EAE0D4] bg-[#FFFDF9] space-y-3.5 text-xs animate-in fade-in duration-200">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Likely Reading */}
                    <div className="bg-[#EBF7FA] p-4 rounded-xl border-l-4 border-l-[#008AA1] border-y border-r border-[#BCE4ED] shadow-2xs">
                      <span className="text-[#006C7E] font-mono-tag font-bold block text-[10px] uppercase mb-1.5 flex items-center space-x-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Likely Reading & Pragmatics:</span>
                      </span>
                      <p className="text-[#242A36] leading-relaxed font-medium">
                        {note.likelyReading}
                      </p>
                    </div>

                    {/* Potential Friction */}
                    <div className="bg-[#FFF5EB] p-4 rounded-xl border-l-4 border-l-[#E48C35] border-y border-r border-[#FAD6B4] shadow-2xs">
                      <span className="text-[#C97420] font-mono-tag font-bold block text-[10px] uppercase mb-1.5 flex items-center space-x-1.5">
                        <ShieldAlert className="w-3.5 h-3.5" />
                        <span>Potential Friction or Nuance:</span>
                      </span>
                      <p className="text-[#3A3022] leading-relaxed">
                        {note.potentialFriction}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
