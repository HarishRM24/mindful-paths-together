
import React, { useState } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import UserTypeSelection from '@/components/onboarding/UserTypeSelection';
import SeniorHome from '@/components/senior/SeniorHome';
import YouthHome from '@/components/youth/YouthHome';

const Index = () => {
  // In a real app, this would be stored in persistent storage
  // and managed through authentication/user profiles
  const [userType, setUserType] = useState<'senior' | 'youth' | null>(null);
  
  if (!userType) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <UserTypeSelection onSelect={setUserType} />
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
