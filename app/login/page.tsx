"use client";

import React, { useState } from "react";
import Link from "next/link";
import Logo from "@/components/Logo";
import GoogleIcon from "@/components/GoogleIcon";
import { useAuth } from "@/context/AuthContext";
import { ArrowLeft, ShieldCheck, CheckCircle2, Sparkles, UserCheck } from "lucide-react";

export default function LoginPage() {
  const { loginWithGoogle, isLoading } = useAuth();
  const [selectedProfile, setSelectedProfile] = useState<"najwa" | "custom">("najwa");
  const [customName, setCustomName] = useState("");
  const [customEmail, setCustomEmail] = useState("");

  const handleGoogleLogin = async () => {
    if (selectedProfile === "custom" && customName.trim()) {
      await loginWithGoogle({
        name: customName.trim(),
        email: customEmail.trim() || `${customName.toLowerCase().replace(/\s+/g, "")}@gmail.com`,
        role: "Personal account",
      });
    } else {
      await loginWithGoogle({
        name: "Najwa",
        email: "najwa.finance@student.ac.id",
        role: "Student account",
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] flex flex-col justify-between py-8 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background subtle decorative blobs */}
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

      {/* Center Card */}
      <div className="my-auto max-w-md w-full mx-auto z-10">
        <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-[0_16px_40px_-12px_rgba(30,58,43,0.08)] border border-[#E7EDE7] text-center relative">
          
          {/* Logo Sakuwise di bagian atas lengkap dengan tagline */}
          <div className="flex justify-center mb-6">
            <Link href="/" className="inline-block">
              <Logo />
            </Link>
          </div>

          {/* Heading & Supporting text */}
          <h1 className="text-2xl sm:text-[26px] font-extrabold text-[#1E3A2B] tracking-tight leading-snug">
            Selamat Datang di Sakuwise
          </h1>
          <p className="mt-2.5 text-xs sm:text-sm text-[#5B6D60] leading-relaxed max-w-sm mx-auto">
            Kelola keuangan bulananmu dengan lebih bijak, terarah, dan terintegrasi.
          </p>

          {/* Account Profile Preview (Default: Student account · Najwa) */}
          <div className="mt-7 text-left">
            <label className="text-[11px] font-bold text-[#6D8072] uppercase tracking-wider block mb-2">
              Pilih Akun Masuk Google
            </label>
            <div className="space-y-2">
              <button
                type="button"
                onClick={() => setSelectedProfile("najwa")}
                className={`w-full p-3 rounded-2xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                  selectedProfile === "najwa"
                    ? "border-[#224431] bg-[#F4F8F5] ring-2 ring-[#224431]/10"
                    : "border-[#E5ECE5] bg-[#FAF8F5] hover:border-[#CBD9CE]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#E5EDE7] text-[#224431] font-bold text-sm flex items-center justify-center border border-[#CBD9CE]">
                    N
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <p className="text-xs font-bold text-[#1E3A2B]">Najwa</p>
                      <span className="text-[10px] bg-[#E8EFEA] text-[#224431] font-semibold px-2 py-0.2 rounded-full">
                        Student Account
                      </span>
                    </div>
                    <p className="text-[11px] text-[#718275]">
                      najwa.finance@student.ac.id
                    </p>
                  </div>
                </div>
                {selectedProfile === "najwa" && (
                  <CheckCircle2 className="w-4 h-4 text-[#224431]" />
                )}
              </button>

              <button
                type="button"
                onClick={() => setSelectedProfile("custom")}
                className={`w-full p-3 rounded-2xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                  selectedProfile === "custom"
                    ? "border-[#224431] bg-[#F4F8F5] ring-2 ring-[#224431]/10"
                    : "border-[#E5ECE5] bg-[#FAF8F5] hover:border-[#CBD9CE]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-amber-50 text-amber-800 font-bold text-sm flex items-center justify-center border border-amber-200">
                    <UserCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#1E3A2B]">
                      Gunakan Nama Lain
                    </p>
                    <p className="text-[11px] text-[#718275]">
                      Ketik nama profil kustom Anda
                    </p>
                  </div>
                </div>
                {selectedProfile === "custom" && (
                  <CheckCircle2 className="w-4 h-4 text-[#224431]" />
                )}
              </button>
            </div>

            {selectedProfile === "custom" && (
              <div className="mt-3 space-y-2 animate-in fade-in duration-200">
                <input
                  type="text"
                  placeholder="Masukkan nama Anda (misal: Budi / Siti)"
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#D5E0D7] focus:outline-none focus:border-[#224431] focus:ring-1 focus:ring-[#224431] bg-white"
                />
              </div>
            )}
          </div>

          {/* Primary Action Button: "Continue with Google" / "Masuk dengan Google" */}
          <div className="mt-6">
            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-3 px-6 py-3.5 rounded-xl text-sm font-semibold text-[#1E3A2B] bg-white border border-[#D3DDD5] hover:bg-[#F9FAF9] hover:border-[#224431]/40 shadow-xs hover:shadow-md active:scale-[0.99] transition-all duration-200 cursor-pointer disabled:opacity-70 group"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-[#1E3A2B] border-t-transparent rounded-full animate-spin" />
              ) : (
                <GoogleIcon className="w-5 h-5 group-hover:scale-105 transition-transform" />
              )}
              <span>
                {isLoading ? "Menghubungkan Akun Google..." : "Masuk dengan Google"}
              </span>
            </button>
          </div>

          {/* Trust badges */}
          <div className="mt-6 pt-5 border-t border-[#F0F4F1] flex items-center justify-center gap-2 text-[11px] text-[#718275]">
            <ShieldCheck className="w-4 h-4 text-[#20743E]" />
            <span>Otentikasi aman dengan enkripsi Google OAuth 2.0</span>
          </div>

          <p className="mt-4 text-[11px] text-[#869689] leading-relaxed">
            Dengan masuk, kamu menyetujui Ketentuan Layanan & Kebijakan Privasi Sakuwise.
          </p>
        </div>
      </div>

      {/* Footer simple */}
      <div className="max-w-md mx-auto w-full text-center text-xs text-[#8A9B8D] z-10">
        © 2026 Sakuwise. Saku cerdas untuk generasi bijak.
      </div>
    </div>
  );
}
