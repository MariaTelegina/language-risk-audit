import React, { useEffect, useState } from 'react';
import { Check, Compass, FileText, Layers, Sparkles, Users } from 'lucide-react';

interface HorizontalAuditNavProps {
  hasFlaggedPhrases: boolean;
}

interface StepItem {
  id: string;
  num: string;
  label: string;
  shortLabel: string;
  icon: React.ComponentType<{ className?: string }>;
}

export const HorizontalAuditNav: React.FC<HorizontalAuditNavProps> = ({
  hasFlaggedPhrases,
}) => {
  const [activeSection, setActiveSection] = useState<string>('report-overview');

  const steps: StepItem[] = [
    {
      id: 'report-overview',
      num: '01',
      label: 'Audit Overview',
      shortLabel: 'Audit Overview',
      icon: FileText,
    },
    {
      id: 'clear-rewrite',
      num: '02',
      label: 'Clear Rewrite',
      shortLabel: 'Clear Rewrite',
      icon: Sparkles,
    },
    {
      id: 'audience-perspectives',
      num: '03',
      label: 'Audience Perspectives',
      shortLabel: 'Audience Perspectives',
      icon: Users,
    },
    ...(hasFlaggedPhrases
      ? [
          {
            id: 'flagged-phrases',
            num: '04',
            label: 'Flagged Phrases',
            shortLabel: 'Flagged Phrases',
            icon: Layers,
          },
        ]
      : []),
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 140;

      for (let i = steps.length - 1; i >= 0; i--) {
        const element = document.getElementById(steps[i].id);
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(steps[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [steps]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const topOffset = 130; // offset for sticky main nav (64px) + subnav (~48px) + padding
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - topOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
      setActiveSection(id);
    }
  };

  return (
    <div
      id="horizontal-audit-nav"
      className="sticky top-16 z-20 bg-[#E48C35] border-b border-[#C97420] shadow-sm no-print w-full py-1.5 px-3 sm:px-6 lg:px-8 transition-all animate-in fade-in slide-in-from-top-1 duration-200"
    >
      <div className="max-w-5xl mx-auto flex items-center justify-between gap-2 overflow-x-auto scrollbar-none touch-pan-x" style={{ WebkitOverflowScrolling: 'touch' }}>
        {/* Left Navigator Label */}
        <div className="flex items-center space-x-2 shrink-0 hidden md:flex">
          <span className="w-2 h-2 rounded-full bg-[#FFF4DC] animate-pulse" />
          <span className="text-[10px] font-mono-tag font-bold uppercase tracking-wider text-white">
            Audit Sections:
          </span>
        </div>

        {/* Navigation Step Buttons (Horizontal Scrollable list) */}
        <div className="flex items-center space-x-1.5 sm:space-x-2 shrink-0 flex-nowrap py-0.5">
          {steps.map((step) => {
            const isActive = activeSection === step.id;

            return (
              <button
                key={step.id}
                type="button"
                onClick={() => scrollToSection(step.id)}
                className={`flex items-center space-x-1.5 px-3 sm:px-3.5 py-1.5 rounded-full text-xs font-mono-tag font-bold whitespace-nowrap transition-all cursor-pointer shrink-0 shadow-2xs ${
                  isActive
                    ? 'bg-[#FFFDF9] text-[#242A36] shadow-sm scale-100'
                    : 'text-white/90 hover:text-white hover:bg-white/20 bg-white/10'
                }`}
              >
                <span
                  className={`text-[10px] font-mono-tag font-bold ${
                    isActive ? 'text-[#E48C35]' : 'text-[#FFE8C2]'
                  }`}
                >
                  {step.num}
                </span>
                <span className="font-semibold text-[11px] sm:text-xs tracking-tight">{step.label}</span>
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E48C35] shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {/* Right quick status tag */}
        <div className="shrink-0 hidden lg:flex items-center space-x-1.5 text-[10px] font-mono-tag font-bold text-white bg-white/20 px-2.5 py-1 rounded-full border border-white/25">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FFF4DC]" />
          <span>INSIGHTS READY</span>
        </div>
      </div>
    </div>
  );
};
