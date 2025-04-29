
import React, { useState } from 'react';
import NotificationCard from './NotificationCard';
import { Notification } from '@/utils/mockData';
import CategoryFilter from './CategoryFilter';

interface NotificationListProps {
  notifications: Notification[];
  userId: string;
  onMarkAsRead: (id: string) => void;
}

const NotificationList: React.FC<NotificationListProps> = ({
  notifications,
  userId,
  onMarkAsRead
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);

  // Filter notifications based on category and read status
  const filteredNotifications = notifications.filter(notification => {
    if (selectedCategory && notification.type !== selectedCategory) {
      return false;
    }
    if (showUnreadOnly && notification.readBy.includes(userId)) {
      return false;
    }
    return true;
  });

  return (
    <div>
      <div className="mb-6">
        <CategoryFilter
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          showUnreadOnly={showUnreadOnly}
          onToggleUnread={() => setShowUnreadOnly(!showUnreadOnly)}
        />
      </div>
      
      {filteredNotifications.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No notifications found</p>
        </div>
      ) : (
        filteredNotifications.map(notification => (
          <NotificationCard
            key={notification.id}
            notification={notification}
            userId={userId}
            onMarkAsRead={onMarkAsRead}
            isRead={notification.readBy.includes(userId)}
          />
        ))
      )}
    </div>
  );
};

export default NotificationList;
