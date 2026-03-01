"use client";

import { createContext, useContext, useEffect, useState } from "react";
import api from "@/lib/axios";
import { User } from "../types/user";

type AuthContextType = {
  user: User | null;
  loading: boolean;
  getUser: () => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  /** GET USER */
  const getUser = async () => {
    try {
      const res = await api.get("/me");
      setUser(res.data.user);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  /** AUTO LOAD USER */
  useEffect(() => {
    getUser();
  }, []);

  /** LOGOUT */
  const logout = async () => {
    await api.post("/auth/logout");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, getUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be inside AuthProvider");
  return ctx;
};
