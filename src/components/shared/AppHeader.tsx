
import React from 'react';
import { Link } from 'react-router-dom';
import { Bell, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';

const AppHeader: React.FC = () => {
  return (
    <header className="w-full bg-background border-b border-border py-3 px-4 sticky top-0 z-10">
      <div className="flex items-center justify-between max-w-4xl mx-auto">
        <Link to="/" className="flex items-center">
          <span className="font-bold text-xl text-primary">MindSync</span>
        </Link>
        
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" className="text-app-gray-dark">
            <Bell size={22} />
          </Button>
          <Button variant="ghost" size="icon" className="text-app-gray-dark">
            <Settings size={22} />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
