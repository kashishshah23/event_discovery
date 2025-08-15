import { motion } from 'framer-motion';
import { useState } from 'react';
import StoryModal from './StoryModal';

export default function Hero() {
  const [open, setOpen] = useState(false);

  return (
    <section className="relative">
      <div className="mx-auto max-w-[1600px] px-2 sm:px-4 lg:px-6">
        <div className="grid md:grid-cols-[1.1fr,1fr] gap-8 items-center">
          {/* Left copy */}
          <div>
            <motion.p
              initial={{ y: 12, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="text-sm md:text-base text-neutral-500 dark:text-neutral-400 mb-2"
            >
              <span className="mr-2">✨</span> curated • trending • nearby
            </motion.p>

            <motion.h1
              initial={{ y: 16, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.05, duration: 0.6 }}
              className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight"
            >
              Find your next <span className="bg-gradient-to-r from-fuchsia-500 via-violet-500 to-indigo-500
               bg-clip-text text-transparent">event</span>.
            </motion.h1>

            <motion.div
              initial={{ y: 18, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.12, duration: 0.6 }}
              className="mt-6"
            >
              <button
                onClick={() => setOpen(true)}
                className="rounded-full border border-black/10 dark:border-white/10 bg-white/70 dark:bg-neutral-900/70
                           px-5 py-2 text-sm font-medium hover:bg-white/90 dark:hover:bg-neutral-800/90 backdrop-blur"
              >
                Watch Stories
              </button>
            </motion.div>
          </div>

          {/* Right visual card */}
          <motion.div
            initial={{ scale: 0.96, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="rounded-3xl overflow-hidden shadow-lg border border-black/5 dark:border-white/10"
          >
            <div className="aspect-[16/11] relative">
              <img
                src="/assets/hero.jpg"
                onError={(e)=>{e.currentTarget.src='https://picsum.photos/1200/800?blur=2'}}
                alt="Hero visual"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-black/10 to-transparent dark:from-black/30"/>
            </div>
          </motion.div>
        </div>
      </div>

      <StoryModal open={open} onClose={() => setOpen(false)} />
    </section>
  );
}
