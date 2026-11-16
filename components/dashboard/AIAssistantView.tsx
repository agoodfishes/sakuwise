"use client";

import React, { useState } from "react";
import { Sparkles, Send, Bot, User as UserIcon, Lightbulb, TrendingDown, Shield } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function AIAssistantView() {
  const { user } = useAuth();
  const userName = user?.name || "Najwa";

  const [messages, setMessages] = useState([
    {
      id: "1",
      sender: "ai",
      text: `Halo ${userName}! Saya asisten finansial Sakuwise kamu. Berdasarkan catatan bulan November ini, kamu sudah menghabiskan Rp1.740.000 dari allowance Rp3.000.000. Sisa kuota harianmu adalah Rp90.000/hari untuk 14 hari ke depan. Ada yang ingin kamu diskusikan?`,
      time: "10:30",
    },
    {
      id: "2",
      sender: "user",
      text: "Bagaimana cara menghemat pengeluaran saku makan minggu ini agar tidak boncos?",
      time: "10:31",
    },
    {
      id: "3",
      sender: "ai",
      text: `Saran bijak untuk saku makanmu:\n\n1. 🍱 Meal Prep / Bawa Bekal: Batasi jajan di kantin kampus menjadi 1x sehari saja.\n2. ☕ Kopi Hemat: Ganti afternoon coffee harian di cafe dengan cold brew buatan sendiri atau air putih botol.\n3. 🎯 Target Harian: Jaga pengeluaran makan di angka maksimal Rp27.000 per hari, maka sisa Rp390.000 di saku makanmu akan cukup sampai tanggal 30 November!`,
      time: "10:31",
    },
  ]);

  const [inputMessage, setInputMessage] = useState("");

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMsg = {
      id: Date.now().toString(),
      sender: "user",
      text: inputMessage,
      time: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage("");

    // Simulate smart AI reply
    setTimeout(() => {
      const aiReply = {
        id: (Date.now() + 1).toString(),
        sender: "ai",
        text: `Analisis cerdas untuk pertanyaanmu: Rencanamu sangat realistis. Jika kamu menahan pengeluaran hiburan akhir pekan ini, kamu bisa menyisihkan tambahan Rp50.000 langsung ke target tabungan 'New laptop fund'!`,
        time: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, aiReply]);
    }, 800);
  };

  const quickQuestions = [
    "Bagaimana evaluasi pengeluaran mingguan saya?",
    "Apakah tabungan laptop saya sesuai target?",
    "Simulasikan jika saya belanja Rp100.000 hari ini",
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Top Banner */}
      <div className="bg-[#EBF1EC] rounded-2xl p-6 border border-[#DCE5DE] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#244833] text-white flex items-center justify-center">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-[#1E3A2B]">
              Sakuwise AI Smart Advisor
            </h3>
            <p className="text-xs text-[#596D5F]">
              Didukung model analisis pengeluaran personal tanpa membagikan data pribadimu.
            </p>
          </div>
        </div>
      </div>

      {/* Chat Container */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E7EDE7] shadow-2xs flex flex-col h-[520px]">
        {/* Messages list */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-2">
          {messages.map((m) => {
            const isAi = m.sender === "ai";
            return (
              <div
                key={m.id}
                className={`flex items-start gap-3 ${isAi ? "justify-start" : "justify-end"}`}
              >
                {isAi && (
                  <div className="w-8 h-8 rounded-full bg-[#244833] text-white flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`max-w-lg rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                    isAi
                      ? "bg-[#FAF8F5] text-[#1E3A2B] border border-[#E7EDE7]"
                      : "bg-[#244833] text-white"
                  }`}
                >
                  <p className="whitespace-pre-line">{m.text}</p>
                  <span
                    className={`text-[10px] block mt-1.5 ${
                      isAi ? "text-[#7B8F80]" : "text-emerald-200/80"
                    }`}
                  >
                    {m.time}
                  </span>
                </div>

                {!isAi && (
                  <div className="w-8 h-8 rounded-full bg-[#E08C38] text-white font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                    {userName.charAt(0)}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Quick Suggestions */}
        <div className="py-3 flex items-center gap-2 overflow-x-auto border-t border-[#F2F5F2]">
          {quickQuestions.map((q, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setInputMessage(q)}
              className="flex-shrink-0 text-[11px] font-medium text-[#244833] bg-[#E8EFEA] hover:bg-[#DCE6DF] px-3 py-1.5 rounded-full transition-colors cursor-pointer"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Input bar */}
        <form onSubmit={handleSend} className="relative flex items-center gap-2 pt-2">
          <input
            type="text"
            placeholder="Tanyakan rekomendasi atau hitung pengeluaran..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            className="flex-1 bg-[#FAF8F5] border border-[#D7E2D9] rounded-xl px-4 py-3 text-xs sm:text-sm text-[#1E3A2B] placeholder:text-gray-400 focus:outline-none focus:border-[#224431]"
          />
          <button
            type="submit"
            className="p-3 rounded-xl bg-[#224431] text-white hover:bg-[#163323] transition-colors shadow-xs cursor-pointer flex-shrink-0"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>

    </div>
  );
}
