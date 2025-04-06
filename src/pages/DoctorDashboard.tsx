
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Search, Bell, FileText, Calendar, User, Users } from "lucide-react";

// Sample data
const upcomingAppointments = [
  { id: 1, patient: "James Wilson", time: "9:00 AM", date: "Today", status: "confirmed" },
  { id: 2, patient: "Sarah Miller", time: "11:30 AM", date: "Today", status: "confirmed" },
  { id: 3, patient: "Robert Davis", time: "2:15 PM", date: "Today", status: "confirmed" },
  { id: 4, patient: "Emily Johnson", time: "10:00 AM", date: "Tomorrow", status: "pending" },
];

const recentPatients = [
  { id: 1, name: "James Wilson", age: 45, lastVisit: "2 days ago", condition: "Hypertension" },
  { id: 2, name: "Sarah Miller", age: 32, lastVisit: "1 week ago", condition: "Diabetes Type 2" },
  { id: 3, name: "Robert Davis", age: 58, lastVisit: "3 days ago", condition: "Arthritis" },
];

const DoctorDashboard = () => {
  const [selectedReportTab, setSelectedReportTab] = useState("reports");
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar userRole="doctor" />
      
      <main className="flex-1 py-8 bg-gray-50">
        <div className="container px-4 mx-auto md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-medical-blue">Doctor Dashboard</h1>
              <p className="text-gray-500">Welcome back, Dr. Michael Chen</p>
            </div>
            <div className="flex items-center gap-2 mt-4 md:mt-0">
              <Button className="bg-medical-blue">
                <Calendar className="mr-2 h-4 w-4" /> New Appointment
              </Button>
              <Button variant="outline">
                <Users className="mr-2 h-4 w-4" /> Add Patient
              </Button>
            </div>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Today's Appointments</p>
                    <p className="text-3xl font-bold text-medical-blue">8</p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-medical-light flex items-center justify-center text-medical-blue">
                    <Calendar className="h-6 w-6" />
                  </div>
                </div>
                <Progress value={75} className="h-2 mt-4" />
                <p className="text-xs text-gray-500 mt-2">75% of your daily capacity</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Total Patients</p>
                    <p className="text-3xl font-bold text-medical-teal">128</p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-medical-teal/20 flex items-center justify-center text-medical-teal">
                    <Users className="h-6 w-6" />
                  </div>
                </div>
                <Progress value={25} className="h-2 mt-4 bg-medical-teal/20" indicatorClassName="bg-medical-teal" />
                <p className="text-xs text-gray-500 mt-2">+3 new this week</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Pending Reports</p>
                    <p className="text-3xl font-bold text-medical-orange">5</p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-medical-orange/20 flex items-center justify-center text-medical-orange">
                    <FileText className="h-6 w-6" />
                  </div>
                </div>
                <Progress value={40} className="h-2 mt-4 bg-medical-orange/20" indicatorClassName="bg-medical-orange" />
                <p className="text-xs text-gray-500 mt-2">2 requiring urgent review</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Notifications</p>
                    <p className="text-3xl font-bold text-destructive">4</p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-destructive/20 flex items-center justify-center text-destructive">
                    <Bell className="h-6 w-6" />
                  </div>
                </div>
                <Progress value={100} className="h-2 mt-4 bg-destructive/20" indicatorClassName="bg-destructive" />
                <p className="text-xs text-gray-500 mt-2">4 unread messages</p>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <Card className="h-full">
                <CardHeader className="pb-2">
                  <CardTitle>Report Analysis</CardTitle>
                  <CardDescription>
                    AI-powered insights from recent patient reports
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs value={selectedReportTab} onValueChange={setSelectedReportTab}>
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="reports">Reports</TabsTrigger>
                      <TabsTrigger value="insights">AI Insights</TabsTrigger>
                      <TabsTrigger value="summary">Summary</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="reports" className="space-y-4 mt-4">
                      <div className="flex items-center justify-between pb-2 border-b">
                        <p className="font-medium">Patient Blood Work Reports</p>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm">
                            <Search className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            Filter
                          </Button>
                        </div>
                      </div>
                      
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="flex items-center p-3 rounded-lg hover:bg-gray-100">
                          <div className="flex-1">
                            <p className="font-medium">James Wilson - Complete Blood Count</p>
                            <p className="text-sm text-gray-500">Uploaded yesterday</p>
                          </div>
                          <Button variant="outline" size="sm">View</Button>
                        </div>
                      ))}
                      
                      <Button variant="ghost" className="w-full text-medical-blue">
                        View All Reports
                      </Button>
                    </TabsContent>
                    
                    <TabsContent value="insights" className="mt-4">
                      <Card>
                        <CardContent className="p-4 space-y-4">
                          <div className="p-3 rounded-lg bg-medical-light/50 border border-medical-light">
                            <p className="font-medium text-medical-blue">Abnormal Pattern Detected</p>
                            <p className="text-sm text-gray-600 mt-1">
                              AI analysis detected consistent elevation in patient James Wilson's HbA1c levels over the last 3 tests, suggesting potential prediabetic condition.
                            </p>
                            <div className="flex items-center gap-2 mt-2">
                              <Button variant="outline" size="sm">View Details</Button>
                              <Button className="bg-medical-blue" size="sm">Take Action</Button>
                            </div>
                          </div>
                          
                          <div className="p-3 rounded-lg border">
                            <p className="font-medium">Medication Interaction Warning</p>
                            <p className="text-sm text-gray-600 mt-1">
                              Potential interaction detected between Sarah Miller's current prescription and newly added medication.
                            </p>
                            <div className="flex items-center gap-2 mt-2">
                              <Button variant="outline" size="sm">Dismiss</Button>
                              <Button variant="destructive" size="sm">Review</Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>
                    
                    <TabsContent value="summary" className="mt-4">
                      <Card>
                        <CardContent className="p-4">
                          <div className="space-y-4">
                            <div>
                              <p className="font-medium">Weekly Summary</p>
                              <p className="text-sm text-gray-500">April 1 - April 7, 2025</p>
                            </div>
                            
                            <div className="space-y-2">
                              <div className="flex justify-between items-center">
                                <p className="text-sm">Reports Reviewed</p>
                                <p className="font-medium">18/20</p>
                              </div>
                              <Progress value={90} className="h-2" />
                            </div>
                            
                            <div className="space-y-2">
                              <div className="flex justify-between items-center">
                                <p className="text-sm">AI Insights Generated</p>
                                <p className="font-medium">15</p>
                              </div>
                              <Progress value={75} className="h-2" />
                            </div>
                            
                            <div className="space-y-2">
                              <div className="flex justify-between items-center">
                                <p className="text-sm">Actions Taken</p>
                                <p className="font-medium">12</p>
                              </div>
                              <Progress value={60} className="h-2" />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
            
            <div>
              <Card className="h-full">
                <CardHeader className="pb-2">
                  <CardTitle>Upcoming Appointments</CardTitle>
                  <CardDescription>
                    Schedule for today and tomorrow
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {upcomingAppointments.map((appointment) => (
                      <div 
                        key={appointment.id}
                        className="flex items-center p-3 rounded-lg hover:bg-gray-100"
                      >
                        <div className="w-2 h-2 rounded-full bg-medical-blue mr-3"></div>
                        <div className="flex-1">
                          <p className="font-medium">{appointment.patient}</p>
                          <div className="flex items-center text-sm text-gray-500">
                            <span>{appointment.time}</span>
                            <span className="mx-1">•</span>
                            <span>{appointment.date}</span>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">View</Button>
                      </div>
                    ))}
                    
                    <Button variant="outline" className="w-full">
                      <Calendar className="mr-2 h-4 w-4" /> View All
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <div className="mt-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Recent Patients</CardTitle>
                <CardDescription>
                  Patients you've seen recently
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left text-xs text-gray-500 border-b">
                        <th className="pb-2 font-medium">Patient</th>
                        <th className="pb-2 font-medium">Age</th>
                        <th className="pb-2 font-medium">Last Visit</th>
                        <th className="pb-2 font-medium">Condition</th>
                        <th className="pb-2 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentPatients.map((patient) => (
                        <tr key={patient.id} className="border-b">
                          <td className="py-3">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                                <User className="h-4 w-4 text-gray-500" />
                              </div>
                              <span className="font-medium">{patient.name}</span>
                            </div>
                          </td>
                          <td className="py-3">{patient.age}</td>
                          <td className="py-3">{patient.lastVisit}</td>
                          <td className="py-3">{patient.condition}</td>
                          <td className="py-3">
                            <div className="flex items-center gap-2">
                              <Button variant="ghost" size="sm">View</Button>
                              <Button variant="outline" size="sm">Records</Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="flex justify-center mt-4">
                  <Button variant="ghost" className="text-medical-blue">
                    <Users className="mr-2 h-4 w-4" /> View All Patients
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default DoctorDashboard;
