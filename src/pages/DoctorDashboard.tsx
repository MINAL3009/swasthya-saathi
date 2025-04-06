
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DoctorStatusIndicator from "@/components/DoctorStatusIndicator";
import RecordUploader from "@/components/RecordUploader";

const DoctorDashboard = () => {
  const [isOnline, setIsOnline] = useState(true);
  
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
              <h2 className="text-xl font-semibold mb-4">Recent Patient Activity</h2>
              {/* Patient activity would go here */}
              <p className="text-gray-500">No recent patient activity.</p>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Upcoming Appointments</h2>
              {/* Appointments would go here */}
              <p className="text-gray-500">No upcoming appointments.</p>
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
