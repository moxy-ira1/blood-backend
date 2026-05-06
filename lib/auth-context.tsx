"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

export type UserRole = "admin" | "worker" | "donor"

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  avatar?: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Mock users for demo
const mockUsers: Record<string, User> = {
  "admin@bloodbank.com": {
    id: "1",
    name: "Dr. Sarah Johnson",
    email: "admin@bloodbank.com",
    role: "admin",
  },
  "worker@bloodbank.com": {
    id: "2",
    name: "James Wilson",
    email: "worker@bloodbank.com",
    role: "worker",
  },
  "donor@bloodbank.com": {
    id: "3",
    name: "Emily Chen",
    email: "donor@bloodbank.com",
    role: "donor",
  },
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  const login = async (email: string, _password: string) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500))
    const foundUser = mockUsers[email.toLowerCase()]
    if (foundUser) {
      setUser(foundUser)
    } else {
      throw new Error("Invalid credentials")
    }
  }

  const logout = () => {
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
