
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Mic, MicOff } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

interface VoiceAssistantProps {
  language: string;
}

const VoiceAssistant = ({ language }: VoiceAssistantProps) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const navigate = useNavigate();
  
  // Enhanced voice command mapping based on selected language
  const voiceCommands = {
    english: {
      records: ["show records", "medical records", "my records", "show my records"],
      appointments: ["appointments", "schedule", "my appointments", "show appointments"],
      reports: ["reports", "test results", "my reports", "show reports", "show my reports"],
      emergency: ["emergency", "help", "emergency help", "i need help"],
      home: ["go home", "home page", "go to home", "take me home"],
      profile: ["profile", "my profile", "user profile", "account", "my account"]
    },
    hindi: {
      records: ["रिकॉर्ड दिखाओ", "मेडिकल रिकॉर्ड", "मेरे रिकॉर्ड", "मेरे रिकॉर्ड दिखाओ"],
      appointments: ["अपॉइंटमेंट", "शेड्यूल", "मेरे अपॉइंटमेंट", "अपॉइंटमेंट दिखाओ"],
      reports: ["रिपोर्ट", "टेस्ट रिजल्ट", "मेरी रिपोर्ट", "रिपोर्ट दिखाओ"],
      emergency: ["इमरजेंसी", "मदद", "मदद चाहिए", "इमरजेंसी हेल्प"],
      home: ["होम पेज", "होम", "होम पे जाओ", "मुझे होम ले जाओ"],
      profile: ["प्रोफाइल", "मेरा प्रोफाइल", "अकाउंट", "मेरा अकाउंट"]
    },
    marathi: {
      records: ["रेकॉर्ड दाखवा", "मेडिकल रेकॉर्ड", "माझे रेकॉर्ड", "माझे रेकॉर्ड दाखवा"],
      appointments: ["अपॉइंटमेंट", "शेड्यूल", "माझे अपॉइंटमेंट", "अपॉइंटमेंट दाखवा"],
      reports: ["रिपोर्ट", "टेस्ट रिझल्ट", "माझे रिपोर्ट", "रिपोर्ट दाखवा"],
      emergency: ["इमर्जन्सी", "मदत", "मदत हवी आहे", "इमर्जन्सी हेल्प"],
      home: ["होम पेज", "होम", "होम वर जा", "मला होम वर न्या"],
      profile: ["प्रोफाइल", "माझे प्रोफाइल", "अकाउंट", "माझे अकाउंट"]
    }
  };
  
  // Speech recognition setup
  useEffect(() => {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      
      const recognition = recognitionRef.current;
      recognition.continuous = true;
      recognition.interimResults = true;
      
      // Set language based on user preference
      switch (language) {
        case "hindi":
          recognition.lang = "hi-IN";
          break;
        case "marathi":
          recognition.lang = "mr-IN";
          break;
        default:
          recognition.lang = "en-US";
      }
      
      recognition.onresult = (event) => {
        const current = event.resultIndex;
        const result = event.results[current][0].transcript;
        setTranscript(result);
        
        // Process voice commands
        processVoiceCommand(result.toLowerCase());
      };
      
      recognition.onerror = (event) => {
        console.error("Speech recognition error", event.error);
        setIsListening(false);
        toast.error("Voice recognition error. Please try again.");
      };
      
      recognition.onend = () => {
        if (isListening) {
          recognition.start();
        }
      };
    } else {
      toast.error("Speech recognition is not supported in your browser.");
    }
    
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.onresult = null;
        recognitionRef.current.onend = null;
        recognitionRef.current.onerror = null;
        
        if (isListening) {
          recognitionRef.current.stop();
        }
      }
    };
  }, [isListening, language]);
  
  // Start/stop listening
  const toggleListening = () => {
    if (!isListening) {
      try {
        if (recognitionRef.current) {
          recognitionRef.current.start();
          setIsListening(true);
          toast.success("Voice assistant is listening");
        }
      } catch (error) {
        console.error("Failed to start speech recognition:", error);
        toast.error("Failed to start voice assistant");
      }
    } else {
      try {
        if (recognitionRef.current) {
          recognitionRef.current.stop();
          setIsListening(false);
          toast.info("Voice assistant stopped");
        }
      } catch (error) {
        console.error("Failed to stop speech recognition:", error);
      }
    }
  };
  
  // Process voice commands
  const processVoiceCommand = (command: string) => {
    const commands = voiceCommands[language as keyof typeof voiceCommands] || voiceCommands.english;
    
    // Check for record commands
    if (commands.records.some(phrase => command.includes(phrase))) {
      navigate("/records");
      toast.success("Navigating to medical records");
      return;
    }
    
    // Check for appointment commands
    if (commands.appointments.some(phrase => command.includes(phrase))) {
      navigate("/appointments");
      toast.success("Navigating to appointments");
      return;
    }
    
    // Check for reports commands
    if (commands.reports.some(phrase => command.includes(phrase))) {
      navigate("/reports");
      toast.success("Navigating to medical reports");
      return;
    }
    
    // Check for emergency commands
    if (commands.emergency.some(phrase => command.includes(phrase))) {
      toast.error("Emergency mode activated!", {
        duration: 5000,
      });
      // Additional emergency handling could be implemented here
      return;
    }
    
    // Check for home page commands
    if (commands.home.some(phrase => command.includes(phrase))) {
      navigate("/");
      toast.success("Navigating to home page");
      return;
    }
    
    // Check for profile commands
    if (commands.profile.some(phrase => command.includes(phrase))) {
      // Assuming there's a profile page - if not, this could be updated
      toast.info("Profile feature coming soon");
      return;
    }
  };
  
  // Different voice assistant messages based on language
  const getAssistantMessage = () => {
    switch (language) {
      case "hindi":
        return "मैंने सुना:";
      case "marathi":
        return "मी ऐकले:";
      default:
        return "I heard:";
    }
  };
  
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Button
        onClick={toggleListening}
        className={`rounded-full h-14 w-14 shadow-lg ${
          isListening ? "bg-destructive hover:bg-destructive/90" : "bg-medical-teal hover:bg-medical-teal/90"
        }`}
        aria-label={isListening ? "Stop voice assistant" : "Start voice assistant"}
      >
        {isListening ? <MicOff className="h-6 w-6" /> : <Mic className="h-6 w-6" />}
      </Button>
      
      {transcript && isListening && (
        <div className="absolute bottom-20 right-0 bg-white p-3 rounded-lg shadow-lg w-64 text-sm">
          <p className="font-medium text-gray-700">{getAssistantMessage()}</p>
          <p className="text-gray-600 mt-1">{transcript}</p>
        </div>
      )}
    </div>
  );
};

export default VoiceAssistant;
