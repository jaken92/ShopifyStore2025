import {useEffect, useRef, useState} from 'react';

export function ParallaxSection({
  image,
  height = '60vh',
  speed = 0.3,
  children,
}) {
  const sectionRef = useRef(null);
  const [translateY, setTranslateY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Only update transform if section is visible
      if (rect.bottom > 0 && rect.top < windowHeight) {
        const offset = -rect.top * speed;
        setTranslateY(offset);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // initialize position

    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return (
    <div
      ref={sectionRef}
      style={{
        position: 'relative',
        height,
        overflow: 'hidden',
      }}
    >
      <img
        src={image}
        alt=""
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '120%',
          objectFit: 'cover',
          transform: `translateY(${translateY}px)`,
        }}
      />

      <div
        style={{
          position: 'relative',
          zIndex: 2,
          height: '100%',
          width: '100%',
        }}
      >
        {children}
      </div>
    </div>
  );
}
