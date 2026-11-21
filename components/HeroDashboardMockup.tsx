"use client";

import React, { useState } from "react";
import { TrendingUp, ArrowUpRight } from "lucide-react";

interface MonthlyData {
  month: string;
  amount: string;
  primaryHeight: number;
  secondaryHeight: number;
}

export default function HeroDashboardMockup() {
  const [months] = useState<MonthlyData[]>([
    { month: "Jul", amount: "Rp 9.200.000", primaryHeight: 52, secondaryHeight: 38 },
    { month: "Agu", amount: "Rp 10.150.000", primaryHeight: 60, secondaryHeight: 45 },
    { month: "Sep", amount: "Rp 11.800.000", primaryHeight: 78, secondaryHeight: 56 },
    { month: "Okt", amount: "Rp 10.900.000", primaryHeight: 68, secondaryHeight: 48 },
    { month: "Nov", amount: "Rp 12.450.000", primaryHeight: 92, secondaryHeight: 36 },
  ]);

  const [activeMonthIndex, setActiveMonthIndex] = useState<number>(4);
  const activeData = months[activeMonthIndex];

  return (
    <div className="relative w-full max-w-lg mx-auto lg:max-w-none">
      {/* Background Soft Sage Rounded Container */}
      <div className="relative rounded-[32px] sm:rounded-[40px] bg-[#E9EFEA] border border-[#DCE5DD] p-4 sm:p-7 pt-9 sm:pt-11 pb-7 sm:pb-12 shadow-sm transition-all">
        
        {/* 1. Floating Badge: Bulan ini Hemat Rp 300 rb (Top Right) */}
        <div className="absolute -top-3.5 sm:-top-5 right-4 sm:right-7 z-30 animate-float-slow">
          <div className="bg-white px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-2xl shadow-[0_12px_28px_-6px_rgba(0,0,0,0.08)] border border-[#E8EEE9] flex items-center gap-2.5">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#FEF3E2] flex items-center justify-center text-[#D97706] flex-shrink-0">
              <TrendingUp className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.5]" />
            </div>
            <div>
              <p className="text-[10px] font-medium text-[#7C8B80] leading-none">Bulan ini</p>
              <p className="text-xs sm:text-sm font-extrabold text-[#1E3A2B] tracking-tight mt-0.5">
                Hemat Rp 300 rb
              </p>
            </div>
          </div>
        </div>

        {/* 2. Main Center Card (Total Saldo & Paired Bar Chart) */}
        <div className="relative z-10 bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-[0_16px_36px_-12px_rgba(0,0,0,0.06)] border border-[#E9EFE9]">
          {/* Header Row: Label, Amount, Growth Badge */}
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[11px] font-semibold text-[#758679] uppercase tracking-wider block">
                Total Saldo
              </span>
              <div className="flex items-center gap-2.5 mt-1 flex-wrap">
                <span className="text-2xl sm:text-3xl font-extrabold text-[#1E3A2B] tracking-tight">
                  {activeData.amount}
                </span>
                <span className="inline-flex items-center gap-0.5 text-[11px] font-semibold text-[#20743E] bg-[#E7F6EC] border border-[#D4EEDC] px-2 py-0.5 rounded-full">
                  <ArrowUpRight className="w-3 h-3 stroke-[2.5]" />
                  +12%
                </span>
              </div>
            </div>
          </div>

          {/* Paired Bar Chart Section */}
          <div className="mt-6 pt-2">
            <div className="flex items-end justify-between gap-3 sm:gap-5 h-28 sm:h-36 px-2 sm:px-4 border-b border-[#F0F4F0] pb-2">
              {months.map((item, idx) => {
                const isSelected = idx === activeMonthIndex;
                const isNov = item.month === "Nov";
                return (
                  <button
                    key={item.month}
                    type="button"
                    onClick={() => setActiveMonthIndex(idx)}
                    className="flex-1 flex flex-col items-center justify-end h-full group focus:outline-none cursor-pointer"
                    title={`${item.month}: ${item.amount}`}
                  >
                    {/* Paired Bars */}
                    <div className="flex items-end gap-1 sm:gap-1.5 h-full">
                      {/* Primary Bar */}
                      <div
                        style={{ height: `${item.primaryHeight}%` }}
                        className={`w-3 sm:w-4.5 rounded-t-sm sm:rounded-t-md transition-all duration-300 ${
                          isNov
                            ? "bg-[#E09B35]"
                            : isSelected
                            ? "bg-[#284E38]"
                            : "bg-[#335B42]"
                        }`}
                      />
                      {/* Secondary Comparison Bar */}
                      <div
                        style={{ height: `${item.secondaryHeight}%` }}
                        className="w-3 sm:w-4.5 bg-[#8FA899] rounded-t-sm sm:rounded-t-md transition-all duration-300 opacity-80"
                      />
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Month Labels below bars */}
            <div className="flex items-center justify-between gap-3 sm:gap-5 px-2 sm:px-4 mt-2">
              {months.map((item, idx) => (
                <button
                  key={`label-${item.month}`}
                  onClick={() => setActiveMonthIndex(idx)}
                  className={`flex-1 text-center text-xs transition-colors cursor-pointer ${
                    idx === activeMonthIndex
                      ? "font-bold text-[#1E3A2B]"
                      : "font-medium text-[#7D8F82] hover:text-[#1E3A2B]"
                  }`}
                >
                  {item.month}
                </button>
              ))}
            </div>
          </div>

          {/* Spacer for Desktop Floating Overlap */}
          <div className="hidden sm:block h-7" />
        </div>

        {/* 3. Floating / Nested Budget Cards */}
        {/* On Mobile: Responsive Stack / 2-Col Grid (Never overlapping) */}
        {/* On Desktop: Overlapping cards positioned gracefully without collisions */}
        <div className="mt-3.5 sm:mt-0 sm:relative z-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 sm:absolute sm:-bottom-8 sm:inset-x-2">
            
            {/* Card: Saku Makan (White Card) */}
            <div className="bg-white rounded-2xl p-3.5 sm:p-4 shadow-[0_12px_28px_-6px_rgba(0,0,0,0.08)] border border-[#E9EFE9] animate-float-slow">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-bold text-[#1E3A2B]">
                  Saku Makan
                </span>
                <span className="text-xs font-bold text-[#1E3A2B]">80%</span>
              </div>
              <p className="text-[11px] text-[#718275] mt-0.5">
                Rp 1,2 jt / 1,5 jt
              </p>
              <div className="w-full h-2 rounded-full bg-[#EBF0EC] overflow-hidden mt-2">
                <div
                  className="h-full bg-[#244833] rounded-full transition-all duration-500"
                  style={{ width: "80%" }}
                />
              </div>
            </div>

            {/* Card: Tabungan Liburan (Dark Green Card) */}
            <div className="bg-[#244833] text-white p-3.5 sm:p-4 rounded-2xl shadow-[0_16px_32px_-8px_rgba(30,58,43,0.3)] border border-[#305841] animate-float-reverse">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-bold tracking-tight">
                  Tabungan Liburan
                </span>
                <span className="text-xs font-bold text-[#E09B35]">
                  65%
                </span>
              </div>
              <p className="text-[11px] text-[#A9C4B2] mt-0.5">
                Rp 3,25 jt dari Rp 5 jt
              </p>
              <div className="w-full h-2 rounded-full bg-[#12241A] overflow-hidden mt-2">
                <div
                  className="h-full bg-[#E09B35] rounded-full transition-all duration-500"
                  style={{ width: "65%" }}
                />
              </div>
            </div>

          </div>
        </div>

        {/* 4. Pills: Hiburan & Dana Darurat */}
        <div className="mt-4 sm:mt-14 flex items-center justify-center sm:justify-start gap-2.5 flex-wrap relative z-10 pt-1 sm:pt-2">
          <div className="bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full shadow-2xs border border-[#E2EAE3] flex items-center gap-2 text-xs font-medium text-[#2E4536]">
            <span className="w-2.5 h-2.5 rounded-full bg-[#4D7A5E]" />
            <span>Hiburan 20%</span>
          </div>

          <div className="bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full shadow-2xs border border-[#E2EAE3] flex items-center gap-2 text-xs font-medium text-[#2E4536]">
            <span className="w-2.5 h-2.5 rounded-full bg-[#E09B35]" />
            <span>Dana Darurat 15%</span>
          </div>
        </div>

      </div>
    </div>
  );
}
