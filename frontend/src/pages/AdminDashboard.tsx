import { Activity, Users, Building, Plus } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">System Admin</h1>
          <p className="text-muted-foreground">Manage hospitals, doctors, and system metrics</p>
        </div>
        <Button><Plus className="h-4 w-4 mr-2"/> Add Hospital</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Hospitals</p>
                <h4 className="text-3xl font-bold mt-2">12</h4>
              </div>
              <div className="p-3 bg-purple-100 text-purple-600 rounded-lg"><Building /></div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Doctors</p>
                <h4 className="text-3xl font-bold mt-2">48</h4>
              </div>
              <div className="p-3 bg-blue-100 text-blue-600 rounded-lg"><Users /></div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Patients</p>
                <h4 className="text-3xl font-bold mt-2">856</h4>
              </div>
              <div className="p-3 bg-green-100 text-green-600 rounded-lg"><Users /></div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">Daily Bookings</p>
                <h4 className="text-3xl font-bold mt-2">124</h4>
              </div>
              <div className="p-3 bg-orange-100 text-orange-600 rounded-lg"><Activity /></div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Recent Hospitals Added</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex justify-between items-center p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 bg-gray-200 rounded flex items-center justify-center">
                      <Building className="h-5 w-5 text-gray-500" />
                    </div>
                    <div>
                      <p className="font-semibold">Hospital #{i}</p>
                      <p className="text-xs text-gray-500">Added 2 days ago</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Manage</Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-800 text-sm">
                <span className="font-semibold">High Load:</span> Server load exceeded 80% for 5 minutes.
              </div>
              <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-yellow-800 text-sm">
                <span className="font-semibold">Warning:</span> Database backup delayed.
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
