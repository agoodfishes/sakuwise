"use client";

import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import {
  BookOpen,
  MessageCircle,
  HelpCircle,
  ChevronDown,
  ChevronRight,
  Mail,
  Sparkles,
  Shield,
  Smartphone,
  TrendingUp,
  Wallet,
  Target,
} from "lucide-react";

const faqs = [
  {
    q: "How do I split my money into multiple budget pockets?",
    a: "Open the 'Monthly budget' tab, then click 'Add category' to create a new pocket. Enter the pocket name (e.g. Food, Transport, Entertainment) and set its rupiah allocation. Sakuwise automatically calculates the budget that is still unallocated.",
  },
  {
    q: "Is my financial data safe on Sakuwise?",
    a: "Yes, all data is encrypted using the AES-256 standard. Your data is never sold to third parties. You can also export or delete all your data at any time from the Settings page.",
  },
  {
    q: "How does the Sakuwise AI Assistant work?",
    a: "The AI Assistant analyzes your spending patterns and gives personalized, data-based advice. It only reads the transactions you enter — it is not connected to any bank account without your explicit permission.",
  },
  {
    q: "Can I use Sakuwise for more than one source of income?",
    a: "Of course! In Monthly Budget, you can set up your allowance from several sources. Sakuwise combines them all into one neat total view.",
  },
  {
    q: "How do I set up bill reminders?",
    a: "Open the 'Bills & reminders' tab, click 'Add Bill', and enter the bill name, due date, and amount. Sakuwise will automatically show a countdown on the Overview page.",
  },
  {
    q: "Is there a Sakuwise mobile app?",
    a: "Sakuwise is currently available as a Progressive Web App (PWA) that you can install on your smartphone. Open sakuwise.id in your phone's browser, then choose 'Add to Home Screen'. Native iOS/Android versions are in development.",
  },
];

const guides = [
  {
    icon: Wallet,
    title: "The 50/30/20 Budget Pocket Method",
    desc: "Allocate 50% to needs, 30% to wants, and 20% to savings.",
    color: "bg-[#E8EFEA]",
    iconColor: "text-[#244833]",
  },
  {
    icon: TrendingUp,
    title: "How to Read Your Spending Charts",
    desc: "Understand daily and monthly trends to make smarter decisions.",
    color: "bg-[#FEF3E2]",
    iconColor: "text-[#9A5B15]",
  },
  {
    icon: Target,
    title: "Effective Savings Goal Strategies",
    desc: "Break big goals into small, consistent contributions.",
    color: "bg-[#EAE8F2]",
    iconColor: "text-[#4B3B70]",
  },
  {
    icon: Smartphone,
    title: "Using Sakuwise on Your Phone",
    desc: "Install it as a PWA for quick access without opening a browser.",
    color: "bg-[#F5EFE6]",
    iconColor: "text-[#71542B]",
  },
];

export default function HelpView() {
  const { user } = useAuth();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [contactSent, setContactSent] = useState(false);
  const [contactMsg, setContactMsg] = useState("");

  const handleContact = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactMsg.trim()) return;
    setContactSent(true);
    setContactMsg("");
    setTimeout(() => setContactSent(false), 4000);
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-200 max-w-5xl">

      {/* Header Banner */}
      <div className="bg-[#EBF1EC] rounded-2xl p-6 sm:p-8 border border-[#DCE5DE] flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-[#244833] text-white flex items-center justify-center flex-shrink-0">
          <HelpCircle className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-base font-bold text-[#1E3A2B]">
            Sakuwise Help Center & Support
          </h2>
          <p className="text-xs text-[#596D5F] mt-0.5">
            Have a question? Find the answer here, or contact our team directly.
          </p>
        </div>
      </div>

      {/* Quick Guide Cards */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <BookOpen className="w-4 h-4 text-[#4D7A5E]" />
          <h3 className="text-sm font-bold text-[#1E3A2B]">Quick Guides</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {guides.map((g, i) => {
            const Icon = g.icon;
            return (
              <button
                key={i}
                type="button"
                onClick={() => alert(`The "${g.title}" guide will be available soon!`)}
                className="flex items-start gap-4 p-5 bg-white rounded-2xl border border-[#E7EDE7] shadow-2xs hover:border-[#B8CEBC] hover:shadow-md transition-all text-left group cursor-pointer"
              >
                <div className={`w-10 h-10 rounded-xl ${g.color} flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform`}>
                  <Icon className={`w-5 h-5 ${g.iconColor}`} />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-[#1E3A2B] leading-snug">{g.title}</p>
                  <p className="text-[11px] text-[#718576] mt-0.5 leading-relaxed">{g.desc}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-[#9BAD9F] flex-shrink-0 mt-0.5 group-hover:text-[#1E3A2B] transition-colors" />
              </button>
            );
          })}
        </div>
      </div>

      {/* FAQ Accordion */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <MessageCircle className="w-4 h-4 text-[#4D7A5E]" />
          <h3 className="text-sm font-bold text-[#1E3A2B]">Frequently Asked Questions</h3>
        </div>
        <div className="bg-white rounded-2xl border border-[#E7EDE7] shadow-2xs overflow-hidden divide-y divide-[#F2F5F2]">
          {faqs.map((f, i) => (
            <div key={i}>
              <button
                type="button"
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 p-5 text-left hover:bg-[#FAF8F5] transition-colors cursor-pointer"
              >
                <span className="text-xs font-semibold text-[#1E3A2B] leading-snug">
                  {f.q}
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-[#7B8E81] flex-shrink-0 transition-transform duration-200 ${
                    openFaq === i ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openFaq === i && (
                <div className="px-5 pb-5 text-xs text-[#596D5F] leading-relaxed bg-[#FAFCFA] border-t border-[#F0F4F0]">
                  <p className="pt-3">{f.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Contact Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Send Message */}
        <div className="bg-white rounded-2xl p-6 border border-[#E7EDE7] shadow-2xs">
          <div className="flex items-center gap-2 mb-4">
            <Mail className="w-4 h-4 text-[#4D7A5E]" />
            <h3 className="text-sm font-bold text-[#1E3A2B]">Send a Message to the Sakuwise Team</h3>
          </div>
          <p className="text-xs text-[#718576] mb-4">
            We will reply within 24 hours on business days.
          </p>

          {contactSent ? (
            <div className="p-4 rounded-xl bg-[#E7F6EC] border border-[#C6E6D0] text-xs text-[#20743E] font-semibold flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#E08C38]" />
              Message sent! We will reply soon. Thank you, {user?.name || "friend"}!
            </div>
          ) : (
            <form onSubmit={handleContact} className="space-y-3">
              <div>
                <label className="text-[11px] font-bold text-[#677C6D] uppercase tracking-wider block mb-1">
                  Message
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Describe your issue or question..."
                  value={contactMsg}
                  onChange={(e) => setContactMsg(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-[#D7E2D9] text-xs text-[#1E3A2B] placeholder:text-gray-400 focus:outline-none focus:border-[#224431] bg-[#FAF8F5] resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full min-h-11 md:min-h-0 py-2.5 rounded-xl text-xs font-bold text-white bg-[#224431] hover:bg-[#163323] transition-colors cursor-pointer"
              >
                Send Message
              </button>
            </form>
          )}
        </div>

        {/* Other contact options */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl p-5 border border-[#E7EDE7] shadow-2xs">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#E8EFEA] flex items-center justify-center flex-shrink-0">
                <Mail className="w-4 h-4 text-[#244833]" />
              </div>
              <div>
                <p className="text-xs font-bold text-[#1E3A2B]">Email Support</p>
                <a
                  href="mailto:halo@sakuwise.id"
                  className="text-xs text-[#4D7A5E] hover:underline font-medium"
                >
                  halo@sakuwise.id
                </a>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-[#E7EDE7] shadow-2xs">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#FEF3E2] flex items-center justify-center flex-shrink-0">
                <Shield className="w-4 h-4 text-[#9A5B15]" />
              </div>
              <div>
                <p className="text-xs font-bold text-[#1E3A2B]">Privacy & Security</p>
                <p className="text-xs text-[#718576]">Data encrypted with AES-256</p>
              </div>
            </div>
          </div>

          <div className="bg-[#EBF1EC] rounded-2xl p-5 border border-[#DCE5DE]">
            <div className="flex items-start gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-[#E08C38] fill-[#E08C38] flex-shrink-0 mt-0.5" />
              <p className="text-xs font-bold text-[#1E3A2B]">Coba AI Assistant</p>
            </div>
            <p className="text-[11px] text-[#596D5F] leading-relaxed">
              Ask Sakuwise AI directly for personalized money management advice.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
