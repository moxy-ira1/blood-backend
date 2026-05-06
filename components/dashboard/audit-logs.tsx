"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { auditLogs, type AuditLog } from "@/lib/mock-data"
import { FileText, Search, Clock, User } from "lucide-react"

export function AuditLogs() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredLogs = auditLogs.filter(
    (log) =>
      log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.details.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    return {
      date: date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      time: date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
      }),
    }
  }

  const getRoleBadgeColor = (role: string) => {
    switch (role.toLowerCase()) {
      case "admin":
        return "bg-primary/20 text-primary"
      case "worker":
        return "bg-chart-2/20 text-chart-2"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  return (
    <Card className="bg-card border-border">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <div>
          <CardTitle className="flex items-center gap-2 text-card-foreground">
            <FileText className="h-5 w-5 text-primary" />
            Audit Logs
          </CardTitle>
          <CardDescription>Track all system activities</CardDescription>
        </div>
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search logs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 bg-input border-border"
          />
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[500px] pr-4">
          <div className="space-y-4">
            {filteredLogs.map((log) => {
              const { date, time } = formatTimestamp(log.timestamp)
              return (
                <div
                  key={log.id}
                  className="flex gap-4 p-4 rounded-lg border border-border bg-secondary/30"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <p className="font-medium text-card-foreground">{log.action}</p>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground shrink-0">
                        <Clock className="h-3 w-3" />
                        {time}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{log.details}</p>
                    <div className="flex items-center gap-3 text-xs">
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <User className="h-3 w-3" />
                        {log.userName}
                      </div>
                      <Badge variant="secondary" className={getRoleBadgeColor(log.userRole)}>
                        {log.userRole}
                      </Badge>
                      <span className="text-muted-foreground">{date}</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
