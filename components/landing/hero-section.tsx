"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-8">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            Trusted by 500+ Blood Banks Worldwide
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground text-balance">
            Modern Blood Donation
            <br />
            <span className="text-primary">Management System</span>
          </h1>

          <p className="mt-6 text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto text-pretty leading-relaxed">
            Streamline your blood donation operations with our comprehensive platform. 
            Track donors, manage inventory, ensure blood safety, and save more lives.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/login">
              <Button size="lg" className="w-full sm:w-auto gap-2 text-base px-8">
                Get Started Free
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto gap-2 text-base px-8"
            >
              <Play className="w-4 h-4" />
              Watch Demo
            </Button>
          </div>

          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 pt-8 border-t border-border">
            {[
              { value: "50K+", label: "Donors Registered" },
              { value: "120K+", label: "Donations Processed" },
              { value: "99.9%", label: "Blood Safety Rate" },
              { value: "24/7", label: "System Availability" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl lg:text-3xl font-bold text-foreground">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20 relative">
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10 pointer-events-none" />
          <div className="relative rounded-xl border border-border bg-card overflow-hidden shadow-2xl">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-muted/50">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-destructive/60" />
                <div className="w-3 h-3 rounded-full bg-warning/60" />
                <div className="w-3 h-3 rounded-full bg-success/60" />
              </div>
              <div className="flex-1 flex justify-center">
                <div className="px-4 py-1 rounded bg-muted text-xs text-muted-foreground">
                  dashboard.bloodbank.com
                </div>
              </div>
            </div>
            <div className="p-6 bg-card">
              <div className="grid grid-cols-4 gap-4 mb-6">
                {[
                  { label: "Total Donors", value: "12,847", color: "bg-primary/20 text-primary" },
                  { label: "Blood Units", value: "3,256", color: "bg-success/20 text-success" },
                  { label: "Pending Tests", value: "45", color: "bg-warning/20 text-warning" },
                  { label: "Critical Stock", value: "2", color: "bg-destructive/20 text-destructive" },
                ].map((card) => (
                  <div
                    key={card.label}
                    className={`p-4 rounded-lg ${card.color.split(" ")[0]} border border-border`}
                  >
                    <div className="text-xs text-muted-foreground">{card.label}</div>
                    <div className={`text-2xl font-bold mt-1 ${card.color.split(" ")[1]}`}>
                      {card.value}
                    </div>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2 bg-muted/30 rounded-lg p-4 h-32 border border-border">
                  <div className="text-sm font-medium mb-2">Blood Inventory Overview</div>
                  <div className="flex items-end gap-2 h-20">
                    {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map((type, i) => (
                      <div key={type} className="flex-1 flex flex-col items-center gap-1">
                        <div
                          className="w-full bg-primary/60 rounded-t"
                          style={{ height: `${Math.random() * 60 + 20}%` }}
                        />
                        <span className="text-[10px] text-muted-foreground">{type}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-muted/30 rounded-lg p-4 h-32 border border-border">
                  <div className="text-sm font-medium mb-2">Recent Activity</div>
                  <div className="space-y-2">
                    {[
                      "New donation recorded",
                      "Test results updated",
                      "Donor registered",
                    ].map((activity, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-muted-foreground">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                        {activity}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
