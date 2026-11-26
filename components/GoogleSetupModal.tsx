"use client";

import React, { useState } from "react";
import { User as UserIcon, Lock, Eye, EyeOff, AlertCircle } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

// Shown once after the first Google sign-in: choose a username and a password
export default function GoogleSetupModal() {
  const { user, completeGoogleSetup } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSaving(true);
    const res = await completeGoogleSetup(username, password);
    setSaving(false);
    if (!res.success && res.error) setErrorMessage(res.error);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 sm:p-8 text-[#1E3A2B] shadow-xl">
        <h2 className="text-2xl font-extrabold tracking-tight">Complete your account</h2>
        <p className="mt-1.5 text-sm text-[#5B6D60] leading-relaxed">
          Hi{user?.name ? `, ${user.name}` : ""}! Create a username and password so you can also log in
          without Google later.
        </p>

        {errorMessage && (
          <div
            role="alert"
            className="mt-5 p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-start gap-2.5"
          >
            <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1 font-medium leading-relaxed">{errorMessage}</div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label htmlFor="setup-username" className="text-xs font-bold block mb-1.5">
              Username
            </label>
            <div className="relative">
              <UserIcon className="w-4 h-4 text-[#8C9E91] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                id="setup-username"
                type="text"
                autoComplete="username"
                required
                placeholder="e.g. najwa_01"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-10 pr-3.5 py-3 rounded-xl border border-[#D5E1D7] text-base sm:text-sm font-medium focus:outline-none focus:border-[#224431] focus:ring-2 focus:ring-[#224431]/40 bg-[#FAF8F5]/60 focus:bg-white transition-all"
              />
            </div>
            <p className="mt-1 text-[11px] text-[#7A8E80]">3-20 characters: lowercase letters, numbers, or _</p>
          </div>

          <div>
            <label htmlFor="setup-password" className="text-xs font-bold block mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#8C9E91] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                id="setup-password"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                required
                placeholder="At least 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-10 py-3 rounded-xl border border-[#D5E1D7] text-base sm:text-sm font-medium focus:outline-none focus:border-[#224431] focus:ring-2 focus:ring-[#224431]/40 bg-[#FAF8F5]/60 focus:bg-white transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#8C9E91] hover:text-[#1E3A2B] cursor-pointer"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={saving}
            className="w-full py-3.5 px-4 rounded-xl text-sm font-bold text-white bg-[#224431] hover:bg-[#183526] transition-all duration-200 cursor-pointer disabled:opacity-70"
          >
            {saving ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto" />
            ) : (
              "Save and continue"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
