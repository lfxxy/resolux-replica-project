# Stripe Integration Backup

This file contains all the removed Stripe integration code that can be restored later.

## Original Subscription Component with Stripe

```tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Crown, Zap, Infinity, ShoppingCart } from "lucide-react";
import { useBasket } from "@/hooks/useBasket";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

const Subscription = () => {
  const { addToBasket } = useBasket();
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();

  const plans = [
    {
      name: "Weekly",
      price: "$3.99",
      priceInCents: 399,
      duration: "7 days",
      planType: "weekly",
      icon: Zap,
      features: ["Full access to all features", "Basic support", "Regular updates"],
      popular: false
    },
    {
      name: "Bi-Weekly",
      price: "$5.99",
      priceInCents: 599,
      duration: "14 days",
      planType: "biweekly",
      icon: Crown,
      features: ["Full access to all features", "Priority support", "Regular updates", "Early access to new features"],
      popular: true
    },
    {
      name: "Monthly",
      price: "$9.99",
      priceInCents: 999,
      duration: "30 days",
      planType: "monthly",
      icon: Crown,
      features: ["Full access to all features", "Priority support", "Regular updates", "Early access to new features", "Custom configurations"],
      popular: false
    },
    {
      name: "Yearly",
      price: "$99.99",
      priceInCents: 9999,
      duration: "12 months",
      planType: "yearly",
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

    try {
      await addToBasket(
        `Resolux ${plan.name} Subscription`,
        "subscription",
        plan.priceInCents
      );
      toast({
        title: "Added to Basket",
        description: `${plan.name} subscription added to your basket`
      });
    } catch (error) {
      console.error('Error adding to basket:', error);
      toast({
        title: "Error",
        description: "Failed to add item to basket. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <section id="subscriptions" className="py-16 bg-gradient-to-br from-black via-gray-900 to-red-900/20">
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
                    onClick={() => handleAddToBasket(plan)}
                    className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-3"
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
```

## Original useSubscriptions Hook with Supabase

```tsx
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface Subscription {
  id: string;
  plan_type: string;
  status: string;
  expires_at: string;
  started_at: string;
  stripe_subscription_id?: string;
}

export const useSubscriptions = () => {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  const fetchSubscriptions = async () => {
    if (!user) {
      setSubscriptions([]);
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching subscriptions:', error);
        toast({
          title: "Error",
          description: "Failed to load subscriptions",
          variant: "destructive"
        });
        return;
      }

      setSubscriptions(data || []);
    } catch (error) {
      console.error('Error fetching subscriptions:', error);
    } finally {
      setLoading(false);
    }
  };

  const createSubscription = async (planType: string, expiresAt: string) => {
    if (!user) return null;

    try {
      const { data, error } = await supabase
        .from('subscriptions')
        .insert({
          user_id: user.id,
          plan_type: planType,
          expires_at: expiresAt,
          status: 'active'
        })
        .select()
        .single();

      if (error) {
        console.error('Error creating subscription:', error);
        toast({
          title: "Error",
          description: "Failed to create subscription",
          variant: "destructive"
        });
        return null;
      }

      toast({
        title: "Success",
        description: "Subscription created successfully"
      });

      fetchSubscriptions();
      return data;
    } catch (error) {
      console.error('Error creating subscription:', error);
      return null;
    }
  };

  useEffect(() => {
    fetchSubscriptions();
  }, [user]);

  return {
    subscriptions,
    loading,
    createSubscription,
    refetch: fetchSubscriptions
  };
};
```

## Original useBasket Hook with Supabase

```tsx
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface BasketItem {
  id: string;
  user_id: string;
  product_name: string;
  product_type: string;
  price: number;
  quantity: number;
  created_at: string;
}

export const useBasket = () => {
  const [items, setItems] = useState<BasketItem[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  const fetchBasketItems = useCallback(async () => {
    if (!user?.id) {
      setItems([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('basket_items')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching basket items:', error);
        setItems([]);
        return;
      }

      setItems(data || []);
    } catch (error) {
      console.error('Error fetching basket items:', error);
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  const addToBasket = useCallback(async (productName: string, productType: string, price: number) => {
    if (!user?.id) {
      toast({
        title: "Error",
        description: "You must be logged in to add items to basket",
        variant: "destructive"
      });
      return;
    }

    try {
      const existingItem = items.find(
        item => item.product_name === productName && item.product_type === productType
      );

      if (existingItem) {
        await updateQuantity(existingItem.id, existingItem.quantity + 1);
        return;
      }

      const { error } = await supabase
        .from('basket_items')
        .insert({
          user_id: user.id,
          product_name: productName,
          product_type: productType,
          price: price,
          quantity: 1
        });

      if (error) {
        console.error('Error adding to basket:', error);
        return;
      }

      toast({
        title: "Success",
        description: "Item added to basket",
      });

      await fetchBasketItems();
    } catch (error) {
      console.error('Error adding to basket:', error);
    }
  }, [user?.id, items, toast, fetchBasketItems]);

  const updateQuantity = useCallback(async (itemId: string, newQuantity: number) => {
    if (!user?.id) return;

    if (newQuantity <= 0) {
      await removeFromBasket(itemId);
      return;
    }

    try {
      const { error } = await supabase
        .from('basket_items')
        .update({ quantity: newQuantity })
        .eq('id', itemId)
        .eq('user_id', user.id);

      if (error) {
        console.error('Error updating quantity:', error);
        return;
      }

      setItems(prev => prev.map(item => 
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      ));
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  }, [user?.id]);

  const removeFromBasket = useCallback(async (itemId: string) => {
    if (!user?.id) return;

    try {
      const { error } = await supabase
        .from('basket_items')
        .delete()
        .eq('id', itemId)
        .eq('user_id', user.id);

      if (error) {
        console.error('Error removing from basket:', error);
        return;
      }

      setItems(prev => prev.filter(item => item.id !== itemId));

      toast({
        title: "Success",
        description: "Item removed from basket",
      });
    } catch (error) {
      console.error('Error removing from basket:', error);
    }
  }, [user?.id, toast]);

  const clearBasket = useCallback(async () => {
    if (!user?.id) return;

    try {
      const { error } = await supabase
        .from('basket_items')
        .delete()
        .eq('user_id', user.id);

      if (error) {
        console.error('Error clearing basket:', error);
        return;
      }

      setItems([]);
      toast({
        title: "Success",
        description: "Basket cleared",
      });
    } catch (error) {
      console.error('Error clearing basket:', error);
    }
  }, [user?.id, toast]);

  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  useEffect(() => {
    if (user?.id) {
      fetchBasketItems();
    } else {
      setItems([]);
      setLoading(false);
    }
  }, [user?.id, fetchBasketItems]);

  return {
    items,
    loading,
    total,
    addToBasket,
    updateQuantity,
    removeFromBasket,
    clearBasket,
    fetchBasketItems
  };
};
```

## Instructions to Restore

1. Replace the simplified components with the versions above
2. Add back the Supabase imports and database calls
3. Ensure the basket_items table exists in Supabase
4. Test the Stripe integration functionality
