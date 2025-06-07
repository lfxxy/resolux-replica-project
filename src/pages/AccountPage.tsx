
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { useSubscriptions } from "@/hooks/useSubscriptions";
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
  const { user, logout } = useAuth();
  const { subscriptions, loading: subscriptionsLoading } = useSubscriptions();

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

  const activeSubscription = subscriptions.find(sub => sub.status === 'active');

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

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
                    <Input 
                      className="bg-gray-700 border-gray-600 text-white" 
                      defaultValue={user?.username || ''} 
                      placeholder="No username set"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                    <Input 
                      className="bg-gray-700 border-gray-600 text-white" 
                      defaultValue={user?.email || ''} 
                      disabled
                    />
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
                    <Badge className={activeSubscription ? "bg-green-600" : "bg-gray-600"}>
                      {activeSubscription ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Plan</span>
                    <span className="text-white">
                      {activeSubscription ? activeSubscription.plan_type : "No active plan"}
                    </span>
                  </div>
                  {activeSubscription && (
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Valid Until</span>
                      <span className="text-white">{formatDate(activeSubscription.expires_at)}</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case "subscriptions":
        if (subscriptionsLoading) {
          return (
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Active Subscriptions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin w-6 h-6 border-2 border-red-600 border-t-transparent rounded-full"></div>
                </div>
              </CardContent>
            </Card>
          );
        }

        return (
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Active Subscriptions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {subscriptions.length > 0 ? (
                  subscriptions.map((subscription) => (
                    <div key={subscription.id} className="border border-gray-600 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="text-white font-semibold">Resolux {subscription.plan_type}</h3>
                          <p className="text-gray-400 text-sm">Full access to all features</p>
                        </div>
                        <Badge className={subscription.status === 'active' ? "bg-green-600" : "bg-gray-600"}>
                          {subscription.status}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-400">Started:</span>
                          <span className="text-white ml-2">{formatDate(subscription.started_at)}</span>
                        </div>
                        <div>
                          <span className="text-gray-400">Expires:</span>
                          <span className="text-white ml-2">{formatDate(subscription.expires_at)}</span>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-400">No active subscriptions</p>
                    <Button className="bg-red-600 hover:bg-red-700 mt-4">
                      Browse Plans
                    </Button>
                  </div>
                )}
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
                {subscriptions.length > 0 ? (
                  subscriptions.map((subscription) => (
                    <div key={subscription.id} className="border border-gray-600 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="text-white font-medium">Resolux {subscription.plan_type}</h3>
                          <p className="text-gray-400 text-sm">
                            {subscription.id.slice(0, 8)} • {formatDate(subscription.started_at)}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-white font-semibold">
                            ${subscription.plan_type === 'monthly' ? '29.99' : '299.99'}
                          </p>
                          <Badge className="bg-green-600 text-xs">Completed</Badge>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-400 text-center py-4">No purchase history available</p>
                )}
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
