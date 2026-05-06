"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AuthProvider, useAuth } from "@/lib/auth-context";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import {
  AdminStatsCards,
  WorkerStatsCards,
  DonorStatsCards,
} from "@/components/dashboard/stats-cards";
import { DonorTable } from "@/components/dashboard/donor-table";
import {
  InventoryTable,
  InventoryOverview,
} from "@/components/dashboard/inventory-table";
import { DonationsTable } from "@/components/dashboard/donations-table";
import { BloodTestTable } from "@/components/dashboard/blood-test-form";
import {
  NotificationsList,
  NotificationsWidget,
} from "@/components/dashboard/notifications-list";
import { ChatUI, ChatList } from "@/components/dashboard/chat-ui";
import { WorkersTable } from "@/components/dashboard/workers-table";
import { AuditLogs } from "@/components/dashboard/audit-logs";
import {
  DonationHistory,
  DonationSummary,
} from "@/components/dashboard/donation-history";
import { DonorTestResults } from "@/components/dashboard/donor-test-results";
import {
  EligibilityBadge,
  EligibilityBadgeLarge,
} from "@/components/dashboard/eligibility-badge";
import { DonationFormCard } from "@/components/dashboard/donation-form";

function DashboardContent() {
  const { user, isAuthenticated } = useAuth();
  const [currentPage, setCurrentPage] = useState("dashboard");
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  const renderPage = () => {
    switch (currentPage) {
      case "dashboard":
        return renderDashboard();
      case "donors":
        return <DonorTable />;
      case "workers":
        return <WorkersTable />;
      case "inventory":
        return (
          <div className="space-y-6">
            <InventoryOverview />
            <InventoryTable />
          </div>
        );
      case "donations":
        return <DonationsTable />;
      case "tests":
        return <BloodTestTable />;
      case "audit":
        return <AuditLogs />;
      case "notifications":
        return <NotificationsList />;
      case "messages":
        return (
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <ChatList />
            </div>
            <div className="lg:col-span-2">
              <ChatUI />
            </div>
          </div>
        );
      case "history":
        return (
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <DonationHistory />
            </div>
            <div className="lg:col-span-1">
              <DonationSummary />
            </div>
          </div>
        );
      case "results":
        return <DonorTestResults />;
      default:
        return renderDashboard();
    }
  };

  const renderDashboard = () => {
    switch (user.role) {
      case "admin":
        return (
          <div className="space-y-6">
            <AdminStatsCards />
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <InventoryTable />
              </div>
              <div className="lg:col-span-1 space-y-6">
                <InventoryOverview />
              </div>
            </div>
            <DonorTable />
          </div>
        );
      case "worker":
        return (
          <div className="space-y-6">
            <WorkerStatsCards />
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <BloodTestTable />
              </div>
              <div className="lg:col-span-1 space-y-6">
                <DonationFormCard />
                <NotificationsWidget />
              </div>
            </div>
            <DonorTable />
          </div>
        );
      case "donor":
        return (
          <div className="space-y-6">
            <EligibilityBadgeLarge isEligible={true} />
            <DonorStatsCards />
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <DonationHistory />
                <DonorTestResults />
              </div>
              <div className="lg:col-span-1 space-y-6">
                <EligibilityBadge
                  isEligible={true}
                  lastDonation="January 15, 2024"
                  nextEligibleDate="April 15, 2024"
                />
                <NotificationsWidget />
                <ChatList />
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <DashboardLayout currentPage={currentPage} onNavigate={setCurrentPage}>
      {renderPage()}
    </DashboardLayout>
  );
}

export default function DashboardPage() {
  return (
    <AuthProvider>
      <DashboardContent />
    </AuthProvider>
  );
}
