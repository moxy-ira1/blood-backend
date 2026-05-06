"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Droplet, AlertCircle, Loader2, User, KeyRound, Mail, Phone, CheckCircle } from "lucide-react";
import { authApi, ApiError, checkBackendConnection } from "@/lib/api";
import { useAuth, getRedirectPath } from "@/lib/auth-context";

export function RegisterPage() {
  const router = useRouter();
  const { login, isAuthenticated, user } = useAuth();
  const [backendConnected, setBackendConnected] = useState<boolean | null>(null);

  // Form state
  const [fullName, setFullName] = useState("");
  const [nationalId, setNationalId] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  // UI state
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Validation
    if (!fullName.trim()) {
      setError("Full name is required");
      setIsLoading(false);
      return;
    }

    if (!nationalId.trim()) {
      setError("National ID is required");
      setIsLoading(false);
      return;
    }

    try {
      const response = await authApi.registerDonor({
        fullName: fullName.trim(),
        identifier: nationalId.trim(),
        email: email.trim() || undefined,
        phone: phone.trim() || undefined,
      });

      if (response.success && response.data) {
        setSuccess(true);
        login(response.data.user, response.data.token);
        
        // Redirect after short delay to show success message
        setTimeout(() => {
          router.push(getRedirectPath(response.data!.user.role));
        }, 1500);
      }
    } catch (err) {
      const message = err instanceof ApiError ? err.message : "Registration failed";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="w-full max-w-md text-center">
          <div className="h-20 w-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-10 w-10 text-green-500" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">Registration Successful</h1>
          <p className="text-muted-foreground mb-6">
            Your donor account has been created. Redirecting to your dashboard...
          </p>
          <Loader2 className="h-6 w-6 animate-spin text-primary mx-auto" />
        </div>
      </div>
    );
  }

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
          <h1 className="text-xl font-semibold text-foreground mt-4">Register as Donor</h1>
          <p className="text-muted-foreground mt-1">Create your donor account to start saving lives</p>
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

        {/* Registration Card */}
        <div className="bg-card border border-border rounded-2xl shadow-lg overflow-hidden">
          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name - Required */}
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-foreground mb-2">
                  Full Name <span className="text-destructive">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <input
                    id="fullName"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full pl-10 pr-4 py-3 bg-input border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                    disabled={isLoading}
                    required
                  />
                </div>
              </div>

              {/* National ID - Required */}
              <div>
                <label htmlFor="nationalId" className="block text-sm font-medium text-foreground mb-2">
                  National ID <span className="text-destructive">*</span>
                </label>
                <div className="relative">
                  <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <input
                    id="nationalId"
                    type="text"
                    value={nationalId}
                    onChange={(e) => setNationalId(e.target.value)}
                    placeholder="Enter your National ID"
                    className="w-full pl-10 pr-4 py-3 bg-input border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                    disabled={isLoading}
                    required
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  This will be used as your login identifier
                </p>
              </div>

              {/* Email - Optional */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                  Email Address <span className="text-muted-foreground text-xs">(Optional)</span>
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full pl-10 pr-4 py-3 bg-input border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                    disabled={isLoading}
                  />
                </div>
              </div>

              {/* Phone - Optional */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                  Phone Number <span className="text-muted-foreground text-xs">(Optional)</span>
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Enter your phone number"
                    className="w-full pl-10 pr-4 py-3 bg-input border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                    disabled={isLoading}
                  />
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-destructive shrink-0" />
                  <span className="text-sm text-destructive">{error}</span>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading || backendConnected === false}
                className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Creating account...
                  </>
                ) : (
                  "Create Donor Account"
                )}
              </button>

              {/* Login Link */}
              <p className="text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link href="/login" className="text-primary hover:underline font-medium">
                  Sign in
                </Link>
              </p>
            </form>
          </div>
        </div>

        {/* Info Box */}
        <div className="mt-6 p-4 bg-muted/30 border border-border rounded-lg">
          <h3 className="text-sm font-medium text-foreground mb-2">Important Information</h3>
          <ul className="text-xs text-muted-foreground space-y-1">
            <li>Only donors can self-register through this form</li>
            <li>Workers are created by BTD administrators</li>
            <li>Your National ID will be verified during your first donation</li>
          </ul>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-muted-foreground mt-6">
          By registering, you agree to our{" "}
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
