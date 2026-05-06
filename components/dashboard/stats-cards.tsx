"use client"

import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import {
  Users,
  Droplets,
  ClipboardList,
  UserCog,
  TestTube,
  Calendar,
  CheckCircle,
  Clock,
} from "lucide-react"

interface StatCardProps {
  title: string
  value: string | number
  icon: React.ReactNode
  description?: string
  trend?: {
    value: number
    isPositive: boolean
  }
  className?: string
}

function StatCard({ title, value, icon, description, trend, className }: StatCardProps) {
  return (
    <Card className={cn("bg-card border-border", className)}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-3xl font-bold text-card-foreground">{value}</p>
            {description && (
              <p className="text-xs text-muted-foreground">{description}</p>
            )}
            {trend && (
              <p
                className={cn(
                  "text-xs font-medium",
                  trend.isPositive ? "text-success" : "text-destructive"
                )}
              >
                {trend.isPositive ? "+" : "-"}{trend.value}% from last month
              </p>
            )}
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function AdminStatsCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="Total Donors"
        value="1,247"
        icon={<Users className="h-6 w-6 text-primary" />}
        trend={{ value: 12, isPositive: true }}
      />
      <StatCard
        title="Total Donations"
        value="3,842"
        icon={<ClipboardList className="h-6 w-6 text-primary" />}
        trend={{ value: 8, isPositive: true }}
      />
      <StatCard
        title="Blood Units"
        value="171"
        icon={<Droplets className="h-6 w-6 text-primary" />}
        description="Total units in stock"
      />
      <StatCard
        title="Active Workers"
        value="28"
        icon={<UserCog className="h-6 w-6 text-primary" />}
        description="Across all shifts"
      />
    </div>
  )
}

export function WorkerStatsCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="Today&apos;s Donations"
        value="8"
        icon={<Droplets className="h-6 w-6 text-primary" />}
        description="Completed today"
      />
      <StatCard
        title="Pending Tests"
        value="5"
        icon={<TestTube className="h-6 w-6 text-chart-4" />}
        description="Awaiting results"
      />
      <StatCard
        title="Eligible Donors"
        value="342"
        icon={<CheckCircle className="h-6 w-6 text-success" />}
        description="Ready to donate"
      />
      <StatCard
        title="Scheduled"
        value="15"
        icon={<Calendar className="h-6 w-6 text-chart-3" />}
        description="Appointments today"
      />
    </div>
  )
}

export function DonorStatsCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <StatCard
        title="Total Donations"
        value="12"
        icon={<Droplets className="h-6 w-6 text-primary" />}
        description="Lifetime contributions"
      />
      <StatCard
        title="Last Donation"
        value="Jan 15"
        icon={<Calendar className="h-6 w-6 text-chart-3" />}
        description="2024"
      />
      <StatCard
        title="Next Eligible"
        value="Apr 15"
        icon={<Clock className="h-6 w-6 text-chart-4" />}
        description="2024"
      />
    </div>
  )
}
