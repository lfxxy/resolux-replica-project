
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

interface SubscriberData {
  subscribed: boolean;
  subscription_tier?: string;
  subscription_end?: string;
  stripe_customer_id?: string;
}

export const useSubscriptions = () => {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [subscriberData, setSubscriberData] = useState<SubscriberData>({ subscribed: false });
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  const fetchSubscriptions = async () => {
    if (!user) {
      setSubscriptions([]);
      setSubscriberData({ subscribed: false });
      setLoading(false);
      return;
    }

    try {
      // Fetch from subscriptions table
      const { data: subscriptionsData, error: subscriptionsError } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (subscriptionsError) {
        console.error('Error fetching subscriptions:', subscriptionsError);
      } else {
        setSubscriptions(subscriptionsData || []);
      }

      // Fetch from subscribers table
      const { data: subscriberData, error: subscriberError } = await supabase
        .from('subscribers')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (subscriberError && subscriberError.code !== 'PGRST116') {
        console.error('Error fetching subscriber data:', subscriberError);
      } else if (subscriberData) {
        setSubscriberData({
          subscribed: subscriberData.subscribed,
          subscription_tier: subscriberData.subscription_tier,
          subscription_end: subscriberData.subscription_end,
          stripe_customer_id: subscriberData.stripe_customer_id
        });
      }
    } catch (error) {
      console.error('Error fetching subscription data:', error);
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
    subscriberData,
    loading,
    createSubscription,
    refetch: fetchSubscriptions
  };
};
