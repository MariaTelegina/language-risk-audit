import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white text-slate-500 border-t border-slate-200 py-6 px-4 sm:px-6 lg:px-8 mt-auto no-print">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        <div className="flex items-center space-x-2">
          <span className="font-semibold text-slate-900">Language Risk Audit</span>
          <span className="text-slate-300">|</span>
          <span className="text-slate-500">Cross-Variety English Checker</span>
        </div>

        <p className="text-slate-500 text-center sm:text-right max-w-xl leading-relaxed">
          Guidance on cross-variety English interpretation.
        </p>
      </div>
    </footer>
  );
};
