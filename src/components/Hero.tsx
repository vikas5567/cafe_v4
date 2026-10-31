import React, { useEffect, useState } from 'react';
import { heroBg } from '../data/assets';
import { SITE } from '../data/siteData';

export const Hero: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        minHeight: '100vh',
        width: '100%',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#121010',
        paddingTop: 'calc(var(--nav-height) + 1.5rem)',
        paddingBottom: '3.5rem',
      }}
    >
      {/* Background Graphic Image with Ambient Blend */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url(${heroBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center right',
          backgroundRepeat: 'no-repeat',
          transform: isLoaded ? 'scale(1.02)' : 'scale(1.08)',
          transition: 'transform 1.6s var(--ease-out)',
        }}
      />

      {/* Atmospheric Overlays: Deep Charcoal Tint & Left Radiant Gradient for High Contrast */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `
            linear-gradient(90deg, 
              rgba(18, 16, 16, 0.94) 0%, 
              rgba(18, 16, 16, 0.88) 38%, 
              rgba(18, 16, 16, 0.52) 65%, 
              rgba(18, 16, 16, 0.25) 100%
            ),
            linear-gradient(180deg, 
              rgba(18, 16, 16, 0.75) 0%, 
              rgba(18, 16, 16, 0.2) 40%, 
              rgba(18, 16, 16, 0.85) 100%
            )
          `,
          zIndex: 1,
        }}
      />

      {/* Subtle Warm Amber Glow Ambient Accent */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          left: '10%',
          width: '420px',
          height: '420px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(232, 64, 54, 0.15) 0%, rgba(236, 127, 53, 0.05) 50%, transparent 70%)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      {/* Hero Content Container */}
      <div
        className="container"
        style={{
          position: 'relative',
          zIndex: 2,
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.25fr) minmax(0, 0.75fr)',
          alignItems: 'center',
          gap: '2.5rem',
        }}
      >
        {/* Left Editorial Copy */}
        <div style={{ maxWidth: '640px' }}>
          {/* Main Title Heading */}
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 900,
              fontSize: 'clamp(2.5rem, 5.8vw, 4.75rem)',
              lineHeight: 1.05,
              color: '#fffaf0',
              letterSpacing: '-0.03em',
              marginBottom: '1.25rem',
              textShadow: '0 4px 24px rgba(0,0,0,0.6)',
            }}
          >
            Smoky Sizzlers, <br />
            <span
              style={{
                fontStyle: 'italic',
                fontWeight: 400,
                color: 'var(--yellow)',
                fontFamily: 'var(--font-display)',
              }}
            >
              Unforgettable
            </span>{' '}
            Crush.
          </h1>

          {/* Subtitle / Narrative */}
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(1rem, 1.35vw, 1.18rem)',
              lineHeight: 1.6,
              color: 'rgba(255, 250, 240, 0.82)',
              maxWidth: '540px',
              marginBottom: '2rem',
              textShadow: '0 2px 8px rgba(0,0,0,0.5)',
            }}
          >
            Patna’s premier destination for live tandoor sizzlers, woodfire delights, 
            and candlelit memories across 8 distinct cuisines. Taste the passion in every bite.
          </p>

          {/* Call to Actions */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '1rem',
              alignItems: 'center',
              marginBottom: '2.75rem',
            }}
          >
            <a
              href="#/menu"
              className="btn btn--primary"
              style={{
                padding: '0.95rem 2rem',
                fontSize: '0.875rem',
                letterSpacing: '0.08em',
                boxShadow: '0 8px 24px rgba(217, 58, 31, 0.35)',
              }}
            >
              Explore Full Menu ➔
            </a>
            <a
              href="#visit"
              className="btn"
              style={{
                padding: '0.95rem 1.85rem',
                fontSize: '0.875rem',
                color: '#fffaf0',
                backgroundColor: 'rgba(255, 250, 240, 0.08)',
                border: '1px solid rgba(255, 250, 240, 0.25)',
                backdropFilter: 'blur(8px)',
              }}
            >
              Book A Table
            </a>
          </div>

          {/* Fast Stats Row */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, auto)',
              gap: 'clamp(1.25rem, 3vw, 2.5rem)',
              borderTop: '1px solid rgba(255, 250, 240, 0.14)',
              paddingTop: '1.75rem',
              maxWidth: '520px',
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.5rem, 2.5vw, 2rem)',
                  fontWeight: 700,
                  color: 'var(--yellow)',
                  lineHeight: 1,
                }}
              >
                {SITE.stats.kitchens}
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.6875rem',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'rgba(255, 250, 240, 0.55)',
                  marginTop: '0.35rem',
                }}
              >
                CUISINES
              </div>
            </div>

            <div>
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.5rem, 2.5vw, 2rem)',
                  fontWeight: 700,
                  color: '#fffaf0',
                  lineHeight: 1,
                }}
              >
                {SITE.stats.happyGuests}
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.6875rem',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'rgba(255, 250, 240, 0.55)',
                  marginTop: '0.35rem',
                }}
              >
                HAPPY GUESTS
              </div>
            </div>

            <div>
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.5rem, 2.5vw, 2rem)',
                  fontWeight: 700,
                  color: 'var(--primary)',
                  lineHeight: 1,
                }}
              >
                {SITE.stats.deliveryTime}
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.6875rem',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'rgba(255, 250, 240, 0.55)',
                  marginTop: '0.35rem',
                }}
              >
                MINS DELIVERY
              </div>
            </div>
          </div>
        </div>

       
      </div>

     

      <style>{`
        @keyframes heroRotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes heroScrollPulse {
          0% { top: -100%; }
          50% { top: 100%; }
          100% { top: 100%; }
        }
        .hero-call-link:hover {
          color: var(--yellow) !important;
        }
        @media (max-width: 960px) {
          #hero .container {
            grid-template-columns: 1fr !important;
            padding-top: 1rem;
          }
          .hero-badge-container {
            align-items: flex-start !important;
            margin-top: 1rem;
          }
        }
      `}</style>
    </section>
  );
};
export default Hero;
