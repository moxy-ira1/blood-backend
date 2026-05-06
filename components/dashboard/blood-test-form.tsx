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
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { donors, bloodTests, type BloodTest } from "@/lib/mock-data"
import { Plus, TestTube, CheckCircle, XCircle, AlertCircle } from "lucide-react"

export function BloodTestForm() {
  const [open, setOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [formData, setFormData] = useState({
    donorId: "",
    hemoglobin: "",
    hiv: "",
    hepatitisB: "",
    hepatitisC: "",
    malaria: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsSubmitting(false)
    setIsSuccess(true)
    setTimeout(() => {
      setOpen(false)
      setIsSuccess(false)
      setFormData({
        donorId: "",
        hemoglobin: "",
        hiv: "",
        hepatitisB: "",
        hepatitisC: "",
        malaria: "",
      })
    }, 1500)
  }

  const testOptions = ["negative", "positive"]

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          New Blood Test
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] bg-card border-border">
        {isSuccess ? (
          <div className="flex flex-col items-center justify-center py-8">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-success/20 mb-4">
              <CheckCircle className="h-8 w-8 text-success" />
            </div>
            <h3 className="text-lg font-semibold text-card-foreground">Test Recorded!</h3>
            <p className="text-sm text-muted-foreground mt-1">
              The blood test results have been saved.
            </p>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-card-foreground">
                <TestTube className="h-5 w-5 text-primary" />
                Record Blood Test Results
              </DialogTitle>
              <DialogDescription>
                Enter the blood test results for a donor.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="donor-test">Donor</Label>
                  <Select
                    value={formData.donorId}
                    onValueChange={(value) => setFormData({ ...formData, donorId: value })}
                  >
                    <SelectTrigger className="bg-input border-border">
                      <SelectValue placeholder="Select donor" />
                    </SelectTrigger>
                    <SelectContent>
                      {donors.map((donor) => (
                        <SelectItem key={donor.id} value={donor.id}>
                          {donor.name} ({donor.bloodType})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="hemoglobin">Hemoglobin Level (g/dL)</Label>
                  <Input
                    id="hemoglobin"
                    type="number"
                    step="0.1"
                    value={formData.hemoglobin}
                    onChange={(e) => setFormData({ ...formData, hemoglobin: e.target.value })}
                    className="bg-input border-border"
                    placeholder="e.g., 14.5"
                  />
                  <p className="text-xs text-muted-foreground">
                    Normal range: 12.0 - 17.5 g/dL
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>HIV Test</Label>
                    <Select
                      value={formData.hiv}
                      onValueChange={(value) => setFormData({ ...formData, hiv: value })}
                    >
                      <SelectTrigger className="bg-input border-border">
                        <SelectValue placeholder="Result" />
                      </SelectTrigger>
                      <SelectContent>
                        {testOptions.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option.charAt(0).toUpperCase() + option.slice(1)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Hepatitis B</Label>
                    <Select
                      value={formData.hepatitisB}
                      onValueChange={(value) => setFormData({ ...formData, hepatitisB: value })}
                    >
                      <SelectTrigger className="bg-input border-border">
                        <SelectValue placeholder="Result" />
                      </SelectTrigger>
                      <SelectContent>
                        {testOptions.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option.charAt(0).toUpperCase() + option.slice(1)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Hepatitis C</Label>
                    <Select
                      value={formData.hepatitisC}
                      onValueChange={(value) => setFormData({ ...formData, hepatitisC: value })}
                    >
                      <SelectTrigger className="bg-input border-border">
                        <SelectValue placeholder="Result" />
                      </SelectTrigger>
                      <SelectContent>
                        {testOptions.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option.charAt(0).toUpperCase() + option.slice(1)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Malaria</Label>
                    <Select
                      value={formData.malaria}
                      onValueChange={(value) => setFormData({ ...formData, malaria: value })}
                    >
                      <SelectTrigger className="bg-input border-border">
                        <SelectValue placeholder="Result" />
                      </SelectTrigger>
                      <SelectContent>
                        {testOptions.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option.charAt(0).toUpperCase() + option.slice(1)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={
                    isSubmitting ||
                    !formData.donorId ||
                    !formData.hemoglobin ||
                    !formData.hiv ||
                    !formData.hepatitisB ||
                    !formData.hepatitisC ||
                    !formData.malaria
                  }
                >
                  {isSubmitting ? "Saving..." : "Save Results"}
                </Button>
              </DialogFooter>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}

export function BloodTestTable() {
  const getResultBadge = (result: BloodTest["result"]) => {
    if (result === "pass") {
      return (
        <Badge className="bg-success/20 text-success hover:bg-success/30">
          <CheckCircle className="mr-1 h-3 w-3" />
          Pass
        </Badge>
      )
    }
    return (
      <Badge className="bg-destructive/20 text-destructive hover:bg-destructive/30">
        <XCircle className="mr-1 h-3 w-3" />
        Fail
      </Badge>
    )
  }

  const getTestBadge = (result: "negative" | "positive") => {
    if (result === "negative") {
      return (
        <Badge variant="secondary" className="bg-success/20 text-success">
          Negative
        </Badge>
      )
    }
    return (
      <Badge variant="secondary" className="bg-destructive/20 text-destructive">
        Positive
      </Badge>
    )
  }

  return (
    <Card className="bg-card border-border">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <div>
          <CardTitle className="flex items-center gap-2 text-card-foreground">
            <TestTube className="h-5 w-5 text-primary" />
            Blood Test Results
          </CardTitle>
          <CardDescription>Recent blood test records</CardDescription>
        </div>
        <BloodTestForm />
      </CardHeader>
      <CardContent>
        <div className="rounded-lg border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent">
                <TableHead className="text-muted-foreground">Donor</TableHead>
                <TableHead className="text-muted-foreground">Date</TableHead>
                <TableHead className="text-muted-foreground hidden md:table-cell">Hemoglobin</TableHead>
                <TableHead className="text-muted-foreground hidden lg:table-cell">HIV</TableHead>
                <TableHead className="text-muted-foreground hidden lg:table-cell">Hep B</TableHead>
                <TableHead className="text-muted-foreground hidden lg:table-cell">Hep C</TableHead>
                <TableHead className="text-muted-foreground hidden lg:table-cell">Malaria</TableHead>
                <TableHead className="text-muted-foreground">Result</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bloodTests.map((test) => (
                <TableRow key={test.id} className="border-border">
                  <TableCell className="font-medium text-card-foreground">
                    {test.donorName}
                  </TableCell>
                  <TableCell className="text-muted-foreground">{test.date}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    <div className="flex items-center gap-2">
                      <span className="text-card-foreground">{test.hemoglobin}</span>
                      {test.hemoglobin < 12 && (
                        <AlertCircle className="h-4 w-4 text-warning" />
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">{getTestBadge(test.hiv)}</TableCell>
                  <TableCell className="hidden lg:table-cell">{getTestBadge(test.hepatitisB)}</TableCell>
                  <TableCell className="hidden lg:table-cell">{getTestBadge(test.hepatitisC)}</TableCell>
                  <TableCell className="hidden lg:table-cell">{getTestBadge(test.malaria)}</TableCell>
                  <TableCell>{getResultBadge(test.result)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
