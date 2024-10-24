"use client"

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { PlusIcon, CheckIcon } from 'lucide-react';

interface AddToMyStuffButtonProps {
  content: {
    id: number;
    title?: string;
    name?: string;
    poster_path: string;
    media_type: string;
  };
}

export default function AddToMyStuffButton({ content }: AddToMyStuffButtonProps) {
  const [isAdded, setIsAdded] = useState(false);

  // Check if content is in My Stuff whenever the component mounts or content changes
  useEffect(() => {
    checkIfAdded();
    // Add event listener for storage changes
    window.addEventListener('storage', checkIfAdded);
    return () => window.removeEventListener('storage', checkIfAdded);
  }, [content.id]);

  const checkIfAdded = () => {
    try {
      const storedContent = localStorage.getItem('myStuff');
      if (storedContent) {
        const parsedContent = JSON.parse(storedContent);
        setIsAdded(parsedContent.some((item: any) => item.id === content.id));
      } else {
        setIsAdded(false);
      }
    } catch (error) {
      console.error('Error checking My Stuff status:', error);
      setIsAdded(false);
    }
  };

  const handleAddToMyStuff = () => {
    try {
      const storedContent = localStorage.getItem('myStuff');
      let myStuff = storedContent ? JSON.parse(storedContent) : [];

      if (isAdded) {
        // Remove from My Stuff
        myStuff = myStuff.filter((item: any) => item.id !== content.id);
      } else {
        // Add to My Stuff
        const newItem = {
          id: content.id,
          title: content.title || content.name,
          poster_path: content.poster_path,
          media_type: content.media_type,
        };
        myStuff = [...myStuff, newItem];
      }

      // Update localStorage
      localStorage.setItem('myStuff', JSON.stringify(myStuff));
      
      // Update state
      setIsAdded(!isAdded);
      
      // Dispatch storage event for other components
      window.dispatchEvent(new Event('storage'));
    } catch (error) {
      console.error('Error updating My Stuff:', error);
    }
  };

  return (
    <Button 
      variant="secondary" 
      size="icon" 
      onClick={handleAddToMyStuff}
      title={isAdded ? "Remove from My Stuff" : "Add to My Stuff"}
    >
      {isAdded ? <CheckIcon className="h-6 w-6" /> : <PlusIcon className="h-6 w-6" />}
    </Button>
  );
}