
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import SecuritySection from "@/components/SecuritySection";
import AccountGeneral from "@/components/AccountGeneral";
import AccountSubscriptions from "@/components/AccountSubscriptions";
import AccountPurchases from "@/components/AccountPurchases";
import { 
  Settings, 
  Shield, 
  Users, 
  FileText, 
  CreditCard, 
  Package, 
  Key, 
  Gift, 
  Monitor, 
  Download,
  LogOut
} from "lucide-react";

const AccountPage = () => {
  const [selectedSection, setSelectedSection] = useState("general");
  const { logout } = useAuth();

  const menuItems = [
    { id: "general", name: "General", icon: Settings },
    { id: "security", name: "Security", icon: Shield },
    { id: "accounts", name: "Accounts", icon: Users },
    { id: "configs", name: "Configs", icon: FileText },
    { id: "tickets", name: "Tickets", icon: FileText },
    { id: "purchases", name: "Purchases", icon: CreditCard },
    { id: "subscriptions", name: "Subscriptions", icon: Package },
    { id: "activation", name: "Activation keys", icon: Key },
    { id: "referral", name: "Referral system", icon: Gift },
    { id: "hardware", name: "Hardware resets", icon: Monitor },
    { id: "download", name: "Download launcher", icon: Download },
    { id: "logout", name: "Logout", icon: LogOut },
  ];

  const handleLogout = async () => {
    if (selectedSection === "logout") {
      await logout();
    }
  };

  const renderContent = () => {
    switch (selectedSection) {
      case "general":
        return <AccountGeneral />;
      case "security":
        return <SecuritySection />;
      case "subscriptions":
        return <AccountSubscriptions />;
      case "purchases":
        return <AccountPurchases />;
      default:
        return (
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <p className="text-gray-400">This section is coming soon.</p>
            </CardContent>
          </Card>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      <Header />
      
      <div className="container mx-auto px-4 py-6 flex-1">
        <div className="flex gap-6">
          <div className="w-64">
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-3">
                <div className="space-y-1">
                  {menuItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        setSelectedSection(item.id);
                        if (item.id === "logout") {
                          handleLogout();
                        }
                      }}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded text-left transition-colors ${
                        selectedSection === item.id 
                          ? 'bg-red-600 text-white' 
                          : 'text-gray-300 hover:bg-gray-700'
                      }`}
                    >
                      <item.icon className="h-4 w-4" />
                      {item.name}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex-1">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-white mb-2">Account Settings</h1>
              <p className="text-gray-400">
                Manage your Resolux account settings and preferences.
              </p>
            </div>

            {renderContent()}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default AccountPage;
