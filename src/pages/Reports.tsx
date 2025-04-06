
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Download, Eye, FileUp } from "lucide-react";
import VoiceAssistant from "@/components/VoiceAssistant";
import { toast } from "sonner";

const Reports = () => {
  const [userRole, setUserRole] = useState<"doctor" | "patient" | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [language, setLanguage] = useState("english");
  
  // Simulated reports data
  const reports = [
    {
      id: 1,
      title: "Blood Test Results",
      date: "2025-03-25",
      doctor: "Dr. Emily Chen",
      patientId: "P1001",
      patientName: "Rahul Sharma",
      category: "Laboratory",
      aiInsights: "Normal hemoglobin levels, slightly elevated white blood cell count.",
      status: "reviewed"
    },
    {
      id: 2,
      title: "Chest X-Ray Report",
      date: "2025-02-12",
      doctor: "Dr. Michael Patel",
      patientId: "P1003",
      patientName: "Amit Kumar",
      category: "Radiology",
      aiInsights: "No abnormalities detected. Lungs appear clear.",
      status: "reviewed"
    },
    {
      id: 3,
      title: "Cardiac Assessment",
      date: "2025-01-05",
      doctor: "Dr. Emily Chen",
      patientId: "P1005",
      patientName: "Vikram Mehta",
      category: "Cardiology",
      aiInsights: "Normal ECG pattern, healthy heart function.",
      status: "pending"
    }
  ];
  
  // Check user role from localStorage
  useEffect(() => {
    const storedRole = localStorage.getItem("userRole");
    if (storedRole === "doctor" || storedRole === "patient") {
      setUserRole(storedRole);
    }
    
    const storedLanguage = localStorage.getItem("userLanguage");
    if (storedLanguage) {
      setLanguage(storedLanguage);
    }
  }, []);
  
  // Filter reports based on search query and user role
  const filteredReports = reports.filter(report => {
    const matchesSearch = 
      report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.doctor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.patientName.toLowerCase().includes(searchQuery.toLowerCase());
    
    // If user is a patient, only show their reports (in a real app, would filter by actual user ID)
    if (userRole === "patient") {
      // Assuming patient is Rahul Sharma for demo purposes
      return matchesSearch && report.patientId === "P1001";
    }
    
    return matchesSearch;
  });

  const handleUploadReport = () => {
    toast.info("Opening report upload form");
    // In a real app, this would open a modal or navigate to upload page
  };

  const handleDownload = (reportId: number) => {
    toast.success(`Downloading report #${reportId}`);
    // In a real app, this would trigger a file download
  };

  const handleViewDetails = (reportId: number) => {
    toast.info(`Viewing details for report #${reportId}`);
    // In a real app, this would navigate to a detailed view
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar userRole={userRole} />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-medical-blue">Medical Reports</h1>
        
        <div className="flex flex-col md:flex-row mb-6 gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              type="search"
              placeholder="Search reports..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          {userRole === "doctor" && (
            <Button className="bg-medical-blue" onClick={handleUploadReport}>
              <FileUp className="h-4 w-4 mr-2" />
              Upload New Report
            </Button>
          )}
        </div>
        
        {filteredReports.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredReports.map(report => (
              <Card key={report.id} className="overflow-hidden">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{report.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Date:</span>
                      <span>{report.date}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Doctor:</span>
                      <span>{report.doctor}</span>
                    </div>
                    {userRole === "doctor" && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Patient:</span>
                        <span>{report.patientName}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Category:</span>
                      <span>{report.category}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Status:</span>
                      <span className={`px-2 py-0.5 rounded-full text-xs ${
                        report.status === 'reviewed' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {report.status === 'reviewed' ? 'Reviewed' : 'Pending Review'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="mt-4 p-3 bg-blue-50 rounded-md">
                    <p className="text-sm font-medium text-medical-blue mb-1">AI Insights:</p>
                    <p className="text-sm text-gray-600">{report.aiInsights}</p>
                  </div>
                  
                  <div className="mt-4 flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => handleViewDetails(report.id)}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      View Details
                    </Button>
                    <Button 
                      className="flex-1 bg-medical-blue" 
                      size="sm"
                      onClick={() => handleDownload(report.id)}
                    >
                      <Download className="h-4 w-4 mr-1" />
                      Download
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">No reports found matching your search criteria.</p>
          </div>
        )}
        
        {userRole === "patient" && (
          <VoiceAssistant language={language} />
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Reports;
