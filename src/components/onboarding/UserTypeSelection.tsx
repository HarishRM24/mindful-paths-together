
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface UserTypeSelectionProps {
  onSelect: (type: 'senior' | 'youth') => void;
}

const UserTypeSelection: React.FC<UserTypeSelectionProps> = ({ onSelect }) => {
  return (
    <div className="w-full flex flex-col items-center animate-fade-in">
      <h1 className="title-large text-center mb-6">Welcome to MindSync</h1>
      <p className="text-center text-app-gray-dark mb-8">
        Please select which best describes you:
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-xl">
        <Card 
          className="card-hover cursor-pointer border-2 border-primary/20 hover:border-primary"
          onClick={() => onSelect('senior')}
        >
          <CardContent className="p-6">
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <span className="text-3xl">👵</span>
              </div>
              <h2 className="title-small mb-2">Senior</h2>
              <p className="text-center text-app-gray-dark text-sm">
                Memory aids, reminders, and cognitive exercises
              </p>
            </div>
          </CardContent>
        </Card>
        
        <Card 
          className="card-hover cursor-pointer border-2 border-primary/20 hover:border-primary"
          onClick={() => onSelect('youth')}
        >
          <CardContent className="p-6">
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <span className="text-3xl">👦</span>
              </div>
              <h2 className="title-small mb-2">Youth</h2>
              <p className="text-center text-app-gray-dark text-sm">
                Mood tracking, journaling, and mental health support
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserTypeSelection;
