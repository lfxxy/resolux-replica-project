import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
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

  const renderContent = () => {
    switch (selectedSection) {
      case "general":
        return (
          <div className="space-y-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Profile Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Username</label>
                    <Input className="bg-gray-700 border-gray-600 text-white" defaultValue="user123" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                    <Input className="bg-gray-700 border-gray-600 text-white" defaultValue="user@example.com" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Discord ID</label>
                  <Input className="bg-gray-700 border-gray-600 text-white" placeholder="Not connected" />
                </div>
                <Button className="bg-red-600 hover:bg-red-700">Save Changes</Button>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Account Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Subscription Status</span>
                    <Badge className="bg-green-600">Active</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Plan</span>
                    <span className="text-white">Premium</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Valid Until</span>
                    <span className="text-white">March 15, 2024</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case "subscriptions":
        return (
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Active Subscriptions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border border-gray-600 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-white font-semibold">Resolux Premium</h3>
                      <p className="text-gray-400 text-sm">Full access to all features</p>
                    </div>
                    <Badge className="bg-green-600">Active</Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-400">Started:</span>
                      <span className="text-white ml-2">March 1, 2024</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Expires:</span>
                      <span className="text-white ml-2">March 1, 2025</span>
                    </div>
                  </div>
                </div>
                <Button className="bg-red-600 hover:bg-red-700">Manage Subscription</Button>
              </div>
            </CardContent>
          </Card>
        );

      case "purchases":
        return (
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Purchase History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { id: "#RX001", product: "Resolux Premium", date: "March 1, 2024", amount: "$29.99", status: "Completed" },
                  { id: "#RX002", product: "Hardware Reset", date: "February 15, 2024", amount: "$9.99", status: "Completed" },
                ].map((purchase) => (
                  <div key={purchase.id} className="border border-gray-600 rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-white font-medium">{purchase.product}</h3>
                        <p className="text-gray-400 text-sm">{purchase.id} • {purchase.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-white font-semibold">{purchase.amount}</p>
                        <Badge className="bg-green-600 text-xs">{purchase.status}</Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        );

      default:
        return (
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white capitalize">{selectedSection}</CardTitle>
            </CardHeader>
            <CardContent>
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
          {/* Sidebar */}
          <div className="w-64">
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-3">
                <div className="space-y-1">
                  {menuItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setSelectedSection(item.id)}
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

          {/* Main Content */}
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
