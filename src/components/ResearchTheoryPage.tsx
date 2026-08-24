import React from 'react';
import { ArrowLeft, BookOpen, Layers, ShieldCheck, Sparkles } from 'lucide-react';

interface ResearchTheoryPageProps {
  onBackToAudit: () => void;
}

export const ResearchTheoryPage: React.FC<ResearchTheoryPageProps> = ({ onBackToAudit }) => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Back button */}
      <div>
        <button
          type="button"
          onClick={onBackToAudit}
          className="inline-flex items-center space-x-2 px-4 py-2 rounded-xs bg-[#FFFDF9] hover:bg-[#F3ECE0] text-[#4A4134] text-xs font-mono-tag font-bold border-2 border-[#E2D8CB] transition-colors cursor-pointer shadow-xs"
        >
          <ArrowLeft className="w-4 h-4 text-[#E48C35]" />
          <span>Back to Audit Tool</span>
        </button>
      </div>

      {/* Hero Header Card */}
      <div className="slide-frame rounded-xs p-6 sm:p-10 border-2 border-[#E6DDD1] bg-[#FFFDF9] shadow-xs">
        <div className="flex items-center space-x-2 mb-3">
          <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-xs text-[11px] font-mono-tag font-bold bg-[#E6F6F9] text-[#006C7E] border border-[#BCE4ED]">
            <BookOpen className="w-3.5 h-3.5" />
            <span>LINGUISTIC RESEARCH & DIALECTOLOGY</span>
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif-display text-[#242A36] tracking-tight leading-tight">
          Why Cross-Dialect Communication Matters
        </h1>

        <p className="mt-4 text-sm sm:text-base text-[#574C3C] leading-relaxed max-w-3xl font-sans">
          Over 80% of global English communication occurs between speakers of distinct dialects or non-native backgrounds. When messages cross borders, misunderstanding rarely stems from bad grammar — it stems from divergent pragmatic norms and lexical shifts.
        </p>
      </div>

      {/* Section 01: Theoretical Framework */}
      <div className="slide-frame rounded-xs p-6 sm:p-10 border-2 border-[#E6DDD1] bg-[#FFFDF9] shadow-xs space-y-6">
        <div>
          <span className="text-[11px] font-mono-tag font-bold text-[#E48C35] uppercase tracking-wider block mb-1">
            SECTION 01 — THEORETICAL FRAMEWORK
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold font-serif-display text-[#242A36]">
            The Three Circles of World Englishes
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-[#5C5243] leading-relaxed">
            Linguist <strong className="text-[#242A36]">Braj B. Kachru (1985)</strong> proved that English is not a single monolithic standard owned by any one nation. Instead, it flourishes across three interconnected spheres:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          {/* Inner Circle - Antwerp Blue */}
          <div className="p-5 bg-[#EBF7FA] rounded-xs border-2 border-[#BCE4ED] flex flex-col justify-between shadow-xs">
            <div>
              <div className="w-7 h-7 rounded-xs bg-[#008AA1] text-white flex items-center justify-center text-xs font-mono-tag font-bold mb-3 shadow-2xs">
                1
              </div>
              <h3 className="text-base font-bold font-serif-display text-[#242A36] mb-2">
                Inner Circle
              </h3>
              <p className="text-xs text-[#41545A] leading-relaxed">
                Traditional native bases (USA, UK, Australia, Canada). Historically treated as normative, but today representing a minority of global English users.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#BCE4ED] text-[10px] font-mono-tag text-[#006C7E] font-bold">
              ~380M Native Speakers
            </div>
          </div>

          {/* Outer Circle - Warm Orange */}
          <div className="p-5 bg-[#FFF5EB] rounded-xs border-2 border-[#FAD6B4] flex flex-col justify-between shadow-xs">
            <div>
              <div className="w-7 h-7 rounded-xs bg-[#E48C35] text-white flex items-center justify-center text-xs font-mono-tag font-bold mb-3 shadow-2xs">
                2
              </div>
              <h3 className="text-base font-bold font-serif-display text-[#242A36] mb-2">
                Outer Circle
              </h3>
              <p className="text-xs text-[#5E4A35] leading-relaxed">
                Institutionalized second-language varieties (India, Singapore, Nigeria, Philippines). Richly codified with distinctive idioms, pragmatic politeness tags, and syntax.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#FAD6B4] text-[10px] font-mono-tag text-[#C97420] font-bold">
              ~500M Institutional Speakers
            </div>
          </div>

          {/* Expanding Circle - Nile Blue */}
          <div className="p-5 bg-[#EEFAF5] rounded-xs border-2 border-[#ACE6CF] flex flex-col justify-between shadow-xs">
            <div>
              <div className="w-7 h-7 rounded-xs bg-[#187557] text-white flex items-center justify-center text-xs font-mono-tag font-bold mb-3 shadow-2xs">
                3
              </div>
              <h3 className="text-base font-bold font-serif-display text-[#242A36] mb-2">
                Expanding Circle
              </h3>
              <p className="text-xs text-[#35594C] leading-relaxed">
                Nations utilizing English as an International Lingua Franca (ELF) in trade, science, and technology (Japan, Germany, Brazil, UAE).
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#ACE6CF] text-[10px] font-mono-tag text-[#187557] font-bold">
              ~1B+ Lingua Franca Communicators
            </div>
          </div>
        </div>
      </div>

      {/* Section 02: Empirical Evidence */}
      <div className="slide-frame rounded-xs p-6 sm:p-10 border-2 border-[#E6DDD1] bg-[#FFFDF9] shadow-xs space-y-6">
        <div>
          <span className="text-[11px] font-mono-tag font-bold text-[#E48C35] uppercase tracking-wider block mb-1">
            SECTION 02 — EMPIRICAL EVIDENCE
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold font-serif-display text-[#242A36]">
            Where Does Misunderstanding Actually Happen?
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-[#5C5243] leading-relaxed">
            Standard automated spellcheckers flag words based on a single dictionary. However, true workplace breakdowns happen when a word is 100% grammatically correct in the sender's dialect, but carries an unintended meaning or harsh register in the recipient's dialect:
          </p>
        </div>

        {/* Empirical Table */}
        <div className="overflow-x-auto rounded-xs border-2 border-[#E2D8CB] bg-[#FFFDF9]">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#FAF5EE] border-b border-[#E2D8CB] text-[11px] font-mono-tag uppercase font-bold text-[#6B6152]">
                <th className="p-4">PHRASE</th>
                <th className="p-4">INTENDED DIALECT MEANING</th>
                <th className="p-4">CROSS-BORDER PERCEPTION</th>
                <th className="p-4 text-center">FRICTION RISK</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EAE0D4]">
              <tr className="hover:bg-[#FFF8EC] transition-colors">
                <td className="p-4 font-bold font-serif-display text-sm text-[#242A36]">
                  “Please revert by Monday”
                </td>
                <td className="p-4 text-[#4A4032]">
                  <strong className="text-[#242A36]">Indian / Singapore:</strong> “Please reply / respond”
                </td>
                <td className="p-4 text-[#4A4032]">
                  <strong className="text-[#242A36]">American:</strong> “Roll back software or revert a state”
                </td>
                <td className="p-4 text-center">
                  <span className="px-2.5 py-1 rounded-xs text-[10px] font-mono-tag font-bold bg-[#FFF4DC] text-[#B87010] border border-[#FFDE9E]">
                    Medium
                  </span>
                </td>
              </tr>

              <tr className="hover:bg-[#FFF8EC] transition-colors">
                <td className="p-4 font-bold font-serif-display text-sm text-[#242A36]">
                  “Let’s table this topic”
                </td>
                <td className="p-4 text-[#4A4032]">
                  <strong className="text-[#242A36]">American:</strong> “Postpone / delay discussion”
                </td>
                <td className="p-4 text-[#4A4032]">
                  <strong className="text-[#242A36]">British / Indian:</strong> “Put on the table for immediate discussion”
                </td>
                <td className="p-4 text-center">
                  <span className="px-2.5 py-1 rounded-xs text-[10px] font-mono-tag font-bold bg-[#FFF0ED] text-[#B52C14] border border-[#FCA592]">
                    High Risk
                  </span>
                </td>
              </tr>

              <tr className="hover:bg-[#FFF8EC] transition-colors">
                <td className="p-4 font-bold font-serif-display text-sm text-[#242A36]">
                  “Can we prepone the sync?”
                </td>
                <td className="p-4 text-[#4A4032]">
                  <strong className="text-[#242A36]">Indian / Singapore:</strong> “Reschedule to an earlier time”
                </td>
                <td className="p-4 text-[#4A4032]">
                  <strong className="text-[#242A36]">American:</strong> Unrecognized; may assume typo for postpone
                </td>
                <td className="p-4 text-center">
                  <span className="px-2.5 py-1 rounded-xs text-[10px] font-mono-tag font-bold bg-[#FFF4DC] text-[#B87010] border border-[#FFDE9E]">
                    Medium
                  </span>
                </td>
              </tr>

              <tr className="hover:bg-[#FFF8EC] transition-colors">
                <td className="p-4 font-bold font-serif-display text-sm text-[#242A36]">
                  “Send the report, can?”
                </td>
                <td className="p-4 text-[#4A4032]">
                  <strong className="text-[#242A36]">Singapore:</strong> Polite check on feasibility (“Is that okay?”)
                </td>
                <td className="p-4 text-[#4A4032]">
                  <strong className="text-[#242A36]">American / Global:</strong> Curt interrogation of physical ability
                </td>
                <td className="p-4 text-center">
                  <span className="px-2.5 py-1 rounded-xs text-[10px] font-mono-tag font-bold bg-[#FFF4DC] text-[#B87010] border border-[#FFDE9E]">
                    Medium
                  </span>
                </td>
              </tr>

              <tr className="hover:bg-[#FFF8EC] transition-colors">
                <td className="p-4 font-bold font-serif-display text-sm text-[#242A36]">
                  “Kindly do the needful”
                </td>
                <td className="p-4 text-[#4A4032]">
                  <strong className="text-[#242A36]">Indian:</strong> Standard polite sign-off for executing required steps
                </td>
                <td className="p-4 text-[#4A4032]">
                  <strong className="text-[#242A36]">American / Global:</strong> May be perceived as archaic or ambiguous
                </td>
                <td className="p-4 text-center">
                  <span className="px-2.5 py-1 rounded-xs text-[10px] font-mono-tag font-bold bg-[#FFF4DC] text-[#B87010] border border-[#FFDE9E]">
                    Medium
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Ethical Reflection vs Prescriptive Gatekeeping Card */}
      <div className="slide-frame rounded-xs p-6 sm:p-8 border-2 border-[#FFE4A6] bg-[#FFF9EC] shadow-xs flex items-start space-x-4">
        <ShieldCheck className="w-6 h-6 text-[#E48C35] shrink-0 mt-0.5" />
        <div className="space-y-1.5">
          <h3 className="text-base font-bold font-serif-display text-[#242A36]">
            Ethical Reflection vs. Prescriptive Gatekeeping
          </h3>
          <p className="text-xs sm:text-sm text-[#574C3C] leading-relaxed font-sans">
            Will It Travel (WIT) operates under a strict principle of <strong className="text-[#242A36]">descriptive linguistic parity</strong>. We believe no variety of English is inherently superior. Rather than enforcing assimilation to a single Anglo-American baseline, WIT provides actionable international rewrites that empower senders to communicate clearly with their chosen global audience.
          </p>
        </div>
      </div>
    </div>
  );
};
