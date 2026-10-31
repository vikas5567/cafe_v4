import React, { useState, useEffect } from 'react';
import { SITE } from '../data/siteData';

export const Visit: React.FC = () => {
  const [currentTime, setCurrentTime] = useState('');
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Format in Asia/Kolkata
      const timeStr = now.toLocaleTimeString('en-US', {
        timeZone: SITE.timeZone,
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      });
      setCurrentTime(timeStr);

      const hours = now.getHours();
      const minutes = now.getMinutes();
      const decimalTime = hours + minutes / 60;
      // 10:30 to 23:00
      setIsOpen(decimalTime >= 10.5 && decimalTime < 23.0);
    };

    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="visit"
      style={{
        position: 'relative',
        background: 'var(--bg)',
        color: 'var(--ink)',
        padding: 'clamp(5rem, 10vw, 8rem) var(--container-pad)',
        borderTop: 'var(--border)',
      }}
    >
      <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
        {/* Eyebrow & Headline */}
        <div style={{ textAlign: 'center', marginBottom: 'clamp(3rem, 6vw, 5rem)' }}>
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
              marginBottom: '1rem',
            }}
          >
            <span>✦</span>
            <span>FIND US IN PATNA</span>
          </div>

          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.5rem, 6vw, 5rem)',
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              color: 'var(--ink)',
            }}
          >
            Come make a <span style={{ fontStyle: 'italic', color: 'var(--primary)' }}>memory.</span>
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(1rem, 1.8vw, 1.25rem)',
              color: 'var(--ink-light)',
              maxWidth: '600px',
              margin: '1rem auto 0',
            }}
          >
            Bailey Road's favorite spot for lively celebrations, cosy corners, and authentic flavours that bring people back.
          </p>
        </div>

        {/* 4 Big stat counters banner */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1.5rem',
            marginBottom: '4rem',
            padding: '2rem',
            background: 'var(--bg-alt)',
            borderRadius: '20px',
            border: 'var(--border)',
            boxShadow: 'var(--shadow-hard)',
          }}
        >
          <div style={{ textAlign: 'center' }}>
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2.2rem, 4vw, 3.5rem)',
                fontWeight: 800,
                color: 'var(--primary)',
                lineHeight: 1,
              }}
            >
              {SITE.stats.deliveryTime}
              <span style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--ink)' }}> min</span>
            </div>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8rem',
                color: 'var(--ink-light)',
                marginTop: '0.5rem',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
              }}
            >
              Fast Hot Delivery
            </div>
          </div>

          <div style={{ textAlign: 'center' }}>
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2.2rem, 4vw, 3.5rem)',
                fontWeight: 800,
                color: 'var(--orange)',
                lineHeight: 1,
              }}
            >
              0{SITE.stats.kitchens}
            </div>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8rem',
                color: 'var(--ink-light)',
                marginTop: '0.5rem',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
              }}
            >
              Specialist Kitchens
            </div>
          </div>

          <div style={{ textAlign: 'center' }}>
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2.2rem, 4vw, 3.5rem)',
                fontWeight: 800,
                color: 'var(--green-text)',
                lineHeight: 1,
              }}
            >
              {SITE.stats.partiesHosted}
            </div>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8rem',
                color: 'var(--ink-light)',
                marginTop: '0.5rem',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
              }}
            >
              Parties & Cabins Hosted
            </div>
          </div>

          <div style={{ textAlign: 'center' }}>
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2.2rem, 4vw, 3.5rem)',
                fontWeight: 800,
                color: 'var(--bean)',
                lineHeight: 1,
              }}
            >
              {SITE.stats.happyGuests}
            </div>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8rem',
                color: 'var(--ink-light)',
                marginTop: '0.5rem',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
              }}
            >
              Happy Guests in Patna
            </div>
          </div>
        </div>

        {/* 2 Columns: Details card & Action CTAs */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2.5rem',
          }}
        >
          {/* Card 1: Visit details & Live status */}
          <div
            style={{
              background: '#ffffff',
              borderRadius: '24px',
              padding: 'clamp(2rem, 4vw, 3rem)',
              border: 'var(--border)',
              boxShadow: 'var(--shadow-hard-lg)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              {/* Live Status Pill */}
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.5rem 1rem',
                  borderRadius: '999px',
                  background: isOpen ? 'rgba(159, 197, 77, 0.15)' : 'rgba(232, 64, 54, 0.1)',
                  border: `1.5px solid ${isOpen ? 'var(--leaf)' : 'var(--primary)'}`,
                  marginBottom: '2rem',
                }}
              >
                <span
                  style={{
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    backgroundColor: isOpen ? '#4f7a18' : '#e84036',
                    display: 'inline-block',
                    boxShadow: isOpen ? '0 0 10px #9fc54d' : 'none',
                  }}
                />
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    color: isOpen ? '#4f7a18' : '#e84036',
                    textTransform: 'uppercase',
                  }}
                >
                  {isOpen ? 'Open Now' : 'Closed · Opens 10:30 AM'}
                </span>
                <span style={{ color: 'var(--ink-light)', fontSize: '0.8rem', fontFamily: 'var(--font-mono)' }}>
                  · {currentTime} IST
                </span>
              </div>

              {/* Location */}
              <div style={{ marginBottom: '1.75rem' }}>
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem',
                    color: 'var(--ink-light)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    marginBottom: '0.25rem',
                  }}
                >
                  Location & Address
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.35rem',
                    fontWeight: 600,
                    lineHeight: 1.3,
                  }}
                >
                  {SITE.address}
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--ink-light)', marginTop: '0.25rem' }}>
                  Pin: {SITE.pincode} · Landmark: Bailey Road
                </div>
              </div>

              {/* Hours */}
              <div style={{ marginBottom: '1.75rem' }}>
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem',
                    color: 'var(--ink-light)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    marginBottom: '0.25rem',
                  }}
                >
                  Dine-in & Lounge Hours
                </div>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: '1.15rem', fontWeight: 600 }}>
                  {SITE.hours.days}: {SITE.hours.open} AM – {SITE.hours.close === '23:00' ? '11:00 PM' : SITE.hours.close}
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--ink-light)', marginTop: '0.25rem' }}>
                  Delivery Area: {SITE.delivery.area}
                </div>
              </div>

              {/* Online Platforms */}
              <div>
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem',
                    color: 'var(--ink-light)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    marginBottom: '0.5rem',
                  }}
                >
                  Also Available On
                </div>
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <a
                    href="https://www.zomato.com"
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      padding: '0.5rem 1.25rem',
                      background: '#fff',
                      border: '1.5px solid var(--ink)',
                      borderRadius: '8px',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.85rem',
                      fontWeight: 700,
                      color: 'var(--primary)',
                      textDecoration: 'none',
                      boxShadow: '2px 2px 0px var(--ink)',
                    }}
                  >
                    Zomato ↗
                  </a>
                  <a
                    href="https://www.swiggy.com"
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      padding: '0.5rem 1.25rem',
                      background: '#fff',
                      border: '1.5px solid var(--ink)',
                      borderRadius: '8px',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.85rem',
                      fontWeight: 700,
                      color: 'var(--orange)',
                      textDecoration: 'none',
                      boxShadow: '2px 2px 0px var(--ink)',
                    }}
                  >
                    Swiggy ↗
                  </a>
                  <a
                    href={SITE.instagram}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      padding: '0.5rem 1.25rem',
                      background: '#fff',
                      border: '1.5px solid var(--ink)',
                      borderRadius: '8px',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.85rem',
                      fontWeight: 700,
                      color: 'var(--ink)',
                      textDecoration: 'none',
                      boxShadow: '2px 2px 0px var(--ink)',
                    }}
                  >
                    Instagram {SITE.instagramHandle} ↗
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Three Big CTAs & Quick Booking */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1.25rem',
              justifyContent: 'center',
            }}
          >
            {/* CTA 1: Call to Reserve */}
            <a
              href={`tel:${SITE.phone}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '1.75rem 2rem',
                background: 'var(--cta)',
                color: '#fff',
                borderRadius: '16px',
                border: 'var(--border)',
                boxShadow: 'var(--shadow-hard)',
                textDecoration: 'none',
                transition: 'transform 0.15s ease, box-shadow 0.15s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translate(-2px, -2px)';
                e.currentTarget.style.boxShadow = '6px 6px 0px var(--ink)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translate(0, 0)';
                e.currentTarget.style.boxShadow = 'var(--shadow-hard)';
              }}
            >
              <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', opacity: 0.9, letterSpacing: '0.1em' }}>
                  INSTANT TABLE BOOKING
                </div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 700 }}>
                  Call to Book a Table
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem', opacity: 0.85, marginTop: '0.2rem' }}>
                  {SITE.phone}
                </div>
              </div>
              <div style={{ fontSize: '2rem' }}>📞</div>
            </a>

            {/* CTA 2: WhatsApp for Events */}
            <a
              href={`https://wa.me/${SITE.whatsapp.replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '1.75rem 2rem',
                background: 'var(--leaf)',
                color: 'var(--ink)',
                borderRadius: '16px',
                border: 'var(--border)',
                boxShadow: 'var(--shadow-hard)',
                textDecoration: 'none',
                transition: 'transform 0.15s ease, box-shadow 0.15s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translate(-2px, -2px)';
                e.currentTarget.style.boxShadow = '6px 6px 0px var(--ink)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translate(0, 0)';
                e.currentTarget.style.boxShadow = 'var(--shadow-hard)';
              }}
            >
              <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--green-text)', letterSpacing: '0.1em' }}>
                  BIRTHDAYS & CABINS
                </div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 700 }}>
                  Chat on WhatsApp
                </div>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: 'var(--ink-light)', marginTop: '0.2rem' }}>
                  Fast quotes for party halls and couple cabins
                </div>
              </div>
              <div style={{ fontSize: '2rem' }}>💬</div>
            </a>

            {/* CTA 3: Get Google Directions */}
            <a
              href="https://maps.google.com/?q=Le+Cafe+Crush+Bailey+Road+Patna"
              target="_blank"
              rel="noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '1.75rem 2rem',
                background: '#ffffff',
                color: 'var(--ink)',
                borderRadius: '16px',
                border: 'var(--border)',
                boxShadow: 'var(--shadow-hard)',
                textDecoration: 'none',
                transition: 'transform 0.15s ease, box-shadow 0.15s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translate(-2px, -2px)';
                e.currentTarget.style.boxShadow = '6px 6px 0px var(--ink)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translate(0, 0)';
                e.currentTarget.style.boxShadow = 'var(--shadow-hard)';
              }}
            >
              <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--ink-light)', letterSpacing: '0.1em' }}>
                  FIND YOUR WAY
                </div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 700 }}>
                  Get Driving Directions
                </div>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: 'var(--ink-light)', marginTop: '0.2rem' }}>
                  Ashiana More / Khajpura, Bailey Road
                </div>
              </div>
              <div style={{ fontSize: '2rem' }}>📍</div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
