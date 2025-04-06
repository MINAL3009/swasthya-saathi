
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { toast } from "sonner";
import VoiceAssistant from "@/components/VoiceAssistant";

const Appointments = () => {
  const [userRole, setUserRole] = useState<"doctor" | "patient" | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [language, setLanguage] = useState("english");
  
  // Simulated appointments data
  const appointments = [
    {
      id: 1,
      patientName: "John Smith",
      doctorName: "Dr. Emily Chen",
      date: new Date(2025, 3, 10, 10, 30),
      status: "confirmed",
      type: "Follow-up"
    },
    {
      id: 2,
      patientName: "Maria Garcia",
      doctorName: "Dr. Michael Patel",
      date: new Date(2025, 3, 12, 14, 15),
      status: "pending",
      type: "Consultation"
    }
  ];
  
  // Check user role from localStorage
  useState(() => {
    const storedRole = localStorage.getItem("userRole");
    if (storedRole === "doctor" || storedRole === "patient") {
      setUserRole(storedRole);
    }
    
    const storedLanguage = localStorage.getItem("userLanguage");
    if (storedLanguage) {
      setLanguage(storedLanguage);
    }
  });
  
  const handleCreateAppointment = () => {
    toast.success("Appointment scheduling functionality coming soon!");
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar userRole={userRole} />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-medical-blue">Appointments</h1>
        
        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Appointments</CardTitle>
              </CardHeader>
              <CardContent>
                {appointments.length > 0 ? (
                  <div className="space-y-4">
                    {appointments.map((appointment) => (
                      <div key={appointment.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium">
                              {userRole === "doctor" 
                                ? `Patient: ${appointment.patientName}` 
                                : `Doctor: ${appointment.doctorName}`}
                            </p>
                            <p className="text-sm text-gray-500">
                              {appointment.date.toLocaleDateString()} at {appointment.date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                            </p>
                            <p className="text-sm text-gray-500">Type: {appointment.type}</p>
                          </div>
                          <div className="flex flex-col items-end">
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              appointment.status === 'confirmed' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-amber-100 text-amber-800'
                            }`}>
                              {appointment.status === 'confirmed' ? 'Confirmed' : 'Pending'}
                            </span>
                            <div className="mt-2 flex gap-2">
                              <Button variant="outline" size="sm">Reschedule</Button>
                              <Button variant="destructive" size="sm">Cancel</Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No appointments scheduled.</p>
                    <Button 
                      onClick={handleCreateAppointment}
                      className="mt-4 bg-medical-blue"
                    >
                      Schedule New Appointment
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
          
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Calendar</CardTitle>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="border rounded-md"
                />
                
                <Button
                  className="w-full mt-4 bg-medical-blue"
                  onClick={handleCreateAppointment}
                >
                  Book Appointment
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {userRole === "patient" && (
          <VoiceAssistant language={language} />
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Appointments;
