"use client";

import { UserPlus, Droplet, TestTube, Heart } from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    step: "01",
    title: "Register Donors",
    description:
      "Donors can self-register or be added by staff through multiple authentication methods. Capture complete medical history and contact information.",
  },
  {
    icon: Droplet,
    step: "02",
    title: "Record Donations",
    description:
      "Workers record each donation with details including blood type, volume collected, and collection date. Automatic inventory updates.",
  },
  {
    icon: TestTube,
    step: "03",
    title: "Conduct Testing",
    description:
      "Perform mandatory blood safety tests for HIV, Hepatitis, Malaria, and Syphilis. Results automatically update donor eligibility status.",
  },
  {
    icon: Heart,
    step: "04",
    title: "Save Lives",
    description:
      "Safe, tested blood units are added to inventory, ready for hospitals and patients who need them most. Track distribution and usage.",
  },
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-20 lg:py-32 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground text-balance">
            How BloodBank Works
          </h2>
          <p className="mt-4 text-lg text-muted-foreground text-pretty">
            A streamlined workflow from donor registration to life-saving
            transfusions.
          </p>
        </div>

        <div className="relative">
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-border -translate-y-1/2" />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((item, index) => (
              <div key={item.title} className="relative">
                <div className="flex flex-col items-center text-center">
                  <div className="relative z-10 w-20 h-20 rounded-full bg-card border-2 border-primary flex items-center justify-center mb-6">
                    <item.icon className="w-8 h-8 text-primary" />
                    <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center">
                      {item.step}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
