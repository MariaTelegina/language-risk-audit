import React from 'react';
import { ArrowLeft, Compass, Globe, Layers, ShieldCheck, Sparkles, Users } from 'lucide-react';
import { GlobeLogo } from './GlobeLogo';

interface AboutPageProps {
  onBackToAudit: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onBackToAudit }) => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12 space-y-6 sm:space-y-8">
      {/* Back button */}
      <div>
        <button
          type="button"
          onClick={onBackToAudit}
          className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-[#FFFDF9] hover:bg-[#F3ECE0] text-[#4A4134] text-xs font-mono-tag font-bold border-2 border-[#E2D8CB] transition-all cursor-pointer shadow-xs hover:shadow-sm"
        >
          <ArrowLeft className="w-4 h-4 text-[#E48C35]" />
          <span>Back to Audit Tool</span>
        </button>
      </div>

      {/* Hero Card */}
      <div className="slide-frame rounded-2xl p-5 sm:p-10 border-2 border-[#E6DDD1] bg-[#FFFDF9] shadow-md warm-card space-y-4">
        <div className="flex items-center space-x-3.5">
          <GlobeLogo size={42} />
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xl sm:text-3xl font-bold font-serif-display text-[#242A36]">
                Will It Travel
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] sm:text-[11px] font-bold font-mono-tag bg-[#FFF4DC] text-[#B87010] border border-[#FFDE9E]">
                WIT
              </span>
            </div>
            <p className="text-[11px] sm:text-xs text-[#006C7E] font-mono-tag font-bold mt-0.5">
              Cross-Dialect English Message Perception & Linguistic Audit Platform
            </p>
          </div>
        </div>

        <p className="text-xs sm:text-base text-[#574C3C] leading-relaxed max-w-3xl pt-2 font-sans">
          Will It Travel (WIT) is an applied linguistic audit system designed to evaluate how messages are interpreted across different varieties of English. By highlighting potential lexical shifts, idiomatic divergence, and pragmatic nuances, WIT helps global communicators write with mutual clarity without flattening linguistic diversity.
        </p>
      </div>

      {/* Core Principles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
        <div className="slide-frame rounded-xl p-5 sm:p-6 border-2 border-[#FAD6B4] bg-[#FFF5EB] shadow-sm warm-elevated space-y-3">
          <div className="w-9 h-9 rounded-lg bg-[#E48C35] text-white flex items-center justify-center shadow-xs">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="text-sm sm:text-base font-bold font-serif-display text-[#242A36]">
            Descriptive Linguistic Parity
          </h3>
          <p className="text-xs text-[#5E4A35] leading-relaxed">
            We do not treat any variety of English as superior or normative. Indian English, Singapore English, and American English are codified, mature varieties with legitimate pragmatic structures.
          </p>
        </div>

        <div className="slide-frame rounded-xl p-5 sm:p-6 border-2 border-[#BCE4ED] bg-[#EBF7FA] shadow-sm warm-elevated space-y-3">
          <div className="w-9 h-9 rounded-lg bg-[#008AA1] text-white flex items-center justify-center shadow-xs">
            <Sparkles className="w-5 h-5" />
          </div>
          <h3 className="text-sm sm:text-base font-bold font-serif-display text-[#242A36]">
            Actionable International Rewrites
          </h3>
          <p className="text-xs text-[#41545A] leading-relaxed">
            Rather than flagging non-standard syntax as errors, WIT crafts universally understood international rewrites that preserve warmth, intent, and professional register.
          </p>
        </div>

        <div className="slide-frame rounded-xl p-5 sm:p-6 border-2 border-[#ACE6CF] bg-[#EEFAF5] shadow-sm warm-elevated space-y-3">
          <div className="w-9 h-9 rounded-lg bg-[#187557] text-white flex items-center justify-center shadow-xs">
            <Users className="w-5 h-5" />
          </div>
          <h3 className="text-sm sm:text-base font-bold font-serif-display text-[#242A36]">
            Audience Perspective Modeling
          </h3>
          <p className="text-xs text-[#35594C] leading-relaxed">
            We simulate the cognitive reception of different regional readers, explaining how specific phrases might carry unintentional undertones in cross-border remote teams.
          </p>
        </div>
      </div>

      {/* Scope & Methodology Card */}
      <div className="slide-frame rounded-2xl p-5 sm:p-8 border-2 border-[#FFE4A6] bg-[#FFF9EC] shadow-md warm-card space-y-4">
        <h3 className="text-base sm:text-lg font-bold font-serif-display text-[#242A36]">
          Research Foundations & Methodology
        </h3>
        <p className="text-xs sm:text-sm text-[#574C3C] leading-relaxed font-sans">
          The linguistic evaluation model combines sociolinguistic corpora from World Englishes research (Kachru 1985, Schneider 2007) with Gemini structured reasoning. Each submission is analyzed along four distinct linguistic vectors:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
          <div className="p-3.5 bg-white rounded-xl border border-[#DFD6CA] shadow-2xs">
            <strong className="text-[#E48C35] font-mono-tag block mb-0.5">1. Lexical Semantics:</strong>
            <span className="text-[#594E3F]">Word-level definitions that diverge (e.g. <em>revert</em>, <em>prepone</em>).</span>
          </div>

          <div className="p-3.5 bg-white rounded-xl border border-[#DFD6CA] shadow-2xs">
            <strong className="text-[#008AA1] font-mono-tag block mb-0.5">2. Pragmatic Register:</strong>
            <span className="text-[#594E3F]">Degree of deference, directness, and perceived politeness in workplace syncs.</span>
          </div>

          <div className="p-3.5 bg-white rounded-xl border border-[#DFD6CA] shadow-2xs">
            <strong className="text-[#187557] font-mono-tag block mb-0.5">3. Idiomatic Specificity:</strong>
            <span className="text-[#594E3F]">Metaphors tied to single regions (e.g. <em>ballpark</em>, <em>chope</em>, <em>out of pocket</em>).</span>
          </div>

          <div className="p-3.5 bg-white rounded-xl border border-[#DFD6CA] shadow-2xs">
            <strong className="text-[#C97420] font-mono-tag block mb-0.5">4. Discourse Particles:</strong>
            <span className="text-[#594E3F]">Sentence-final pragmatics and modal markers (e.g. <em>can?</em>, <em>only</em>, <em>na</em>).</span>
          </div>
        </div>
      </div>
    </div>
  );
};
