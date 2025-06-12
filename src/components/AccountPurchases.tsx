
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

  const getPlanPrice = (planType: string) => {
    switch (planType) {
      case 'weekly':
        return '$3.99';
      case 'biweekly':
        return '$5.99';
      case 'monthly':
        return '$9.99';
      case 'yearly':
        return '$99.99';
      default:
        return '$0.00';
    }
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
                      {getPlanPrice(subscription.plan_type)}
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
