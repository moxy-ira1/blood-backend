"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
import { donors, type Donor } from "@/lib/mock-data"
import { Search, MoreHorizontal, Eye, Edit, CheckCircle, XCircle } from "lucide-react"

interface DonorTableProps {
  onViewDonor?: (donor: Donor) => void
  onEditDonor?: (donor: Donor) => void
}

export function DonorTable({ onViewDonor, onEditDonor }: DonorTableProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [data] = useState<Donor[]>(donors)

  const filteredDonors = data.filter(
    (donor) =>
      donor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      donor.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      donor.bloodType.toLowerCase().includes(searchQuery.toLowerCase())
  )

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
        <CardTitle className="text-card-foreground">Donors</CardTitle>
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search donors..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 bg-input border-border"
          />
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-lg border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent">
                <TableHead className="text-muted-foreground">Name</TableHead>
                <TableHead className="text-muted-foreground">Blood Type</TableHead>
                <TableHead className="text-muted-foreground hidden md:table-cell">Phone</TableHead>
                <TableHead className="text-muted-foreground hidden lg:table-cell">Last Donation</TableHead>
                <TableHead className="text-muted-foreground">Eligibility</TableHead>
                <TableHead className="text-muted-foreground text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDonors.map((donor) => (
                <TableRow key={donor.id} className="border-border">
                  <TableCell>
                    <div>
                      <p className="font-medium text-card-foreground">{donor.name}</p>
                      <p className="text-sm text-muted-foreground">{donor.email}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className={bloodTypeColors[donor.bloodType]}>
                      {donor.bloodType}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-muted-foreground">
                    {donor.phone}
                  </TableCell>
                  <TableCell className="hidden lg:table-cell text-muted-foreground">
                    {donor.lastDonation || "Never"}
                  </TableCell>
                  <TableCell>
                    {donor.isEligible ? (
                      <Badge className="bg-success/20 text-success hover:bg-success/30">
                        <CheckCircle className="mr-1 h-3 w-3" />
                        Eligible
                      </Badge>
                    ) : (
                      <Badge variant="secondary" className="bg-destructive/20 text-destructive">
                        <XCircle className="mr-1 h-3 w-3" />
                        Not Eligible
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => onViewDonor?.(donor)}>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onEditDonor?.(donor)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
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
