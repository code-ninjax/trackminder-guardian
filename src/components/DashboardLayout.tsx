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
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { ThemeToggle } from "@/components/ThemeToggle";

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
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} 
        ${sidebarOpen ? 'w-64' : 'lg:w-16'} 
        fixed lg:relative z-50 lg:z-auto
        bg-card border-r shadow-soft transition-all duration-300 
        flex flex-col h-screen
      `}>
        {/* Logo */}
        <div className="p-4 border-b flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Shield className="h-8 w-8 text-primary" />
            {(sidebarOpen || window.innerWidth >= 1024) && (
              <span className="text-xl font-bold text-primary">SafeTrack</span>
            )}
          </div>
          {/* Mobile close button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => (
            <Button
              key={item.path}
              variant={isActive(item.path) ? "default" : "ghost"}
              className={`w-full justify-start ${
                isActive(item.path) 
                  ? 'bg-primary text-primary-foreground shadow-glow' 
                  : 'hover:bg-accent'
              }`}
              onClick={() => {
                navigate(item.path);
                // Close sidebar on mobile after navigation
                if (window.innerWidth < 1024) {
                  setSidebarOpen(false);
                }
              }}
            >
              <item.icon className={`h-5 w-5 ${(sidebarOpen || window.innerWidth >= 1024) ? 'mr-3' : ''}`} />
              {(sidebarOpen || window.innerWidth >= 1024) && (
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

        {/* Collapse Toggle - Desktop only */}
        <div className="p-4 border-t hidden lg:block">
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
      <div className="flex-1 flex flex-col lg:ml-0">
        {/* Top Navigation */}
        <header className="bg-card border-b shadow-soft h-16 flex items-center justify-between px-4 lg:px-6">
          <div className="flex items-center space-x-4">
            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </Button>
            <h1 className="text-lg lg:text-2xl font-bold text-foreground hidden sm:block">
              Child Safety Dashboard
            </h1>
            <h1 className="text-lg font-bold text-foreground sm:hidden">SafeTrack</h1>
          </div>
          
          <div className="flex items-center space-x-2 lg:space-x-4">
            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Notifications */}
            <Button variant="ghost" size="sm" className="relative">
              <BellRing className="h-5 w-5" />
              <Badge variant="destructive" className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center p-0 text-xs bg-danger">
                3
              </Badge>
            </Button>

            {/* Status Indicator - Hidden on mobile */}
            <div className="hidden md:flex items-center space-x-2">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
              <span className="text-sm text-muted-foreground">All Children Safe</span>
            </div>

            {/* Back to Landing - Hidden on small screens */}
            <Button variant="outline" onClick={() => navigate('/')} className="hidden sm:flex">
              Back to Home
            </Button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 lg:p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;