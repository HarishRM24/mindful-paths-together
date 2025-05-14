
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Bell, Home, Search, Brain, Clock, Heart, Phone } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const SeniorHome: React.FC = () => {
  const { toast } = useToast();
  const [completedTasks, setCompletedTasks] = useState<number[]>([0, 1]);
  
  // Sample data for today's reminders
  const todayReminders = [
    { id: 1, time: '8:00 AM', title: 'Take morning medication', completed: true },
    { id: 2, time: '9:30 AM', title: 'Breakfast', completed: true },
    { id: 3, time: '11:00 AM', title: 'Exercise routine', completed: false },
    { id: 4, time: '12:30 PM', title: 'Lunch', completed: false },
    { id: 5, time: '3:00 PM', title: 'Afternoon medication', completed: false },
  ];

  // Health metrics
  const healthMetrics = [
    { label: 'Steps', value: '2,453', icon: <Heart className="text-primary" size={18} /> },
    { label: 'Activities', value: '3/5', icon: <Calendar className="text-secondary" size={18} /> },
    { label: 'Sleep', value: '7h 20m', icon: <Clock className="text-accent" size={18} /> },
  ];

  const toggleTask = (index: number) => {
    setCompletedTasks(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index) 
        : [...prev, index]
    );
    
    toast({
      title: prev.includes(index) ? "Task marked incomplete" : "Task completed",
      description: todayReminders[index].title,
    });
  };
  
  const handleEmergency = () => {
    toast({
      title: "Emergency Contact",
      description: "Contacting your emergency contact now...",
      variant: "destructive",
    });
  };

  return (
    <div className="w-full space-y-6 animate-fade-in pb-20">
      {/* Good morning/afternoon greeting */}
      <div className="mb-5">
        <h1 className="title-large mb-1">Good Afternoon, Joan</h1>
        <p className="text-app-gray-dark">Tuesday, May 14, 2025</p>
      </div>
      
      {/* Health metrics cards */}
      <div className="grid grid-cols-3 gap-3 mb-1">
        {healthMetrics.map((metric, index) => (
          <Card key={index} className="senior-card flex flex-col items-center p-3">
            <div className="w-10 h-10 rounded-full bg-app-gray-light flex items-center justify-center mb-1">
              {metric.icon}
            </div>
            <span className="font-semibold text-lg">{metric.value}</span>
            <span className="text-app-gray-dark text-xs">{metric.label}</span>
          </Card>
        ))}
      </div>
      
      {/* Emergency SOS Button */}
      <Button 
        className="w-full bg-destructive text-white btn-large"
        onClick={handleEmergency}
      >
        <Phone className="mr-2" size={18} />
        Emergency SOS
      </Button>
      
      {/* Today's Schedule */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="title-medium">Today's Schedule</h2>
          <Button variant="ghost" size="sm" className="text-primary p-0">
            View All
          </Button>
        </div>
        
        <div className="space-y-3">
          {todayReminders.map((reminder, index) => (
            <Card 
              key={reminder.id} 
              className="senior-card flex items-center p-4 cursor-pointer"
              onClick={() => toggleTask(index)}
            >
              <div 
                className={`w-6 h-6 rounded-full mr-3 flex-shrink-0 flex items-center justify-center ${
                  completedTasks.includes(index) ? 'bg-secondary' : 'bg-app-gray-light'
                }`}
              >
                {completedTasks.includes(index) && (
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              <div className="flex-1">
                <p className={`font-semibold ${completedTasks.includes(index) ? 'line-through text-app-gray-dark' : ''}`}>
                  {reminder.title}
                </p>
                <p className="text-app-gray-dark text-sm">{reminder.time}</p>
              </div>
            </Card>
          ))}
        </div>
      </section>
      
      {/* Daily Challenge */}
      <section>
        <Card className="senior-card p-4 bg-gradient-to-br from-secondary/10 to-primary/10">
          <div className="flex items-center mb-3">
            <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center mr-3">
              <Brain size={22} className="text-secondary" />
            </div>
            <div>
              <h3 className="font-semibold">Daily Brain Exercise</h3>
              <p className="text-app-gray-dark text-sm">Keep your mind sharp</p>
            </div>
          </div>
          <Button className="w-full">Start Today's Challenge</Button>
        </Card>
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
      
      {/* Memory Album */}
      <section className="pb-4">
        <div className="flex justify-between items-center mb-3">
          <h2 className="title-medium">Memory Album</h2>
          <Button variant="ghost" size="sm" className="text-primary p-0">See all</Button>
        </div>
        <div className="flex space-x-3 overflow-x-auto pb-2">
          <div className="w-24 h-24 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 flex-shrink-0 flex items-center justify-center">
            <Calendar className="text-primary" />
          </div>
          <div className="w-24 h-24 rounded-lg bg-gradient-to-br from-secondary/20 to-accent/20 flex-shrink-0 flex items-center justify-center">
            <Bell className="text-secondary" />
          </div>
          <div className="w-24 h-24 rounded-lg bg-gradient-to-br from-accent/20 to-primary/20 flex-shrink-0 flex items-center justify-center">
            <Home className="text-accent" />
          </div>
          <div className="w-24 h-24 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex-shrink-0 flex items-center justify-center text-xl">
            +
          </div>
        </div>
      </section>
    </div>
  );
};

export default SeniorHome;
