"use client";

import React, { useState } from "react";
import { Download, Search, Check } from "lucide-react";
import { Transaction } from "./OverviewView";

interface ExpensesViewProps {
  transactions: Transaction[];
  onAddExpense: (expense: Omit<Transaction, "id">) => void;
  totalSpent: number;
}

export default function ExpensesView({
  transactions,
  onAddExpense,
  totalSpent,
}: ExpensesViewProps) {
  const allowance = 3000000;
  const remaining = allowance - totalSpent;
  const percentSpent = Math.min(100, Math.round((totalSpent / allowance) * 100));

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  
  // Right side panel form state
  const [amountInput, setAmountInput] = useState("");
  const [descInput, setDescInput] = useState("");
  const [categoryInput, setCategoryInput] = useState<Transaction["category"]>("Food & drinks");
  const [dateInput, setDateInput] = useState("17 November 2026");
  const [noteInput, setNoteInput] = useState("");
  const [savedSuccess, setSavedSuccess] = useState(false);

  const categoryBadges: Record<string, { bg: string; text: string }> = {
    "Food & drinks": { bg: "bg-[#FEF1E1]", text: "text-[#9A5B15]" },
    Transport: { bg: "bg-[#E3EFE7]", text: "text-[#245235]" },
    "Academic needs": { bg: "bg-[#E9EDE9]", text: "text-[#425748]" },
    Personal: { bg: "bg-[#F5EFE6]", text: "text-[#71542B]" },
    Accommodation: { bg: "bg-[#EAE8F2]", text: "text-[#4B3B70]" },
    "Emergency fund": { bg: "bg-[#F8EFEA]", text: "text-[#7D452B]" },
  };

  const handlePanelSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanAmount = parseInt(amountInput.replace(/[^0-9]/g, ""), 10);
    if (!descInput.trim() || isNaN(cleanAmount) || cleanAmount <= 0) return;

    onAddExpense({
      name: descInput.trim(),
      amount: cleanAmount,
      category: categoryInput,
      time: `17 Nov 2026 · ${new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })}`,
    });

    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      setAmountInput("");
      setDescInput("");
      setNoteInput("");
    }, 1200);
  };

  const filteredTransactions = transactions.filter((t) => {
    const matchesSearch = t.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = selectedCategory === "all" || t.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-200">
      
      {/* 1. TOP CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-white rounded-2xl p-6 border border-[#E7EDE7] shadow-2xs">
          <p className="text-xs font-medium text-[#718576]">Monthly allowance</p>
          <p className="text-2xl sm:text-3xl font-extrabold text-[#1E3A2B] tracking-tight mt-1.5">
            Rp3.000.000
          </p>
          <p className="text-xs text-[#7D9183] mt-2">
            Next allowance · 1 Dec 2026
          </p>
        </div>

        <div className="bg-[#FFF9F0] rounded-2xl p-6 border border-[#FBEAD4] shadow-2xs">
          <p className="text-xs font-medium text-[#8F7249]">Spent this month</p>
          <p className="text-2xl sm:text-3xl font-extrabold text-[#1E3A2B] tracking-tight mt-1.5">
            Rp{totalSpent.toLocaleString("id-ID")}
          </p>
          <p className="text-xs text-[#8F7249] mt-2 font-medium">
            {percentSpent}% of your monthly allowance
          </p>
        </div>

        <div className="bg-[#224431] text-white rounded-2xl p-6 border border-[#2D583F] shadow-md">
          <p className="text-xs font-medium text-[#B4CEBD]">Remaining balance</p>
          <p className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1.5">
            Rp{remaining.toLocaleString("id-ID")}
          </p>
          <p className="text-xs text-[#A1BFA9] mt-2">
            42% left for the next 14 days
          </p>
        </div>
      </div>

      {/* 2. MAIN TRANSACTIONS TABLE & ADD EXPENSE SIDEBAR FORM */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Your spending, all in one place */}
        <div className="lg:col-span-8 bg-white rounded-2xl p-6 sm:p-7 border border-[#E7EDE7] shadow-2xs">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-4 border-b border-[#F0F4F0] gap-2">
            <div>
              <h3 className="text-base font-bold text-[#1E3A2B]">
                Your spending, all in one place
              </h3>
              <p className="text-xs text-[#718576]">
                Every entry helps you build a better picture of your money.
              </p>
            </div>
            <button
              type="button"
              onClick={() => alert("Mengunduh laporan transaksi Sakuwise format CSV...")}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1E3A2B] hover:text-[#0F2218] transition-colors cursor-pointer self-start sm:self-auto"
            >
              <span>Export CSV</span>
              <Download className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Filters row */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 mb-5">
            <div className="sm:col-span-6 relative">
              <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search transactions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-xl border border-[#D9E3DC] text-xs font-medium text-[#1E3A2B] placeholder:text-gray-400 focus:outline-none focus:border-[#224431]"
              />
            </div>

            <div className="sm:col-span-3">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-[#D9E3DC] text-xs font-medium text-[#1E3A2B] focus:outline-none bg-white cursor-pointer"
              >
                <option value="all">All categories ▾</option>
                <option value="Food & drinks">Food & drinks</option>
                <option value="Transport">Transport</option>
                <option value="Academic needs">Academic needs</option>
                <option value="Personal">Personal</option>
                <option value="Accommodation">Accommodation</option>
                <option value="Emergency fund">Emergency fund</option>
              </select>
            </div>

            <div className="sm:col-span-3">
              <select className="w-full px-3 py-2 rounded-xl border border-[#D9E3DC] text-xs font-medium text-[#1E3A2B] focus:outline-none bg-white cursor-pointer">
                <option>This month ▾</option>
                <option>Last month</option>
                <option>All time</option>
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#F0F4F0] text-[10px] font-bold uppercase tracking-wider text-[#7A8E80]">
                  <th className="pb-3">Transaction</th>
                  <th className="pb-3">Category</th>
                  <th className="pb-3 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F5F8F5]">
                {filteredTransactions.map((t) => {
                  const badgeStyle = categoryBadges[t.category] || {
                    bg: "bg-gray-100",
                    text: "text-gray-700",
                  };
                  return (
                    <tr key={t.id} className="group hover:bg-[#FAF8F5] transition-colors">
                      <td className="py-3.5 pr-4">
                        <p className="font-semibold text-[#1E3A2B]">{t.name}</p>
                        <p className="text-[10px] text-[#7E9184]">{t.time}</p>
                      </td>
                      <td className="py-3.5 pr-4">
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-medium ${badgeStyle.bg} ${badgeStyle.text}`}
                        >
                          {t.category}
                        </span>
                      </td>
                      <td className="py-3.5 text-right font-bold text-[#1E3A2B]">
                        -Rp{t.amount.toLocaleString("id-ID")}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Pagination & Note */}
          <div className="mt-5 pt-4 border-t border-[#F0F4F0] flex flex-col sm:flex-row items-center justify-between text-xs text-[#718576] gap-3">
            <span>Showing 1-7 of 42 transactions</span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="px-3 py-1 rounded-lg border border-[#D5E1D7] text-xs font-medium hover:bg-black/5"
              >
                ← Previous
              </button>
              <button
                type="button"
                className="px-3 py-1 rounded-lg border border-[#D5E1D7] text-xs font-medium bg-[#E8EFEA] text-[#1E3A2B]"
              >
                Next →
              </button>
            </div>
          </div>

          <div className="mt-4 p-3 rounded-xl bg-[#FAF8F5] border border-[#E9EFEA] text-xs text-[#6B7E70]">
            Missing something? Add cash purchases too — the little things count.
          </div>
        </div>

        {/* Right Column: Add an expense Form & Daily Limit Widget */}
        <div className="lg:col-span-4 space-y-5">
          
          {/* Card: Add an expense */}
          <div className="bg-white rounded-2xl p-6 border border-[#E7EDE7] shadow-2xs">
            <h3 className="text-sm font-bold text-[#1E3A2B]">Add an expense</h3>
            <p className="text-xs text-[#718576] mt-0.5 mb-4">
              A few seconds now. More clarity later.
            </p>

            {savedSuccess ? (
              <div className="py-8 text-center bg-[#E7F6EC] rounded-xl border border-[#CDEED5]">
                <Check className="w-6 h-6 text-[#20743E] mx-auto mb-1 stroke-[3]" />
                <p className="text-xs font-bold text-[#20743E]">Pengeluaran Disimpan!</p>
              </div>
            ) : (
              <form onSubmit={handlePanelSubmit} className="space-y-3.5">
                <div>
                  <label className="text-[11px] font-semibold text-[#667A6C] block mb-1">
                    Amount *
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-[#1E3A2B]">
                      Rp
                    </span>
                    <input
                      type="text"
                      required
                      placeholder="0"
                      value={amountInput}
                      onChange={(e) => {
                        const raw = e.target.value.replace(/[^0-9]/g, "");
                        setAmountInput(raw ? parseInt(raw, 10).toLocaleString("id-ID") : "");
                      }}
                      className="w-full pl-9 pr-3 py-2 rounded-xl border border-[#D7E2D9] text-base font-extrabold text-[#1E3A2B] focus:outline-none focus:border-[#224431]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-[#667A6C] block mb-1">
                    What was it for? *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Lunch at campus"
                    value={descInput}
                    onChange={(e) => setDescInput(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-[#D7E2D9] text-xs font-medium text-[#1E3A2B] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-[#667A6C] block mb-1">
                    Category *
                  </label>
                  <select
                    value={categoryInput}
                    onChange={(e) => setCategoryInput(e.target.value as Transaction["category"])}
                    className="w-full px-3 py-2 rounded-xl border border-[#D7E2D9] text-xs font-medium text-[#1E3A2B] focus:outline-none bg-white cursor-pointer"
                  >
                    <option value="Food & drinks">Food & drinks</option>
                    <option value="Transport">Transport</option>
                    <option value="Academic needs">Academic needs</option>
                    <option value="Accommodation">Accommodation</option>
                    <option value="Personal">Personal</option>
                    <option value="Emergency fund">Emergency fund</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-[#667A6C] block mb-1">
                    Date
                  </label>
                  <input
                    type="text"
                    value={dateInput}
                    onChange={(e) => setDateInput(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-[#D7E2D9] text-xs font-medium text-[#1E3A2B] focus:outline-none bg-white"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-[#667A6C] block mb-1">
                    Note (optional)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Add a little detail"
                    value={noteInput}
                    onChange={(e) => setNoteInput(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-xl border border-[#D7E2D9] text-xs font-medium text-[#1E3A2B] focus:outline-none bg-white resize-none"
                  />
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => {
                      setAmountInput("");
                      setDescInput("");
                    }}
                    className="w-1/2 py-2 px-3 rounded-xl text-xs font-semibold text-[#576B5D] bg-[#FAF8F5] hover:bg-black/5"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="w-1/2 py-2 px-3 rounded-xl text-xs font-bold text-white bg-[#224431] hover:bg-[#163323] shadow-xs cursor-pointer"
                  >
                    Save expense
                  </button>
                </div>

                <p className="text-[10px] text-[#869689] text-center">
                  Required: amount, description, and category.
                </p>
              </form>
            )}
          </div>

          {/* Card: Rp45.000 left to spend today */}
          <div className="bg-[#FEF7EC] rounded-2xl p-5 border border-[#FDE5C5]">
            <p className="text-sm font-bold text-[#1E3A2B]">
              Rp45.000 left to spend today
            </p>
            <p className="text-xs text-[#826949] mt-1">
              You&apos;re halfway through your Rp90.000 daily limit.
            </p>
          </div>

        </div>

      </div>

      {/* 3. BOTTOM BANNER */}
      <div className="bg-[#EBF1EC] rounded-2xl p-5 border border-[#DCE5DE] flex items-center justify-between text-xs text-[#526658]">
        <p>
          <strong className="text-[#1E3A2B] font-bold">Good records. Better recommendations.</strong>{" "}
          Your budget and AI guidance are only as accurate as the expenses you record.
        </p>
      </div>

    </div>
  );
}
