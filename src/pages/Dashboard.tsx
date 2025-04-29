import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import NotificationList from '@/components/NotificationList';
import QRGenerator from '@/components/QRGenerator';
import FeedbackForm from '@/components/FeedbackForm';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { mockNotifications, markAsRead } from '@/utils/mockData';

const Dashboard = () => {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [currentUser, setCurrentUser] = useState({ id: '1', name: 'John Student', role: 'student' });
  const navigate = useNavigate();

  useEffect(() => {
    // Placeholder for auth logic
  }, [navigate]);

  const unreadCount = notifications.filter(
    notification => !notification.readBy.includes(currentUser.id)
  ).length;

  const handleMarkAsRead = (notificationId: string) => {
    markAsRead(notificationId, currentUser.id);
    setNotifications([...notifications]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar
        userName={currentUser.name}
        role={currentUser.role}
        unreadNotifications={unreadCount}
      />

      <main className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Student Dashboard</h1>

        <Tabs defaultValue="notifications">
          <TabsList className="grid w-full grid-cols-3 gap-2 mb-8">
            <TabsTrigger
              value="notifications"
              className="text-lg font-medium p-3 rounded-lg border-2 border-indigo-300 shadow-sm data-[state=active]:bg-indigo-600 data-[state=active]:text-white hover:bg-indigo-100 transition"
            >
              Notifications
            </TabsTrigger>
            <TabsTrigger
              value="visitors"
              className="text-lg font-medium p-3 rounded-lg border-2 border-indigo-300 shadow-sm data-[state=active]:bg-indigo-600 data-[state=active]:text-white hover:bg-indigo-100 transition"
            >
              Visitors
            </TabsTrigger>
            <TabsTrigger
              value="feedback"
              className="text-lg font-medium p-3 rounded-lg border-2 border-indigo-300 shadow-sm data-[state=active]:bg-indigo-600 data-[state=active]:text-white hover:bg-indigo-100 transition"
            >
              Feedback
            </TabsTrigger>
          </TabsList>

          <TabsContent value="notifications" className="space-y-4">
            <NotificationList
              notifications={notifications}
              userId={currentUser.id}
              onMarkAsRead={handleMarkAsRead}
            />
          </TabsContent>

          <TabsContent value="visitors">
            <div className="max-w-md mx-auto border-2 border-indigo-200 shadow-md p-6 rounded-lg">
              <QRGenerator />
            </div>
          </TabsContent>

          <TabsContent value="feedback">
            <div className="max-w-md mx-auto border-2 border-indigo-200 shadow-md p-6 rounded-lg">
              <FeedbackForm />
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Dashboard;
