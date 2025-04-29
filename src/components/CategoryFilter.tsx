
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { AlertTriangle, Utensils, Wrench, Calendar, FileText } from 'lucide-react';

interface CategoryFilterProps {
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
  showUnreadOnly: boolean;
  onToggleUnread: () => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory,
  onSelectCategory,
  showUnreadOnly,
  onToggleUnread
}) => {
  const categories = [
    { value: 'general', label: 'General', icon: <FileText className="h-4 w-4" /> },
    { value: 'emergency', label: 'Emergency', icon: <AlertTriangle className="h-4 w-4" /> },
    { value: 'mess', label: 'Mess', icon: <Utensils className="h-4 w-4" /> },
    { value: 'maintenance', label: 'Maintenance', icon: <Wrench className="h-4 w-4" /> },
    { value: 'events', label: 'Events', icon: <Calendar className="h-4 w-4" /> },
  ];

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="font-semibold text-lg">Filter Notifications</h2>
        <div className="flex items-center space-x-2">
          <Switch
            id="unread-only"
            checked={showUnreadOnly}
            onCheckedChange={onToggleUnread}
          />
          <Label htmlFor="unread-only">Show unread only</Label>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-2">
        <Badge
          variant={selectedCategory === null ? "default" : "outline"}
          className="cursor-pointer hover:bg-primary/90"
          onClick={() => onSelectCategory(null)}
        >
          All
        </Badge>
        
        {categories.map((category) => (
          <Badge
            key={category.value}
            variant={selectedCategory === category.value ? "default" : "outline"}
            className="cursor-pointer hover:bg-primary/90 flex items-center gap-1"
            onClick={() => onSelectCategory(category.value)}
          >
            {category.icon}
            {category.label}
          </Badge>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
