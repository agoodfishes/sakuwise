"use client";

import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useFinance, isDemoAccount } from "@/context/FinanceContext";
import { Check, RotateCcw } from "lucide-react";
import { loadPrefs, savePrefs, type Preferences } from "@/lib/preferences";

export default function SettingsView() {
  const { user } = useAuth();
  const { resetData } = useFinance();

  const demo = isDemoAccount(user?.email);
  const isGoogle = !!user?.id?.startsWith("google_");

  const [prefs, setPrefs] = useState<Preferences>(() => loadPrefs(user?.email));
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    savePrefs(user?.email, prefs);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleReset = () => {
    const message = demo
      ? "Restore all data to the sample data? Any transactions, bills, and goals you changed will be lost."
      : "Delete all your financial data (budget, transactions, bills, and goals)? This cannot be undone.";
    if (window.confirm(message)) {
      resetData();
    }
  };

  return (
    <div className="max-w-3xl space-y-6 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl p-6 sm:p-7 border border-[#E7EDE7] shadow-2xs space-y-6">
        <div>
          <h2 className="text-base font-bold text-[#1E3A2B]">Account Settings & Preferences</h2>
          <p className="text-xs text-[#718576]">Customize your money management experience in SakuWise.</p>
        </div>

        {/* Profile info */}
        <div className="pt-4 border-t border-[#F2F5F2] flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-[#244833] text-white text-lg font-bold flex items-center justify-center">
            {user?.name?.charAt(0).toUpperCase() || "N"}
          </div>
          <div>
            <p className="text-sm font-bold text-[#1E3A2B]">{user?.name || "Najwa"}</p>
            <p className="text-xs text-[#718576]">{user?.email || "najwa.finance@student.ac.id"}</p>
            <span className="inline-block mt-1 text-[11px] font-semibold bg-[#E8EFEA] text-[#244833] px-2 py-0.5 rounded-full">
              {user?.role || "Student account"} · {isGoogle ? "Google OAuth" : "Email & password"}
            </span>
          </div>
        </div>

        {/* Currency & Locale */}
        <div className="pt-4 border-t border-[#F2F5F2] space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#677C6D]">Currency & Region</h3>
          <div>
            <p className="text-xs font-semibold text-[#1E3A2B] mb-1">Currency</p>
            <p className="w-full sm:w-72 px-3 py-2 rounded-xl border border-[#D7E2D9] text-xs font-semibold text-[#1E3A2B] bg-[#FAF8F5]">
              IDR (Indonesian Rupiah - Rp)
            </p>
            <p className="text-[11px] text-[#718576] mt-1">SakuWise currently supports Rupiah only.</p>
          </div>
        </div>

        {/* Notifications */}
        <div className="pt-4 border-t border-[#F2F5F2] space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#677C6D]">Reminders & Notifications</h3>
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-bold text-[#1E3A2B]">Daily Logging Reminder</p>
              <p className="text-[11px] text-[#718576]">A reminder to log today&apos;s expenses.</p>
            </div>
            <input
              type="checkbox"
              checked={prefs.dailyReminder}
              onChange={(e) => setPrefs((p) => ({ ...p, dailyReminder: e.target.checked }))}
              className="w-5 h-5 md:w-4 md:h-4 flex-shrink-0 accent-[#224431] cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-bold text-[#1E3A2B]">85% Budget Alert</p>
              <p className="text-[11px] text-[#718576]">Get notified when a category budget is almost used up.</p>
            </div>
            <input
              type="checkbox"
              checked={prefs.budgetAlerts}
              onChange={(e) => setPrefs((p) => ({ ...p, budgetAlerts: e.target.checked }))}
              className="w-5 h-5 md:w-4 md:h-4 flex-shrink-0 accent-[#224431] cursor-pointer"
            />
          </div>
        </div>

        {/* Data */}
        <div className="pt-4 border-t border-[#F2F5F2] space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#677C6D]">Data</h3>
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-bold text-[#1E3A2B]">{demo ? "Reset to sample data" : "Delete all financial data"}</p>
              <p className="text-[11px] text-[#718576]">
                {demo
                  ? "Restore transactions, bills, and goals to the original demo state."
                  : "Start over from scratch. Your data is stored in this browser."}
              </p>
            </div>
            <button
              type="button"
              onClick={handleReset}
              className="flex-shrink-0 min-h-11 md:min-h-0 inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-[#B3402A] bg-[#FDF1EE] hover:bg-[#FAE3DD] transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              {demo ? "Reset" : "Delete"}
            </button>
          </div>
        </div>

        {/* Save button */}
        <div className="pt-4 border-t border-[#F2F5F2] flex items-center justify-between">
          <button
            type="button"
            onClick={handleSave}
            className="min-h-11 md:min-h-0 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-[#224431] hover:bg-[#163323] transition-colors shadow-xs cursor-pointer"
          >
            Save Changes
          </button>
          {saved && (
            <span className="text-xs text-[#20743E] font-semibold flex items-center gap-1">
              <Check className="w-3.5 h-3.5" /> Saved!
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
