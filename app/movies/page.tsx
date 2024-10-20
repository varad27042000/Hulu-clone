"use client"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from '@/components/ui/button';
import { PlayIcon, PlusIcon } from 'lucide-react';
import { useEffect, useState } from "react";
import { fetchTrending } from '@/lib/tmdb';

interface Content {
  id: number;
  title?: string;
  name?: string;
  media_type: string;
  poster_path: string;
}

export default function MoviesPage() {
  const [content, setContent] = useState<Content[]>([]);
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadContent() {
      try {
        const trendingContent = await fetchTrending();
        setContent(trendingContent.results);
        setError(null);
      } catch (error) {
        console.error('Error fetching trending content:', error);
        setError(`Failed to load content. Error: ${error instanceof Error ? error.message : String(error)}`);
      } finally {
        setIsLoading(false);
      }
    }
    loadContent();
  }, []);

  if (isLoading) {
    return <div className="container mx-auto py-12">Loading...</div>;
  }

  if (error) {
    return <div className="container mx-auto py-12 text-red-500">{error}</div>;
  }
    return (
      <div className="container mx-auto py-12">
        <h1 className="text-3xl font-bold mb-6">Movies</h1>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {content.map((item) => (
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
                  alt={item.title || item.name}
                  className="h-full w-full object-cover"
                />
                {hoveredId === item.id && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 transition-opacity">
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 transition-opacity">
                    <Button variant="secondary" size="icon" className="mr-2" title="Play"> {/* Added title attribute for tooltip */}
  <PlayIcon className="h-6 w-6" />
</Button>
<Button variant="secondary" size="icon" title="Add to My Stuff"> {/* Added title attribute for tooltip */}
  <PlusIcon className="h-6 w-6" />
</Button>

                  </div>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex flex-col items-start p-4">
              <h3 className="text-lg font-semibold">{item.title || item.name}</h3>
              <p className="text-sm text-gray-500">{item.media_type}</p>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
      
    );
  }