import React, { useState, useEffect } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import UserTypeSelection from '@/components/onboarding/UserTypeSelection';
import SeniorHome from '@/components/senior/SeniorHome';
import YouthHome from '@/components/youth/YouthHome';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import AuthModal from '@/components/auth/AuthModal';

const Index = () => {
  const { user, setUserRole } = useAuth();
  const [userType, setUserType] = useState<'senior' | 'youth' | null>(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  
  useEffect(() => {
    // If user is logged in, use their role
    if (user) {
      setUserType(user.role);
    }
    // Otherwise check if a role was previously selected by a non-logged-in user
    else {
      const savedRole = localStorage.getItem('mindSync_userRole') as 'senior' | 'youth' | null;
      if (savedRole) {
        setUserType(savedRole);
      }
    }
  }, [user]);
  
  const handleSelectUserType = (type: 'senior' | 'youth') => {
    setUserType(type);
    setUserRole(type);
  };
  
  if (!userType) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <UserTypeSelection onSelect={handleSelectUserType} />
        
        <div className="mt-8 text-center">
          <p className="mb-4 text-muted-foreground">
            Already have an account?
          </p>
          <Button onClick={() => setAuthModalOpen(true)}>
            Log in
          </Button>
          <AuthModal 
            open={authModalOpen} 
            onOpenChange={setAuthModalOpen}
            defaultView="login"
          />
        </div>
      </div>
    );
  }
  
  return (
    <AppLayout>
      {userType === 'senior' ? <SeniorHome /> : <YouthHome />}
    </AppLayout>
  );
};

export default Index;
