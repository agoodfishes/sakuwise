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
  const [months, setMonths] = useState<MonthlyData[]>([
    { month: "Jul", amount: "Rp 9.200.000", primaryHeight: 52, secondaryHeight: 38 },
    { month: "Agu", amount: "Rp 10.150.000", primaryHeight: 60, secondaryHeight: 45 },
    { month: "Sep", amount: "Rp 11.800.000", primaryHeight: 78, secondaryHeight: 56 },
    { month: "Okt", amount: "Rp 10.900.000", primaryHeight: 68, secondaryHeight: 48 },
    { month: "Nov", amount: "Rp 12.450.000", primaryHeight: 94, secondaryHeight: 35 },
  ]);

  const [activeMonthIndex, setActiveMonthIndex] = useState<number>(4);

  const activeData = months[activeMonthIndex];

  return (
    <div className="relative w-full max-w-xl mx-auto lg:max-w-none">
      {/* Background Soft Sage Rounded Container */}
      <div className="relative rounded-[32px] sm:rounded-[40px] bg-[#E9EFEA] border border-[#DCE5DD] p-4 sm:p-9 pt-10 sm:pt-14 pb-6 sm:pb-14 shadow-sm transition-all overflow-visible">
        
        {/* 1. Floating Card: Bulan ini Hemat (Top Right) */}
        <div className="absolute -top-4 sm:-top-6 right-3 sm:right-6 z-30 animate-float-slow">
          <div className="bg-white/95 backdrop-blur-md px-3.5 py-2 sm:px-4 sm:py-3 rounded-2xl shadow-[0_12px_28px_-6px_rgba(0,0,0,0.08)] border border-white/90 flex items-center gap-2.5 sm:gap-3">
            <div className="w-8 h-8 rounded-full bg-[#FEF3E2] flex items-center justify-center text-[#D97706] flex-shrink-0 shadow-inner">
              <TrendingUp className="w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[2.5]" />
            </div>
            <div>
              <p className="text-[10px] sm:text-[11px] font-medium text-[#7C8B80]">Bulan ini</p>
              <p className="text-xs sm:text-sm font-extrabold text-[#1E3A2B] tracking-tight">
                Hemat Rp 300 rb
              </p>
            </div>
          </div>
        </div>

        {/* 2. Main Center Card (Total Saldo & Paired Bar Chart) */}
        <div className="relative z-10 bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-7 shadow-[0_16px_36px_-12px_rgba(0,0,0,0.06)] border border-[#E9EFE9] transition-all">
          {/* Header Row: Label, Amount, Growth Badge */}
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[11px] sm:text-xs font-semibold text-[#758679] uppercase tracking-wider">
                Total Saldo
              </span>
              <div className="flex items-center gap-2.5 sm:gap-3 mt-1 flex-wrap">
                <span className="text-2xl sm:text-3xl font-extrabold text-[#1E3A2B] tracking-tight">
                  {activeData.amount}
                </span>
                <span className="inline-flex items-center gap-0.5 text-[11px] sm:text-xs font-semibold text-[#20743E] bg-[#E7F6EC] border border-[#D4EEDC] px-2 py-0.5 rounded-full">
                  <ArrowUpRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 stroke-[2.5]" />
                  +12%
                </span>
              </div>
            </div>
          </div>

          {/* Paired Bar Chart Section matching media_1794762859526_88e8de91.jpg */}
          <div className="mt-7 sm:mt-9 pt-2">
            <div className="flex items-end justify-between gap-3 sm:gap-6 h-32 sm:h-40 px-2 sm:px-5 border-b border-[#F0F4F0] pb-2">
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
                    {/* Paired Bars (Dark Green / Gold + Soft Sage) */}
                    <div className="flex items-end gap-1 sm:gap-1.5 h-full">
                      {/* Primary Bar */}
                      <div
                        style={{ height: `${item.primaryHeight}%` }}
                        className={`w-3 sm:w-5 rounded-t-sm sm:rounded-t-md transition-all duration-500 ${
                          isNov
                            ? "bg-[#E09B35] shadow-[0_0_10px_rgba(224,155,53,0.35)]"
                            : isSelected
                            ? "bg-[#284E38]"
                            : "bg-[#335B42]"
                        }`}
                      />
                      {/* Secondary Comparison Bar (Lighter Sage) */}
                      <div
                        style={{ height: `${item.secondaryHeight}%` }}
                        className="w-3 sm:w-5 bg-[#8FA899] rounded-t-sm sm:rounded-t-md transition-all duration-500 opacity-80"
                      />
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Month Labels below bars */}
            <div className="flex items-center justify-between gap-3 sm:gap-6 px-2 sm:px-5 mt-2.5">
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

          {/* Spacer to give room for overlapping desktop floating cards */}
          <div className="hidden sm:block h-10" />
        </div>

        {/* 3. Floating Card at Bottom Left: Saku Makan (White Card) */}
        {/* On desktop: absolute -bottom-5 -left-4 sm:left-4 z-20 */}
        <div className="relative mt-3 sm:mt-0 sm:absolute sm:-bottom-6 sm:left-6 z-20 animate-float-slow w-full sm:w-auto">
          <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-[0_16px_36px_-8px_rgba(0,0,0,0.1)] border border-[#E9EFE9] min-w-[210px] sm:min-w-[230px]">
            <div className="flex items-center justify-between gap-3">
              <span className="text-xs sm:text-sm font-bold text-[#1E3A2B]">
                Saku Makan
              </span>
              <span className="text-xs font-bold text-[#1E3A2B]">80%</span>
            </div>
            <p className="text-[11px] text-[#718275] mt-0.5">
              Rp 1,2 jt / 1,5 jt
            </p>
            {/* Dark green progress bar */}
            <div className="w-full h-2 rounded-full bg-[#EBF0EC] overflow-hidden mt-2.5">
              <div
                className="h-full bg-[#244833] rounded-full transition-all duration-700 ease-out"
                style={{ width: "80%" }}
              />
            </div>
          </div>
        </div>

        {/* 4. Floating Card at Bottom Right: Tabungan Liburan (Dark Green Card) */}
        {/* On desktop: absolute -bottom-8 -right-3 sm:right-6 z-20 */}
        <div className="relative mt-3 sm:mt-0 sm:absolute sm:-bottom-8 sm:right-6 z-20 animate-float-reverse w-full sm:w-auto">
          <div className="bg-[#244833] text-white p-4 sm:p-5 rounded-2xl shadow-[0_20px_40px_-10px_rgba(30,58,43,0.35)] border border-[#305841] min-w-[230px] sm:min-w-[250px]">
            <div className="flex items-center justify-between gap-3">
              <span className="text-xs sm:text-sm font-bold tracking-tight">
                Tabungan Liburan
              </span>
              <span className="text-[11px] sm:text-xs font-bold text-[#E09B35]">
                65%
              </span>
            </div>
            <p className="text-[11px] sm:text-xs text-[#A9C4B2] mt-0.5">
              Rp 3,25 jt dari Rp 5 jt
            </p>
            {/* Gold Progress bar */}
            <div className="w-full h-2 rounded-full bg-[#12241A] overflow-hidden mt-2.5">
              <div
                className="h-full bg-[#E09B35] rounded-full transition-all duration-700 ease-out shadow-[0_0_8px_rgba(224,155,53,0.5)]"
                style={{ width: "65%" }}
              />
            </div>
          </div>
        </div>

        {/* 5. Floating Pill Badges (Hiburan & Dana Darurat) */}
        {/* On desktop: positioned neatly below the cards inside the container */}
        <div className="mt-4 sm:mt-12 flex items-center justify-center sm:justify-start gap-2.5 sm:gap-3 flex-wrap relative z-10 pt-2 sm:pt-4">
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
