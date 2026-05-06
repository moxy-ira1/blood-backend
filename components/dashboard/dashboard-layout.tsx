"use client"

import { useState } from "react"
import { useAuth, type UserRole } from "@/lib/auth-context"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  LayoutDashboard,
  Users,
  Droplets,
  FileText,
  ClipboardList,
  Bell,
  MessageSquare,
  Settings,
  LogOut,
  Menu,
  X,
  UserCog,
  History,
  TestTube,
  ChevronRight,
} from "lucide-react"

interface NavItem {
  label: string
  icon: React.ReactNode
  href: string
  roles: UserRole[]
}

const navItems: NavItem[] = [
  {
    label: "Dashboard",
    icon: <LayoutDashboard className="h-5 w-5" />,
    href: "dashboard",
    roles: ["admin", "worker", "donor"],
  },
  {
    label: "Donors",
    icon: <Users className="h-5 w-5" />,
    href: "donors",
    roles: ["admin", "worker"],
  },
  {
    label: "Workers",
    icon: <UserCog className="h-5 w-5" />,
    href: "workers",
    roles: ["admin"],
  },
  {
    label: "Blood Inventory",
    icon: <Droplets className="h-5 w-5" />,
    href: "inventory",
    roles: ["admin", "worker"],
  },
  {
    label: "Donations",
    icon: <ClipboardList className="h-5 w-5" />,
    href: "donations",
    roles: ["admin", "worker"],
  },
  {
    label: "Blood Tests",
    icon: <TestTube className="h-5 w-5" />,
    href: "tests",
    roles: ["admin", "worker"],
  },
  {
    label: "Donation History",
    icon: <History className="h-5 w-5" />,
    href: "history",
    roles: ["donor"],
  },
  {
    label: "Test Results",
    icon: <FileText className="h-5 w-5" />,
    href: "results",
    roles: ["donor"],
  },
  {
    label: "Audit Logs",
    icon: <FileText className="h-5 w-5" />,
    href: "audit",
    roles: ["admin"],
  },
  {
    label: "Notifications",
    icon: <Bell className="h-5 w-5" />,
    href: "notifications",
    roles: ["admin", "worker", "donor"],
  },
  {
    label: "Messages",
    icon: <MessageSquare className="h-5 w-5" />,
    href: "messages",
    roles: ["worker", "donor"],
  },
]

interface DashboardLayoutProps {
  children: React.ReactNode
  currentPage: string
  onNavigate: (page: string) => void
}

export function DashboardLayout({ children, currentPage, onNavigate }: DashboardLayoutProps) {
  const { user, logout } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  if (!user) return null

  const filteredNavItems = navItems.filter((item) => item.roles.includes(user.role))

  const roleColors: Record<UserRole, string> = {
    admin: "bg-primary text-primary-foreground",
    worker: "bg-chart-2 text-foreground",
    donor: "bg-chart-3 text-foreground",
  }

  const roleLabels: Record<UserRole, string> = {
    admin: "BTD Admin",
    worker: "Worker",
    donor: "Donor",
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-sidebar border-r border-sidebar-border transition-transform duration-300 lg:static lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Logo */}
        <div className="flex h-16 items-center justify-between border-b border-sidebar-border px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <Droplets className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-semibold text-sidebar-foreground">BloodBank</span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden text-sidebar-foreground"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4">
          <ul className="space-y-1">
            {filteredNavItems.map((item) => (
              <li key={item.href}>
                <button
                  onClick={() => {
                    onNavigate(item.href)
                    setSidebarOpen(false)
                  }}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                    currentPage === item.href
                      ? "bg-sidebar-accent text-sidebar-primary"
                      : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
                  )}
                >
                  {item.icon}
                  {item.label}
                  {currentPage === item.href && (
                    <ChevronRight className="ml-auto h-4 w-4" />
                  )}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* User Info */}
        <div className="border-t border-sidebar-border p-4">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarFallback className="bg-sidebar-accent text-sidebar-foreground">
                {user.name.split(" ").map((n) => n[0]).join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-sidebar-foreground truncate">{user.name}</p>
              <Badge variant="secondary" className={cn("text-xs mt-1", roleColors[user.role])}>
                {roleLabels[user.role]}
              </Badge>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="flex h-16 items-center justify-between border-b border-border bg-card px-4 lg:px-6">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>
            <h1 className="text-lg font-semibold capitalize">
              {currentPage === "dashboard" ? `${roleLabels[user.role]} Dashboard` : currentPage.replace("-", " ")}
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="relative" onClick={() => onNavigate("notifications")}>
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
                3
              </span>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-primary/10 text-primary text-sm">
                      {user.name.split(" ").map((n) => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <span className="hidden md:inline-block text-sm">{user.name}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <div className="flex flex-col">
                    <span>{user.name}</span>
                    <span className="text-xs text-muted-foreground">{user.email}</span>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout} className="text-destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">{children}</main>
      </div>
    </div>
  )
}
