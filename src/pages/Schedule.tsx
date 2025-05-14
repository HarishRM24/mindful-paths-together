
import React from 'react';
import AppLayout from '@/components/layout/AppLayout';

const Schedule = () => {
  return (
    <AppLayout>
      <div className="w-full space-y-6 animate-fade-in">
        <h1 className="title-large mb-4">Schedule & Reminders</h1>
        <p className="text-app-gray-dark">
          Your schedule and reminders will appear here.
        </p>
      </div>
    </AppLayout>
  );
};

export default Schedule;
