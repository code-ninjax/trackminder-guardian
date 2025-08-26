import { useState, useEffect } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Bell, 
  AlertTriangle, 
  Clock, 
  Shield, 
  Phone, 
  CheckCircle,
  XCircle,
  Volume2,
  VolumeX,
  RefreshCw
} from "lucide-react";
import { mockAlerts, playNotificationSound } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";

const Alerts = () => {
  const { toast } = useToast();
  const [alerts, setAlerts] = useState(mockAlerts);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [filter, setFilter] = useState<'all' | 'active' | 'resolved'>('all');

  // Simulate real-time alerts
  useEffect(() => {
    const interval = setInterval(() => {
      // Random chance to generate a new alert
      if (Math.random() < 0.3) { // 30% chance every 10 seconds
        const newAlert = {
          id: Date.now().toString(),
          childId: (Math.floor(Math.random() * 3) + 1).toString(),
          childName: ['Emma Johnson', 'Lucas Chen', 'Sophia Williams'][Math.floor(Math.random() * 3)],
          type: ['safe_zone_exit', 'safe_zone_enter', 'low_battery'][Math.floor(Math.random() * 3)] as 'safe_zone_exit' | 'safe_zone_enter' | 'low_battery',
          message: [
            'Child has left the designated safe zone',
            'Child has entered a safe zone',
            'Device battery is running low (20% remaining)'
          ][Math.floor(Math.random() * 3)],
          timestamp: new Date(),
          severity: ['low', 'medium', 'high'][Math.floor(Math.random() * 3)] as 'low' | 'medium' | 'high',
          status: 'active' as 'active'
        };

        setAlerts(prev => [newAlert, ...prev]);
        
        if (soundEnabled) {
          playNotificationSound(newAlert.severity === 'high' ? 'error' : 'warning');
        }
        
        toast({
          title: "🚨 New Alert",
          description: `${newAlert.childName}: ${newAlert.message}`,
          duration: 5000,
        });
      }
    }, 10000); // Every 10 seconds

    return () => clearInterval(interval);
  }, [soundEnabled, toast]);

  const handleSendAlert = () => {
    toast({
      title: "🚨 Alert Sent to Authorities",
      description: "Emergency services have been notified and are responding",
      duration: 5000,
    });
    
    playNotificationSound('error');
    
    // Add a new emergency alert
    const emergencyAlert = {
      id: Date.now().toString(),
      childId: '1',
      childName: 'Emergency Alert',
      type: 'emergency' as any,
      message: 'Manual emergency alert sent to local authorities',
      timestamp: new Date(),
      severity: 'high' as any,
      status: 'active' as any
    };
    
    setAlerts(prev => [emergencyAlert, ...prev]);
  };

  const handleResolveAlert = (alertId: string) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === alertId 
        ? { ...alert, status: 'resolved' as any }
        : alert
    ));
    
    toast({
      title: "✅ Alert Resolved",
      description: "Alert has been marked as resolved",
      duration: 3000,
    });
    
    playNotificationSound('success');
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'destructive';
      case 'medium': return 'secondary';
      case 'low': return 'outline';
      default: return 'outline';
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'safe_zone_exit': return <XCircle className="h-4 w-4" />;
      case 'safe_zone_enter': return <CheckCircle className="h-4 w-4" />;
      case 'emergency': return <AlertTriangle className="h-4 w-4" />;
      default: return <Bell className="h-4 w-4" />;
    }
  };

  const filteredAlerts = alerts.filter(alert => {
    if (filter === 'all') return true;
    return alert.status === filter;
  });

  const activeAlerts = alerts.filter(alert => alert.status === 'active');

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <Card className="bg-gradient-danger text-white shadow-danger">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-2xl">
              <Bell className="h-8 w-8" />
              Alert Management Center
            </CardTitle>
            <p className="text-white/90">
              Monitor and respond to all child safety alerts in real-time
            </p>
          </CardHeader>
        </Card>

        {/* Alert Controls */}
        <div className="grid lg:grid-cols-4 gap-4">
          <Card className="bg-gradient-card shadow-soft">
            <CardContent className="p-6 text-center">
              <AlertTriangle className="h-8 w-8 text-warning mx-auto mb-2" />
              <div className="text-2xl font-bold text-warning">{activeAlerts.length}</div>
              <div className="text-sm text-muted-foreground">Active Alerts</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card shadow-soft">
            <CardContent className="p-6 text-center">
              <Clock className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold text-primary">
                {alerts.filter(a => a.timestamp > new Date(Date.now() - 24*60*60*1000)).length}
              </div>
              <div className="text-sm text-muted-foreground">Last 24 Hours</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card shadow-soft">
            <CardContent className="p-6 text-center">
              <Shield className="h-8 w-8 text-success mx-auto mb-2" />
              <div className="text-2xl font-bold text-success">
                {alerts.filter(a => a.status === 'resolved').length}
              </div>
              <div className="text-sm text-muted-foreground">Resolved</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card shadow-soft">
            <CardContent className="p-6 flex flex-col items-center gap-2">
              <Button 
                onClick={handleSendAlert}
                className="bg-gradient-danger shadow-danger w-full animate-pulse-glow"
                size="lg"
              >
                <Phone className="w-4 h-4 mr-2" />
                Alert Authorities
              </Button>
              <div className="text-xs text-muted-foreground text-center">Emergency Response</div>
            </CardContent>
          </Card>
        </div>

        {/* Controls */}
        <Card className="shadow-soft">
          <CardContent className="p-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Filter:</span>
                  <div className="flex gap-2">
                    {(['all', 'active', 'resolved'] as const).map((filterType) => (
                      <Button
                        key={filterType}
                        variant={filter === filterType ? "default" : "outline"}
                        size="sm"
                        onClick={() => setFilter(filterType)}
                        className={filter === filterType ? 'bg-primary' : ''}
                      >
                        {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSoundEnabled(!soundEnabled)}
                  className="flex items-center gap-2"
                >
                  {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                  Sound {soundEnabled ? 'On' : 'Off'}
                </Button>

                <Button variant="outline" size="sm">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Refresh
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Alerts List */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-primary" />
              Alert History ({filteredAlerts.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {filteredAlerts.map((alert) => (
                <div 
                  key={alert.id} 
                  className={`p-4 border rounded-lg transition-all hover:shadow-soft ${
                    alert.status === 'active' ? 'bg-gradient-card' : 'bg-muted/30'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        {getAlertIcon(alert.type)}
                        <h4 className="font-medium">{alert.childName}</h4>
                        <Badge variant={getSeverityColor(alert.severity) as any}>
                          {alert.severity.toUpperCase()}
                        </Badge>
                        <Badge variant={alert.status === 'active' ? 'destructive' : 'outline'}>
                          {alert.status.toUpperCase()}
                        </Badge>
                      </div>
                      
                      <p className="text-muted-foreground mb-2">{alert.message}</p>
                      
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {alert.timestamp.toLocaleString()}
                        </div>
                        <div className="capitalize">Type: {alert.type.replace('_', ' ')}</div>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      {alert.status === 'active' && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleResolveAlert(alert.id)}
                          className="text-success hover:bg-success/10"
                        >
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Resolve
                        </Button>
                      )}
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
              
              {filteredAlerts.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <Bell className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No alerts found</p>
                  <p className="text-sm">
                    {filter === 'all' ? 'All children are safe and secure' : `No ${filter} alerts at this time`}
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Emergency Contact Info */}
        <Card className="bg-danger/5 border-danger shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-danger">
              <Phone className="h-5 w-5" />
              Emergency Contacts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div>
                <p className="font-medium mb-1">Local Emergency</p>
                <p className="text-muted-foreground">911</p>
              </div>
              <div>
                <p className="font-medium mb-1">Non-Emergency Police</p>
                <p className="text-muted-foreground">(555) 123-4567</p>
              </div>
              <div>
                <p className="font-medium mb-1">SafeTrack Support</p>
                <p className="text-muted-foreground">(555) SAFE-TRACK</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Alerts;