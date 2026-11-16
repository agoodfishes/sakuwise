"use client";

import React, { useState } from "react";
import { X, Check } from "lucide-react";
import { Transaction } from "./OverviewView";

interface AddExpenseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveExpense: (expense: Omit<Transaction, "id">) => void;
}

export default function AddExpenseModal({
  isOpen,
  onClose,
  onSaveExpense,
}: AddExpenseModalProps) {
  const [amountStr, setAmountStr] = useState("");
  const [name, setName] = useState("");
  const [category, setCategory] = useState<Transaction["category"]>("Food & drinks");
  const [date, setDate] = useState("17 November 2026");
  const [note, setNote] = useState("");
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanAmount = parseInt(amountStr.replace(/[^0-9]/g, ""), 10);
    if (!name.trim() || isNaN(cleanAmount) || cleanAmount <= 0) return;

    onSaveExpense({
      name: name.trim(),
      amount: cleanAmount,
      category,
      time: `Today · ${new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })}`,
    });

    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
      setAmountStr("");
      setName("");
      setNote("");
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-7 shadow-2xl border border-[#DCE4DD] animate-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#F0F4F0]">
          <div>
            <h3 className="text-base font-bold text-[#1E3A2B]">Add an expense</h3>
            <p className="text-xs text-[#718576]">A few seconds now. More clarity later.</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full text-gray-400 hover:text-gray-700 hover:bg-black/5"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {savedSuccess ? (
          <div className="py-12 flex flex-col items-center justify-center text-center">
            <div className="w-12 h-12 rounded-full bg-[#E7F6EC] text-[#20743E] flex items-center justify-center mb-3">
              <Check className="w-6 h-6 stroke-[3]" />
            </div>
            <p className="text-sm font-bold text-[#1E3A2B]">Pengeluaran Berhasil Dicatat!</p>
            <p className="text-xs text-[#6B8071] mt-1">Saldo dan grafik anggaran telah diperbarui.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-4 space-y-4">
            {/* Amount input */}
            <div>
              <label className="text-[11px] font-bold text-[#677C6D] uppercase tracking-wider block mb-1">
                Amount *
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-bold text-[#1E3A2B]">
                  Rp
                </span>
                <input
                  type="text"
                  required
                  autoFocus
                  placeholder="0"
                  value={amountStr}
                  onChange={(e) => {
                    const raw = e.target.value.replace(/[^0-9]/g, "");
                    setAmountStr(raw ? parseInt(raw, 10).toLocaleString("id-ID") : "");
                  }}
                  className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-[#D5E1D7] text-lg font-extrabold text-[#1E3A2B] focus:outline-none focus:border-[#224431] focus:ring-1 focus:ring-[#224431] bg-[#FAF8F5]"
                />
              </div>
            </div>

            {/* What was it for */}
            <div>
              <label className="text-[11px] font-bold text-[#677C6D] uppercase tracking-wider block mb-1">
                What was it for? *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Lunch at campus"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5E1D7] text-xs font-semibold text-[#1E3A2B] focus:outline-none focus:border-[#224431] bg-white"
              />
            </div>

            {/* Category */}
            <div>
              <label className="text-[11px] font-bold text-[#677C6D] uppercase tracking-wider block mb-1">
                Category *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as Transaction["category"])}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5E1D7] text-xs font-semibold text-[#1E3A2B] focus:outline-none focus:border-[#224431] bg-white cursor-pointer"
              >
                <option value="Food & drinks">Food & drinks (Makan & Minum)</option>
                <option value="Transport">Transport (Transportasi)</option>
                <option value="Academic needs">Academic needs (Kebutuhan Kuliah)</option>
                <option value="Accommodation">Accommodation (Kos & Tagihan)</option>
                <option value="Personal">Personal (Pribadi & Perawatan)</option>
                <option value="Emergency fund">Emergency fund (Dana Darurat)</option>
              </select>
            </div>

            {/* Date */}
            <div>
              <label className="text-[11px] font-bold text-[#677C6D] uppercase tracking-wider block mb-1">
                Date
              </label>
              <input
                type="text"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-[#D5E1D7] text-xs font-medium text-[#1E3A2B] focus:outline-none bg-white"
              />
            </div>

            {/* Note */}
            <div>
              <label className="text-[11px] font-bold text-[#677C6D] uppercase tracking-wider block mb-1">
                Note (optional)
              </label>
              <textarea
                rows={2}
                placeholder="Add a little detail"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-[#D5E1D7] text-xs font-medium text-[#1E3A2B] focus:outline-none bg-white resize-none"
              />
            </div>

            {/* Buttons */}
            <div className="pt-2 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={onClose}
                className="w-1/2 py-2.5 px-4 rounded-xl text-xs font-semibold text-[#4F6253] bg-[#FAF8F5] hover:bg-black/5 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="w-1/2 py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-[#224431] hover:bg-[#163323] transition-colors shadow-sm cursor-pointer"
              >
                Save expense
              </button>
            </div>

            <p className="text-[10px] text-center text-[#7E8F82]">
              Required: amount, description, and category.
            </p>
          </form>
        )}

      </div>
    </div>
  );
}
