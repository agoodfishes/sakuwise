"use client";

import React, { useState } from "react";
import { TrendingUp, ArrowUpRight } from "lucide-react";

interface MonthlyData {
  month: string;
  amount: string;
  heightPercent: number;
  highlighted?: boolean;
}

export default function HeroDashboardMockup() {
  const [months, setMonths] = useState<MonthlyData[]>([
    { month: "Jul", amount: "Rp 9.200.000", heightPercent: 48 },
    { month: "Agu", amount: "Rp 10.150.000", heightPercent: 58 },
    { month: "Sep", amount: "Rp 11.800.000", heightPercent: 82 },
    { month: "Okt", amount: "Rp 10.900.000", heightPercent: 68 },
    { month: "Nov", amount: "Rp 12.450.000", heightPercent: 94, highlighted: true },
  ]);

  const [activeMonthIndex, setActiveMonthIndex] = useState<number>(4);

  const handleSelectMonth = (index: number) => {
    setActiveMonthIndex(index);
    setMonths((prev) =>
      prev.map((m, i) => ({
        ...m,
        highlighted: i === index,
      }))
    );
  };

  const activeData = months[activeMonthIndex];

  return (
    <div className="relative w-full max-w-xl mx-auto lg:max-w-none">
      {/* Background Rounded Container with soft sage hue */}
      <div className="relative rounded-[28px] sm:rounded-[36px] bg-[#E9EFEA] border border-[#DCE5DD] p-3.5 sm:p-9 pt-10 sm:pt-14 pb-5 sm:pb-12 shadow-sm transition-all">
        
        {/* Floating Card: Bulan ini Hemat (Top Right) */}
        {/* On mobile: nicely positioned with safe top offset; on desktop: floating -top-7 */}
        <div className="absolute -top-4 sm:-top-7 right-3 sm:right-8 z-30 animate-float-slow">
          <div className="bg-white/95 backdrop-blur-md px-3.5 py-2 sm:px-5 sm:py-3.5 rounded-xl sm:rounded-2xl shadow-[0_10px_25px_-5px_rgba(0,0,0,0.08)] border border-white/90 flex items-center gap-2.5 sm:gap-3">
            <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-[#FEF3E2] flex items-center justify-center text-[#D97706] flex-shrink-0 shadow-inner">
              <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
            </div>
            <div>
              <p className="text-[10px] sm:text-[11px] font-medium text-[#7C8B80]">Bulan ini</p>
              <p className="text-xs sm:text-sm font-bold text-[#1E3A2B] tracking-tight">
                Hemat Rp 300 rb
              </p>
            </div>
          </div>
        </div>

        {/* Main Center Card (Total Saldo & Chart) */}
        <div className="relative z-10 bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-7 shadow-[0_14px_32px_-10px_rgba(0,0,0,0.06)] border border-[#E9EFE9] transition-all">
          {/* Header Row: Label, Amount, Growth Badge */}
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[11px] sm:text-xs font-medium text-[#758679] uppercase tracking-wider">
                Total Saldo
              </span>
              <div className="flex items-center gap-2.5 sm:gap-3 mt-1 flex-wrap">
                <span className="text-xl sm:text-3xl font-extrabold text-[#1E3A2B] tracking-tight">
                  {activeData.amount}
                </span>
                <span className="inline-flex items-center gap-0.5 text-[11px] sm:text-xs font-semibold text-[#20743E] bg-[#E7F6EC] border border-[#D4EEDC] px-2 py-0.5 rounded-full">
                  <ArrowUpRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 stroke-[2.5]" />
                  +12%
                </span>
              </div>
            </div>
          </div>

          {/* Bar Chart Section */}
          <div className="mt-6 sm:mt-8 pt-1 sm:pt-2">
            <div className="flex items-end justify-between gap-2 sm:gap-6 h-28 sm:h-36 px-1 sm:px-4 border-b border-[#F0F4F0] pb-2">
              {months.map((item, idx) => {
                const isSelected = idx === activeMonthIndex;
                return (
                  <button
                    key={item.month}
                    type="button"
                    onClick={() => handleSelectMonth(idx)}
                    className="flex-1 flex flex-col items-center justify-end h-full group focus:outline-none cursor-pointer"
                    title={`${item.month}: ${item.amount}`}
                  >
                    {/* Tooltip on hover/active */}
                    <span
                      className={`text-[9px] sm:text-[10px] font-semibold mb-1 px-1 py-0.2 rounded transition-opacity ${
                        isSelected
                          ? "opacity-100 text-[#E08C38] font-bold"
                          : "opacity-0 group-hover:opacity-100 text-[#718275]"
                      }`}
                    >
                      {item.month}
                    </span>

                    {/* Bar Pill */}
                    <div className="w-full max-w-[28px] sm:max-w-[34px] bg-[#EEF3EF] rounded-t-lg sm:rounded-t-xl h-full flex items-end overflow-hidden p-0.5">
                      <div
                        style={{ height: `${item.heightPercent}%` }}
                        className={`w-full rounded-t-md sm:rounded-t-lg transition-all duration-500 ease-out ${
                          isSelected
                            ? "bg-[#E08C38] shadow-[0_0_12px_rgba(224,140,56,0.35)]"
                            : "bg-[#4D7A5E] hover:bg-[#3D644C]"
                        }`}
                      />
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Month Labels */}
            <div className="flex items-center justify-between gap-2 sm:gap-6 px-1 sm:px-4 mt-2">
              {months.map((item, idx) => (
                <button
                  key={`label-${item.month}`}
                  onClick={() => handleSelectMonth(idx)}
                  className={`flex-1 text-center text-[11px] sm:text-xs transition-colors cursor-pointer ${
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

          {/* Saku Makan Progress preview */}
          <div className="mt-5 sm:mt-7 pt-4 sm:pt-5 border-t border-[#F0F4F1]">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-semibold text-[#1E3A2B]">
                Saku Makan
              </span>
              <span className="text-xs font-bold text-[#1E3A2B]">80%</span>
            </div>
            <div className="flex items-center justify-between text-[10px] sm:text-[11px] text-[#718275] mb-2">
              <span>Rp 1,2 jt / 1,5 jt</span>
              <span className="text-[10px] text-amber-700 bg-amber-50 px-1.5 py-0.2 rounded font-medium">
                Sisa Rp 300 rb
              </span>
            </div>
            {/* Progress track */}
            <div className="w-full h-2 rounded-full bg-[#EBF0EC] overflow-hidden">
              <div
                className="h-full bg-[#1E3A2B] rounded-full transition-all duration-700 ease-out"
                style={{ width: "80%" }}
              />
            </div>
          </div>
        </div>

        {/* Floating Card: Tabungan Liburan */}
        {/* On mobile: clean relative margin-top, no negative bottom offset, full width; on desktop: absolute positioned hanging bottom right */}
        <div className="relative mt-3.5 sm:mt-0 sm:absolute sm:-bottom-7 sm:-right-6 z-20 animate-float-reverse w-full sm:w-auto">
          <div className="bg-[#1E3A2B] text-white p-4 sm:p-5 rounded-2xl shadow-[0_16px_36px_-10px_rgba(30,58,43,0.3)] border border-[#2B523D] w-full sm:min-w-[280px]">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="text-xs sm:text-sm font-bold tracking-tight">
                  Tabungan Liburan
                </span>
              </div>
              <span className="text-[11px] sm:text-xs font-bold text-[#E08C38] bg-white/10 px-2 py-0.5 rounded-full">
                65%
              </span>
            </div>

            <p className="text-[11px] sm:text-xs text-[#A9C4B2] mt-1">
              Rp 3,25 jt dari Rp 5 jt
            </p>

            {/* Gold Progress bar */}
            <div className="w-full h-2 rounded-full bg-[#12241A] overflow-hidden mt-2.5 sm:mt-3">
              <div
                className="h-full bg-[#E08C38] rounded-full transition-all duration-700 ease-out shadow-[0_0_8px_rgba(224,140,56,0.5)]"
                style={{ width: "65%" }}
              />
            </div>
          </div>
        </div>

        {/* Floating Pill Badges */}
        {/* On mobile: centered below with neat spacing; on desktop: absolute at bottom left */}
        <div className="mt-3.5 sm:mt-0 sm:absolute sm:bottom-4 sm:left-9 z-20 flex items-center justify-center sm:justify-start gap-2 sm:gap-2.5 flex-wrap">
          <div className="bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full shadow-2xs border border-[#E2EAE3] flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-medium text-[#2E4536]">
            <span className="w-2 h-2 rounded-full bg-[#3D644C]" />
            <span>Hiburan 20%</span>
          </div>

          <div className="bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full shadow-2xs border border-[#E2EAE3] flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-medium text-[#2E4536]">
            <span className="w-2 h-2 rounded-full bg-[#E08C38]" />
            <span>Dana Darurat 15%</span>
          </div>
        </div>

      </div>
    </div>
  );
}
