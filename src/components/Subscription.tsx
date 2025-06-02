
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Crown, Zap, Infinity } from "lucide-react";

const Subscription = () => {
  const plans = [
    {
      name: "Weekly",
      price: "$4",
      duration: "7 days",
      icon: Zap,
      features: ["Full access to all features", "Basic support", "Regular updates"],
      popular: false
    },
    {
      name: "Bi-Weekly",
      price: "$6",
      duration: "14 days",
      icon: Crown,
      features: ["Full access to all features", "Priority support", "Regular updates", "Early access to new features"],
      popular: true
    },
    {
      name: "Monthly",
      price: "$8",
      duration: "30 days",
      icon: Crown,
      features: ["Full access to all features", "Priority support", "Regular updates", "Early access to new features", "Custom configurations"],
      popular: false
    },
    {
      name: "Lifetime",
      price: "$100",
      duration: "Forever",
      icon: Infinity,
      features: ["Full access to all features", "VIP support", "All future updates", "Early access to new features", "Custom configurations", "Priority feature requests"],
      popular: false
    }
  ];

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
                
                <Button className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-3 mt-6">
                  Get Started
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Subscription;
