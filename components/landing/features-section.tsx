"use client";

import {
  Users,
  Droplet,
  TestTube,
  Shield,
  Bell,
  MessageSquare,
  ClipboardList,
  BarChart3,
} from "lucide-react";

const features = [
  {
    icon: Users,
    title: "Donor Management",
    description:
      "Complete donor profiles with medical history, eligibility tracking, and donation records. Multi-method registration via email, phone, or donor ID.",
  },
  {
    icon: Droplet,
    title: "Blood Inventory",
    description:
      "Real-time tracking of blood units by type with expiration alerts, status monitoring (available, reserved, expired), and critical stock warnings.",
  },
  {
    icon: TestTube,
    title: "Medical Testing",
    description:
      "Comprehensive blood screening for HIV, Hepatitis B/C, Malaria, and Syphilis. Record and track test results with automatic eligibility updates.",
  },
  {
    icon: Shield,
    title: "Role-Based Access",
    description:
      "Three distinct portals for Admins, Workers, and Donors. Each role has tailored dashboards and permissions for secure, efficient operations.",
  },
  {
    icon: Bell,
    title: "Smart Notifications",
    description:
      "Automated alerts for low inventory, test results, donation eligibility, and system events. Never miss critical updates.",
  },
  {
    icon: MessageSquare,
    title: "Communication Hub",
    description:
      "Built-in messaging between donors and staff. Direct communication for appointments, follow-ups, and support queries.",
  },
  {
    icon: ClipboardList,
    title: "Audit Logging",
    description:
      "Complete activity tracking for compliance and accountability. Every action is logged with timestamps and user information.",
  },
  {
    icon: BarChart3,
    title: "Analytics Dashboard",
    description:
      "Comprehensive statistics on donations, inventory levels, donor demographics, and operational efficiency.",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 lg:py-32 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground text-balance">
            Everything You Need to Manage Blood Donations
          </h2>
          <p className="mt-4 text-lg text-muted-foreground text-pretty">
            A complete suite of tools designed specifically for blood banks and
            donation centers to streamline operations and save more lives.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
