import { Activity, Clock, Users, Hash } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"

export default function QueueStatus() {
  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Live Queue Status</h1>
        <p className="text-muted-foreground">Track your token for your upcoming appointment.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-medical-blue bg-medical-blue/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium text-medical-dark flex items-center">
              <Hash className="w-5 h-5 mr-2 text-medical-blue" />
              Your Token Number
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-5xl font-black text-medical-blue">42</div>
            <p className="text-sm text-medical-dark/70 mt-2">Dr. Sarah Johnson • Cardiology</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium text-gray-700 flex items-center">
              <Activity className="w-5 h-5 mr-2 text-medical-green" />
              Currently Serving
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-5xl font-black text-gray-900">39</div>
            <p className="text-sm text-muted-foreground mt-2">Consultation in progress...</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Card className="bg-gray-50">
          <CardContent className="p-6 flex items-center space-x-4">
            <div className="p-3 bg-white rounded-full shadow-sm">
              <Users className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Patients Ahead of You</p>
              <p className="text-2xl font-bold">2</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-50">
          <CardContent className="p-6 flex items-center space-x-4">
            <div className="p-3 bg-white rounded-full shadow-sm">
              <Clock className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Estimated Wait Time</p>
              <p className="text-2xl font-bold">15 mins</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
