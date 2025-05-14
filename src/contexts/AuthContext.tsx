
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';

type User = {
  id: string;
  name: string;
  email: string;
  role: 'senior' | 'youth';
  avatar?: string;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string, role: 'senior' | 'youth') => Promise<void>;
  logout: () => void;
  setUserRole: (role: 'senior' | 'youth') => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Check for saved user on initial load
  useEffect(() => {
    const savedUser = localStorage.getItem('mindSync_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  // Mock login function - in a real app, this would call an API
  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, accept any non-empty email/password
      if (!email || !password) {
        throw new Error('Email and password are required');
      }
      
      // Create a mock user
      const mockUser: User = {
        id: '123456',
        name: email.split('@')[0],
        email,
        role: localStorage.getItem('mindSync_userRole') as 'senior' | 'youth' || 'youth',
      };
      
      setUser(mockUser);
      localStorage.setItem('mindSync_user', JSON.stringify(mockUser));
      
      toast({
        title: 'Welcome back!',
        description: `Logged in as ${mockUser.name}`,
      });
    } catch (error) {
      let message = 'An error occurred during login';
      if (error instanceof Error) {
        message = error.message;
      }
      toast({
        title: 'Login failed',
        description: message,
        variant: 'destructive',
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Mock signup function
  const signup = async (name: string, email: string, password: string, role: 'senior' | 'youth') => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (!name || !email || !password) {
        throw new Error('Name, email, and password are required');
      }
      
      const mockUser: User = {
        id: Date.now().toString(),
        name,
        email,
        role,
      };
      
      setUser(mockUser);
      localStorage.setItem('mindSync_user', JSON.stringify(mockUser));
      localStorage.setItem('mindSync_userRole', role);
      
      toast({
        title: 'Account created!',
        description: `Welcome to MindSync, ${name}!`,
      });
    } catch (error) {
      let message = 'An error occurred during sign up';
      if (error instanceof Error) {
        message = error.message;
      }
      toast({
        title: 'Sign up failed',
        description: message,
        variant: 'destructive',
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('mindSync_user');
    toast({
      title: 'Logged out',
      description: 'You have been successfully logged out',
    });
  };

  const setUserRole = (role: 'senior' | 'youth') => {
    if (user) {
      const updatedUser = { ...user, role };
      setUser(updatedUser);
      localStorage.setItem('mindSync_user', JSON.stringify(updatedUser));
      localStorage.setItem('mindSync_userRole', role);
    } else {
      localStorage.setItem('mindSync_userRole', role);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout, setUserRole }}>
      {children}
    </AuthContext.Provider>
  );
};
