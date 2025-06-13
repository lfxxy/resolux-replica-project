
-- Add RLS policies for profiles table (only if they don't exist)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'profiles' AND policyname = 'Users can view their own profile'
    ) THEN
        CREATE POLICY "Users can view their own profile" 
        ON public.profiles 
        FOR SELECT 
        USING (auth.uid() = id);
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'profiles' AND policyname = 'Users can update their own profile'
    ) THEN
        CREATE POLICY "Users can update their own profile" 
        ON public.profiles 
        FOR UPDATE 
        USING (auth.uid() = id);
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'profiles' AND policyname = 'Users can insert their own profile'
    ) THEN
        CREATE POLICY "Users can insert their own profile" 
        ON public.profiles 
        FOR INSERT 
        WITH CHECK (auth.uid() = id);
    END IF;
END $$;

-- Enable RLS for remaining tables
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.forum_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.forum_threads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.forum_posts ENABLE ROW LEVEL SECURITY;

-- Add missing policies
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'subscriptions' AND policyname = 'Users can view their own subscriptions'
    ) THEN
        CREATE POLICY "Users can view their own subscriptions" 
        ON public.subscriptions 
        FOR SELECT 
        USING (auth.uid() = user_id);
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'subscriptions' AND policyname = 'Users can create their own subscriptions'
    ) THEN
        CREATE POLICY "Users can create their own subscriptions" 
        ON public.subscriptions 
        FOR INSERT 
        WITH CHECK (auth.uid() = user_id);
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'subscriptions' AND policyname = 'Users can update their own subscriptions'
    ) THEN
        CREATE POLICY "Users can update their own subscriptions" 
        ON public.subscriptions 
        FOR UPDATE 
        USING (auth.uid() = user_id);
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'subscribers' AND policyname = 'Users can view their own subscriber record'
    ) THEN
        CREATE POLICY "Users can view their own subscriber record" 
        ON public.subscribers 
        FOR SELECT 
        USING (auth.uid() = user_id OR auth.email() = email);
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'subscribers' AND policyname = 'Service can insert subscriber records'
    ) THEN
        CREATE POLICY "Service can insert subscriber records" 
        ON public.subscribers 
        FOR INSERT 
        WITH CHECK (true);
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'subscribers' AND policyname = 'Service can update subscriber records'
    ) THEN
        CREATE POLICY "Service can update subscriber records" 
        ON public.subscribers 
        FOR UPDATE 
        USING (true);
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'forum_categories' AND policyname = 'Anyone can view forum categories'
    ) THEN
        CREATE POLICY "Anyone can view forum categories" 
        ON public.forum_categories 
        FOR SELECT 
        TO authenticated 
        USING (true);
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'forum_threads' AND policyname = 'Anyone can view forum threads'
    ) THEN
        CREATE POLICY "Anyone can view forum threads" 
        ON public.forum_threads 
        FOR SELECT 
        TO authenticated 
        USING (true);
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'forum_threads' AND policyname = 'Users can create forum threads'
    ) THEN
        CREATE POLICY "Users can create forum threads" 
        ON public.forum_threads 
        FOR INSERT 
        TO authenticated 
        WITH CHECK (auth.uid() = user_id);
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'forum_threads' AND policyname = 'Users can update their own forum threads'
    ) THEN
        CREATE POLICY "Users can update their own forum threads" 
        ON public.forum_threads 
        FOR UPDATE 
        TO authenticated 
        USING (auth.uid() = user_id);
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'forum_posts' AND policyname = 'Anyone can view forum posts'
    ) THEN
        CREATE POLICY "Anyone can view forum posts" 
        ON public.forum_posts 
        FOR SELECT 
        TO authenticated 
        USING (true);
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'forum_posts' AND policyname = 'Users can create forum posts'
    ) THEN
        CREATE POLICY "Users can create forum posts" 
        ON public.forum_posts 
        FOR INSERT 
        TO authenticated 
        WITH CHECK (auth.uid() = user_id);
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'forum_posts' AND policyname = 'Users can update their own forum posts'
    ) THEN
        CREATE POLICY "Users can update their own forum posts" 
        ON public.forum_posts 
        FOR UPDATE 
        TO authenticated 
        USING (auth.uid() = user_id);
    END IF;
END $$;
