
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { useStripeSubscription } from "@/hooks/useStripeSubscription";
import ProfilePicture from "@/components/ProfilePicture";

const AccountGeneral = () => {
  const { user } = useAuth();
  const { subscribed, subscription_tier, subscription_end } = useStripeSubscription();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Profile Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start gap-6">
            <ProfilePicture size="lg" showUpload={true} />
            <div className="flex-1 grid grid-cols-2 gap-4">
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
              <Badge className={subscribed ? "bg-green-600" : "bg-gray-600"}>
                {subscribed ? "Active" : "Inactive"}
              </Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Plan</span>
              <span className="text-white">
                {subscribed ? `${subscription_tier} Plan` : "No active plan"}
              </span>
            </div>
            {subscribed && subscription_end && (
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Valid Until</span>
                <span className="text-white">{formatDate(subscription_end)}</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AccountGeneral;
