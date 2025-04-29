
import React from 'react';
import { format } from 'date-fns';
import { Check, AlertTriangle, Utensils, Wrench, Calendar, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Notification } from '@/utils/mockData';

interface NotificationCardProps {
  notification: Notification;
  userId: string;
  onMarkAsRead: (id: string) => void;
  isRead: boolean;
}

const NotificationCard: React.FC<NotificationCardProps> = ({
  notification,
  userId,
  onMarkAsRead,
  isRead
}) => {
  // Helper to get the right icon based on notification type
  const getIcon = () => {
    switch (notification.type) {
      case 'emergency':
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case 'mess':
        return <Utensils className="h-5 w-5 text-green-500" />;
      case 'maintenance':
        return <Wrench className="h-5 w-5 text-blue-500" />;
      case 'events':
        return <Calendar className="h-5 w-5 text-purple-500" />;
      case 'general':
      default:
        return <FileText className="h-5 w-5 text-gray-500" />;
    }
  };

  // Helper to get the badge color based on priority
  const getBadgeVariant = () => {
    switch (notification.priority) {
      case 'high':
        return 'destructive';
      case 'medium':
        return 'default';
      case 'low':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  return (
    <Card className={`mb-4 transition-all ${isRead ? 'opacity-75' : 'border-l-4 border-l-blue-500'}`}>
      <CardHeader className="flex flex-row items-start justify-between pb-2">
        <div className="flex items-center space-x-2">
          {getIcon()}
          <div>
            <h3 className="font-medium">{notification.title}</h3>
            <p className="text-xs text-muted-foreground">
              {format(notification.createdAt, 'PPp')}
            </p>
          </div>
        </div>
        <Badge variant={getBadgeVariant()} className="capitalize">
          {notification.priority}
        </Badge>
      </CardHeader>
      <CardContent>
        <p className="text-sm">{notification.message}</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Badge variant="outline" className="capitalize">
          {notification.type}
        </Badge>
        {!isRead && (
          <Button 
            size="sm" 
            variant="outline" 
            className="text-xs flex items-center gap-1"
            onClick={() => onMarkAsRead(notification.id)}
          >
            <Check className="h-4 w-4" />
            Mark as read
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default NotificationCard;
