import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#FAF8F5",
};

export const metadata: Metadata = {
  title: "Sakuwise - Manage Your Personal Finances Smarter & with Purpose",
  description:
    "Put your money in the right pocket, understand your spending, and reach your goals. Everything is simpler with Sakuwise. Manage your money, wisely.",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/logo.png",
  },
  keywords: [
    "Sakuwise",
    "personal finance",
    "budgeting app",
    "money manager",
    "budget pockets",
    "indonesia fintech",
  ],
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} scroll-smooth`}
      data-scroll-behavior="smooth"
    >
      <body className="min-h-dvh bg-[#FAF8F5] text-[#1E3A2B] font-sans antialiased selection:bg-[#E08C38]/20 selection:text-[#1E3A2B]">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
