"use client"

import { useState } from "react"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Droplets, Mail, Phone, CreditCard, AlertCircle, Loader2 } from "lucide-react"

export function LoginPage() {
  const { login } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    donorId: "",
    password: "",
  })

  const handleSubmit = async (e: React.FormEvent, method: string) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      let identifier = ""
      if (method === "email") {
        identifier = formData.email
      } else if (method === "phone") {
        // For demo, map phone to email
        identifier = "donor@bloodbank.com"
      } else {
        // For demo, map ID to email
        identifier = "donor@bloodbank.com"
      }

      await login(identifier, formData.password)
    } catch {
      setError("Invalid credentials. Try: admin@bloodbank.com, worker@bloodbank.com, or donor@bloodbank.com")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary mb-4">
            <Droplets className="h-8 w-8 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">BloodBank</h1>
          <p className="text-muted-foreground text-sm">Blood Donation Management System</p>
        </div>

        <Card className="bg-card border-border">
          <CardHeader className="text-center">
            <CardTitle className="text-card-foreground">Welcome Back</CardTitle>
            <CardDescription>Sign in to access your dashboard</CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Tabs defaultValue="email" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="email" className="text-xs">
                  <Mail className="h-4 w-4 mr-1" />
                  Email
                </TabsTrigger>
                <TabsTrigger value="phone" className="text-xs">
                  <Phone className="h-4 w-4 mr-1" />
                  Phone
                </TabsTrigger>
                <TabsTrigger value="id" className="text-xs">
                  <CreditCard className="h-4 w-4 mr-1" />
                  ID
                </TabsTrigger>
              </TabsList>

              <TabsContent value="email">
                <form onSubmit={(e) => handleSubmit(e, "email")} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="bg-input border-border"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password-email">Password</Label>
                    <Input
                      id="password-email"
                      type="password"
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="bg-input border-border"
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Signing in...
                      </>
                    ) : (
                      "Sign In"
                    )}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="phone">
                <form onSubmit={(e) => handleSubmit(e, "phone")} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+1 234 567 8900"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="bg-input border-border"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password-phone">Password</Label>
                    <Input
                      id="password-phone"
                      type="password"
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="bg-input border-border"
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Signing in...
                      </>
                    ) : (
                      "Sign In"
                    )}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="id">
                <form onSubmit={(e) => handleSubmit(e, "id")} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="donorId">Donor ID</Label>
                    <Input
                      id="donorId"
                      type="text"
                      placeholder="DON-XXXXXX"
                      value={formData.donorId}
                      onChange={(e) => setFormData({ ...formData, donorId: e.target.value })}
                      className="bg-input border-border"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password-id">Password</Label>
                    <Input
                      id="password-id"
                      type="password"
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="bg-input border-border"
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Signing in...
                      </>
                    ) : (
                      "Sign In"
                    )}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            {/* Demo Credentials */}
            <div className="mt-6 p-4 rounded-lg bg-secondary/50 border border-border">
              <p className="text-xs font-medium text-card-foreground mb-2">Demo Credentials:</p>
              <div className="space-y-1 text-xs text-muted-foreground">
                <p><span className="font-medium">Admin:</span> admin@bloodbank.com</p>
                <p><span className="font-medium">Worker:</span> worker@bloodbank.com</p>
                <p><span className="font-medium">Donor:</span> donor@bloodbank.com</p>
                <p className="text-muted-foreground/70 mt-1">(Any password works for demo)</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <p className="text-center text-xs text-muted-foreground mt-6">
          By signing in, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  )
}
