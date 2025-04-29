
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';

const QRGenerator: React.FC = () => {
  const [visitorName, setVisitorName] = useState('');
  const [purpose, setPurpose] = useState('');
  const [contact, setContact] = useState('');
  const { toast } = useToast();
  
  // In a real app, this would generate an actual QR code
  const generateQR = () => {
    if (!visitorName || !purpose || !contact) {
      toast({
        variant: "destructive",
        title: "Missing information",
        description: "Please fill in all fields to generate a QR code.",
      });
      return;
    }
    
    // Simulate QR generation
    toast({
      title: "QR Code Generated",
      description: `A QR code has been generated for ${visitorName}.`,
    });
    
    // Clear form
    setVisitorName('');
    setPurpose('');
    setContact('');
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Visitor Entry</CardTitle>
        <CardDescription>Generate a QR code for visitor check-in</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="visitor-name">Visitor Name</Label>
          <Input
            id="visitor-name"
            value={visitorName}
            onChange={(e) => setVisitorName(e.target.value)}
            placeholder="Enter visitor's name"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="purpose">Purpose of Visit</Label>
          <Input
            id="purpose"
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
            placeholder="Enter purpose of visit"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="contact">Contact Number</Label>
          <Input
            id="contact"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            placeholder="Enter contact number"
            type="tel"
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={generateQR} className="w-full">Generate QR Code</Button>
      </CardFooter>
    </Card>
  );
};

export default QRGenerator;
