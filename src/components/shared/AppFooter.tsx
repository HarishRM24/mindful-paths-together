
import React from 'react';
import { Home, Calendar, MessageSquare, User } from 'lucide-react';
import { Link } from 'react-router-dom';

const AppFooter: React.FC = () => {
  return (
    <footer className="w-full bg-background border-t border-border py-3 px-4 fixed bottom-0 z-10">
      <nav className="flex items-center justify-around max-w-4xl mx-auto">
        <Link to="/" className="flex flex-col items-center">
          <Home size={24} className="text-primary" />
          <span className="text-xs mt-1">Home</span>
        </Link>
        
        <Link to="/schedule" className="flex flex-col items-center">
          <Calendar size={24} className="text-app-gray-dark" />
          <span className="text-xs mt-1">Schedule</span>
        </Link>
        
        <Link to="/chat" className="flex flex-col items-center">
          <MessageSquare size={24} className="text-app-gray-dark" />
          <span className="text-xs mt-1">Chat</span>
        </Link>
        
        <Link to="/profile" className="flex flex-col items-center">
          <User size={24} className="text-app-gray-dark" />
          <span className="text-xs mt-1">Profile</span>
        </Link>
      </nav>
    </footer>
  );
};

export default AppFooter;
