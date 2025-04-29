
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';

const FeedbackForm: React.FC = () => {
  const [category, setCategory] = useState('mess');
  const [rating, setRating] = useState<string>('3');
  const [comment, setComment] = useState('');
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!category || !rating) {
      toast({
        variant: "destructive",
        title: "Missing information",
        description: "Please select a category and rating",
      });
      return;
    }
    
    // In a real app, this would send the feedback to a server
    toast({
      title: "Feedback submitted",
      description: "Thank you for your feedback!",
    });
    
    // Reset form
    setComment('');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Submit Feedback</CardTitle>
        <CardDescription>Share your thoughts on hostel facilities and services</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mess">Mess Food</SelectItem>
                <SelectItem value="facilities">Facilities</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label>Rating</Label>
            <RadioGroup 
              value={rating} 
              onValueChange={setRating}
              className="flex justify-between"
            >
              {[1, 2, 3, 4, 5].map((value) => (
                <div key={value} className="flex flex-col items-center">
                  <RadioGroupItem value={value.toString()} id={`rating-${value}`} />
                  <Label htmlFor={`rating-${value}`} className="mt-1">{value}</Label>
                </div>
              ))}
            </RadioGroup>
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>Poor</span>
              <span>Excellent</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="comment">Comments (optional)</Label>
            <Textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share your thoughts..."
              rows={4}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full">Submit Feedback</Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default FeedbackForm;
