
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User, Session } from '@supabase/supabase-js';

interface AuthUser {
  id: string;
  email: string;
  username: string;
}

interface AuthContextType {
  user: AuthUser | null;
  session: Session | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signup: (email: string, password: string, username: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    // Get initial session
    const initializeAuth = async () => {
      try {
        console.log('Initializing auth...');
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) {
          console.error('Error getting session:', error);
          if (mounted) {
            setLoading(false);
          }
          return;
        }
        
        if (mounted) {
          console.log('Initial session:', { sessionExists: !!session });
          setSession(session);
          if (session?.user) {
            setUser({
              id: session.user.id,
              email: session.user.email || '',
              username: session.user.user_metadata?.username || session.user.email?.split('@')[0] || ''
            });
          }
          setLoading(false);
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
        if (mounted) {
          setLoading(false);
        }
      }
    };

    initializeAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, { sessionExists: !!session });
        
        if (mounted) {
          setSession(session);
          if (session?.user) {
            setUser({
              id: session.user.id,
              email: session.user.email || '',
              username: session.user.user_metadata?.username || session.user.email?.split('@')[0] || ''
            });
          } else {
            setUser(null);
          }
          setLoading(false);
        }
      }
    );

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      console.log('Attempting login for:', email);
      setLoading(true);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password
      });
      
      if (error) {
        console.error('Login error:', error);
        setLoading(false);
        
        if (error.message.includes('Invalid login credentials')) {
          return { success: false, error: 'Invalid email or password. Please check your credentials and try again.' };
        } else if (error.message.includes('Email not confirmed')) {
          return { success: false, error: 'Please check your email and confirm your account before logging in.' };
        } else if (error.message.includes('Too many requests')) {
          return { success: false, error: 'Too many login attempts. Please wait a moment before trying again.' };
        }
        
        return { success: false, error: error.message || 'Login failed. Please try again.' };
      }
      
      if (!data.user) {
        setLoading(false);
        return { success: false, error: 'Login failed - no user data received.' };
      }
      
      console.log('Login successful:', { userId: data.user.id });
      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      setLoading(false);
      return { success: false, error: 'An unexpected error occurred. Please try again.' };
    }
  };

  const signup = async (email: string, password: string, username: string): Promise<{ success: boolean; error?: string }> => {
    try {
      console.log('Attempting signup for:', email);
      setLoading(true);
      
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/`,
          data: {
            username: username.trim()
          }
        }
      });
      
      if (error) {
        console.error('Signup error:', error);
        setLoading(false);
        
        if (error.message.includes('User already registered')) {
          return { success: false, error: 'An account with this email already exists. Please try logging in instead.' };
        } else if (error.message.includes('Password should be at least')) {
          return { success: false, error: 'Password must be at least 6 characters long.' };
        } else if (error.message.includes('Invalid email')) {
          return { success: false, error: 'Please enter a valid email address.' };
        }
        
        return { success: false, error: error.message || 'Registration failed. Please try again.' };
      }
      
      console.log('Signup successful:', { userId: data.user?.id, needsConfirmation: !data.session });
      setLoading(false);
      return { success: true };
    } catch (error) {
      console.error('Signup error:', error);
      setLoading(false);
      return { success: false, error: 'An unexpected error occurred during signup. Please try again.' };
    }
  };

  const logout = async (): Promise<void> => {
    try {
      console.log('Logging out...');
      setLoading(true);
      await supabase.auth.signOut();
      setUser(null);
      setSession(null);
      setLoading(false);
    } catch (error) {
      console.error('Logout error:', error);
      setLoading(false);
    }
  };

  const value = {
    user,
    session,
    isAuthenticated: !!user && !!session,
    loading,
    login,
    signup,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
