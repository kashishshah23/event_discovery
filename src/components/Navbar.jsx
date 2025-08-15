import ThemeToggle from './ThemeToggle';
import { Search } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white/70 dark:bg-neutral-950/50 backdrop-blur border-b border-black/5 dark:border-white/5">
      <div className="mx-auto max-w-[1600px] px-2 sm:px-4 lg:px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xl">◎</span>
          <span className="font-semibold">Event Discovery</span>
        </div>
        <div className="hidden md:flex items-center rounded-full border border-black/10 dark:border-white/10 bg-white/70 dark:bg-neutral-900/70 px-3 py-2 w-[360px]">
          <Search size={16} className="opacity-60"/>
          <input className="bg-transparent outline-none px-2 w-full text-sm" placeholder="Search events, artists, cities…" />
        </div>
        <ThemeToggle />
      </div>
    </header>
  );
}
