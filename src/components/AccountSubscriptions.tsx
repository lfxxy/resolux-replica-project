
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useSubscriptions } from "@/hooks/useSubscriptions";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const AccountSubscriptions = () => {
  const { subscriptions, loading: subscriptionsLoading, refetch } = useSubscriptions();
  const { toast } = useToast();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleManageSubscription = async () => {
    try {
      const { data, error } = await supabase.functions.invoke('customer-portal');

      if (error) {
        console.error('Customer portal error:', error);
        toast({
          title: "Error",
          description: "Failed to open subscription management. Please try again.",
          variant: "destructive"
        });
        return;
      }

      if (data?.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error('Customer portal error:', error);
      toast({
        title: "Error",
        description: "Failed to open subscription management. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleRefreshStatus = async () => {
    try {
      const { error } = await supabase.functions.invoke('check-subscription');
      
      if (error) {
        console.error('Check subscription error:', error);
        toast({
          title: "Error",
          description: "Failed to refresh subscription status.",
          variant: "destructive"
        });
        return;
      }

      await refetch();
      toast({
        title: "Success",
        description: "Subscription status refreshed successfully."
      });
    } catch (error) {
      console.error('Check subscription error:', error);
      toast({
        title: "Error",
        description: "Failed to refresh subscription status.",
        variant: "destructive"
      });
    }
  };

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
          <div className="flex gap-2">
            <Button 
              onClick={handleManageSubscription}
              className="bg-red-600 hover:bg-red-700"
            >
              Manage Subscription
            </Button>
            <Button 
              onClick={handleRefreshStatus}
              variant="outline"
              className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white"
            >
              Refresh Status
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AccountSubscriptions;
