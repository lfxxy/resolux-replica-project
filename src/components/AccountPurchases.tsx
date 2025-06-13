
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AccountPurchases = () => {
  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        <CardTitle className="text-white">Purchase History</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <p className="text-gray-400 text-center py-4">No purchase history available</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default AccountPurchases;
