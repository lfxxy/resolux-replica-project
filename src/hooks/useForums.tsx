
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface ForumCategory {
  id: string;
  name: string;
  description: string | null;
  sort_order: number | null;
}

interface ForumThread {
  id: string;
  category_id: string;
  user_id: string;
  title: string;
  content: string | null;
  is_pinned: boolean | null;
  is_locked: boolean | null;
  created_at: string;
  updated_at: string;
  profiles: {
    username: string;
  };
}

interface ForumPost {
  id: string;
  thread_id: string;
  user_id: string;
  content: string;
  created_at: string;
  profiles: {
    username: string;
  };
}

export const useForums = () => {
  const [categories, setCategories] = useState<ForumCategory[]>([]);
  const [threads, setThreads] = useState<ForumThread[]>([]);
  const [posts, setPosts] = useState<ForumPost[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('forum_categories')
        .select('*')
        .order('sort_order', { ascending: true });

      if (error) {
        console.error('Error fetching categories:', error);
        return;
      }

      setCategories(data || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchThreads = async (categoryId?: string) => {
    try {
      let query = supabase
        .from('forum_threads')
        .select(`
          *,
          profiles:user_id (username)
        `)
        .order('is_pinned', { ascending: false })
        .order('updated_at', { ascending: false });

      if (categoryId) {
        query = query.eq('category_id', categoryId);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching threads:', error);
        return;
      }

      setThreads(data || []);
    } catch (error) {
      console.error('Error fetching threads:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPosts = async (threadId: string) => {
    try {
      const { data, error } = await supabase
        .from('forum_posts')
        .select(`
          *,
          profiles:user_id (username)
        `)
        .eq('thread_id', threadId)
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Error fetching posts:', error);
        return;
      }

      setPosts(data || []);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const createThread = async (categoryId: string, title: string, content: string) => {
    if (!user) {
      toast({
        title: "Error",
        description: "You must be logged in to create a thread",
        variant: "destructive"
      });
      return null;
    }

    try {
      const { data, error } = await supabase
        .from('forum_threads')
        .insert({
          category_id: categoryId,
          user_id: user.id,
          title,
          content
        })
        .select()
        .single();

      if (error) {
        console.error('Error creating thread:', error);
        toast({
          title: "Error",
          description: "Failed to create thread",
          variant: "destructive"
        });
        return null;
      }

      toast({
        title: "Success",
        description: "Thread created successfully"
      });

      fetchThreads();
      return data;
    } catch (error) {
      console.error('Error creating thread:', error);
      return null;
    }
  };

  const createPost = async (threadId: string, content: string) => {
    if (!user) {
      toast({
        title: "Error",
        description: "You must be logged in to create a post",
        variant: "destructive"
      });
      return null;
    }

    try {
      const { data, error } = await supabase
        .from('forum_posts')
        .insert({
          thread_id: threadId,
          user_id: user.id,
          content
        })
        .select()
        .single();

      if (error) {
        console.error('Error creating post:', error);
        toast({
          title: "Error",
          description: "Failed to create post",
          variant: "destructive"
        });
        return null;
      }

      toast({
        title: "Success",
        description: "Post created successfully"
      });

      fetchPosts(threadId);
      return data;
    } catch (error) {
      console.error('Error creating post:', error);
      return null;
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchThreads();
  }, []);

  return {
    categories,
    threads,
    posts,
    loading,
    fetchCategories,
    fetchThreads,
    fetchPosts,
    createThread,
    createPost
  };
};
