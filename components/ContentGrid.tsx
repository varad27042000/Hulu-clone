"use client"

import { useState } from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlayIcon, PlusIcon } from 'lucide-react';

const DUMMY_CONTENT = [
  { id: 1, title: 'The Mandalorian', type: 'TV Show', image: 'https://source.unsplash.com/random/300x450?sci-fi' },
  { id: 2, title: 'Avengers: Endgame', type: 'Movie', image: 'https://source.unsplash.com/random/300x450?superhero' },
  { id: 3, title: 'Stranger Things', type: 'TV Show', image: 'https://source.unsplash.com/random/300x450?retro' },
  { id: 4, title: 'The Dark Knight', type: 'Movie', image: 'https://source.unsplash.com/random/300x450?dark' },
  { id: 5, title: 'Breaking Bad', type: 'TV Show', image: 'https://source.unsplash.com/random/300x450?desert' },
  { id: 6, title: 'Inception', type: 'Movie', image: 'https://source.unsplash.com/random/300x450?dream' },
];

export default function ContentGrid() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <div className="container mx-auto py-12">
      <h2 className="mb-6 text-3xl font-bold">Popular Content</h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {DUMMY_CONTENT.map((item) => (
          <Card
            key={item.id}
            className="overflow-hidden"
            onMouseEnter={() => setHoveredId(item.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            <CardContent className="p-0">
              <div className="relative aspect-[2/3]">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover"
                />
                {hoveredId === item.id && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 transition-opacity">
                    <Button variant="secondary" size="icon" className="mr-2">
                      <PlayIcon className="h-6 w-6" />
                    </Button>
                    <Button variant="secondary" size="icon">
                      <PlusIcon className="h-6 w-6" />
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex flex-col items-start p-4">
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="text-sm text-gray-500">{item.type}</p>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}