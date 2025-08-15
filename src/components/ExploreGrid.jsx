import { motion } from 'framer-motion';
import EventCard from './EventCard';
import { EVENTS } from '../data/events';

export default function ExploreGrid() {
  return (
    <section className="pb-16">
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">
        <h2 className="text-xl font-semibold mb-4">Explore</h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {EVENTS.slice(0, 6).map((e, i) => (
            <motion.div
              key={e.id}
              initial={{ y: 16, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: i * 0.03 }}
            >
              <EventCard event={e} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
