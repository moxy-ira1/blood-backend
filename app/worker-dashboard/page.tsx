"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { Loader2 } from "lucide-react";

export default function WorkerDashboard() {
  const { user, isLoading, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        router.push("/login");
      } else if (user?.role !== "WORKER") {
        // Redirect to correct dashboard based on role
        if (user?.role === "DONOR") {
          router.push("/donor-dashboard");
        } else if (user?.role === "BTD") {
          router.push("/admin-dashboard");
        }
      }
    }
  }, [isLoading, isAuthenticated, user, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAuthenticated || user?.role !== "WORKER") {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-foreground">Worker Dashboard</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">Welcome, {user?.fullName}</span>
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {/* Today's Donations Card */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h2 className="text-lg font-semibold text-foreground mb-2">Today&apos;s Donations</h2>
            <p className="text-3xl font-bold text-primary">0</p>
            <p className="text-sm text-muted-foreground">donations recorded</p>
          </div>

          {/* Pending Tests Card */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h2 className="text-lg font-semibold text-foreground mb-2">Pending Tests</h2>
            <p className="text-3xl font-bold text-amber-500">0</p>
            <p className="text-sm text-muted-foreground">awaiting results</p>
          </div>

          {/* Eligible Donors Card */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h2 className="text-lg font-semibold text-foreground mb-2">Eligible Donors</h2>
            <p className="text-3xl font-bold text-green-500">0</p>
            <p className="text-sm text-muted-foreground">ready to donate</p>
          </div>

          {/* Blood Units Card */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h2 className="text-lg font-semibold text-foreground mb-2">Blood Units</h2>
            <p className="text-3xl font-bold text-foreground">0</p>
            <p className="text-sm text-muted-foreground">in inventory</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h2>
          <div className="flex flex-wrap gap-4">
            <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
              Record Donation
            </button>
            <button className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors">
              Enter Test Results
            </button>
            <button className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors">
              Search Donors
            </button>
            <button className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors">
              View Inventory
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
