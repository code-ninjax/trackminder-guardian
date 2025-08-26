import { useState, useEffect } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  MapPin, 
  Users, 
  Shield, 
  AlertTriangle, 
  Clock,
  Battery,
  Navigation,
  Eye,
  EyeOff
} from "lucide-react";
import { mockChildren, mockSafeZones, mockAlerts, playNotificationSound } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";

const Dashboard = () => {
  const { toast } = useToast();
  const [children] = useState(mockChildren);
  const [safeZones] = useState(mockSafeZones);
  const [alerts] = useState(mockAlerts.filter(alert => alert.status === 'active'));
  const [showAllChildren, setShowAllChildren] = useState(true);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate random location updates and notifications
      const randomChild = children[Math.floor(Math.random() * children.length)];
      const notifications = [
        `📍 ${randomChild.name} location updated`,
        `✅ ${randomChild.name} is safe and active`,
        `🔋 ${randomChild.name}'s device battery: 85%`
      ];
      
      const randomNotification = notifications[Math.floor(Math.random() * notifications.length)];
      
      toast({
        title: "Real-time Update",
        description: randomNotification,
      });
      
      playNotificationSound('success');
    }, 15000); // Every 15 seconds

    return () => clearInterval(interval);
  }, [children, toast]);

  const getChildStatusColor = (child: any) => {
    if (child.isInSafeZone) return 'success';
    return 'warning';
  };

  const getChildStatusText = (child: any) => {
    if (child.isInSafeZone) return 'In Safe Zone';
    return 'Outside Safe Zone';
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          <Card className="bg-blue-subtle shadow-soft">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Children</CardTitle>
              <Users className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-xl lg:text-2xl font-bold text-primary">{children.length}</div>
              <p className="text-xs text-muted-foreground">All registered and tracked</p>
            </CardContent>
          </Card>

          <Card className="bg-blue-subtle shadow-soft">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Safe Zones</CardTitle>
              <Shield className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-xl lg:text-2xl font-bold text-success">{safeZones.length}</div>
              <p className="text-xs text-muted-foreground">Active monitoring areas</p>
            </CardContent>
          </Card>

          <Card className="bg-blue-subtle shadow-soft">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
              <AlertTriangle className="h-4 w-4 text-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-xl lg:text-2xl font-bold text-warning">{alerts.length}</div>
              <p className="text-xs text-muted-foreground">Require attention</p>
            </CardContent>
          </Card>

          <Card className="bg-blue-subtle shadow-soft">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Last Update</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-xl lg:text-2xl font-bold text-muted-foreground">2m ago</div>
              <p className="text-xs text-muted-foreground">Real-time tracking</p>
            </CardContent>
          </Card>
        </div>

        {/* Map and Children Status */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 lg:gap-6">
          {/* Interactive Map */}
          <Card className="xl:col-span-2 shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <MapPin className="h-5 w-5 text-primary" />
                Live Tracking Map
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 lg:h-96 bg-gradient-to-br from-hsl(var(--blue-50)) to-hsl(var(--blue-100)) rounded-lg border-2 border-border relative overflow-hidden">
                {/* Map Simulation */}
                <div className="absolute inset-0 bg-card/80 flex items-center justify-center">
                  <div className="text-center px-4">
                    <Navigation className="h-12 lg:h-16 w-12 lg:w-16 text-primary mx-auto mb-4 animate-spin" />
                    <h3 className="text-lg lg:text-xl font-semibold mb-2">Interactive Tracking Map</h3>
                    <p className="text-sm lg:text-base text-muted-foreground mb-4">Real Google Maps integration with live tracking</p>
                    <div className="text-xs lg:text-sm text-muted-foreground">
                      <p>🗺️ Google Maps API Required</p>
                      <p className="mt-2">Demo showing:</p>
                    </div>
                  </div>
                </div>
                
                {/* Mock Children Locations */}
                <div className="absolute top-2 lg:top-4 left-2 lg:left-4 space-y-1 lg:space-y-2">
                  {children.map((child, index) => (
                    <div 
                      key={child.id} 
                      className={`flex items-center space-x-2 bg-card p-1.5 lg:p-2 rounded-lg shadow-soft animate-fade-in`}
                      style={{ animationDelay: `${index * 0.2}s` }}
                    >
                      <div className={`w-2 lg:w-3 h-2 lg:h-3 rounded-full animate-pulse ${
                        index === 0 ? 'bg-child-1' : 
                        index === 1 ? 'bg-child-2' : 'bg-child-3'
                      }`}></div>
                      <span className="text-xs font-medium">{child.name}</span>
                    </div>
                  ))}
                </div>

                {/* Mock Safe Zones */}
                <div className="absolute bottom-2 lg:bottom-4 right-2 lg:right-4 space-y-1 lg:space-y-2">
                  {safeZones.slice(0, 2).map((zone, index) => (
                    <div 
                      key={zone.id} 
                      className="flex items-center space-x-2 bg-card p-1.5 lg:p-2 rounded-lg shadow-soft"
                    >
                      <Shield className="w-2 lg:w-3 h-2 lg:h-3 text-success" />
                      <span className="text-xs hidden sm:inline">{zone.name}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mt-4 flex flex-col sm:flex-row gap-2 sm:justify-between sm:items-center">
                <Button variant="outline" size="sm" className="w-full sm:w-auto">
                  <MapPin className="w-4 h-4 mr-2" />
                  Recenter Map
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setShowAllChildren(!showAllChildren)}
                  className="w-full sm:w-auto"
                >
                  {showAllChildren ? <EyeOff className="w-4 h-4 mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
                  {showAllChildren ? 'Hide' : 'Show'} All Children
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Children Status Panel */}
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Users className="h-5 w-5 text-primary" />
                Children Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 lg:space-y-4">
              {children.map((child) => (
                <div key={child.id} className="p-3 lg:p-4 border rounded-lg bg-blue-subtle hover:shadow-soft transition-all">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-medium text-sm lg:text-base">{child.name}</h4>
                      <p className="text-xs lg:text-sm text-muted-foreground">Age {child.age}</p>
                    </div>
                    <Badge variant={getChildStatusColor(child) as any} className="text-xs">
                      {getChildStatusText(child)}
                    </Badge>
                  </div>
                  
                  <div className="space-y-1 lg:space-y-2 text-xs lg:text-sm">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3 h-3 text-muted-foreground flex-shrink-0" />
                      <span className="text-muted-foreground truncate">{child.location.address}</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Clock className="w-3 h-3 text-muted-foreground flex-shrink-0" />
                      <span className="text-muted-foreground">
                        {Math.floor((Date.now() - child.location.timestamp.getTime()) / 60000)}m ago
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Battery className="w-3 h-3 text-success flex-shrink-0" />
                      <span className="text-success">85% Battery</span>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Recent Alerts */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <AlertTriangle className="h-5 w-5 text-warning" />
              Recent Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {alerts.slice(0, 3).map((alert) => (
                <div key={alert.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 border rounded-lg bg-blue-subtle gap-3 sm:gap-0">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <Badge variant={alert.severity === 'high' ? 'destructive' : alert.severity === 'medium' ? 'secondary' : 'outline'}>
                        {alert.severity.toUpperCase()}
                      </Badge>
                      <span className="font-medium text-sm lg:text-base">{alert.childName}</span>
                    </div>
                    <p className="text-xs lg:text-sm text-muted-foreground">{alert.message}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {Math.floor((Date.now() - alert.timestamp.getTime()) / 60000)} minutes ago
                    </p>
                  </div>
                  <Button variant="outline" size="sm" className="w-full sm:w-auto">
                    View Details
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;