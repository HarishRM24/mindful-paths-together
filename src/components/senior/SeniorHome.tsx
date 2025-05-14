
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Bell, Home, Search, Settings } from 'lucide-react';

const SeniorHome: React.FC = () => {
  // Sample data for today's reminders
  const todayReminders = [
    { id: 1, time: '8:00 AM', title: 'Take morning medication', completed: true },
    { id: 2, time: '9:30 AM', title: 'Breakfast', completed: true },
    { id: 3, time: '11:00 AM', title: 'Exercise routine', completed: false },
    { id: 4, time: '12:30 PM', title: 'Lunch', completed: false },
    { id: 5, time: '3:00 PM', title: 'Afternoon medication', completed: false },
  ];

  return (
    <div className="w-full space-y-6 animate-fade-in">
      {/* Good morning/afternoon greeting */}
      <div className="mb-6">
        <h1 className="title-large mb-1">Good Afternoon, Joan</h1>
        <p className="text-app-gray-dark">Tuesday, May 14, 2025</p>
      </div>
      
      {/* Emergency SOS Button */}
      <Button 
        className="w-full bg-destructive text-white btn-large"
      >
        Emergency SOS
      </Button>
      
      {/* Today's Schedule */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="title-medium">Today's Schedule</h2>
          <Button variant="ghost" size="sm" className="text-primary">
            View All
          </Button>
        </div>
        
        <div className="space-y-3">
          {todayReminders.map(reminder => (
            <Card key={reminder.id} className="senior-card flex items-center p-4">
              <div className={`w-6 h-6 rounded-full mr-3 flex-shrink-0 ${
                reminder.completed ? 'bg-secondary' : 'bg-app-gray-light'
              }`}>
                {reminder.completed && (
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              <div className="flex-1">
                <p className="font-semibold">{reminder.title}</p>
                <p className="text-app-gray-dark text-sm">{reminder.time}</p>
              </div>
            </Card>
          ))}
        </div>
      </section>
      
      {/* Quick Access */}
      <section>
        <h2 className="title-medium mb-3">Quick Access</h2>
        <div className="grid grid-cols-2 gap-3">
          <Card className="senior-card card-hover flex flex-col items-center py-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
              <Calendar size={24} className="text-primary" />
            </div>
            <span className="text-center">Calendar</span>
          </Card>
          
          <Card className="senior-card card-hover flex flex-col items-center py-4">
            <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center mb-2">
              <Bell size={24} className="text-secondary" />
            </div>
            <span className="text-center">Reminders</span>
          </Card>
          
          <Card className="senior-card card-hover flex flex-col items-center py-4">
            <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-2">
              <Home size={24} className="text-accent" />
            </div>
            <span className="text-center">Daily Routines</span>
          </Card>
          
          <Card className="senior-card card-hover flex flex-col items-center py-4">
            <div className="w-12 h-12 rounded-full bg-app-gray-light flex items-center justify-center mb-2">
              <Search size={24} className="text-app-gray-dark" />
            </div>
            <span className="text-center">Find Help</span>
          </Card>
        </div>
      </section>
      
      {/* Brain Games */}
      <section className="pb-4">
        <h2 className="title-medium mb-3">Brain Games</h2>
        <Card className="senior-card card-hover p-4 flex items-center">
          <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center mr-4">
            <span className="text-2xl">🧩</span>
          </div>
          <div className="flex-1">
            <h3 className="font-semibold mb-1">Daily Puzzle Challenge</h3>
            <p className="text-app-gray-dark text-sm">
              Exercise your brain with today's memory game
            </p>
          </div>
        </Card>
      </section>
    </div>
  );
};

export default SeniorHome;
