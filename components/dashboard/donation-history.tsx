"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { donations, type Donation } from "@/lib/mock-data"
import { History, CheckCircle, Clock, XCircle, Droplets } from "lucide-react"

export function DonationHistory() {
  const getStatusBadge = (status: Donation["status"]) => {
    switch (status) {
      case "completed":
        return (
          <Badge className="bg-success/20 text-success hover:bg-success/30">
            <CheckCircle className="mr-1 h-3 w-3" />
            Completed
          </Badge>
        )
      case "pending":
        return (
          <Badge className="bg-chart-4/20 text-chart-4 hover:bg-chart-4/30">
            <Clock className="mr-1 h-3 w-3" />
            Pending
          </Badge>
        )
      case "rejected":
        return (
          <Badge className="bg-destructive/20 text-destructive hover:bg-destructive/30">
            <XCircle className="mr-1 h-3 w-3" />
            Rejected
          </Badge>
        )
    }
  }

  const bloodTypeColors: Record<string, string> = {
    "A+": "bg-chart-1/20 text-chart-1",
    "A-": "bg-chart-1/20 text-chart-1",
    "B+": "bg-chart-2/20 text-chart-2",
    "B-": "bg-chart-2/20 text-chart-2",
    "AB+": "bg-chart-3/20 text-chart-3",
    "AB-": "bg-chart-3/20 text-chart-3",
    "O+": "bg-chart-4/20 text-chart-4",
    "O-": "bg-chart-4/20 text-chart-4",
  }

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-card-foreground">
          <History className="h-5 w-5 text-primary" />
          Donation History
        </CardTitle>
        <CardDescription>Your past blood donations</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-lg border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent">
                <TableHead className="text-muted-foreground">Date</TableHead>
                <TableHead className="text-muted-foreground">Blood Type</TableHead>
                <TableHead className="text-muted-foreground hidden md:table-cell">Quantity</TableHead>
                <TableHead className="text-muted-foreground">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {donations.slice(0, 5).map((donation) => (
                <TableRow key={donation.id} className="border-border">
                  <TableCell className="text-card-foreground">{donation.date}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className={bloodTypeColors[donation.bloodType]}>
                      {donation.bloodType}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-muted-foreground">
                    {donation.quantity} ml
                  </TableCell>
                  <TableCell>{getStatusBadge(donation.status)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}

export function DonationSummary() {
  const completedDonations = donations.filter((d) => d.status === "completed")
  const totalVolume = completedDonations.reduce((sum, d) => sum + d.quantity, 0)

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-card-foreground">Donation Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-4 p-4 rounded-lg bg-primary/10 border border-primary/20">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20">
            <Droplets className="h-6 w-6 text-primary" />
          </div>
          <div>
            <p className="text-2xl font-bold text-card-foreground">{completedDonations.length}</p>
            <p className="text-sm text-muted-foreground">Total Donations</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 rounded-lg bg-secondary/50 border border-border">
            <p className="text-xl font-bold text-card-foreground">{(totalVolume / 1000).toFixed(1)}L</p>
            <p className="text-xs text-muted-foreground">Total Volume Donated</p>
          </div>
          <div className="p-4 rounded-lg bg-secondary/50 border border-border">
            <p className="text-xl font-bold text-card-foreground">{completedDonations.length * 3}</p>
            <p className="text-xs text-muted-foreground">Lives Potentially Saved</p>
          </div>
        </div>

        <div className="p-4 rounded-lg bg-success/10 border border-success/20">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-success" />
            <p className="text-sm font-medium text-success">Eligible to Donate</p>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            You can donate again after April 15, 2024
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
