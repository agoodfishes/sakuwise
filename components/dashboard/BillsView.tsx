"use client";

import React, { useState } from "react";
import { Plus, Check, Bell, Calendar } from "lucide-react";

export default function BillsView() {
  const [bills, setBills] = useState([
    {
      id: "1",
      day: 20,
      name: "Wi-Fi subscription",
      due: "Due 20 Nov · In 3 days",
      amount: 100000,
      status: "Upcoming",
      category: "Accommodation",
    },
    {
      id: "2",
      day: 25,
      name: "Boarding house (Kos)",
      due: "Due 25 Nov · In 8 days",
      amount: 800000,
      status: "Upcoming",
      category: "Accommodation",
    },
    {
      id: "3",
      day: 28,
      name: "Spotify & Cloud Storage",
      due: "Due 28 Nov · In 11 days",
      amount: 55000,
      status: "Upcoming",
      category: "Personal",
    },
    {
      id: "4",
      day: 5,
      name: "Token Listrik Bulanan",
      due: "Paid 5 Nov 2026",
      amount: 150000,
      status: "Paid",
      category: "Accommodation",
    },
  ]);

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-200">
      
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-white rounded-2xl p-6 border border-[#E7EDE7] shadow-2xs gap-4">
        <div>
          <h2 className="text-base font-bold text-[#1E3A2B]">Tagihan & Pengingat Rutin</h2>
          <p className="text-xs text-[#6F8273]">
            Otomatis sinkronkan dengan saku anggaran agar tidak ada denda keterlambatan.
          </p>
        </div>
        <button
          type="button"
          onClick={() => alert("Tambah pengingat tagihan baru")}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-[#224431] hover:bg-[#163323] transition-colors cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Tambah Tagihan</span>
        </button>
      </div>

      {/* Bills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {bills.map((b) => (
          <div
            key={b.id}
            className="bg-white rounded-2xl p-6 border border-[#E7EDE7] shadow-2xs flex items-center justify-between gap-4"
          >
            <div className="flex items-center gap-4">
              <div
                className={`w-12 h-12 rounded-2xl flex flex-col items-center justify-center font-extrabold text-sm flex-shrink-0 ${
                  b.status === "Paid"
                    ? "bg-[#E7F6EC] text-[#20743E]"
                    : "bg-[#E8EFEA] text-[#1E3A2B]"
                }`}
              >
                <span>{b.day}</span>
                <span className="text-[9px] uppercase font-bold text-[#718576]">Nov</span>
              </div>
              <div>
                <p className="text-sm font-bold text-[#1E3A2B]">{b.name}</p>
                <p className="text-xs text-[#718576] mt-0.5">{b.due}</p>
                <span className="inline-block mt-1 text-[10px] font-medium bg-[#FAF8F5] border border-[#E4ECE4] px-2 py-0.5 rounded-md text-[#55695C]">
                  {b.category}
                </span>
              </div>
            </div>

            <div className="text-right">
              <p className="text-base font-extrabold text-[#1E3A2B]">
                Rp{b.amount.toLocaleString("id-ID")}
              </p>
              <span
                className={`inline-block mt-1 text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                  b.status === "Paid"
                    ? "bg-[#E7F6EC] text-[#20743E]"
                    : "bg-[#FEF3E2] text-[#9A5B15]"
                }`}
              >
                {b.status}
              </span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
