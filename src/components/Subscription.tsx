
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Crown, Zap, Infinity, ShoppingCart, Settings, DollarSign } from "lucide-react";
import { useStripeSubscription } from "@/hooks/useStripeSubscription";
import { useAuth } from "@/contexts/AuthContext";
import { useBasket } from "@/hooks/useBasket";

const Subscription = () => {
  const { createCheckout, subscribed, subscription_tier, loading, openCustomerPortal } = useStripeSubscription();
  const { isAuthenticated } = useAuth();
  const { addToBasket } = useBasket();

  const plans = [
    {
      name: "Weekly",
      price: "$3.99",
      priceInCents: 399,
      duration: "7 days",
      planType: "weekly",
      icon: Zap,
      features: ["CS2 Aimbot & ESP", "Wallhack features", "Basic anti-detection", "Regular updates", "Discord support"],
      popular: false
    },
    {
      name: "Bi-Weekly",
      price: "$5.99",
      priceInCents: 599,
      duration: "14 days",
      planType: "biweekly",
      icon: Crown,
      features: ["All CS2 features", "Advanced aimbot settings", "Custom crosshair overlay", "Priority support", "Early access to updates", "Stream-proof mode"],
      popular: true
    },
    {
      name: "Monthly",
      price: "$9.99",
      priceInCents: 999,
      duration: "30 days",
      planType: "monthly",
      icon: Crown,
      features: ["Premium CS2 suite", "Rage & Legit modes", "Skin changer", "Inventory spoofer", "Custom configurations", "VIP Discord access", "1-on-1 setup help"],
      popular: false
    },
    {
      name: "Yearly",
      price: "$99.99",
      priceInCents: 9999,
      duration: "12 months",
      planType: "yearly",
      icon: Infinity,
      features: ["Ultimate CS2 package", "All current & future features", "Private build access", "Custom feature requests", "Dedicated support agent", "Lifetime updates", "Community VIP status"],
      popular: false
    }
  ];

  const handlePurchase = async (plan: typeof plans[0]) => {
    await createCheckout(plan.planType, plan.priceInCents);
  };

  const handleAddToBasket = async (plan: typeof plans[0]) => {
    console.log('Adding to basket:', plan.name, plan.priceInCents);
    const priceInDollars = plan.priceInCents / 100;
    await addToBasket(
      `Resolux ${plan.name} Subscription`,
      "subscription",
      priceInDollars,
      plan.planType,
      plan.priceInCents
    );
  };

  const isCurrentPlan = (planName: string) => {
    return subscribed && subscription_tier === planName;
  };

  return (
    <section id="subscriptions" className="py-16 bg-gradient-to-br from-black via-gray-900 to-red-900/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">Choose Your CS2 Plan</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Get premium access to Resolux CS2 and dominate your Counter-Strike 2 experience
          </p>
          {subscribed && (
            <div className="mt-4 flex justify-center gap-4">
              <div className="bg-green-600/20 border border-green-600 rounded-lg px-4 py-2">
                <span className="text-green-400 font-medium">
                  Active: {subscription_tier} Plan
                </span>
              </div>
              <Button
                onClick={openCustomerPortal}
                variant="outline"
                className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white"
              >
                <Settings className="w-4 h-4 mr-2" />
                Manage Subscription
              </Button>
            </div>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {plans.map((plan, index) => {
            const isCurrent = isCurrentPlan(plan.name);
            return (
              <Card 
                key={index} 
                className={`relative bg-gray-900 border-red-900/30 hover:border-red-700/50 transition-all duration-300 ${
                  plan.popular ? 'ring-2 ring-red-600 transform scale-105' : ''
                } ${isCurrent ? 'ring-2 ring-green-600 bg-green-900/20' : ''}`}
              >
                {plan.popular && !isCurrent && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-red-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}
                
                {isCurrent && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-green-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                      Your Plan
                    </span>
                  </div>
                )}
                
                <CardHeader className="text-center pb-4">
                  <plan.icon className={`w-12 h-12 mx-auto mb-4 ${isCurrent ? 'text-green-600' : 'text-red-600'}`} />
                  <CardTitle className="text-2xl font-bold text-white">{plan.name}</CardTitle>
                  <div className="text-center">
                    <span className={`text-4xl font-bold ${isCurrent ? 'text-green-600' : 'text-red-600'}`}>
                      {plan.price}
                    </span>
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
                    {isCurrent ? (
                      <Button 
                        disabled
                        className="w-full bg-green-600 text-white font-medium py-3"
                      >
                        Current Plan
                      </Button>
                    ) : (
                      <>
                        <Button 
                          onClick={() => handlePurchase(plan)}
                          disabled={loading || !isAuthenticated}
                          className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-3"
                        >
                          <DollarSign className="w-4 h-4 mr-2" />
                          {!isAuthenticated ? "Login Required" : "Purchase Now"}
                        </Button>
                        
                        <Button 
                          onClick={() => handleAddToBasket(plan)}
                          disabled={loading || !isAuthenticated}
                          variant="outline"
                          className="w-full border-red-600 text-red-600 hover:bg-red-600 hover:text-white font-medium py-2"
                        >
                          <ShoppingCart className="w-4 h-4 mr-2" />
                          Add to Basket
                        </Button>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Subscription;
