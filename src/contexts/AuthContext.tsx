
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

  const checkSubscriptionStatus = async () => {
    try {
      console.log('Checking subscription status...');
      const { data, error } = await supabase.functions.invoke('check-subscription');
      if (error) {
        console.error('Error checking subscription status:', error);
      } else {
        console.log('Subscription status checked:', data);
      }
    } catch (error) {
      console.error('Error checking subscription status:', error);
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
          // First, ensure the profile exists
          const { data: existingProfile, error: profileError } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .maybeSingle();

          if (profileError) {
            console.error('Error checking existing profile:', profileError);
          }

          if (!existingProfile && !profileError) {
            console.log('Creating new profile for user:', session.user.id);
            const { error: insertError } = await supabase
              .from('profiles')
              .insert({
                id: session.user.id,
                email: session.user.email || '',
                username: session.user.user_metadata?.username || session.user.email?.split('@')[0] || ''
              });
            
            if (insertError) {
              console.error('Error creating profile:', insertError);
            }
          }

          // Get the profile data
          const { data: profile, error: fetchError } = await supabase
            .from('profiles')
            .select('username, email')
            .eq('id', session.user.id)
            .maybeSingle();
          
          if (fetchError) {
            console.error('Error fetching profile:', fetchError);
          }
          
          if (mounted) {
            setUser({
              id: session.user.id,
              email: profile?.email || session.user.email || '',
              username: profile?.username || session.user.user_metadata?.username || session.user.email?.split('@')[0] || ''
            });
            
            // Check subscription status after authentication
            setTimeout(() => {
              checkSubscriptionStatus();
            }, 1000);
          }
        } catch (error) {
          console.error('Error fetching/creating profile:', error);
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
    supabase.auth.getSession().then(({ data: { session }, error }) => {
      if (error) {
        console.error('Error getting session:', error);
        if (mounted) {
          setLoading(false);
        }
        return;
      }
      setAuthData(session);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, { sessionExists: !!session });
        setAuthData(session);
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
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) {
        console.error('Login error:', error);
        return { success: false, error: error.message };
      }
      
      console.log('Login successful:', { userId: data.user?.id });
      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'An unexpected error occurred during login' };
    }
  };

  const signup = async (email: string, password: string, username: string): Promise<{ success: boolean; error?: string }> => {
    try {
      console.log('Attempting signup for:', email);
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/`,
          data: {
            username: username
          }
        }
      });
      
      if (error) {
        console.error('Signup error:', error);
        return { success: false, error: error.message };
      }
      
      console.log('Signup successful:', { userId: data.user?.id, needsConfirmation: !data.session });
      return { success: true };
    } catch (error) {
      console.error('Signup error:', error);
      return { success: false, error: 'An unexpected error occurred during signup' };
    }
  };

  const logout = async (): Promise<void> => {
    try {
      console.log('Logging out...');
      await supabase.auth.signOut();
    } catch (error) {
      console.error('Logout error:', error);
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
