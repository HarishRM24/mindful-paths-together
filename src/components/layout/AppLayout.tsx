
import React from 'react';
import AppHeader from '../shared/AppHeader';
import AppFooter from '../shared/AppFooter';

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <AppHeader />
      <main className="flex-1 pb-16 pt-2 px-4 max-w-4xl mx-auto w-full">
        {children}
      </main>
      <AppFooter />
    </div>
  );
};

export default AppLayout;
