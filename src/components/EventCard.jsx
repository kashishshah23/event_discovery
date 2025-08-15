export default function EventCard({ event }) {
  const src = event.image || 'https://picsum.photos/600/400?random=1';
  return (
    <article className="card overflow-hidden">
      <div className="relative aspect-[16/10] rounded-xl overflow-hidden">
        <img
          src={src}
          onError={(e)=>{e.currentTarget.src='https://picsum.photos/600/400?blur=2'}}
          alt={event.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <span className="absolute left-3 top-3 text-xs px-2 py-1 rounded-full bg-black/60 text-white">
          {event.category}
        </span>
      </div>
      <div className="mt-3">
        <h3 className="font-semibold leading-tight">{event.title}</h3>
        <p className="text-sm text-neutral-500 dark:text-neutral-400">{event.date} • {event.location}</p>
      </div>
    </article>
  );
}
