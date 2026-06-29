import { useState, useEffect } from "react"
import { Search, MapPin, Star, Clock, Calendar as CalendarIcon, Phone } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Card, CardContent } from "@/components/ui/Card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/Dialog"

const HOSPITALS = [
  { id: 1, name: "City General Hospital", location: "Downtown", rating: 4.5, time: "10 mins", type: "Multi-specialty" },
  { id: 2, name: "Sunrise Medical Center", location: "Westside", rating: 4.8, time: "15 mins", type: "General" },
  { id: 3, name: "Apex Health Clinic", location: "North District", rating: 4.2, time: "25 mins", type: "Pediatrics" },
]

const DOCTORS = [
  { id: 1, name: "Dr. Sarah Johnson", specialty: "Cardiologist", experience: "10 years", fee: "$50", hospitalId: 1, available: true, image: "https://i.pravatar.cc/150?u=1" },
  { id: 2, name: "Dr. Michael Chen", specialty: "General Physician", experience: "8 years", fee: "$30", hospitalId: 1, available: true, image: "https://i.pravatar.cc/150?u=2" },
  { id: 3, name: "Dr. Emily Davis", specialty: "Pediatrician", experience: "12 years", fee: "$45", hospitalId: 2, available: false, image: "https://i.pravatar.cc/150?u=3" },
]

const SLOTS = ["09:00 AM", "10:00 AM", "11:30 AM", "02:00 PM", "04:00 PM"]

export default function PatientDashboard() {
  const [search, setSearch] = useState("")
  const [selectedHospital, setSelectedHospital] = useState<number | null>(null)
  const [selectedDoctor, setSelectedDoctor] = useState<number | null>(null)
  const [showBookingDialog, setShowBookingDialog] = useState(false)
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null)

  const handleHospitalSelect = (id: number) => {
    setSelectedHospital(id)
    setSelectedDoctor(null)
  }

  const handleDoctorSelect = (id: number) => {
    setSelectedDoctor(id)
    setShowBookingDialog(true)
  }

  const confirmBooking = () => {
    alert("Booking confirmed!")
    setShowBookingDialog(false)
    setSelectedSlot(null)
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Find & Book</h1>
        <p className="text-muted-foreground">Book appointments with top hospitals and doctors</p>
      </div>

      <div className="relative max-w-2xl">
        <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
        <Input 
          className="pl-10 h-12 text-base rounded-full border-gray-300 shadow-sm"
          placeholder="Search for hospitals, specialties, or doctors..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Hospitals Section - Swiggy Style */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Top Hospitals Near You</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {HOSPITALS.map((hospital) => (
            <Card 
              key={hospital.id} 
              className={`cursor-pointer transition-all hover:shadow-md ${selectedHospital === hospital.id ? 'border-primary ring-1 ring-primary' : ''}`}
              onClick={() => handleHospitalSelect(hospital.id)}
            >
              <div className="h-32 bg-gray-200 rounded-t-xl overflow-hidden relative">
                <img src={`https://picsum.photos/seed/${hospital.id}/400/200`} alt={hospital.name} className="w-full h-full object-cover" />
                <div className="absolute top-2 right-2 bg-white/90 px-2 py-1 rounded text-xs font-bold flex items-center shadow">
                  <Star className="h-3 w-3 text-yellow-500 mr-1 fill-current" /> {hospital.rating}
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="font-bold text-lg truncate">{hospital.name}</h3>
                <p className="text-sm text-muted-foreground mb-2">{hospital.type}</p>
                <div className="flex items-center text-sm text-gray-500 space-x-4">
                  <div className="flex items-center"><MapPin className="h-4 w-4 mr-1" /> {hospital.location}</div>
                  <div className="flex items-center"><Clock className="h-4 w-4 mr-1" /> {hospital.time}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Doctors Section - Practo Style */}
      {selectedHospital && (
        <section className="animate-in fade-in slide-in-from-bottom-4 duration-500 pt-4 border-t">
          <h2 className="text-xl font-semibold mb-4">Available Doctors</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {DOCTORS.filter(d => d.hospitalId === selectedHospital).map((doctor) => (
              <Card key={doctor.id} className="overflow-hidden">
                <div className="flex p-4">
                  <img src={doctor.image} alt={doctor.name} className="h-24 w-24 rounded-full object-cover border-2 border-gray-100" />
                  <div className="ml-4 flex-1">
                    <h3 className="font-bold text-lg text-primary">{doctor.name}</h3>
                    <p className="text-sm text-gray-600">{doctor.specialty}</p>
                    <p className="text-sm text-gray-500 mb-2">{doctor.experience} experience</p>
                    <div className="flex items-center justify-between mt-3">
                      <span className="font-semibold">{doctor.fee} <span className="text-xs font-normal text-gray-500">Consultation fee</span></span>
                      <Button 
                        variant={doctor.available ? "default" : "secondary"} 
                        disabled={!doctor.available}
                        onClick={() => handleDoctorSelect(doctor.id)}
                      >
                        {doctor.available ? 'Book Clinic Visit' : 'Not Available'}
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
            {DOCTORS.filter(d => d.hospitalId === selectedHospital).length === 0 && (
              <p className="text-muted-foreground">No doctors found for this hospital.</p>
            )}
          </div>
        </section>
      )}

      {/* Booking Dialog */}
      <Dialog open={showBookingDialog} onOpenChange={setShowBookingDialog}>
        <div className="space-y-4">
          <div className="mb-4">
            <h2 className="text-xl font-semibold text-primary">Select a Time Slot</h2>
            <p className="text-sm text-muted-foreground">Book your appointment for today</p>
          </div>
          
          <div className="grid grid-cols-3 gap-3">
            {SLOTS.map((slot) => (
              <button
                key={slot}
                onClick={() => setSelectedSlot(slot)}
                className={`py-2 px-3 rounded-md border text-sm font-medium transition-colors ${
                  selectedSlot === slot 
                    ? 'bg-primary text-primary-foreground border-primary' 
                    : 'bg-white hover:border-primary text-gray-700'
                }`}
              >
                {slot}
              </button>
            ))}
          </div>

          <div className="pt-4 mt-6 border-t flex justify-end gap-3">
            <Button variant="outline" onClick={() => setShowBookingDialog(false)}>Cancel</Button>
            <Button disabled={!selectedSlot} onClick={confirmBooking}>Confirm Booking</Button>
          </div>
        </div>
      </Dialog>
    </div>
  )
}
