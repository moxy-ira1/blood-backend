"use client";

const stats = [
  {
    value: "500+",
    label: "Blood Banks",
    description: "Organizations trust our platform worldwide",
  },
  {
    value: "2M+",
    label: "Donations Tracked",
    description: "Blood donations processed through our system",
  },
  {
    value: "99.9%",
    label: "Uptime",
    description: "Reliable platform when you need it most",
  },
  {
    value: "4.9/5",
    label: "User Rating",
    description: "Based on feedback from healthcare professionals",
  },
];

const bloodTypeStats = [
  { type: "O+", percentage: 37, description: "Most common, universal donor for platelets" },
  { type: "A+", percentage: 36, description: "Second most common blood type" },
  { type: "B+", percentage: 9, description: "Important for B+ and AB+ recipients" },
  { type: "O-", percentage: 7, description: "Universal red cell donor" },
  { type: "A-", percentage: 6, description: "Universal platelet donor with CMV-" },
  { type: "AB+", percentage: 3, description: "Universal plasma donor" },
  { type: "B-", percentage: 1.5, description: "Rare but crucial for emergencies" },
  { type: "AB-", percentage: 0.5, description: "Rarest blood type" },
];

export function StatisticsSection() {
  return (
    <section id="statistics" className="py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground text-balance">
            Making an Impact in Blood Donation
          </h2>
          <p className="mt-4 text-lg text-muted-foreground text-pretty">
            Our platform powers blood banks across the globe, helping save millions of lives.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="p-6 rounded-xl bg-card border border-border text-center"
            >
              <div className="text-4xl lg:text-5xl font-bold text-primary mb-2">
                {stat.value}
              </div>
              <div className="text-lg font-semibold text-foreground mb-1">
                {stat.label}
              </div>
              <div className="text-sm text-muted-foreground">
                {stat.description}
              </div>
            </div>
          ))}
        </div>

        <div className="bg-card rounded-2xl border border-border p-8 lg:p-12">
          <h3 className="text-2xl font-semibold text-foreground mb-8 text-center">
            Blood Type Distribution We Track
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {bloodTypeStats.map((blood) => (
              <div key={blood.type} className="relative">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl font-bold text-foreground">
                    {blood.type}
                  </span>
                  <span className="text-lg font-semibold text-primary">
                    {blood.percentage}%
                  </span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden mb-2">
                  <div
                    className="h-full bg-primary rounded-full transition-all duration-1000"
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
      </div>
    </section>
  );
}
