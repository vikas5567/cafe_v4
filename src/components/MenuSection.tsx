import React, { useState } from 'react';
import { MENU } from '../data/siteData';
import { useCart } from '../context/CartContext';

// 4 Two-Page Spreads
const SPREADS = [
  {
    spreadTitle: 'Tandoori & Indian Veg',
    spreadTag: 'Clay Oven & Royal Gravies',
    leftCatId: 'tandoori',
    rightCatId: 'indian-veg',
  },
  {
    spreadTitle: 'Non-Veg Gravies & Biryanis',
    spreadTag: 'Slow Cooked & Saffron Infused',
    leftCatId: 'indian-nv',
    rightCatId: 'rice',
  },
  {
    spreadTitle: 'Chinese & Continental',
    spreadTag: 'Wok Specialties & Creamy Pastas',
    leftCatId: 'chinese',
    rightCatId: 'continental',
  },
  {
    spreadTitle: 'Beverages & Desserts',
    spreadTag: 'Chilled Refreshers & Sweet Indulgences',
    leftCatId: 'mocktails',
    rightCatId: 'desserts',
  },
];

export const MenuSection: React.FC = () => {
  const [currentSpread, setCurrentSpread] = useState(0);
  const [targetSpread, setTargetSpread] = useState<number | null>(null);
  const [flipDirection, setFlipDirection] = useState<'next' | 'prev'>('next');
  const [isFlipping, setIsFlipping] = useState(false);
  const { cart, addToCart, removeFromCart } = useCart();

  const activeSpreadIdx = targetSpread !== null ? targetSpread : currentSpread;
  const currentSpreadData = SPREADS[currentSpread];
  const targetSpreadData = targetSpread !== null ? SPREADS[targetSpread] : currentSpreadData;

  const changeSpread = (newIndex: number, direction: 'next' | 'prev') => {
    if (newIndex < 0 || newIndex >= SPREADS.length || isFlipping || newIndex === currentSpread) return;
    setFlipDirection(direction);
    setTargetSpread(newIndex);
    setIsFlipping(true);

    setTimeout(() => {
      setCurrentSpread(newIndex);
      setTargetSpread(null);
      setIsFlipping(false);
    }, 580);
  };

  const handleAdd = (item: { id: string; name: string; price: number; veg: boolean }) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      priceDisplay: String(item.price),
      veg: item.veg,
    });
  };

  const handleDecrement = (id: string) => {
    removeFromCart(id);
  };

  // Helper to render one page content
  const renderPageContent = (catId: string, pageNum: number, side: 'left' | 'right') => {
    const category = MENU.find(c => c.id === catId) || MENU[0];
    return (
      <div
        style={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 'clamp(1rem, 2vw, 1.75rem)',
          backgroundColor: '#FAF6ED',
          background: side === 'left'
            ? 'radial-gradient(circle at 10% 20%, #ffffff 0%, #FAF6ED 100%)'
            : 'radial-gradient(circle at 90% 20%, #ffffff 0%, #FAF6ED 100%)',
          position: 'relative',
        }}
      >
        {/* Inner vintage border */}
        <div
          style={{
            border: '1px solid rgba(212, 163, 89, 0.45)',
            padding: 'clamp(0.85rem, 1.6vw, 1.25rem)',
            borderRadius: '6px',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div>
            {/* Header */}
            <div
              style={{
                textAlign: 'center',
                marginBottom: '1.25rem',
                paddingBottom: '0.6rem',
                borderBottom: '1px dashed rgba(212, 163, 89, 0.6)',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.65rem',
                  color: '#8a2f33',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                }}
              >
                SECTION {String(pageNum).padStart(2, '0')}
              </div>
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.4rem, 2vw, 1.75rem)',
                  fontWeight: 700,
                  color: '#2b1a1c',
                  marginTop: '0.15rem',
                  lineHeight: 1.15,
                }}
              >
                {category.name}
              </h3>
              <div
                style={{
                  fontFamily: 'var(--font-hindi)',
                  fontSize: '1rem',
                  color: 'var(--cta)',
                  marginTop: '0.1rem',
                }}
              >
                {category.hi}
              </div>
            </div>

            {/* Menu Items with Dotted Leaders */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {category.items.map(item => {
                const cartItem = cart[item.id];
                const qty = cartItem ? cartItem.quantity : 0;
                return (
                  <div key={item.id} style={{ display: 'flex', flexDirection: 'column' }}>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'baseline',
                        justifyContent: 'space-between',
                        gap: '0.4rem',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', whiteSpace: 'nowrap' }}>
                        <span className={item.veg ? 'veg-dot' : 'nonveg-dot'} style={{ flexShrink: 0 }} />
                        <span
                          style={{
                            fontFamily: 'var(--font-display)',
                            fontSize: '1rem',
                            fontWeight: 600,
                            color: '#2b1a1c',
                          }}
                        >
                          {item.name}
                        </span>
                      </div>

                      {/* Authentic Dotted Leader Line */}
                      <div
                        style={{
                          flex: 1,
                          borderBottom: '1.5px dotted rgba(60, 40, 40, 0.35)',
                          margin: '0 0.4rem',
                          height: '1px',
                        }}
                      />

                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', whiteSpace: 'nowrap' }}>
                        <span
                          style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.95rem',
                            fontWeight: 700,
                            color: '#8a2f33',
                          }}
                        >
                          ₹{item.price}
                        </span>

                        {/* Stepper with - and + and count in the middle */}
                        {qty === 0 ? (
                          <button
                            onClick={() => handleAdd(item)}
                            style={{
                              background: 'transparent',
                              border: '1px solid #8a2f33',
                              color: '#8a2f33',
                              borderRadius: '4px',
                              padding: '2px 7px',
                              fontFamily: 'var(--font-mono)',
                              fontSize: '0.7rem',
                              fontWeight: 700,
                              cursor: 'pointer',
                              transition: 'all 0.15s ease',
                            }}
                            onMouseEnter={e => {
                              e.currentTarget.style.background = '#8a2f33';
                              e.currentTarget.style.color = '#FAF6ED';
                            }}
                            onMouseLeave={e => {
                              e.currentTarget.style.background = 'transparent';
                              e.currentTarget.style.color = '#8a2f33';
                            }}
                          >
                            +
                          </button>
                        ) : (
                          <div
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              background: '#8a2f33',
                              borderRadius: '4px',
                              padding: '1px 3px',
                              gap: '2px',
                            }}
                          >
                            <button
                              onClick={() => handleDecrement(item.id)}
                              style={{
                                background: 'transparent',
                                border: 'none',
                                color: '#FAF6ED',
                                fontSize: '0.8rem',
                                fontWeight: 700,
                                width: '18px',
                                height: '18px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                padding: 0,
                                lineHeight: 1,
                              }}
                              title="Decrease"
                            >
                              −
                            </button>
                            <span
                              style={{
                                fontFamily: 'var(--font-mono)',
                                fontSize: '0.75rem',
                                fontWeight: 700,
                                color: '#FAF6ED',
                                minWidth: '16px',
                                textAlign: 'center',
                                userSelect: 'none',
                              }}
                            >
                              {qty}
                            </span>
                            <button
                              onClick={() => handleAdd(item)}
                              style={{
                                background: 'transparent',
                                border: 'none',
                                color: '#FAF6ED',
                                fontSize: '0.8rem',
                                fontWeight: 700,
                                width: '18px',
                                height: '18px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                padding: 0,
                                lineHeight: 1,
                              }}
                              title="Increase"
                            >
                              +
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                    {item.description && (
                      <div
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: '0.75rem',
                          color: 'rgba(43, 26, 28, 0.65)',
                          marginTop: '0.15rem',
                          paddingLeft: '1rem',
                          fontStyle: 'italic',
                        }}
                      >
                        {item.description}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Page Footer */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingTop: '0.85rem',
              borderTop: '1px solid rgba(212, 163, 89, 0.3)',
              marginTop: '1.25rem',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.7rem',
              color: 'rgba(43, 26, 28, 0.5)',
            }}
          >
            <span>{side === 'left' ? '~ Lé Café Crush ~' : `Page 0${pageNum}`}</span>
            <span>{side === 'left' ? `Page 0${pageNum}` : '~ Bailey Road, Patna ~'}</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section
      id="menu"
      style={{
        backgroundColor: 'var(--bg-alt)',
        padding: 'clamp(3rem, 6vw, 5rem) var(--container-pad)',
        borderTop: '1px solid var(--ink-faint)',
        borderBottom: '1px solid var(--ink-faint)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Reduced maxWidth so book comfortably fits screen without extra scroll */}
      <div style={{ maxWidth: '1060px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 'clamp(1.75rem, 3.5vw, 2.5rem)' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'var(--cta)',
              marginBottom: '0.5rem',
            }}
          >
            <span>✦</span>
            <span>DINING COMPENDIUM</span>
          </div>

          <h2
            className="section-heading"
            style={{
              fontSize: 'clamp(2.2rem, 4.5vw, 3.4rem)',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              color: 'var(--ink)',
            }}
          >
            The Café Crush <em style={{ fontStyle: 'italic', color: 'var(--primary)' }}>Menu Book.</em>
          </h2>

          <div style={{ marginTop: '1rem' }}>
            <a
              href="#/menu"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.65rem 1.4rem',
                borderRadius: '999px',
                backgroundColor: 'var(--cta)',
                color: '#FFFFFF',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8125rem',
                fontWeight: 700,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                boxShadow: '0 4px 14px rgba(217, 58, 31, 0.35)',
                transition: 'all 0.2s ease',
              }}
            >
              <span>📖 Open Full 2026 Menu (All 15+ Categories) ➔</span>
            </a>
          </div>
        </div>

        {/* Ribbon Bookmark Navigation Tabs */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 'clamp(0.4rem, 1.2vw, 0.75rem)',
            marginBottom: '1.25rem',
            flexWrap: 'wrap',
          }}
        >
          {SPREADS.map((s, idx) => {
            const isActive = activeSpreadIdx === idx;
            return (
              <button
                key={idx}
                onClick={() => changeSpread(idx, idx > currentSpread ? 'next' : 'prev')}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  padding: '0.5rem 1rem',
                  borderRadius: '6px 6px 0 0',
                  border: isActive ? '2px solid #8a2f33' : '1px solid rgba(138, 47, 51, 0.25)',
                  borderBottom: isActive ? '3px solid #e84036' : '1px solid rgba(138, 47, 51, 0.25)',
                  backgroundColor: isActive ? '#FAF6ED' : '#f0e6da',
                  color: isActive ? '#8a2f33' : 'var(--ink-light)',
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.85rem',
                  fontWeight: isActive ? 700 : 500,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: isActive ? '0 -4px 12px rgba(138, 47, 51, 0.12)' : 'none',
                }}
              >
                <span>{s.spreadTitle}</span>
              </button>
            );
          })}
        </div>

        {/* ✦ 3D RESTAURANT MENU BOOK CONTAINER ✦ */}
        <div
          style={{
            position: 'relative',
            background: '#2b1a1c', // Rich leatherette binder cover
            borderRadius: '20px',
            padding: 'clamp(0.75rem, 1.8vw, 1.4rem)',
            boxShadow: '0 20px 50px -12px rgba(43, 26, 28, 0.45), 0 10px 24px rgba(0,0,0,0.25)',
            border: '2px solid #3d2427',
            perspective: '2200px', // 3D perspective
          }}
        >
          {/* Gold embossed corner accents on the leather binder */}
          <div style={{ position: 'absolute', top: '10px', left: '12px', color: '#d4a359', fontSize: '0.85rem', opacity: 0.6 }}>✦</div>
          <div style={{ position: 'absolute', top: '10px', right: '12px', color: '#d4a359', fontSize: '0.85rem', opacity: 0.6 }}>✦</div>
          <div style={{ position: 'absolute', bottom: '10px', left: '12px', color: '#d4a359', fontSize: '0.85rem', opacity: 0.6 }}>✦</div>
          <div style={{ position: 'absolute', bottom: '10px', right: '12px', color: '#d4a359', fontSize: '0.85rem', opacity: 0.6 }}>✦</div>

          {/* Book Header / Crest */}
          <div
            style={{
              textAlign: 'center',
              marginBottom: '0.75rem',
              color: '#d4a359',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.7rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.75rem',
            }}
          >
            <span>════════</span>
            <span>LÉ CAFÉ CRUSH · GRAND CARTE</span>
            <span>════════</span>
          </div>

          {/* TWO-PAGE OPEN SPREAD STAGE */}
          <div
            style={{
              position: 'relative',
              borderRadius: '12px',
              overflow: 'hidden',
              boxShadow: 'inset 0 0 35px rgba(180, 150, 110, 0.25)',
              transformStyle: 'preserve-3d',
              height: '470px',
              minHeight: '470px',
              maxHeight: '470px',
            }}
          >
            {/* BASE SPREAD (Underneath) */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                width: '100%',
                height: '100%',
              }}
            >
              {/* Left Page (Base) */}
              <div style={{ borderRight: '1px solid rgba(138, 47, 51, 0.15)', height: '100%' }}>
                {renderPageContent(
                  isFlipping && flipDirection === 'prev'
                    ? targetSpreadData.leftCatId
                    : currentSpreadData.leftCatId,
                  (isFlipping && flipDirection === 'prev' ? targetSpread! : currentSpread) * 2 + 1,
                  'left'
                )}
              </div>

              {/* Right Page (Base) */}
              <div style={{ height: '100%' }}>
                {renderPageContent(
                  isFlipping && flipDirection === 'next'
                    ? targetSpreadData.rightCatId
                    : currentSpreadData.rightCatId,
                  (isFlipping && flipDirection === 'next' ? targetSpread! : currentSpread) * 2 + 2,
                  'right'
                )}
              </div>
            </div>

            {/* Center Spine 3D Crease */}
            <div
              className="book-spine"
              style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: '50%',
                width: '36px',
                transform: 'translateX(-50%)',
                background: 'linear-gradient(to right, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.03) 35%, rgba(255,255,255,0.4) 50%, rgba(0,0,0,0.03) 65%, rgba(0,0,0,0.15) 100%)',
                pointerEvents: 'none',
                zIndex: 20,
              }}
            />

            {/* ✦ 3D FLIPPING PAGE LEAF ✦ */}
            {isFlipping && (
              <div
                className={`page-flip-leaf ${flipDirection === 'next' ? 'flip-next-leaf' : 'flip-prev-leaf'}`}
                style={{
                  position: 'absolute',
                  top: 0,
                  bottom: 0,
                  width: '50%',
                  left: flipDirection === 'next' ? '50%' : '0%',
                  transformOrigin: flipDirection === 'next' ? 'left center' : 'right center',
                  zIndex: 30,
                  transformStyle: 'preserve-3d',
                  pointerEvents: 'none',
                }}
              >
                {/* Front of the flipping page leaf */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                    overflow: 'hidden',
                    boxShadow: flipDirection === 'next'
                      ? '-15px 0 30px rgba(0,0,0,0.35)'
                      : '15px 0 30px rgba(0,0,0,0.35)',
                  }}
                >
                  {renderPageContent(
                    flipDirection === 'next' ? currentSpreadData.rightCatId : currentSpreadData.leftCatId,
                    flipDirection === 'next' ? currentSpread * 2 + 2 : currentSpread * 2 + 1,
                    flipDirection === 'next' ? 'right' : 'left'
                  )}
                  {/* Dynamic flip shadow overlay */}
                  <div className="flip-shadow-overlay" />
                </div>

                {/* Back of the flipping page leaf */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)',
                    overflow: 'hidden',
                    boxShadow: flipDirection === 'next'
                      ? '15px 0 30px rgba(0,0,0,0.35)'
                      : '-15px 0 30px rgba(0,0,0,0.35)',
                  }}
                >
                  {renderPageContent(
                    flipDirection === 'next' ? targetSpreadData.leftCatId : targetSpreadData.rightCatId,
                    flipDirection === 'next' ? targetSpread! * 2 + 1 : targetSpread! * 2 + 2,
                    flipDirection === 'next' ? 'left' : 'right'
                  )}
                  {/* Dynamic flip shadow overlay */}
                  <div className="flip-shadow-overlay-back" />
                </div>
              </div>
            )}
          </div>

          {/* PAGE FLIP CONTROLS BAR */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: '1.25rem',
              padding: '0 0.5rem',
              flexWrap: 'wrap',
              gap: '0.75rem',
            }}
          >
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                changeSpread(currentSpread - 1, 'prev');
              }}
              disabled={currentSpread === 0 || isFlipping}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: currentSpread === 0 ? 'rgba(255,255,255,0.06)' : '#d4a359',
                color: currentSpread === 0 ? 'rgba(255,255,255,0.25)' : '#2b1a1c',
                border: 'none',
                borderRadius: '6px',
                padding: '0.55rem 1.1rem',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                fontWeight: 700,
                cursor: currentSpread === 0 || isFlipping ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: currentSpread === 0 ? 'none' : '0 3px 10px rgba(0,0,0,0.3)',
              }}
            >
              <span>◄ Previous Page</span>
            </button>

            {/* Current Spread Progress Indicator */}
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                color: '#d4a359',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}
            >
              <span>Spread {activeSpreadIdx + 1} of {SPREADS.length}</span>
              <span style={{ opacity: 0.5 }}>·</span>
              <span>Pages 0{activeSpreadIdx * 2 + 1}–0{activeSpreadIdx * 2 + 2}</span>
            </div>

            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                changeSpread(currentSpread + 1, 'next');
              }}
              disabled={currentSpread === SPREADS.length - 1 || isFlipping}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: currentSpread === SPREADS.length - 1 ? 'rgba(255,255,255,0.06)' : '#d4a359',
                color: currentSpread === SPREADS.length - 1 ? 'rgba(255,255,255,0.25)' : '#2b1a1c',
                border: 'none',
                borderRadius: '6px',
                padding: '0.55rem 1.1rem',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                fontWeight: 700,
                cursor: currentSpread === SPREADS.length - 1 || isFlipping ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: currentSpread === SPREADS.length - 1 ? 'none' : '0 3px 10px rgba(0,0,0,0.3)',
              }}
            >
              <span>Next Page ►</span>
            </button>
          </div>
        </div>
      </div>

      {/* Realistic 3D Page Turning CSS Animations */}
      <style>{`
        @keyframes pageTurnNext {
          0% {
            transform: rotateY(0deg);
          }
          50% {
            transform: rotateY(-90deg) scale(0.96);
          }
          100% {
            transform: rotateY(-180deg);
          }
        }

        @keyframes pageTurnPrev {
          0% {
            transform: rotateY(0deg);
          }
          50% {
            transform: rotateY(90deg) scale(0.96);
          }
          100% {
            transform: rotateY(180deg);
          }
        }

        @keyframes shadowNext {
          0% { opacity: 0; }
          50% { opacity: 0.45; }
          100% { opacity: 0; }
        }

        .flip-next-leaf {
          animation: pageTurnNext 0.58s cubic-bezier(0.645, 0.045, 0.355, 1) forwards;
        }

        .flip-prev-leaf {
          animation: pageTurnPrev 0.58s cubic-bezier(0.645, 0.045, 0.355, 1) forwards;
        }

        .flip-shadow-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to right, rgba(0,0,0,0.3) 0%, transparent 60%);
          pointer-events: none;
          animation: shadowNext 0.58s ease-in-out forwards;
        }

        .flip-shadow-overlay-back {
          position: absolute;
          inset: 0;
          background: linear-gradient(to left, rgba(0,0,0,0.3) 0%, transparent 60%);
          pointer-events: none;
          animation: shadowNext 0.58s ease-in-out forwards;
        }

        @media (max-width: 768px) {
          .book-spine {
            display: none !important;
          }
          .page-flip-leaf {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
};
