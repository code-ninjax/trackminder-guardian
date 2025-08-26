import { ArrowRight, Shield, MapPin, Bell, Clock, CheckCircle, Users, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: MapPin,
      title: "Real-Time Tracking",
      description: "Monitor your child's location in real-time with GPS precision and instant updates."
    },
    {
      icon: Shield,
      title: "Safe Zones",
      description: "Create custom safe zones and receive alerts when your child enters or leaves them."
    },
    {
      icon: Bell,
      title: "Instant Alerts",
      description: "Get immediate notifications for any unusual activity or emergency situations."
    },
    {
      icon: Clock,
      title: "Location History",
      description: "View detailed location history and movement patterns for complete peace of mind."
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Mother of 2",
      content: "This app gives me such peace of mind. I always know where my kids are and feel secure about their safety.",
      rating: 5
    },
    {
      name: "Mike Chen",
      role: "Father",
      content: "The real-time alerts have been a game-changer. I get notified the moment my daughter arrives at school.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="bg-card border-b shadow-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold text-primary">SafeTrack</span>
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="#features" className="text-muted-foreground hover:text-primary transition-colors">Features</a>
              <a href="#about" className="text-muted-foreground hover:text-primary transition-colors">About</a>
              <a href="#contact" className="text-muted-foreground hover:text-primary transition-colors">Contact</a>
            </div>
            <Button onClick={() => navigate('/dashboard')} className="bg-gradient-hero shadow-glow">
              Dashboard
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-hero text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
            Track Your Child in
            <span className="block text-yellow-300 animate-pulse-glow">Real Time</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto">
            Advanced GPS tracking system designed to keep your children safe with real-time location monitoring, safe zones, and instant alerts.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              onClick={() => navigate('/dashboard')} 
              size="lg" 
              className="bg-white text-primary hover:bg-white/90 shadow-success text-lg px-8 py-3 animate-bounce-gentle"
            >
              Get Started Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-white text-white hover:bg-white/10 text-lg px-8 py-3"
            >
              Watch Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">Powerful Features for Complete Safety</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our comprehensive tracking system provides everything you need to keep your children safe and secure.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="bg-gradient-card shadow-soft hover:shadow-glow transition-all duration-300 hover:-translate-y-2">
                <CardContent className="p-6 text-center">
                  <feature.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Map Demo Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">Live Tracking Dashboard</h2>
            <p className="text-xl text-muted-foreground">
              See how our real-time tracking works with interactive maps and live updates.
            </p>
          </div>
          <div className="bg-card rounded-xl shadow-soft overflow-hidden">
            <div className="h-96 bg-gradient-to-br from-blue-100 to-green-100 flex items-center justify-center relative">
              <div className="absolute inset-4 bg-white rounded-lg shadow-inner flex items-center justify-center">
                <div className="text-center">
                  <Globe className="h-16 w-16 text-primary mx-auto mb-4 animate-spin" />
                  <h3 className="text-2xl font-semibold text-foreground mb-2">Interactive Map Demo</h3>
                  <p className="text-muted-foreground mb-4">Click "Get Started" to see the full tracking dashboard</p>
                  <div className="flex space-x-4 justify-center">
                    <div className="w-3 h-3 bg-child-1 rounded-full animate-pulse"></div>
                    <div className="w-3 h-3 bg-child-2 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
                    <div className="w-3 h-3 bg-child-3 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="space-y-2">
              <div className="text-4xl font-bold text-primary">10,000+</div>
              <div className="text-muted-foreground">Children Protected</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-success">99.9%</div>
              <div className="text-muted-foreground">Tracking Accuracy</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-secondary">24/7</div>
              <div className="text-muted-foreground">Monitoring Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Shield className="h-8 w-8" />
                <span className="text-xl font-bold">SafeTrack</span>
              </div>
              <p className="text-primary-foreground/80">
                Keeping children safe with advanced tracking technology and real-time monitoring.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <div className="space-y-2">
                <button onClick={() => navigate('/dashboard')} className="block text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Dashboard
                </button>
                <button onClick={() => navigate('/register')} className="block text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Register Child
                </button>
                <button onClick={() => navigate('/safe-zones')} className="block text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Safe Zones
                </button>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <div className="space-y-2">
                <a href="#" className="block text-primary-foreground/80 hover:text-primary-foreground transition-colors">Help Center</a>
                <a href="#" className="block text-primary-foreground/80 hover:text-primary-foreground transition-colors">Contact Us</a>
                <a href="#" className="block text-primary-foreground/80 hover:text-primary-foreground transition-colors">Privacy Policy</a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Features</h4>
              <div className="space-y-2">
                <button onClick={() => navigate('/alerts')} className="block text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Alerts
                </button>
                <button onClick={() => navigate('/history')} className="block text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Location History
                </button>
                <button onClick={() => navigate('/settings')} className="block text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Settings
                </button>
              </div>
            </div>
          </div>
          <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-primary-foreground/60">
            <p>&copy; 2024 SafeTrack. All rights reserved. This is a demo application.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;