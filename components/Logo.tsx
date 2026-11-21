"use client";

import React from "react";
import Image from "next/image";

interface LogoProps {
  className?: string;
  isDark?: boolean;
  size?: "sm" | "md" | "lg";
  taglineClassName?: string;
  showTagline?: boolean;
}

export default function Logo({
  className = "",
  isDark = false,
  size = "md",
}: LogoProps) {
  const sizeClasses = {
    sm: "h-8 sm:h-9",
    md: "h-10 sm:h-11",
    lg: "h-12 sm:h-14",
  };

  return (
    <div className={`inline-flex items-center select-none ${className}`}>
      <img
        src="/logo.png"
        alt="Sakuwise - Manage your money, wisely"
        className={`${sizeClasses[size]} w-auto object-contain transition-transform duration-200 hover:scale-[1.02]`}
        onError={(e) => {
          // Fallback to SVG if PNG fails
          (e.currentTarget as HTMLImageElement).src = "/logo.svg";
        }}
      />
    </div>
  );
}
