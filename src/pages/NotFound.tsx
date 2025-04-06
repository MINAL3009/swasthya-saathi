
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { FileSearch } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="w-24 h-24 rounded-full bg-medical-light flex items-center justify-center text-medical-blue mb-8">
        <FileSearch className="h-12 w-12" />
      </div>
      <h1 className="text-5xl font-bold text-medical-blue mb-4">404</h1>
      <p className="text-xl text-gray-600 mb-8 text-center max-w-md">
        Oops! We couldn't find the page you're looking for.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Link to="/">
          <Button className="bg-medical-blue">Return to Home</Button>
        </Link>
        <Link to="/contact">
          <Button variant="outline">Contact Support</Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
