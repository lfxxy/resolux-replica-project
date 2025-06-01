
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  username: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string, username: string) => Promise<boolean>;
  logout: () => void;
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
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call
    console.log('Login attempt:', { email, password });
    
    // Mock successful login
    const mockUser = {
      id: '1',
      email,
      username: email.split('@')[0]
    };
    
    setUser(mockUser);
    return true;
  };

  const signup = async (email: string, password: string, username: string): Promise<boolean> => {
    // Simulate API call
    console.log('Signup attempt:', { email, password, username });
    
    // Mock successful signup
    const mockUser = {
      id: '1',
      email,
      username
    };
    
    setUser(mockUser);
    return true;
  };

  const logout = () => {
    setUser(null);
  };

  const value = {
    user,
    isAuthenticated: !!user,
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
