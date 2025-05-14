
import React from 'react';
import AppLayout from '@/components/layout/AppLayout';

const Chat = () => {
  return (
    <AppLayout>
      <div className="w-full space-y-6 animate-fade-in">
        <h1 className="title-large mb-4">AI Assistant</h1>
        <p className="text-app-gray-dark">
          Your AI assistant chat will appear here.
        </p>
      </div>
    </AppLayout>
  );
};

export default Chat;
