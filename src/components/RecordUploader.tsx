
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Upload } from "lucide-react";

const RecordUploader = ({ isOnline }: { isOnline: boolean }) => {
  const [patientId, setPatientId] = useState("");
  const [recordType, setRecordType] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [notes, setNotes] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };
  
  const handleUpload = () => {
    if (!patientId || !recordType || !selectedFile) {
      toast.error("Please fill all required fields and select a file");
      return;
    }
    
    setIsUploading(true);
    
    // Create record metadata
    const recordData = {
      patientId,
      recordType,
      fileName: selectedFile.name,
      fileSize: selectedFile.size,
      notes,
      uploadedAt: new Date().toISOString(),
      doctorId: "current-doctor-id", // In a real app, this would come from auth context
    };
    
    if (isOnline) {
      // Simulate an API upload
      setTimeout(() => {
        setIsUploading(false);
        toast.success("Record uploaded successfully");
        
        // Reset form
        setPatientId("");
        setRecordType("");
        setSelectedFile(null);
        setNotes("");
      }, 2000);
    } else {
      // Store locally when offline
      const pendingUploads = JSON.parse(localStorage.getItem("pendingDoctorData") || "[]");
      pendingUploads.push(recordData);
      localStorage.setItem("pendingDoctorData", JSON.stringify(pendingUploads));
      
      setIsUploading(false);
      toast.success("Record saved locally and will be uploaded when online");
      
      // Reset form
      setPatientId("");
      setRecordType("");
      setSelectedFile(null);
      setNotes("");
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="h-5 w-5" />
          Upload Patient Record
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); handleUpload(); }}>
          <div className="space-y-2">
            <Label htmlFor="patient-id">Patient ID</Label>
            <Input 
              id="patient-id" 
              value={patientId} 
              onChange={(e) => setPatientId(e.target.value)} 
              placeholder="Enter patient ID"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="record-type">Record Type</Label>
            <Select value={recordType} onValueChange={setRecordType} required>
              <SelectTrigger id="record-type">
                <SelectValue placeholder="Select record type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="lab-report">Lab Report</SelectItem>
                <SelectItem value="prescription">Prescription</SelectItem>
                <SelectItem value="radiology">Radiology Image</SelectItem>
                <SelectItem value="discharge-summary">Discharge Summary</SelectItem>
                <SelectItem value="consultation">Consultation Notes</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="file-upload">Upload File</Label>
            <Input 
              id="file-upload" 
              type="file" 
              onChange={handleFileChange}
              accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
              required
            />
            {selectedFile && (
              <p className="text-xs text-gray-500 mt-1">
                Selected: {selectedFile.name} ({Math.round(selectedFile.size / 1024)} KB)
              </p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="notes">Additional Notes</Label>
            <Textarea 
              id="notes" 
              value={notes} 
              onChange={(e) => setNotes(e.target.value)} 
              placeholder="Add any additional notes or observations"
              rows={3}
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-medical-blue"
            disabled={isUploading}
          >
            {isUploading ? "Uploading..." : isOnline ? "Upload Record" : "Save Locally"}
          </Button>
          
          {!isOnline && (
            <p className="text-sm text-amber-600 text-center">
              You are offline. Records will be saved locally and uploaded once you're back online.
            </p>
          )}
        </form>
      </CardContent>
    </Card>
  );
};

export default RecordUploader;
