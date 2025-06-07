
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
  const { user } = useAuth();
  const { toast } = useToast();

  const fetchBasketItems = async () => {
    if (!user) {
      setItems([]);
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('basket_items' as any)
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching basket items:', error);
        return;
      }

      setItems(data || []);
    } catch (error) {
      console.error('Error fetching basket items:', error);
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
        // Update quantity
        const { error } = await supabase
          .from('basket_items' as any)
          .update({ quantity: existingItem.quantity + 1 })
          .eq('id', existingItem.id);

        if (error) {
          console.error('Error updating basket item:', error);
          toast({
            title: "Error",
            description: "Failed to update basket",
            variant: "destructive"
          });
          return;
        }
      } else {
        // Add new item
        const { error } = await supabase
          .from('basket_items' as any)
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
            description: "Failed to add to basket",
            variant: "destructive"
          });
          return;
        }
      }

      toast({
        title: "Success",
        description: "Item added to basket"
      });

      fetchBasketItems();
    } catch (error) {
      console.error('Error adding to basket:', error);
    }
  };

  const removeFromBasket = async (itemId: string) => {
    try {
      const { error } = await supabase
        .from('basket_items' as any)
        .delete()
        .eq('id', itemId);

      if (error) {
        console.error('Error removing from basket:', error);
        toast({
          title: "Error",
          description: "Failed to remove from basket",
          variant: "destructive"
        });
        return;
      }

      toast({
        title: "Success",
        description: "Item removed from basket"
      });

      fetchBasketItems();
    } catch (error) {
      console.error('Error removing from basket:', error);
    }
  };

  const updateQuantity = async (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromBasket(itemId);
      return;
    }

    try {
      const { error } = await supabase
        .from('basket_items' as any)
        .update({ quantity })
        .eq('id', itemId);

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
    }
  };

  const clearBasket = async () => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('basket_items' as any)
        .delete()
        .eq('user_id', user.id);

      if (error) {
        console.error('Error clearing basket:', error);
        return;
      }

      setItems([]);
    } catch (error) {
      console.error('Error clearing basket:', error);
    }
  };

  const getTotalPrice = () => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  useEffect(() => {
    fetchBasketItems();
  }, [user]);

  return {
    items,
    loading,
    addToBasket,
    removeFromBasket,
    updateQuantity,
    clearBasket,
    getTotalPrice,
    refetch: fetchBasketItems
  };
};
