
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from "@/integrations/supabase/client";

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
    const checkUser = async () => {
      const { data, error } = await supabase.auth.getSession();
      
      if (data.session) {
        const savedUserRole = localStorage.getItem('mindSync_userRole') as 'senior' | 'youth' || 'youth';
        const savedUserName = localStorage.getItem('mindSync_userName');
        
        const supabaseUser = data.session.user;
        
        // Create a user object with data from Supabase and local storage
        const currentUser: User = {
          id: supabaseUser.id,
          name: savedUserName || supabaseUser.email?.split('@')[0] || 'User',
          email: supabaseUser.email || '',
          role: savedUserRole,
        };
        
        setUser(currentUser);
        localStorage.setItem('mindSync_user', JSON.stringify(currentUser));
      }
      
      setLoading(false);
    };
    
    checkUser();
    
    // Set up auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session) {
        const savedUserRole = localStorage.getItem('mindSync_userRole') as 'senior' | 'youth' || 'youth';
        const savedUserName = localStorage.getItem('mindSync_userName');
        
        const supabaseUser = session.user;
        
        // Create a user object with data from Supabase and local storage
        const currentUser: User = {
          id: supabaseUser.id,
          name: savedUserName || supabaseUser.email?.split('@')[0] || 'User',
          email: supabaseUser.email || '',
          role: savedUserRole,
        };
        
        setUser(currentUser);
        localStorage.setItem('mindSync_user', JSON.stringify(currentUser));
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
        localStorage.removeItem('mindSync_user');
      }
    });
    
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Mock login function - in a real app, this would call an API
  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) throw error;
      
      const savedUserRole = localStorage.getItem('mindSync_userRole') as 'senior' | 'youth' || 'youth';
      
      // Create a user object with data from Supabase and local storage
      const currentUser: User = {
        id: data.user.id,
        name: data.user.email?.split('@')[0] || 'User',
        email: data.user.email || '',
        role: savedUserRole,
      };
      
      setUser(currentUser);
      localStorage.setItem('mindSync_user', JSON.stringify(currentUser));
      localStorage.setItem('mindSync_userName', currentUser.name);
      
      toast({
        title: 'Welcome back!',
        description: `Logged in as ${currentUser.name}`,
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

  // Signup function
  const signup = async (name: string, email: string, password: string, role: 'senior' | 'youth') => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });
      
      if (error) throw error;
      
      if (data.user) {
        const newUser: User = {
          id: data.user.id,
          name,
          email: data.user.email || '',
          role,
        };
        
        setUser(newUser);
        localStorage.setItem('mindSync_user', JSON.stringify(newUser));
        localStorage.setItem('mindSync_userRole', role);
        localStorage.setItem('mindSync_userName', name);
        
        toast({
          title: 'Account created!',
          description: `Welcome to MindSync, ${name}!`,
        });
      }
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

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error signing out:', error.message);
    }
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
