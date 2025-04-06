
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";

const EmergencyAccess = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <>
      <Button 
        onClick={() => setIsOpen(true)} 
        variant="destructive" 
        className="emergency-button"
      >
        <span className="emergency-pulse"></span>
        Emergency Access
      </Button>
      
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-2xl text-destructive">Emergency Medical Information</DialogTitle>
            <DialogDescription>
              Critical patient information for emergency situations.
            </DialogDescription>
          </DialogHeader>
          
          <Tabs defaultValue="vitals" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="vitals">Vitals</TabsTrigger>
              <TabsTrigger value="allergies">Allergies</TabsTrigger>
              <TabsTrigger value="contacts">Contacts</TabsTrigger>
            </TabsList>
            
            <TabsContent value="vitals" className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <Label className="text-xs text-gray-500">Blood Type</Label>
                    <p className="text-lg font-semibold">O Positive</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <Label className="text-xs text-gray-500">Height/Weight</Label>
                    <p className="text-lg font-semibold">175cm / 70kg</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <Label className="text-xs text-gray-500">Current Medications</Label>
                    <p className="text-sm">Lisinopril 20mg (Daily)</p>
                    <p className="text-sm">Atorvastatin 10mg (Daily)</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <Label className="text-xs text-gray-500">Conditions</Label>
                    <p className="text-sm">Hypertension</p>
                    <p className="text-sm">Type 2 Diabetes</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="allergies" className="mt-4">
              <Card>
                <CardContent className="p-4 space-y-2">
                  <div className="flex items-center">
                    <span className="w-2 h-2 mr-2 rounded-full bg-destructive"></span>
                    <p className="font-semibold">Penicillin</p>
                    <span className="ml-auto text-xs text-destructive">Severe</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-2 h-2 mr-2 rounded-full bg-medical-orange"></span>
                    <p className="font-semibold">Shellfish</p>
                    <span className="ml-auto text-xs text-medical-orange">Moderate</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-2 h-2 mr-2 rounded-full bg-medical-orange"></span>
                    <p className="font-semibold">Latex</p>
                    <span className="ml-auto text-xs text-medical-orange">Moderate</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-2 h-2 mr-2 rounded-full bg-medical-teal"></span>
                    <p className="font-semibold">Pollen</p>
                    <span className="ml-auto text-xs text-medical-teal">Mild</span>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="contacts" className="mt-4">
              <Card>
                <CardContent className="p-4 space-y-4">
                  <div>
                    <Label className="text-xs text-gray-500">Emergency Contact 1</Label>
                    <p className="font-semibold">Sarah Johnson (Wife)</p>
                    <p className="text-sm">+1 (987) 654-3210</p>
                  </div>
                  <div>
                    <Label className="text-xs text-gray-500">Emergency Contact 2</Label>
                    <p className="font-semibold">Robert Johnson (Son)</p>
                    <p className="text-sm">+1 (987) 654-3211</p>
                  </div>
                  <div>
                    <Label className="text-xs text-gray-500">Primary Physician</Label>
                    <p className="font-semibold">Dr. Michael Chen</p>
                    <p className="text-sm">+1 (123) 456-7890</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          
          <DialogFooter>
            <Button type="submit" className="w-full" onClick={() => setIsOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EmergencyAccess;
