import React from 'react';
import { SITE } from '../data/siteData';
import { logo } from '../data/assets';

export const Footer: React.FC = () => {
  const letters = 'LÉ CAFÉ CRUSH'.split('');

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      style={{
        position: 'relative',
        background: 'var(--night-deep)',
        color: '#FAF8F5',
        padding: 'clamp(4rem, 8vw, 7rem) var(--container-pad) 2rem',
        borderTop: '3px solid var(--primary)',
        overflow: 'hidden',
      }}
    >
      {/* Ambient background glow */}
      <div
        style={{
          position: 'absolute',
          top: '0',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '80%',
          height: '300px',
          background: 'radial-gradient(ellipse at top, rgba(232, 64, 54, 0.15) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ maxWidth: '1440px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
        {/* Playful prompt eyebrow */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span
            style={{
              fontFamily: 'var(--font-hindi)',
              fontSize: 'clamp(1.2rem, 2.5vw, 1.8rem)',
              color: '#fbdd2f',
              display: 'inline-block',
              marginBottom: '0.5rem',
            }}
          >
            एक डेज़र्ट और?
          </span>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem', color: 'rgba(255, 250, 240, 0.6)' }}>
            ("One more dessert?" — The answer is almost always yes.)
          </p>
        </div>

        {/* Giant animated wordmark */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexWrap: 'nowrap',
            gap: 'clamp(2px, 0.8vw, 12px)',
            marginBottom: 'clamp(3rem, 6vw, 5rem)',
            userSelect: 'none',
          }}
        >
          {letters.map((char, i) => (
            <span
              key={i}
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2rem, 7vw, 6.5rem)',
                fontWeight: 900,
                color: char === ' ' ? 'transparent' : '#fffaf0',
                letterSpacing: '-0.02em',
                lineHeight: 1,
                display: 'inline-block',
                transition: 'transform 0.3s ease, color 0.3s ease',
                cursor: 'default',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-8px) scale(1.05)';
                e.currentTarget.style.color = '#e84036';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.color = '#fffaf0';
              }}
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </div>

        {/* Footer grid: 4 columns */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '3rem',
            paddingBottom: '4rem',
            borderBottom: '1px solid rgba(255, 250, 240, 0.12)',
          }}
        >
          {/* Col 1: Brand & Tagline */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <img src={logo} alt={SITE.name} style={{ width: '48px', height: '48px', objectFit: 'contain' }} />
              <div>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 800 }}>
                  Lé <span style={{ color: 'var(--primary)' }}>Café Crush</span>
                </span>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'rgba(255, 250, 240, 0.6)' }}>
                  {SITE.descriptor} · {SITE.city}
                </div>
              </div>
            </div>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.9rem',
                color: 'rgba(255, 250, 240, 0.7)',
                lineHeight: 1.6,
                marginBottom: '1rem',
              }}
            >
              "{SITE.tagline}"
            </p>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#ddb474' }}>
              Founded in {SITE.founded} · Bailey Road, Patna
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <h4
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: '#ddb474',
                marginBottom: '1.25rem',
              }}
            >
              Explore
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {[
                { label: 'The Vibe', href: '#experience' },
                { label: 'Five Steps', href: '#steps' },
                { label: 'Full Menu', href: '#menu' },
                { label: 'After Dark & Cabins', href: '#after-dark' },
                { label: 'Sinfully Indulgent', href: '#pour' },
                { label: 'Visit & Location', href: '#visit' },
              ].map((link, i) => (
                <li key={i}>
                  <a
                    href={link.href}
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.9rem',
                      color: 'rgba(255, 250, 240, 0.75)',
                      textDecoration: 'none',
                      transition: 'color 0.2s ease',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#fffaf0')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255, 250, 240, 0.75)')}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Special Experiences */}
          <div>
            <h4
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: '#ddb474',
                marginBottom: '1.25rem',
              }}
            >
              Experiences
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {[
                'Candlelight Couple Cabins',
                'Birthday Party Hall (up to 40)',
                'Fairy-light Dinner Tables',
                'Custom Cakes with Sparklers',
                'Family Feasts & Buffets',
                'Direct Home Delivery',
              ].map((item, i) => (
                <li
                  key={i}
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.9rem',
                    color: 'rgba(255, 250, 240, 0.7)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                  }}
                >
                  <span style={{ color: 'var(--primary)', fontSize: '0.7rem' }}>✦</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Hours & Compliance */}
          <div>
            <h4
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: '#ddb474',
                marginBottom: '1.25rem',
              }}
            >
              Hours & License
            </h4>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: 'rgba(255, 250, 240, 0.8)', marginBottom: '0.5rem' }}>
              <strong>Open Every Day:</strong>
              <div>10:30 AM – 11:00 PM</div>
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'rgba(255, 250, 240, 0.6)', marginBottom: '1.5rem' }}>
              Delivery cutoff: 10:30 PM
            </div>
            <div
              style={{
                padding: '0.75rem 1rem',
                border: '1px solid rgba(255, 250, 240, 0.15)',
                borderRadius: '8px',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                color: 'rgba(255, 250, 240, 0.65)',
              }}
            >
              <div style={{ color: '#ddb474', fontWeight: 600, marginBottom: '0.2rem' }}>FSSAI CERTIFIED</div>
              <div>{SITE.fssai}</div>
            </div>
          </div>
        </div>

        {/* Bottom bar: Copyright & Back to Top */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop: '2rem',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'rgba(255, 250, 240, 0.5)' }}>
            © {new Date().getFullYear()} {SITE.name}. All rights reserved. Crafted for Patna food lovers.
          </div>

          <button
            onClick={scrollToTop}
            style={{
              background: 'transparent',
              border: '1px solid rgba(255, 250, 240, 0.25)',
              color: '#fffaf0',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.8rem',
              padding: '0.5rem 1.25rem',
              borderRadius: '999px',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              transition: 'background 0.2s ease, border-color 0.2s ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(255, 250, 240, 0.1)';
              e.currentTarget.style.borderColor = '#ddb474';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.borderColor = 'rgba(255, 250, 240, 0.25)';
            }}
          >
            Back to Top ↑
          </button>
        </div>
      </div>
    </footer>
  );
};
