"use client";

import React, { useState } from "react";
import { Plus, Target, Check, Sparkles } from "lucide-react";

export default function SavingsGoalsView() {
  const [goals, setGoals] = useState([
    {
      id: "1",
      title: "New laptop fund",
      subtitle: "Untuk skripsi & produktivitas",
      current: 450000,
      target: 1500000,
      color: "bg-[#244833]",
      deadline: "Maret 2027",
    },
    {
      id: "2",
      title: "Dana Darurat (Emergency)",
      subtitle: "3 bulan pengeluaran pokok",
      current: 1200000,
      target: 3000000,
      color: "bg-[#E08C38]",
      deadline: "Desember 2026",
    },
    {
      id: "3",
      title: "Liburan Akhir Tahun",
      subtitle: "Trip santai bersama teman",
      current: 650000,
      target: 1000000,
      color: "bg-[#3D644C]",
      deadline: "Januari 2027",
    },
  ]);

  const [addModalOpen, setAddModalOpen] = useState(false);
  const [selectedGoalId, setSelectedGoalId] = useState<string | null>(null);
  const [depositAmount, setDepositAmount] = useState("");

  const handleDeposit = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseInt(depositAmount.replace(/[^0-9]/g, ""), 10);
    if (!selectedGoalId || isNaN(val) || val <= 0) return;

    setGoals((prev) =>
      prev.map((g) => (g.id === selectedGoalId ? { ...g, current: g.current + val } : g))
    );
    setDepositAmount("");
    setSelectedGoalId(null);
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-200">
      
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-white rounded-2xl p-6 border border-[#E7EDE7] shadow-2xs gap-4">
        <div>
          <h2 className="text-base font-bold text-[#1E3A2B]">Target Tabungan Impian</h2>
          <p className="text-xs text-[#6F8273]">
            Saku terproteksi otomatis memisahkan dana impianmu dari pengeluaran harian.
          </p>
        </div>
        <button
          type="button"
          onClick={() => alert("Tambah target tabungan baru")}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-[#224431] hover:bg-[#163323] transition-colors cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Buat Target Baru</span>
        </button>
      </div>

      {/* Goals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {goals.map((g) => {
          const percent = Math.min(100, Math.round((g.current / g.target) * 100));
          return (
            <div
              key={g.id}
              className="bg-white rounded-2xl p-6 border border-[#E7EDE7] shadow-2xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#1E3A2B]">{g.title}</span>
                  <span className="text-xs font-bold text-[#E08C38] bg-[#FEF3E2] px-2 py-0.5 rounded-full">
                    {percent}%
                  </span>
                </div>
                <p className="text-[11px] text-[#718576] mt-0.5">{g.subtitle}</p>

                <div className="mt-5">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-xl font-extrabold text-[#1E3A2B]">
                      Rp{g.current.toLocaleString("id-ID")}
                    </span>
                    <span className="text-xs text-[#718576]">
                      / Rp{g.target.toLocaleString("id-ID")}
                    </span>
                  </div>

                  <div className="w-full h-2 rounded-full bg-[#EBF0EC] overflow-hidden mt-2">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${g.color}`}
                      style={{ width: `${percent}%` }}
                    />
                  </div>

                  <div className="mt-2.5 flex items-center justify-between text-[11px] text-[#718576]">
                    <span>Target: {g.deadline}</span>
                    <span>Sisa: Rp{(g.target - g.current).toLocaleString("id-ID")}</span>
                  </div>
                </div>
              </div>

              <div className="pt-5 mt-4 border-t border-[#F2F5F2]">
                <button
                  type="button"
                  onClick={() => setSelectedGoalId(g.id)}
                  className="w-full py-2 px-3 rounded-xl text-xs font-semibold text-[#244833] bg-[#E8EFEA] hover:bg-[#DCE6DF] transition-colors cursor-pointer"
                >
                  + Tambah Tabungan
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Deposit Modal */}
      {selectedGoalId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="w-full max-w-sm bg-white rounded-3xl p-6 shadow-2xl border border-[#DCE4DD]">
            <h3 className="text-sm font-bold text-[#1E3A2B]">Tambah Tabungan</h3>
            <p className="text-xs text-[#718576] mt-0.5 mb-4">
              Sisihkan sebagian allowance ke target tabunganmu.
            </p>

            <form onSubmit={handleDeposit} className="space-y-4">
              <div>
                <label className="text-[11px] font-bold text-[#677C6D] block mb-1">
                  Nominal Tambahan (Rp)
                </label>
                <input
                  type="text"
                  required
                  autoFocus
                  placeholder="Contoh: 50.000"
                  value={depositAmount}
                  onChange={(e) => {
                    const raw = e.target.value.replace(/[^0-9]/g, "");
                    setDepositAmount(raw ? parseInt(raw, 10).toLocaleString("id-ID") : "");
                  }}
                  className="w-full px-3 py-2 rounded-xl border border-[#D7E2D9] text-base font-extrabold text-[#1E3A2B] focus:outline-none focus:border-[#224431]"
                />
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedGoalId(null)}
                  className="w-1/2 py-2 text-xs font-semibold text-gray-600 bg-gray-100 rounded-xl"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2 text-xs font-bold text-white bg-[#224431] rounded-xl shadow-xs"
                >
                  Simpan Tabungan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
