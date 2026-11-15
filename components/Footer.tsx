"use client";

import React, { useState } from "react";
import Logo from "./Logo";
import { ArrowRight, Check } from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="bg-[#1E3A2B] text-white pt-16 pb-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-16">
          
          {/* Left Column: Logo in White Card & Slogan */}
          <div className="lg:col-span-4 flex flex-col items-start">
            {/* White card container for Sakuwise Logo */}
            <div className="bg-white rounded-2xl px-5 py-3.5 shadow-sm inline-flex">
              <Logo />
            </div>

            {/* Slogan */}
            <div className="mt-8">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug">
                Uang lebih terarah. <br />
                Hidup lebih tenang.
              </h3>
            </div>
          </div>

          {/* Middle Links Column 1: Produk */}
          <div className="lg:col-span-2">
            <h4 className="text-sm font-semibold text-white/90 tracking-wide mb-4">
              Produk
            </h4>
            <ul className="space-y-3 text-sm text-[#B4CEBD]">
              <li>
                <a href="#fitur" className="hover:text-white transition-colors">
                  Fitur
                </a>
              </li>
              <li>
                <a href="#fitur" className="hover:text-white transition-colors">
                  Saku Anggaran
                </a>
              </li>
              <li>
                <a href="#fitur" className="hover:text-white transition-colors">
                  Target Tabungan
                </a>
              </li>
              <li>
                <a href="#harga" className="hover:text-white transition-colors">
                  Harga
                </a>
              </li>
            </ul>
          </div>

          {/* Middle Links Column 2: Sakuwise */}
          <div className="lg:col-span-2">
            <h4 className="text-sm font-semibold text-white/90 tracking-wide mb-4">
              Sakuwise
            </h4>
            <ul className="space-y-3 text-sm text-[#B4CEBD]">
              <li>
                <a href="#tentang" className="hover:text-white transition-colors">
                  Tentang kami
                </a>
              </li>
              <li>
                <a href="#cara-kerja" className="hover:text-white transition-colors">
                  Cara Kerja
                </a>
              </li>
              <li>
                <a href="#keamanan" className="hover:text-white transition-colors">
                  Keamanan
                </a>
              </li>
              <li>
                <a href="#bantuan" className="hover:text-white transition-colors">
                  Pusat Bantuan
                </a>
              </li>
            </ul>
          </div>

          {/* Right Column: Newsletter Subscription */}
          <div className="lg:col-span-4">
            <h4 className="text-base font-bold text-white tracking-tight mb-2">
              Kabar bijak untuk keuanganmu.
            </h4>
            <p className="text-sm text-[#B4CEBD] leading-relaxed mb-5">
              Tips sederhana dan cerita baik, langsung ke inbox. Sesekali saja.
              Selalu bermanfaat.
            </p>

            {subscribed ? (
              <div className="bg-[#2A4F3B] border border-[#3E6C53] rounded-2xl p-4 flex items-center gap-3 text-sm text-emerald-200">
                <div className="w-7 h-7 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center flex-shrink-0">
                  <Check className="w-4 h-4 stroke-[3]" />
                </div>
                <span>Terima kasih! Kamu telah terdaftar untuk kabar bijak.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2.5">
                <div className="relative flex items-center bg-white rounded-xl p-1.5 shadow-md">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Alamat email kamu"
                    className="w-full bg-transparent px-3.5 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="flex-shrink-0 px-4 py-2 rounded-lg text-xs font-semibold bg-[#224431] text-white hover:bg-[#163323] transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <span>Berlangganan</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="text-[11px] text-[#8BA493]">
                  Dengan berlangganan, kamu setuju dengan{" "}
                  <a
                    href="#privasi"
                    className="underline hover:text-white transition-colors"
                  >
                    Kebijakan Privasi
                  </a>
                  .
                </p>
              </form>
            )}
          </div>

        </div>

        {/* Bottom Sub-bar */}
        <div className="pt-8 border-t border-[#294B37] flex flex-col sm:flex-row items-center justify-between text-xs text-[#8BA493] gap-4">
          <p>© 2026 Sakuwise. Semua hak dilindungi.</p>
          <div className="flex items-center space-x-6">
            <a href="#privasi" className="hover:text-white transition-colors">
              Kebijakan Privasi
            </a>
            <a href="#syarat" className="hover:text-white transition-colors">
              Syarat & Ketentuan
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
