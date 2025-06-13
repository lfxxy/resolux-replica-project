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
    console.log('addToBasket called with:', { productName, productType, price, planType, priceInCents, userId: user?.id });
    
    if (!user?.id) {
      toast({
        title: "Error",
        description: "You must be logged in to add items to basket",
        variant: "destructive"
      });
      return;
    }

    try {
      // Check if item already exists
      const existingItem = items.find(
        item => item.product_name === productName && item.product_type === productType && item.plan_type === planType
      );

      if (existingItem) {
        console.log('Item already exists, updating quantity');
        await updateQuantity(existingItem.id, existingItem.quantity + 1);
        toast({
          title: "Success",
          description: "Item quantity updated in basket",
        });
        return;
      }

      // Prepare insert data with proper structure
      const insertData: any = {
        user_id: user.id,
        product_name: productName,
        product_type: productType,
        price: Math.round(price), // Ensure it's an integer
        quantity: 1
      };

      // Only add optional fields if they exist
      if (planType) insertData.plan_type = planType;
      if (priceInCents) insertData.price_in_cents = priceInCents;

      console.log('Inserting new item:', insertData);

      const { data, error } = await supabase
        .from('basket_items')
        .insert(insertData)
        .select();

      if (error) {
        console.error('Supabase error details:', error);
        toast({
          title: "Error",
          description: `Failed to add item to basket: ${error.message}`,
          variant: "destructive"
        });
        return;
      }

      console.log('Successfully inserted:', data);

      toast({
        title: "Success",
        description: `${productName} added to basket`,
      });

      // Refresh basket items
      await fetchBasketItems();
    } catch (error) {
      console.error('Error adding to basket:', error);
      toast({
        title: "Error",
        description: "Failed to add item to basket",
        variant: "destructive"
      });
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
