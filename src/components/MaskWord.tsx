import React, { useRef, useEffect, useState } from 'react';

export const MaskWord: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const start = window.innerHeight;
      const end = -rect.height;
      const p = Math.max(0, Math.min(1, (start - rect.top) / (start - end)));
      setProgress(p);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scale = 1 + progress * 2;
  const letters = 'CRUSH'.split('');

  return (
    <section
      ref={sectionRef}
      style={{
        height: '60vh',
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: 'var(--bg)',
        borderTop: '1px solid var(--ink-faint)',
        borderBottom: '1px solid var(--ink-faint)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Gradient background simulating warm ambient glow */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: `radial-gradient(ellipse at center, rgba(232,64,54,0.06) 0%, transparent 70%)`,
        transform: `scale(${scale})`,
        transition: 'transform 0.1s linear',
      }} />

      {/* Fairy light bokeh dots */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: `${(i * 37 + 13) % 100}%`,
              top: `${(i * 53 + 7) % 100}%`,
              width: `${3 + (i % 4) * 2}px`,
              height: `${3 + (i % 4) * 2}px`,
              borderRadius: '50%',
              backgroundColor: i % 3 === 0 ? 'var(--yellow)' : i % 3 === 1 ? 'var(--orange)' : 'var(--primary)',
              opacity: 0.15 + Math.sin(i) * 0.1,
              animation: `bokehFloat ${4 + i % 3}s ease-in-out ${i * 0.2}s infinite alternate`,
            }}
          />
        ))}
      </div>

      {/* CRUSH text */}
      <div style={{
        position: 'relative',
        zIndex: 2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }}>
        <div style={{ display: 'flex', gap: 'clamp(0.25rem, 1vw, 0.75rem)' }}>
          {letters.map((letter, i) => (
            <span
              key={i}
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 900,
                fontSize: 'clamp(5rem, 15vw, 12rem)',
                lineHeight: 0.9,
                color: 'transparent',
                WebkitTextStroke: '2px rgba(34,32,32,0.18)',
                textTransform: 'uppercase',
                transform: `translateY(${Math.max(0, (1 - progress * 3 + i * 0.15)) * 60}px)`,
                opacity: Math.min(1, progress * 4 - i * 0.2),
                transition: 'transform 0.1s linear, opacity 0.1s linear',
                userSelect: 'none',
              }}
            >
              {letter}
            </span>
          ))}
        </div>

        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'clamp(0.875rem, 1.5vw, 1.125rem)',
          color: 'var(--ink-light)',
          marginTop: '1.5rem',
          textAlign: 'center',
          maxWidth: '380px',
          opacity: Math.min(1, progress * 2),
        }}>
          Candles lit before you sit. <em style={{ fontFamily: 'var(--font-display)', color: 'var(--cta)', fontStyle: 'italic' }}>Always.</em>
        </p>
      </div>

      <style>{`
        @keyframes bokehFloat {
          from { transform: translateY(0) scale(1); }
          to { transform: translateY(-10px) scale(1.3); }
        }
      `}</style>
    </section>
  );
};
