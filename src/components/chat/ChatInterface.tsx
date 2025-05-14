
import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';

type Message = {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
};

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm your AI assistant. How can I help you today?",
      role: 'assistant',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to the most recent message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input.trim(),
      role: 'user',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    
    try {
      // In a real implementation, this would be an API call to a backend service
      setTimeout(() => {
        // Mock response from AI
        const responses = [
          "I understand how you feel. Would you like to tell me more about that?",
          "That's interesting! How does that make you feel?",
          "I'm here to listen. What else is on your mind?",
          "Thank you for sharing. Is there anything specific you'd like help with?",
          "I see. Have you tried any coping strategies that have worked before?"
        ];
        
        const aiResponse: Message = {
          id: (Date.now() + 1).toString(),
          content: responses[Math.floor(Math.random() * responses.length)],
          role: 'assistant',
          timestamp: new Date(),
        };
        
        setMessages(prev => [...prev, aiResponse]);
        setIsLoading(false);
      }, 1500);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to get a response. Please try again.",
      });
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-200px)] max-h-[700px]">
      <Card className="flex-1 overflow-hidden flex flex-col p-0">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold">AI Assistant</h2>
          <p className="text-sm text-app-gray-dark">Your personal mental wellness companion</p>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-start gap-2 ${
                message.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {message.role === 'assistant' && (
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                  <Bot size={18} className="text-primary" />
                </div>
              )}
              
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.role === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary/20'
                }`}
              >
                <p className="text-sm">{message.content}</p>
                <p className="text-xs opacity-70 mt-1">
                  {message.timestamp.toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>
              
              {message.role === 'user' && (
                <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
                  <User size={18} className="text-accent" />
                </div>
              )}
            </div>
          ))}
          
          {isLoading && (
            <div className="flex items-center justify-start gap-2">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                <Bot size={18} className="text-primary" />
              </div>
              <div className="flex items-center space-x-1 p-3 rounded-lg bg-secondary/20">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse delay-150"></div>
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse delay-300"></div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
        
        <div className="border-t p-3">
          <div className="flex items-center gap-2">
            <Input
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              disabled={isLoading}
              className="flex-1"
            />
            <Button 
              onClick={handleSend} 
              disabled={isLoading || !input.trim()}
              size="icon"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ChatInterface;
