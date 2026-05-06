"use client";

import { AuthProvider, useAuth } from "@/lib/auth-context";
import { LoginPage } from "@/components/auth/login-page";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function LoginContent() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, router]);

  return <LoginPage />;
}

export default function Login() {
  return (
    <AuthProvider>
      <LoginContent />
    </AuthProvider>
  );
}
