
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

  const createOrUpdateProfile = async (userId: string, email: string, username?: string) => {
    try {
      console.log('Creating/updating profile for user:', userId);
      
      // Check if profile exists
      const { data: existingProfile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle();

      if (profileError) {
        console.error('Error checking existing profile:', profileError);
        return null;
      }

      if (!existingProfile) {
        console.log('Creating new profile for user:', userId);
        const { data: newProfile, error: insertError } = await supabase
          .from('profiles')
          .insert({
            id: userId,
            email: email,
            username: username || email.split('@')[0]
          })
          .select()
          .single();
        
        if (insertError) {
          console.error('Error creating profile:', insertError);
          return null;
        }
        return newProfile;
      }

      return existingProfile;
    } catch (error) {
      console.error('Error in createOrUpdateProfile:', error);
      return null;
    }
  };

  useEffect(() => {
    let mounted = true;

    const setAuthData = async (session: Session | null) => {
      if (!mounted) return;
      
      console.log('Setting auth data:', { sessionExists: !!session, userId: session?.user?.id });
      setSession(session);
      
      if (session?.user) {
        try {
          const profile = await createOrUpdateProfile(
            session.user.id,
            session.user.email || '',
            session.user.user_metadata?.username
          );
          
          if (mounted) {
            setUser({
              id: session.user.id,
              email: profile?.email || session.user.email || '',
              username: profile?.username || session.user.user_metadata?.username || session.user.email?.split('@')[0] || ''
            });
          }
        } catch (error) {
          console.error('Error setting up user profile:', error);
          if (mounted) {
            setUser({
              id: session.user.id,
              email: session.user.email || '',
              username: session.user.user_metadata?.username || session.user.email?.split('@')[0] || ''
            });
          }
        }
      } else {
        if (mounted) {
          setUser(null);
        }
      }
      
      if (mounted) {
        setLoading(false);
      }
    };

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
        console.log('Initial session:', { sessionExists: !!session });
        await setAuthData(session);
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
        await setAuthData(session);
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
        
        // Handle specific error cases with user-friendly messages
        if (error.message.includes('Invalid login credentials')) {
          return { success: false, error: 'Invalid email or password. Please check your credentials and try again.' };
        } else if (error.message.includes('Email not confirmed')) {
          return { success: false, error: 'Please check your email and confirm your account before logging in.' };
        } else if (error.message.includes('Too many requests')) {
          return { success: false, error: 'Too many login attempts. Please wait a moment before trying again.' };
        } else if (error.message.includes('Network')) {
          return { success: false, error: 'Network error. Please check your connection and try again.' };
        }
        
        return { success: false, error: 'Login failed. Please try again.' };
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
        
        // Handle specific error cases
        if (error.message.includes('User already registered')) {
          return { success: false, error: 'An account with this email already exists. Please try logging in instead.' };
        } else if (error.message.includes('Password should be at least')) {
          return { success: false, error: 'Password must be at least 6 characters long.' };
        } else if (error.message.includes('Invalid email')) {
          return { success: false, error: 'Please enter a valid email address.' };
        } else if (error.message.includes('Network')) {
          return { success: false, error: 'Network error. Please check your connection and try again.' };
        }
        
        return { success: false, error: 'Registration failed. Please try again.' };
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
