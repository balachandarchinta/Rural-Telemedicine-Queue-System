import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/Card"
import { Activity } from "lucide-react"

export default function Login() {
  const [role, setRole] = useState("patient")
  const navigate = useNavigate()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (role === "patient") navigate("/")
    else if (role === "doctor") navigate("/doctor-dashboard")
    else if (role === "admin") navigate("/admin-dashboard")
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-medical-light/50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <Activity className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="text-2xl text-primary">RTQS Login</CardTitle>
          <CardDescription>Enter your credentials to access your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Email / Phone</label>
              <Input type="text" placeholder="Enter your email or phone" required />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Password</label>
              <Input type="password" placeholder="••••••••" required />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Role</label>
              <select 
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                <option value="patient">Patient</option>
                <option value="doctor">Doctor</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <Button type="submit" className="w-full">Sign In</Button>
          </form>
        </CardContent>
        <CardFooter className="justify-center">
          <p className="text-sm text-muted-foreground">
            Don't have an account? <a href="#" className="text-primary hover:underline">Sign up</a>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
