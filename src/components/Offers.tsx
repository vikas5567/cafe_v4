import React, { useState } from 'react';
import { OFFERS } from '../data/siteData';

export const Offers: React.FC = () => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  return (
    <section
      id="offers"
      style={{
        background: 'var(--bg-alt)',
        padding: 'clamp(4rem, 8vw, 6rem) var(--container-pad)',
        borderTop: 'var(--border)',
        borderBottom: 'var(--border)',
        position: 'relative',
      }}
    >
      <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 'clamp(2.5rem, 5vw, 4rem)' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.8rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'var(--cta)',
              marginBottom: '0.75rem',
            }}
          >
            <span>SPECIAL PROMOTIONS</span>
            <span>✦</span>
            <span>PATNA EXCLUSIVE</span>
          </div>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              fontWeight: 800,
              color: 'var(--ink)',
              letterSpacing: '-0.02em',
            }}
          >
            Festive offers for <span style={{ fontStyle: 'italic', color: 'var(--primary)' }}>celebrations.</span>
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(0.95rem, 1.6vw, 1.15rem)',
              color: 'var(--ink-light)',
              maxWidth: '550px',
              margin: '0.75rem auto 0',
            }}
          >
            Use these codes during online order checkout or mention them to your captain when dining in.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem',
          }}
        >
          {OFFERS.map((offer, i) => (
            <div
              key={i}
              style={{
                background: '#ffffff',
                border: 'var(--border)',
                borderRadius: '16px',
                padding: '1.5rem',
                boxShadow: 'var(--shadow-hard)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translate(-3px, -3px)';
                e.currentTarget.style.boxShadow = 'var(--shadow-hard-lg)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translate(0, 0)';
                e.currentTarget.style.boxShadow = 'var(--shadow-hard)';
              }}
            >
              <div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '1rem',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      padding: '4px 10px',
                      borderRadius: '999px',
                      background: offer.type === 'dine-in' ? 'rgba(236, 127, 53, 0.15)' : 'rgba(159, 197, 77, 0.2)',
                      color: offer.type === 'dine-in' ? 'var(--orange)' : 'var(--green-text)',
                      border: `1px solid ${offer.type === 'dine-in' ? 'var(--orange)' : 'var(--green-text)'}`,
                    }}
                  >
                    {offer.type === 'dine-in' ? 'Dine-in Only' : 'Home Delivery'}
                  </span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--ink-light)' }}>
                    Active Today
                  </span>
                </div>

                <div
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.25rem',
                    fontWeight: 700,
                    color: 'var(--ink)',
                    lineHeight: 1.3,
                    marginBottom: '1.25rem',
                  }}
                >
                  {offer.label}
                </div>
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.75rem 1rem',
                  background: 'var(--bg-alt)',
                  borderRadius: '10px',
                  border: '1.5px dashed var(--ink)',
                }}
              >
                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--ink-light)', textTransform: 'uppercase' }}>
                    Coupon Code
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '1.1rem',
                      fontWeight: 800,
                      letterSpacing: '0.05em',
                      color: 'var(--primary)',
                    }}
                  >
                    {offer.code}
                  </div>
                </div>

                <button
                  onClick={() => copyCode(offer.code)}
                  style={{
                    background: copiedCode === offer.code ? 'var(--green-text)' : 'var(--ink)',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '0.4rem 0.85rem',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'background 0.2s ease',
                  }}
                >
                  {copiedCode === offer.code ? '✓ Copied' : 'Copy'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
