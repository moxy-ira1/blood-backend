"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { bloodTests } from "@/lib/mock-data"
import { FileText, CheckCircle, XCircle, AlertCircle } from "lucide-react"

export function DonorTestResults() {
  // For demo, show the first test result as if it belongs to the logged-in donor
  const latestTest = bloodTests[0]

  const getResultIcon = (result: "pass" | "fail") => {
    if (result === "pass") {
      return <CheckCircle className="h-6 w-6 text-success" />
    }
    return <XCircle className="h-6 w-6 text-destructive" />
  }

  const getTestResultBadge = (result: "negative" | "positive") => {
    if (result === "negative") {
      return (
        <Badge className="bg-success/20 text-success hover:bg-success/30">
          Negative
        </Badge>
      )
    }
    return (
      <Badge className="bg-destructive/20 text-destructive hover:bg-destructive/30">
        Positive
      </Badge>
    )
  }

  const isHemoglobinNormal = latestTest.hemoglobin >= 12 && latestTest.hemoglobin <= 17.5

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-card-foreground">
          <FileText className="h-5 w-5 text-primary" />
          Blood Test Results
        </CardTitle>
        <CardDescription>Results from your last donation on {latestTest.date}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Overall Result */}
        <div
          className={`flex items-center gap-4 p-4 rounded-lg border ${
            latestTest.result === "pass"
              ? "bg-success/10 border-success/20"
              : "bg-destructive/10 border-destructive/20"
          }`}
        >
          {getResultIcon(latestTest.result)}
          <div>
            <p
              className={`font-semibold ${
                latestTest.result === "pass" ? "text-success" : "text-destructive"
              }`}
            >
              {latestTest.result === "pass" ? "All Tests Passed" : "Tests Need Review"}
            </p>
            <p className="text-sm text-muted-foreground">
              {latestTest.result === "pass"
                ? "Your blood is safe for donation"
                : "Please contact the blood bank for more information"}
            </p>
          </div>
        </div>

        {/* Hemoglobin */}
        <div className="p-4 rounded-lg border border-border bg-secondary/30">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-card-foreground">Hemoglobin Level</span>
            {isHemoglobinNormal ? (
              <Badge className="bg-success/20 text-success">Normal</Badge>
            ) : (
              <Badge className="bg-warning/20 text-warning-foreground">
                <AlertCircle className="mr-1 h-3 w-3" />
                Low
              </Badge>
            )}
          </div>
          <p className="text-2xl font-bold text-card-foreground">{latestTest.hemoglobin} g/dL</p>
          <p className="text-xs text-muted-foreground mt-1">Normal range: 12.0 - 17.5 g/dL</p>
        </div>

        {/* Test Results Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 rounded-lg border border-border bg-secondary/30">
            <p className="text-sm font-medium text-muted-foreground mb-2">HIV Test</p>
            {getTestResultBadge(latestTest.hiv)}
          </div>
          <div className="p-4 rounded-lg border border-border bg-secondary/30">
            <p className="text-sm font-medium text-muted-foreground mb-2">Hepatitis B</p>
            {getTestResultBadge(latestTest.hepatitisB)}
          </div>
          <div className="p-4 rounded-lg border border-border bg-secondary/30">
            <p className="text-sm font-medium text-muted-foreground mb-2">Hepatitis C</p>
            {getTestResultBadge(latestTest.hepatitisC)}
          </div>
          <div className="p-4 rounded-lg border border-border bg-secondary/30">
            <p className="text-sm font-medium text-muted-foreground mb-2">Malaria</p>
            {getTestResultBadge(latestTest.malaria)}
          </div>
        </div>

        <p className="text-xs text-muted-foreground text-center">
          These results are confidential. Contact your healthcare provider for any concerns.
        </p>
      </CardContent>
    </Card>
  )
}
