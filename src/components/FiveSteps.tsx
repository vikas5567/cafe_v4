import React from 'react';
import { FIVE_STEPS } from '../data/siteData';

export const FiveSteps: React.FC = () => {
  // Logo palette derived step accents: Warm Crimson, Tangerine Amber, Mustard Yellow, Leaf Green, Coffee Bean
  const stepAccents = ['#e84036', '#ec7f35', '#d4a359', '#4f7a18', '#8a2f33'];

  return (
    <section
      id="steps"
      style={{
        backgroundColor: '#FBF8F3',
        color: '#222020',
        padding: 'clamp(4.5rem, 8vw, 7.5rem) var(--container-pad)',
        borderTop: '2px solid rgba(212, 163, 89, 0.35)',
        borderBottom: '2px solid rgba(212, 163, 89, 0.35)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Ambient Logo Sunburst Glow Behind Cards */}
      <div
        style={{
          position: 'absolute',
          top: '30%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 'min(1100px, 95vw)',
          height: '500px',
          background: 'radial-gradient(ellipse at center, rgba(232, 64, 54, 0.05) 0%, rgba(245, 200, 41, 0.06) 45%, rgba(159, 197, 77, 0.04) 75%, transparent 88%)',
          filter: 'blur(70px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <div style={{ maxWidth: '1440px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: 'clamp(2.5rem, 5vw, 4rem)' }}>
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
              marginBottom: '1.25rem',
              boxShadow: '0 2px 8px rgba(212, 163, 89, 0.18)',
            }}
          >
            <span style={{ color: '#4f7a18' }}>✦</span>
            <span>FIVE STEPS · ONE MEMORY</span>
          </span>

          <h2
            className="section-heading"
            style={{
              maxWidth: '820px',
              margin: '0 auto',
              fontSize: 'clamp(2.2rem, 5vw, 3.8rem)',
              lineHeight: 1.12,
              color: '#222020',
            }}
          >
            A night out you will <em style={{ color: '#d93a1f', fontStyle: 'italic' }}>never</em> forget. We make sure of it.
          </h2>
        </div>

        {/* 5-Step Cards Grid with Interactive Hover Animation */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '1.5rem',
          }}
        >
          {FIVE_STEPS.map((step, i) => {
            const accent = stepAccents[i];

            return (
              <div
                key={step.num}
                className="step-card"
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '1.5px solid rgba(212, 163, 89, 0.3)',
                  borderRadius: '16px',
                  padding: '2.4rem 1.6rem',
                  position: 'relative',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                  minHeight: '275px',
                  boxShadow: '0 4px 14px rgba(34, 32, 32, 0.04)',
                  transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                  cursor: 'default',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.borderColor = accent;
                  e.currentTarget.style.boxShadow = `4px 4px 0px #222020, 0 14px 28px ${accent}25`;
                  const watermark = e.currentTarget.querySelector<HTMLElement>('.step-watermark');
                  if (watermark) {
                    watermark.style.opacity = '0.24';
                    watermark.style.transform = 'scale(1.08)';
                  }
                  const tag = e.currentTarget.querySelector<HTMLElement>('.step-tag');
                  if (tag) {
                    tag.style.transform = 'translateX(4px)';
                  }
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = 'rgba(212, 163, 89, 0.3)';
                  e.currentTarget.style.boxShadow = '0 4px 14px rgba(34, 32, 32, 0.04)';
                  const watermark = e.currentTarget.querySelector<HTMLElement>('.step-watermark');
                  if (watermark) {
                    watermark.style.opacity = '0.08';
                    watermark.style.transform = 'scale(1)';
                  }
                  const tag = e.currentTarget.querySelector<HTMLElement>('.step-tag');
                  if (tag) {
                    tag.style.transform = 'translateX(0)';
                  }
                }}
              >
                {/* Giant watermark step number */}
                <span
                  className="step-watermark"
                  style={{
                    position: 'absolute',
                    top: '0.75rem',
                    right: '1.25rem',
                    fontFamily: 'var(--font-display)',
                    fontWeight: 900,
                    fontSize: '4.75rem',
                    color: accent,
                    opacity: 0.08,
                    lineHeight: 0.8,
                    userSelect: 'none',
                    pointerEvents: 'none',
                    transition: 'all 0.35s ease',
                  }}
                >
                  {step.num}
                </span>

                <div>
                  <div
                    className="step-tag"
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.75rem',
                      letterSpacing: '0.15em',
                      textTransform: 'uppercase',
                      color: accent,
                      fontWeight: 700,
                      marginBottom: '0.75rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      transition: 'transform 0.3s ease',
                    }}
                  >
                    <span>STEP {step.num}</span>
                    <span style={{ fontSize: '0.65rem', color: '#4f7a18' }}>✦</span>
                  </div>

                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontWeight: 700,
                      fontSize: '1.75rem',
                      lineHeight: 1.2,
                      color: '#222020',
                      marginBottom: '0.25rem',
                    }}
                  >
                    {step.en}
                  </h3>

                  <span
                    style={{
                      fontFamily: 'var(--font-hindi)',
                      fontSize: '1.25rem',
                      color: '#d93a1f',
                      display: 'block',
                      marginBottom: '1rem',
                      fontWeight: 600,
                    }}
                  >
                    {step.hi}
                  </span>

                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.95rem',
                      lineHeight: 1.6,
                      color: 'rgba(34, 32, 32, 0.72)',
                    }}
                  >
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FiveSteps;
