
import React from 'react';
import AppLayout from '@/components/layout/AppLayout';

const Profile = () => {
  return (
    <AppLayout>
      <div className="w-full space-y-6 animate-fade-in">
        <h1 className="title-large mb-4">My Profile</h1>
        <p className="text-app-gray-dark">
          Your profile and settings will appear here.
        </p>
      </div>
    </AppLayout>
  );
};

export default Profile;
