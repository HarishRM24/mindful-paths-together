
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageSquare, Calendar, User } from 'lucide-react';

const YouthHome: React.FC = () => {
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

  return (
    <div className="w-full space-y-6 animate-fade-in">
      {/* Greeting */}
      <div className="mb-6">
        <h1 className="title-large mb-1">Hey Taylor</h1>
        <p className="text-app-gray-dark">How are you feeling today?</p>
      </div>
      
      {/* Mood checker */}
      <Card className="youth-card p-5">
        <h2 className="title-small mb-4">My Mood Today</h2>
        <div className="flex justify-between items-center mb-6">
          {['😔', '😕', '😐', '🙂', '😄'].map((emoji, index) => (
            <Button
              key={index}
              variant={index === 3 ? "default" : "outline"}
              className={`rounded-full h-14 w-14 text-2xl ${
                index === 3 ? 'bg-primary text-white' : ''
              }`}
            >
              {emoji}
            </Button>
          ))}
        </div>
        <Button className="w-full btn-medium">
          Save Today's Mood
        </Button>
      </Card>
      
      {/* Mood History */}
      <Card className="youth-card">
        <h2 className="title-small mb-3">My Mood This Week</h2>
        <div className="flex items-end justify-between h-24 mb-2">
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
