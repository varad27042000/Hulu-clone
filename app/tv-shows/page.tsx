import TVShowsGrid from '@/components/TVShowsGrid';

export default function TVShowsPage() {
  return (
    <div className="container mx-auto py-12">
      <h1 className="text-4xl font-bold mb-8">TV Shows</h1>
      <TVShowsGrid />
    </div>
  );
}