
-- Add subscription-specific fields to basket_items table if they don't exist
ALTER TABLE public.basket_items 
ADD COLUMN IF NOT EXISTS plan_type TEXT,
ADD COLUMN IF NOT EXISTS price_in_cents INTEGER;
