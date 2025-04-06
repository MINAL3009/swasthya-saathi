
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { toast } from "sonner";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resetSent, setResetSent] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setResetSent(true);
      toast.success("Password reset instructions sent to your email");
    }, 1500);
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar userRole={null} />
      
      <main className="flex-1 flex items-center justify-center py-12 bg-gray-50">
        <div className="w-full max-w-md px-4">
          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl text-center">Forgot Password</CardTitle>
              <CardDescription className="text-center">
                {resetSent 
                  ? "Please check your email for password reset instructions"
                  : "Enter your email address and we'll send you instructions to reset your password"}
              </CardDescription>
            </CardHeader>
            
            {!resetSent ? (
              <>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        placeholder="your-email@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-medical-blue"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Sending..." : "Send Reset Instructions"}
                    </Button>
                  </form>
                </CardContent>
                
                <CardFooter className="flex flex-col">
                  <p className="text-center text-sm text-gray-500">
                    Remembered your password?{" "}
                    <Link to="/login" className="text-medical-blue hover:underline">
                      Back to Login
                    </Link>
                  </p>
                </CardFooter>
              </>
            ) : (
              <CardContent className="space-y-4">
                <div className="bg-green-50 p-4 rounded-md">
                  <p className="text-center text-sm text-green-800">
                    Password reset instructions have been sent to {email}. Please check your email.
                  </p>
                </div>
                
                <Button 
                  className="w-full bg-medical-blue"
                  onClick={() => setResetSent(false)}
                >
                  Try Different Email
                </Button>
                
                <div className="text-center space-y-2">
                  <p className="text-sm text-gray-500">
                    Didn't receive an email?
                  </p>
                  <Button 
                    variant="link" 
                    className="text-medical-blue"
                    onClick={() => {
                      toast.info("Resending password reset instructions...");
                      setTimeout(() => {
                        toast.success("Password reset instructions resent!");
                      }, 1000);
                    }}
                  >
                    Resend reset instructions
                  </Button>
                </div>
                
                <div className="border-t pt-4">
                  <Button 
                    variant="outline" 
                    className="w-full"
                    asChild
                  >
                    <Link to="/login">Back to Login</Link>
                  </Button>
                </div>
              </CardContent>
            )}
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ForgotPassword;
