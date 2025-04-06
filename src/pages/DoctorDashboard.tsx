
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DoctorStatusIndicator from "@/components/DoctorStatusIndicator";
import RecordUploader from "@/components/RecordUploader";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Eye, FileUp } from "lucide-react";
import { Link } from "react-router-dom";

// Sample patient data
const patientData = [
  {
    id: "P1001",
    name: "Rahul Sharma",
    age: 45,
    gender: "Male",
    lastVisit: "2025-03-15",
    condition: "Hypertension",
    status: "Stable"
  },
  {
    id: "P1002",
    name: "Priya Patel",
    age: 32,
    gender: "Female",
    lastVisit: "2025-03-22",
    condition: "Pregnancy (2nd trimester)",
    status: "Follow-up scheduled"
  },
  {
    id: "P1003",
    name: "Amit Kumar",
    age: 58,
    gender: "Male",
    lastVisit: "2025-04-01",
    condition: "Type 2 Diabetes",
    status: "Needs monitoring"
  },
  {
    id: "P1004",
    name: "Sanjana Singh",
    age: 27,
    gender: "Female",
    lastVisit: "2025-03-18",
    condition: "Migraine",
    status: "Improved"
  },
  {
    id: "P1005",
    name: "Vikram Mehta",
    age: 62,
    gender: "Male",
    lastVisit: "2025-03-30",
    condition: "Post cardiac surgery",
    status: "Recovering"
  }
];

const DoctorDashboard = () => {
  const [isOnline, setIsOnline] = useState(true);
  const [upcomingAppointments, setUpcomingAppointments] = useState([
    {
      id: "A1001",
      patientName: "Priya Patel",
      patientId: "P1002",
      date: "2025-04-10",
      time: "10:30 AM",
      reason: "Follow-up: Pregnancy"
    },
    {
      id: "A1002",
      patientName: "Vikram Mehta",
      patientId: "P1005",
      date: "2025-04-12",
      time: "2:15 PM",
      reason: "Post-surgery checkup"
    }
  ]);
  
  useEffect(() => {
    // Initialize online status
    setIsOnline(navigator.onLine);
    
    // Check stored preference
    const storedStatus = localStorage.getItem("doctorOnlineStatus");
    if (storedStatus === "offline") {
      setIsOnline(false);
    }
    
    const handleOnlineStatusChange = () => {
      setIsOnline(navigator.onLine);
    };
    
    window.addEventListener("online", handleOnlineStatusChange);
    window.addEventListener("offline", handleOnlineStatusChange);
    
    return () => {
      window.removeEventListener("online", handleOnlineStatusChange);
      window.removeEventListener("offline", handleOnlineStatusChange);
    };
  }, []);

  const handleViewPatientRecords = (patientId: string) => {
    toast.info(`Viewing records for patient ${patientId}`);
    // In a real app, navigate to patient records
  };

  const handleUploadRecord = (patientId: string) => {
    toast.info(`Uploading record for patient ${patientId}`);
    // In a real app, open record upload modal for specific patient
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar userRole="doctor" />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-medical-blue">Doctor Dashboard</h1>
          <DoctorStatusIndicator />
        </div>
        
        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Patient List</h2>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Age</TableHead>
                      <TableHead>Condition</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {patientData.map((patient) => (
                      <TableRow key={patient.id}>
                        <TableCell className="font-medium">{patient.id}</TableCell>
                        <TableCell>{patient.name}</TableCell>
                        <TableCell>{patient.age}</TableCell>
                        <TableCell>{patient.condition}</TableCell>
                        <TableCell>{patient.status}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleViewPatientRecords(patient.id)}
                            >
                              <Eye className="h-4 w-4 mr-1" />
                              View
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleUploadRecord(patient.id)}
                            >
                              <FileUp className="h-4 w-4 mr-1" />
                              Upload
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Upcoming Appointments</h2>
              {upcomingAppointments.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Patient</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead>Reason</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {upcomingAppointments.map((appointment) => (
                      <TableRow key={appointment.id}>
                        <TableCell>{appointment.patientName}</TableCell>
                        <TableCell>{appointment.date}</TableCell>
                        <TableCell>{appointment.time}</TableCell>
                        <TableCell>{appointment.reason}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <p className="text-gray-500">No upcoming appointments.</p>
              )}
            </div>
          </div>
          
          <div className="space-y-6">
            <RecordUploader isOnline={isOnline} />
            
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Offline Mode</h2>
              <p className="text-sm text-gray-600 mb-3">
                When working offline, your data will be stored locally. Once you're back online, all data will be synchronized with the cloud automatically.
              </p>
              
              <h3 className="text-lg font-medium mt-4 mb-2">Offline Features:</h3>
              <ul className="text-sm text-gray-600 list-disc pl-5 space-y-1">
                <li>View patient records (previously loaded)</li>
                <li>Create new medical records</li>
                <li>Update patient information</li>
                <li>Write prescriptions</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default DoctorDashboard;
