import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserPlus, Phone, Home, User, Calendar, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { playNotificationSound } from "@/data/mockData";

const RegisterChild = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    childName: "",
    age: "",
    childPhone: "",
    guardianName: "",
    guardianPhone: "",
    homeAddress: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const generateTrackingId = () => {
    const timestamp = Date.now().toString().slice(-6);
    return `ST-2024-${timestamp}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      const trackingId = generateTrackingId();
      
      // Show success notification
      toast({
        title: "✅ Child Registered Successfully!",
        description: `Tracking ID: ${trackingId} has been created for ${formData.childName}`,
        duration: 5000,
      });

      // Play success sound
      playNotificationSound('success');

      // Reset form
      setFormData({
        childName: "",
        age: "",
        childPhone: "",
        guardianName: "",
        guardianPhone: "",
        homeAddress: ""
      });

      setIsSubmitting(false);

      // Show additional info toast after a delay
      setTimeout(() => {
        toast({
          title: "📱 Setup Complete",
          description: `SMS with tracking app download link sent to ${formData.childPhone}`,
          duration: 4000,
        });
        playNotificationSound('success');
      }, 2000);
    }, 1500);
  };

  const isFormValid = Object.values(formData).every(value => value.trim() !== "");

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <Card className="bg-gradient-hero text-white shadow-glow">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-2xl">
              <UserPlus className="h-8 w-8" />
              Register New Child
            </CardTitle>
            <p className="text-white/90">
              Add a new child to your tracking system and create their unique tracking ID
            </p>
          </CardHeader>
        </Card>

        {/* Registration Form */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
              Child Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Child Details */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="childName" className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Child's Full Name *
                  </Label>
                  <Input
                    id="childName"
                    value={formData.childName}
                    onChange={(e) => handleInputChange('childName', e.target.value)}
                    placeholder="Enter child's full name"
                    className="border-input focus:ring-primary"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="age" className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Age *
                  </Label>
                  <Input
                    id="age"
                    type="number"
                    min="1"
                    max="18"
                    value={formData.age}
                    onChange={(e) => handleInputChange('age', e.target.value)}
                    placeholder="Age"
                    className="border-input focus:ring-primary"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="childPhone" className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  Child's Phone Number 📱 *
                </Label>
                <Input
                  id="childPhone"
                  type="tel"
                  value={formData.childPhone}
                  onChange={(e) => handleInputChange('childPhone', e.target.value)}
                  placeholder="+1-555-0123"
                  className="border-input focus:ring-primary"
                  required
                />
                <p className="text-sm text-muted-foreground">
                  This generates a unique tracking ID and sends setup instructions to the device
                </p>
              </div>

              {/* Guardian Details */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <User className="h-5 w-5 text-primary" />
                  Guardian Information
                </h3>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="guardianName">Guardian's Name *</Label>
                    <Input
                      id="guardianName"
                      value={formData.guardianName}
                      onChange={(e) => handleInputChange('guardianName', e.target.value)}
                      placeholder="Enter guardian's full name"
                      className="border-input focus:ring-primary"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="guardianPhone">Guardian's Phone *</Label>
                    <Input
                      id="guardianPhone"
                      type="tel"
                      value={formData.guardianPhone}
                      onChange={(e) => handleInputChange('guardianPhone', e.target.value)}
                      placeholder="+1-555-0100"
                      className="border-input focus:ring-primary"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Address */}
              <div className="space-y-2">
                <Label htmlFor="homeAddress" className="flex items-center gap-2">
                  <Home className="h-4 w-4" />
                  Home Address *
                </Label>
                <Input
                  id="homeAddress"
                  value={formData.homeAddress}
                  onChange={(e) => handleInputChange('homeAddress', e.target.value)}
                  placeholder="123 Main Street, City, State, ZIP"
                  className="border-input focus:ring-primary"
                  required
                />
                <p className="text-sm text-muted-foreground">
                  This will be automatically added as a safe zone
                </p>
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <Button
                  type="submit"
                  className="w-full bg-gradient-success shadow-success text-lg py-3"
                  disabled={!isFormValid || isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Creating Tracking ID...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Register Child & Create Tracking ID
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Info Cards */}
        <div className="grid md:grid-cols-2 gap-4">
          <Card className="bg-gradient-card shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <Phone className="h-8 w-8 text-primary" />
                <h3 className="font-semibold">How It Works</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                After registration, a tracking app download link is sent to the child's phone. 
                Once installed, real-time location tracking begins automatically.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <CheckCircle className="h-8 w-8 text-success" />
                <h3 className="font-semibold">Privacy & Security</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                All data is encrypted and only accessible by registered guardians. 
                Location data is stored securely and never shared with third parties.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default RegisterChild;