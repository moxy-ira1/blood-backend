"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Droplet, AlertCircle, Loader2, Phone, Mail, User, KeyRound } from "lucide-react";
import { authApi, ApiError, checkBackendConnection } from "@/lib/api";
import { useAuth, getRedirectPath } from "@/lib/auth-context";

type LoginTab = "donor" | "worker" | "btd";

interface FormState {
  isLoading: boolean;
  error: string;
  success: string;
}

export function LoginPage() {
  const router = useRouter();
  const { login, isAuthenticated, user } = useAuth();
  const [activeTab, setActiveTab] = useState<LoginTab>("donor");
  const [backendConnected, setBackendConnected] = useState<boolean | null>(null);

  // Donor form state
  const [donorFullName, setDonorFullName] = useState("");
  const [donorNationalId, setDonorNationalId] = useState("");
  const [donorForm, setDonorForm] = useState<FormState>({ isLoading: false, error: "", success: "" });

  // Worker form state
  const [workerPhone, setWorkerPhone] = useState("");
  const [workerOtp, setWorkerOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [workerForm, setWorkerForm] = useState<FormState>({ isLoading: false, error: "", success: "" });

  // BTD form state
  const [btdEmail, setBtdEmail] = useState("");
  const [btdPassword, setBtdPassword] = useState("");
  const [btdForm, setBtdForm] = useState<FormState>({ isLoading: false, error: "", success: "" });

  // Check backend connection on mount
  useEffect(() => {
    const checkConnection = async () => {
      const connected = await checkBackendConnection();
      setBackendConnected(connected);
    };
    checkConnection();
  }, []);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      router.push(getRedirectPath(user.role));
    }
  }, [isAuthenticated, user, router]);

  // Donor Login Handler
  const handleDonorLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setDonorForm({ isLoading: true, error: "", success: "" });

    if (!donorFullName.trim() || !donorNationalId.trim()) {
      setDonorForm({ isLoading: false, error: "Please fill in all fields", success: "" });
      return;
    }

    try {
      const response = await authApi.loginDonor({
        fullName: donorFullName.trim(),
        identifier: donorNationalId.trim(),
      });

      if (response.success && response.data) {
        login(response.data.user, response.data.token);
        setDonorForm({ isLoading: false, error: "", success: "Login successful" });
        router.push(getRedirectPath(response.data.user.role));
      }
    } catch (error) {
      const message = error instanceof ApiError ? error.message : "Login failed";
      setDonorForm({ isLoading: false, error: message, success: "" });
    }
  };

  // Worker Send OTP Handler
  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setWorkerForm({ isLoading: true, error: "", success: "" });

    if (!workerPhone.trim()) {
      setWorkerForm({ isLoading: false, error: "Please enter your phone number", success: "" });
      return;
    }

    try {
      const response = await authApi.sendOtp({ phone: workerPhone.trim() });

      if (response.success) {
        setOtpSent(true);
        setWorkerForm({ isLoading: false, error: "", success: "OTP sent successfully" });
      }
    } catch (error) {
      const message = error instanceof ApiError ? error.message : "Failed to send OTP";
      setWorkerForm({ isLoading: false, error: message, success: "" });
    }
  };

  // Worker Verify OTP Handler
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setWorkerForm({ isLoading: true, error: "", success: "" });

    if (!workerOtp.trim()) {
      setWorkerForm({ isLoading: false, error: "Please enter the OTP", success: "" });
      return;
    }

    try {
      const response = await authApi.verifyOtp({
        phone: workerPhone.trim(),
        otp: workerOtp.trim(),
      });

      if (response.success && response.data) {
        login(response.data.user, response.data.token);
        setWorkerForm({ isLoading: false, error: "", success: "Login successful" });
        router.push(getRedirectPath(response.data.user.role));
      }
    } catch (error) {
      const message = error instanceof ApiError ? error.message : "Invalid OTP";
      setWorkerForm({ isLoading: false, error: message, success: "" });
    }
  };

  // BTD Login Handler
  const handleBtdLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setBtdForm({ isLoading: true, error: "", success: "" });

    if (!btdEmail.trim() || !btdPassword.trim()) {
      setBtdForm({ isLoading: false, error: "Please fill in all fields", success: "" });
      return;
    }

    try {
      const response = await authApi.loginBtd({
        email: btdEmail.trim(),
        password: btdPassword,
      });

      if (response.success && response.data) {
        login(response.data.user, response.data.token);
        setBtdForm({ isLoading: false, error: "", success: "Login successful" });
        router.push(getRedirectPath(response.data.user.role));
      }
    } catch (error) {
      const message = error instanceof ApiError ? error.message : "Login failed";
      setBtdForm({ isLoading: false, error: message, success: "" });
    }
  };

  const tabs: { id: LoginTab; label: string; icon: React.ReactNode }[] = [
    { id: "donor", label: "Donor", icon: <Droplet className="h-4 w-4" /> },
    { id: "worker", label: "Worker", icon: <Phone className="h-4 w-4" /> },
    { id: "btd", label: "BTD Admin", icon: <KeyRound className="h-4 w-4" /> },
  ];

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="h-12 w-12 rounded-xl bg-primary flex items-center justify-center">
              <Droplet className="h-7 w-7 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold text-foreground">BloodBank</span>
          </Link>
          <p className="text-muted-foreground mt-2">Sign in to your account</p>
        </div>

        {/* Backend Connection Warning */}
        {backendConnected === false && (
          <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-lg flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-destructive">Cannot connect to backend</p>
              <p className="text-xs text-muted-foreground mt-1">
                Please check API URL or server status. Set NEXT_PUBLIC_API_URL in your environment.
              </p>
            </div>
          </div>
        )}

        {/* Login Card */}
        <div className="bg-card border border-border rounded-2xl shadow-lg overflow-hidden">
          {/* Tabs */}
          <div className="flex border-b border-border">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center gap-2 py-4 px-4 text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? "bg-primary/10 text-primary border-b-2 border-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>

          <div className="p-6">
            {/* Donor Login Form */}
            {activeTab === "donor" && (
              <form onSubmit={handleDonorLogin} className="space-y-4">
                <div>
                  <label htmlFor="donor-fullname" className="block text-sm font-medium text-foreground mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <input
                      id="donor-fullname"
                      type="text"
                      value={donorFullName}
                      onChange={(e) => setDonorFullName(e.target.value)}
                      placeholder="Enter your full name"
                      className="w-full pl-10 pr-4 py-3 bg-input border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                      disabled={donorForm.isLoading}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="donor-nationalid" className="block text-sm font-medium text-foreground mb-2">
                    National ID
                  </label>
                  <div className="relative">
                    <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <input
                      id="donor-nationalid"
                      type="text"
                      value={donorNationalId}
                      onChange={(e) => setDonorNationalId(e.target.value)}
                      placeholder="Enter your National ID"
                      className="w-full pl-10 pr-4 py-3 bg-input border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                      disabled={donorForm.isLoading}
                    />
                  </div>
                </div>

                {donorForm.error && (
                  <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-destructive" />
                    <span className="text-sm text-destructive">{donorForm.error}</span>
                  </div>
                )}

                {donorForm.success && (
                  <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                    <span className="text-sm text-green-500">{donorForm.success}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={donorForm.isLoading || backendConnected === false}
                  className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {donorForm.isLoading ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    "Sign In"
                  )}
                </button>

                <p className="text-center text-sm text-muted-foreground">
                  Don&apos;t have an account?{" "}
                  <Link href="/register" className="text-primary hover:underline font-medium">
                    Register as Donor
                  </Link>
                </p>
              </form>
            )}

            {/* Worker Login Form (OTP) */}
            {activeTab === "worker" && (
              <form onSubmit={otpSent ? handleVerifyOtp : handleSendOtp} className="space-y-4">
                <div>
                  <label htmlFor="worker-phone" className="block text-sm font-medium text-foreground mb-2">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <input
                      id="worker-phone"
                      type="tel"
                      value={workerPhone}
                      onChange={(e) => setWorkerPhone(e.target.value)}
                      placeholder="Enter your phone number"
                      className="w-full pl-10 pr-4 py-3 bg-input border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                      disabled={workerForm.isLoading || otpSent}
                    />
                  </div>
                </div>

                {otpSent && (
                  <div>
                    <label htmlFor="worker-otp" className="block text-sm font-medium text-foreground mb-2">
                      OTP Code
                    </label>
                    <input
                      id="worker-otp"
                      type="text"
                      value={workerOtp}
                      onChange={(e) => setWorkerOtp(e.target.value)}
                      placeholder="Enter 6-digit OTP"
                      maxLength={6}
                      className="w-full px-4 py-3 bg-input border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary text-center text-xl tracking-widest"
                      disabled={workerForm.isLoading}
                    />
                  </div>
                )}

                {workerForm.error && (
                  <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-destructive" />
                    <span className="text-sm text-destructive">{workerForm.error}</span>
                  </div>
                )}

                {workerForm.success && (
                  <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                    <span className="text-sm text-green-500">{workerForm.success}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={workerForm.isLoading || backendConnected === false}
                  className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {workerForm.isLoading ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      {otpSent ? "Verifying..." : "Sending OTP..."}
                    </>
                  ) : otpSent ? (
                    "Verify OTP"
                  ) : (
                    "Send OTP"
                  )}
                </button>

                {otpSent && (
                  <button
                    type="button"
                    onClick={() => {
                      setOtpSent(false);
                      setWorkerOtp("");
                      setWorkerForm({ isLoading: false, error: "", success: "" });
                    }}
                    className="w-full py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Change phone number
                  </button>
                )}

                <p className="text-center text-sm text-muted-foreground">
                  Workers are created by BTD administrators.
                </p>
              </form>
            )}

            {/* BTD Login Form */}
            {activeTab === "btd" && (
              <form onSubmit={handleBtdLogin} className="space-y-4">
                <div>
                  <label htmlFor="btd-email" className="block text-sm font-medium text-foreground mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <input
                      id="btd-email"
                      type="email"
                      value={btdEmail}
                      onChange={(e) => setBtdEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="w-full pl-10 pr-4 py-3 bg-input border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                      disabled={btdForm.isLoading}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="btd-password" className="block text-sm font-medium text-foreground mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <input
                      id="btd-password"
                      type="password"
                      value={btdPassword}
                      onChange={(e) => setBtdPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="w-full pl-10 pr-4 py-3 bg-input border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                      disabled={btdForm.isLoading}
                    />
                  </div>
                </div>

                {btdForm.error && (
                  <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-destructive" />
                    <span className="text-sm text-destructive">{btdForm.error}</span>
                  </div>
                )}

                {btdForm.success && (
                  <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                    <span className="text-sm text-green-500">{btdForm.success}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={btdForm.isLoading || backendConnected === false}
                  className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {btdForm.isLoading ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    "Sign In"
                  )}
                </button>

                <p className="text-center text-sm text-muted-foreground">
                  BTD credentials are pre-configured in the system.
                </p>
              </form>
            )}
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-muted-foreground mt-6">
          By signing in, you agree to our{" "}
          <Link href="/terms" className="text-primary hover:underline">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="text-primary hover:underline">
            Privacy Policy
          </Link>
        </p>
      </div>
    </div>
  );
}
