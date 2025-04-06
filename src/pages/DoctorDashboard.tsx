
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, FileText, MessageCircle, User, Users } from "lucide-react";

const DoctorDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-medical-dark">Doctor Dashboard</h1>
          <p className="text-gray-500">Welcome back, Dr. Johnson</p>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            April 6, 2025
          </Button>
          <Button className="bg-medical-blue flex items-center gap-2">
            <FileText className="h-4 w-4" />
            New Patient
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-4 lg:w-1/2">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="patients">Patients</TabsTrigger>
          <TabsTrigger value="appointments">Appointments</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-medical-light flex items-center justify-center text-medical-blue">
                    <Users className="h-6 w-6" />
                  </div>
                  <span className="text-sm font-semibold text-medical-blue">Today</span>
                </div>
                <h3 className="text-2xl font-bold">24</h3>
                <p className="text-gray-500">Total Patients</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-medical-light flex items-center justify-center text-medical-blue">
                    <Calendar className="h-6 w-6" />
                  </div>
                  <span className="text-sm font-semibold text-medical-blue">Today</span>
                </div>
                <h3 className="text-2xl font-bold">8</h3>
                <p className="text-gray-500">Appointments</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-medical-light flex items-center justify-center text-medical-blue">
                    <FileText className="h-6 w-6" />
                  </div>
                  <span className="text-sm font-semibold text-medical-blue">This Week</span>
                </div>
                <h3 className="text-2xl font-bold">15</h3>
                <p className="text-gray-500">Reports Analyzed</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-medical-light flex items-center justify-center text-medical-blue">
                    <MessageCircle className="h-6 w-6" />
                  </div>
                  <span className="text-sm font-semibold text-medical-blue">Pending</span>
                </div>
                <h3 className="text-2xl font-bold">7</h3>
                <p className="text-gray-500">Messages</p>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Today's Schedule</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="mt-1 w-10 h-10 rounded-full bg-medical-light flex items-center justify-center text-medical-blue flex-shrink-0">
                      <Clock className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium">9:00 AM - Sarah Williams</p>
                      <p className="text-sm text-gray-500">Annual Check-up</p>
                      <Progress value={75} className="h-2 mt-2" />
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="mt-1 w-10 h-10 rounded-full bg-medical-light flex items-center justify-center text-medical-blue flex-shrink-0">
                      <Clock className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium">10:30 AM - James Rodriguez</p>
                      <p className="text-sm text-gray-500">Follow-up Consultation</p>
                      <Progress value={40} className="h-2 mt-2" />
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="mt-1 w-10 h-10 rounded-full bg-medical-light flex items-center justify-center text-medical-blue flex-shrink-0">
                      <Clock className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium">2:00 PM - Lisa Chen</p>
                      <p className="text-sm text-gray-500">Pre-surgery Assessment</p>
                      <Progress value={10} className="h-2 mt-2" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="lg:col-span-2">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Recent Patient Activity</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="w-10 h-10 rounded-full bg-medical-blue flex items-center justify-center text-white flex-shrink-0">
                      <User className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <p className="font-medium">Robert Johnson</p>
                        <span className="text-sm text-gray-500">10 mins ago</span>
                      </div>
                      <p className="text-sm text-gray-600">Updated blood pressure readings</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="w-10 h-10 rounded-full bg-medical-blue flex items-center justify-center text-white flex-shrink-0">
                      <User className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <p className="font-medium">Emily Wilson</p>
                        <span className="text-sm text-gray-500">2 hours ago</span>
                      </div>
                      <p className="text-sm text-gray-600">Requested prescription renewal</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="w-10 h-10 rounded-full bg-medical-blue flex items-center justify-center text-white flex-shrink-0">
                      <User className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <p className="font-medium">Michael Lee</p>
                        <span className="text-sm text-gray-500">Yesterday</span>
                      </div>
                      <p className="text-sm text-gray-600">Uploaded lab test results</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="w-10 h-10 rounded-full bg-medical-blue flex items-center justify-center text-white flex-shrink-0">
                      <User className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <p className="font-medium">Sophia Garcia</p>
                        <span className="text-sm text-gray-500">Yesterday</span>
                      </div>
                      <p className="text-sm text-gray-600">Scheduled a follow-up appointment</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="patients" className="space-y-4">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Patient List</h2>
              <p className="text-gray-500">Patient management interface would be displayed here.</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="appointments" className="space-y-4">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Appointment Calendar</h2>
              <p className="text-gray-500">Calendar and appointment scheduling interface would be displayed here.</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Medical Reports Analysis</h2>
              <p className="text-gray-500">AI-powered medical report analysis tools would be displayed here.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DoctorDashboard;
