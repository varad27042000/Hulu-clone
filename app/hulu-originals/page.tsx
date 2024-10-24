"use client"

import { useState, useEffect } from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlayIcon, StarIcon } from 'lucide-react';
import { fetchPopularTVShows } from '@/lib/tmdb';
import VideoModal from '@/components/VideoModal';

interface OriginalContent {
  id: number;
  name: string;
  poster_path: string;
  vote_average: number;
  first_air_date: string;
  overview: string;
}

export default function HuluOriginalsPage() {
  const [originals, setOriginals] = useState<OriginalContent[]>([]);
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [selectedShow, setSelectedShow] = useState<OriginalContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchOriginalsData() {
      try {
        const data = await fetchPopularTVShows();
        // For this example, we'll consider the top 8 shows as "Hulu Originals"
        setOriginals(data.results.slice(0, 8));
      } catch (err) {
        console.error('Error fetching Hulu Originals content:', err);
        setError('Failed to fetch Hulu Originals content. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    }
    fetchOriginalsData();
  }, []);

  const handlePlay = (show: OriginalContent) => {
    setSelectedShow(show);
  };

  if (isLoading) {
    return <div className="container mx-auto py-12">Loading Hulu Originals...</div>;
  }

  if (error) {
    return <div className="container mx-auto py-12 text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-4xl font-bold mb-8">Hulu Originals</h1>
      <p className="text-xl mb-8">Discover exclusive content available only on Hulu.</p>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {originals.map((show) => (
          <Card
            key={show.id}
            className="overflow-hidden"
            onMouseEnter={() => setHoveredId(show.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            <CardContent className="p-0">
              <div className="relative aspect-[2/3]">
                <img
                  src={show.poster_path ? `https://image.tmdb.org/t/p/w500${show.poster_path}` : '/placeholder.jpg'}
                  alt={show.name}
                  className="h-full w-full object-cover"
                />
                {hoveredId === show.id && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 transition-opacity">
                    <Button variant="secondary" size="icon" onClick={() => handlePlay(show)}>
                      <PlayIcon className="h-6 w-6" />
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex flex-col items-start p-4">
              <h3 className="text-lg font-semibold">{show.name}</h3>
              <div className="flex items-center mt-2">
                <StarIcon className="h-4 w-4 text-yellow-400 mr-1" />
                <span className="text-sm">{show.vote_average.toFixed(1)}</span>
              </div>
              <p className="text-sm text-gray-500 mt-1">{new Date(show.first_air_date).getFullYear()}</p>
            </CardFooter>
          </Card>
        ))}
      </div>
      {selectedShow && (
        <VideoModal
          isOpen={!!selectedShow}
          onClose={() => setSelectedShow(null)}
          title={selectedShow.name}
          mediaType="tv"
        />
      )}
    </div>
  );
}