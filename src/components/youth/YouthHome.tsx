
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageSquare, Calendar, User, BookOpen, Award, Bell } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';

const YouthHome: React.FC = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [selectedMood, setSelectedMood] = useState<number>(3);
  const [streakCount, setStreakCount] = useState<number>(7);
  
  // Get the user's name from auth context
  const firstName = user?.name?.split(' ')[0] || 'Friend';
  
  // Sample data for mood history
  const moodHistory = [
    { day: 'Mon', score: 6 },
    { day: 'Tue', score: 4 },
    { day: 'Wed', score: 5 },
    { day: 'Thu', score: 7 },
    { day: 'Fri', score: 6 },
    { day: 'Sat', score: 8 },
    { day: 'Sun', score: 7 },
  ];

  // Calculate max height for mood graph
  const maxHeight = 80; // Max height in pixels
  
  // Sample upcoming activities
  const activities = [
    { time: "3:00 PM", title: "Meditation Session" },
    { time: "5:30 PM", title: "Group Chat" }
  ];
  
  // Journal prompts
  const journalPrompts = [
    "What made you smile today?",
    "What's one thing you're grateful for?",
    "How did you practice self-care today?"
  ];

  const saveMood = () => {
    toast({
      title: "Mood Saved",
      description: "Your mood has been recorded for today",
    });
  };

  return (
    <div className="w-full space-y-6 animate-fade-in pb-20">
      {/* Header with streak info and user's real name */}
      <div className="flex justify-between items-center mb-2">
        <div>
          <h1 className="title-large mb-1">Hey {firstName}</h1>
          <p className="text-app-gray-dark">How are you feeling today?</p>
        </div>
        <div className="bg-primary/10 p-2 rounded-full flex items-center">
          <Award className="text-primary mr-1 h-5 w-5" />
          <span className="font-semibold">{streakCount} days</span>
        </div>
      </div>
      
      {/* Mood checker */}
      <Card className="youth-card p-5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-bl-3xl" />
        <h2 className="title-small mb-4">My Mood Today</h2>
        <div className="flex justify-between items-center mb-6">
          {['😔', '😕', '😐', '🙂', '😄'].map((emoji, index) => (
            <Button
              key={index}
              variant={index === selectedMood ? "default" : "outline"}
              className={`rounded-full h-14 w-14 text-2xl ${
                index === selectedMood ? 'bg-primary text-white' : ''
              }`}
              onClick={() => setSelectedMood(index)}
            >
              {emoji}
            </Button>
          ))}
        </div>
        <Button className="w-full btn-medium" onClick={saveMood}>
          Save Today's Mood
        </Button>
      </Card>
      
      {/* Upcoming Activities */}
      <Card className="youth-card p-5">
        <div className="flex justify-between items-center mb-3">
          <h2 className="title-small">Upcoming Activities</h2>
          <Button variant="ghost" size="sm" className="text-primary p-0">See all</Button>
        </div>
        <div className="space-y-2">
          {activities.map((activity, index) => (
            <div key={index} className="flex items-center p-3 bg-secondary/10 rounded-lg">
              <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center mr-3">
                <Bell size={18} className="text-secondary" />
              </div>
              <div>
                <p className="font-medium">{activity.title}</p>
                <p className="text-app-gray-dark text-sm">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
      
      {/* Mood History */}
      <Card className="youth-card">
        <h2 className="title-small mb-3 p-4 pb-0">My Mood This Week</h2>
        <div className="flex items-end justify-between h-24 px-4 mb-2">
          {moodHistory.map((day, index) => (
            <div key={index} className="flex flex-col items-center">
              <div 
                className="w-8 rounded-t-md bg-primary/90" 
                style={{ 
                  height: `${(day.score / 10) * maxHeight}px`,
                  opacity: 0.6 + (day.score / 20)
                }}
              ></div>
              <span className="text-xs mt-1 text-app-gray-dark">{day.day}</span>
            </div>
          ))}
        </div>
      </Card>
      
      {/* Journal Prompt */}
      <Card className="youth-card p-5 bg-gradient-to-br from-accent/5 to-accent/20">
        <div className="flex items-start mb-3">
          <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center mr-3">
            <BookOpen size={18} className="text-accent" />
          </div>
          <div>
            <h2 className="title-small mb-1">Journal Prompt</h2>
            <p className="text-app-gray-dark">
              {journalPrompts[Math.floor(Math.random() * journalPrompts.length)]}
            </p>
          </div>
        </div>
        <Button variant="outline" className="w-full mt-2">
          Open Journal
        </Button>
      </Card>
      
      {/* Quick actions */}
      <div className="grid grid-cols-2 gap-3">
        <Card className="youth-card card-hover p-4">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
              <MessageSquare size={22} className="text-primary" />
            </div>
            <span className="text-center text-sm font-semibold">Talk to AI Assistant</span>
          </div>
        </Card>
        
        <Card className="youth-card card-hover p-4">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center mb-2">
              <Calendar size={22} className="text-secondary" />
            </div>
            <span className="text-center text-sm font-semibold">Journal Entry</span>
          </div>
        </Card>
      </div>
      
      {/* Motivation card */}
      <Card className="youth-card bg-gradient-to-r from-primary/10 to-secondary/10 p-5">
        <div className="text-center">
          <p className="italic text-lg mb-2">
            "Small steps every day lead to big progress over time."
          </p>
          <p className="text-app-gray-dark text-sm">Today's Affirmation</p>
        </div>
      </Card>
      
      {/* Resources */}
      <section className="pb-4">
        <h2 className="title-small mb-3">Helpful Resources</h2>
        <Card className="youth-card card-hover p-4 flex items-center">
          <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mr-3">
            <User size={20} className="text-accent" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-sm">Crisis Support</h3>
            <p className="text-app-gray-dark text-xs">
              Access 24/7 support resources
            </p>
          </div>
        </Card>
      </section>
    </div>
  );
};

export default YouthHome;
