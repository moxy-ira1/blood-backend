"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, Calendar, Clock } from "lucide-react"

interface EligibilityBadgeProps {
  isEligible: boolean
  lastDonation?: string | null
  nextEligibleDate?: string
}

export function EligibilityBadge({ 
  isEligible, 
  lastDonation,
  nextEligibleDate 
}: EligibilityBadgeProps) {
  return (
    <Card className={`bg-card border-border ${isEligible ? 'border-l-4 border-l-success' : 'border-l-4 border-l-destructive'}`}>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium text-card-foreground">
          Eligibility Status
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-3 mb-4">
          {isEligible ? (
            <>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-success/20">
                <CheckCircle className="h-6 w-6 text-success" />
              </div>
              <div>
                <Badge className="bg-success text-success-foreground text-sm px-3 py-1">
                  Eligible to Donate
                </Badge>
                <p className="text-xs text-muted-foreground mt-1">
                  You can schedule a donation
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-destructive/20">
                <XCircle className="h-6 w-6 text-destructive" />
              </div>
              <div>
                <Badge variant="destructive" className="text-sm px-3 py-1">
                  Not Eligible
                </Badge>
                <p className="text-xs text-muted-foreground mt-1">
                  Please wait until the eligibility period
                </p>
              </div>
            </>
          )}
        </div>

        <div className="space-y-2">
          {lastDonation && (
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">Last donation:</span>
              <span className="text-card-foreground font-medium">{lastDonation}</span>
            </div>
          )}
          {nextEligibleDate && !isEligible && (
            <div className="flex items-center gap-2 text-sm">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">Eligible again:</span>
              <span className="text-card-foreground font-medium">{nextEligibleDate}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export function EligibilityBadgeLarge({ isEligible }: { isEligible: boolean }) {
  return (
    <div className={`
      relative overflow-hidden rounded-2xl p-6
      ${isEligible 
        ? 'bg-gradient-to-br from-success/20 to-success/5 border border-success/30' 
        : 'bg-gradient-to-br from-destructive/20 to-destructive/5 border border-destructive/30'
      }
    `}>
      <div className="flex items-center gap-4">
        <div className={`
          flex h-16 w-16 items-center justify-center rounded-full
          ${isEligible ? 'bg-success/20' : 'bg-destructive/20'}
        `}>
          {isEligible ? (
            <CheckCircle className="h-8 w-8 text-success" />
          ) : (
            <XCircle className="h-8 w-8 text-destructive" />
          )}
        </div>
        <div>
          <h3 className={`text-xl font-bold ${isEligible ? 'text-success' : 'text-destructive'}`}>
            {isEligible ? 'You Are Eligible!' : 'Not Currently Eligible'}
          </h3>
          <p className="text-muted-foreground">
            {isEligible 
              ? 'You can donate blood now. Schedule an appointment today!' 
              : 'Please check back after your waiting period ends.'}
          </p>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className={`
        absolute -top-12 -right-12 h-32 w-32 rounded-full opacity-20
        ${isEligible ? 'bg-success' : 'bg-destructive'}
      `} />
      <div className={`
        absolute -bottom-8 -left-8 h-24 w-24 rounded-full opacity-10
        ${isEligible ? 'bg-success' : 'bg-destructive'}
      `} />
    </div>
  )
}
