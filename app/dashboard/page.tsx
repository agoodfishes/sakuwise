"use client";

import React, { useState } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import Header from "@/components/dashboard/Header";
import OverviewView, { Transaction } from "@/components/dashboard/OverviewView";
import MonthlyBudgetView from "@/components/dashboard/MonthlyBudgetView";
import ExpensesView from "@/components/dashboard/ExpensesView";
import AIAssistantView from "@/components/dashboard/AIAssistantView";
import BillsView from "@/components/dashboard/BillsView";
import SavingsGoalsView from "@/components/dashboard/SavingsGoalsView";
import SettingsView from "@/components/dashboard/SettingsView";
import AddExpenseModal from "@/components/dashboard/AddExpenseModal";
import { useAuth } from "@/context/AuthContext";

export default function DashboardPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<string>("overview");
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [addExpenseModalOpen, setAddExpenseModalOpen] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState("November 2026");

  // Initial transactions matching Image 1 & Image 3
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: "tx-1",
      name: "Lunch at campus",
      time: "Today · 12:30",
      category: "Food & drinks",
      amount: 28000,
    },
    {
      id: "tx-2",
      name: "Afternoon coffee",
      time: "Today · 09:15",
      category: "Food & drinks",
      amount: 17000,
    },
    {
      id: "tx-3",
      name: "Ride to campus",
      time: "16 Nov · 07:45",
      category: "Transport",
      amount: 18000,
    },
    {
      id: "tx-4",
      name: "Dinner with friends",
      time: "16 Nov · 18:30",
      category: "Food & drinks",
      amount: 35000,
    },
    {
      id: "tx-5",
      name: "Course textbook",
      time: "15 Nov · 14:20",
      category: "Academic needs",
      amount: 75000,
    },
    {
      id: "tx-6",
      name: "Printing assignment",
      time: "15 Nov · 10:00",
      category: "Academic needs",
      amount: 12000,
    },
    {
      id: "tx-7",
      name: "Laundry",
      time: "14 Nov · 17:00",
      category: "Personal",
      amount: 30000,
    },
  ]);

  const [baseSpent, setBaseSpent] = useState<number>(1740000);

  const handleSaveExpense = (newExpense: Omit<Transaction, "id">) => {
    const item: Transaction = {
      ...newExpense,
      id: `tx-${Date.now()}`,
    };
    setTransactions((prev) => [item, ...prev]);
    setBaseSpent((prev) => prev + newExpense.amount);
  };

  const renderActiveView = () => {
    switch (activeTab) {
      case "budget":
        return <MonthlyBudgetView />;
      case "expenses":
        return (
          <ExpensesView
            transactions={transactions}
            onAddExpense={handleSaveExpense}
            totalSpent={baseSpent}
          />
        );
      case "ai":
        return <AIAssistantView />;
      case "bills":
        return <BillsView />;
      case "savings":
        return <SavingsGoalsView />;
      case "settings":
        return <SettingsView />;
      case "help":
        return (
          <div className="bg-white rounded-2xl p-6 sm:p-7 border border-[#E7EDE7] shadow-2xs space-y-4">
            <h2 className="text-base font-bold text-[#1E3A2B]">Pusat Bantuan & Dukungan Sakuwise</h2>
            <p className="text-xs text-[#718576]">
              Butuh bantuan dengan pembagian saku anggaran atau ingin panduan penggunaan fitur?
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E7EDE7]">
                <p className="text-xs font-bold text-[#1E3A2B]">Panduan Metode 50/30/20</p>
                <p className="text-[11px] text-[#718576] mt-1">Pelajari cara mengalokasikan gaji pertama atau kiriman bulanan.</p>
              </div>
              <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E7EDE7]">
                <p className="text-xs font-bold text-[#1E3A2B]">Hubungi Dukungan</p>
                <p className="text-[11px] text-[#718576] mt-1">Tim Sakuwise siap membantumu di halo@sakuwise.id</p>
              </div>
            </div>
          </div>
        );
      default:
        return (
          <OverviewView
            onSwitchTab={setActiveTab}
            onOpenAddExpense={() => setAddExpenseModalOpen(true)}
            transactions={transactions}
            totalSpent={baseSpent}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] flex">
      {/* 1. Sidebar Navigation (Left) */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        mobileOpen={mobileSidebarOpen}
        setMobileOpen={setMobileSidebarOpen}
      />

      {/* 2. Main Content Area (Right) */}
      <div className="flex-1 md:pl-64 flex flex-col min-h-screen">
        {/* Top Header */}
        <Header
          activeTab={activeTab}
          onOpenAddExpense={() => setAddExpenseModalOpen(true)}
          onOpenMobileSidebar={() => setMobileSidebarOpen(true)}
          selectedMonth={selectedMonth}
          setSelectedMonth={setSelectedMonth}
        />

        {/* Dynamic View Body */}
        <main className="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto">
          {renderActiveView()}
        </main>
      </div>

      {/* 3. Global Add Expense Modal */}
      <AddExpenseModal
        isOpen={addExpenseModalOpen}
        onClose={() => setAddExpenseModalOpen(false)}
        onSaveExpense={handleSaveExpense}
      />
    </div>
  );
}
