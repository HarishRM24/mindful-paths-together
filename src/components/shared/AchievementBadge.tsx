
import React from 'react';
import { Award } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AchievementBadgeProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  achieved: boolean;
  progress?: number;
  className?: string;
}

const AchievementBadge: React.FC<AchievementBadgeProps> = ({
  title,
  description,
  icon,
  achieved,
  progress = 0,
  className
}) => {
  return (
    <div 
      className={cn(
        "relative flex items-center p-4 rounded-xl border",
        achieved 
          ? "bg-gradient-to-br from-secondary/10 to-primary/10 border-secondary/30" 
          : "bg-app-gray-light/30 border-app-gray-light",
        className
      )}
    >
      <div 
        className={cn(
          "w-12 h-12 rounded-full flex items-center justify-center mr-3",
          achieved ? "bg-secondary/20" : "bg-app-gray-medium/20"
        )}
      >
        {icon || <Award size={24} className={achieved ? "text-secondary" : "text-app-gray-dark"} />}
      </div>
      
      <div className="flex-1">
        <h3 className={cn(
          "font-medium",
          achieved ? "text-foreground" : "text-app-gray-dark"
        )}>
          {title}
        </h3>
        <p className="text-sm text-app-gray-dark">{description}</p>
        
        {/* Progress bar for incomplete achievements */}
        {!achieved && progress > 0 && progress < 100 && (
          <div className="mt-2 w-full bg-app-gray-light rounded-full h-1.5">
            <div 
              className="bg-primary h-1.5 rounded-full" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        )}
      </div>
      
      {achieved && (
        <div className="absolute top-0 right-0 transform translate-x-1/3 -translate-y-1/3">
          <div className="bg-secondary text-white rounded-full w-6 h-6 flex items-center justify-center">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
};

export default AchievementBadge;
