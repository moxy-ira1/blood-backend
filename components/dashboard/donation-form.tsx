"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { donors } from "@/lib/mock-data"
import { Plus, Droplets, CheckCircle } from "lucide-react"

const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]

export function DonationForm() {
  const [open, setOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [formData, setFormData] = useState({
    donorId: "",
    bloodType: "",
    quantity: "450",
    notes: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsSubmitting(false)
    setIsSuccess(true)
    setTimeout(() => {
      setOpen(false)
      setIsSuccess(false)
      setFormData({ donorId: "", bloodType: "", quantity: "450", notes: "" })
    }, 1500)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Record Donation
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] bg-card border-border">
        {isSuccess ? (
          <div className="flex flex-col items-center justify-center py-8">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-success/20 mb-4">
              <CheckCircle className="h-8 w-8 text-success" />
            </div>
            <h3 className="text-lg font-semibold text-card-foreground">Donation Recorded!</h3>
            <p className="text-sm text-muted-foreground mt-1">
              The donation has been successfully recorded.
            </p>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-card-foreground">
                <Droplets className="h-5 w-5 text-primary" />
                Record New Donation
              </DialogTitle>
              <DialogDescription>
                Record a new blood donation from an eligible donor.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="donor">Donor</Label>
                  <Select
                    value={formData.donorId}
                    onValueChange={(value) => setFormData({ ...formData, donorId: value })}
                  >
                    <SelectTrigger className="bg-input border-border">
                      <SelectValue placeholder="Select donor" />
                    </SelectTrigger>
                    <SelectContent>
                      {donors
                        .filter((d) => d.isEligible)
                        .map((donor) => (
                          <SelectItem key={donor.id} value={donor.id}>
                            {donor.name} ({donor.bloodType})
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bloodType">Blood Type</Label>
                  <Select
                    value={formData.bloodType}
                    onValueChange={(value) => setFormData({ ...formData, bloodType: value })}
                  >
                    <SelectTrigger className="bg-input border-border">
                      <SelectValue placeholder="Select blood type" />
                    </SelectTrigger>
                    <SelectContent>
                      {bloodTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="quantity">Quantity (ml)</Label>
                  <Input
                    id="quantity"
                    type="number"
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    className="bg-input border-border"
                    min="200"
                    max="500"
                  />
                  <p className="text-xs text-muted-foreground">Standard donation is 450ml</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Notes (Optional)</Label>
                  <Input
                    id="notes"
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="bg-input border-border"
                    placeholder="Any additional notes..."
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting || !formData.donorId || !formData.bloodType}>
                  {isSubmitting ? "Recording..." : "Record Donation"}
                </Button>
              </DialogFooter>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}

export function DonationFormCard() {
  const [formData, setFormData] = useState({
    donorId: "",
    bloodType: "",
    quantity: "450",
  })

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-card-foreground">
          <Droplets className="h-5 w-5 text-primary" />
          Quick Donation Entry
        </CardTitle>
        <CardDescription>Record a new blood donation</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="donor-quick">Donor</Label>
            <Select
              value={formData.donorId}
              onValueChange={(value) => setFormData({ ...formData, donorId: value })}
            >
              <SelectTrigger className="bg-input border-border">
                <SelectValue placeholder="Select donor" />
              </SelectTrigger>
              <SelectContent>
                {donors
                  .filter((d) => d.isEligible)
                  .map((donor) => (
                    <SelectItem key={donor.id} value={donor.id}>
                      {donor.name}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="bloodType-quick">Blood Type</Label>
              <Select
                value={formData.bloodType}
                onValueChange={(value) => setFormData({ ...formData, bloodType: value })}
              >
                <SelectTrigger className="bg-input border-border">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  {bloodTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="quantity-quick">Quantity (ml)</Label>
              <Input
                id="quantity-quick"
                type="number"
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                className="bg-input border-border"
              />
            </div>
          </div>

          <Button className="w-full" disabled={!formData.donorId || !formData.bloodType}>
            <Plus className="mr-2 h-4 w-4" />
            Record Donation
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
