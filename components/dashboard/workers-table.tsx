"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { workers } from "@/lib/mock-data"
import {
  Search,
  MoreHorizontal,
  Edit,
  Trash2,
  Plus,
  UserCog,
} from "lucide-react"

export function WorkersTable() {
  const [searchQuery, setSearchQuery] = useState("")
  const [addDialogOpen, setAddDialogOpen] = useState(false)
  const [newWorker, setNewWorker] = useState({
    name: "",
    email: "",
    phone: "",
    shift: "",
  })

  const filteredWorkers = workers.filter(
    (worker) =>
      worker.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      worker.email.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const shiftColors: Record<string, string> = {
    Morning: "bg-chart-4/20 text-chart-4",
    Evening: "bg-chart-3/20 text-chart-3",
    Night: "bg-chart-5/20 text-chart-5",
  }

  return (
    <Card className="bg-card border-border">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="flex items-center gap-2 text-card-foreground">
          <UserCog className="h-5 w-5 text-primary" />
          Workers
        </CardTitle>
        <div className="flex items-center gap-3">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search workers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-input border-border"
            />
          </div>
          <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Add Worker
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-card border-border">
              <DialogHeader>
                <DialogTitle className="text-card-foreground">Add New Worker</DialogTitle>
                <DialogDescription>
                  Create a new worker account for the blood bank.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={newWorker.name}
                    onChange={(e) => setNewWorker({ ...newWorker, name: e.target.value })}
                    className="bg-input border-border"
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={newWorker.email}
                    onChange={(e) => setNewWorker({ ...newWorker, email: e.target.value })}
                    className="bg-input border-border"
                    placeholder="john.doe@bloodbank.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={newWorker.phone}
                    onChange={(e) => setNewWorker({ ...newWorker, phone: e.target.value })}
                    className="bg-input border-border"
                    placeholder="+1 234 567 8900"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="shift">Shift</Label>
                  <Select
                    value={newWorker.shift}
                    onValueChange={(value) => setNewWorker({ ...newWorker, shift: value })}
                  >
                    <SelectTrigger className="bg-input border-border">
                      <SelectValue placeholder="Select shift" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Morning">Morning</SelectItem>
                      <SelectItem value="Evening">Evening</SelectItem>
                      <SelectItem value="Night">Night</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setAddDialogOpen(false)}>Create Worker</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-lg border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent">
                <TableHead className="text-muted-foreground">Worker</TableHead>
                <TableHead className="text-muted-foreground hidden md:table-cell">Phone</TableHead>
                <TableHead className="text-muted-foreground">Shift</TableHead>
                <TableHead className="text-muted-foreground">Status</TableHead>
                <TableHead className="text-muted-foreground text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredWorkers.map((worker) => (
                <TableRow key={worker.id} className="border-border">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9">
                        <AvatarFallback className="bg-primary/10 text-primary text-sm">
                          {worker.name.split(" ").map((n) => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-card-foreground">{worker.name}</p>
                        <p className="text-sm text-muted-foreground">{worker.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-muted-foreground">
                    {worker.phone}
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className={shiftColors[worker.shift]}>
                      {worker.shift}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className={
                        worker.status === "active"
                          ? "bg-success/20 text-success"
                          : "bg-muted text-muted-foreground"
                      }
                    >
                      {worker.status.charAt(0).toUpperCase() + worker.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Remove
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
