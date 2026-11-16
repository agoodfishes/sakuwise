"use client";

import React from "react";

interface LogoProps {
  className?: string;
  isDark?: boolean;
  size?: "sm" | "md" | "lg";
  taglineClassName?: string;
  showTagline?: boolean;
}

// Unique instance counter to prevent SVG gradient ID collisions (hydration error fix)
let _logoCount = 0;

export default function Logo({
  className = "",
  isDark = false,
  size = "md",
  taglineClassName = "",
  showTagline = true,
}: LogoProps) {
  const uidRef = React.useRef<string | null>(null);
  if (uidRef.current === null) {
    uidRef.current = `sw-${++_logoCount}`;
  }
  const uid = uidRef.current;

  const iconSizes = { sm: "w-7 h-7", md: "w-9 h-9", lg: "w-11 h-11" };
  const textSizes = { sm: "text-lg", md: "text-2xl", lg: "text-3xl" };
  const taglineSizes = { sm: "text-[9px]", md: "text-[10.5px]", lg: "text-xs" };

  return (
    <div className={`flex items-center gap-2.5 sm:gap-3 select-none ${className}`}>
      {/* Sakuwise Organic Ribbon Icon */}
      <div className={`relative ${iconSizes[size]} flex-shrink-0 drop-shadow-xs`}>
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
          aria-hidden="true"
        >
          <path
            d="M50 12C36 12 25 18 18 27C16 29 17 33 20 34L64 45C72 47 80 43 83 36C87 27 79 12 50 12Z"
            fill={`url(#${uid}-a)`}
          />
          <path
            d="M52 12C70 12 85 20 84 34C83.5 40 76 46 66 44L28 35C24 34 23 29 26 27C33 19 41 12 52 12Z"
            fill="#E09B35"
          />
          <path
            d="M26 34L72 45C68 53 58 57 48 57L24 53C18 52 15 47 18 42L26 34Z"
            fill="#233E2B"
            opacity="0.85"
          />
          <path
            d="M48 56L78 63C84 64.5 86 70 82 75C75 84 62 88 48 88C28 88 14 78 16 64C17 56 26 51 38 53L70 59"
            fill={`url(#${uid}-g)`}
          />
          <path
            d="M16 66C15 76 28 88 50 88C70 88 84 79 81 68C79.5 62 72 58 64 57L26 51C19 50 16 56 16 66Z"
            fill="#2A4D35"
          />
          <path
            d="M32 40L68 48C62 53 50 54 40 52L26 48C24 47 24 43 27 41L32 40Z"
            fill="#FAF8F5"
            opacity="0.25"
          />
          <defs>
            <linearGradient id={`${uid}-a`} x1="20" y1="20" x2="80" y2="40" gradientUnits="userSpaceOnUse">
              <stop stopColor="#F5B342" />
              <stop offset="1" stopColor="#DE9B35" />
            </linearGradient>
            <linearGradient id={`${uid}-g`} x1="20" y1="60" x2="80" y2="85" gradientUnits="userSpaceOnUse">
              <stop stopColor="#365C40" />
              <stop offset="1" stopColor="#1E3826" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Text: "Sakuwise" with amber "wise" */}
      <div className="flex flex-col justify-center">
        <div className="flex items-baseline leading-none">
          <span className={`${textSizes[size]} font-bold tracking-tight ${isDark ? "text-white" : "text-[#233F2E]"}`}>
            Saku
          </span>
          <span className={`${textSizes[size]} font-bold tracking-tight text-[#DE9B35]`}>
            wise
          </span>
        </div>
        {showTagline && (
          <span
            className={`${taglineSizes[size]} tracking-tight font-normal mt-0.5 ${
              isDark ? "text-emerald-100/70" : "text-[#6C8070]"
            } ${taglineClassName}`}
          >
            Manage your money, wisely.
          </span>
        )}
      </div>
    </div>
  );
}
