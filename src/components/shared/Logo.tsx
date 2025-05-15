
import React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

const Logo: React.FC<LogoProps> = ({ size = 'md', showText = true }) => {
  const sizeClasses = {
    sm: 'h-8',
    md: 'h-10',
    lg: 'h-12'
  };

  return (
    <Link to="/" className="flex items-center">
      <img 
        src="/lovable-uploads/7aea7a8c-cc87-428f-b574-33cab5cca8f3.png" 
        alt="MindSync Logo" 
        className={`${sizeClasses[size]} ${showText ? 'mr-2' : ''}`}
      />
    </Link>
  );
};

export default Logo;
