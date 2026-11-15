import React from "react";

interface LogoProps {
  className?: string;
  isDark?: boolean;
  taglineClassName?: string;
}

export default function Logo({
  className = "",
  isDark = false,
  taglineClassName = "",
}: LogoProps) {
  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Minimalist Leaf & Wallet fold Icon */}
      <div className="relative w-10 h-10 flex-shrink-0">
        <svg
          viewBox="0 0 44 44"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-sm transition-transform duration-300 hover:scale-105"
        >
          {/* Top Leaf / Amber curve */}
          <path
            d="M8 18C8 12.4772 12.4772 8 18 8H28C33.5228 8 38 12.4772 38 18C38 21.3137 36.3137 24 33 24H18C12.4772 24 8 21.3137 8 18Z"
            fill="#E08C38"
            className="transition-colors duration-300"
          />
          {/* Bottom Leaf / Dark Olive curve forming layered wallet/sprout */}
          <path
            d="M6 26C6 20.4772 10.4772 16 16 16H29C34.5228 16 39 20.4772 39 26C39 31.5228 34.5228 36 29 36H16C10.4772 36 6 31.5228 6 26Z"
            fill="#1E3A2B"
            className="transition-colors duration-300"
          />
          {/* Inner pocket fold highlight */}
          <path
            d="M17 21C17 19.3431 18.3431 18 20 18H28C29.6569 18 31 19.3431 31 21C31 22.6569 29.6569 24 28 24H20C18.3431 24 17 22.6569 17 21Z"
            fill="#FAF8F5"
            opacity="0.9"
          />
        </svg>
      </div>

      {/* Typography & Tagline */}
      <div className="flex flex-col">
        <div className="flex items-baseline">
          <span
            className={`text-2xl font-bold tracking-tight ${
              isDark ? "text-white" : "text-[#1E3A2B]"
            }`}
          >
            saku
          </span>
          <span className="text-2xl font-bold tracking-tight text-[#E08C38]">
            wise
          </span>
        </div>
        <span
          className={`text-[10px] tracking-wide font-normal -mt-0.5 ${
            isDark ? "text-emerald-100/70" : "text-[#768779]"
          } ${taglineClassName}`}
        >
          Manage your money, wisely.
        </span>
      </div>
    </div>
  );
}
