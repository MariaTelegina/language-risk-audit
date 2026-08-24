import React from 'react';
import { Navbar } from './components/Navbar';
import { MessageChecker } from './components/MessageChecker';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans antialiased">
      <Navbar />
      <main className="flex-1">
        <MessageChecker />
      </main>
      <Footer />
    </div>
  );
}
