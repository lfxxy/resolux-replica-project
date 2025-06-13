
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const AccountSubscriptions = () => {
  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        <CardTitle className="text-white">Active Subscriptions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="text-center py-8">
            <p className="text-gray-400">No active subscriptions</p>
            <Button className="bg-red-600 hover:bg-red-700 mt-4">
              Browse Plans
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AccountSubscriptions;
