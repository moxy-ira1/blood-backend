"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { notifications as initialNotifications, type Notification } from "@/lib/mock-data"
import {
  Bell,
  Check,
  CheckCheck,
  Info,
  AlertTriangle,
  CheckCircle,
  XCircle,
} from "lucide-react"
import { cn } from "@/lib/utils"

export function NotificationsList() {
  const [notificationData, setNotificationData] = useState<Notification[]>(initialNotifications)

  const markAsRead = (id: string) => {
    setNotificationData((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    )
  }

  const markAllAsRead = () => {
    setNotificationData((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  const unreadCount = notificationData.filter((n) => !n.read).length

  const getTypeIcon = (type: Notification["type"]) => {
    switch (type) {
      case "info":
        return <Info className="h-5 w-5 text-chart-3" />
      case "success":
        return <CheckCircle className="h-5 w-5 text-success" />
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-warning" />
      case "error":
        return <XCircle className="h-5 w-5 text-destructive" />
    }
  }

  const getTypeBg = (type: Notification["type"]) => {
    switch (type) {
      case "info":
        return "bg-chart-3/10"
      case "success":
        return "bg-success/10"
      case "warning":
        return "bg-warning/10"
      case "error":
        return "bg-destructive/10"
    }
  }

  return (
    <Card className="bg-card border-border">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <div>
          <CardTitle className="flex items-center gap-2 text-card-foreground">
            <Bell className="h-5 w-5 text-primary" />
            Notifications
            {unreadCount > 0 && (
              <Badge className="bg-primary text-primary-foreground ml-2">
                {unreadCount} new
              </Badge>
            )}
          </CardTitle>
          <CardDescription>Stay updated with important alerts</CardDescription>
        </div>
        {unreadCount > 0 && (
          <Button variant="outline" size="sm" onClick={markAllAsRead}>
            <CheckCheck className="mr-2 h-4 w-4" />
            Mark all read
          </Button>
        )}
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-3">
            {notificationData.map((notification) => (
              <div
                key={notification.id}
                className={cn(
                  "flex gap-4 p-4 rounded-lg border border-border transition-colors",
                  notification.read ? "bg-transparent" : "bg-secondary/50"
                )}
              >
                <div className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-full", getTypeBg(notification.type))}>
                  {getTypeIcon(notification.type)}
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm font-medium text-card-foreground">
                      {notification.title}
                    </p>
                    {!notification.read && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 shrink-0"
                        onClick={() => markAsRead(notification.id)}
                      >
                        <Check className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{notification.message}</p>
                  <p className="text-xs text-muted-foreground">{notification.date}</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

export function NotificationsWidget() {
  const recentNotifications = initialNotifications.slice(0, 3)

  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium text-card-foreground flex items-center gap-2">
          <Bell className="h-4 w-4 text-primary" />
          Recent Notifications
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {recentNotifications.map((notification) => (
          <div
            key={notification.id}
            className={cn(
              "flex items-start gap-3 p-3 rounded-lg border border-border",
              !notification.read && "bg-secondary/50"
            )}
          >
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10">
              <Bell className="h-4 w-4 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-card-foreground truncate">
                {notification.title}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                {notification.message}
              </p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
