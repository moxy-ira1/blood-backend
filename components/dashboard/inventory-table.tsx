"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { bloodInventory, type BloodInventory } from "@/lib/mock-data"
import { Droplets } from "lucide-react"

export function InventoryTable() {
  const statusColors: Record<BloodInventory["status"], string> = {
    critical: "bg-destructive/20 text-destructive",
    low: "bg-warning/20 text-warning-foreground",
    adequate: "bg-chart-2/20 text-chart-2",
    surplus: "bg-success/20 text-success",
  }

  const getProgressValue = (units: number): number => {
    const maxUnits = 60
    return Math.min((units / maxUnits) * 100, 100)
  }

  const getProgressColor = (status: BloodInventory["status"]): string => {
    switch (status) {
      case "critical":
        return "bg-destructive"
      case "low":
        return "bg-warning"
      case "adequate":
        return "bg-chart-2"
      case "surplus":
        return "bg-success"
      default:
        return "bg-primary"
    }
  }

  return (
    <Card className="bg-card border-border">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="flex items-center gap-2 text-card-foreground">
          <Droplets className="h-5 w-5 text-primary" />
          Blood Inventory
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-lg border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent">
                <TableHead className="text-muted-foreground">Blood Type</TableHead>
                <TableHead className="text-muted-foreground">Units</TableHead>
                <TableHead className="text-muted-foreground hidden md:table-cell">Stock Level</TableHead>
                <TableHead className="text-muted-foreground">Status</TableHead>
                <TableHead className="text-muted-foreground hidden lg:table-cell">Last Updated</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bloodInventory.map((item) => (
                <TableRow key={item.bloodType} className="border-border">
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                        <span className="text-sm font-bold text-primary">{item.bloodType}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="font-semibold text-card-foreground">{item.units}</span>
                    <span className="text-muted-foreground"> units</span>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <div className="w-32">
                      <Progress
                        value={getProgressValue(item.units)}
                        className="h-2 bg-muted"
                      />
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className={statusColors[item.status]}>
                      {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell text-muted-foreground">
                    {item.lastUpdated}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}

export function InventoryOverview() {
  const criticalItems = bloodInventory.filter((item) => item.status === "critical")
  const lowItems = bloodInventory.filter((item) => item.status === "low")

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-card-foreground">Inventory Overview</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {bloodInventory.map((item) => (
            <div
              key={item.bloodType}
              className="flex flex-col items-center justify-center p-4 rounded-lg bg-secondary/50 border border-border"
            >
              <span className="text-2xl font-bold text-primary">{item.bloodType}</span>
              <span className="text-xl font-semibold text-card-foreground">{item.units}</span>
              <span className="text-xs text-muted-foreground">units</span>
            </div>
          ))}
        </div>

        {(criticalItems.length > 0 || lowItems.length > 0) && (
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-card-foreground">Alerts</h4>
            {criticalItems.map((item) => (
              <div
                key={item.bloodType}
                className="flex items-center gap-3 p-3 rounded-lg bg-destructive/10 border border-destructive/20"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-destructive/20">
                  <Droplets className="h-4 w-4 text-destructive" />
                </div>
                <div>
                  <p className="text-sm font-medium text-destructive">
                    Critical: {item.bloodType} blood type
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Only {item.units} units remaining
                  </p>
                </div>
              </div>
            ))}
            {lowItems.map((item) => (
              <div
                key={item.bloodType}
                className="flex items-center gap-3 p-3 rounded-lg bg-warning/10 border border-warning/20"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-warning/20">
                  <Droplets className="h-4 w-4 text-warning" />
                </div>
                <div>
                  <p className="text-sm font-medium text-warning">
                    Low: {item.bloodType} blood type
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Only {item.units} units remaining
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
