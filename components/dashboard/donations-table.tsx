"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { donations, type Donation } from "@/lib/mock-data"
import { DonationForm } from "./donation-form"
import {
  Search,
  MoreHorizontal,
  Eye,
  CheckCircle,
  Clock,
  XCircle,
  ClipboardList,
} from "lucide-react"

export function DonationsTable() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredDonations = donations.filter(
    (donation) =>
      donation.donorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      donation.bloodType.toLowerCase().includes(searchQuery.toLowerCase())
  )

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
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <div>
          <CardTitle className="flex items-center gap-2 text-card-foreground">
            <ClipboardList className="h-5 w-5 text-primary" />
            Donations
          </CardTitle>
          <CardDescription>Manage blood donation records</CardDescription>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search donations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-input border-border"
            />
          </div>
          <DonationForm />
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-lg border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent">
                <TableHead className="text-muted-foreground">Donor</TableHead>
                <TableHead className="text-muted-foreground">Blood Type</TableHead>
                <TableHead className="text-muted-foreground hidden md:table-cell">Quantity</TableHead>
                <TableHead className="text-muted-foreground hidden lg:table-cell">Date</TableHead>
                <TableHead className="text-muted-foreground">Status</TableHead>
                <TableHead className="text-muted-foreground text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDonations.map((donation) => (
                <TableRow key={donation.id} className="border-border">
                  <TableCell className="font-medium text-card-foreground">
                    {donation.donorName}
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className={bloodTypeColors[donation.bloodType]}>
                      {donation.bloodType}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-muted-foreground">
                    {donation.quantity} ml
                  </TableCell>
                  <TableCell className="hidden lg:table-cell text-muted-foreground">
                    {donation.date}
                  </TableCell>
                  <TableCell>{getStatusBadge(donation.status)}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        {donation.status === "pending" && (
                          <>
                            <DropdownMenuItem>
                              <CheckCircle className="mr-2 h-4 w-4 text-success" />
                              Mark Complete
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">
                              <XCircle className="mr-2 h-4 w-4" />
                              Reject
                            </DropdownMenuItem>
                          </>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
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
