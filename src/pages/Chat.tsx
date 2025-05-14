
import React from 'react';
import AppLayout from '@/components/layout/AppLayout';
import ChatInterface from '@/components/chat/ChatInterface';

const Chat = () => {
  return (
    <AppLayout>
      <div className="w-full space-y-6 animate-fade-in">
        <h1 className="title-large mb-4 text-app-blue">AI Wellness Assistant</h1>
        <p className="text-app-gray-dark mb-6">
          Talk with our AI companion about how you're feeling or any challenges you're facing.
          Your conversations are private and designed to offer comfort and guidance.
        </p>
        <ChatInterface />
      </div>
    </AppLayout>
  );
};

export default Chat;
