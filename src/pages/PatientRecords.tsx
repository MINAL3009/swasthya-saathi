
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import VoiceAssistant from "@/components/VoiceAssistant";

const PatientRecords = () => {
  const [language, setLanguage] = useState("english");
  
  useEffect(() => {
    // Load language preference from localStorage
    const savedLanguage = localStorage.getItem("userLanguage");
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar userRole="patient" />
      
      <main className="flex-1 container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-6 text-medical-blue">My Medical Records</h1>
        
        <div className="grid gap-6 md:grid-cols-3">
          <div className="col-span-2 space-y-6">
            {/* Patient records display would go here */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Recent Records</h2>
              <p className="text-gray-500">You have no recent medical records.</p>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Language Settings</h2>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <input 
                    type="radio" 
                    id="english" 
                    name="language"
                    checked={language === "english"}
                    onChange={() => {
                      setLanguage("english");
                      localStorage.setItem("userLanguage", "english");
                    }}
                  />
                  <label htmlFor="english">English</label>
                </div>
                <div className="flex items-center space-x-2">
                  <input 
                    type="radio" 
                    id="hindi" 
                    name="language"
                    checked={language === "hindi"}
                    onChange={() => {
                      setLanguage("hindi");
                      localStorage.setItem("userLanguage", "hindi");
                    }}
                  />
                  <label htmlFor="hindi">हिंदी (Hindi)</label>
                </div>
                <div className="flex items-center space-x-2">
                  <input 
                    type="radio" 
                    id="marathi" 
                    name="language"
                    checked={language === "marathi"}
                    onChange={() => {
                      setLanguage("marathi");
                      localStorage.setItem("userLanguage", "marathi");
                    }}
                  />
                  <label htmlFor="marathi">मराठी (Marathi)</label>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Voice Assistant</h2>
              <p className="text-sm text-gray-600 mb-4">
                Use the voice assistant button in the bottom right corner to navigate the app using voice commands.
              </p>
              <p className="text-sm font-medium">Example commands:</p>
              <ul className="text-sm text-gray-600 list-disc pl-5 mt-2 space-y-1">
                <li>Show my medical records</li>
                <li>Go to appointments</li>
                <li>Show my reports</li>
                <li>Emergency help</li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* Voice Assistant Component */}
        <VoiceAssistant language={language} />
      </main>
      
      <Footer />
    </div>
  );
};

export default PatientRecords;
