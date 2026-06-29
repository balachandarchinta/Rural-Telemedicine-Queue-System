import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom"
import { LayoutDashboard, Users, Calendar, Activity, Settings, LogOut } from "lucide-react"
import { cn } from "@/lib/utils"

import Login from "@/pages/Login"
import PatientDashboard from "@/pages/PatientDashboard"
import DoctorDashboard from "@/pages/DoctorDashboard"
import AdminDashboard from "@/pages/AdminDashboard"
import QueueStatus from "@/pages/QueueStatus"

function Sidebar() {
  const location = useLocation()
  
  const navItems = [
    { name: "Dashboard", href: "/", icon: LayoutDashboard },
    { name: "My Token", href: "/queue", icon: Activity },
  ]

  if (location.pathname === "/login") return null

  return (
    <div className="flex h-screen w-64 flex-col border-r bg-background">
      <div className="flex h-16 items-center px-6 border-b">
        <Activity className="h-6 w-6 text-primary mr-2" />
        <span className="text-xl font-bold text-primary">RTQS</span>
      </div>
      <div className="flex-1 overflow-auto py-4">
        <nav className="space-y-1 px-4">
          {navItems.map((item) => {
            const isActive = location.pathname === item.href
            return (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.name}
              </Link>
            )
          })}
        </nav>
      </div>
      <div className="border-t p-4">
        <Link
          to="/login"
          className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
        >
          <LogOut className="mr-3 h-5 w-5" />
          Logout
        </Link>
      </div>
    </div>
  )
}

function MainLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation()
  if (location.pathname === "/login") return <>{children}</>
  
  return (
    <div className="flex h-screen bg-medical-light/30">
      <Sidebar />
      <main className="flex-1 overflow-auto p-8">
        {children}
      </main>
    </div>
  )
}

export default function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<PatientDashboard />} />
          <Route path="/queue" element={<QueueStatus />} />
          <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
        </Routes>
      </MainLayout>
    </Router>
  )
}
