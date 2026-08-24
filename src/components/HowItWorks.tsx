import React from 'react';
import { FileText, Globe2, MessageSquare, ShieldAlert } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      number: '01',
      title: 'Share your draft',
      desc: 'Drop in an email, Slack update, project note, or common phrase you want to check.',
      icon: FileText,
      theme: {
        bg: 'bg-[#FFF5EB]',
        border: 'border-[#FAD6B4]',
        badgeBg: 'bg-[#E48C35]',
        badgeText: 'text-white',
        iconColor: 'text-[#E48C35]',
        dotColor: 'bg-[#E48C35]',
        accentName: 'Warm Orange',
      },
    },
    {
      number: '02',
      title: 'Select your readers',
      desc: 'Choose the English varieties of your teammates across the US, India, or Singapore.',
      icon: Globe2,
      theme: {
        bg: 'bg-[#FFF9EC]',
        border: 'border-[#FFE4A6]',
        badgeBg: 'bg-[#FFB852]',
        badgeText: 'text-[#5C3800]',
        iconColor: 'text-[#D48B17]',
        dotColor: 'bg-[#FFB852]',
        accentName: 'Cream Yellow',
      },
    },
    {
      number: '03',
      title: 'Choose the setting',
      desc: 'Pick your communication setting—from everyday workplace chats to customer support.',
      icon: MessageSquare,
      theme: {
        bg: 'bg-[#EBF7FA]',
        border: 'border-[#BBE4ED]',
        badgeBg: 'bg-[#008AA1]',
        badgeText: 'text-white',
        iconColor: 'text-[#008AA1]',
        dotColor: 'bg-[#008AA1]',
        accentName: 'Antwerp Blue',
      },
    },
    {
      number: '04',
      title: 'Get helpful clarity',
      desc: 'Discover how each phrase is interpreted and get a universally clear rewrite.',
      icon: ShieldAlert,
      theme: {
        bg: 'bg-[#EEFAF5]',
        border: 'border-[#ACE6CF]',
        badgeBg: 'bg-[#187557]',
        badgeText: 'text-white',
        iconColor: 'text-[#187557]',
        dotColor: 'bg-[#ACE6CF]',
        accentName: 'Nile Blue',
      },
    },
  ];

  return (
    <section
      id="how-it-works-section"
      className="slide-frame rounded-2xl p-6 sm:p-7 mb-8 border border-[#E6DDD1] bg-[#FFFDF9] no-print shadow-md warm-card"
    >
      <div className="flex items-center justify-between pb-3.5 mb-5 border-b border-[#EAE0D4]">
        <div className="flex items-center space-x-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#E48C35] animate-pulse" />
          <h2 className="text-xs font-bold text-[#242A36] uppercase tracking-wider font-mono-tag">
            How It Works
          </h2>
        </div>
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-[#E48C35]" />
          <span className="w-2 h-2 rounded-full bg-[#FFB852]" />
          <span className="w-2 h-2 rounded-full bg-[#008AA1]" />
          <span className="w-2 h-2 rounded-full bg-[#ACE6CF]" />
          <span className="text-[11px] font-mono-tag text-[#7A7061] ml-1 hidden sm:inline">
            Quick 4-Step Cross-Cultural Guide
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          return (
            <div
              key={idx}
              className={`p-4.5 rounded-xl ${step.theme.bg} border-2 ${step.theme.border} flex flex-col justify-between relative group shadow-sm hover:shadow-md transition-all`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span
                    className={`w-7 h-7 rounded-lg ${step.theme.badgeBg} ${step.theme.badgeText} flex items-center justify-center text-xs font-mono-tag font-bold shadow-xs`}
                  >
                    {step.number}
                  </span>
                  <Icon className={`w-4 h-4 ${step.theme.iconColor}`} />
                </div>
                <h3 className="text-xs font-bold text-[#242A36] mb-1.5 font-serif-display">
                  {step.title}
                </h3>
                <p className="text-[11px] text-[#55493A] leading-relaxed font-normal">
                  {step.desc}
                </p>
              </div>

              <div className="mt-3.5 pt-2 border-t border-black/10 flex items-center justify-between">
                <span className="text-[9px] font-mono-tag uppercase font-bold text-[#7A6E5E]">
                  Step {step.number}
                </span>
                <span
                  className={`w-2 h-2 rounded-full ${step.theme.dotColor} shrink-0`}
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
