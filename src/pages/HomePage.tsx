import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PaymentStrip from "@/components/PaymentStrip";
import Subscription from "@/components/Subscription";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { MessageSquare, User, Shield, Zap } from "lucide-react";

const HomePage = () => {
  const slogans = [
    "Dominate CS2, Not Your Wallet.",
    "Premium CS2 Performance, Competitive Cost.",
    "Affordable CS2 Mods. Unbeatable Control."
  ];

  const features = [
    {
      icon: Shield,
      title: "Secure & Reliable",
      description: "Advanced anti-detection technology keeps you safe while gaming."
    },
    {
      icon: Zap,
      title: "High Performance",
      description: "Optimized code ensures smooth gameplay without frame drops."
    },
    {
      icon: User,
      title: "User Friendly",
      description: "Intuitive interface designed for gamers of all skill levels."
    },
    {
      icon: MessageSquare,
      title: "Community Support",
      description: "Active Discord community with dedicated support team."
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <div className="flex-1 bg-gradient-to-br from-black via-gray-900 to-red-900/20">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-4">
              <img 
                src="/lovable-uploads/fdfd75fd-0287-47f9-820e-e9d7f5f65f01.png" 
                alt="Resolux Logo" 
                className="h-64 w-auto"
                loading="eager"
                width="auto"
                height="256"
              />
            </div>
            
            <div className="space-y-4 mb-12">
              {slogans.map((slogan, index) => (
                <div key={index} className="text-2xl font-medium text-gray-300">
                  {slogan}
                </div>
              ))}
            </div>
            
            <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
              Experience the next generation of CS2 gaming enhancement with our professional-grade modification tools, 
              designed for serious Counter-Strike 2 players who demand excellence without compromise.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/forum">
                <Button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 text-lg font-medium">
                  Join Community
                </Button>
              </Link>
              <a 
                href="https://discord.gg/resolux" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <Button className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 text-lg font-medium">
                  Join Discord
                </Button>
              </a>
              <Link to="/account">
                <Button variant="outline" className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white px-8 py-3 text-lg font-medium">
                  View Account
                </Button>
              </Link>
            </div>
          </div>
          
          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="bg-gray-900 border-red-900/30 hover:border-red-700/50 transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <feature.icon className="w-12 h-12 text-red-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
      
      {/* Subscription Section */}
      <Subscription />
      
      {/* Payment Methods Strip */}
      <PaymentStrip />
      
      <Footer />
    </div>
  );
};

export default HomePage;
