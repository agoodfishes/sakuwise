"use client";

import React, { useState } from "react";
import Link from "next/link";
import Logo from "@/components/Logo";
import GoogleIcon from "@/components/GoogleIcon";
import { useAuth } from "@/context/AuthContext";
import {
  ArrowLeft,
  ShieldCheck,
  Eye,
  EyeOff,
  AlertCircle,
  Sparkles,
  Lock,
  Mail,
  User as UserIcon,
} from "lucide-react";

export default function LoginPage() {
  const { loginWithEmail, signUpWithEmail, loginWithGoogle, isLoading } = useAuth();

  const [mode, setMode] = useState<"login" | "signup">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Quick Demo Account Click
  const handleQuickDemo = async () => {
    setErrorMessage(null);
    setEmail("najwa.finance@student.ac.id");
    setPassword("password123");
    await loginWithEmail("najwa.finance@student.ac.id", "password123");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (mode === "login") {
      const res = await loginWithEmail(email, password);
      if (!res.success && res.error) {
        setErrorMessage(res.error);
      }
    } else {
      const res = await signUpWithEmail(name, email, password);
      if (!res.success && res.error) {
        setErrorMessage(res.error);
      }
    }
  };

  const handleGoogleAuth = async () => {
    setErrorMessage(null);
    await loginWithGoogle({
      name: name.trim() || "Najwa",
      email: email.trim() || "najwa.finance@student.ac.id",
      role: "Student account",
    });
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] flex flex-col justify-between py-6 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background soft ambient glows */}
      <div
        className="absolute -top-32 -left-32 w-96 h-96 bg-[#E8EFEA]/70 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-32 -right-32 w-96 h-96 bg-[#FEF3E2]/60 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      {/* Top bar with back to home link */}
      <div className="max-w-6xl mx-auto w-full flex items-center justify-between z-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#5B6D60] hover:text-[#1E3A2B] transition-colors py-2 px-3 rounded-lg hover:bg-black/[0.03]"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Beranda</span>
        </Link>

        <span className="text-xs text-[#7A8B7E] hidden sm:inline-block">
          Sakuwise Cloud Secure Auth
        </span>
      </div>

      {/* Center Card Container */}
      <div className="my-auto max-w-md w-full mx-auto z-10 py-4">
        <div className="bg-white rounded-3xl p-7 sm:p-9 shadow-[0_16px_40px_-12px_rgba(30,58,43,0.08)] border border-[#E7EDE7] text-left relative">
          
          {/* Logo Sakuwise Resmi (lowercase + tagline) */}
          <div className="flex justify-center mb-5">
            <Link href="/" className="inline-block">
              <Logo size="md" />
            </Link>
          </div>

          {/* Heading & Supporting text */}
          <div className="text-center mb-6">
            <h1 className="text-2xl font-extrabold text-[#1E3A2B] tracking-tight">
              {mode === "login" ? "Selamat Datang Kembali" : "Buat Akun Sakuwise"}
            </h1>
            <p className="mt-1 text-xs text-[#5B6D60] leading-relaxed max-w-xs mx-auto">
              Kelola keuangan bulananmu dengan lebih bijak, terarah, dan terintegrasi.
            </p>
          </div>

          {/* Mode Switcher Tab (Masuk vs Daftar Baru) */}
          <div className="flex bg-[#F2F6F3] p-1 rounded-xl mb-6 border border-[#E2EBE4]">
            <button
              type="button"
              onClick={() => {
                setMode("login");
                setErrorMessage(null);
              }}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                mode === "login"
                  ? "bg-white text-[#1E3A2B] shadow-2xs"
                  : "text-[#627566] hover:text-[#1E3A2B]"
              }`}
            >
              Masuk (Login)
            </button>
            <button
              type="button"
              onClick={() => {
                setMode("signup");
                setErrorMessage(null);
              }}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                mode === "signup"
                  ? "bg-white text-[#1E3A2B] shadow-2xs"
                  : "text-[#627566] hover:text-[#1E3A2B]"
              }`}
            >
              Daftar Baru (Sign Up)
            </button>
          </div>

          {/* Error Message Alert */}
          {errorMessage && (
            <div className="mb-5 p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-start gap-2 animate-in fade-in duration-150">
              <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1 font-medium">{errorMessage}</div>
            </div>
          )}

          {/* Form Credentials (Email & Password) */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "signup" && (
              <div>
                <label className="text-[11px] font-bold text-[#677C6D] uppercase tracking-wider block mb-1">
                  Nama Lengkap
                </label>
                <div className="relative">
                  <UserIcon className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Najwa / Dimas"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-[#D5E1D7] text-xs font-semibold text-[#1E3A2B] focus:outline-none focus:border-[#224431] bg-[#FAF8F5] focus:bg-white transition-all"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="text-[11px] font-bold text-[#677C6D] uppercase tracking-wider block mb-1">
                Alamat Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  placeholder="nama@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-[#D5E1D7] text-xs font-semibold text-[#1E3A2B] focus:outline-none focus:border-[#224431] bg-[#FAF8F5] focus:bg-white transition-all"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-[11px] font-bold text-[#677C6D] uppercase tracking-wider">
                  Kata Sandi
                </label>
                {mode === "login" && (
                  <button
                    type="button"
                    onClick={() => alert("Silakan gunakan akun demo atau daftar akun baru.")}
                    className="text-[11px] text-[#244833] font-semibold hover:underline cursor-pointer"
                  >
                    Lupa sandi?
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="Minimal 6 karakter"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-[#D5E1D7] text-xs font-semibold text-[#1E3A2B] focus:outline-none focus:border-[#224431] bg-[#FAF8F5] focus:bg-white transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 rounded-xl text-xs font-bold text-white bg-[#224431] hover:bg-[#163323] transition-all shadow-sm hover:shadow active:scale-[0.99] cursor-pointer disabled:opacity-70 mt-2"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto" />
              ) : mode === "login" ? (
                "Masuk ke Akun"
              ) : (
                "Daftar Akun Baru"
              )}
            </button>
          </form>

          {/* Divider "Atau masuk dengan" */}
          <div className="relative my-6 text-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#E8ECE8]" />
            </div>
            <span className="relative bg-white px-3 text-[11px] font-medium text-[#7A8E80]">
              atau lanjutkan dengan
            </span>
          </div>

          {/* Continue with Google Button */}
          <button
            type="button"
            onClick={handleGoogleAuth}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2.5 px-4 py-3 rounded-xl text-xs font-semibold text-[#1E3A2B] bg-white border border-[#D3DDD5] hover:bg-[#F9FAF9] hover:border-[#224431]/40 shadow-2xs hover:shadow transition-all duration-200 cursor-pointer disabled:opacity-70 group"
          >
            <GoogleIcon className="w-4 h-4 group-hover:scale-105 transition-transform" />
            <span>Continue with Google</span>
          </button>

          {/* Quick Demo Fill Pill (Akun Demo Najwa) */}
          <div className="mt-5 pt-4 border-t border-[#F2F5F2] text-center">
            <button
              type="button"
              onClick={handleQuickDemo}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold text-[#20743E] bg-[#E7F6EC] hover:bg-[#D4EEDC] border border-[#C6E6D0] transition-colors cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#E08C38] fill-[#E08C38]" />
              <span>Gunakan Akun Demo (Najwa · 1 Klik)</span>
            </button>
          </div>

          {/* Trust note */}
          <div className="mt-4 flex items-center justify-center gap-1.5 text-[10px] text-[#788B7D]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#20743E]" />
            <span>Enkripsi kata sandi & otorisasi akun terproteksi</span>
          </div>

        </div>
      </div>

      {/* Footer simple */}
      <div className="max-w-md mx-auto w-full text-center text-xs text-[#8A9B8D] z-10 pb-2">
        © 2026 Sakuwise. Saku cerdas untuk generasi bijak.
      </div>
    </div>
  );
}
