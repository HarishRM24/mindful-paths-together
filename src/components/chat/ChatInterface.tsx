
import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, Smile, Frown, Meh, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type Message = {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
  sentiment?: 'positive' | 'neutral' | 'negative';
};

type SuggestionCategory = 'anxiety' | 'loneliness' | 'motivation' | 'general';

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm your AI companion for mental wellness. How can I support you today?",
      role: 'assistant',
      timestamp: new Date(),
      sentiment: 'positive'
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeCategory, setActiveCategory] = useState<SuggestionCategory>('general');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestions = {
    anxiety: [
      "I'm feeling overwhelmed today.",
      "How can I manage panic attacks?",
      "I can't stop worrying about the future."
    ],
    loneliness: [
      "I feel isolated lately.",
      "How can I connect with others?",
      "I miss having close friends."
    ],
    motivation: [
      "I'm struggling to find purpose.",
      "How can I stay motivated with my goals?",
      "I don't feel excited about anything."
    ],
    general: [
      "How are you today?",
      "Tell me about coping strategies.",
      "I need some advice."
    ]
  };

  // Auto-scroll to the most recent message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const analyzeSentiment = (text: string): 'positive' | 'neutral' | 'negative' => {
    // Simple sentiment analysis - just for demonstration
    const positiveWords = ['happy', 'good', 'great', 'excellent', 'joy', 'excited', 'better'];
    const negativeWords = ['sad', 'bad', 'terrible', 'awful', 'worried', 'anxious', 'depressed'];
    
    const lowerText = text.toLowerCase();
    let score = 0;
    
    positiveWords.forEach(word => {
      if (lowerText.includes(word)) score += 1;
    });
    
    negativeWords.forEach(word => {
      if (lowerText.includes(word)) score -= 1;
    });
    
    if (score > 0) return 'positive';
    if (score < 0) return 'negative';
    return 'neutral';
  };

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const sentiment = analyzeSentiment(input);
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input.trim(),
      role: 'user',
      timestamp: new Date(),
      sentiment
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    
    try {
      // In a real implementation, this would be an API call to a backend service
      setTimeout(() => {
        // Different responses based on sentiment
        let responses: string[];
        
        if (sentiment === 'negative') {
          responses = [
            "I hear that you're going through a difficult time. Would you like to talk more about what's troubling you?",
            "I'm sorry you're feeling this way. Remember that it's okay to not be okay sometimes. Would sharing more help?",
            "That sounds challenging. Is there something specific that triggered these feelings?",
            "I understand this is hard. What's one small thing that might help you feel a bit better right now?",
            "Your feelings are valid. Would it help to explore some coping strategies together?"
          ];
        } else if (sentiment === 'positive') {
          responses = [
            "That's wonderful to hear! What contributed to these positive feelings?",
            "I'm glad things are going well. How can we build on this positive momentum?",
            "That's great! Would you like to reflect on what helped create this positive experience?",
            "It's good to celebrate these positive moments. Is there anything specific you'd like to focus on next?",
            "I'm happy for you! Acknowledging positive experiences can help reinforce them."
          ];
        } else {
          responses = [
            "Thank you for sharing. Would you like to explore this topic further?",
            "I appreciate you telling me about this. How can I best support you right now?",
            "I'm here to listen. Would you like to share more about your situation?",
            "Sometimes talking things through can help provide clarity. Is there anything specific on your mind?",
            "I'm listening. Would it help to discuss some strategies related to what you're experiencing?"
          ];
        }
        
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

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
    // Optional: automatically send after selecting
    // setTimeout(() => handleSend(), 100);
  };

  const getSentimentIcon = (sentiment?: 'positive' | 'neutral' | 'negative') => {
    if (sentiment === 'positive') return <Smile className="h-4 w-4 text-green-500" />;
    if (sentiment === 'negative') return <Frown className="h-4 w-4 text-red-500" />;
    return <Meh className="h-4 w-4 text-amber-500" />;
  };

  return (
    <div className="flex flex-col h-[calc(100vh-200px)] max-h-[700px]">
      <Card className="flex-1 overflow-hidden flex flex-col p-0">
        <div className="p-4 border-b flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold flex items-center">
              <Bot className="mr-2 h-5 w-5 text-primary" />
              AI Wellness Assistant
            </h2>
            <p className="text-sm text-app-gray-dark">Your personal mental wellness companion</p>
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Info className="h-5 w-5 text-muted-foreground" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs">
                  This AI assistant is designed to provide emotional support. For serious mental health issues, please contact a professional.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
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
                <div className="flex items-center justify-between mt-1">
                  <p className="text-xs opacity-70">
                    {message.timestamp.toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                  {message.sentiment && (
                    <span className="ml-2">{getSentimentIcon(message.sentiment)}</span>
                  )}
                </div>
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
        
        <div className="border-t p-2">
          <Tabs value={activeCategory} onValueChange={(v) => setActiveCategory(v as SuggestionCategory)} className="mb-2">
            <TabsList className="w-full">
              <TabsTrigger value="general" className="flex-1">General</TabsTrigger>
              <TabsTrigger value="anxiety" className="flex-1">Anxiety</TabsTrigger>
              <TabsTrigger value="loneliness" className="flex-1">Loneliness</TabsTrigger>
              <TabsTrigger value="motivation" className="flex-1">Motivation</TabsTrigger>
            </TabsList>
          </Tabs>
          
          <div className="px-2 mb-3 overflow-x-auto flex gap-2">
            {suggestions[activeCategory].map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="text-xs py-1 px-3 border rounded-full whitespace-nowrap hover:bg-muted"
              >
                {suggestion}
              </button>
            ))}
          </div>
          
          <div className="flex items-center gap-2 px-2">
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
