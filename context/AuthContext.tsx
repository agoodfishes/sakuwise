"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  loginWithGoogle: (customData?: Partial<User>) => Promise<void>;
  logout: () => void;
}

const DEFAULT_USER: User = {
  id: "google_10928374",
  name: "Najwa",
  email: "najwa.finance@student.ac.id",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
  role: "Student account",
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check localStorage on mount
    try {
      const stored = localStorage.getItem("sakuwise_auth_user");
      if (stored) {
        setUser(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Failed to load user session", e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const loginWithGoogle = async (customData?: Partial<User>) => {
    setIsLoading(true);
    // Simulate brief network delay for authentic feel
    await new Promise((r) => setTimeout(r, 600));

    const loggedUser: User = {
      ...DEFAULT_USER,
      ...customData,
    };

    setUser(loggedUser);
    try {
      localStorage.setItem("sakuwise_auth_user", JSON.stringify(loggedUser));
    } catch (e) {
      console.error(e);
    }
    setIsLoading(false);
    router.push("/dashboard");
  };

  const logout = () => {
    setUser(null);
    try {
      localStorage.removeItem("sakuwise_auth_user");
    } catch (e) {
      console.error(e);
    }
    router.push("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        loginWithGoogle,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
