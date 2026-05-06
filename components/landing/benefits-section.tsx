"use client";

import { CheckCircle } from "lucide-react";

const benefitGroups = [
  {
    title: "For Blood Banks",
    subtitle: "Operational Excellence",
    benefits: [
      "Reduce administrative overhead by 60%",
      "Real-time inventory visibility across all blood types",
      "Automated compliance reporting and audit trails",
      "Streamlined donor-to-patient blood matching",
      "Predictive analytics for demand forecasting",
    ],
  },
  {
    title: "For Healthcare Workers",
    subtitle: "Enhanced Efficiency",
    benefits: [
      "Quick donor registration in under 2 minutes",
      "One-click blood test result recording",
      "Instant eligibility status updates",
      "Mobile-friendly interface for field operations",
      "Automated notification of critical results",
    ],
  },
  {
    title: "For Donors",
    subtitle: "Better Experience",
    benefits: [
      "Easy registration with multiple sign-up options",
      "Track your donation history anytime",
      "View your blood test results securely",
      "Receive reminders when eligible to donate again",
      "Direct communication with blood bank staff",
    ],
  },
];

export function BenefitsSection() {
  return (
    <section id="benefits" className="py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground text-balance">
            Benefits That Transform Your Operations
          </h2>
          <p className="mt-4 text-lg text-muted-foreground text-pretty">
            Whether you&apos;re managing a blood bank, working on the front lines, or
            donating blood, our system delivers real value.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {benefitGroups.map((group) => (
            <div
              key={group.title}
              className="relative p-8 rounded-2xl bg-card border border-border"
            >
              <div className="absolute top-0 left-8 -translate-y-1/2">
                <span className="inline-block px-4 py-1.5 rounded-full bg-primary text-primary-foreground text-sm font-medium">
                  {group.subtitle}
                </span>
              </div>
              <h3 className="text-xl font-semibold text-foreground mt-4 mb-6">
                {group.title}
              </h3>
              <ul className="space-y-4">
                {group.benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-muted-foreground text-sm leading-relaxed">
                      {benefit}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
