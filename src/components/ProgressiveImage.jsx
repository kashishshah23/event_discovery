import { useEffect, useState } from 'react';

export default function ProgressiveImage({
  previewSrc,    // fast, low-cost (e.g., picsum)
  fullSrc,       // HD (e.g., unsplash)
  alt = '',
  className = '',
  eager = false,
}) {
  const [src, setSrc] = useState(previewSrc);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setSrc(previewSrc);
    setIsLoaded(false);

    const img = new Image();
    img.src = fullSrc;
    img.decoding = 'async';
    img.loading = eager ? 'eager' : 'lazy';
    img.onload = () => {
      setSrc(fullSrc);
      setIsLoaded(true);
    };
  }, [previewSrc, fullSrc, eager]);

  return (
    <img
      src={src}
      alt={alt}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      className={`${className} ${isLoaded ? 'opacity-100' : 'opacity-90'} transition-opacity duration-300`}
    />
  );
}
