
import React, { useState } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { format } from 'date-fns';
import { CalendarIcon, Clock, MapPin, BookOpen, User, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

interface Event {
  id: string;
  title: string;
  time: string;
  type: 'appointment' | 'medication' | 'activity' | 'social';
  location?: string;
  notes?: string;
}

const SchedulePage = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [view, setView] = useState<'day' | 'week' | 'month'>('day');
  const { toast } = useToast();
  
  // Sample event data - in a real app, this would come from a database
  const events: Record<string, Event[]> = {
    [format(new Date(), 'yyyy-MM-dd')]: [
      {
        id: '1',
        title: 'Doctor Appointment',
        time: '10:00 AM',
        type: 'appointment',
        location: 'Sunrise Medical Center',
        notes: 'Bring medical records'
      },
      {
        id: '2',
        title: 'Take Blood Pressure Medication',
        time: '9:00 AM',
        type: 'medication'
      },
      {
        id: '3',
        title: 'Support Group',
        time: '3:00 PM',
        type: 'social',
        location: 'Community Center'
      }
    ],
    [format(new Date(Date.now() + 86400000), 'yyyy-MM-dd')]: [
      {
        id: '4',
        title: 'Memory Exercise',
        time: '11:00 AM',
        type: 'activity'
      },
      {
        id: '5',
        title: 'Take Evening Medication',
        time: '7:00 PM',
        type: 'medication'
      }
    ]
  };
  
  const getEventsForSelectedDate = () => {
    if (!date) return [];
    const dateKey = format(date, 'yyyy-MM-dd');
    return events[dateKey] || [];
  };
  
  const getEventIcon = (type: Event['type']) => {
    switch (type) {
      case 'appointment':
        return <User className="h-4 w-4 text-primary" />;
      case 'medication':
        return <Clock className="h-4 w-4 text-secondary" />;
      case 'activity':
        return <BookOpen className="h-4 w-4 text-accent" />;
      case 'social':
        return <User className="h-4 w-4 text-blue-500" />;
      default:
        return <CalendarIcon className="h-4 w-4" />;
    }
  };
  
  const handleAddEvent = () => {
    toast({
      title: "Add New Event",
      description: "This would open a form to add a new event (not implemented in this demo)"
    });
  };

  return (
    <AppLayout>
      <div className="w-full space-y-5 animate-fade-in pb-20">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="title-large">Schedule & Reminders</h1>
          <Button onClick={handleAddEvent}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Event
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Calendar Section */}
          <Card className="md:col-span-1 shadow-md">
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center">
                <CalendarIcon className="mr-2 h-5 w-5 text-primary" />
                Calendar
              </CardTitle>
            </CardHeader>
            <CardContent className="pb-6">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border p-3 pointer-events-auto"
              />
            </CardContent>
          </Card>
          
          {/* Events for selected date */}
          <Card className="md:col-span-2 shadow-md">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-semibold">
                {date ? format(date, 'EEEE, MMMM d, yyyy') : 'Select a date'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="all" className="w-full">
                <TabsList className="mb-4">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="appointment">Appointments</TabsTrigger>
                  <TabsTrigger value="medication">Medications</TabsTrigger>
                  <TabsTrigger value="activity">Activities</TabsTrigger>
                </TabsList>
                
                <TabsContent value="all" className="space-y-4 mt-2">
                  {getEventsForSelectedDate().length > 0 ? (
                    getEventsForSelectedDate().map((event) => (
                      <div key={event.id} className="flex items-start p-3 bg-card rounded-lg border">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 
                          ${event.type === 'appointment' ? 'bg-primary/20' : 
                          event.type === 'medication' ? 'bg-secondary/20' : 
                          event.type === 'activity' ? 'bg-accent/20' : 'bg-blue-500/20'}`}>
                          {getEventIcon(event.type)}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <h3 className="font-semibold">{event.title}</h3>
                            <span className="text-sm text-muted-foreground">{event.time}</span>
                          </div>
                          {event.location && (
                            <div className="flex items-center mt-1 text-sm text-muted-foreground">
                              <MapPin className="h-3 w-3 mr-1" />
                              <span>{event.location}</span>
                            </div>
                          )}
                          {event.notes && (
                            <p className="text-sm mt-1 text-muted-foreground">{event.notes}</p>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">No events scheduled for this day</p>
                      <Button variant="outline" className="mt-4" onClick={handleAddEvent}>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Add Event
                      </Button>
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="appointment" className="space-y-4">
                  {getEventsForSelectedDate()
                    .filter(e => e.type === 'appointment')
                    .map((event) => (
                      <div key={event.id} className="flex items-start p-3 bg-card rounded-lg border">
                        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                          {getEventIcon(event.type)}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <h3 className="font-semibold">{event.title}</h3>
                            <span className="text-sm text-muted-foreground">{event.time}</span>
                          </div>
                          {event.location && (
                            <div className="flex items-center mt-1 text-sm text-muted-foreground">
                              <MapPin className="h-3 w-3 mr-1" />
                              <span>{event.location}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                </TabsContent>
                
                <TabsContent value="medication" className="space-y-4">
                  {getEventsForSelectedDate()
                    .filter(e => e.type === 'medication')
                    .map((event) => (
                      <div key={event.id} className="flex items-start p-3 bg-card rounded-lg border">
                        <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center mr-3">
                          {getEventIcon(event.type)}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <h3 className="font-semibold">{event.title}</h3>
                            <span className="text-sm text-muted-foreground">{event.time}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                </TabsContent>
                
                <TabsContent value="activity" className="space-y-4">
                  {getEventsForSelectedDate()
                    .filter(e => e.type === 'activity')
                    .map((event) => (
                      <div key={event.id} className="flex items-start p-3 bg-card rounded-lg border">
                        <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center mr-3">
                          {getEventIcon(event.type)}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <h3 className="font-semibold">{event.title}</h3>
                            <span className="text-sm text-muted-foreground">{event.time}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default SchedulePage;
