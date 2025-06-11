
import { useState, useEffect } from 'react';
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
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const { user } = useAuth();
  const { toast } = useToast();

  const fetchBasketItems = async () => {
    if (!user) {
      setItems([]);
      setTotal(0);
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
        toast({
          title: "Error",
          description: "Failed to load basket items",
          variant: "destructive"
        });
        return;
      }

      setItems(data || []);
    } catch (error) {
      console.error('Error fetching basket items:', error);
      toast({
        title: "Error",
        description: "Failed to load basket items",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const addToBasket = async (productName: string, productType: string, price: number) => {
    if (!user) {
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
        toast({
          title: "Error",
          description: "Failed to add item to basket",
          variant: "destructive"
        });
        return;
      }

      toast({
        title: "Success",
        description: "Item added to basket",
      });

      fetchBasketItems();
    } catch (error) {
      console.error('Error adding to basket:', error);
      toast({
        title: "Error",
        description: "Failed to add item to basket",
        variant: "destructive"
      });
    }
  };

  const updateQuantity = async (itemId: string, newQuantity: number) => {
    if (!user) return;

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
        toast({
          title: "Error",
          description: "Failed to update quantity",
          variant: "destructive"
        });
        return;
      }

      fetchBasketItems();
    } catch (error) {
      console.error('Error updating quantity:', error);
      toast({
        title: "Error",
        description: "Failed to update quantity",
        variant: "destructive"
      });
    }
  };

  const removeFromBasket = async (itemId: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('basket_items')
        .delete()
        .eq('id', itemId)
        .eq('user_id', user.id);

      if (error) {
        console.error('Error removing from basket:', error);
        toast({
          title: "Error",
          description: "Failed to remove item from basket",
          variant: "destructive"
        });
        return;
      }

      toast({
        title: "Success",
        description: "Item removed from basket",
      });

      fetchBasketItems();
    } catch (error) {
      console.error('Error removing from basket:', error);
      toast({
        title: "Error",
        description: "Failed to remove item from basket",
        variant: "destructive"
      });
    }
  };

  const clearBasket = async () => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('basket_items')
        .delete()
        .eq('user_id', user.id);

      if (error) {
        console.error('Error clearing basket:', error);
        toast({
          title: "Error",
          description: "Failed to clear basket",
          variant: "destructive"
        });
        return;
      }

      toast({
        title: "Success",
        description: "Basket cleared",
      });

      setItems([]);
      setTotal(0);
    } catch (error) {
      console.error('Error clearing basket:', error);
      toast({
        title: "Error",
        description: "Failed to clear basket",
        variant: "destructive"
      });
    }
  };

  useEffect(() => {
    if (user) {
      fetchBasketItems();
    } else {
      setItems([]);
      setTotal(0);
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    const newTotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    setTotal(newTotal);
  }, [items]);

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
