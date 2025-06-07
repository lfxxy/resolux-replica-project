
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
