import React from 'react';
import { useCart } from '../context/CartContext';
import { SITE } from '../data/siteData';

export const CartModal: React.FC = () => {
  const { cart, addToCart, removeFromCart, clearCart, totalPrice, totalCount, isCartOpen, setIsCartOpen } = useCart();

  if (!isCartOpen) return null;

  const items = Object.values(cart);
  const gstAmount = Math.round(totalPrice * 0.05);
  const grandTotal = totalPrice + gstAmount;

  const handleWhatsAppOrder = () => {
    if (items.length === 0) return;
    const itemListText = items
      .map(it => `• ${it.name} (${it.portion ? it.portion + ' - ' : ''}₹${it.price}) x ${it.quantity} = ₹${it.price * it.quantity}`)
      .join('%0A');

    const message = `Hello Lé Café Crush! 🍽️%0AI would like to place an order:%0A%0A${itemListText}%0A%0AItems Subtotal: ₹${totalPrice}%0AGST (5%): ₹${gstAmount}%0AGrand Total: ₹${grandTotal}%0A%0APlease confirm my order!`;
    const cleanPhone = SITE.phone.replace(/[^0-9]/g, '');
    window.open(`https://wa.me/${cleanPhone}?text=${message}`, '_blank');
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        backgroundColor: 'rgba(0, 0, 0, 0.65)',
        backdropFilter: 'blur(6px)',
        display: 'flex',
        justifyContent: 'flex-end',
        animation: 'cartFadeIn 0.25s ease',
      }}
      onClick={() => setIsCartOpen(false)}
    >
      <div
        style={{
          width: 'min(460px, 92vw)',
          height: '100%',
          backgroundColor: '#FFFFFF',
          boxShadow: '-10px 0 35px rgba(0, 0, 0, 0.25)',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          animation: 'cartSlideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Cart Header */}
        <div
          style={{
            padding: '1.25rem 1.5rem',
            borderBottom: '2px solid rgba(212, 163, 89, 0.35)',
            backgroundColor: '#FAF8F5',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <span style={{ fontSize: '1.4rem' }}>🛒</span>
            <div>
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.25rem',
                  fontWeight: 700,
                  color: '#222020',
                  lineHeight: 1.1,
                }}
              >
                Your Order
              </h3>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  color: 'rgba(34,32,32,0.6)',
                }}
              >
                {totalCount} {totalCount === 1 ? 'item' : 'items'} selected
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            {items.length > 0 && (
              <button
                onClick={clearCart}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.7rem',
                  color: 'var(--cta)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  textDecoration: 'underline',
                }}
              >
                Clear All
              </button>
            )}

            <button
              onClick={() => setIsCartOpen(false)}
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: '#F0ECE4',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1rem',
                cursor: 'pointer',
                color: '#222020',
              }}
              aria-label="Close cart"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Cart Items List */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '1.25rem 1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
          }}
        >
          {items.length === 0 ? (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                color: 'rgba(34,32,32,0.5)',
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: '3.5rem', marginBottom: '1rem', opacity: 0.6 }}>🍽️</div>
              <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', color: '#222020', marginBottom: '0.4rem' }}>
                Your cart is empty
              </h4>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', maxWidth: '240px' }}>
                Click "+ Add" on any dish in the menu to start your order.
              </p>
            </div>
          ) : (
            items.map(item => (
              <div
                key={item.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '0.75rem',
                  padding: '0.85rem 1rem',
                  borderRadius: '0px',
                  backgroundColor: '#FFFFFF',
                  border: '1.5px solid rgba(212, 163, 89, 0.45)',
                  boxShadow: '2px 2px 0px rgba(34, 32, 32, 0.08)',
                }}
              >
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.2rem' }}>
                    <span className={item.veg ? 'veg-dot' : 'nonveg-dot'} style={{ transform: 'scale(0.8)', flexShrink: 0 }} />
                    <span
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.925rem',
                        fontWeight: 600,
                        color: '#222020',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {item.name}
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.85rem',
                        fontWeight: 700,
                        color: 'var(--cta)',
                      }}
                    >
                      ₹{item.price}
                    </span>
                    {item.portion && (
                      <span
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.7rem',
                          color: 'rgba(34,32,32,0.5)',
                        }}
                      >
                        ({item.portion})
                      </span>
                    )}
                  </div>
                </div>

                {/* Counter Stepper Controls — Crisp Square */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    backgroundColor: '#FFFFFF',
                    borderRadius: '0px',
                    border: '1.5px solid #222020',
                    overflow: 'hidden',
                  }}
                >
                  <button
                    onClick={() => removeFromCart(item.id)}
                    style={{
                      width: '28px',
                      height: '28px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: 'none',
                      background: 'none',
                      color: 'var(--cta)',
                      fontWeight: 700,
                      fontSize: '0.9rem',
                      cursor: 'pointer',
                    }}
                  >
                    −
                  </button>
                  <span
                    style={{
                      width: '26px',
                      textAlign: 'center',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      color: '#222020',
                    }}
                  >
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => addToCart(item)}
                    style={{
                      width: '28px',
                      height: '28px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: 'none',
                      background: 'none',
                      color: 'var(--cta)',
                      fontWeight: 700,
                      fontSize: '0.9rem',
                      cursor: 'pointer',
                    }}
                  >
                    +
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Cart Bottom Summary & Checkout */}
        {items.length > 0 && (
          <div
            style={{
              padding: '1.25rem 1.5rem',
              backgroundColor: '#FAF8F5',
              borderTop: '2px solid rgba(212, 163, 89, 0.35)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem', fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'rgba(34,32,32,0.7)' }}>
              <span>Item Total</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 600 }}>₹{totalPrice}</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'rgba(34,32,32,0.7)' }}>
              <span>Govt. GST (5%)</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 600 }}>₹{gstAmount}</span>
            </div>

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                paddingTop: '0.75rem',
                borderTop: '1px dashed rgba(212, 163, 89, 0.5)',
                marginBottom: '1.25rem',
                fontFamily: 'var(--font-display)',
                fontSize: '1.15rem',
                fontWeight: 700,
                color: '#222020',
              }}
            >
              <span>Grand Total</span>
              <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--cta)' }}>₹{grandTotal}</span>
            </div>

            {/* Checkout via WhatsApp CTA */}
            <button
              onClick={handleWhatsAppOrder}
              className="btn btn--primary"
              style={{
                width: '100%',
                padding: '0.85rem',
                fontSize: '0.875rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
              }}
            >
              <span>💬 Order via WhatsApp (₹{grandTotal})</span>
            </button>

            {/* Direct Phone Call backup */}
            <a
              href={`tel:${SITE.phone}`}
              style={{
                display: 'block',
                textAlign: 'center',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                color: 'rgba(34,32,32,0.6)',
                marginTop: '0.75rem',
                textDecoration: 'none',
              }}
            >
              Or call restaurant directly: {SITE.phone}
            </a>
          </div>
        )}
      </div>

      <style>{`
        @keyframes cartFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes cartSlideIn {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
};

export default CartModal;
