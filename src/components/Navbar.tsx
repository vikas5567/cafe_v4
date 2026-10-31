import React, { useState, useEffect, useCallback } from 'react';
import { SITE, getCafeStatus } from '../data/siteData';
import { logo } from '../data/assets';
import { useCart } from '../context/CartContext';

const NAV_LINKS = [
  { label: 'Experience', href: '#experience' },
  { label: 'Full Menu', href: '#/menu' },
  { label: 'Cabins & Events', href: '#after-dark' },
  { label: 'Offers', href: '#offers' },
  { label: 'Visit', href: '#visit' },
];

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [status, setStatus] = useState(getCafeStatus());
  const { totalCount, totalPrice, setIsCartOpen } = useCart();

  // Update open/closed status every minute
  useEffect(() => {
    const interval = setInterval(() => setStatus(getCafeStatus()), 60000);
    return () => clearInterval(interval);
  }, []);

  // Update background styling on scroll, header stays permanently visible
  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 40);
  }, []);

  useEffect(() => {
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <>
      <nav
        className="navbar"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          height: 'var(--nav-height)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 var(--container-pad)',
          backgroundColor: scrolled ? 'rgba(250, 248, 245, 0.95)' : 'rgba(18, 16, 16, 0.75)',
          backdropFilter: 'blur(12px)',
          borderBottom: scrolled ? '1px solid var(--ink-faint)' : '1px solid rgba(255, 250, 240, 0.12)',
          transition: 'background-color 0.3s ease, border-color 0.3s ease',
        }}
      >
        {/* Logo + wordmark */}
        <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', textDecoration: 'none' }}>
          <img src={logo} alt={SITE.name} style={{ height: '42px', width: 'auto' }} />
          <span style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.1rem',
            fontWeight: 400,
            color: scrolled ? 'var(--ink)' : '#fffaf0',
            letterSpacing: '-0.01em',
            transition: 'color 0.3s ease',
          }}>
            Lé<strong style={{ fontWeight: 700 }}>Café Crush</strong>
          </span>
        </a>

        {/* Desktop links */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1.75rem',
        }}
        className="nav-desktop"
        >
          {NAV_LINKS.map(link => (
            <a
              key={link.href}
              href={link.href}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.8125rem',
                fontWeight: 500,
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                color: scrolled ? 'var(--ink)' : 'rgba(255, 250, 240, 0.88)',
                position: 'relative',
                paddingBottom: '2px',
                transition: 'color 0.3s ease',
              }}
              className="nav-link"
            >
              {link.label}
            </a>
          ))}

          {/* Open/Closed pill */}
          <div
            className="status-pill"
            style={{
              borderColor: scrolled ? 'var(--ink-faint)' : 'rgba(255, 250, 240, 0.2)',
              color: scrolled ? 'var(--ink)' : '#fffaf0',
            }}
          >
            <span className={`status-pill__dot ${!status.isOpen ? 'status-pill__dot--closed' : ''}`} />
            {status.label}
          </div>

          {/* Cart Trigger Button — square border matching design */}
          <button
            onClick={() => setIsCartOpen(true)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              padding: '0.5rem 0.95rem',
              borderRadius: '0px',
              backgroundColor: totalCount > 0 ? 'var(--cta)' : scrolled ? '#FFFFFF' : 'rgba(255, 250, 240, 0.12)',
              color: totalCount > 0 ? '#FFFFFF' : scrolled ? 'var(--ink)' : '#fffaf0',
              border: totalCount > 0 ? '1.5px solid var(--cta-strong)' : scrolled ? '1.5px solid var(--ink-faint)' : '1.5px solid rgba(255, 250, 240, 0.3)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.78rem',
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              boxShadow: totalCount > 0 ? '2px 2px 0px #222020' : 'none',
            }}
          >
            <span>🛒</span>
            <span>CART</span>
            {totalCount > 0 && (
              <span
                style={{
                  backgroundColor: '#FFFFFF',
                  color: 'var(--cta)',
                  borderRadius: '0px',
                  padding: '1px 6px',
                  fontSize: '0.72rem',
                  fontWeight: 900,
                  border: '1px solid var(--cta)',
                }}
              >
                {totalCount}
              </span>
            )}
          </button>

          {/* CTA */}
          <a
            href={SITE.orderUrl}
            onClick={(e) => {
              if (totalCount > 0) {
                e.preventDefault();
                setIsCartOpen(true);
              }
            }}
            className="btn btn--primary btn--sm"
          >
            {totalCount > 0 ? `Checkout (₹${totalPrice})` : 'Order Online'}
          </a>
        </div>

        {/* Mobile burger */}
        <button
          className="nav-burger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          style={{
            display: 'none',
            flexDirection: 'column',
            gap: '5px',
            padding: '8px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          <span style={{
            display: 'block', width: '24px', height: '2px', background: scrolled ? 'var(--ink)' : '#fffaf0',
            transform: menuOpen ? 'rotate(45deg) translateY(7px)' : 'none',
            transition: 'transform 0.3s var(--ease-out)',
          }} />
          <span style={{
            display: 'block', width: '24px', height: '2px', background: scrolled ? 'var(--ink)' : '#fffaf0',
            opacity: menuOpen ? 0 : 1,
            transition: 'opacity 0.2s ease',
          }} />
          <span style={{
            display: 'block', width: '24px', height: '2px', background: scrolled ? 'var(--ink)' : '#fffaf0',
            transform: menuOpen ? 'rotate(-45deg) translateY(-7px)' : 'none',
            transition: 'transform 0.3s var(--ease-out)',
          }} />
        </button>
      </nav>

      {/* Mobile overlay menu */}
      <div
        className="nav-overlay"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 999,
          backgroundColor: 'var(--bg)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '2rem',
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? 'auto' : 'none',
          transition: 'opacity 0.4s var(--ease-out)',
        }}
      >
        {NAV_LINKS.map(link => (
          <a
            key={link.href}
            href={link.href}
            onClick={() => setMenuOpen(false)}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '2rem',
              fontWeight: 600,
              color: 'var(--ink)',
            }}
          >
            {link.label}
          </a>
        ))}
        <div className="status-pill" style={{ marginTop: '1rem' }}>
          <span className={`status-pill__dot ${!status.isOpen ? 'status-pill__dot--closed' : ''}`} />
          {status.label}
        </div>
        <button
          onClick={() => {
            setMenuOpen(false);
            setIsCartOpen(true);
          }}
          className="btn btn--primary"
          style={{ marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', borderRadius: '0px' }}
        >
          <span>🛒 VIEW CART ({totalCount} ITEMS)</span>
        </button>
        <a href={`tel:${SITE.phone}`} style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.875rem',
          color: 'var(--ink-light)',
        }}>
          Call to book
        </a>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .nav-desktop { display: none !important; }
          .nav-burger { display: flex !important; }
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 2px;
          background: var(--primary);
          transform: scaleX(0);
          transform-origin: right;
          transition: transform 0.3s var(--ease-out);
        }
        .nav-link:hover::after {
          transform: scaleX(1);
          transform-origin: left;
        }
      `}</style>
    </>
  );
};
