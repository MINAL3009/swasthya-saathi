
import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { toast } from "sonner";
import { Mic, MicOff } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [language, setLanguage] = useState("english");
  const [uid, setUid] = useState("");
  const [defaultTab, setDefaultTab] = useState<"doctor" | "patient">("doctor");
  
  useEffect(() => {
    if (location.state?.role) {
      setDefaultTab(location.state.role);
    }
  }, [location.state]);
  
  const handleLogin = (role: "doctor" | "patient") => {
    setIsLoading(true);
    
    if (role === "doctor" && !uid) {
      toast.error("Please enter your doctor UID for verification");
      setIsLoading(false);
      return;
    }
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast.success(`Logged in successfully as ${role}`);
      
      // Store the language preference and role in localStorage
      localStorage.setItem("userLanguage", language);
      localStorage.setItem("userRole", role);
      
      if (role === "doctor") {
        // Store the online status for doctor
        localStorage.setItem("doctorOnlineStatus", "online");
        navigate("/dashboard");
      } else {
        navigate("/records");
      }
    }, 1500);
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar userRole={null} />
      
      <main className="flex-1 flex items-center justify-center py-12 bg-gray-50">
        <div className="w-full max-w-md px-4">
          <Tabs defaultValue={defaultTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="doctor">Doctor</TabsTrigger>
              <TabsTrigger value="patient">Patient</TabsTrigger>
            </TabsList>
            
            <TabsContent value="doctor">
              <Card>
                <CardHeader className="space-y-1">
                  <CardTitle className="text-2xl text-center">Doctor Login</CardTitle>
                  <CardDescription className="text-center">
                    Enter your credentials to access your dashboard
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="doctor-email">Email</Label>
                    <Input id="doctor-email" type="email" placeholder="doctor@example.com" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="doctor-password">Password</Label>
                      <Link to="/forgot-password" className="text-xs text-medical-blue hover:underline">
                        Forgot password?
                      </Link>
                    </div>
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
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col">
                  <Button 
                    className="w-full bg-medical-blue" 
                    onClick={() => handleLogin("doctor")}
                    disabled={isLoading}
                  >
                    {isLoading ? "Logging in..." : "Login"}
                  </Button>
                  <p className="mt-4 text-center text-sm text-gray-500">
                    Don't have an account?{" "}
                    <Link to="/register" className="text-medical-blue hover:underline">
                      Register
                    </Link>
                  </p>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="patient">
              <Card>
                <CardHeader className="space-y-1">
                  <CardTitle className="text-2xl text-center">Patient Login</CardTitle>
                  <CardDescription className="text-center">
                    Enter your credentials to access your medical records
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="patient-email">Email</Label>
                    <Input id="patient-email" type="email" placeholder="patient@example.com" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="patient-password">Password</Label>
                      <Link to="/forgot-password" className="text-xs text-medical-blue hover:underline">
                        Forgot password?
                      </Link>
                    </div>
                    <Input id="patient-password" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="language-select">Preferred Language</Label>
                    <Select 
                      value={language} 
                      onValueChange={setLanguage}
                    >
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
                    onClick={() => handleLogin("patient")}
                    disabled={isLoading}
                  >
                    {isLoading ? "Logging in..." : "Login"}
                  </Button>
                  <p className="mt-4 text-center text-sm text-gray-500">
                    Don't have an account?{" "}
                    <Link to="/register" className="text-medical-blue hover:underline">
                      Register
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

export default Login;
