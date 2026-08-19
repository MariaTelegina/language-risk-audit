import React from 'react';
import { Globe, MessageSquareQuote } from 'lucide-react';

export const FEEDBACK_URL = ''; // Configurable feedback URL

export const Navbar: React.FC = () => {
  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-xs border-b border-slate-200 no-print">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-2xs">
            <Globe className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-bold text-base text-slate-900 tracking-tight">
                Language Risk Audit
              </span>
            </div>
            <p className="text-xs text-slate-500 hidden sm:block">
              Cross-variety English interpretation checker
            </p>
          </div>
        </div>

        {/* Right side actions */}
        <div className="flex items-center space-x-3">
          {FEEDBACK_URL && (
            <a
              href={FEEDBACK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-md text-xs font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 transition-colors"
            >
              <MessageSquareQuote className="w-3.5 h-3.5" />
              <span>Share feedback</span>
            </a>
          )}
          <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full border border-slate-200">
            US · IN · SG Englishes
          </span>
        </div>
      </div>
    </header>
  );
};
