import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Hero() {
  return (
    <div className="relative h-[60vh] w-full overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url("https://source.unsplash.com/random/1920x1080?movie")',
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60" />
      </div>
      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white">
        <h1 className="mb-4 text-5xl font-bold">Welcome to Hulu Clone</h1>
        <p className="mb-8 text-xl">Watch thousands of TV shows and movies.</p>
        <Link href="/free-trial">
          <Button size="lg">Start Your Free Trial</Button>
        </Link>
      </div>
    </div>
  );
}