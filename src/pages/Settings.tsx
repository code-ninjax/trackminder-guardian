import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { 
  Settings as SettingsIcon, 
  User, 
  Bell, 
  Shield, 
  Phone,
  Mail,
  MapPin,
  Volume2,
  Smartphone,
  Lock,
  Save,
  AlertTriangle,
  Plus
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { playNotificationSound } from "@/data/mockData";

const Settings = () => {
  const { toast } = useToast();
  const [profile, setProfile] = useState({
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    phone: "+1-555-0100",
    address: "123 Oak Street, Springfield, IL 62701"
  });

  const [notifications, setNotifications] = useState({
    soundEnabled: true,
    emailAlerts: true,
    smsAlerts: true,
    safeZoneAlerts: true,
    emergencyAlerts: true,
    batteryAlerts: true,
    dailySummary: false
  });

  const [security, setSecurity] = useState({
    twoFactorAuth: false,
    locationSharing: true,
    dataRetention: "1_year",
    emergencyContacts: [
      { name: "Mike Johnson", phone: "+1-555-0101", relation: "Spouse" },
      { name: "Emergency Services", phone: "911", relation: "Emergency" }
    ]
  });

  const handleProfileSave = () => {
    toast({
      title: "✅ Profile Updated",
      description: "Your profile information has been saved successfully",
      duration: 3000,
    });
    playNotificationSound('success');
  };

  const handleNotificationSave = () => {
    toast({
      title: "🔔 Notification Settings Updated",
      description: "Your notification preferences have been saved",
      duration: 3000,
    });
    playNotificationSound('success');
  };

  const handleSecuritySave = () => {
    toast({
      title: "🔒 Security Settings Updated", 
      description: "Your security preferences have been saved",
      duration: 3000,
    });
    playNotificationSound('success');
  };

  const handleTestNotification = () => {
    toast({
      title: "🔔 Test Notification",
      description: "This is a test notification with sound",
      duration: 3000,
    });
    playNotificationSound(notifications.soundEnabled ? 'success' : 'success');
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-4xl mx-auto">
        {/* Header */}
        <Card className="bg-gradient-hero text-white shadow-glow">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-2xl">
              <SettingsIcon className="h-8 w-8" />
              Settings & Profile
            </CardTitle>
            <p className="text-white/90">
              Manage your account, notifications, and security preferences
            </p>
          </CardHeader>
        </Card>

        {/* Profile Settings */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
              Profile Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Full Name
                </Label>
                <Input
                  id="name"
                  value={profile.name}
                  onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                  className="border-input focus:ring-primary"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                  className="border-input focus:ring-primary"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  value={profile.phone}
                  onChange={(e) => setProfile(prev => ({ ...prev, phone: e.target.value }))}
                  className="border-input focus:ring-primary"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address" className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Home Address
                </Label>
                <Input
                  id="address"
                  value={profile.address}
                  onChange={(e) => setProfile(prev => ({ ...prev, address: e.target.value }))}
                  className="border-input focus:ring-primary"
                />
              </div>
            </div>

            <Button onClick={handleProfileSave} className="bg-gradient-success shadow-success">
              <Save className="w-4 h-4 mr-2" />
              Save Profile Changes
            </Button>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-primary" />
              Notification Preferences
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Volume2 className="h-4 w-4" />
                    <span className="font-medium">Sound Notifications</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Play sounds for alerts and notifications</p>
                </div>
                <Switch
                  checked={notifications.soundEnabled}
                  onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, soundEnabled: checked }))}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    <span className="font-medium">Email Alerts</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Receive alerts via email</p>
                </div>
                <Switch
                  checked={notifications.emailAlerts}
                  onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, emailAlerts: checked }))}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Smartphone className="h-4 w-4" />
                    <span className="font-medium">SMS Alerts</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Receive critical alerts via SMS</p>
                </div>
                <Switch
                  checked={notifications.smsAlerts}
                  onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, smsAlerts: checked }))}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4" />
                    <span className="font-medium">Safe Zone Alerts</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Notify when children enter/exit safe zones</p>
                </div>
                <Switch
                  checked={notifications.safeZoneAlerts}
                  onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, safeZoneAlerts: checked }))}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4" />
                    <span className="font-medium">Emergency Alerts</span>
                    <Badge variant="destructive">Critical</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">Always receive emergency notifications</p>
                </div>
                <Switch
                  checked={notifications.emergencyAlerts}
                  onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, emergencyAlerts: checked }))}
                  disabled
                />
              </div>
            </div>

            <div className="flex gap-3">
              <Button onClick={handleNotificationSave} className="bg-gradient-success shadow-success">
                <Save className="w-4 h-4 mr-2" />
                Save Notification Settings
              </Button>
              <Button variant="outline" onClick={handleTestNotification}>
                <Bell className="w-4 h-4 mr-2" />
                Test Notification
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5 text-primary" />
              Security & Privacy
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Lock className="h-4 w-4" />
                    <span className="font-medium">Two-Factor Authentication</span>
                    <Badge variant="outline">Recommended</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                </div>
                <Switch
                  checked={security.twoFactorAuth}
                  onCheckedChange={(checked) => setSecurity(prev => ({ ...prev, twoFactorAuth: checked }))}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span className="font-medium">Location Sharing</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Allow emergency contacts to view child locations</p>
                </div>
                <Switch
                  checked={security.locationSharing}
                  onCheckedChange={(checked) => setSecurity(prev => ({ ...prev, locationSharing: checked }))}
                />
              </div>
            </div>

            {/* Emergency Contacts */}
            <div className="space-y-3">
              <h4 className="font-medium flex items-center gap-2">
                <Phone className="h-4 w-4" />
                Emergency Contacts
              </h4>
              <div className="space-y-2">
                {security.emergencyContacts.map((contact, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg bg-gradient-card">
                    <div>
                      <div className="font-medium">{contact.name}</div>
                      <div className="text-sm text-muted-foreground">{contact.phone} • {contact.relation}</div>
                    </div>
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                  </div>
                ))}
              </div>
              <Button variant="outline" size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Add Emergency Contact
              </Button>
            </div>

            <Button onClick={handleSecuritySave} className="bg-gradient-success shadow-success">
              <Save className="w-4 h-4 mr-2" />
              Save Security Settings
            </Button>
          </CardContent>
        </Card>

        {/* App Information */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <SettingsIcon className="h-5 w-5 text-primary" />
              Application Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="font-medium">Account Details</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Account Type:</span>
                    <Badge variant="secondary">Premium Family</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Member Since:</span>
                    <span>January 2024</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Children Registered:</span>
                    <span>3</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Safe Zones Created:</span>
                    <span>4</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-medium">App Version</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Version:</span>
                    <span>2024.1.0</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Last Updated:</span>
                    <span>Dec 15, 2024</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Platform:</span>
                    <span>Web Application</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Settings;