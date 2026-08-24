import React, { useState } from 'react';
import {
  ArrowLeft,
  Mail,
  Phone,
  Send,
  Copy,
  Check,
  Globe,
  Share2,
  Sparkles,
  MessageSquare,
  CheckCircle2,
} from 'lucide-react';

interface ContactPageProps {
  onBackToAudit: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onBackToAudit }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [org, setOrg] = useState('');
  const [topic, setTopic] = useState('General Inquiry');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const handleCopy = async (text: string, type: 'email' | 'phone') => {
    try {
      await navigator.clipboard.writeText(text);
      if (type === 'email') {
        setCopiedEmail(true);
        setTimeout(() => setCopiedEmail(false), 2000);
      } else {
        setCopiedPhone(true);
        setTimeout(() => setCopiedPhone(false), 2000);
      }
    } catch {}
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim() || !message.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

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

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
        {/* Left Column: Form Card (7 cols) */}
        <div className="lg:col-span-7 slide-frame rounded-2xl p-5 sm:p-8 border-2 border-[#E6DDD1] bg-[#FFFDF9] shadow-md warm-card">
          <div className="flex items-center space-x-2.5 pb-4 mb-5 sm:mb-6 border-b border-[#EAE0D4]">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#E48C35] text-white flex items-center justify-center shadow-xs">
              <MessageSquare className="w-5 h-5" />
            </div>
            <h1 className="text-xl sm:text-2xl font-bold font-serif-display text-[#242A36]">
              Send a Message
            </h1>
          </div>

          {submitted ? (
            <div className="p-6 bg-[#EEFAF5] border-2 border-[#ACE6CF] rounded-xl text-center space-y-3 shadow-xs">
              <CheckCircle2 className="w-10 h-10 text-[#187557] mx-auto" />
              <h3 className="text-lg font-bold font-serif-display text-[#12634C]">
                Thank You for Reaching Out!
              </h3>
              <p className="text-xs text-[#2A6E46] max-w-md mx-auto leading-relaxed">
                Your message has been received. Our research collective will review your inquiry or dataset submission promptly.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  setMessage('');
                }}
                className="mt-3 px-5 py-2.5 bg-white text-[#187557] font-mono-tag font-bold text-xs rounded-xl border border-[#ACE6CF] hover:bg-[#F4FAF6] transition-colors cursor-pointer shadow-2xs"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5 text-xs">
              {/* Full Name */}
              <div>
                <label
                  htmlFor="full-name"
                  className="font-mono-tag font-bold text-[#006C7E] block uppercase text-[10px] mb-1.5"
                >
                  FULL NAME *
                </label>
                <input
                  id="full-name"
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Dr. Maya Chen"
                  className="w-full p-3 sm:p-3.5 rounded-xl border-2 border-[#DFD6CA] bg-[#FAF5EE] focus:bg-white focus:border-[#E48C35] focus:ring-2 focus:ring-[#E48C35]/15 outline-hidden transition-all text-xs text-[#242A36] shadow-inner"
                />
              </div>

              {/* Email & Org Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="email-address"
                    className="font-mono-tag font-bold text-[#006C7E] block uppercase text-[10px] mb-1.5"
                  >
                    EMAIL ADDRESS *
                  </label>
                  <input
                    id="email-address"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="maya@example.com"
                    className="w-full p-3 sm:p-3.5 rounded-xl border-2 border-[#DFD6CA] bg-[#FAF5EE] focus:bg-white focus:border-[#E48C35] focus:ring-2 focus:ring-[#E48C35]/15 outline-hidden transition-all text-xs text-[#242A36] shadow-inner"
                  />
                </div>

                <div>
                  <label
                    htmlFor="org-name"
                    className="font-mono-tag font-bold text-[#006C7E] block uppercase text-[10px] mb-1.5"
                  >
                    ORGANIZATION / UNIVERSITY
                  </label>
                  <input
                    id="org-name"
                    type="text"
                    value={org}
                    onChange={(e) => setOrg(e.target.value)}
                    placeholder="e.g. Global Research Lab"
                    className="w-full p-3 sm:p-3.5 rounded-xl border-2 border-[#DFD6CA] bg-[#FAF5EE] focus:bg-white focus:border-[#E48C35] focus:ring-2 focus:ring-[#E48C35]/15 outline-hidden transition-all text-xs text-[#242A36] shadow-inner"
                  />
                </div>
              </div>

              {/* Topic of Inquiry */}
              <div>
                <label
                  htmlFor="topic-inquiry"
                  className="font-mono-tag font-bold text-[#006C7E] block uppercase text-[10px] mb-1.5"
                >
                  TOPIC OF INQUIRY
                </label>
                <select
                  id="topic-inquiry"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="w-full p-3 sm:p-3.5 rounded-xl border-2 border-[#DFD6CA] bg-[#FAF5EE] focus:bg-white focus:border-[#E48C35] focus:ring-2 focus:ring-[#E48C35]/15 outline-hidden transition-all text-xs text-[#242A36] cursor-pointer shadow-inner"
                >
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="Linguistic Feedback">Linguistic Feedback & Corrections</option>
                  <option value="Dialect Dataset Submission">Dialect Dataset Submission</option>
                  <option value="Research Partnership">Academic & Research Partnership</option>
                  <option value="Enterprise Integration">Enterprise Workflow Integration</option>
                </select>
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="your-message"
                  className="font-mono-tag font-bold text-[#006C7E] block uppercase text-[10px] mb-1.5"
                >
                  YOUR MESSAGE *
                </label>
                <textarea
                  id="your-message"
                  rows={5}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us about your inquiry, dialect dataset, or collaboration proposal..."
                  className="w-full p-3 sm:p-3.5 rounded-xl border-2 border-[#DFD6CA] bg-[#FAF5EE] focus:bg-white focus:border-[#E48C35] focus:ring-2 focus:ring-[#E48C35]/15 outline-hidden transition-all text-xs text-[#242A36] resize-y leading-relaxed shadow-inner"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-6 rounded-xl bg-[#E48C35] hover:bg-[#C97420] active:bg-[#AF6014] text-white font-mono-tag font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                <span>{isSubmitting ? 'SENDING INQUIRY...' : 'Send Message'}</span>
              </button>
            </form>
          )}
        </div>

        {/* Right Column: Support and Follow Side Cards (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Email Support Card */}
          <div className="slide-frame rounded-xl p-5 border-2 border-[#BCE4ED] bg-[#EBF7FA] shadow-sm warm-elevated">
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#BCE4ED]">
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-[#008AA1]" />
                <span className="text-[10px] font-mono-tag font-bold uppercase text-[#006C7E]">
                  EMAIL SUPPORT
                </span>
              </div>
              <button
                type="button"
                onClick={() => handleCopy('contact@willittravel.com', 'email')}
                className="p-1.5 rounded-lg hover:bg-[#D5EEF3] text-[#006C7E] transition-colors cursor-pointer"
                title="Copy email address"
              >
                {copiedEmail ? (
                  <Check className="w-3.5 h-3.5 text-[#187557]" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </button>
            </div>
            <h3 className="text-base sm:text-lg font-bold font-serif-display text-[#242A36] mb-1">
              contact@willittravel.com
            </h3>
            <p className="text-xs text-[#41545A] leading-relaxed">
              Direct inbox for linguistic feedback, dialect submissions, and research partnerships.
            </p>
          </div>

          {/* Telephone Support Card */}
          <div className="slide-frame rounded-xl p-5 border-2 border-[#FAD6B4] bg-[#FFF5EB] shadow-sm warm-elevated">
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#FAD6B4]">
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-[#E48C35]" />
                <span className="text-[10px] font-mono-tag font-bold uppercase text-[#C97420]">
                  TELEPHONE SUPPORT
                </span>
              </div>
              <button
                type="button"
                onClick={() => handleCopy('+1 (555) 000-0000', 'phone')}
                className="p-1.5 rounded-lg hover:bg-[#FFEAD5] text-[#C97420] transition-colors cursor-pointer"
                title="Copy phone number"
              >
                {copiedPhone ? (
                  <Check className="w-3.5 h-3.5 text-[#187557]" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </button>
            </div>
            <h3 className="text-base sm:text-lg font-bold font-serif-display text-[#242A36] mb-1">
              +1 (555) 000-0000
            </h3>
            <p className="text-xs text-[#5E4A35] leading-relaxed">
              Available Mon–Fri from 9:00 AM to 6:00 PM (EST / UTC-5).
            </p>
          </div>

          {/* Follow Our Journey Card */}
          <div className="slide-frame rounded-xl p-5 border-2 border-[#FFE4A6] bg-[#FFF9EC] shadow-sm warm-elevated">
            <div className="flex items-center space-x-2 pb-2 mb-2 border-b border-[#FFE4A6]">
              <Share2 className="w-4 h-4 text-[#008AA1]" />
              <span className="text-[10px] font-mono-tag font-bold uppercase text-[#006C7E]">
                FOLLOW OUR JOURNEY
              </span>
            </div>
            <h3 className="text-sm sm:text-base font-bold font-serif-display text-[#242A36] mb-1.5">
              Stay Connected with Will It Travel
            </h3>
            <p className="text-xs text-[#63594B] leading-relaxed mb-3.5">
              Follow our publications, open-source dialect research, and cross-cultural evaluation benchmarks:
            </p>

            <div className="grid grid-cols-2 gap-2">
              <a
                href="#github"
                onClick={(e) => e.preventDefault()}
                className="p-2.5 rounded-xl bg-[#FFFDF9] hover:bg-[#F2EAE0] border border-[#DFD6CA] text-xs font-mono-tag font-bold text-[#463D31] flex items-center justify-between transition-colors shadow-2xs"
              >
                <span>GitHub</span>
                <span className="text-[10px] text-[#7A7061]">/wit-audit</span>
              </a>
              <a
                href="#twitter"
                onClick={(e) => e.preventDefault()}
                className="p-2.5 rounded-xl bg-[#FFFDF9] hover:bg-[#F2EAE0] border border-[#DFD6CA] text-xs font-mono-tag font-bold text-[#463D31] flex items-center justify-between transition-colors shadow-2xs"
              >
                <span>Twitter / X</span>
                <span className="text-[10px] text-[#7A7061]">@WillItTravel</span>
              </a>
              <a
                href="#linkedin"
                onClick={(e) => e.preventDefault()}
                className="p-2.5 rounded-xl bg-[#FFFDF9] hover:bg-[#F2EAE0] border border-[#DFD6CA] text-xs font-mono-tag font-bold text-[#463D31] flex items-center justify-between transition-colors shadow-2xs"
              >
                <span>LinkedIn</span>
                <span className="text-[10px] text-[#7A7061]">/will-it-travel</span>
              </a>
              <a
                href="#substack"
                onClick={(e) => e.preventDefault()}
                className="p-2.5 rounded-xl bg-[#FFFDF9] hover:bg-[#F2EAE0] border border-[#DFD6CA] text-xs font-mono-tag font-bold text-[#463D31] flex items-center justify-between transition-colors shadow-2xs"
              >
                <span>Substack</span>
                <span className="text-[10px] text-[#7A7061]">/research</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
