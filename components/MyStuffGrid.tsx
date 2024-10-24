"use client"

import { useState, useEffect } from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlayIcon, XIcon } from 'lucide-react';
import VideoModal from './VideoModal';

interface SavedContent {
  id: number;
  title: string;
  poster_path: string;
  media_type: string;
}

export default function MyStuffGrid() {
  const [savedContent, setSavedContent] = useState<SavedContent[]>([]);
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [selectedContent, setSelectedContent] = useState<SavedContent | null>(null);

  useEffect(() => {
    const storedContent = localStorage.getItem('myStuff');
    if (storedContent) {
      setSavedContent(JSON.parse(storedContent));
    }
  }, []);

  const handlePlay = (content: SavedContent) => {
    setSelectedContent(content);
  };

  const handleRemove = (id: number) => {
    const updatedContent = savedContent.filter(item => item.id !== id);
    setSavedContent(updatedContent);
    localStorage.setItem('myStuff', JSON.stringify(updatedContent));
  };

  return (
    <div className="container mx-auto ">
     <p className="text-xl mb-8">Explore Your exclusive Watchlist.</p>
      {savedContent.length === 0 ? (
        <p>You haven't saved any content yet. Start exploring and add some favorites!</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {savedContent.map((item) => (
            <Card
              key={item.id}
              className="overflow-hidden"
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <CardContent className="p-0">
                <div className="relative aspect-[2/3]">
                  <img
                    src={item.poster_path ? `https://image.tmdb.org/t/p/w500${item.poster_path}` : '/placeholder.jpg'}
                    alt={item.title}
                    className="h-full w-full object-cover"
                  />
                  {hoveredId === item.id && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 transition-opacity">
                      <Button variant="secondary" size="icon" className="mr-2" onClick={() => handlePlay(item)}>
                        <PlayIcon className="h-6 w-6" />
                      </Button>
                      <Button variant="secondary" size="icon" onClick={() => handleRemove(item.id)}>
                        <XIcon className="h-6 w-6" />
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter className="flex flex-col items-start p-4">
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.media_type}</p>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
      {selectedContent && (
        <VideoModal
          isOpen={!!selectedContent}
          onClose={() => setSelectedContent(null)}
          title={selectedContent.title}
          mediaType={selectedContent.media_type}
        />
      )}
    </div>
  );
}