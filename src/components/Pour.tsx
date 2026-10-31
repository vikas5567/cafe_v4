import React, { useState } from 'react';
import { DISH_IMAGES } from '../data/assets';
import { SITE } from '../data/siteData';

const DESSERT_ITEMS = [
  {
    id: 'sizzling-brownie',
    name: 'Sizzling Brownie with Ice Cream',
    category: 'Desserts · Sizzler',
    price: '₹249',
    img: DISH_IMAGES['chocolate-brownie'],
    tag: 'Table-side Pour',
    badge: 'Patna #1 Favorite',
    description: 'Fresh oven-baked walnut brownie on a smoking cast-iron plate, topped with rich vanilla bean gelato and drenched in molten chocolate fudge.',
  },
  {
    id: 'berry-crush',
    name: 'House Berry Crush Mocktail',
    category: 'Mocktails · Chilled',
    price: '₹179',
    img: DISH_IMAGES['berry-mocktail'],
    tag: 'Signature Drink',
    badge: 'Chilled Refreshment',
    description: 'Layers of hand-crushed seasonal berries, garden mint leaves, lime zest, and sparkling soda served ice-cold in a frosted glass.',
  },
  {
    id: 'white-sauce-pasta',
    name: 'Creamy White Sauce Penne',
    category: 'Continental · Comfort',
    price: '₹279',
    img: DISH_IMAGES['white-sauce-pasta'],
    tag: 'Chef Choice',
    badge: 'Rich & Creamy',
    description: 'Penne tossed in slow-simmered garlic cream, melted cheddar, and aromatic oregano, accompanied by two crisp garlic baguettes.',
  },
  {
    id: 'butter-chicken-gravy',
    name: 'Makhani Handi Gravy',
    category: 'Indian Non-Veg · Royal',
    price: '₹349',
    img: DISH_IMAGES['butter-chicken'],
    tag: 'Clay Pot Special',
    badge: 'Rich Cashew Gravy',
    description: 'Tender tandoori chicken simmered in velvet tomato-butter sauce, finished with crushed kasuri methi and fresh malai swirl.',
  },
];

export const Pour: React.FC = () => {
  const [activeItem, setActiveItem] = useState(0);

  return (
    <section
      id="pour"
      style={{
        position: 'relative',
        backgroundColor: 'var(--night-deep)',
        color: '#FAF8F5',
        overflow: 'hidden',
        padding: 'clamp(5rem, 8vw, 7.5rem) var(--container-pad)',
        borderBottom: '2px solid rgba(232, 64, 54, 0.4)',
      }}
    >
      {/* Background chocolate fudge ambient glow */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `
            radial-gradient(circle at 20% 30%, rgba(212, 163, 89, 0.12) 0%, transparent 60%),
            radial-gradient(circle at 80% 70%, rgba(232, 64, 54, 0.1) 0%, transparent 50%)
          `,
          pointerEvents: 'none',
        }}
      />

      <div style={{ maxWidth: '1440px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
        {/* Eyebrow */}
        <div style={{ textAlign: 'center', marginBottom: 'clamp(2.5rem, 5vw, 4rem)' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.4rem 1.25rem',
              border: '1px solid rgba(212, 163, 89, 0.4)',
              borderRadius: '999px',
              background: 'rgba(212, 163, 89, 0.08)',
              marginBottom: '1rem',
            }}
          >
            <span style={{ color: '#d4a359' }}>✦</span>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8rem',
                fontWeight: 700,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: '#d4a359',
              }}
            >
              SINFULLY INDULGENT
            </span>
            <span style={{ color: '#d4a359' }}>✦</span>
          </div>

          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.4rem, 5.5vw, 4.5rem)',
              fontWeight: 800,
              lineHeight: 1.1,
              color: '#FAF8F5',
              letterSpacing: '-0.02em',
            }}
          >
            The last brownie is always <em style={{ fontStyle: 'italic', color: '#d4a359' }}>a negotiation.</em>
          </h2>

          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(1rem, 1.7vw, 1.2rem)',
              color: 'rgba(250, 248, 245, 0.75)',
              maxWidth: '620px',
              margin: '1rem auto 0',
              lineHeight: 1.6,
            }}
          >
            Hot molten chocolate cascading over oven-fresh warmth, chilled scoops of artisan vanilla, and late-night cravings that turn a quick meal into a memorable feast.
          </p>
        </div>

        {/* 2-Column Showcase: Featured Dish Spotlight + 4 Dish Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2.5rem',
            alignItems: 'center',
            marginBottom: '3.5rem',
          }}
        >
          {/* Left Column: Big Interactive Spotlight */}
          <div
            style={{
              position: 'relative',
              borderRadius: '24px',
              overflow: 'hidden',
              border: '1px solid rgba(212, 163, 89, 0.3)',
              background: 'rgba(255, 255, 255, 0.03)',
              boxShadow: '0 24px 48px rgba(0,0,0,0.5)',
            }}
          >
            <div style={{ position: 'relative', height: '360px', overflow: 'hidden' }}>
              <img
                src={DESSERT_ITEMS[activeItem].img}
                alt={DESSERT_ITEMS[activeItem].name}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.6s ease',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(18, 16, 16, 0.9) 0%, transparent 60%)',
                }}
              />

              <div
                style={{
                  position: 'absolute',
                  top: '16px',
                  left: '16px',
                  background: 'rgba(18, 16, 16, 0.85)',
                  backdropFilter: 'blur(8px)',
                  color: '#fbdd2f',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  padding: '5px 12px',
                  borderRadius: '999px',
                  border: '1px solid rgba(251, 221, 47, 0.3)',
                }}
              >
                {DESSERT_ITEMS[activeItem].badge}
              </div>

              <div
                style={{
                  position: 'absolute',
                  bottom: '20px',
                  left: '20px',
                  right: '20px',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem',
                    color: '#d4a359',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                  }}
                >
                  {DESSERT_ITEMS[activeItem].category}
                </span>
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.75rem',
                    fontWeight: 700,
                    color: '#FAF8F5',
                    marginTop: '0.25rem',
                  }}
                >
                  {DESSERT_ITEMS[activeItem].name}
                </h3>
              </div>
            </div>

            <div style={{ padding: '1.75rem' }}>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.95rem',
                  color: 'rgba(250, 248, 245, 0.8)',
                  lineHeight: 1.6,
                  marginBottom: '1.5rem',
                }}
              >
                {DESSERT_ITEMS[activeItem].description}
              </p>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingTop: '1rem',
                  borderTop: '1px solid rgba(250, 248, 245, 0.1)',
                }}
              >
                <div>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'rgba(250, 248, 245, 0.5)' }}>
                    PRICE
                  </span>
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '1.5rem',
                      fontWeight: 800,
                      color: '#fbdd2f',
                    }}
                  >
                    {DESSERT_ITEMS[activeItem].price}
                  </div>
                </div>

                <a
                  href={`https://wa.me/${SITE.whatsapp.replace(/[^0-9]/g, '')}?text=Hi%20L%C3%A9%20Caf%C3%A9%20Crush,%20I%20want%20to%20order%20${encodeURIComponent(DESSERT_ITEMS[activeItem].name)}.`}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    background: 'var(--primary)',
                    color: '#fff',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '12px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                  }}
                >
                  <span>Order Now</span>
                  <span>→</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: 4 Selectable Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {DESSERT_ITEMS.map((item, idx) => {
              const isSelected = activeItem === idx;
              return (
                <div
                  key={item.id}
                  onClick={() => setActiveItem(idx)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1.25rem',
                    padding: '1.25rem 1.5rem',
                    borderRadius: '16px',
                    background: isSelected ? 'rgba(212, 163, 89, 0.12)' : 'rgba(255, 255, 255, 0.02)',
                    border: isSelected ? '1.5px solid #d4a359' : '1px solid rgba(250, 248, 245, 0.08)',
                    cursor: 'pointer',
                    transition: 'all 0.25s ease',
                  }}
                  onMouseEnter={e => {
                    if (!isSelected) {
                      e.currentTarget.style.borderColor = 'rgba(212, 163, 89, 0.4)';
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                    }
                  }}
                  onMouseLeave={e => {
                    if (!isSelected) {
                      e.currentTarget.style.borderColor = 'rgba(250, 248, 245, 0.08)';
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)';
                    }
                  }}
                >
                  <img
                    src={item.img}
                    alt={item.name}
                    style={{
                      width: '72px',
                      height: '72px',
                      borderRadius: '12px',
                      objectFit: 'cover',
                      border: '1px solid rgba(250, 248, 245, 0.15)',
                    }}
                  />

                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.7rem',
                        color: isSelected ? '#fbdd2f' : 'rgba(250, 248, 245, 0.5)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em',
                        marginBottom: '0.2rem',
                      }}
                    >
                      {item.tag}
                    </div>
                    <h4
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '1.15rem',
                        fontWeight: 700,
                        color: '#FAF8F5',
                        lineHeight: 1.2,
                      }}
                    >
                      {item.name}
                    </h4>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <div
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '1.1rem',
                        fontWeight: 700,
                        color: isSelected ? '#fbdd2f' : '#FAF8F5',
                      }}
                    >
                      {item.price}
                    </div>
                    <span
                      style={{
                        fontSize: '0.75rem',
                        fontFamily: 'var(--font-mono)',
                        color: isSelected ? '#d4a359' : 'rgba(250,248,245,0.4)',
                      }}
                    >
                      {isSelected ? '● Selected' : 'View →'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Indulgence Promise Strip */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '2.5rem',
            padding: '1.5rem',
            borderTop: '1px solid rgba(250, 248, 245, 0.1)',
            textAlign: 'center',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'rgba(250, 248, 245, 0.7)' }}>
            <span style={{ color: '#fbdd2f' }}>✦</span> Oven-baked fresh every 45 mins
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'rgba(250, 248, 245, 0.7)' }}>
            <span style={{ color: '#fbdd2f' }}>✦</span> Sizzling cast-iron table-side pour
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'rgba(250, 248, 245, 0.7)' }}>
            <span style={{ color: '#fbdd2f' }}>✦</span> Handcrafted artisan ice creams
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'rgba(250, 248, 245, 0.7)' }}>
            <span style={{ color: '#fbdd2f' }}>✦</span> Late night delivery till 10:30 PM
          </div>
        </div>
      </div>
    </section>
  );
};
