"use client"

import { useState, useEffect } from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlayIcon, PlusIcon, StarIcon } from 'lucide-react';
import { fetchPopularTVShows } from '@/lib/tmdb';
import VideoModal from './VideoModal';

interface TVShow {
  id: number;
  name: string;
  poster_path: string;
  vote_average: number;
  first_air_date: string;
}

export default function TVShowsGrid() {
  const [tvShows, setTVShows] = useState<TVShow[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [selectedShow, setSelectedShow] = useState<TVShow | null>(null);

  useEffect(() => {
    async function loadTVShows() {
      try {
        console.log('Starting to fetch popular TV shows...');
        const popularTVShows = await fetchPopularTVShows();
        console.log('Popular TV shows:', popularTVShows);

        if (!popularTVShows || !popularTVShows.results || !Array.isArray(popularTVShows.results)) {
          throw new Error('Invalid response format from TMDB API');
        }

        setTVShows(popularTVShows.results);
        setError(null);
      } catch (error) {
        console.error('Error fetching popular TV shows:', error);
        setError(`Failed to load TV shows. Error: ${error instanceof Error ? error.message : String(error)}`);
      } finally {
        setIsLoading(false);
      }
    }
    loadTVShows();
  }, []);

  const handlePlay = (show: TVShow) => {
    setSelectedShow(show);
  };

  if (isLoading) {
    return <div className="container mx-auto py-12">Loading...</div>;
  }

  if (error) {
    return (
      <div className="container mx-auto py-12">
        <h2 className="text-2xl font-bold text-red-500 mb-4">Error</h2>
        <p className="text-red-500">{error}</p>
        <p className="mt-4">Please check the console for more detailed error information.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto">
      <p className="text-xl mb-8">Hulu's Collection of TV Shows.</p>
      {tvShows.length === 0 ? (
        <p>No TV shows available. Please try again later.</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {tvShows.map((show) => (
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
                      <Button variant="secondary" size="icon" className="mr-2" onClick={() => handlePlay(show)}>
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
      )}
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