
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FeatureCard from "@/components/FeatureCard";
import { Search, Bell, Book, Calendar, FileText, Shield, Smartphone, User } from "lucide-react";

const Home = () => {
  const [userRole, setUserRole] = useState<"doctor" | "patient" | null>(null);
  const navigate = useNavigate();
  
  const handlePortalSelect = (role: "doctor" | "patient") => {
    setUserRole(role);
    navigate("/login", { state: { role } });
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar userRole={userRole} />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-12 overflow-hidden bg-gradient-to-r from-medical-light to-white md:py-20">
          <div className="container px-4 mx-auto md:px-6">
            <div className="grid gap-6 md:grid-cols-2 md:gap-12 items-center">
              <div className="space-y-4">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-medical-dark">
                  AI-Powered Healthcare Management for Everyone
                </h1>
                <p className="max-w-[600px] text-gray-500 md:text-xl">
                  Connecting doctors and patients through innovative AI solutions for better diagnosis, treatment, and care.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <Link to="/register">
                    <Button className="bg-medical-blue hover:bg-medical-dark" size="lg">
                      Get Started
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="relative flex items-center justify-center">
                <div className="relative w-full h-[350px] p-4 overflow-hidden rounded-lg md:p-0">
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-medical-blue/20 to-medical-teal/20 backdrop-blur-sm flex items-center justify-center">
                    <Tabs defaultValue="doctor" className="w-[350px]">
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="doctor" onClick={() => setUserRole("doctor")}>Doctor</TabsTrigger>
                        <TabsTrigger value="patient" onClick={() => setUserRole("patient")}>Patient</TabsTrigger>
                      </TabsList>
                      <TabsContent value="doctor" className="p-4">
                        <Card>
                          <CardContent className="p-4 space-y-4">
                            <div className="space-y-2">
                              <h3 className="text-xl font-medium">Doctor Portal</h3>
                              <p className="text-sm text-gray-500">Access your patient records, appointments, and AI analysis tools.</p>
                            </div>
                            <div className="grid gap-2">
                              <Button className="w-full bg-medical-blue" onClick={() => handlePortalSelect("doctor")}>
                                Login as Doctor
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      </TabsContent>
                      <TabsContent value="patient" className="p-4">
                        <Card>
                          <CardContent className="p-4 space-y-4">
                            <div className="space-y-2">
                              <h3 className="text-xl font-medium">Patient Portal</h3>
                              <p className="text-sm text-gray-500">Manage your medical records, appointments, and treatment plans.</p>
                            </div>
                            <div className="grid gap-2">
                              <Button className="w-full bg-medical-teal" onClick={() => handlePortalSelect("patient")}>
                                Login as Patient
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      </TabsContent>
                    </Tabs>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-12 bg-gray-50 md:py-20">
          <div className="container px-4 mx-auto md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl text-medical-blue">
                  Powerful Features
                </h2>
                <p className="max-w-[700px] text-gray-500 md:text-xl">
                  Our platform provides advanced tools for healthcare professionals and patients alike.
                </p>
              </div>
            </div>
            <div className="grid gap-6 mt-12 md:grid-cols-2 lg:grid-cols-3">
              <FeatureCard
                icon={<Shield className="w-6 h-6" />}
                title="Secure, Role-Based Access"
                description="Separate interfaces for doctors and patients with secure authentication and authorization."
              />
              <FeatureCard
                icon={<Search className="w-6 h-6" />}
                title="AI-Powered Analysis"
                description="Advanced artificial intelligence to analyze medical reports and highlight key insights."
              />
              <FeatureCard
                icon={<Smartphone className="w-6 h-6" />}
                title="Offline Capabilities"
                description="Access and input data even without internet, with automatic synchronization when connection returns."
              />
              <FeatureCard
                icon={<Book className="w-6 h-6" />}
                title="Comprehensive Records"
                description="Organized categorization of medical records, prescriptions, treatments, and allergies."
              />
              <FeatureCard
                icon={<Calendar className="w-6 h-6" />}
                title="Appointment Management"
                description="Effortlessly track appointments, treatment schedules, and receive timely reminders."
              />
              <FeatureCard
                icon={<Bell className="w-6 h-6" />}
                title="Emergency Access"
                description="One-tap access to critical health information during emergency situations."
              />
            </div>
          </div>
        </section>
        
        {/* Testimonials Section */}
        <section className="py-12 md:py-20">
          <div className="container px-4 mx-auto md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl text-medical-blue">
                  Trusted by Healthcare Professionals
                </h2>
                <p className="max-w-[700px] text-gray-500 md:text-xl">
                  See what doctors and patients are saying about Swasthya Saathi.
                </p>
              </div>
            </div>
            <div className="grid gap-6 mt-12 md:grid-cols-2 lg:grid-cols-3">
              <Card className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-medical-blue flex items-center justify-center text-white">
                      <User className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium">Dr. Emily Chen</h3>
                      <p className="text-sm text-gray-500">Cardiologist</p>
                    </div>
                  </div>
                  <p className="italic text-gray-600">
                    "The AI analysis has helped me identify patterns in patient data that I might have missed. It's like having an extra set of eyes on every case."
                  </p>
                </CardContent>
              </Card>
              <Card className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-medical-teal flex items-center justify-center text-white">
                      <User className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium">James Wilson</h3>
                      <p className="text-sm text-gray-500">Patient</p>
                    </div>
                  </div>
                  <p className="italic text-gray-600">
                    "Having all my medical records in one place has been life-changing. The emergency access feature gives me peace of mind knowing my information is accessible when needed."
                  </p>
                </CardContent>
              </Card>
              <Card className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-medical-orange flex items-center justify-center text-white">
                      <User className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium">Dr. Michael Patel</h3>
                      <p className="text-sm text-gray-500">Neurologist</p>
                    </div>
                  </div>
                  <p className="italic text-gray-600">
                    "The multilingual features have been invaluable for my diverse patient base. Communication barriers are significantly reduced, leading to better outcomes."
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-12 bg-medical-blue md:py-20">
          <div className="container px-4 mx-auto text-center md:px-6">
            <div className="max-w-[800px] mx-auto space-y-6">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl text-white">
                Ready to Revolutionize Your Healthcare Experience?
              </h2>
              <p className="text-medical-light md:text-xl">
                Join thousands of healthcare professionals and patients already benefiting from Swasthya Saathi.
              </p>
              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link to="/register">
                  <Button className="w-full sm:w-auto bg-white text-medical-blue hover:bg-medical-light" size="lg">
                    Sign Up Now
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button variant="outline" className="w-full sm:w-auto border-white text-white hover:bg-white/10" size="lg">
                    Contact Sales
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Home;
