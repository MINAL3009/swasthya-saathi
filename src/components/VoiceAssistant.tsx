
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Mic, MicOff } from "lucide-react";
import { toast } from "sonner";

interface VoiceAssistantProps {
  language: string;
}

const VoiceAssistant = ({ language }: VoiceAssistantProps) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  
  // Speech recognition setup
  useEffect(() => {
    let recognition: SpeechRecognition | null = null;
    
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognition = new SpeechRecognition();
      
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
          recognition?.start();
        }
      };
    } else {
      toast.error("Speech recognition is not supported in your browser.");
    }
    
    return () => {
      if (recognition) {
        recognition.onresult = null;
        recognition.onend = null;
        recognition.onerror = null;
        
        if (isListening) {
          recognition.stop();
        }
      }
    };
  }, [isListening, language]);
  
  const toggleListening = () => {
    setIsListening(prev => !prev);
    
    if (!isListening) {
      try {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        recognition.start();
        toast.success("Voice assistant is listening");
      } catch (error) {
        console.error("Failed to start speech recognition:", error);
        toast.error("Failed to start voice assistant");
      }
    } else {
      try {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        recognition.stop();
        toast.info("Voice assistant stopped");
      } catch (error) {
        console.error("Failed to stop speech recognition:", error);
      }
    }
  };
  
  const processVoiceCommand = (command: string) => {
    // Simple command processing
    if (command.includes("show records") || command.includes("medical records")) {
      window.location.href = "/records";
    } else if (command.includes("appointment") || command.includes("schedule")) {
      window.location.href = "/appointments";
    } else if (command.includes("reports") || command.includes("test results")) {
      window.location.href = "/reports";
    } else if (command.includes("emergency") || command.includes("help")) {
      toast.error("Emergency mode activated!", {
        duration: 5000,
      });
      // Additional emergency handling could be implemented here
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
          <p className="font-medium text-gray-700">I heard:</p>
          <p className="text-gray-600 mt-1">{transcript}</p>
        </div>
      )}
    </div>
  );
};

export default VoiceAssistant;
