"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { Loader2 } from "lucide-react";

export default function AdminDashboard() {
  const { user, isLoading, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        router.push("/login");
      } else if (user?.role !== "BTD") {
        // Redirect to correct dashboard based on role
        if (user?.role === "DONOR") {
          router.push("/donor-dashboard");
        } else if (user?.role === "WORKER") {
          router.push("/worker-dashboard");
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

  if (!isAuthenticated || user?.role !== "BTD") {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-foreground">BTD Admin Dashboard</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">Welcome, {user?.fullName}</span>
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {/* Total Donors Card */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h2 className="text-lg font-semibold text-foreground mb-2">Total Donors</h2>
            <p className="text-3xl font-bold text-primary">0</p>
            <p className="text-sm text-muted-foreground">registered donors</p>
          </div>

          {/* Total Workers Card */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h2 className="text-lg font-semibold text-foreground mb-2">Total Workers</h2>
            <p className="text-3xl font-bold text-foreground">0</p>
            <p className="text-sm text-muted-foreground">active workers</p>
          </div>

          {/* Monthly Donations Card */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h2 className="text-lg font-semibold text-foreground mb-2">Monthly Donations</h2>
            <p className="text-3xl font-bold text-green-500">0</p>
            <p className="text-sm text-muted-foreground">this month</p>
          </div>

          {/* Blood Inventory Card */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h2 className="text-lg font-semibold text-foreground mb-2">Blood Inventory</h2>
            <p className="text-3xl font-bold text-amber-500">0</p>
            <p className="text-sm text-muted-foreground">total units</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h2>
          <div className="flex flex-wrap gap-4">
            <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
              Add Worker
            </button>
            <button className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors">
              Manage Donors
            </button>
            <button className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors">
              View Reports
            </button>
            <button className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors">
              Audit Logs
            </button>
          </div>
        </div>

        {/* Worker Management Section */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold text-foreground mb-4">Worker Management</h2>
          <div className="bg-card border border-border rounded-xl p-6">
            <p className="text-muted-foreground">No workers registered yet. Click &quot;Add Worker&quot; to create a new worker account.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
