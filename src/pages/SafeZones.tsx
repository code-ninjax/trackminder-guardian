import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { 
  Shield, 
  MapPin, 
  Plus, 
  Trash2, 
  Edit, 
  Navigation,
  CheckCircle,
  Circle
} from "lucide-react";
import { mockSafeZones, playNotificationSound } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";

const SafeZones = () => {
  const { toast } = useToast();
  const [safeZones, setSafeZones] = useState(mockSafeZones);
  const [isCreating, setIsCreating] = useState(false);
  const [newZone, setNewZone] = useState({
    name: "",
    radius: 100
  });

  const handleCreateZone = () => {
    if (!newZone.name.trim()) return;

    const zone = {
      id: Date.now().toString(),
      name: newZone.name,
      center: { 
        lat: 39.7800 + (Math.random() - 0.5) * 0.01, 
        lng: -89.6500 + (Math.random() - 0.5) * 0.01 
      },
      radius: newZone.radius,
      color: ['#10B981', '#3B82F6', '#8B5CF6', '#F59E0B', '#EF4444'][Math.floor(Math.random() * 5)]
    };

    setSafeZones(prev => [...prev, zone]);
    
    toast({
      title: "✅ Safe Zone Added Successfully",
      description: `${newZone.name} has been created and is now being monitored`,
      duration: 4000,
    });
    
    playNotificationSound('success');
    
    setNewZone({ name: "", radius: 100 });
    setIsCreating(false);
  };

  const handleDeleteZone = (id: string, name: string) => {
    setSafeZones(prev => prev.filter(zone => zone.id !== id));
    
    toast({
      title: "🗑️ Safe Zone Removed",
      description: `${name} has been deleted from monitoring`,
      duration: 3000,
    });
    
    playNotificationSound('warning');
  };

  const getZoneStatus = (zoneId: string) => {
    // Mock: randomly assign children to zones
    const childrenInZone = Math.floor(Math.random() * 3);
    return childrenInZone;
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <Card className="bg-gradient-hero text-white shadow-glow">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-2xl">
              <Shield className="h-8 w-8" />
              Safe Zone Management
            </CardTitle>
            <p className="text-white/90">
              Create and manage safe zones to monitor when children enter or leave specific areas
            </p>
          </CardHeader>
        </Card>

        {/* Interactive Map */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              Interactive Safe Zone Map
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-96 bg-gradient-to-br from-blue-50 to-green-50 rounded-lg border-2 border-border relative overflow-hidden">
              {/* Map Simulation */}
              <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
                <div className="text-center">
                  <Navigation className="h-16 w-16 text-primary mx-auto mb-4 animate-spin" />
                  <h3 className="text-xl font-semibold mb-2">Click to Create Safe Zones</h3>
                  <p className="text-muted-foreground mb-4">
                    Click anywhere on the map to create a new safe zone
                  </p>
                  <Button 
                    onClick={() => setIsCreating(true)}
                    className="bg-gradient-success shadow-success"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Safe Zone
                  </Button>
                </div>
              </div>
              
              {/* Mock Safe Zones Display */}
              <div className="absolute top-4 left-4 space-y-2 max-w-xs">
                {safeZones.slice(0, 3).map((zone, index) => (
                  <div 
                    key={zone.id} 
                    className="flex items-center space-x-2 bg-card p-3 rounded-lg shadow-soft animate-fade-in"
                    style={{ animationDelay: `${index * 0.2}s` }}
                  >
                    <Circle 
                      className="w-4 h-4 animate-pulse" 
                      style={{ color: zone.color }}
                      fill={zone.color}
                    />
                    <div>
                      <div className="font-medium text-sm">{zone.name}</div>
                      <div className="text-xs text-muted-foreground">{zone.radius}m radius</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Map Instructions */}
              <div className="absolute bottom-4 right-4 bg-card p-3 rounded-lg shadow-soft">
                <p className="text-sm font-medium mb-1">Google Maps Integration</p>
                <p className="text-xs text-muted-foreground">Click to place safe zones</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Safe Zones List and Creation */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Create New Zone */}
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5 text-success" />
                Create Safe Zone
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="zoneName">Zone Name</Label>
                <Input
                  id="zoneName"
                  value={newZone.name}
                  onChange={(e) => setNewZone(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="e.g., School, Home, Park"
                  className="border-input focus:ring-primary"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="radius">Radius (meters)</Label>
                <Input
                  id="radius"
                  type="number"
                  min="50"
                  max="1000"
                  value={newZone.radius}
                  onChange={(e) => setNewZone(prev => ({ ...prev, radius: parseInt(e.target.value) }))}
                  className="border-input focus:ring-primary"
                />
              </div>

              <Button 
                onClick={handleCreateZone}
                className="w-full bg-gradient-success shadow-success"
                disabled={!newZone.name.trim()}
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Create Safe Zone
              </Button>

              <div className="text-sm text-muted-foreground space-y-1">
                <p>💡 Tips:</p>
                <ul className="list-disc list-inside space-y-1 text-xs">
                  <li>Home zones: 100-200m radius</li>
                  <li>School zones: 150-300m radius</li>
                  <li>Park zones: 200-500m radius</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Safe Zones List */}
          <Card className="lg:col-span-2 shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                Active Safe Zones ({safeZones.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {safeZones.map((zone) => {
                  const childrenCount = getZoneStatus(zone.id);
                  return (
                    <div key={zone.id} className="p-4 border rounded-lg bg-gradient-card hover:shadow-soft transition-all">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <Circle 
                              className="w-5 h-5" 
                              style={{ color: zone.color }}
                              fill={zone.color}
                            />
                            <h4 className="font-medium">{zone.name}</h4>
                            {childrenCount > 0 && (
                              <Badge variant="secondary" className="bg-success text-success-foreground">
                                {childrenCount} child{childrenCount > 1 ? 'ren' : ''} inside
                              </Badge>
                            )}
                          </div>
                          
                          <div className="space-y-1 text-sm text-muted-foreground">
                            <p>📍 Radius: {zone.radius} meters</p>
                            <p>🗺️ Location: {zone.center.lat.toFixed(4)}, {zone.center.lng.toFixed(4)}</p>
                            <p>🔔 Alerts: Entry/Exit notifications enabled</p>
                          </div>
                        </div>
                        
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleDeleteZone(zone.id, zone.name)}
                            className="text-danger hover:bg-danger/10"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })}
                
                {safeZones.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <Shield className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No safe zones created yet</p>
                    <p className="text-sm">Create your first safe zone to start monitoring</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Zone Statistics */}
        <div className="grid md:grid-cols-3 gap-4">
          <Card className="bg-gradient-card shadow-soft">
            <CardContent className="p-6 text-center">
              <Shield className="h-8 w-8 text-success mx-auto mb-2" />
              <div className="text-2xl font-bold text-success">{safeZones.length}</div>
              <div className="text-sm text-muted-foreground">Active Safe Zones</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card shadow-soft">
            <CardContent className="p-6 text-center">
              <CheckCircle className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold text-primary">
                {safeZones.reduce((acc, zone) => acc + getZoneStatus(zone.id), 0)}
              </div>
              <div className="text-sm text-muted-foreground">Children in Safe Zones</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card shadow-soft">
            <CardContent className="p-6 text-center">
              <MapPin className="h-8 w-8 text-warning mx-auto mb-2" />
              <div className="text-2xl font-bold text-warning">24/7</div>
              <div className="text-sm text-muted-foreground">Active Monitoring</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SafeZones;