
import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Wifi, WifiOff } from "lucide-react";

const DoctorStatusIndicator = () => {
  const [isOnline, setIsOnline] = useState(true);
  const [hasPendingData, setHasPendingData] = useState(false);
  
  // Check online status
  useEffect(() => {
    const handleOnlineStatusChange = () => {
      const newOnlineStatus = navigator.onLine;
      
      // Only update if the status is actually changing
      if (isOnline !== newOnlineStatus) {
        setIsOnline(newOnlineStatus);
        
        if (newOnlineStatus) {
          toast.success("You're back online!");
          
          // Check if there's pending data to sync
          const pendingData = localStorage.getItem("pendingDoctorData");
          if (pendingData) {
            setHasPendingData(true);
          }
        } else {
          toast.warning("You're offline. Data will be stored locally until connection is restored.", {
            duration: 5000,
          });
        }
      }
    };
    
    // Initialize with current status
    setIsOnline(navigator.onLine);
    
    // Load online status from localStorage (in case the doctor manually set it)
    const storedStatus = localStorage.getItem("doctorOnlineStatus");
    if (storedStatus === "offline") {
      setIsOnline(false);
    }
    
    // Add event listeners
    window.addEventListener("online", handleOnlineStatusChange);
    window.addEventListener("offline", handleOnlineStatusChange);
    
    return () => {
      window.removeEventListener("online", handleOnlineStatusChange);
      window.removeEventListener("offline", handleOnlineStatusChange);
    };
  }, [isOnline]);
  
  const toggleOnlineStatus = () => {
    const newStatus = !isOnline;
    setIsOnline(newStatus);
    
    // Store the status preference
    localStorage.setItem("doctorOnlineStatus", newStatus ? "online" : "offline");
    
    toast.info(`You are now ${newStatus ? "online" : "offline"}.`, {
      description: newStatus 
        ? "Patient data will be synchronized with the cloud." 
        : "Patient data will be stored locally until you go online.",
    });
  };
  
  const synchronizeData = () => {
    toast.promise(
      // This would be a real API call in production
      new Promise((resolve) => setTimeout(resolve, 2000)),
      {
        loading: "Synchronizing offline data...",
        success: () => {
          // Clear pending data flag
          localStorage.removeItem("pendingDoctorData");
          setHasPendingData(false);
          return "All data successfully synchronized!";
        },
        error: "Failed to synchronize data. Please try again.",
      }
    );
  };
  
  return (
    <div className="flex items-center gap-2">
      <Badge 
        variant={isOnline ? "default" : "outline"} 
        className={isOnline ? "bg-green-500 hover:bg-green-600" : "text-orange-500 border-orange-500"}
      >
        {isOnline ? (
          <><Wifi className="h-3 w-3 mr-1" /> Online</>
        ) : (
          <><WifiOff className="h-3 w-3 mr-1" /> Offline</>
        )}
      </Badge>
      
      <Button 
        variant="outline" 
        size="sm" 
        onClick={toggleOnlineStatus}
        className="h-8 text-xs"
      >
        Go {isOnline ? "Offline" : "Online"}
      </Button>
      
      {hasPendingData && isOnline && (
        <Button 
          variant="default" 
          size="sm" 
          onClick={synchronizeData}
          className="h-8 text-xs bg-amber-500 hover:bg-amber-600"
        >
          Sync Data
        </Button>
      )}
    </div>
  );
};

export default DoctorStatusIndicator;
