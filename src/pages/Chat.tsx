
import React from 'react';
import AppLayout from '@/components/layout/AppLayout';
import ChatInterface from '@/components/chat/ChatInterface';
import { useAuth } from '@/contexts/AuthContext';

const Chat = () => {
  const { user } = useAuth();
  const firstName = user?.name?.split(' ')[0] || 'there';

  return (
    <AppLayout>
      <div className="w-full space-y-6 animate-fade-in">
        <h1 className="title-large mb-4 text-app-blue">
          AI Wellness Assistant
        </h1>
        <p className="text-app-gray-dark mb-6">
          Hello {firstName}! Talk with our AI companion about how you're feeling or any challenges you're facing.
          Your conversations are private and designed to offer comfort and guidance.
        </p>
        <ChatInterface />
      </div>
    </AppLayout>
  );
};

export default Chat;
