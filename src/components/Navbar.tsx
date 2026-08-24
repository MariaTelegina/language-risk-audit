import React, { useState } from 'react';
import { GlobeLogo } from './GlobeLogo';
import { Compass, Menu, X, ShieldCheck } from 'lucide-react';

export type NavTab = 'audit' | 'research' | 'about' | 'contact';

interface NavbarProps {
  activeTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  onOpenDisclaimer?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, onSelectTab, onOpenDisclaimer }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: NavTab; label: string }[] = [
    { id: 'audit', label: 'Audit Tool' },
    { id: 'research', label: 'Research and Theory' },
    { id: 'about', label: 'About' }//,
    //{ id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (tab: NavTab) => {
    onSelectTab(tab);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-30 bg-[#FFFDF9]/95 backdrop-blur-md border-b border-[#E6DDD1] no-print shadow-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand identity: Globe Logo + Will It Travel + WIT badge + Subtitle */}
        <button
          type="button"
          onClick={() => handleNavClick('audit')}
          className="flex items-center space-x-2.5 sm:space-x-3 text-left group cursor-pointer"
        >
          <GlobeLogo size={36} />
          <div>
            <div className="flex items-center space-x-1.5 sm:space-x-2">
              <span className="font-serif-display font-bold text-base sm:text-lg text-[#242A36] tracking-tight group-hover:text-[#E48C35] transition-colors">
                Will It Travel
              </span>
              <span className="px-1.5 sm:px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-bold font-mono-tag bg-[#FFF4DC] text-[#B87010] border border-[#FFDE9E]">
                WIT
              </span>
            </div>
            <p className="text-[10px] sm:text-[11px] text-[#736B5E] hidden sm:block font-mono-tag">
              Cross-Dialect English Message Perception
            </p>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavClick(item.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono-tag font-bold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#008AA1] text-white shadow-xs'
                    : 'text-[#5A5043] hover:text-[#008AA1] hover:bg-[#F3EBE0]'
                }`}
              >
                {item.label}
              </button>
            );
          })}

          {/* Regional coverage tag with Antwerp Blue & Nile Blue */}
          <div className="ml-2 flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-[#E6F6F9] border border-[#BCE4ED] text-[11px] font-mono-tag font-bold text-[#006C7E]">
            <Compass className="w-3 h-3 text-[#E48C35]" />
            <span>US · IN · SG</span>
          </div>
        </nav>

        {/* Mobile menu hamburger button */}
        <div className="flex md:hidden items-center space-x-2">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl bg-[#FAF5EE] border border-[#E0D5C7] text-[#4A4134] hover:bg-[#F3ECE0] transition-colors cursor-pointer shadow-xs focus:outline-none focus:ring-2 focus:ring-[#E48C35]/30"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FFFDF9] border-b border-[#E6DDD1] px-4 py-3 space-y-2 animate-in fade-in slide-in-from-top-2 duration-200 shadow-md">
          <div className="flex items-center justify-between pb-2 mb-1 border-b border-[#EAE0D4]">
            <span className="text-[10px] font-mono-tag font-bold text-[#7A7061] uppercase tracking-wider">
              Navigation Menu
            </span>
            <div className="flex items-center space-x-1 text-[10px] font-mono-tag font-bold text-[#006C7E] bg-[#E6F6F9] px-2 py-0.5 rounded-full border border-[#BCE4ED]">
              <Compass className="w-2.5 h-2.5 text-[#E48C35]" />
              <span>US · IN · SG</span>
            </div>
          </div>

          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-mono-tag font-bold transition-all cursor-pointer flex items-center justify-between ${
                  isActive
                    ? 'bg-[#008AA1] text-white shadow-xs'
                    : 'text-[#4E4437] hover:bg-[#FAF5EE] bg-[#FAF7F2] border border-[#EFE8DE]'
                }`}
              >
                <span>{item.label}</span>
                {isActive && <span className="w-2 h-2 rounded-full bg-white" />}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
