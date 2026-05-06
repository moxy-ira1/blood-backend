"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { authApi, checkBackendConnection, User, ApiError } from "./api";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  backendConnected: boolean;
  login: (user: User, token: string) => void;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [backendConnected, setBackendConnected] = useState(false);

  const checkAuth = useCallback(async () => {
    try {
      const response = await authApi.getCurrentUser();
      if (response.success && response.data) {
        setUser(response.data);
      }
    } catch {
      setUser(null);
    }
  }, []);

  useEffect(() => {
    const initAuth = async () => {
      setIsLoading(true);
      
      const connected = await checkBackendConnection();
      setBackendConnected(connected);
      
      if (connected) {
        await checkAuth();
      }
      
      setIsLoading(false);
    };

    initAuth();
  }, [checkAuth]);

  const login = (userData: User, token: string) => {
    setUser(userData);
    if (typeof window !== "undefined") {
      localStorage.setItem("auth_token", token);
    }
  };

  const logout = async () => {
    try {
      await authApi.logout();
    } catch (error) {
      if (error instanceof ApiError) {
        console.error("[BloodBank] Logout error:", error.message);
      }
    } finally {
      setUser(null);
      if (typeof window !== "undefined") {
        localStorage.removeItem("auth_token");
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        backendConnected,
        login,
        logout,
        checkAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export function getRedirectPath(role: User["role"]): string {
  switch (role) {
    case "DONOR":
      return "/donor-dashboard";
    case "WORKER":
      return "/worker-dashboard";
    case "BTD":
      return "/admin-dashboard";
    default:
      return "/";
  }
}

export type { User };
