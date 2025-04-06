
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { toast } from "sonner";

const Register = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [uid, setUid] = useState("");
  
  const handleRegister = (role: "doctor" | "patient") => {
    setIsLoading(true);
    
    if (role === "doctor" && !uid) {
      toast.error("Please enter your doctor UID for verification");
      setIsLoading(false);
      return;
    }
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast.success(`Registered successfully as ${role}`);
      navigate("/login");
    }, 1500);
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar userRole={null} />
      
      <main className="flex-1 flex items-center justify-center py-12 bg-gray-50">
        <div className="w-full max-w-md px-4">
          <Tabs defaultValue="doctor" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="doctor">Doctor</TabsTrigger>
              <TabsTrigger value="patient">Patient</TabsTrigger>
            </TabsList>
            
            <TabsContent value="doctor">
              <Card>
                <CardHeader className="space-y-1">
                  <CardTitle className="text-2xl text-center">Doctor Registration</CardTitle>
                  <CardDescription className="text-center">
                    Create an account to access the doctor portal
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="doctor-first-name">First Name</Label>
                      <Input id="doctor-first-name" placeholder="John" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="doctor-last-name">Last Name</Label>
                      <Input id="doctor-last-name" placeholder="Doe" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="doctor-email">Email</Label>
                    <Input id="doctor-email" type="email" placeholder="doctor@example.com" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="doctor-specialty">Specialty</Label>
                    <Select>
                      <SelectTrigger id="doctor-specialty">
                        <SelectValue placeholder="Select specialty" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cardiology">Cardiology</SelectItem>
                        <SelectItem value="dermatology">Dermatology</SelectItem>
                        <SelectItem value="neurology">Neurology</SelectItem>
                        <SelectItem value="orthopedics">Orthopedics</SelectItem>
                        <SelectItem value="pediatrics">Pediatrics</SelectItem>
                        <SelectItem value="psychiatry">Psychiatry</SelectItem>
                        <SelectItem value="general">General Practice</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="doctor-password">Password</Label>
                    <Input id="doctor-password" type="password" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="doctor-uid">Doctor UID (Required for verification)</Label>
                    <Input 
                      id="doctor-uid" 
                      placeholder="Enter your Doctor UID" 
                      value={uid}
                      onChange={(e) => setUid(e.target.value)}
                      required
                    />
                    <p className="text-xs text-gray-500">
                      Your Doctor UID is provided by the medical board and is required for verification.
                    </p>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col">
                  <Button 
                    className="w-full bg-medical-blue" 
                    onClick={() => handleRegister("doctor")}
                    disabled={isLoading}
                  >
                    {isLoading ? "Registering..." : "Register"}
                  </Button>
                  <p className="mt-4 text-center text-sm text-gray-500">
                    Already have an account?{" "}
                    <Link to="/login" className="text-medical-blue hover:underline">
                      Login
                    </Link>
                  </p>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="patient">
              <Card>
                <CardHeader className="space-y-1">
                  <CardTitle className="text-2xl text-center">Patient Registration</CardTitle>
                  <CardDescription className="text-center">
                    Create an account to access your medical records
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="patient-first-name">First Name</Label>
                      <Input id="patient-first-name" placeholder="John" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="patient-last-name">Last Name</Label>
                      <Input id="patient-last-name" placeholder="Doe" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="patient-email">Email</Label>
                    <Input id="patient-email" type="email" placeholder="patient@example.com" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="patient-dob">Date of Birth</Label>
                    <Input id="patient-dob" type="date" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="patient-password">Password</Label>
                    <Input id="patient-password" type="password" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="language-select">Preferred Language</Label>
                    <Select defaultValue="english">
                      <SelectTrigger id="language-select">
                        <SelectValue placeholder="Select Language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="english">English</SelectItem>
                        <SelectItem value="hindi">हिंदी (Hindi)</SelectItem>
                        <SelectItem value="marathi">मराठी (Marathi)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col">
                  <Button 
                    className="w-full bg-medical-teal" 
                    onClick={() => handleRegister("patient")}
                    disabled={isLoading}
                  >
                    {isLoading ? "Registering..." : "Register"}
                  </Button>
                  <p className="mt-4 text-center text-sm text-gray-500">
                    Already have an account?{" "}
                    <Link to="/login" className="text-medical-blue hover:underline">
                      Login
                    </Link>
                  </p>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Register;
