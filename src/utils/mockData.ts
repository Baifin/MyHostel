
export type NotificationType = 'general' | 'emergency' | 'mess' | 'maintenance' | 'events';
export type UserRole = 'student' | 'warden';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  hostelBlock?: string;
  roomNumber?: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  createdAt: Date;
  priority: 'low' | 'medium' | 'high';
  readBy: string[];
  createdBy: string;
}

export interface Feedback {
  id: string;
  userId: string;
  category: 'mess' | 'facilities';
  rating: number;
  comment: string;
  createdAt: Date;
}

export interface Visitor {
  id: string;
  name: string;
  purpose: string;
  contactNumber: string;
  hostUserId: string;
  checkInTime: Date;
  checkOutTime?: Date;
}

// Mock users
export const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Student',
    email: 'student@example.com',
    role: 'student',
    hostelBlock: 'A',
    roomNumber: '101'
  },
  {
    id: '2',
    name: 'Admin Warden',
    email: 'warden@example.com',
    role: 'warden',
  },
];

// Mock notifications
export const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'Welcome to MyHostel',
    message: 'Welcome to the new notification system for the hostel. Stay updated with all the latest announcements!',
    type: 'general',
    createdAt: new Date('2023-04-26T10:00:00'),
    priority: 'medium',
    readBy: ['0'],
    createdBy: '2'
  },
  {
    id: '2',
    title: 'Fire Drill Today',
    message: 'There will be a fire drill today at 4:00 PM. All students must evacuate their rooms and assemble in the courtyard.',
    type: 'emergency',
    createdAt: new Date('2023-04-26T09:00:00'),
    priority: 'high',
    readBy: [],
    createdBy: '2'
  },
  {
    id: '3',
    title: 'Special Dinner Tonight',
    message: 'Tonight\'s dinner will be a special menu featuring local specialties. Dinner will be served from 7:00 PM to 9:00 PM.',
    type: 'mess',
    createdAt: new Date('2023-04-26T08:30:00'),
    priority: 'low',
    readBy: ['1'],
    createdBy: '2'
  },
  {
    id: '4',
    title: 'Plumbing Maintenance',
    message: 'Plumbers will be working on Block A from 10:00 AM to 2:00 PM tomorrow. Water supply may be interrupted during this period.',
    type: 'maintenance',
    createdAt: new Date('2023-04-25T16:00:00'),
    priority: 'medium',
    readBy: [],
    createdBy: '2'
  },
  {
    id: '5',
    title: 'Cultural Night',
    message: 'Cultural night will be held on Saturday at 6:00 PM in the main auditorium. All are invited to attend and participate!',
    type: 'events',
    createdAt: new Date('2023-04-24T14:30:00'),
    priority: 'medium',
    readBy: ['1'],
    createdBy: '2'
  }
];

// Mock feedbacks
export const mockFeedbacks: Feedback[] = [
  {
    id: '1',
    userId: '1',
    category: 'mess',
    rating: 4,
    comment: 'Food was good today, especially the curry.',
    createdAt: new Date('2023-04-25T19:30:00')
  },
  {
    id: '2',
    userId: '1',
    category: 'facilities',
    rating: 3,
    comment: 'The gym equipment needs maintenance.',
    createdAt: new Date('2023-04-24T18:00:00')
  }
];

// Mock visitors
export const mockVisitors: Visitor[] = [
  {
    id: '1',
    name: 'Parent Visitor',
    purpose: 'Family Visit',
    contactNumber: '1234567890',
    hostUserId: '1',
    checkInTime: new Date('2023-04-26T11:00:00'),
    checkOutTime: new Date('2023-04-26T13:00:00')
  },
  {
    id: '2',
    name: 'Maintenance Worker',
    purpose: 'AC Repair',
    contactNumber: '9876543210',
    hostUserId: '1',
    checkInTime: new Date('2023-04-25T10:00:00'),
    checkOutTime: new Date('2023-04-25T12:30:00')
  }
];

// Helper function to simulate login
export const mockLogin = (email: string, password: string): User | null => {
  // In a real app, we would validate the password
  const user = mockUsers.find(u => u.email === email);
  return user || null;
};

// Helper function to mark notification as read
export const markAsRead = (notificationId: string, userId: string): void => {
  const notification = mockNotifications.find(n => n.id === notificationId);
  if (notification && !notification.readBy.includes(userId)) {
    notification.readBy.push(userId);
  }
};
