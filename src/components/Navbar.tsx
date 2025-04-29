
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogOut, Bell, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

interface NavbarProps {
  userName?: string;
  role?: string;
  unreadNotifications?: number;
}

const Navbar: React.FC<NavbarProps> = ({ 
  userName = '', 
  role = '', 
  unreadNotifications = 0 
}) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = () => {
    // In a real app, this would clear authentication state/tokens
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account",
    });
    navigate('/login');
  };

  return (
    <nav className="bg-blue-600 text-white px-4 py-3 flex justify-between items-center shadow-md">
      <div className="flex items-center space-x-2">
        <Link to="/" className="text-xl font-bold">MyHostel</Link>
      </div>
      
      {userName && (
        <div className="flex items-center gap-4">
          <Link to="/dashboard" className="relative">
            <Bell className="h-6 w-6" />
            {unreadNotifications > 0 && (
              <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {unreadNotifications}
              </span>
            )}
          </Link>
          
          <div className="flex items-center gap-2">
            <div className="bg-blue-700 rounded-full p-1">
              <User className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium">{userName}</p>
              <p className="text-xs opacity-80 capitalize">{role}</p>
            </div>
          </div>
          
          <Button variant="ghost" size="icon" onClick={handleLogout}>
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
