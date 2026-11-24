"use client";

import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import type { User as SupabaseUser } from "@supabase/supabase-js";
import { supabase, isSupabaseConfigured } from "@/lib/supabaseClient";

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: string;
}

interface AuthResponse {
  success: boolean;
  error?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  loginWithEmail: (email: string, pass: string, remember?: boolean) => Promise<AuthResponse>;
  signUpWithEmail: (name: string, email: string, pass: string) => Promise<AuthResponse>;
  loginWithGoogle: () => Promise<AuthResponse>;
  needsSetup: boolean;
  completeGoogleSetup: (username: string, pass: string) => Promise<AuthResponse>;
  logout: () => void;
}

const DEFAULT_USERS_DB: Record<string, { name: string; passwordHash: string; role: string }> = {
  "najwa.finance@student.ac.id": {
    name: "Najwa",
    passwordHash: "password123",
    role: "Student account",
  },
  "najwa@sakuwise.id": {
    name: "Najwa",
    passwordHash: "password123",
    role: "Student account",
  },
  "admin@sakuwise.id": {
    name: "Admin Sakuwise",
    passwordHash: "admin123",
    role: "Akun Sakuwise",
  },
  "lia@sakuwise.id": {
    name: "Lia",
    passwordHash: "password123",
    role: "Student account",
  },
  "husen@sakuwise.id": {
    name: "Husen",
    passwordHash: "password123",
    role: "Student account",
  },
  "christ@sakuwise.id": {
    name: "Christ",
    passwordHash: "password123",
    role: "Student account",
  },
};

// Demo accounts live only in the local store. If Supabase rejects them, fall back to the local login.
const DEMO_LOGIN_EMAILS = ["najwa.finance@student.ac.id", "najwa@sakuwise.id"];

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  // true: Google user who has not chosen a username/password yet
  const [needsSetup, setNeedsSetup] = useState(false);
  // true: session survives closing the browser (localStorage); false: only this browser session (sessionStorage)
  const rememberRef = useRef(true);
  const router = useRouter();

  // Load existing session & registered accounts from localStorage
  useEffect(() => {
    // Deferred so state is not set synchronously in the effect body
    const timer = setTimeout(() => {
      try {
        // 1. Load active session
        const stored =
          sessionStorage.getItem("sakuwise_auth_user") ?? localStorage.getItem("sakuwise_auth_user");
        if (stored) {
          setUser(JSON.parse(stored));
        }

        // 2. Initialize registered accounts DB in localStorage if not set
        // Merge built-in accounts into the saved list: missing ones are added, existing ones are kept
        const storedAccounts = localStorage.getItem("sakuwise_registered_accounts");
        const savedDb = storedAccounts ? JSON.parse(storedAccounts) : {};
        localStorage.setItem(
          "sakuwise_registered_accounts",
          JSON.stringify({ ...DEFAULT_USERS_DB, ...savedDb })
        );
      } catch (e) {
        console.error("Failed to load auth session", e);
      } finally {
        // When Supabase is configured, the Supabase session effect below ends the loading state
        if (!isSupabaseConfigured || !supabase) setIsLoading(false);
      }
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  // Sync the Supabase session (needed after the redirect back from Google OAuth)
  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) return;
    const client = supabase;

    const toUser = (u: SupabaseUser): User => ({
      id: u.id,
      name: u.user_metadata?.full_name || u.user_metadata?.name || u.email?.split("@")[0] || "Pengguna",
      email: u.email || "",
      avatar: u.user_metadata?.avatar_url || u.user_metadata?.picture,
      role: "Personal account",
    });

    const checkProfile = async (u: SupabaseUser) => {
      if (u.app_metadata?.provider !== "google") return;
      const { data, error } = await client
        .from("profiles")
        .select("user_id")
        .eq("user_id", u.id)
        .maybeSingle();
      if (!error) setNeedsSetup(!data);
    };

    client.auth
      .getSession()
      .then(({ data }) => {
        if (data.session?.user) {
          setUser(toUser(data.session.user));
          checkProfile(data.session.user);
        }
      })
      .catch((e) => console.error("Failed to read Supabase session", e))
      .finally(() => setIsLoading(false));

    const { data: sub } = client.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        const u = session.user;
        setUser(toUser(u));
        // Deferred: do not call Supabase inside the auth callback itself
        setTimeout(() => checkProfile(u), 0);
      }
    });

    return () => sub.subscription.unsubscribe();
  }, []);

  const getAccountsDb = () => {
    try {
      const stored = localStorage.getItem("sakuwise_registered_accounts");
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error(e);
    }
    return DEFAULT_USERS_DB;
  };

  const saveSession = (userData: User) => {
    setUser(userData);
    try {
      const key = "sakuwise_auth_user";
      const target = rememberRef.current ? localStorage : sessionStorage;
      const other = rememberRef.current ? sessionStorage : localStorage;
      target.setItem(key, JSON.stringify(userData));
      other.removeItem(key);
    } catch (e) {
      console.error(e);
    }
  };

  // 1. Email & Password Login
  const loginWithEmail = async (
    email: string,
    pass: string,
    remember = true
  ): Promise<AuthResponse> => {
    rememberRef.current = remember;
    setIsLoading(true);

    // A plain username (no @) is resolved to its email through the database
    if (!email.includes("@")) {
      const username = email.trim().toLowerCase();
      let resolved: string | null = null;
      if (isSupabaseConfigured && supabase) {
        try {
          const { data } = await supabase.rpc("email_for_username", { p_username: username });
          if (typeof data === "string" && data) resolved = data;
        } catch (err: unknown) {
          console.warn("Username lookup failed", err);
        }
      }
      email = resolved ?? `${username}@sakuwise.id`;
    }

    // If Supabase is configured with valid credentials, try Supabase Auth first
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password: pass,
        });

        if (error && !DEMO_LOGIN_EMAILS.includes(email.trim().toLowerCase())) {
          setIsLoading(false);
          return { success: false, error: error.message };
        }

        if (data.user) {
          const u: User = {
            id: data.user.id,
            name: data.user.user_metadata?.full_name || email.split("@")[0],
            email: data.user.email || email,
            role: "Personal account",
          };
          saveSession(u);
          setIsLoading(false);
          router.push("/dashboard");
          return { success: true };
        }
      } catch (err: unknown) {
        console.warn("Supabase auth failed, trying local store...", err);
      }
    }

    // Standard Credentials validation (Simulation / Local DB)
    await new Promise((r) => setTimeout(r, 400));
    const normalizedEmail = email.trim().toLowerCase();
    const accounts = getAccountsDb();

    if (!normalizedEmail || !pass) {
      setIsLoading(false);
      return { success: false, error: "Email dan kata sandi wajib diisi." };
    }

    const account = accounts[normalizedEmail];
    if (!account) {
      setIsLoading(false);
      return {
        success: false,
        error: "Email belum terdaftar. Silakan daftar akun baru terlebih dahulu.",
      };
    }

    if (account.passwordHash !== pass) {
      setIsLoading(false);
      return {
        success: false,
        error: "Kata sandi salah. Silakan periksa kembali kata sandi Anda.",
      };
    }

    // Login success
    const loggedUser: User = {
      id: `usr_${Date.now()}`,
      name: account.name || "Najwa",
      email: normalizedEmail,
      role: account.role || "Student account",
    };

    saveSession(loggedUser);
    setIsLoading(false);
    router.push("/dashboard");
    return { success: true };
  };

  // 2. Email & Password Sign Up
  const signUpWithEmail = async (
    name: string,
    email: string,
    pass: string
  ): Promise<AuthResponse> => {
    setIsLoading(true);

    if (!name.trim()) {
      setIsLoading(false);
      return { success: false, error: "Nama lengkap wajib diisi." };
    }

    const normalizedEmail = email.trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(normalizedEmail)) {
      setIsLoading(false);
      return { success: false, error: "Format email tidak valid." };
    }

    if (pass.length < 6) {
      setIsLoading(false);
      return { success: false, error: "Kata sandi minimal 6 karakter." };
    }

    // If Supabase is configured
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.auth.signUp({
          email: normalizedEmail,
          password: pass,
          options: {
            data: { full_name: name.trim() },
          },
        });

        if (error) {
          setIsLoading(false);
          return { success: false, error: error.message };
        }

        if (data.user) {
          const u: User = {
            id: data.user.id,
            name: name.trim(),
            email: normalizedEmail,
            role: "Personal account",
          };
          saveSession(u);
          setIsLoading(false);
          router.push("/dashboard");
          return { success: true };
        }
      } catch (err: unknown) {
        console.warn("Supabase signup fallback...", err);
      }
    }

    // Standard Credentials registration (Local DB)
    await new Promise((r) => setTimeout(r, 450));
    const accounts = getAccountsDb();

    if (accounts[normalizedEmail]) {
      setIsLoading(false);
      return {
        success: false,
        error: "Email sudah terdaftar. Silakan masuk menggunakan kata sandi Anda.",
      };
    }

    // Register new user
    accounts[normalizedEmail] = {
      name: name.trim(),
      passwordHash: pass,
      role: "Personal account",
    };

    try {
      localStorage.setItem("sakuwise_registered_accounts", JSON.stringify(accounts));
    } catch (e) {
      console.error(e);
    }

    const newUser: User = {
      id: `usr_${Date.now()}`,
      name: name.trim(),
      email: normalizedEmail,
      role: "Personal account",
    };

    saveSession(newUser);
    setIsLoading(false);
    router.push("/dashboard");
    return { success: true };
  };

  // 3. Google OAuth Login
  const loginWithGoogle = async (): Promise<AuthResponse> => {
    if (!isSupabaseConfigured || !supabase) {
      return {
        success: false,
        error: "Supabase belum dikonfigurasi. Isi NEXT_PUBLIC_SUPABASE_URL dan NEXT_PUBLIC_SUPABASE_ANON_KEY di .env.local.",
      };
    }

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/dashboard` },
    });

    // On success the browser is redirected to Google, so nothing else runs here
    if (error) return { success: false, error: error.message };
    return { success: true };
  };

  // 4. Finish Google account: choose a username and a password
  const completeGoogleSetup = async (username: string, pass: string): Promise<AuthResponse> => {
    if (!isSupabaseConfigured || !supabase || !user) {
      return { success: false, error: "Sesi tidak ditemukan. Silakan masuk lagi." };
    }

    const uname = username.trim().toLowerCase();
    if (!/^[a-z0-9_]{3,20}$/.test(uname)) {
      return {
        success: false,
        error: "Username 3-20 karakter: huruf kecil, angka, atau garis bawah (_).",
      };
    }
    if (pass.length < 6) {
      return { success: false, error: "Kata sandi minimal 6 karakter." };
    }

    // Username first, so a taken username does not change the password
    const { error: profileError } = await supabase
      .from("profiles")
      .insert({ user_id: user.id, username: uname });
    if (profileError) {
      return {
        success: false,
        error:
          profileError.code === "23505"
            ? "Username sudah dipakai. Coba yang lain."
            : profileError.message,
      };
    }

    const { error: passError } = await supabase.auth.updateUser({ password: pass });
    if (passError) {
      // Roll back so the user can retry with the same username
      await supabase.from("profiles").delete().eq("user_id", user.id);
      return { success: false, error: passError.message };
    }

    setNeedsSetup(false);
    return { success: true };
  };

  // 5. Logout
  const logout = () => {
    setUser(null);
    setNeedsSetup(false);
    try {
      localStorage.removeItem("sakuwise_auth_user");
      sessionStorage.removeItem("sakuwise_auth_user");
      rememberRef.current = true;
    } catch (e) {
      console.error(e);
    }
    if (isSupabaseConfigured && supabase) {
      supabase.auth.signOut().catch(() => {});
    }
    router.push("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        loginWithEmail,
        signUpWithEmail,
        loginWithGoogle,
        needsSetup,
        completeGoogleSetup,
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
