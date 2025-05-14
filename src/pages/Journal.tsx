
import React, { useState, useRef } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Mic, StopCircle, Save, BookOpen, PenLine, Waveform, Calendar } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { format } from 'date-fns';

interface JournalEntry {
  id: string;
  date: string;
  title: string;
  content: string;
  mood: string;
  type: 'text' | 'voice';
}

const JournalPage = () => {
  const [activeTab, setActiveTab] = useState('create');
  const [recording, setRecording] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [currentMood, setCurrentMood] = useState('neutral');
  const { toast } = useToast();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Sample journal entries
  const [entries, setEntries] = useState<JournalEntry[]>([
    {
      id: '1',
      date: '2025-05-13',
      title: 'First day of therapy',
      content: 'Today I had my first therapy session. It went better than expected, and I felt comfortable opening up about some of my challenges.',
      mood: 'positive',
      type: 'text'
    },
    {
      id: '2',
      date: '2025-05-10',
      title: 'Feeling overwhelmed',
      content: 'Struggled to focus today. The noise and activity around me felt like too much to handle.',
      mood: 'negative',
      type: 'text'
    },
    {
      id: '3',
      date: '2025-05-07',
      title: 'Morning walk',
      content: 'Started my day with a 20-minute walk in the park. The fresh air helped clear my mind.',
      mood: 'positive',
      type: 'voice'
    }
  ]);

  const startRecording = () => {
    setRecording(true);
    toast({
      title: "Recording Started",
      description: "Your voice journal is now recording.",
    });
    // In a real app, we would use the Web Audio API here
  };

  const stopRecording = () => {
    setRecording(false);
    toast({
      title: "Recording Stopped",
      description: "Your voice journal has been recorded.",
    });
  };

  const saveEntry = () => {
    if (!title.trim()) {
      toast({
        title: "Error",
        description: "Please add a title for your journal entry.",
        variant: "destructive",
      });
      return;
    }

    const newEntry: JournalEntry = {
      id: Date.now().toString(),
      date: format(new Date(), 'yyyy-MM-dd'),
      title: title.trim(),
      content: content.trim(),
      mood: currentMood,
      type: 'text'
    };

    setEntries([newEntry, ...entries]);
    setTitle('');
    setContent('');
    setActiveTab('history');
    
    toast({
      title: "Journal Entry Saved",
      description: "Your thoughts have been recorded.",
    });
  };
  
  const getMoodIcon = (mood: string) => {
    if (mood === 'positive') return '😊';
    if (mood === 'negative') return '😔';
    return '😐';
  };

  return (
    <AppLayout>
      <div className="w-full space-y-6 animate-fade-in pb-20">
        <div className="flex justify-between items-center">
          <h1 className="title-large mb-4">My Journal</h1>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full mb-6">
            <TabsTrigger value="create" className="flex-1">
              <PenLine className="mr-2 h-4 w-4" />
              Create Entry
            </TabsTrigger>
            <TabsTrigger value="history" className="flex-1">
              <BookOpen className="mr-2 h-4 w-4" />
              Entry History
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="create" className="space-y-4">
            <Card className="p-5">
              <div className="space-y-4">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium mb-1">Title</label>
                  <input
                    id="title"
                    className="w-full p-2 border rounded-md"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Give your entry a title..."
                  />
                </div>
                
                <div>
                  <label htmlFor="content" className="block text-sm font-medium mb-1">Your Thoughts</label>
                  <Textarea
                    id="content"
                    placeholder="What's on your mind today?"
                    className="min-h-32"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">How are you feeling?</label>
                  <div className="flex justify-between items-center p-3 bg-muted rounded-md">
                    <button 
                      onClick={() => setCurrentMood('negative')} 
                      className={`text-2xl p-2 rounded-full ${currentMood === 'negative' ? 'bg-secondary/20' : ''}`}
                    >
                      😔
                    </button>
                    <button 
                      onClick={() => setCurrentMood('neutral')} 
                      className={`text-2xl p-2 rounded-full ${currentMood === 'neutral' ? 'bg-secondary/20' : ''}`}
                    >
                      😐
                    </button>
                    <button 
                      onClick={() => setCurrentMood('positive')} 
                      className={`text-2xl p-2 rounded-full ${currentMood === 'positive' ? 'bg-secondary/20' : ''}`}
                    >
                      😊
                    </button>
                  </div>
                </div>
                
                <div className="flex justify-between">
                  <Button variant="outline">
                    Clear
                  </Button>
                  <Button onClick={saveEntry}>
                    <Save className="mr-2 h-4 w-4" />
                    Save Entry
                  </Button>
                </div>
              </div>
            </Card>
            
            <Card className="p-5">
              <h2 className="text-lg font-semibold mb-3 flex items-center">
                <Mic className="mr-2 h-5 w-5 text-primary" />
                Voice Journal
              </h2>
              <p className="text-sm text-muted-foreground mb-4">
                Record your thoughts when you don't feel like typing. Your voice will be processed privately.
              </p>
              
              <div className="bg-muted p-4 rounded-md mb-4 flex items-center justify-center min-h-24">
                {recording ? (
                  <div className="flex flex-col items-center">
                    <Waveform className="h-12 w-12 text-primary animate-pulse" />
                    <span className="text-sm mt-2">Recording...</span>
                  </div>
                ) : (
                  <div className="text-center text-muted-foreground">
                    <p>Press record to start</p>
                  </div>
                )}
              </div>
              
              <div className="flex justify-center">
                {!recording ? (
                  <Button onClick={startRecording} className="px-6">
                    <Mic className="mr-2 h-4 w-4" />
                    Start Recording
                  </Button>
                ) : (
                  <Button onClick={stopRecording} variant="destructive" className="px-6">
                    <StopCircle className="mr-2 h-4 w-4" />
                    Stop Recording
                  </Button>
                )}
              </div>
            </Card>
            
            <Card className="p-5">
              <h2 className="text-lg font-semibold mb-2">Journal Prompts</h2>
              <p className="text-sm text-muted-foreground mb-3">
                Need inspiration? Try one of these prompts:
              </p>
              <ul className="space-y-2">
                <li className="p-3 bg-muted rounded-md text-sm">What made you smile today?</li>
                <li className="p-3 bg-muted rounded-md text-sm">What's one thing you're grateful for?</li>
                <li className="p-3 bg-muted rounded-md text-sm">What's a challenge you're facing, and what might help?</li>
              </ul>
            </Card>
          </TabsContent>
          
          <TabsContent value="history" className="space-y-4">
            {entries.map(entry => (
              <Card key={entry.id} className="p-5">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-semibold text-lg">{entry.title}</h3>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="h-3 w-3 mr-1" />
                      <span>{format(new Date(entry.date), 'MMMM d, yyyy')}</span>
                    </div>
                  </div>
                  <div className="text-2xl" title={`Mood: ${entry.mood}`}>
                    {getMoodIcon(entry.mood)}
                  </div>
                </div>
                
                {entry.type === 'text' ? (
                  <p className="text-muted-foreground mt-2 text-sm">{entry.content}</p>
                ) : (
                  <div className="mt-2">
                    <div className="flex items-center bg-muted p-3 rounded-md">
                      <Waveform className="h-5 w-5 mr-2 text-primary" />
                      <span className="text-sm">Voice Recording</span>
                      <Button variant="ghost" size="sm" className="ml-auto">
                        Play
                      </Button>
                    </div>
                  </div>
                )}
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default JournalPage;
