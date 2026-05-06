"use client";

import { useEffect, useState, useRef } from "react";
import { Heart, Users, Building2, Clock, TrendingUp, Globe, Shield, Activity } from "lucide-react";

const mainStats = [
  {
    value: 500,
    suffix: "+",
    label: "Blood Banks",
    description: "Healthcare facilities trust our platform",
    icon: Building2,
  },
  {
    value: 2,
    suffix: "M+",
    label: "Donations Tracked",
    description: "Blood donations processed safely",
    icon: Heart,
  },
  {
    value: 150,
    suffix: "K+",
    label: "Active Donors",
    description: "Registered donors in our network",
    icon: Users,
  },
  {
    value: 99.9,
    suffix: "%",
    label: "Uptime",
    description: "Reliable when you need it most",
    icon: Clock,
  },
];

const impactStats = [
  { value: 6, suffix: "M+", label: "Lives Saved", description: "Through safe blood transfusions" },
  { value: 45, suffix: "+", label: "Countries", description: "Using our platform globally" },
  { value: 24, suffix: "/7", label: "Support", description: "Round-the-clock assistance" },
  { value: 4.9, suffix: "/5", label: "Rating", description: "From healthcare professionals" },
];

const bloodTypeStats = [
  { type: "O+", percentage: 37, donors: "55,500", description: "Universal donor for platelets" },
  { type: "A+", percentage: 36, donors: "54,000", description: "Second most common type" },
  { type: "B+", percentage: 9, donors: "13,500", description: "Important for B+ and AB+" },
  { type: "O-", percentage: 7, donors: "10,500", description: "Universal red cell donor" },
  { type: "A-", percentage: 6, donors: "9,000", description: "Universal platelet donor" },
  { type: "AB+", percentage: 3, donors: "4,500", description: "Universal plasma donor" },
  { type: "B-", percentage: 1.5, donors: "2,250", description: "Rare but crucial" },
  { type: "AB-", percentage: 0.5, donors: "750", description: "Rarest blood type" },
];

const donationTrends = [
  { month: "Jan", donations: 12500 },
  { month: "Feb", donations: 14200 },
  { month: "Mar", donations: 15800 },
  { month: "Apr", donations: 13900 },
  { month: "May", donations: 16500 },
  { month: "Jun", donations: 18200 },
  { month: "Jul", donations: 17100 },
  { month: "Aug", donations: 19500 },
  { month: "Sep", donations: 21000 },
  { month: "Oct", donations: 22800 },
  { month: "Nov", donations: 24500 },
  { month: "Dec", donations: 26000 },
];

function AnimatedCounter({ 
  end, 
  duration = 2000, 
  suffix = "" 
}: { 
  end: number; 
  duration?: number; 
  suffix?: string;
}) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number;
    const startValue = 0;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentValue = startValue + (end - startValue) * easeOutQuart;
      
      setCount(currentValue);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, end, duration]);

  const displayValue = Number.isInteger(end) ? Math.floor(count) : count.toFixed(1);

  return (
    <div ref={ref} className="text-4xl lg:text-5xl font-bold text-primary">
      {displayValue}{suffix}
    </div>
  );
}

export function StatisticsSection() {
  const maxDonations = Math.max(...donationTrends.map(d => d.donations));

  return (
    <section id="statistics" className="py-20 lg:py-32 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
            <Activity className="w-4 h-4" />
            Platform Statistics
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground text-balance">
            Making a Global Impact in Blood Donation
          </h2>
          <p className="mt-4 text-lg text-muted-foreground text-pretty">
            Our platform powers blood banks across the globe, helping healthcare providers save millions of lives through efficient blood management.
          </p>
        </div>

        {/* Main Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {mainStats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="p-6 rounded-xl bg-card border border-border text-center group hover:border-primary/50 transition-colors"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                <div className="text-lg font-semibold text-foreground mt-2 mb-1">
                  {stat.label}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.description}
                </div>
              </div>
            );
          })}
        </div>

        {/* Impact Stats */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {impactStats.map((stat) => (
            <div
              key={stat.label}
              className="p-5 rounded-lg bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20"
            >
              <div className="flex items-baseline gap-1">
                <AnimatedCounter end={stat.value} suffix={stat.suffix} duration={1500} />
              </div>
              <div className="text-sm font-medium text-foreground mt-1">{stat.label}</div>
              <div className="text-xs text-muted-foreground">{stat.description}</div>
            </div>
          ))}
        </div>

        {/* Donation Trends Chart */}
        <div className="bg-card rounded-2xl border border-border p-8 lg:p-10 mb-16">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
            <div>
              <h3 className="text-2xl font-semibold text-foreground flex items-center gap-2">
                <TrendingUp className="w-6 h-6 text-primary" />
                Monthly Donation Trends
              </h3>
              <p className="text-muted-foreground mt-1">Tracking donation growth over the past year</p>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-primary" />
                <span className="text-sm text-muted-foreground">Donations</span>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-foreground">+108%</div>
                <div className="text-xs text-success">Year over year growth</div>
              </div>
            </div>
          </div>
          
          <div className="relative h-64">
            <div className="absolute inset-0 flex items-end gap-2">
              {donationTrends.map((data, index) => (
                <div key={data.month} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full relative group">
                    <div
                      className="w-full bg-primary/20 hover:bg-primary/30 rounded-t transition-all duration-300 cursor-pointer"
                      style={{ height: `${(data.donations / maxDonations) * 200}px` }}
                    >
                      <div
                        className="absolute bottom-0 w-full bg-primary rounded-t transition-all duration-500"
                        style={{ 
                          height: `${(data.donations / maxDonations) * 200}px`,
                          opacity: 0.8
                        }}
                      />
                    </div>
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-foreground text-background px-2 py-1 rounded text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      {data.donations.toLocaleString()} donations
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground">{data.month}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Blood Type Distribution */}
        <div className="bg-card rounded-2xl border border-border p-8 lg:p-10 mb-16">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
            <div>
              <h3 className="text-2xl font-semibold text-foreground">
                Blood Type Distribution
              </h3>
              <p className="text-muted-foreground mt-1">Active donors by blood type in our network</p>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Globe className="w-4 h-4 text-primary" />
              <span className="text-muted-foreground">Global Network Data</span>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {bloodTypeStats.map((blood) => (
              <div key={blood.type} className="relative p-4 rounded-lg bg-muted/50 border border-border hover:border-primary/30 transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                      <span className="text-sm font-bold text-primary">{blood.type}</span>
                    </div>
                    <div>
                      <div className="text-lg font-semibold text-foreground">{blood.donors}</div>
                      <div className="text-xs text-muted-foreground">donors</div>
                    </div>
                  </div>
                  <span className="text-xl font-bold text-primary">
                    {blood.percentage}%
                  </span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden mb-2">
                  <div
                    className="h-full bg-gradient-to-r from-primary to-primary/60 rounded-full transition-all duration-1000"
                    style={{ width: `${blood.percentage * 2.5}%` }}
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  {blood.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Real-time Stats Banner */}
        <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 rounded-2xl border border-primary/20 p-8 lg:p-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                <span className="text-sm font-medium text-success">Live Platform Status</span>
              </div>
              <h3 className="text-2xl lg:text-3xl font-bold text-foreground">
                Trusted by Healthcare Professionals
              </h3>
              <p className="text-muted-foreground mt-2 max-w-xl">
                Our platform maintains the highest standards of reliability and security, ensuring blood banks can operate without interruption.
              </p>
            </div>
            
            <div className="grid grid-cols-3 gap-6 lg:gap-10">
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Shield className="w-5 h-5 text-success" />
                </div>
                <div className="text-2xl font-bold text-foreground">100%</div>
                <div className="text-xs text-muted-foreground">Data Security</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <div className="text-2xl font-bold text-foreground">{"<"}1s</div>
                <div className="text-xs text-muted-foreground">Response Time</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Activity className="w-5 h-5 text-warning" />
                </div>
                <div className="text-2xl font-bold text-foreground">99.99%</div>
                <div className="text-xs text-muted-foreground">Availability</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
