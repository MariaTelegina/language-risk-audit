import React, { useState } from 'react';
import { Navbar, NavTab } from './components/Navbar';
import { MessageChecker } from './components/MessageChecker';
import { ResearchTheoryPage } from './components/ResearchTheoryPage';
import { AboutPage } from './components/AboutPage';
import { ContactPage } from './components/ContactPage';
import { Footer } from './components/Footer';
import { DisclaimerModal } from './components/DisclaimerModal';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('audit');
  const [isDisclaimerOpen, setIsDisclaimerOpen] = useState<boolean>(true);
  const [hasAcknowledgedDisclaimer, setHasAcknowledgedDisclaimer] = useState<boolean>(false);

  const handleSelectTab = (tab: NavTab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCloseDisclaimer = () => {
    setIsDisclaimerOpen(false);
    setHasAcknowledgedDisclaimer(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F6F1EA] text-[#242A36] font-sans antialiased selection:bg-[#E48C35]/20 selection:text-[#E48C35] relative">
      {/* First Visit Linguistic Reflection Disclaimer Modal Overlay */}
      <DisclaimerModal
        isOpen={isDisclaimerOpen}
        onClose={handleCloseDisclaimer}
      />

      {/* Website Container - with graceful fade-in once acknowledged */}
      <div
        className={`flex-1 flex flex-col transition-all duration-700 ease-out ${
          isDisclaimerOpen && !hasAcknowledgedDisclaimer
            ? 'opacity-30 blur-[2px] scale-[0.99] pointer-events-none'
            : 'opacity-100 blur-0 scale-100'
        }`}
      >
        <Navbar
          activeTab={activeTab}
          onSelectTab={handleSelectTab}
          onOpenDisclaimer={() => setIsDisclaimerOpen(true)}
        />

        <main className="flex-1">
          {activeTab === 'audit' && <MessageChecker />}
          {activeTab === 'research' && (
            <ResearchTheoryPage onBackToAudit={() => handleSelectTab('audit')} />
          )}
          {activeTab === 'about' && (
            <AboutPage onBackToAudit={() => handleSelectTab('audit')} />
          )}
          {activeTab === 'contact' && (
            <ContactPage onBackToAudit={() => handleSelectTab('audit')} />
          )}
        </main>

        <Footer onOpenDisclaimer={() => setIsDisclaimerOpen(true)} />
      </div>
    </div>
  );
}
