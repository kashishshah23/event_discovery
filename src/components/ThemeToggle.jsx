import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
  const [dark, setDark] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved ? saved === 'dark' : window.matchMedia?.('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    const root = document.documentElement; // <html>
    if (dark) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [dark]);

  return (
    <button
      onClick={() => setDark(d => !d)}
      className="inline-flex items-center gap-2 rounded-full border border-black/10 dark:border-white/10 px-4 py-2 text-sm
                 bg-white/70 dark:bg-neutral-900/70 backdrop-blur hover:bg-white/90 dark:hover:bg-neutral-800/90 transition"
      aria-label="Toggle theme"
      title={dark ? 'Dark mode' : 'Light mode'}
    >
      {dark ? <Moon size={16}/> : <Sun size={16}/>}
      <span className="hidden sm:inline">{dark ? 'Dark mode' : 'Light mode'}</span>
    </button>
  );
}
