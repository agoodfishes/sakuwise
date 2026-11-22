import React, { type ReactNode } from "react";
import { FinanceProvider } from "@/context/FinanceContext";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return <FinanceProvider>{children}</FinanceProvider>;
}
