
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useStripeSubscription } from "@/hooks/useStripeSubscription";
import { Settings, RefreshCw } from "lucide-react";

const AccountSubscriptions = () => {
  const { 
    subscribed, 
    subscription_tier, 
    subscription_end, 
    loading, 
    checkSubscription, 
    openCustomerPortal 
  } = useStripeSubscription();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-white">Active Subscriptions</CardTitle>
        <Button
          onClick={checkSubscription}
          disabled={loading}
          variant="outline"
          size="sm"
          className="border-gray-600 text-gray-300 hover:bg-gray-700"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {subscribed ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                <div>
                  <h3 className="text-white font-medium">Resolux {subscription_tier} Plan</h3>
                  {subscription_end && (
                    <p className="text-gray-400 text-sm">
                      Valid until {formatDate(subscription_end)}
                    </p>
                  )}
                </div>
                <Badge className="bg-green-600 hover:bg-green-700">
                  Active
                </Badge>
              </div>
              <Button 
                onClick={openCustomerPortal}
                className="w-full bg-red-600 hover:bg-red-700"
              >
                <Settings className="w-4 h-4 mr-2" />
                Manage Subscription
              </Button>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-400 mb-4">No active subscriptions</p>
              <Button 
                onClick={() => window.location.href = '/home#subscriptions'}
                className="bg-red-600 hover:bg-red-700"
              >
                Browse Plans
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AccountSubscriptions;
