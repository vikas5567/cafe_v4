import React, { useRef, useEffect, useCallback } from 'react';
import { SITE } from '../data/siteData';

const EXPERIENCE_CARDS = [
  {
    title: 'Candlelight Cabins',
    tag: 'Couple Cabins · Private',
    badge: 'Romantic Dining',
    capacity: '2 Guests',
    description: 'Secluded curtained booths lit by warm candle glow and fairy lights. Includes complimentary welcome mocktails and customized music.',
    actionLabel: 'Reserve Cabin ↗',
    actionHref: `https://wa.me/${SITE.whatsapp.replace(/[^0-9]/g, '')}?text=Hi%20L%C3%A9%20Caf%C3%A9%20Crush,%20I%20would%20like%20to%20reserve%20a%20Candlelight%20Cabin.`,
    accent: '#e84036',
    features: ['Private Secluded Booth', 'Candle & Rose Decor', 'Curated 4-Course Menu', 'Custom Music'],
  },
  {
    title: 'Birthday Arch & Sparkler Booths',
    tag: 'Celebration Booth · Themed',
    badge: 'Most Popular',
    capacity: '6 – 25 Guests',
    description: 'Celebrate birthdays and anniversaries with illuminated balloon arches, custom sparkler cakes, and lively party lighting.',
    actionLabel: 'Plan Birthday ↗',
    actionHref: `https://wa.me/${SITE.whatsapp.replace(/[^0-9]/g, '')}?text=Hi%20L%C3%A9%20Caf%C3%A9%20Crush,%20I%20want%20to%20plan%20a%20Birthday%20Celebration.`,
    accent: '#fbdd2f',
    features: ['Illuminated Balloon Arch', 'Cold Sparklers on Cake', 'Party Photo-Op Wall', 'Reserved Group Seating'],
  },
  {
    title: 'Family & Friends Grand Hall',
    tag: 'Private Hall · Events',
    badge: 'Large Groups',
    capacity: 'Up to 40 Guests',
    description: 'Full-service themed lounge for reunion dinners, family get-togethers, and farewell feasts with multi-cuisine buffet platters.',
    actionLabel: 'Book Themed Hall ↗',
    actionHref: `tel:${SITE.phone}`,
    accent: '#9fc54d',
    features: ['Spacious Lounge Area', 'Multi-Cuisine Buffet', 'High-Fidelity Sound', 'Dedicated Hospitality Team'],
  },
];

export const AfterDark: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Fairy-light bokeh canvas
  const drawBokeh = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth * window.devicePixelRatio;
    canvas.height = canvas.offsetHeight * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    const w = canvas.offsetWidth;
    const h = canvas.offsetHeight;
    const particleCount = window.innerWidth < 900 ? 60 : 120;

    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: 1.5 + Math.random() * 3.5,
      speed: 0.15 + Math.random() * 0.4,
      color: ['#fbdd2f', '#ec7f35', '#e84036', '#ffffff'][Math.floor(Math.random() * 4)],
      opacity: 0.15 + Math.random() * 0.6,
      phase: Math.random() * Math.PI * 2,
    }));

    let animId: number;
    const animate = () => {
      ctx.clearRect(0, 0, w, h);
      const time = Date.now() * 0.0015;

      particles.forEach(p => {
        p.y -= p.speed;
        if (p.y < -10) {
          p.y = h + 10;
          p.x = Math.random() * w;
        }

        const flicker = 0.6 + 0.4 * Math.sin(time * 2 + p.phase);
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 2.5);
        grad.addColorStop(0, p.color);
        grad.addColorStop(1, 'transparent');

        ctx.fillStyle = grad;
        ctx.globalAlpha = p.opacity * flicker * 0.4;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 2.5, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.globalAlpha = 1;
      animId = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animId);
  }, []);

  useEffect(() => {
    const cleanup = drawBokeh();
    const handleResize = () => drawBokeh();
    window.addEventListener('resize', handleResize);
    return () => {
      if (cleanup) cleanup();
      window.removeEventListener('resize', handleResize);
    };
  }, [drawBokeh]);

  return (
    <section
      id="after-dark"
      style={{
        position: 'relative',
        backgroundColor: 'var(--night-deep)',
        color: '#FAF8F5',
        overflow: 'hidden',
        padding: 'clamp(5rem, 9vw, 8rem) var(--container-pad)',
        borderTop: '2px solid rgba(232, 64, 54, 0.4)',
        borderBottom: '2px solid rgba(232, 64, 54, 0.4)',
      }}
    >
      {/* Interactive fairy light canvas */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      {/* Warm ambient vignette */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '70%',
          height: '400px',
          background: 'radial-gradient(ellipse at center, rgba(236, 127, 53, 0.12) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      <div style={{ maxWidth: '1440px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: 'clamp(3rem, 6vw, 4.5rem)' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.6rem',
              padding: '0.45rem 1.25rem',
              borderRadius: '999px',
              border: '1px solid rgba(251, 221, 47, 0.35)',
              background: 'rgba(251, 221, 47, 0.08)',
              marginBottom: '1.25rem',
            }}
          >
            <span
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: '#fbdd2f',
                boxShadow: '0 0 10px #fbdd2f',
              }}
            />
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8rem',
                fontWeight: 700,
                color: '#fbdd2f',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
              }}
            >
              LOUNGE OPEN TILL 11:00 PM TONIGHT
            </span>
          </div>

          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.5rem, 6vw, 5rem)',
              fontWeight: 800,
              lineHeight: 1.05,
              color: '#FAF8F5',
              letterSpacing: '-0.02em',
            }}
          >
            Lights down. <em style={{ fontStyle: 'italic', color: '#fbdd2f' }}>Moods</em> up.
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(1rem, 1.8vw, 1.25rem)',
              color: 'rgba(250, 248, 245, 0.75)',
              maxWidth: '650px',
              margin: '1rem auto 0',
              lineHeight: 1.6,
            }}
          >
            When twilight settles over Bailey Road, Lé Café Crush transforms. Candle flames flicker, private cabins welcome quiet whispers, and sparkler-topped birthday cakes illuminate the room.
          </p>
        </div>

        {/* 3 Experience Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2rem',
            marginBottom: '4rem',
          }}
        >
          {EXPERIENCE_CARDS.map((card, i) => (
            <div
              key={i}
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(250, 248, 245, 0.12)',
                borderRadius: '20px',
                padding: '2.25rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                position: 'relative',
                overflow: 'hidden',
                backdropFilter: 'blur(8px)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.borderColor = card.accent;
                e.currentTarget.style.boxShadow = `0 20px 40px rgba(0,0,0,0.6), 0 0 25px ${card.accent}33`;
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'rgba(250, 248, 245, 0.12)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
              }}
            >
              {/* Card Header */}
              <div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '1.25rem',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: card.accent,
                      padding: '4px 10px',
                      borderRadius: '999px',
                      background: `${card.accent}18`,
                      border: `1px solid ${card.accent}44`,
                    }}
                  >
                    {card.badge}
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.75rem',
                      color: 'rgba(250, 248, 245, 0.5)',
                    }}
                  >
                    {card.capacity}
                  </span>
                </div>

                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem',
                    color: 'rgba(250, 248, 245, 0.4)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    marginBottom: '0.25rem',
                  }}
                >
                  {card.tag}
                </div>

                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.75rem',
                    fontWeight: 700,
                    color: '#FAF8F5',
                    lineHeight: 1.2,
                    marginBottom: '1rem',
                  }}
                >
                  {card.title}
                </h3>

                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.95rem',
                    color: 'rgba(250, 248, 245, 0.75)',
                    lineHeight: 1.6,
                    marginBottom: '1.75rem',
                  }}
                >
                  {card.description}
                </p>

                {/* Features checklist */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '2rem' }}>
                  {card.features.map((feat, fIdx) => (
                    <div
                      key={fIdx}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.85rem',
                        color: 'rgba(250, 248, 245, 0.85)',
                      }}
                    >
                      <span style={{ color: card.accent, fontSize: '0.8rem' }}>✦</span>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <a
                href={card.actionHref}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  width: '100%',
                  padding: '0.85rem 1.5rem',
                  borderRadius: '12px',
                  background: card.accent,
                  color: card.accent === '#fbdd2f' ? '#121010' : '#ffffff',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  textDecoration: 'none',
                  letterSpacing: '0.04em',
                  transition: 'opacity 0.2s ease, transform 0.2s ease',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
                }}
                onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-2px)')}
                onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}
              >
                {card.actionLabel}
              </a>
            </div>
          ))}
        </div>

        {/* Ambient Night Perks Strip */}
        <div
          style={{
            background: 'rgba(255, 255, 255, 0.02)',
            border: '1px solid rgba(250, 248, 245, 0.1)',
            borderRadius: '16px',
            padding: '1.5rem 2rem',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-around',
            gap: '1.5rem',
            textAlign: 'center',
          }}
        >
          {[
            { icon: '🕯️', title: 'Curtained Privacy', desc: 'No walk-in interruptions' },
            { icon: '✨', title: 'Fairy Light Ambiance', desc: 'Warm 2700K atmospheric lighting' },
            { icon: '🎂', title: 'Sparkler Surprises', desc: 'Complimentary on birthday cakes' },
            { icon: '🎵', title: 'Acoustic Playlist', desc: 'Soulful jazz & indie lounge' },
          ].map((item, idx) => (
            <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <span style={{ fontSize: '1.5rem' }}>{item.icon}</span>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.95rem', fontWeight: 700, color: '#FAF8F5' }}>
                  {item.title}
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'rgba(250, 248, 245, 0.5)' }}>
                  {item.desc}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
