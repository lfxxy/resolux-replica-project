
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useSubscriptions } from "@/hooks/useSubscriptions";

const AccountPurchases = () => {
  const { subscriptions } = useSubscriptions();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

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
};

export default AccountPurchases;
