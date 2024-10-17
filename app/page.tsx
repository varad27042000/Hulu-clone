import Hero from '@/components/Hero';
import ContentGrid from '@/components/ContentGrid';

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Hero />
      <ContentGrid />
    </main>
  );
}