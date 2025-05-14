
import React from 'react';
import AppLayout from '@/components/layout/AppLayout';
import ChatInterface from '@/components/chat/ChatInterface';

const Chat = () => {
  return (
    <AppLayout>
      <div className="w-full space-y-6 animate-fade-in">
        <h1 className="title-large mb-4">AI Assistant</h1>
        <ChatInterface />
      </div>
    </AppLayout>
  );
};

export default Chat;
