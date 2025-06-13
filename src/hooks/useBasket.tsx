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
  // Add subscription-specific fields
  plan_type?: string;
  price_in_cents?: number;
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

  const addToBasket = useCallback(async (productName: string, productType: string, price: number, planType?: string, priceInCents?: number) => {
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

      const insertData: any = {
        user_id: user.id,
        product_name: productName,
        product_type: productType,
        price: price,
        quantity: 1
      };

      // Add subscription-specific fields if provided
      if (planType) insertData.plan_type = planType;
      if (priceInCents) insertData.price_in_cents = priceInCents;

      const { error } = await supabase
        .from('basket_items')
        .insert(insertData);

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
