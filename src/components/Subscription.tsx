
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Crown, Zap, Infinity, ShoppingCart } from "lucide-react";
import { useSubscriptions } from "@/hooks/useSubscriptions";
import { useBasket } from "@/hooks/useBasket";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

const Subscription = () => {
  const { createSubscription } = useSubscriptions();
  const { addToBasket } = useBasket();
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();

  const plans = [
    {
      name: "Weekly",
      price: "$4.99",
      priceInCents: 499,
      duration: "7 days",
      planType: "weekly",
      icon: Zap,
      features: ["Full access to all features", "Basic support", "Regular updates"],
      popular: false
    },
    {
      name: "Bi-Weekly",
      price: "$7.99",
      priceInCents: 799,
      duration: "14 days",
      planType: "biweekly",
      icon: Crown,
      features: ["Full access to all features", "Priority support", "Regular updates", "Early access to new features"],
      popular: true
    },
    {
      name: "Monthly",
      price: "$12.99",
      priceInCents: 1299,
      duration: "30 days",
      planType: "monthly",
      icon: Crown,
      features: ["Full access to all features", "Priority support", "Regular updates", "Early access to new features", "Custom configurations"],
      popular: false
    },
    {
      name: "Lifetime",
      price: "$199.99",
      priceInCents: 19999,
      duration: "Forever",
      planType: "lifetime",
      icon: Infinity,
      features: ["Full access to all features", "VIP support", "All future updates", "Early access to new features", "Custom configurations", "Priority feature requests"],
      popular: false
    }
  ];

  const handleAddToBasket = async (plan: typeof plans[0]) => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication Required",
        description: "Please log in to add items to your basket",
        variant: "destructive"
      });
      return;
    }

    await addToBasket(
      `Resolux ${plan.name} Subscription`,
      "subscription",
      plan.priceInCents
    );
  };

  const handleDirectPurchase = async (plan: typeof plans[0]) => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication Required",
        description: "Please log in to purchase a subscription",
        variant: "destructive"
      });
      return;
    }

    // Calculate expiration date
    const now = new Date();
    let expiresAt: Date;

    switch (plan.planType) {
      case "weekly":
        expiresAt = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
        break;
      case "biweekly":
        expiresAt = new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000);
        break;
      case "monthly":
        expiresAt = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
        break;
      case "lifetime":
        expiresAt = new Date(now.getTime() + 100 * 365 * 24 * 60 * 60 * 1000); // 100 years
        break;
      default:
        expiresAt = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
    }

    const result = await createSubscription(plan.planType, expiresAt.toISOString());
    
    if (result) {
      toast({
        title: "Success!",
        description: `${plan.name} subscription activated successfully!`
      });
    }
  };

  return (
    <section className="py-16 bg-gradient-to-br from-black via-gray-900 to-red-900/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">Choose Your Plan</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Get premium access to Resolux and dominate your gaming experience
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <Card 
              key={index} 
              className={`relative bg-gray-900 border-red-900/30 hover:border-red-700/50 transition-all duration-300 ${
                plan.popular ? 'ring-2 ring-red-600 transform scale-105' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-red-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}
              
              <CardHeader className="text-center pb-4">
                <plan.icon className="w-12 h-12 text-red-600 mx-auto mb-4" />
                <CardTitle className="text-2xl font-bold text-white">{plan.name}</CardTitle>
                <div className="text-center">
                  <span className="text-4xl font-bold text-red-600">{plan.price}</span>
                  <p className="text-gray-400 mt-1">{plan.duration}</p>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start space-x-3">
                      <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="space-y-2">
                  <Button 
                    onClick={() => handleDirectPurchase(plan)}
                    className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-3"
                  >
                    Buy Now
                  </Button>
                  <Button 
                    onClick={() => handleAddToBasket(plan)}
                    variant="outline"
                    className="w-full border-red-600 text-red-600 hover:bg-red-600 hover:text-white font-medium py-3"
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Add to Basket
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Subscription;
