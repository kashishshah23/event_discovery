import { useEffect, useMemo, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import ProgressiveImage from './ProgressiveImage';

// HD Unsplash (cacheable, no timestamp)
const unsplash = (query, w = 1280, h = 800) =>
  `https://source.unsplash.com/${w}x${h}/?${encodeURIComponent(query)}`;
// Very fast preview (seeded, cacheable)
const preview = (seed, w = 640, h = 400) =>
  `https://picsum.photos/seed/${encodeURIComponent(seed)}/${w}/${h}`;

function buildSteps(title = 'Ultra Night Fest') {
  const q = {
    poster: 'neon night city gradient lights',
    lineup: 'dj stage laser show',
    vibe: 'festival crowd night edm',
    map: 'city skyline night aerial',
    cta: 'abstract gradient vaporwave',
  };
  return [
    {
      id: 'poster',
      title,
      subtitle: 'Sat • 8:00 PM • Downtown Arena',
      preview: preview('poster'),
      image: unsplash(q.poster),
      caption: 'The city’s brightest night — lasers, visuals, midnight surprises.',
      emoji: '🎉',
    },
    {
      id: 'lineup',
      title: 'Lineup',
      subtitle: 'Main + After Hours',
      preview: preview('lineup'),
      image: unsplash(q.lineup),
      caption: 'Headliners: AURA, NovaPulse, KAYO • Local stars from 11pm.',
      emoji: '🎧',
    },
    {
      id: 'vibe',
      title: 'The Vibe',
      subtitle: 'crowd • energy • moments',
      preview: preview('vibe'),
      image: unsplash(q.vibe),
      caption: 'Hands up, phones down. Lose yourself in the sound.',
      emoji: '💫',
    },
    {
      id: 'map',
      title: 'Getting There',
      subtitle: 'Arena District • Gate C',
      preview: preview('map'),
      image: unsplash(q.map),
      caption: 'Doors 7:00 PM • Security fast-lane with QR.',
      emoji: '🗺️',
    },
    {
      id: 'cta',
      title: 'Ready?',
      subtitle: 'Limited late‑entry passes',
      preview: preview('cta'),
      image: unsplash(q.cta),
      caption: 'Tap Book to reserve.',
      emoji: '🚀',
    },
  ];
}

export default function StoryModal({ open, onClose, eventTitle }) {
  const [idx, setIdx] = useState(0);
  const [steps, setSteps] = useState(() => buildSteps(eventTitle));
  const last = steps.length - 1;

  useEffect(() => {
    if (open) {
      setIdx(0);
      setSteps(buildSteps(eventTitle));
    }
  }, [open, eventTitle]);

  const step = useMemo(() => steps[idx], [steps, idx]);
  const progress = ((idx + 1) / steps.length) * 100;

  const goNext = useCallback(() => setIdx(i => Math.min(i + 1, last)), [last]);
  const goPrev = useCallback(() => setIdx(i => Math.max(i - 1, 0)), []);

  useEffect(() => {
    if (!open) return;
    const onKey = e => {
      if (e.key === 'Escape') onClose?.();
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft') goPrev();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose, goNext, goPrev]);

  // Optional gentle auto-advance
  useEffect(() => {
    if (!open) return;
    const id = setInterval(() => setIdx(i => (i < last ? i + 1 : i)), 3500);
    return () => clearInterval(id);
  }, [open, last]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-[70] bg-black/75 backdrop-blur"
          onClick={onClose}
        >
          <div className="fixed inset-0 grid place-items-center" onClick={e => e.stopPropagation()}>
            <motion.div
              initial={{ scale: 0.96, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.96, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 280, damping: 26 }}
              className="relative w-[min(96vw,1100px)] h-[min(88vh,720px)] rounded-3xl overflow-hidden border border-white/10 bg-neutral-950/60"
            >
              <button
                onClick={onClose}
                className="absolute right-3 top-3 z-20 p-2 rounded-full bg-white/10 hover:bg-white/20"
                aria-label="Close stories"
              >
                <X size={18} />
              </button>

              <div className="absolute left-0 right-0 top-0 h-1 bg-white/10">
                <div className="h-full bg-white/70" style={{ width: `${progress}%` }} />
              </div>

              <div className="absolute inset-0 grid md:grid-cols-2">
                {/* Progressive image: preview first, HD swaps in */}
                <ProgressiveImage
                  key={step.id + step.image}
                  previewSrc={step.preview}
                  fullSrc={step.image}
                  alt={step.title}
                  eager={idx === 0}
                  className="w-full h-full object-cover"
                />

                <div className="relative p-6 md:p-8 flex flex-col justify-center">
                  <div className="text-5xl mb-4">{step.emoji}</div>
                  <h3 className="text-2xl font-semibold">{step.title}</h3>
                  <p className="text-sm text-neutral-300">{step.subtitle}</p>
                  <p className="mt-4 text-neutral-200">{step.caption}</p>

                  {step.id === 'cta' && (
                    <button
                      className="self-start mt-6 rounded-full px-5 py-2 bg-white text-black text-sm font-medium hover:opacity-90"
                      onClick={() => alert('Mock booking!')}
                    >
                      Book Now
                    </button>
                  )}

                  <div className="absolute left-0 right-0 bottom-4 mx-auto flex items-center justify-between px-6 md:px-8">
                    <button onClick={goPrev} disabled={idx === 0}
                            className="inline-flex items-center gap-1 px-3 py-2 rounded-full bg-white/10 hover:bg-white/20 disabled:opacity-40">
                      <ChevronLeft size={18}/> Prev
                    </button>
                    <button onClick={goNext} disabled={idx === last}
                            className="inline-flex items-center gap-1 px-3 py-2 rounded-full bg-white/10 hover:bg-white/20 disabled:opacity-40">
                      Next <ChevronRight size={18}/>
                    </button>
                  </div>
                </div>
              </div>

              <button onClick={goPrev} className="absolute inset-y-0 left-0 w-1/4 md:w-1/5" aria-label="Prev" />
              <button onClick={goNext} className="absolute inset-y-0 right-0 w-1/4 md:w-1/5" aria-label="Next" />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
