
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EmergencyAccess from "@/components/EmergencyAccess";
import { FileText, Search, Calendar, Clock, Plus, FilePlus, Download } from "lucide-react";

// Sample data
const medicalRecords = [
  { id: 1, type: "Prescription", title: "Hypertension Medication", doctor: "Dr. Michael Chen", date: "Mar 15, 2025", status: "active" },
  { id: 2, type: "Lab Report", title: "Complete Blood Count", doctor: "Dr. Emily Rodriguez", date: "Feb 28, 2025", status: "completed" },
  { id: 3, type: "Diagnosis", title: "Annual Physical Examination", doctor: "Dr. Michael Chen", date: "Jan 10, 2025", status: "completed" },
  { id: 4, type: "Prescription", title: "Cholesterol Medication", doctor: "Dr. Michael Chen", date: "Dec 5, 2024", status: "active" },
  { id: 5, type: "Lab Report", title: "Lipid Panel", doctor: "Dr. Emily Rodriguez", date: "Nov 20, 2024", status: "completed" },
];

const appointments = [
  { id: 1, doctor: "Dr. Michael Chen", specialty: "Cardiology", date: "Apr 15, 2025", time: "10:30 AM", status: "upcoming" },
  { id: 2, doctor: "Dr. Emily Rodriguez", specialty: "General Practice", date: "May 5, 2025", time: "2:00 PM", status: "upcoming" },
  { id: 3, doctor: "Dr. Michael Chen", specialty: "Cardiology", date: "Mar 10, 2025", time: "11:00 AM", status: "completed" },
];

const PatientRecords = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredRecords = medicalRecords.filter(
    (record) => record.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                record.type.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar userRole="patient" />
      
      <main className="flex-1 py-8 bg-gray-50">
        <div className="container px-4 mx-auto md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-medical-teal">My Medical Records</h1>
              <p className="text-gray-500">All your health information in one place</p>
            </div>
            <div className="flex items-center gap-2 mt-4 md:mt-0">
              <Button className="bg-medical-teal">
                <FilePlus className="mr-2 h-4 w-4" /> Upload Record
              </Button>
              <EmergencyAccess />
            </div>
          </div>
          
          <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-4 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Active Prescriptions</p>
                    <p className="text-3xl font-bold text-medical-blue">2</p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-medical-light flex items-center justify-center text-medical-blue">
                    <FileText className="h-6 w-6" />
                  </div>
                </div>
                <Button variant="ghost" className="w-full mt-4 text-medical-blue">View All</Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Upcoming Appointments</p>
                    <p className="text-3xl font-bold text-medical-teal">2</p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-medical-teal/20 flex items-center justify-center text-medical-teal">
                    <Calendar className="h-6 w-6" />
                  </div>
                </div>
                <Button variant="ghost" className="w-full mt-4 text-medical-teal">View All</Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Recent Reports</p>
                    <p className="text-3xl font-bold text-medical-orange">3</p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-medical-orange/20 flex items-center justify-center text-medical-orange">
                    <FileText className="h-6 w-6" />
                  </div>
                </div>
                <Button variant="ghost" className="w-full mt-4 text-medical-orange">View All</Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Medication Reminders</p>
                    <p className="text-3xl font-bold text-medical-blue">4</p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-medical-blue/20 flex items-center justify-center text-medical-blue">
                    <Clock className="h-6 w-6" />
                  </div>
                </div>
                <Button variant="ghost" className="w-full mt-4 text-medical-blue">View All</Button>
              </CardContent>
            </Card>
          </div>
          
          <Tabs defaultValue="records" className="w-full">
            <TabsList className="w-full max-w-md mx-auto grid grid-cols-3 mb-6">
              <TabsTrigger value="records">Records</TabsTrigger>
              <TabsTrigger value="appointments">Appointments</TabsTrigger>
              <TabsTrigger value="analysis">AI Analysis</TabsTrigger>
            </TabsList>
            
            <TabsContent value="records">
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                    <div>
                      <CardTitle>Medical Records</CardTitle>
                      <CardDescription>View and manage all your medical records</CardDescription>
                    </div>
                    <div className="relative w-full md:w-64">
                      <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                      <Input
                        placeholder="Search records..."
                        className="pl-8"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {filteredRecords.length > 0 ? (
                      filteredRecords.map((record) => (
                        <div 
                          key={record.id}
                          className="flex flex-col md:flex-row md:items-center justify-between p-4 rounded-lg border hover:bg-gray-50"
                        >
                          <div className="flex items-start md:items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-medical-light flex items-center justify-center text-medical-blue">
                              <FileText className="h-5 w-5" />
                            </div>
                            <div>
                              <p className="font-medium">{record.title}</p>
                              <div className="flex flex-col md:flex-row md:items-center text-sm text-gray-500 gap-1 md:gap-2">
                                <span>{record.type}</span>
                                <span className="hidden md:inline">•</span>
                                <span>{record.doctor}</span>
                                <span className="hidden md:inline">•</span>
                                <span>{record.date}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 mt-4 md:mt-0">
                            <Button variant="outline" size="sm">
                              <Download className="mr-2 h-4 w-4" /> Download
                            </Button>
                            <Button size="sm" className="bg-medical-blue">View</Button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-gray-500">No records found matching "{searchQuery}"</p>
                        <Button variant="outline" className="mt-4" onClick={() => setSearchQuery("")}>
                          Clear Search
                        </Button>
                      </div>
                    )}
                    
                    {searchQuery === "" && filteredRecords.length > 0 && (
                      <Button variant="outline" className="w-full">Load More</Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="appointments">
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                    <div>
                      <CardTitle>Your Appointments</CardTitle>
                      <CardDescription>Manage your upcoming and past appointments</CardDescription>
                    </div>
                    <Button className="bg-medical-teal">
                      <Plus className="mr-2 h-4 w-4" /> Schedule Appointment
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex flex-col md:flex-row gap-4">
                      <Card className="flex-1">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg">Upcoming</CardTitle>
                        </CardHeader>
                        <CardContent>
                          {appointments
                            .filter((apt) => apt.status === "upcoming")
                            .map((appointment) => (
                              <div 
                                key={appointment.id}
                                className="flex flex-col md:flex-row md:items-center justify-between p-4 rounded-lg border mb-4 hover:bg-gray-50"
                              >
                                <div>
                                  <p className="font-medium">{appointment.doctor}</p>
                                  <p className="text-sm text-gray-500">{appointment.specialty}</p>
                                  <div className="flex items-center text-sm text-medical-teal mt-1">
                                    <Calendar className="mr-1 h-3 w-3" />
                                    <span>{appointment.date}</span>
                                    <span className="mx-1">•</span>
                                    <Clock className="mr-1 h-3 w-3" />
                                    <span>{appointment.time}</span>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2 mt-4 md:mt-0">
                                  <Button variant="outline" size="sm">Reschedule</Button>
                                  <Button size="sm" className="bg-medical-teal">View</Button>
                                </div>
                              </div>
                            ))}
                        </CardContent>
                      </Card>
                      
                      <Card className="flex-1">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg">Past</CardTitle>
                        </CardHeader>
                        <CardContent>
                          {appointments
                            .filter((apt) => apt.status === "completed")
                            .map((appointment) => (
                              <div 
                                key={appointment.id}
                                className="flex flex-col md:flex-row md:items-center justify-between p-4 rounded-lg border mb-4 hover:bg-gray-50"
                              >
                                <div>
                                  <p className="font-medium">{appointment.doctor}</p>
                                  <p className="text-sm text-gray-500">{appointment.specialty}</p>
                                  <div className="flex items-center text-sm text-gray-500 mt-1">
                                    <Calendar className="mr-1 h-3 w-3" />
                                    <span>{appointment.date}</span>
                                    <span className="mx-1">•</span>
                                    <Clock className="mr-1 h-3 w-3" />
                                    <span>{appointment.time}</span>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2 mt-4 md:mt-0">
                                  <Button variant="outline" size="sm">Rate</Button>
                                  <Button size="sm" className="bg-medical-blue">View</Button>
                                </div>
                              </div>
                            ))}
                        </CardContent>
                      </Card>
                    </div>
                    
                    <Button variant="outline" className="w-full">View All Appointments</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="analysis">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>AI Health Analysis</CardTitle>
                  <CardDescription>
                    Personalized insights based on your medical records
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="p-6 rounded-lg bg-medical-light/50 border border-medical-light mb-6">
                    <h3 className="text-xl font-semibold text-medical-blue mb-2">Your Health Summary</h3>
                    <p className="text-gray-600 mb-4">
                      Based on your recent lab results and medical history, our AI has generated the following insights:
                    </p>
                    
                    <div className="space-y-4">
                      <div className="p-3 rounded-lg bg-white border">
                        <div className="flex items-start gap-2">
                          <div className="w-8 h-8 rounded-full bg-medical-blue/20 flex items-center justify-center text-medical-blue mt-0.5">
                            <FileText className="h-4 w-4" />
                          </div>
                          <div>
                            <p className="font-medium">Cholesterol Levels</p>
                            <p className="text-sm text-gray-600">
                              Your LDL cholesterol has decreased by 15% since your last test, showing good progress. Continue with your current medication and diet plan.
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-3 rounded-lg bg-white border">
                        <div className="flex items-start gap-2">
                          <div className="w-8 h-8 rounded-full bg-medical-orange/20 flex items-center justify-center text-medical-orange mt-0.5">
                            <FileText className="h-4 w-4" />
                          </div>
                          <div>
                            <p className="font-medium">Blood Pressure Trend</p>
                            <p className="text-sm text-gray-600">
                              Your blood pressure readings show slight variations throughout the day. Consider monitoring at consistent times for more accurate tracking.
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-3 rounded-lg bg-white border">
                        <div className="flex items-start gap-2">
                          <div className="w-8 h-8 rounded-full bg-medical-teal/20 flex items-center justify-center text-medical-teal mt-0.5">
                            <FileText className="h-4 w-4" />
                          </div>
                          <div>
                            <p className="font-medium">Exercise Impact</p>
                            <p className="text-sm text-gray-600">
                              Your increased physical activity correlates with improved blood glucose levels. Maintaining your current exercise routine is recommended.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <Button className="w-full mt-6 bg-medical-blue">View Complete Health Report</Button>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <Card>
                      <CardContent className="p-4">
                        <h3 className="font-semibold mb-2">Medication Adherence</h3>
                        <p className="text-sm text-gray-600 mb-4">
                          Based on your prescription refill history, you've maintained 95% adherence to your medication schedule.
                        </p>
                        <Button variant="outline" className="w-full">View Details</Button>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardContent className="p-4">
                        <h3 className="font-semibold mb-2">Appointment Recommendations</h3>
                        <p className="text-sm text-gray-600 mb-4">
                          Our AI suggests scheduling your annual eye exam within the next 30 days.
                        </p>
                        <Button variant="outline" className="w-full">Schedule Now</Button>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PatientRecords;
