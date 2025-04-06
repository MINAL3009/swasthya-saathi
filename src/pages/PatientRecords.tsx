
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import VoiceAssistant from "@/components/VoiceAssistant";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Download, Eye } from "lucide-react";

const PatientRecords = () => {
  const [language, setLanguage] = useState("english");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Sample records data
  const records = [
    {
      id: "R1001",
      title: "Annual Health Checkup",
      date: "2025-02-15",
      doctor: "Dr. Emily Chen",
      type: "Physical Examination",
      notes: "Overall health is good. Blood pressure is slightly elevated. Recommended lifestyle changes and follow-up in 3 months."
    },
    {
      id: "R1002",
      title: "COVID-19 Vaccination",
      date: "2025-01-10",
      doctor: "Dr. Michael Patel",
      type: "Vaccination",
      notes: "Received 1st dose of COVID-19 vaccine. No adverse reactions observed. Next dose scheduled for February 7, 2025."
    },
    {
      id: "R1003",
      title: "Blood Test Results",
      date: "2024-12-05",
      doctor: "Dr. Emily Chen",
      type: "Laboratory Test",
      notes: "Complete blood count within normal range. Cholesterol levels slightly elevated - recommended dietary changes."
    }
  ];
  
  useEffect(() => {
    // Load language preference from localStorage
    const savedLanguage = localStorage.getItem("userLanguage");
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);
  
  // Filter records based on search query
  const filteredRecords = records.filter(record => 
    record.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    record.doctor.toLowerCase().includes(searchQuery.toLowerCase()) ||
    record.type.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Language selection handler
  const handleLanguageChange = (selectedLanguage: string) => {
    setLanguage(selectedLanguage);
    localStorage.setItem("userLanguage", selectedLanguage);
  };
  
  // Translations for UI elements
  const translations = {
    english: {
      title: "My Medical Records",
      search: "Search records...",
      language: "Language Settings",
      noRecords: "No records found matching your search criteria.",
      viewDetails: "View Details",
      download: "Download",
      date: "Date",
      doctor: "Doctor",
      type: "Type",
      voiceAssistant: "Voice Assistant",
      voiceHelp: "Use the voice assistant button in the bottom right corner to navigate the app using voice commands.",
      exampleCommands: "Example commands:",
      commands: [
        "Show my medical records",
        "Go to appointments",
        "Show my reports",
        "Emergency help",
        "Go to home page"
      ]
    },
    hindi: {
      title: "मेरे मेडिकल रिकॉर्ड",
      search: "रिकॉर्ड खोजें...",
      language: "भाषा सेटिंग्स",
      noRecords: "आपके खोज मापदंड से मेल खाने वाला कोई रिकॉर्ड नहीं मिला।",
      viewDetails: "विवरण देखें",
      download: "डाउनलोड करें",
      date: "तारीख",
      doctor: "डॉक्टर",
      type: "प्रकार",
      voiceAssistant: "वॉइस असिस्टेंट",
      voiceHelp: "ऐप में नेविगेट करने के लिए नीचे दाईं ओर के वॉइस असिस्टेंट बटन का उपयोग करें।",
      exampleCommands: "उदाहरण कमांड:",
      commands: [
        "मेरे मेडिकल रिकॉर्ड दिखाओ",
        "अपॉइंटमेंट पर जाओ",
        "मेरी रिपोर्ट दिखाओ",
        "इमरजेंसी हेल्प",
        "होम पेज पर जाओ"
      ]
    },
    marathi: {
      title: "माझे वैद्यकीय रेकॉर्ड",
      search: "रेकॉर्ड शोधा...",
      language: "भाषा सेटिंग्स",
      noRecords: "तुमच्या शोध निकषांशी जुळणारे कोणतेही रेकॉर्ड आढळले नाही.",
      viewDetails: "तपशील पहा",
      download: "डाउनलोड करा",
      date: "तारीख",
      doctor: "डॉक्टर",
      type: "प्रकार",
      voiceAssistant: "व्हॉइस असिस्टंट",
      voiceHelp: "अ‍ॅपमध्ये नेव्हिगेट करण्यासाठी खाली उजव्या कोपऱ्यातील व्हॉइस असिस्टंट बटणाचा वापर करा.",
      exampleCommands: "उदाहरण कमांड:",
      commands: [
        "माझे मेडिकल रेकॉर्ड दाखवा",
        "अपॉइंटमेंट वर जा",
        "माझे रिपोर्ट दाखवा",
        "इमर्जन्सी मदत",
        "होम पेज वर जा"
      ]
    }
  };
  
  // Get current translation based on selected language
  const t = translations[language as keyof typeof translations] || translations.english;
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar userRole="patient" />
      
      <main className="flex-1 container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-6 text-medical-blue">{t.title}</h1>
        
        <div className="grid gap-6 md:grid-cols-3">
          <div className="col-span-2 space-y-6">
            <div className="mb-6">
              <div className="relative flex w-full max-w-sm">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <Input
                  type="search"
                  placeholder={t.search}
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            
            {filteredRecords.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2">
                {filteredRecords.map((record) => (
                  <Card key={record.id}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{record.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">{t.date}:</span>
                          <span>{record.date}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">{t.doctor}:</span>
                          <span>{record.doctor}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">{t.type}:</span>
                          <span>{record.type}</span>
                        </div>
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-4 line-clamp-2">{record.notes}</p>
                      
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          <Eye className="h-4 w-4 mr-1" />
                          {t.viewDetails}
                        </Button>
                        <Button className="flex-1 bg-medical-blue" size="sm">
                          <Download className="h-4 w-4 mr-1" />
                          {t.download}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500">{t.noRecords}</p>
              </div>
            )}
          </div>
          
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">{t.language}</h2>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <input 
                    type="radio" 
                    id="english" 
                    name="language"
                    checked={language === "english"}
                    onChange={() => handleLanguageChange("english")}
                  />
                  <label htmlFor="english">English</label>
                </div>
                <div className="flex items-center space-x-2">
                  <input 
                    type="radio" 
                    id="hindi" 
                    name="language"
                    checked={language === "hindi"}
                    onChange={() => handleLanguageChange("hindi")}
                  />
                  <label htmlFor="hindi">हिंदी (Hindi)</label>
                </div>
                <div className="flex items-center space-x-2">
                  <input 
                    type="radio" 
                    id="marathi" 
                    name="language"
                    checked={language === "marathi"}
                    onChange={() => handleLanguageChange("marathi")}
                  />
                  <label htmlFor="marathi">मराठी (Marathi)</label>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">{t.voiceAssistant}</h2>
              <p className="text-sm text-gray-600 mb-4">
                {t.voiceHelp}
              </p>
              <p className="text-sm font-medium">{t.exampleCommands}</p>
              <ul className="text-sm text-gray-600 list-disc pl-5 mt-2 space-y-1">
                {t.commands.map((command, index) => (
                  <li key={index}>{command}</li>
                ))}
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
