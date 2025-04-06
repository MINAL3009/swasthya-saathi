
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Bell, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Navbar = ({ userRole }: { userRole: "doctor" | "patient" | null }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <header className="sticky top-0 z-40 bg-white border-b shadow-sm">
      <div className="container flex items-center justify-between h-16 px-4 md:px-6">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-medical-blue text-white font-bold">SS</div>
          <span className="hidden text-xl font-bold sm:inline-block text-medical-blue">Swasthya Saathi</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className={`nav-link ${isActive("/") ? "nav-link-active" : ""}`}>
            Home
          </Link>
          
          {userRole === "doctor" && (
            <>
              <Link to="/dashboard" className={`nav-link ${isActive("/dashboard") ? "nav-link-active" : ""}`}>
                Dashboard
              </Link>
              <Link to="/patients" className={`nav-link ${isActive("/patients") ? "nav-link-active" : ""}`}>
                Patients
              </Link>
              <Link to="/appointments" className={`nav-link ${isActive("/appointments") ? "nav-link-active" : ""}`}>
                Appointments
              </Link>
            </>
          )}
          
          {userRole === "patient" && (
            <>
              <Link to="/records" className={`nav-link ${isActive("/records") ? "nav-link-active" : ""}`}>
                My Records
              </Link>
              <Link to="/appointments" className={`nav-link ${isActive("/appointments") ? "nav-link-active" : ""}`}>
                Appointments
              </Link>
              <Link to="/reports" className={`nav-link ${isActive("/reports") ? "nav-link-active" : ""}`}>
                Reports
              </Link>
            </>
          )}
          
          {!userRole && (
            <>
              <Link to="/features" className={`nav-link ${isActive("/features") ? "nav-link-active" : ""}`}>
                Features
              </Link>
              <Link to="/about" className={`nav-link ${isActive("/about") ? "nav-link-active" : ""}`}>
                About
              </Link>
              <Link to="/contact" className={`nav-link ${isActive("/contact") ? "nav-link-active" : ""}`}>
                Contact
              </Link>
            </>
          )}
        </nav>

        <div className="flex items-center gap-4">
          {userRole ? (
            <>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-destructive rounded-full"></span>
              </Button>
              
              <Avatar>
                <AvatarImage src="" alt="User" />
                <AvatarFallback className="bg-medical-teal text-white">
                  {userRole === "doctor" ? "DR" : "PT"}
                </AvatarFallback>
              </Avatar>
            </>
          ) : (
            <>
              <Link to="/login" className="text-sm font-medium text-medical-blue hover:underline">
                Log in
              </Link>
              <Link to="/register">
                <Button className="bg-medical-blue hover:bg-medical-dark">Sign up</Button>
              </Link>
            </>
          )}
          
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden">
          <nav className="flex flex-col gap-2 p-4 bg-white border-t">
            <Link 
              to="/" 
              className={`nav-link ${isActive("/") ? "nav-link-active" : ""}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            
            {userRole === "doctor" && (
              <>
                <Link 
                  to="/dashboard" 
                  className={`nav-link ${isActive("/dashboard") ? "nav-link-active" : ""}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link 
                  to="/patients" 
                  className={`nav-link ${isActive("/patients") ? "nav-link-active" : ""}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Patients
                </Link>
                <Link 
                  to="/appointments" 
                  className={`nav-link ${isActive("/appointments") ? "nav-link-active" : ""}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Appointments
                </Link>
              </>
            )}
            
            {userRole === "patient" && (
              <>
                <Link 
                  to="/records" 
                  className={`nav-link ${isActive("/records") ? "nav-link-active" : ""}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  My Records
                </Link>
                <Link 
                  to="/appointments" 
                  className={`nav-link ${isActive("/appointments") ? "nav-link-active" : ""}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Appointments
                </Link>
                <Link 
                  to="/reports" 
                  className={`nav-link ${isActive("/reports") ? "nav-link-active" : ""}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Reports
                </Link>
              </>
            )}
            
            {!userRole && (
              <>
                <Link 
                  to="/features" 
                  className={`nav-link ${isActive("/features") ? "nav-link-active" : ""}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Features
                </Link>
                <Link 
                  to="/about" 
                  className={`nav-link ${isActive("/about") ? "nav-link-active" : ""}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  About
                </Link>
                <Link 
                  to="/contact" 
                  className={`nav-link ${isActive("/contact") ? "nav-link-active" : ""}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact
                </Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
