import { useState } from "react"
import { Calendar as CalendarIcon, Clock, User, CheckCircle, XCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"

const APPOINTMENTS = [
  { id: 1, patient: "John Doe", time: "09:00 AM", type: "First Visit", status: "pending" },
  { id: 2, patient: "Alice Smith", time: "10:30 AM", type: "Follow up", status: "completed" },
  { id: 3, patient: "Bob Johnson", time: "11:00 AM", type: "Consultation", status: "pending" },
]

export default function DoctorDashboard() {
  const [appointments, setAppointments] = useState(APPOINTMENTS)

  const updateStatus = (id: number, newStatus: string) => {
    setAppointments(appointments.map(app => app.id === id ? { ...app, status: newStatus } : app))
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Doctor Dashboard</h1>
        <p className="text-muted-foreground">Manage your daily appointments and schedule</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardContent className="p-6 flex items-center space-x-4">
            <div className="p-3 bg-blue-100 text-blue-600 rounded-full"><CalendarIcon /></div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Total Appointments</p>
              <h4 className="text-2xl font-bold">{appointments.length}</h4>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex items-center space-x-4">
            <div className="p-3 bg-yellow-100 text-yellow-600 rounded-full"><Clock /></div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Pending</p>
              <h4 className="text-2xl font-bold">{appointments.filter(a => a.status === 'pending').length}</h4>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex items-center space-x-4">
            <div className="p-3 bg-green-100 text-green-600 rounded-full"><CheckCircle /></div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Completed</p>
              <h4 className="text-2xl font-bold">{appointments.filter(a => a.status === 'completed').length}</h4>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Today's Appointments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {appointments.map((appointment) => (
              <div key={appointment.id} className="flex items-center justify-between p-4 border rounded-lg bg-white">
                <div className="flex items-center space-x-4">
                  <div className="h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center">
                    <User className="h-5 w-5 text-gray-500" />
                  </div>
                  <div>
                    <h4 className="font-semibold">{appointment.patient}</h4>
                    <p className="text-sm text-gray-500">{appointment.type} • {appointment.time}</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  {appointment.status === 'pending' ? (
                    <>
                      <Button size="sm" onClick={() => updateStatus(appointment.id, 'completed')} className="bg-green-600 hover:bg-green-700">
                        <CheckCircle className="h-4 w-4 mr-1" /> Complete
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => updateStatus(appointment.id, 'cancelled')}>
                        <XCircle className="h-4 w-4 mr-1" /> Cancel
                      </Button>
                    </>
                  ) : (
                    <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${
                      appointment.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {appointment.status}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
