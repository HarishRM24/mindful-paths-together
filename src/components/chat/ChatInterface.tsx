
import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, Smile, Frown, Meh, Info, MoreHorizontal, Download, RefreshCw, Sparkles } from 'lucide-react';
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from '@/contexts/AuthContext';

type Message = {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
  sentiment?: 'positive' | 'neutral' | 'negative';
};

type SuggestionCategory = 'anxiety' | 'loneliness' | 'motivation' | 'general';

const ChatInterface = () => {
  const { user } = useAuth();
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

  const saveConversation = async () => {
    if (messages.length <= 1 || !user) return;

    try {
      const conversationText = messages.map(msg => 
        `${msg.role === 'user' ? 'You' : 'AI'}: ${msg.content}`
      ).join('\n\n');
      
      const fileName = `mindful_conversation_${new Date().toISOString().split('T')[0]}.txt`;
      const blob = new Blob([conversationText], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      
      link.href = url;
      link.download = fileName;
      link.click();
      
      URL.revokeObjectURL(url);
      
      toast({
        title: "Conversation saved",
        description: `Your conversation has been downloaded as ${fileName}`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save the conversation",
        variant: "destructive",
      });
    }
  };

  const clearConversation = () => {
    setMessages([{
      id: '1',
      content: "Hello! I'm your AI companion for mental wellness. How can I support you today?",
      role: 'assistant',
      timestamp: new Date(),
      sentiment: 'positive'
    }]);
    
    toast({
      title: "Conversation cleared",
      description: "Started a new conversation",
    });
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
    
    // Collect previous messages for context (excluding initial greeting)
    const conversationHistory = messages.length > 1 ? messages : [];
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    
    try {
      // Call the Gemini API through our Supabase Edge Function
      const { data, error } = await supabase.functions.invoke('gemini-chat', {
        body: { 
          message: userMessage.content,
          history: conversationHistory.map(msg => ({
            role: msg.role,
            content: msg.content
          }))
        }
      });
      
      if (error) throw new Error(error.message);
      
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: data.response || "I'm sorry, I couldn't generate a response right now.",
        role: 'assistant',
        timestamp: new Date(),
        sentiment: 'neutral'
      };
      
      setMessages(prev => [...prev, aiResponse]);
    } catch (error) {
      console.error('Error calling Gemini API:', error);
      // Fallback to the original response system
      setTimeout(() => {
        const responses: string[] = [
          "I'm here to listen. Would you like to share more about your situation?",
          "Thank you for sharing. How else can I support you today?",
          "I appreciate you telling me about this. Would you like to explore some coping strategies?",
          "That's interesting. Could you tell me more about how this makes you feel?",
          "I understand this is important to you. Let's explore this further if you'd like."
        ];
        
        const aiResponse: Message = {
          id: (Date.now() + 1).toString(),
          content: responses[Math.floor(Math.random() * responses.length)],
          role: 'assistant',
          timestamp: new Date(),
        };
        
        setMessages(prev => [...prev, aiResponse]);
        
        toast({
          title: "Using backup AI",
          description: "Couldn't connect to Gemini. Using local responses instead.",
        });
      }, 1000);
    } finally {
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
      <Card className="flex-1 overflow-hidden flex flex-col p-0 shadow-md border-app-gray-light bg-gradient-to-b from-white to-blue-50">
        <div className="p-4 border-b border-blue-100 bg-gradient-to-r from-blue-50 to-indigo-50 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold flex items-center text-indigo-700">
                <Bot className="mr-2 h-5 w-5 text-indigo-600" />
                <span className="flex items-center">
                  MindSync AI Assistant
                  <span className="ml-2 text-xs px-2 py-0.5 bg-indigo-100 text-indigo-800 rounded-full font-medium flex items-center">
                    <Sparkles className="h-3 w-3 mr-1" /> Gemini
                  </span>
                </span>
              </h2>
              <p className="text-sm text-indigo-600/80">Your personal mental wellness companion</p>
            </div>
            <div className="flex space-x-1">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="text-indigo-600 hover:text-indigo-800 hover:bg-indigo-100">
                      <Info className="h-5 w-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className="bg-white">
                    <p className="max-w-xs">
                      This AI assistant is designed to provide emotional support. For serious mental health issues, please contact a professional.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-indigo-600 hover:text-indigo-800 hover:bg-indigo-100">
                    <MoreHorizontal className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={saveConversation} className="cursor-pointer">
                    <Download className="mr-2 h-4 w-4" />
                    <span>Save conversation</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={clearConversation} className="cursor-pointer">
                    <RefreshCw className="mr-2 h-4 w-4" />
                    <span>New conversation</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-br from-white to-blue-50">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-start gap-2 ${
                message.role === 'user' ? 'justify-end' : 'justify-start'
              } animate-fade-in`}
            >
              {message.role === 'assistant' && (
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center shadow-sm">
                  <Bot size={18} className="text-white" />
                </div>
              )}
              
              <div
                className={`max-w-[80%] rounded-2xl p-4 shadow-sm ${
                  message.role === 'user'
                    ? 'bg-gradient-to-r from-indigo-600 to-blue-700 text-white'
                    : 'bg-gradient-to-r from-white to-blue-50 border border-blue-100'
                }`}
              >
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                <div className="flex items-center justify-between mt-2 text-opacity-70">
                  <p className={`text-xs ${message.role === 'user' ? 'text-white/70' : 'text-indigo-600/70'}`}>
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
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center shadow-sm">
                  <User size={18} className="text-white" />
                </div>
              )}
            </div>
          ))}
          
          {isLoading && (
            <div className="flex items-center justify-start gap-2 animate-fade-in">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center shadow-sm">
                <Bot size={18} className="text-white" />
              </div>
              <div className="flex items-center space-x-2 p-4 rounded-2xl bg-white border border-blue-100 shadow-sm">
                <div className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse"></div>
                <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse delay-150"></div>
                <div className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse delay-300"></div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
        
        <div className="border-t border-blue-100 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 backdrop-blur-sm">
          <Tabs value={activeCategory} onValueChange={(v) => setActiveCategory(v as SuggestionCategory)} className="mb-3">
            <TabsList className="w-full bg-white border border-blue-100 p-1">
              <TabsTrigger value="general" className="flex-1 data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-700">General</TabsTrigger>
              <TabsTrigger value="anxiety" className="flex-1 data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-700">Anxiety</TabsTrigger>
              <TabsTrigger value="loneliness" className="flex-1 data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-700">Loneliness</TabsTrigger>
              <TabsTrigger value="motivation" className="flex-1 data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-700">Motivation</TabsTrigger>
            </TabsList>
          </Tabs>
          
          <div className="px-2 mb-4 overflow-x-auto flex gap-2">
            {suggestions[activeCategory].map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="text-xs py-1.5 px-3 border border-blue-200 rounded-full whitespace-nowrap hover:bg-indigo-50 hover:border-indigo-300 transition-colors duration-200 shadow-sm bg-white"
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
              className="flex-1 border-blue-200 focus-visible:ring-indigo-400 rounded-full pl-4 py-6 bg-white"
            />
            <Button 
              onClick={handleSend} 
              disabled={isLoading || !input.trim()}
              size="icon"
              className="rounded-full h-10 w-10 bg-gradient-to-r from-indigo-600 to-blue-700 hover:from-indigo-700 hover:to-blue-800 text-white shadow-sm"
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
