
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FeatureCard from "@/components/FeatureCard";
import { Shield, Search, Smartphone, Book, Calendar, Bell, FileText, Mic, Users } from "lucide-react";

const Features = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar userRole={null} />
      
      <main className="flex-1">
        <section className="py-12 bg-gradient-to-r from-medical-light to-white md:py-20">
          <div className="container px-4 mx-auto md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h1 className="text-4xl font-bold tracking-tight text-medical-dark md:text-5xl">
                Features of Swasthya Saathi
              </h1>
              <p className="mt-4 text-lg text-gray-600">
                Discover the innovative tools and technologies that make our platform
                the preferred choice for healthcare professionals and patients alike.
              </p>
            </div>
            
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
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
              <FeatureCard
                icon={<FileText className="w-6 h-6" />}
                title="Prescription Reader"
                description="Digital tool to interpret and store prescriptions with medication reminders."
              />
              <FeatureCard
                icon={<Mic className="w-6 h-6" />}
                title="Voice Assistant"
                description="Navigate the platform using voice commands in multiple languages for elderly and rural users."
              />
              <FeatureCard
                icon={<Users className="w-6 h-6" />}
                title="Multilingual Support"
                description="Interface available in English, Hindi, and Marathi to serve diverse populations."
              />
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Features;
