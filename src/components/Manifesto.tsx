import React, { useRef, useEffect, useState } from 'react';

const MANIFESTO_TEXT = `Lé Café Crush isn't just a café. It's the place where birthday cakes arrive with sparklers, where first dates turn into anniversaries, where grandparents taste something new and nod slowly — impressed. We built it because Patna deserved a spot where the food is serious, the halls are dressed for the occasion, and the fairy lights never come down. Eight cuisines under one roof. The tandoor glows beside the wok. The dessert counter never sleeps. Come for the paneer tikka. Stay for the memory.`;

export const Manifesto: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [revealProgress, setRevealProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const start = window.innerHeight * 0.85;
      const end = -rect.height * 0.25;
      const p = Math.max(0, Math.min(1, (start - rect.top) / (start - end)));
      setRevealProgress(p);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const words = MANIFESTO_TEXT.split(' ');
  const totalWords = words.length;

  return (
    <section
      id="experience"
      className="section-pad"
      style={{
        position: 'relative',
        backgroundColor: '#FFFDF9',
        color: '#222020',
        overflow: 'hidden',
        borderTop: '2px solid rgba(212, 163, 89, 0.35)',
        borderBottom: '2px solid rgba(212, 163, 89, 0.35)',
      }}
    >
      {/* Light Warm Logo Sunburst Aura Backdrop */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: 'min(920px, 90vw)',
          height: '420px',
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(ellipse at center, rgba(232, 64, 54, 0.07) 0%, rgba(245, 200, 41, 0.08) 45%, rgba(159, 197, 77, 0.04) 70%, transparent 85%)',
          filter: 'blur(50px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Decorative Gold Star Medallion */}
      <div
        style={{
          position: 'absolute',
          top: '1.75rem',
          right: 'clamp(1rem, 4vw, 3rem)',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.85rem',
          letterSpacing: '0.25em',
          color: '#d4a359',
          display: 'flex',
          alignItems: 'center',
          gap: '0.35rem',
        }}
      >
        <span>★</span>
        <span>★</span>
        <span>★</span>
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Eyebrow Pill Strip with Logo Gold & Leaf Green */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2.5rem' }}>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.45rem 1.15rem',
              borderRadius: '999px',
              backgroundColor: '#FFF6E9',
              border: '1.5px solid #d4a359',
              color: '#d93a1f',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              fontWeight: 700,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              boxShadow: '0 2px 8px rgba(212, 163, 89, 0.18)',
            }}
          >
            <span style={{ color: '#4f7a18' }}>✦</span>
            <span>The Vibe</span>
          </span>
          <div
            style={{
              height: '2px',
              flex: 1,
              maxWidth: '120px',
              background: 'linear-gradient(90deg, #d4a359, transparent)',
            }}
          />
        </div>

        {/* Illuminated Text Container */}
        <div
          ref={containerRef}
          style={{
            maxWidth: '920px',
            margin: '0 auto',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.5rem, 3.2vw, 2.25rem)',
              lineHeight: 1.55,
              fontWeight: 400,
              letterSpacing: '-0.01em',
            }}
          >
            {words.map((word, i) => {
              const wordProgress = i / totalWords;
              const isRevealed = revealProgress > wordProgress;
              const isEmphasis =
                word.includes('serious') ||
                word.includes('memory') ||
                word.includes('sparklers') ||
                word.includes('tandoor');

              let wordColor = 'rgba(34, 32, 32, 0.18)';
              if (isRevealed) {
                wordColor = isEmphasis ? '#d93a1f' : '#222020';
              }

              return (
                <span
                  key={i}
                  style={{
                    color: wordColor,
                    transition: 'color 0.28s ease',
                    fontStyle: isEmphasis ? 'italic' : 'normal',
                    fontWeight: isEmphasis ? 600 : 400,
                  }}
                >
                  {word}{' '}
                </span>
              );
            })}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Manifesto;
