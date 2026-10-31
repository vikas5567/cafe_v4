import React, { useState, useMemo } from 'react';
import { FULL_MENU_2026 } from '../data/fullMenu2026';
import { SITE } from '../data/siteData';
import { logo } from '../data/assets';
import { useCart } from '../context/CartContext';
import { Navbar } from '../components/Navbar';

interface MenuPageProps {
  onBackToHome: () => void;
}

export const MenuPage: React.FC<MenuPageProps> = ({ onBackToHome }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [dietFilter, setDietFilter] = useState<'all' | 'veg' | 'non-veg'>('all');
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table');
  const { cart, addToCart, removeFromCart, setIsCartOpen, totalCount, totalPrice } = useCart();

  // State for Portion selection modal (Half / Full or 4 pcs / 8 pcs)
  const [portionModal, setPortionModal] = useState<{
    item: { name: string; price: string; quantity?: string; veg: boolean; specialNote?: string };
    categoryId: string;
    halfPrice: number;
    fullPrice: number;
    halfLabel: string;
    fullLabel: string;
  } | null>(null);

  // Parse price helper
  const parsePrice = (priceStr: string): number => {
    const match = priceStr.match(/\d+/);
    return match ? parseInt(match[0], 10) : 0;
  };

  // Helper to parse dual prices (e.g. "289 / 449")
  const parseDualPrice = (priceStr: string) => {
    const nums = priceStr.match(/\d+/g);
    if (nums && nums.length >= 2) {
      return {
        first: parseInt(nums[0], 10),
        second: parseInt(nums[1], 10),
      };
    }
    return null;
  };

  // Helper to get portion labels from item.quantity (e.g. "Half / Full" or "4 pcs / 8 pcs")
  const parsePortionLabels = (quantityStr?: string) => {
    if (quantityStr && quantityStr.includes('/')) {
      const parts = quantityStr.split('/').map(s => s.trim());
      return {
        first: parts[0] || 'Half',
        second: parts[1] || 'Full',
      };
    }
    return { first: 'Half', second: 'Full' };
  };

  // Handle click on Add button: if dual price, show modal; else directly add to cart
  const handleItemAdd = (item: { name: string; price: string; quantity?: string; veg: boolean; specialNote?: string }, categoryId: string) => {
    if (item.price.includes('/')) {
      const dual = parseDualPrice(item.price);
      if (dual) {
        const labels = parsePortionLabels(item.quantity);
        setPortionModal({
          item,
          categoryId,
          halfPrice: dual.first,
          fullPrice: dual.second,
          halfLabel: labels.first,
          fullLabel: labels.second,
        });
        return;
      }
    }

    const itemId = `${categoryId}-${item.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;
    addToCart({
      id: itemId,
      name: item.name,
      price: parsePrice(item.price),
      priceDisplay: item.price,
      veg: item.veg,
      portion: item.quantity,
    });
  };

  // Filter categories and dishes
  const filteredCategories = useMemo(() => {
    return FULL_MENU_2026.map(category => {
      if (selectedCategory !== 'all' && category.id !== selectedCategory) {
        return null;
      }

      const items = category.items.filter(item => {
        if (dietFilter === 'veg' && !item.veg) return false;
        if (dietFilter === 'non-veg' && item.veg) return false;

        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = item.name.toLowerCase().includes(q);
          const matchCat = category.name.toLowerCase().includes(q) || category.hi.includes(q);
          return matchName || matchCat;
        }

        return true;
      });

      if (items.length === 0) return null;

      return {
        ...category,
        items,
      };
    }).filter(Boolean) as typeof FULL_MENU_2026;
  }, [selectedCategory, searchQuery, dietFilter]);

  const totalFilteredItems = filteredCategories.reduce((sum, cat) => sum + cat.items.length, 0);

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#FAF8F5',
        color: '#222020',
        position: 'relative',
        paddingTop: 'var(--nav-height)',
      }}
    >
      {/* 01. Universal Navbar (Exact same header as homepage with live cart button & status) */}
      <Navbar />

      {/* Hero Header Section */}
      <section
        style={{
          padding: 'clamp(2rem, 4vw, 3rem) var(--container-pad) 1.5rem',
          backgroundColor: '#FFFDF9',
          borderBottom: '1px solid rgba(212, 163, 89, 0.25)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Subtle Ambient Sunburst Glow */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 'min(900px, 90vw)',
            height: '220px',
            background: 'radial-gradient(ellipse at center, rgba(232,64,54,0.06) 0%, rgba(245,200,41,0.07) 50%, transparent 80%)',
            filter: 'blur(50px)',
            pointerEvents: 'none',
          }}
        />

        <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.4rem, 5.5vw, 4.2rem)',
              lineHeight: 1.1,
              fontWeight: 900,
              color: '#222020',
              margin: '0 auto',
            }}
          >
            The Complete Culinary <em style={{ color: '#d93a1f', fontStyle: 'italic' }}>Repertoire</em>
          </h1>
        </div>
      </section>

      {/* Control Bar: Search & Diet Toggles & Categories */}
      <section
        style={{
          position: 'sticky',
          top: 'var(--nav-height)',
          zIndex: 100,
          backgroundColor: '#FAF8F5',
          borderBottom: '1.5px solid rgba(212, 163, 89, 0.35)',
          padding: '0.75rem var(--container-pad)',
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.06)',
        }}
      >
        <div
          className="container"
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '0.75rem',
          }}
        >
          {/* Search Box */}
          <div style={{ position: 'relative', flex: '1 1 240px', maxWidth: '380px' }}>
            <span
              style={{
                position: 'absolute',
                left: '0.85rem',
                top: '50%',
                transform: 'translateY(-50%)',
                fontSize: '0.9rem',
                opacity: 0.5,
              }}
            >
              🔍
            </span>
            <input
              type="text"
              placeholder="Search dishes (e.g. Tikka, Mojito, Fried Rice)..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '0.5rem 1rem 0.5rem 2.3rem',
                borderRadius: '0px',
                border: '1.5px solid rgba(212, 163, 89, 0.45)',
                backgroundColor: '#FFFFFF',
                fontFamily: 'var(--font-body)',
                fontSize: '0.85rem',
                fontWeight: 400,
                color: '#222020',
                outline: 'none',
              }}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                style={{
                  position: 'absolute',
                  right: '0.75rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  fontSize: '0.85rem',
                  color: 'rgba(34,32,32,0.5)',
                  cursor: 'pointer',
                }}
              >
                ✕
              </button>
            )}
          </div>

          {/* Diet Filter Pills & View Switcher */}
          <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
            <button
              onClick={() => setDietFilter('all')}
              style={{
                padding: '0.45rem 0.85rem',
                borderRadius: '0px',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                fontWeight: 400,
                border: dietFilter === 'all' ? '1.5px solid #222020' : '1.5px solid rgba(212, 163, 89, 0.35)',
                backgroundColor: dietFilter === 'all' ? '#222020' : '#FFFFFF',
                color: dietFilter === 'all' ? '#FAF8F5' : '#222020',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              All Items ({totalFilteredItems})
            </button>

            <button
              onClick={() => setDietFilter('veg')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                padding: '0.45rem 0.85rem',
                borderRadius: '0px',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                fontWeight: 400,
                border: dietFilter === 'veg' ? '1.5px solid #4f7a18' : '1.5px solid rgba(212, 163, 89, 0.35)',
                backgroundColor: dietFilter === 'veg' ? '#4f7a18' : '#FFFFFF',
                color: dietFilter === 'veg' ? '#FFFFFF' : '#4f7a18',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              <span className="veg-dot" style={{ transform: 'scale(0.8)' }} />
              Pure Veg Only
            </button>

            <button
              onClick={() => setDietFilter('non-veg')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                padding: '0.45rem 0.85rem',
                borderRadius: '0px',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                fontWeight: 400,
                border: dietFilter === 'non-veg' ? '1.5px solid #e84036' : '1.5px solid rgba(212, 163, 89, 0.35)',
                backgroundColor: dietFilter === 'non-veg' ? '#e84036' : '#FFFFFF',
                color: dietFilter === 'non-veg' ? '#FFFFFF' : '#e84036',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              <span className="nonveg-dot" style={{ transform: 'scale(0.8)' }} />
              Non-Veg Only
            </button>

            {/* View Mode Toggle: Table Form vs Grid Cards */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                backgroundColor: '#FFFFFF',
                border: '1.5px solid rgba(212, 163, 89, 0.45)',
                borderRadius: '0px',
                padding: '2px',
              }}
            >
              <button
                onClick={() => setViewMode('table')}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.3rem',
                  padding: '0.35rem 0.65rem',
                  borderRadius: '0px',
                  border: 'none',
                  backgroundColor: viewMode === 'table' ? '#222020' : 'transparent',
                  color: viewMode === 'table' ? '#FAF8F5' : '#222020',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  fontWeight: 400,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
                title="Table view for easy choosing"
              >
                <span>📋</span> Table View
              </button>
              <button
                onClick={() => setViewMode('cards')}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.3rem',
                  padding: '0.35rem 0.65rem',
                  borderRadius: '0px',
                  border: 'none',
                  backgroundColor: viewMode === 'cards' ? '#222020' : 'transparent',
                  color: viewMode === 'cards' ? '#FAF8F5' : '#222020',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  fontWeight: 400,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
                title="Card grid view"
              >
                <span>▦</span> Cards
              </button>
            </div>
          </div>
        </div>

        {/* Category Navigation Strip: Wraps gracefully if extra so items move below */}
        <div
          className="container"
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: '0.45rem',
            paddingTop: '0.65rem',
            paddingBottom: '0.35rem',
          }}
        >
          <button
            onClick={() => setSelectedCategory('all')}
            style={{
              padding: '0.35rem 0.85rem',
              borderRadius: '0px',
              border: selectedCategory === 'all' ? '1.5px solid var(--cta)' : '1.5px solid rgba(212, 163, 89, 0.35)',
              backgroundColor: selectedCategory === 'all' ? '#FFF6E9' : '#FFFFFF',
              color: selectedCategory === 'all' ? 'var(--cta)' : '#222020',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              fontWeight: 400,
              whiteSpace: 'nowrap',
              cursor: 'pointer',
            }}
          >
            ✦ All Categories
          </button>

          {FULL_MENU_2026.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '0.35rem 0.85rem',
                borderRadius: '0px',
                border: selectedCategory === cat.id ? '1.5px solid var(--cta)' : '1.5px solid rgba(212, 163, 89, 0.35)',
                backgroundColor: selectedCategory === cat.id ? '#FFF6E9' : '#FFFFFF',
                color: selectedCategory === cat.id ? 'var(--cta)' : '#222020',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                fontWeight: 400,
                whiteSpace: 'nowrap',
                cursor: 'pointer',
              }}
            >
              <span>{cat.name}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Menu Categories Body */}
      <main className="container" style={{ padding: '2.5rem var(--container-pad) 6rem' }}>
        {filteredCategories.length === 0 ? (
          <div
            style={{
              textAlign: 'center',
              padding: '4rem 1rem',
              backgroundColor: '#FFFFFF',
              borderRadius: '16px',
              border: '1px solid rgba(212, 163, 89, 0.3)',
            }}
          >
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🍽️</div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', marginBottom: '0.5rem' }}>
              No dishes found
            </h3>
            <p style={{ color: 'rgba(34,32,32,0.6)', marginBottom: '1.5rem' }}>
              Try searching for something else or clear your diet filters.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setDietFilter('all');
                setSelectedCategory('all');
              }}
              className="btn btn--primary"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          filteredCategories.map(category => (
            <div
              key={category.id}
            style={{
              marginBottom: '2.5rem',
              backgroundColor: '#FFFFFF',
              borderRadius: '0px',
              border: '1.5px solid rgba(212, 163, 89, 0.45)',
              boxShadow: '3px 3px 0px rgba(34, 32, 32, 0.08)',
              overflow: 'hidden',
            }}
          >
            {/* Category Header Bar */}
            <div
              style={{
                padding: '1rem 1.5rem',
                backgroundColor: '#FFFBF5',
                borderBottom: '1.5px solid rgba(212, 163, 89, 0.35)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '0.75rem',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <div>
                  <h2
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.35rem',
                      fontWeight: 700,
                      color: '#222020',
                      lineHeight: 1.15,
                    }}
                  >
                    {category.name}
                  </h2>
                  <span
                    style={{
                      fontFamily: 'var(--font-hindi)',
                      fontSize: '0.9rem',
                      color: 'var(--cta)',
                      fontWeight: 600,
                    }}
                  >
                    {category.hi}
                  </span>
                </div>
              </div>

              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  color: 'rgba(34,32,32,0.65)',
                  padding: '0.25rem 0.65rem',
                  backgroundColor: '#FAF8F5',
                  borderRadius: '0px',
                  border: '1px solid rgba(212, 163, 89, 0.35)',
                }}
              >
                {category.items.length} items
              </span>
            </div>

            {viewMode === 'table' ? (
              /* TABLE VIEW: Clean tabular rows for fast selecting & comparison */
              <div style={{ overflowX: 'auto' }}>
                <table
                  style={{
                    width: '100%',
                    borderCollapse: 'collapse',
                    textAlign: 'left',
                  }}
                >
                  <thead>
                    <tr
                      style={{
                        backgroundColor: '#FAF8F5',
                        borderBottom: '1.5px solid rgba(212, 163, 89, 0.25)',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.7rem',
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        color: 'rgba(34,32,32,0.65)',
                      }}
                    >
                      <th style={{ padding: '0.65rem 1.25rem', width: '48px', textAlign: 'center' }}>Type</th>
                      <th style={{ padding: '0.65rem 1rem' }}>Dish Name & Details</th>
                      <th style={{ padding: '0.65rem 1rem', width: '130px', whiteSpace: 'nowrap' }}>Portion</th>
                      <th style={{ padding: '0.65rem 1rem', width: '140px', textAlign: 'right', whiteSpace: 'nowrap' }}>Price</th>
                      <th style={{ padding: '0.65rem 1.25rem', width: '130px', textAlign: 'right', whiteSpace: 'nowrap' }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {category.items.map((item, idx) => {
                      const itemId = `${category.id}-${item.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;
                      const halfId = `${itemId}-half`;
                      const fullId = `${itemId}-full`;
                      const isDual = item.price.includes('/');
                      
                      // For dual items, check both half and full in cart
                      const singleCartItem = cart[itemId];
                      const halfCartItem = cart[halfId];
                      const fullCartItem = cart[fullId];
                      const totalItemQty = isDual
                        ? (halfCartItem ? halfCartItem.quantity : 0) + (fullCartItem ? fullCartItem.quantity : 0)
                        : (singleCartItem ? singleCartItem.quantity : 0);
                      const dual = parseDualPrice(item.price);

                      return (
                        <tr
                          key={`${item.name}-${idx}`}
                          style={{
                            borderBottom: '1px solid rgba(212, 163, 89, 0.18)',
                            backgroundColor: totalItemQty > 0 ? '#FFF9F0' : idx % 2 === 0 ? '#FFFFFF' : '#FCFAF7',
                            transition: 'background-color 0.15s ease',
                          }}
                          onMouseEnter={e => {
                            if (totalItemQty === 0) e.currentTarget.style.backgroundColor = '#FFF6EC';
                          }}
                          onMouseLeave={e => {
                            if (totalItemQty === 0) e.currentTarget.style.backgroundColor = idx % 2 === 0 ? '#FFFFFF' : '#FCFAF7';
                          }}
                        >
                          {/* Diet Badge */}
                          <td style={{ padding: '0.75rem 1.25rem', textAlign: 'center', verticalAlign: 'middle' }}>
                            <span className={item.veg ? 'veg-dot' : 'nonveg-dot'} />
                          </td>

                          {/* Dish Name */}
                          <td style={{ padding: '0.75rem 1rem', verticalAlign: 'middle' }}>
                            <div
                              style={{
                                fontFamily: 'var(--font-body)',
                                fontSize: '0.95rem',
                                fontWeight: 600,
                                color: '#222020',
                              }}
                            >
                              {item.name}
                            </div>
                            {item.specialNote && (
                              <div
                                style={{
                                  fontFamily: 'var(--font-mono)',
                                  fontSize: '0.68rem',
                                  color: 'var(--cta)',
                                  marginTop: '2px',
                                }}
                              >
                                ⚠️ {item.specialNote}
                              </div>
                            )}
                          </td>

                          {/* Portion (in same row, strictly no wrapping) */}
                          <td style={{ padding: '0.75rem 1rem', verticalAlign: 'middle', whiteSpace: 'nowrap' }}>
                            <span
                              style={{
                                fontFamily: 'var(--font-mono)',
                                fontSize: '0.78rem',
                                color: 'rgba(34,32,32,0.6)',
                                whiteSpace: 'nowrap',
                              }}
                            >
                              {item.quantity || 'Standard'}
                            </span>
                          </td>

                          {/* Price: only price in same single row */}
                          <td style={{ padding: '0.75rem 1rem', textAlign: 'right', verticalAlign: 'middle', whiteSpace: 'nowrap' }}>
                            {dual ? (
                              <span
                                style={{
                                  fontFamily: 'var(--font-mono)',
                                  fontSize: '0.95rem',
                                  fontWeight: 700,
                                  color: '#222020',
                                  whiteSpace: 'nowrap',
                                  display: 'inline-block',
                                }}
                              >
                                ₹{dual.first} / ₹{dual.second}
                              </span>
                            ) : (
                              <span
                                style={{
                                  fontFamily: 'var(--font-mono)',
                                  fontSize: '1rem',
                                  fontWeight: 700,
                                  color: '#222020',
                                  whiteSpace: 'nowrap',
                                  display: 'inline-block',
                                }}
                              >
                                ₹{item.price}
                              </span>
                            )}
                          </td>

                          {/* Action Button: Square ADD or Stepper / Dual Indicator */}
                          <td style={{ padding: '0.75rem 1.25rem', textAlign: 'right', verticalAlign: 'middle', whiteSpace: 'nowrap' }}>
                            {isDual ? (
                              /* For Dual variant items: ADD opens selection modal; if already added, show button with current count */
                              <button
                                onClick={() => handleItemAdd(item, category.id)}
                                style={{
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  gap: '0.35rem',
                                  padding: '0.35rem 0.85rem',
                                  borderRadius: '0px',
                                  border: totalItemQty > 0 ? '1.5px solid #222020' : '1.5px solid var(--cta)',
                                  backgroundColor: totalItemQty > 0 ? '#222020' : '#FFFFFF',
                                  color: totalItemQty > 0 ? '#FAF8F5' : 'var(--cta)',
                                  fontFamily: 'var(--font-mono)',
                                  fontSize: '0.75rem',
                                  fontWeight: 700,
                                  cursor: 'pointer',
                                  transition: 'all 0.15s ease',
                                }}
                                onMouseEnter={e => {
                                  if (totalItemQty === 0) {
                                    e.currentTarget.style.backgroundColor = 'var(--cta)';
                                    e.currentTarget.style.color = '#FFFFFF';
                                  }
                                }}
                                onMouseLeave={e => {
                                  if (totalItemQty === 0) {
                                    e.currentTarget.style.backgroundColor = '#FFFFFF';
                                    e.currentTarget.style.color = 'var(--cta)';
                                  }
                                }}
                                title="Click to choose Half or Full"
                              >
                                {totalItemQty > 0 ? `+ ADD (${totalItemQty})` : '+ ADD'}
                              </button>
                            ) : totalItemQty === 0 ? (
                              <button
                                onClick={() => handleItemAdd(item, category.id)}
                                style={{
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  gap: '0.3rem',
                                  padding: '0.35rem 0.85rem',
                                  borderRadius: '0px',
                                  border: '1.5px solid var(--cta)',
                                  backgroundColor: '#FFFFFF',
                                  color: 'var(--cta)',
                                  fontFamily: 'var(--font-mono)',
                                  fontSize: '0.75rem',
                                  fontWeight: 700,
                                  cursor: 'pointer',
                                  transition: 'all 0.15s ease',
                                }}
                                onMouseEnter={e => {
                                  e.currentTarget.style.backgroundColor = 'var(--cta)';
                                  e.currentTarget.style.color = '#FFFFFF';
                                }}
                                onMouseLeave={e => {
                                  e.currentTarget.style.backgroundColor = '#FFFFFF';
                                  e.currentTarget.style.color = 'var(--cta)';
                                }}
                              >
                                + ADD
                              </button>
                            ) : (
                              <div
                                style={{
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  backgroundColor: '#FFFFFF',
                                  borderRadius: '0px',
                                  border: '1.5px solid #222020',
                                  overflow: 'hidden',
                                }}
                              >
                                <button
                                  onClick={() => removeFromCart(itemId)}
                                  style={{
                                    width: '26px',
                                    height: '26px',
                                    border: 'none',
                                    background: 'none',
                                    color: 'var(--cta)',
                                    fontWeight: 700,
                                    fontSize: '0.9rem',
                                    cursor: 'pointer',
                                    lineHeight: 1,
                                  }}
                                >
                                  −
                                </button>
                                <span
                                  style={{
                                    width: '24px',
                                    textAlign: 'center',
                                    fontFamily: 'var(--font-mono)',
                                    fontSize: '0.78rem',
                                    fontWeight: 700,
                                    color: '#222020',
                                  }}
                                >
                                  {totalItemQty}
                                </span>
                                <button
                                  onClick={() => handleItemAdd(item, category.id)}
                                  style={{
                                    width: '26px',
                                    height: '26px',
                                    border: 'none',
                                    background: 'none',
                                    color: 'var(--cta)',
                                    fontWeight: 700,
                                    fontSize: '0.9rem',
                                    cursor: 'pointer',
                                    lineHeight: 1,
                                  }}
                                >
                                  +
                                </button>
                              </div>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
              /* CARD VIEW: Square cards layout */
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))',
                  gap: 0,
                }}
              >
                {category.items.map((item, idx) => {
                  const itemId = `${category.id}-${item.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;
                  const halfId = `${itemId}-half`;
                  const fullId = `${itemId}-full`;
                  const isDual = item.price.includes('/');
                  
                  const singleCartItem = cart[itemId];
                  const halfCartItem = cart[halfId];
                  const fullCartItem = cart[fullId];
                  const totalItemQty = isDual
                    ? (halfCartItem ? halfCartItem.quantity : 0) + (fullCartItem ? fullCartItem.quantity : 0)
                    : (singleCartItem ? singleCartItem.quantity : 0);

                  const dual = parseDualPrice(item.price);

                  return (
                    <div
                      key={`${item.name}-${idx}`}
                      style={{
                        padding: '1rem 1.25rem',
                        borderBottom: '1px solid rgba(212, 163, 89, 0.2)',
                        borderRight: '1px solid rgba(212, 163, 89, 0.2)',
                        display: 'flex',
                        alignItems: 'flex-start',
                        justifyContent: 'space-between',
                        gap: '0.85rem',
                        transition: 'background-color 0.2s ease',
                        backgroundColor: totalItemQty > 0 ? '#FFF9F0' : 'transparent',
                      }}
                      onMouseEnter={e => {
                        if (totalItemQty === 0) e.currentTarget.style.backgroundColor = '#FFFBF3';
                      }}
                      onMouseLeave={e => {
                        if (totalItemQty === 0) e.currentTarget.style.backgroundColor = 'transparent';
                      }}
                    >
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.25rem' }}>
                          <span className={item.veg ? 'veg-dot' : 'nonveg-dot'} style={{ flexShrink: 0 }} />
                          <span
                            style={{
                              fontFamily: 'var(--font-body)',
                              fontSize: '0.95rem',
                              fontWeight: 600,
                              color: '#222020',
                            }}
                          >
                            {item.name}
                          </span>
                        </div>

                        {item.quantity && (
                          <span
                            style={{
                              fontFamily: 'var(--font-mono)',
                              fontSize: '0.72rem',
                              color: 'rgba(34,32,32,0.55)',
                              display: 'inline-block',
                              marginRight: '0.5rem',
                            }}
                          >
                            Portion: {item.quantity}
                          </span>
                        )}

                        {item.specialNote && (
                          <span
                            style={{
                              fontFamily: 'var(--font-mono)',
                              fontSize: '0.68rem',
                              color: 'var(--cta)',
                              display: 'block',
                              marginTop: '0.2rem',
                              fontWeight: 600,
                            }}
                          >
                            ⚠️ {item.specialNote}
                          </span>
                        )}
                      </div>

                      {/* Price and Square Button */}
                      <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.4rem', whiteSpace: 'nowrap', flexShrink: 0 }}>
                        {dual ? (
                          <span
                            style={{
                              fontFamily: 'var(--font-mono)',
                              fontSize: '0.95rem',
                              fontWeight: 700,
                              color: '#222020',
                              whiteSpace: 'nowrap',
                              display: 'inline-block',
                            }}
                          >
                            ₹{dual.first} / ₹{dual.second}
                          </span>
                        ) : (
                          <span
                            style={{
                              fontFamily: 'var(--font-mono)',
                              fontSize: '1rem',
                              fontWeight: 700,
                              color: '#222020',
                              whiteSpace: 'nowrap',
                              display: 'inline-block',
                            }}
                          >
                            ₹{item.price}
                          </span>
                        )}

                        {isDual ? (
                          /* For Dual items in card view: click to pick Half or Full */
                          <button
                            onClick={() => handleItemAdd(item, category.id)}
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              gap: '0.3rem',
                              padding: '0.3rem 0.75rem',
                              borderRadius: '0px',
                              border: totalItemQty > 0 ? '1.5px solid #222020' : '1.5px solid var(--cta)',
                              backgroundColor: totalItemQty > 0 ? '#222020' : '#FFFFFF',
                              color: totalItemQty > 0 ? '#FAF8F5' : 'var(--cta)',
                              fontFamily: 'var(--font-mono)',
                              fontSize: '0.75rem',
                              fontWeight: 700,
                              cursor: 'pointer',
                              transition: 'all 0.15s ease',
                              whiteSpace: 'nowrap',
                            }}
                            onMouseEnter={e => {
                              if (totalItemQty === 0) {
                                e.currentTarget.style.backgroundColor = 'var(--cta)';
                                e.currentTarget.style.color = '#FFFFFF';
                              }
                            }}
                            onMouseLeave={e => {
                              if (totalItemQty === 0) {
                                e.currentTarget.style.backgroundColor = '#FFFFFF';
                                e.currentTarget.style.color = 'var(--cta)';
                              }
                            }}
                            title="Click to choose Half or Full"
                          >
                            {totalItemQty > 0 ? `+ ADD (${totalItemQty})` : '+ ADD'}
                          </button>
                        ) : totalItemQty === 0 ? (
                          <button
                            onClick={() => handleItemAdd(item, category.id)}
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '0.3rem',
                              padding: '0.3rem 0.75rem',
                              borderRadius: '0px',
                              border: '1.5px solid var(--cta)',
                              backgroundColor: '#FFFFFF',
                              color: 'var(--cta)',
                              fontFamily: 'var(--font-mono)',
                              fontSize: '0.75rem',
                              fontWeight: 700,
                              cursor: 'pointer',
                              transition: 'all 0.15s ease',
                            }}
                            onMouseEnter={e => {
                              e.currentTarget.style.backgroundColor = 'var(--cta)';
                              e.currentTarget.style.color = '#FFFFFF';
                            }}
                            onMouseLeave={e => {
                              e.currentTarget.style.backgroundColor = '#FFFFFF';
                              e.currentTarget.style.color = 'var(--cta)';
                            }}
                          >
                            + ADD
                          </button>
                        ) : (
                          <div
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              backgroundColor: '#FFFFFF',
                              borderRadius: '0px',
                              border: '1.5px solid #222020',
                              overflow: 'hidden',
                            }}
                          >
                            <button
                              onClick={() => removeFromCart(itemId)}
                              style={{
                                width: '26px',
                                height: '26px',
                                border: 'none',
                                background: 'none',
                                color: 'var(--cta)',
                                fontWeight: 700,
                                fontSize: '0.85rem',
                                cursor: 'pointer',
                              }}
                            >
                              −
                            </button>
                            <span
                              style={{
                                width: '22px',
                                textAlign: 'center',
                                fontFamily: 'var(--font-mono)',
                                fontSize: '0.75rem',
                                fontWeight: 700,
                                color: '#222020',
                              }}
                            >
                              {totalItemQty}
                            </span>
                            <button
                              onClick={() => handleItemAdd(item, category.id)}
                              style={{
                                width: '26px',
                                height: '26px',
                                border: 'none',
                                background: 'none',
                                color: 'var(--cta)',
                                fontWeight: 700,
                                fontSize: '0.85rem',
                                cursor: 'pointer',
                              }}
                            >
                              +
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ))
      )}
    </main>

      {/* Floating Bottom Cart Bar (appears when items are added) */}
      {totalCount > 0 && (
        <div
          style={{
            position: 'fixed',
            bottom: '1.5rem',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 95,
            width: 'min(500px, 92vw)',
            backgroundColor: '#1C1919',
            color: '#FFFFFF',
            borderRadius: '0px',
            padding: '0.75rem 1.25rem',
            boxShadow: '4px 4px 0px #222020, 0 12px 30px rgba(0, 0, 0, 0.35)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            border: '1.5px solid rgba(212, 163, 89, 0.5)',
            animation: 'cartBarUp 0.3s ease',
          }}
        >
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#f5c829', fontWeight: 600 }}>
              {totalCount} {totalCount === 1 ? 'ITEM' : 'ITEMS'} IN CART
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 700 }}>
              ₹{totalPrice} <span style={{ fontSize: '0.7rem', fontWeight: 400, opacity: 0.7 }}>(+GST)</span>
            </div>
          </div>

          <button
            onClick={() => setIsCartOpen(true)}
            className="btn btn--primary btn--sm"
            style={{ borderRadius: '0px', padding: '0.5rem 1.25rem' }}
          >
            VIEW CART ➔
          </button>
        </div>
      )}

      {/* Footer Info Strip */}
      <footer
        style={{
          borderTop: '2px solid rgba(212, 163, 89, 0.35)',
          backgroundColor: '#FFFDF9',
          padding: '2.5rem var(--container-pad)',
          textAlign: 'center',
        }}
      >
        <div style={{ maxWidth: '640px', margin: '0 auto' }}>
          <img src={logo} alt={SITE.name} style={{ height: '48px', margin: '0 auto 1rem' }} />
          <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', marginBottom: '0.5rem' }}>
            Lé Café Crush · Restaurant & Lounge
          </h4>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: 'rgba(34,32,32,0.65)', marginBottom: '1rem' }}>
            {SITE.address} · Call: {SITE.phone}
          </p>
          <button
            onClick={onBackToHome}
            className="btn btn--primary btn--sm"
          >
            ← Return to Main Page
          </button>
        </div>
      </footer>

      {/* Portion Selection Modal: Ask Half or Full */}
      {portionModal && (
        <div
          onClick={() => setPortionModal(null)}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(28, 25, 25, 0.65)',
            backdropFilter: 'blur(3px)',
            zIndex: 200,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem',
            animation: 'fadeIn 0.2s ease',
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              backgroundColor: '#FFFFFF',
              width: 'min(440px, 94vw)',
              borderRadius: '0px',
              border: '2px solid #222020',
              boxShadow: '8px 8px 0px #222020',
              padding: '1.75rem',
              position: 'relative',
              animation: 'modalSlideUp 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            {/* Close button */}
            <button
              onClick={() => setPortionModal(null)}
              style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                background: 'none',
                border: 'none',
                fontSize: '1.25rem',
                color: 'rgba(34,32,32,0.6)',
                cursor: 'pointer',
                lineHeight: 1,
              }}
              title="Close"
            >
              ✕
            </button>

            {/* Header info */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
              <span className={portionModal.item.veg ? 'veg-dot' : 'nonveg-dot'} />
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: 'rgba(34,32,32,0.6)',
                }}
              >
                Choose Portion Size
              </span>
            </div>

            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.4rem',
                fontWeight: 700,
                color: '#222020',
                marginBottom: '0.25rem',
                lineHeight: 1.2,
              }}
            >
              {portionModal.item.name}
            </h3>

            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'rgba(34,32,32,0.65)', marginBottom: '1.5rem' }}>
              Select your preferred portion to add to order:
            </p>

            {/* Options Grid */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
              {/* Option 1: Half / First size */}
              {(() => {
                const halfId = `${portionModal.categoryId}-${portionModal.item.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}-half`;
                const halfQty = cart[halfId] ? cart[halfId].quantity : 0;

                return (
                  <div
                    style={{
                      border: '1.5px solid rgba(212, 163, 89, 0.45)',
                      padding: '0.85rem 1rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      backgroundColor: halfQty > 0 ? '#FFF9F0' : '#FCFAF7',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    <div>
                      <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', fontWeight: 700, color: '#222020' }}>
                        {portionModal.halfLabel}
                      </div>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.95rem', fontWeight: 700, color: 'var(--cta)', marginTop: '2px' }}>
                        ₹{portionModal.halfPrice}
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      {halfQty > 0 && (
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#4f7a18', fontWeight: 600 }}>
                          ({halfQty} in cart)
                        </span>
                      )}
                      <button
                        onClick={() => {
                          addToCart({
                            id: halfId,
                            name: `${portionModal.item.name} (${portionModal.halfLabel})`,
                            price: portionModal.halfPrice,
                            priceDisplay: `₹${portionModal.halfPrice}`,
                            veg: portionModal.item.veg,
                            portion: portionModal.halfLabel,
                          });
                        }}
                        style={{
                          padding: '0.45rem 1rem',
                          borderRadius: '0px',
                          border: '1.5px solid var(--cta)',
                          backgroundColor: '#FFFFFF',
                          color: 'var(--cta)',
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.78rem',
                          fontWeight: 700,
                          cursor: 'pointer',
                          transition: 'all 0.15s ease',
                        }}
                        onMouseEnter={e => {
                          e.currentTarget.style.backgroundColor = 'var(--cta)';
                          e.currentTarget.style.color = '#FFFFFF';
                        }}
                        onMouseLeave={e => {
                          e.currentTarget.style.backgroundColor = '#FFFFFF';
                          e.currentTarget.style.color = 'var(--cta)';
                        }}
                      >
                        + ADD {portionModal.halfLabel.toUpperCase()}
                      </button>
                    </div>
                  </div>
                );
              })()}

              {/* Option 2: Full / Second size */}
              {(() => {
                const fullId = `${portionModal.categoryId}-${portionModal.item.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}-full`;
                const fullQty = cart[fullId] ? cart[fullId].quantity : 0;

                return (
                  <div
                    style={{
                      border: '1.5px solid rgba(212, 163, 89, 0.45)',
                      padding: '0.85rem 1rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      backgroundColor: fullQty > 0 ? '#FFF9F0' : '#FCFAF7',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    <div>
                      <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', fontWeight: 700, color: '#222020' }}>
                        {portionModal.fullLabel}
                      </div>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.95rem', fontWeight: 700, color: 'var(--cta)', marginTop: '2px' }}>
                        ₹{portionModal.fullPrice}
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      {fullQty > 0 && (
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#4f7a18', fontWeight: 600 }}>
                          ({fullQty} in cart)
                        </span>
                      )}
                      <button
                        onClick={() => {
                          addToCart({
                            id: fullId,
                            name: `${portionModal.item.name} (${portionModal.fullLabel})`,
                            price: portionModal.fullPrice,
                            priceDisplay: `₹${portionModal.fullPrice}`,
                            veg: portionModal.item.veg,
                            portion: portionModal.fullLabel,
                          });
                        }}
                        style={{
                          padding: '0.45rem 1rem',
                          borderRadius: '0px',
                          border: '1.5px solid var(--cta)',
                          backgroundColor: '#FFFFFF',
                          color: 'var(--cta)',
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.78rem',
                          fontWeight: 700,
                          cursor: 'pointer',
                          transition: 'all 0.15s ease',
                        }}
                        onMouseEnter={e => {
                          e.currentTarget.style.backgroundColor = 'var(--cta)';
                          e.currentTarget.style.color = '#FFFFFF';
                        }}
                        onMouseLeave={e => {
                          e.currentTarget.style.backgroundColor = '#FFFFFF';
                          e.currentTarget.style.color = 'var(--cta)';
                        }}
                      >
                        + ADD {portionModal.fullLabel.toUpperCase()}
                      </button>
                    </div>
                  </div>
                );
              })()}
            </div>

            {/* Bottom Done button */}
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button
                onClick={() => setPortionModal(null)}
                className="btn btn--primary"
                style={{ borderRadius: '0px', padding: '0.5rem 1.5rem', width: '100%' }}
              >
                DONE
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes cartBarUp {
          from { transform: translate(-50%, 40px); opacity: 0; }
          to { transform: translate(-50%, 0); opacity: 1; }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes modalSlideUp {
          from { opacity: 0; transform: translateY(20px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
};

export default MenuPage;
