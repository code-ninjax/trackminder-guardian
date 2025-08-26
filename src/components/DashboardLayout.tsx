import { ReactNode } from "react";
import { 
  Home, 
  UserPlus, 
  Shield, 
  Bell, 
  Clock, 
  Settings, 
  Menu,
  BellRing,
  MapPin
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const menuItems = [
    { icon: Home, label: "Dashboard", path: "/dashboard" },
    { icon: UserPlus, label: "Register Child", path: "/register" },
    { icon: Shield, label: "Safe Zones", path: "/safe-zones" },
    { icon: Bell, label: "Alerts", path: "/alerts", badge: "3" },
    { icon: Clock, label: "Location History", path: "/history" },
    { icon: Settings, label: "Settings", path: "/settings" }
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-16'} bg-card border-r shadow-soft transition-all duration-300 flex flex-col`}>
        {/* Logo */}
        <div className="p-4 border-b">
          <div className="flex items-center space-x-2">
            <Shield className="h-8 w-8 text-primary" />
            {sidebarOpen && <span className="text-xl font-bold text-primary">SafeTrack</span>}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => (
            <Button
              key={item.path}
              variant={isActive(item.path) ? "default" : "ghost"}
              className={`w-full justify-start ${isActive(item.path) ? 'bg-primary text-primary-foreground shadow-glow' : 'hover:bg-accent'}`}
              onClick={() => navigate(item.path)}
            >
              <item.icon className={`h-5 w-5 ${sidebarOpen ? 'mr-3' : ''}`} />
              {sidebarOpen && (
                <>
                  <span>{item.label}</span>
                  {item.badge && (
                    <Badge variant="destructive" className="ml-auto bg-danger">
                      {item.badge}
                    </Badge>
                  )}
                </>
              )}
            </Button>
          ))}
        </nav>

        {/* Collapse Toggle */}
        <div className="p-4 border-t">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="w-full"
          >
            <Menu className="h-4 w-4" />
            {sidebarOpen && <span className="ml-2">Collapse</span>}
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navigation */}
        <header className="bg-card border-b shadow-soft h-16 flex items-center justify-between px-6">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-foreground">Child Safety Dashboard</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <Button variant="ghost" size="sm" className="relative">
              <BellRing className="h-5 w-5" />
              <Badge variant="destructive" className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center p-0 text-xs bg-danger">
                3
              </Badge>
            </Button>

            {/* Status Indicator */}
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
              <span className="text-sm text-muted-foreground">All Children Safe</span>
            </div>

            {/* Back to Landing */}
            <Button variant="outline" onClick={() => navigate('/')}>
              Back to Home
            </Button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;