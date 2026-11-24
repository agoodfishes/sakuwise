"use client";

import React from "react";
import { Menu, Calendar, Plus } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useFinance, parseISODate, isDemoAccount } from "@/context/FinanceContext";

interface HeaderProps {
  activeTab: string;
  onOpenAddExpense: () => void;
  onOpenMobileSidebar: () => void;
}

export default function Header({
  activeTab,
  onOpenAddExpense,
  onOpenMobileSidebar,
}: HeaderProps) {
  const { user } = useAuth();
  const { summary } = useFinance();
  const { today, periodStart } = summary;
  const userName = user?.name || "Najwa";

  const monthLabel = parseISODate(periodStart).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
  const todayLabel = parseISODate(today).toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const getBreadcrumb = () => {
    switch (activeTab) {
      case "budget":
        return "MY WORKSPACE / MONTHLY BUDGET";
      case "expenses":
        return "MY WORKSPACE / TRANSACTIONS";
      case "ai":
        return "MY WORKSPACE / AI ASSISTANT";
      case "bills":
        return "MY WORKSPACE / BILLS & REMINDERS";
      case "savings":
        return "MY WORKSPACE / SAVINGS GOALS";
      case "settings":
        return "MY WORKSPACE / SETTINGS";
      case "help":
        return "MY WORKSPACE / HELP";
      default:
        return "MY WORKSPACE / OVERVIEW";
    }
  };

  const getTitleAndSubtitle = () => {
    switch (activeTab) {
      case "budget":
        return {
          title: "Give every rupiah a purpose.",
          subtitle: "Plan your essentials first. Leave room for the things you love.",
        };
      case "expenses":
        return {
          title: "Small transactions. Clearer picture.",
          subtitle: "Keep track of your income and spending, one transaction at a time.",
        };
      case "ai":
        return {
          title: "Sakuwise AI Companion.",
          subtitle: `Smart financial insights tailored for ${userName}.`,
        };
      case "bills":
        return {
          title: "Never miss a due date.",
          subtitle: "Keep recurring expenses under control and on schedule.",
        };
      case "savings":
        return {
          title: "Small steps, big dreams.",
          subtitle: "Track your funds and turn ambitions into reality.",
        };
      case "settings":
        return {
          title: "Make it yours.",
          subtitle: "Manage your account and preferences.",
        };
      case "help":
        return {
          title: "We're here to help.",
          subtitle: "Answers to common questions about SakuWise.",
        };
      default:
        return {
          title: "A little planning. A lot more peace.",
          subtitle: `Here's where your money stands this month, ${userName}.`,
        };
    }
  };

  const { title, subtitle } = getTitleAndSubtitle();

  return (
    <header className="sticky top-0 z-30 bg-[#FAF8F5]/90 backdrop-blur-md border-b border-[#E8ECE8] px-4 sm:px-8 pb-5 pt-[max(1.25rem,env(safe-area-inset-top))]">
      {/* Mobile Top Bar */}
      <div className="flex md:hidden items-center justify-between pb-3 mb-3 border-b border-gray-200/60">
        <button
          type="button"
          onClick={onOpenMobileSidebar}
          className="min-w-11 min-h-11 flex items-center justify-center rounded-xl text-[#1E3A2B] hover:bg-black/5"
          aria-label="Open menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <span className="text-xs font-bold text-[#1E3A2B]">Sakuwise Workspace</span>

        <button
          type="button"
          onClick={onOpenAddExpense}
          className="min-w-11 min-h-11 rounded-xl bg-[#244833] text-white text-xs font-semibold flex items-center justify-center gap-1"
          aria-label="Add transaction"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {/* Main Header Container */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        {/* Left: Breadcrumb & Title */}
        <div className="min-w-0">
          <p className="text-[11px] font-bold tracking-widest uppercase text-[#738777]">
            {getBreadcrumb()}
          </p>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1E3A2B] tracking-tight mt-1">
            {title}
          </h1>
          <p className="text-xs sm:text-sm text-[#5C7063] mt-0.5">{subtitle}</p>
        </div>

        {/* Right: Status pill, Date, Month, and Action Button */}
        <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
          <span className="hidden sm:inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-medium text-[#496251] bg-[#E8EFEA] border border-[#D5E1D7]">
            {isDemoAccount(user?.email) ? "Sample data" : "Your data"}
          </span>

          <span className="hidden xl:inline-block text-xs font-medium text-[#718576]">
            {todayLabel}
          </span>

          <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-[#DDE6DF] shadow-2xs text-xs font-bold text-[#1E3A2B]">
            <Calendar className="w-3.5 h-3.5 text-[#5B7664]" />
            <span>{monthLabel}</span>
          </div>

          <button
            type="button"
            onClick={onOpenAddExpense}
            className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-white bg-[#224431] hover:bg-[#163324] shadow-sm hover:shadow active:scale-[0.98] transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>Add transaction</span>
          </button>
        </div>
      </div>
    </header>
  );
}
