import React, { useState } from 'react';
import { MENU } from '../data/siteData';

const KITCHEN_CATEGORIES = MENU.map((cat, i) => ({
  num: String(i + 1).padStart(2, '0'),
  name: cat.name,
  hi: cat.hi,
  count: cat.items.length,
}));

export const Kitchen: React.FC = () => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section id="kitchen" className="section-pad" style={{ backgroundColor: 'var(--bg)' }}>
      <div className="container">
        <span className="eyebrow" style={{ display: 'block', marginBottom: '1.5rem' }}>
          03 — In the Kitchen
        </span>
        <h2 className="section-heading" style={{ marginBottom: 'var(--space-3xl)', maxWidth: '500px' }}>
          Eight cuisines. <em>One</em> destination.
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: 0,
          border: 'var(--border)',
        }}>
          {KITCHEN_CATEGORIES.map((cat, i) => (
            <div
              key={cat.name}
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
              style={{
                padding: 'var(--space-lg) var(--space-xl)',
                borderBottom: i < KITCHEN_CATEGORIES.length - 1 ? '1px solid var(--ink-faint)' : 'none',
                borderRight: '1px solid var(--ink-faint)',
                cursor: 'default',
                position: 'relative',
                overflow: 'hidden',
                transition: 'background-color 0.3s ease',
                backgroundColor: hoveredIdx === i ? 'var(--bg-alt)' : 'transparent',
              }}
            >
              {/* Giant number background */}
              <span style={{
                position: 'absolute',
                right: '1rem',
                top: '50%',
                transform: 'translateY(-50%)',
                fontFamily: 'var(--font-display)',
                fontWeight: 900,
                fontSize: '5rem',
                color: 'var(--ink)',
                opacity: hoveredIdx === i ? 0.06 : 0.025,
                lineHeight: 1,
                transition: 'opacity 0.3s ease',
                userSelect: 'none',
              }}>
                {cat.num}
              </span>

              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.6875rem',
                color: 'var(--ink-light)',
                letterSpacing: '0.1em',
                display: 'block',
                marginBottom: '0.5rem',
              }}>
                {cat.num}
              </span>

              <h3 style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: '1.5rem',
                color: 'var(--ink)',
                marginBottom: '0.25rem',
                position: 'relative',
                zIndex: 1,
              }}>
                {hoveredIdx === i ? cat.hi : cat.name}
              </h3>

              <span style={{
                fontFamily: hoveredIdx === i ? 'var(--font-body)' : 'var(--font-hindi)',
                fontSize: '0.875rem',
                color: 'var(--ink-light)',
                position: 'relative',
                zIndex: 1,
              }}>
                {hoveredIdx === i ? cat.name : cat.hi}
              </span>

              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.6875rem',
                color: 'var(--ink-light)',
                display: 'block',
                marginTop: '0.75rem',
                position: 'relative',
                zIndex: 1,
              }}>
                {cat.count} dishes
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
