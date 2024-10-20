"use client"

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MoonIcon, SunIcon, SearchIcon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/navigation';

export default function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { setTheme, theme } = useTheme();
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="hidden font-bold sm:inline-block">Hulu Clone</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link href="/movies">Movies</Link>
            <Link href="/tv-shows">TV Shows</Link>
            <Link href="/my-stuff">My Stuff</Link>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <form onSubmit={handleSearch} className={`flex items-center ${isSearchOpen ? 'w-full' : ''}`}>
            {isSearchOpen && (
              <Input
                type="search"
                placeholder="Search..."
                className="h-9 w-full md:w-[300px] lg:w-[400px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            )}
            <Button
              type={isSearchOpen ? "submit" : "button"}
              variant="ghost"
              size="icon"
              className="ml-2"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <SearchIcon className="h-5 w-5" />
            </Button>
          </form>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          >
            {theme === "light" ? (
              <MoonIcon className="h-5 w-5" />
            ) : (
              <SunIcon className="h-5 w-5" />
            )}
          </Button>
          <Link href="/sign-in">
            <Button>Sign In</Button>
          </Link>
        </div>
      </div>
    </header>
  );
}