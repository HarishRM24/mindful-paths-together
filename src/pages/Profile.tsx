
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppLayout from '@/components/layout/AppLayout';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/components/ui/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { BarChart, Bell, Calendar, Cog, LogOut, Moon, Sun, User } from 'lucide-react';
import { Switch } from '@/components/ui/switch';

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [role, setRole] = useState<'senior' | 'youth'>(user?.role || 'youth');
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);

  if (!user) {
    navigate('/');
    return null;
  }

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Update in local storage for this demo
    const updatedUser = { ...user, name, email, role };
    localStorage.setItem('mindSync_user', JSON.stringify(updatedUser));
    localStorage.setItem('mindSync_userName', name);
    localStorage.setItem('mindSync_userRole', role);
    
    toast({
      title: "Profile updated",
      description: "Your profile has been successfully updated."
    });
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    toast({
      title: darkMode ? "Light mode enabled" : "Dark mode enabled",
      description: "Your preference has been saved."
    });
  };

  const toggleNotifications = () => {
    setNotifications(!notifications);
    toast({
      title: notifications ? "Notifications disabled" : "Notifications enabled",
      description: "Your preference has been saved."
    });
  };

  return (
    <AppLayout>
      <div className="w-full space-y-6 animate-fade-in">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/3">
            <Card className="border-blue-100">
              <CardHeader className="pb-2">
                <CardTitle>My Profile</CardTitle>
                <CardDescription>Manage your account information</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center text-center pt-6">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarFallback className="bg-gradient-to-r from-indigo-600 to-blue-700 text-white text-xl">
                    {getInitials(user.name)}
                  </AvatarFallback>
                </Avatar>
                <h3 className="text-xl font-semibold">{user.name}</h3>
                <p className="text-muted-foreground">{user.email}</p>
                <div className="mt-2 mb-1 inline-block px-3 py-1 rounded-full bg-indigo-100 text-indigo-800 text-xs font-medium">
                  {user.role === 'senior' ? 'Senior' : 'Youth'}
                </div>
              </CardContent>
              <CardFooter className="flex justify-center">
                <Button variant="destructive" onClick={handleLogout} className="mt-2">
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </CardFooter>
            </Card>

            <Card className="mt-4 border-blue-100">
              <CardHeader>
                <CardTitle className="text-base">Account Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-muted-foreground">Wellness Sessions</p>
                    <p className="text-lg font-medium">12</p>
                  </div>
                  <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center">
                    <Calendar className="h-4 w-4 text-indigo-700" />
                  </div>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-muted-foreground">Chat Conversations</p>
                    <p className="text-lg font-medium">36</p>
                  </div>
                  <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center">
                    <BarChart className="h-4 w-4 text-indigo-700" />
                  </div>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-muted-foreground">Account Age</p>
                    <p className="text-lg font-medium">14 days</p>
                  </div>
                  <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center">
                    <User className="h-4 w-4 text-indigo-700" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="md:w-2/3">
            <Tabs defaultValue="account" className="w-full">
              <TabsList className="grid grid-cols-3 mb-4">
                <TabsTrigger value="account">Account</TabsTrigger>
                <TabsTrigger value="preferences">Preferences</TabsTrigger>
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
              </TabsList>
              
              <TabsContent value="account">
                <Card className="border-blue-100">
                  <form onSubmit={handleUpdateProfile}>
                    <CardHeader>
                      <CardTitle>Account Information</CardTitle>
                      <CardDescription>Update your personal details</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input 
                          id="name" 
                          value={name} 
                          onChange={(e) => setName(e.target.value)}
                          className="border-blue-100 focus-visible:ring-indigo-400"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input 
                          id="email" 
                          type="email" 
                          value={email} 
                          onChange={(e) => setEmail(e.target.value)}
                          className="border-blue-100 focus-visible:ring-indigo-400"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label>I am a:</Label>
                        <RadioGroup 
                          value={role} 
                          onValueChange={(value) => setRole(value as 'senior' | 'youth')}
                          className="flex flex-col space-y-1"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="senior" id="senior" className="text-indigo-700" />
                            <Label htmlFor="senior" className="font-normal">Senior</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="youth" id="youth" className="text-indigo-700" />
                            <Label htmlFor="youth" className="font-normal">Youth</Label>
                          </div>
                        </RadioGroup>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button type="submit" className="bg-gradient-to-r from-indigo-600 to-blue-700 hover:from-indigo-700 hover:to-blue-800">
                        Save Changes
                      </Button>
                    </CardFooter>
                  </form>
                </Card>
              </TabsContent>
              
              <TabsContent value="preferences">
                <Card className="border-blue-100">
                  <CardHeader>
                    <CardTitle>Preferences</CardTitle>
                    <CardDescription>Customize your experience</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base" htmlFor="dark-mode">Dark Mode</Label>
                        <p className="text-sm text-muted-foreground">Switch between light and dark theme</p>
                      </div>
                      <div className="flex items-center">
                        <Sun className="h-4 w-4 mr-2 text-amber-500" />
                        <Switch 
                          id="dark-mode"
                          checked={darkMode}
                          onCheckedChange={toggleDarkMode}
                        />
                        <Moon className="h-4 w-4 ml-2 text-indigo-700" />
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">Interface Density</Label>
                        <p className="text-sm text-muted-foreground">Choose how compact the interface appears</p>
                      </div>
                      <div>
                        <RadioGroup defaultValue="comfortable" className="flex space-x-2">
                          <div className="flex items-center space-x-1">
                            <RadioGroupItem value="compact" id="compact" className="text-indigo-700" />
                            <Label htmlFor="compact" className="text-sm">Compact</Label>
                          </div>
                          <div className="flex items-center space-x-1">
                            <RadioGroupItem value="comfortable" id="comfortable" className="text-indigo-700" />
                            <Label htmlFor="comfortable" className="text-sm">Comfortable</Label>
                          </div>
                        </RadioGroup>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">Language</Label>
                        <p className="text-sm text-muted-foreground">Select your preferred language</p>
                      </div>
                      <div>
                        <select className="rounded-md border border-blue-100 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400">
                          <option value="en">English</option>
                          <option value="es">Spanish</option>
                          <option value="fr">French</option>
                          <option value="de">German</option>
                        </select>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="notifications">
                <Card className="border-blue-100">
                  <CardHeader>
                    <CardTitle>Notification Settings</CardTitle>
                    <CardDescription>Control how and when you receive notifications</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">Push Notifications</Label>
                        <p className="text-sm text-muted-foreground">Receive notifications on your device</p>
                      </div>
                      <Switch 
                        checked={notifications}
                        onCheckedChange={toggleNotifications}
                      />
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-4">
                      <Label className="text-base">Notification Types</Label>
                      
                      <div className="ml-4 space-y-3">
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="reminders" className="rounded text-indigo-700 focus:ring-indigo-400" defaultChecked />
                          <Label htmlFor="reminders" className="font-normal">Wellness Reminders</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="messages" className="rounded text-indigo-700 focus:ring-indigo-400" defaultChecked />
                          <Label htmlFor="messages" className="font-normal">Message Notifications</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="updates" className="rounded text-indigo-700 focus:ring-indigo-400" defaultChecked />
                          <Label htmlFor="updates" className="font-normal">Product Updates</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="newsletter" className="rounded text-indigo-700 focus:ring-indigo-400" />
                          <Label htmlFor="newsletter" className="font-normal">Newsletter</Label>
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-2">
                      <Label className="text-base">Quiet Hours</Label>
                      <p className="text-sm text-muted-foreground">Don't send notifications during these hours</p>
                      
                      <div className="grid grid-cols-2 gap-4 mt-2">
                        <div className="space-y-2">
                          <Label htmlFor="from-time" className="text-sm">From</Label>
                          <Input 
                            id="from-time" 
                            type="time" 
                            defaultValue="22:00"
                            className="border-blue-100 focus-visible:ring-indigo-400"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="to-time" className="text-sm">To</Label>
                          <Input 
                            id="to-time" 
                            type="time" 
                            defaultValue="08:00"
                            className="border-blue-100 focus-visible:ring-indigo-400"
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Profile;
