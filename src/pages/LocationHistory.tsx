import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Clock, 
  MapPin, 
  Calendar, 
  Download, 
  Filter,
  User,
  Navigation,
  TrendingUp
} from "lucide-react";
import { mockLocationHistory, mockChildren } from "@/data/mockData";

const LocationHistory = () => {
  const [selectedChild, setSelectedChild] = useState<string>('all');
  const [dateFilter, setDateFilter] = useState<string>('today');
  const [locationHistory] = useState(mockLocationHistory);

  const filteredHistory = locationHistory.filter(entry => {
    const matchesChild = selectedChild === 'all' || entry.childId === selectedChild;
    const entryDate = entry.timestamp;
    const now = new Date();
    
    let matchesDate = true;
    if (dateFilter === 'today') {
      matchesDate = entryDate.toDateString() === now.toDateString();
    } else if (dateFilter === 'week') {
      const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      matchesDate = entryDate >= weekAgo;
    } else if (dateFilter === 'month') {
      const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      matchesDate = entryDate >= monthAgo;
    }
    
    return matchesChild && matchesDate;
  });

  const getChildName = (childId: string) => {
    const child = mockChildren.find(c => c.id === childId);
    return child ? child.name : 'Unknown Child';
  };

  const getChildColor = (childId: string) => {
    const colors = ['child-1', 'child-2', 'child-3'];
    const index = parseInt(childId) - 1;
    return colors[index] || 'child-1';
  };

  const formatTimeAgo = (timestamp: Date) => {
    const diff = Date.now() - timestamp.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    
    if (hours > 0) return `${hours}h ${minutes % 60}m ago`;
    return `${minutes}m ago`;
  };

  // Generate mock analytics data
  const generateAnalytics = () => {
    const totalEntries = filteredHistory.length;
    const uniqueLocations = new Set(filteredHistory.map(h => h.location.address)).size;
    const averageMovements = Math.round(totalEntries / 7); // per day average
    
    return { totalEntries, uniqueLocations, averageMovements };
  };

  const analytics = generateAnalytics();

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <Card className="bg-gradient-hero text-white shadow-glow">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-2xl">
              <Clock className="h-8 w-8" />
              Location History & Analytics
            </CardTitle>
            <p className="text-white/90">
              View detailed location history and movement patterns for all registered children
            </p>
          </CardHeader>
        </Card>

        {/* Analytics Cards */}
        <div className="grid md:grid-cols-4 gap-4">
          <Card className="bg-gradient-card shadow-soft">
            <CardContent className="p-6 text-center">
              <MapPin className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold text-primary">{analytics.totalEntries}</div>
              <div className="text-sm text-muted-foreground">Total Locations</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card shadow-soft">
            <CardContent className="p-6 text-center">
              <Navigation className="h-8 w-8 text-success mx-auto mb-2" />
              <div className="text-2xl font-bold text-success">{analytics.uniqueLocations}</div>
              <div className="text-sm text-muted-foreground">Unique Places</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card shadow-soft">
            <CardContent className="p-6 text-center">
              <TrendingUp className="h-8 w-8 text-warning mx-auto mb-2" />
              <div className="text-2xl font-bold text-warning">{analytics.averageMovements}</div>
              <div className="text-sm text-muted-foreground">Avg. Daily Moves</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card shadow-soft">
            <CardContent className="p-6 text-center">
              <Clock className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
              <div className="text-2xl font-bold text-muted-foreground">Real-time</div>
              <div className="text-sm text-muted-foreground">Live Tracking</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Controls */}
        <Card className="shadow-soft">
          <CardContent className="p-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span className="text-sm font-medium">Child:</span>
                  <div className="flex gap-2">
                    <Button
                      variant={selectedChild === 'all' ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedChild('all')}
                    >
                      All Children
                    </Button>
                    {mockChildren.map((child) => (
                      <Button
                        key={child.id}
                        variant={selectedChild === child.id ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedChild(child.id)}
                        className={selectedChild === child.id ? `bg-${getChildColor(child.id)}` : ''}
                      >
                        {child.name.split(' ')[0]}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm font-medium">Period:</span>
                  <div className="flex gap-2">
                    {[
                      { key: 'today', label: 'Today' },
                      { key: 'week', label: 'Week' },
                      { key: 'month', label: 'Month' }
                    ].map((period) => (
                      <Button
                        key={period.key}
                        variant={dateFilter === period.key ? "default" : "outline"}
                        size="sm"
                        onClick={() => setDateFilter(period.key)}
                      >
                        {period.label}
                      </Button>
                    ))}
                  </div>
                </div>

                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Timeline and Map */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Location Timeline */}
          <Card className="lg:col-span-2 shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                Movement Timeline ({filteredHistory.length} entries)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {filteredHistory.map((entry, index) => (
                  <div key={entry.id} className="flex items-start gap-4 p-3 border rounded-lg bg-gradient-card hover:shadow-soft transition-all">
                    <div className={`w-3 h-3 rounded-full mt-2 bg-${getChildColor(entry.childId)} animate-pulse`}></div>
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{getChildName(entry.childId)}</h4>
                        <Badge variant="outline" className="text-xs">
                          {formatTimeAgo(entry.timestamp)}
                        </Badge>
                      </div>
                      
                      <div className="space-y-1 text-sm">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-3 h-3 text-muted-foreground" />
                          <span className="text-muted-foreground">{entry.location.address}</span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Navigation className="w-3 h-3 text-muted-foreground" />
                          <span className="text-muted-foreground">
                            {entry.location.lat.toFixed(4)}, {entry.location.lng.toFixed(4)}
                          </span>
                        </div>
                        
                        <div className="text-primary font-medium">{entry.activity}</div>
                      </div>
                    </div>
                  </div>
                ))}
                
                {filteredHistory.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <Clock className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No location history found</p>
                    <p className="text-sm">
                      {selectedChild === 'all' 
                        ? `No movements recorded for the selected time period`
                        : `No movements recorded for ${getChildName(selectedChild)} in the selected time period`
                      }
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Movement Map */}
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                Movement Map
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-96 bg-gradient-to-br from-blue-50 to-green-50 rounded-lg border-2 border-border relative overflow-hidden">
                <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
                  <div className="text-center">
                    <Navigation className="h-16 w-16 text-primary mx-auto mb-4 animate-spin" />
                    <h3 className="text-lg font-semibold mb-2">Route Visualization</h3>
                    <p className="text-muted-foreground mb-4 text-sm">
                      Movement paths and visited locations
                    </p>
                    <div className="space-y-2">
                      {mockChildren.slice(0, 3).map((child, index) => (
                        <div key={child.id} className="flex items-center justify-center gap-2 text-sm">
                          <div className={`w-3 h-3 rounded-full bg-${getChildColor(child.id)}`}></div>
                          <span>{child.name.split(' ')[0]}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 space-y-2">
                <h4 className="font-medium text-sm">Most Visited Locations</h4>
                <div className="space-y-1 text-xs text-muted-foreground">
                  <div className="flex justify-between">
                    <span>🏠 Home Areas</span>
                    <span>45%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>🏫 School Zones</span>
                    <span>30%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>🏪 Community Areas</span>
                    <span>25%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Activity Summary */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Activity Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary mb-1">
                  {filteredHistory.filter(h => h.activity.includes('home')).length}
                </div>
                <div className="text-sm text-muted-foreground">Home Visits</div>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-success mb-1">
                  {filteredHistory.filter(h => h.activity.includes('school')).length}
                </div>
                <div className="text-sm text-muted-foreground">School Activities</div>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-warning mb-1">
                  {filteredHistory.filter(h => h.activity.includes('play')).length}
                </div>
                <div className="text-sm text-muted-foreground">Recreation</div>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-muted-foreground mb-1">
                  {new Set(filteredHistory.map(h => h.location.address)).size}
                </div>
                <div className="text-sm text-muted-foreground">Unique Locations</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default LocationHistory;