"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap } from "lucide-react";

export function CTASection() {
  return (
    <section className="py-20 lg:py-32 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-primary p-8 lg:p-16">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary via-primary to-primary/80" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-left max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 text-white/90 text-sm font-medium mb-6">
                <Zap className="w-4 h-4" />
                Get Started in Minutes
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-white text-balance">
                Ready to Transform Your Blood Bank Operations?
              </h2>
              <p className="mt-4 text-lg text-white/80 text-pretty">
                Join hundreds of blood banks already using BloodBank to save more
                lives. Start your free trial today with no commitment.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/login">
                <Button
                  size="lg"
                  variant="secondary"
                  className="w-full sm:w-auto gap-2 text-base px-8 bg-white text-primary hover:bg-white/90"
                >
                  Start Free Trial
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto text-base px-8 border-white/30 text-white hover:bg-white/10"
              >
                Contact Sales
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
