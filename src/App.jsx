import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ExploreGrid from './components/ExploreGrid';

export default function App() {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-50">
      <Navbar />
      <main>
        <Hero />
        <ExploreGrid />
      </main>
    </div>
  );
}
