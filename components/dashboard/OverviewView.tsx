"use client";

import React from "react";
import { ArrowRight, ArrowUpRight, ArrowDownLeft } from "lucide-react";
import {
  useFinance,
  formatRupiah,
  describeDate,
} from "@/context/FinanceContext";

interface OverviewViewProps {
  onSwitchTab: (tab: string) => void;
  onOpenAddExpense: () => void;
  onOpenAddIncome: () => void;
}

const categoryBadges: Record<string, { bg: string; text: string }> = {
  "Food & drinks": { bg: "bg-[#FEF1E1]", text: "text-[#9A5B15]" },
  Transport: { bg: "bg-[#E3EFE7]", text: "text-[#245235]" },
  "Academic needs": { bg: "bg-[#E9EDE9]", text: "text-[#425748]" },
  Personal: { bg: "bg-[#F5EFE6]", text: "text-[#71542B]" },
  Accommodation: { bg: "bg-[#EAE8F2]", text: "text-[#4B3B70]" },
  "Emergency fund": { bg: "bg-[#F8EFEA]", text: "text-[#7D452B]" },
  Income: { bg: "bg-[#E7F6EC]", text: "text-[#20743E]" },
};

export default function OverviewView({
  onSwitchTab,
  onOpenAddExpense,
  onOpenAddIncome,
}: OverviewViewProps) {
  const { income, transactions, summary } = useFinance();
  const { today, daysLeft, totalSpent, extraIncome, remaining, dailyLimit, leftToday, spentToday } = summary;

  const totalIncome = income + extraIncome;
  const recent = transactions.slice(0, 6);
  const overToday = leftToday < 0;

  return (
    <div className="space-y-5 sm:space-y-6 animate-in fade-in duration-200">
      {/* 1. TOTAL BALANCE + ACTIONS */}
      <div className="bg-[#224431] text-white rounded-2xl p-6 sm:p-8 border border-[#2D583F] shadow-md flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
        <div className="min-w-0">
          <p className="text-xs font-medium text-[#B4CEBD]">Total balance</p>
          <p className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mt-1.5 break-words">
            {formatRupiah(remaining)}
          </p>
          <p className="text-xs text-[#A1BFA9] mt-2.5">
            {remaining < 0
              ? "You've gone over your allowance"
              : overToday
                ? `${formatRupiah(spentToday)} spent today Â· ${formatRupiah(-leftToday)} over today's limit`
                : `Daily limit ${formatRupiah(dailyLimit)} Â· ${formatRupiah(leftToday)} left today Â· ${daysLeft} ${daysLeft === 1 ? "day" : "days"} to go`}
          </p>
        </div>

        <div className="grid grid-cols-2 sm:flex sm:flex-col lg:flex-row gap-3 sm:flex-shrink-0">
          <button
            type="button"
            onClick={onOpenAddIncome}
            className="min-h-11 inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold bg-white text-[#1E3A2B] hover:bg-[#F1F6F2] transition-colors cursor-pointer"
          >
            <ArrowDownLeft className="w-4 h-4" />
            <span>Income</span>
          </button>
          <button
            type="button"
            onClick={onOpenAddExpense}
            className="min-h-11 inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold bg-[#E08C38] text-white hover:bg-[#CC7B2B] transition-colors cursor-pointer"
          >
            <ArrowUpRight className="w-4 h-4" />
            <span>Expense</span>
          </button>
        </div>
      </div>

      {/* 2. TOTAL INCOME & TOTAL EXPENSES */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#E7EDE7] shadow-2xs">
          <p className="text-xs font-medium text-[#718576]">Total income</p>
          <p className="text-2xl sm:text-3xl font-extrabold text-[#1E3A2B] tracking-tight mt-1.5 break-words">
            {formatRupiah(totalIncome)}
          </p>
          <p className="text-xs text-[#7D9183] mt-2">Allowance and other income this period</p>
        </div>

        <div className="bg-[#FFF9F0] rounded-2xl p-5 sm:p-6 border border-[#FBEAD4] shadow-2xs">
          <p className="text-xs font-medium text-[#8F7249]">Total expenses</p>
          <p className="text-2xl sm:text-3xl font-extrabold text-[#1E3A2B] tracking-tight mt-1.5 break-words">
            {formatRupiah(totalSpent)}
          </p>
          <p className="text-xs text-[#8F7249] mt-2">Spent so far this period</p>
        </div>
      </div>

      {/* 3. RECENT TRANSACTIONS */}
      <div className="bg-white rounded-2xl p-5 sm:p-7 border border-[#E7EDE7] shadow-2xs">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-bold text-[#1E3A2B]">Recent transactions</h3>
          <button
            type="button"
            onClick={() => onSwitchTab("expenses")}
            className="min-h-11 md:min-h-0 text-xs font-semibold text-[#1E3A2B] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>View all</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        {recent.length === 0 ? (
          <div className="py-10 text-center">
            <p className="text-xs text-[#718576]">No transactions recorded yet.</p>
            <button
              type="button"
              onClick={onOpenAddExpense}
              className="mt-3 min-h-11 px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#224431] hover:bg-[#163323] cursor-pointer"
            >
              Add your first transaction
            </button>
          </div>
        ) : (
          <ul className="divide-y divide-[#F5F8F5]">
            {recent.map((t) => {
              const isIncome = t.type === "income";
              const badge = categoryBadges[t.category] || {
                bg: "bg-gray-100",
                text: "text-gray-700",
              };
              return (
                <li key={t.id} className="py-3 flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-[#1E3A2B] truncate">{t.name}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span
                        className={`inline-block px-2 py-0.5 rounded-full text-[11px] font-medium ${badge.bg} ${badge.text}`}
                      >
                        {t.category}
                      </span>
                      <span className="text-[11px] text-[#7D9183]">{describeDate(t.date, today)}</span>
                    </div>
                  </div>
                  <span
                    className={`text-xs font-bold flex-shrink-0 ${isIncome ? "text-[#20743E]" : "text-[#1E3A2B]"}`}
                  >
                    {isIncome ? "+" : "-"}
                    {formatRupiah(t.amount)}
                  </span>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
