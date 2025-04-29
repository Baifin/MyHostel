
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Bell, Users, QrCode, MessageSquare, Check } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white">
      <header className="bg-blue-600 text-white px-4 py-3 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">MyHostel</h1>
          <Button 
            variant="outline" 
            onClick={() => navigate('/login')} 
            className="text-blue-500 border-blue-500 hover:bg-blue-500 hover:text-white"
          >
            Login
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-4xl font-bold mb-4 text-blue-800">Smart Hostel Notification Platform</h1>
          <p className="text-xl text-gray-600 mb-8">
            The ultimate communication solution for hostel administrators and students
          </p>
          <Button 
            size="lg" 
            className="bg-blue-600 hover:bg-blue-700" 
            onClick={() => navigate('/login')}
          >
            Get Started
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          <FeatureCard 
            icon={<Bell className="h-10 w-10 text-blue-600" />}
            title="Smart Notifications"
            description="Receive categorized notifications for general announcements, emergencies, mess updates, maintenance information, and events."
          />
          <FeatureCard 
            icon={<Users className="h-10 w-10 text-blue-600" />}
            title="Role-Based Access"
            description="Different interfaces and permissions for students and wardens, ensuring the right information reaches the right people."
          />
          <FeatureCard 
            icon={<QrCode className="h-10 w-10 text-blue-600" />}
            title="QR-Based Visitor Entry"
            description="Easy and secure visitor management with QR code generation and tracking."
          />
          <FeatureCard 
            icon={<Check className="h-10 w-10 text-blue-600" />}
            title="Acknowledgment Tracking"
            description="Mark notifications as read to keep track of important information."
          />
          <FeatureCard 
            icon={<MessageSquare className="h-10 w-10 text-blue-600" />}
            title="Feedback System"
            description="Submit and manage feedback for mess food and hostel facilities to continuously improve services."
          />
          <FeatureCard 
            icon={<Bell className="h-10 w-10 text-blue-600" />}
            title="Priority Alerts"
            description="High-priority updates are highlighted to ensure critical information is noticed immediately."
          />
        </div>
      </main>

      <footer className="bg-blue-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="mb-2">MyHostel - Keeping students connected and informed</p>
          <p className="text-sm opacity-75">© 2023 Smart Hostel Solutions</p>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
      <div className="flex flex-col items-center mb-4">
        {icon}
        <h3 className="text-xl font-semibold mt-4">{title}</h3>
      </div>
      <p className="text-gray-600 text-center">{description}</p>
    </div>
  );
};

export default Index;
