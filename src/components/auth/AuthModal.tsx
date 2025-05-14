
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

interface AuthModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultView?: 'login' | 'signup';
}

const AuthModal: React.FC<AuthModalProps> = ({ 
  open, 
  onOpenChange,
  defaultView = 'login'
}) => {
  const [view, setView] = useState<'login' | 'signup'>(defaultView);

  const handleSuccess = () => {
    onOpenChange(false);
  };

  const toggleView = () => {
    setView(view === 'login' ? 'signup' : 'login');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {view === 'login' ? 'Welcome back' : 'Create an account'}
          </DialogTitle>
        </DialogHeader>
        
        {view === 'login' ? (
          <LoginForm onSuccess={handleSuccess} onToggleForm={toggleView} />
        ) : (
          <SignupForm onSuccess={handleSuccess} onToggleForm={toggleView} />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
