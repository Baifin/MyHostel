import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import NotificationList from '@/components/NotificationList';
import EngagementChart from '@/components/EngagementChart';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { mockNotifications, markAsRead } from '@/utils/mockData';

const AdminDashboard = () => {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [currentUser, setCurrentUser] = useState({ id: '2', name: 'Admin Warden', role: 'warden' });
  const [notificationType, setNotificationType] = useState<string>('general');
  const [notificationPriority, setNotificationPriority] = useState<string>('medium');
  const [notificationTitle, setNotificationTitle] = useState('');
  const [notificationMessage, setNotificationMessage] = useState('');

  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Placeholder for auth check
  }, [navigate]);

  const unreadCount = notifications.filter(
    notification => !notification.readBy.includes(currentUser.id)
  ).length;

  const handleMarkAsRead = (notificationId: string) => {
    markAsRead(notificationId, currentUser.id);
    setNotifications([...notifications]);
  };

  const handleCreateNotification = (e: React.FormEvent) => {
    e.preventDefault();

    if (!notificationTitle || !notificationMessage) {
      toast({
        variant: "destructive",
        title: "Missing information",
        description: "Please provide both title and message for the notification",
      });
      return;
    }

    const newNotification = {
      id: (notifications.length + 1).toString(),
      title: notificationTitle,
      message: notificationMessage,
      type: notificationType as any,
      priority: notificationPriority as any,
      createdAt: new Date(),
      readBy: [],
      createdBy: currentUser.id
    };

    setNotifications([newNotification, ...notifications]);

    toast({
      title: "Notification created",
      description: "Your notification has been sent to all students",
    });

    setNotificationTitle('');
    setNotificationMessage('');
    setNotificationType('general');
    setNotificationPriority('medium');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar 
        userName={currentUser.name}
        role={currentUser.role}
        unreadNotifications={unreadCount}
      />

      <main className="container mx-auto px-4 py-6">
        <h1 className="text-3xl font-semibold mb-6 text-gray-800">Warden Dashboard</h1>

        <Tabs defaultValue="create">
          <TabsList className="grid w-full grid-cols-3 mb-8 gap-2">
            <TabsTrigger
              className="text-lg font-medium p-3 rounded-lg border-2 border-indigo-300 shadow-sm data-[state=active]:bg-indigo-600 data-[state=active]:text-white hover:bg-indigo-100 transition"
              value="create"
            >
              Create Notification
            </TabsTrigger>
            <TabsTrigger
              className="text-lg font-medium p-3 rounded-lg border-2 border-indigo-300 shadow-sm data-[state=active]:bg-indigo-600 data-[state=active]:text-white hover:bg-indigo-100 transition"
              value="notifications"
            >
              All Notifications
            </TabsTrigger>
            <TabsTrigger
              className="text-lg font-medium p-3 rounded-lg border-2 border-indigo-300 shadow-sm data-[state=active]:bg-indigo-600 data-[state=active]:text-white hover:bg-indigo-100 transition"
              value="analytics"
            >
              Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="create">
            <Card className="shadow-lg border-2 border-gray-200 rounded-lg">
              <CardHeader className="bg-indigo-50 p-4">
                <CardTitle className="text-xl font-semibold">Create New Notification</CardTitle>
                <CardDescription>Send a new notification to all hostel students</CardDescription>
              </CardHeader>
              <form onSubmit={handleCreateNotification}>
                <CardContent className="space-y-4 bg-white p-6 rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="type" className="font-medium text-lg">Notification Type</Label>
                      <Select value={notificationType} onValueChange={setNotificationType}>
                        <SelectTrigger className="p-3 border-2 border-indigo-300 shadow-sm rounded-lg transition focus:ring-2 focus:ring-indigo-400">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="general">General</SelectItem>
                          <SelectItem value="emergency">Emergency</SelectItem>
                          <SelectItem value="mess">Mess</SelectItem>
                          <SelectItem value="maintenance">Maintenance</SelectItem>
                          <SelectItem value="events">Events</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="priority" className="font-medium text-lg">Priority Level</Label>
                      <Select value={notificationPriority} onValueChange={setNotificationPriority}>
                        <SelectTrigger className="p-3 border-2 border-indigo-300 shadow-sm rounded-lg transition focus:ring-2 focus:ring-indigo-400">
                          <SelectValue placeholder="Select priority" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="title" className="font-medium text-lg">Title</Label>
                    <Input
                      id="title"
                      value={notificationTitle}
                      onChange={(e) => setNotificationTitle(e.target.value)}
                      placeholder="Enter notification title"
                      className="border-2 border-indigo-300 rounded-lg p-3 shadow-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="font-medium text-lg">Message</Label>
                    <Textarea
                      id="message"
                      value={notificationMessage}
                      onChange={(e) => setNotificationMessage(e.target.value)}
                      placeholder="Enter notification message"
                      rows={4}
                      className="border-2 border-indigo-300 rounded-lg p-3 shadow-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    type="submit"
                    className="w-full bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-400 shadow-md border-2 border-indigo-500 transition"
                  >
                    Send Notification
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>

          <TabsContent value="notifications">
            <NotificationList
              notifications={notifications}
              userId={currentUser.id}
              onMarkAsRead={handleMarkAsRead}
            />
          </TabsContent>

          <TabsContent value="analytics">
            <EngagementChart notifications={notifications} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminDashboard;
