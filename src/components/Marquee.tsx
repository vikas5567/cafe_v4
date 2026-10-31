import React, { useRef, useEffect, useState } from 'react';
import { MARQUEE_WORDS } from '../data/siteData';

export const Marquee: React.FC = () => {
  const [velocity, setVelocity] = useState(0);
  const lastScroll = useRef(0);

  useEffect(() => {
    let raf: number;
    const onScroll = () => {
      const current = window.scrollY;
      const v = Math.abs(current - lastScroll.current);
      lastScroll.current = current;
      setVelocity(v);
    };
    const decay = () => {
      setVelocity(prev => prev * 0.92);
      raf = requestAnimationFrame(decay);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    raf = requestAnimationFrame(decay);
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const skew = Math.min(velocity * 0.15, 6);
  const speedFactor = 1 + velocity * 0.02;
  const row1 = [...MARQUEE_WORDS, ...MARQUEE_WORDS, ...MARQUEE_WORDS];
  const row2 = [...MARQUEE_WORDS.slice().reverse(), ...MARQUEE_WORDS.slice().reverse(), ...MARQUEE_WORDS.slice().reverse()];

  return (
    <section style={{
      padding: 'var(--space-lg) 0',
      overflow: 'hidden',
      borderTop: 'var(--border)',
      borderBottom: 'var(--border)',
      backgroundColor: 'var(--bg-alt)',
    }}>
      {[row1, row2].map((words, rowIdx) => (
        <div
          key={rowIdx}
          style={{
            display: 'flex',
            whiteSpace: 'nowrap',
            transform: `skewX(${rowIdx === 0 ? -skew : skew}deg)`,
            transition: 'transform 0.1s linear',
            marginBottom: rowIdx === 0 ? '0.75rem' : 0,
          }}
        >
          <div
            style={{
              display: 'flex',
              gap: '2rem',
              animation: `marqueeScroll${rowIdx} ${40 / speedFactor}s linear infinite`,
              willChange: 'transform',
            }}
          >
            {words.map((word, i) => (
              <span
                key={`${rowIdx}-${i}`}
                style={{
                  fontFamily: word.match(/[\u0900-\u097F]/) ? 'var(--font-hindi)' : 'var(--font-display)',
                  fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
                  fontWeight: 700,
                  textTransform: word.match(/[\u0900-\u097F]/) ? 'none' : 'uppercase',
                  color: 'var(--ink)',
                  letterSpacing: '-0.01em',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '2rem',
                }}
              >
                {word}
                <span style={{
                  color: 'var(--primary)',
                  fontSize: '0.75em',
                }}>✦</span>
              </span>
            ))}
          </div>
        </div>
      ))}

      <style>{`
        @keyframes marqueeScroll0 {
          from { transform: translateX(0); }
          to { transform: translateX(-33.33%); }
        }
        @keyframes marqueeScroll1 {
          from { transform: translateX(-33.33%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </section>
  );
};
