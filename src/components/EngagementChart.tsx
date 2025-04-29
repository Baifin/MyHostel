
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Notification } from '@/utils/mockData';

interface EngagementChartProps {
  notifications: Notification[];
}

const EngagementChart: React.FC<EngagementChartProps> = ({ notifications }) => {
  // Calculate read percentages by category
  const calculateEngagementData = () => {
    const categories = ['general', 'emergency', 'mess', 'maintenance', 'events'];
    
    return categories.map(category => {
      const categoryNotifications = notifications.filter(n => n.type === category);
      const totalInCategory = categoryNotifications.length;
      
      if (totalInCategory === 0) return { name: category, read: 0, unread: 0 };
      
      const readCount = categoryNotifications.reduce((count, notification) => {
        return count + (notification.readBy.length > 0 ? 1 : 0);
      }, 0);
      
      const readPercentage = Math.round((readCount / totalInCategory) * 100);
      const unreadPercentage = 100 - readPercentage;
      
      return {
        name: category.charAt(0).toUpperCase() + category.slice(1),
        read: readPercentage,
        unread: unreadPercentage
      };
    });
  };
  
  const data = calculateEngagementData();
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Notification Engagement</CardTitle>
        <CardDescription>
          Statistics on notification read rates by category
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="read" name="Read %" fill="#3B82F6" />
            <Bar dataKey="unread" name="Unread %" fill="#F59E0B" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default EngagementChart;
