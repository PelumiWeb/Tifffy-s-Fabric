'use client';

import { useCart } from '@/lib/CartContext';
import { useRouter } from 'next/navigation';

export default function CartDrawer() {
  const { items, cartOpen, closeCart, removeFromCart } = useCart();
  const router = useRouter();
  const subtotal = items.reduce((a, i) => a + (i.salePrice || i.price) * i.qty, 0);

  const handleCheckout = () => {
    closeCart();
    router.push('/checkout');
  };

  return (
    <>
      <div
        onClick={closeCart}
        style={{ position: 'fixed', inset: 0, background: 'rgba(26,22,20,0.4)', opacity: cartOpen ? 1 : 0, pointerEvents: cartOpen ? 'auto' : 'none', transition: 'opacity 240ms var(--ease)', zIndex: 60 }}
      />
      <aside style={{ position: 'fixed', top: 0, right: 0, bottom: 0, width: 440, maxWidth: '100vw', background: 'var(--bone)', transform: cartOpen ? 'translateX(0)' : 'translateX(100%)', transition: 'transform 240ms var(--ease)', zIndex: 61, display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '24px 28px', borderBottom: '1px solid var(--line-soft)' }}>
          <span style={{ fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 500 }}>Your Bag — {items.length}</span>
          <button onClick={closeCart} style={{ background: 'transparent', border: 0, padding: 4, cursor: 'pointer' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M18 6 6 18M6 6l12 12"/></svg>
          </button>
        </div>
        <div style={{ flex: 1, overflowY: 'auto', padding: '8px 28px' }}>
          {items.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--fg-2)' }}>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: 28, color: 'var(--ink)', marginBottom: 12 }}>Your bag is empty.</div>
              <div style={{ fontSize: 13 }}>Start with the new edit.</div>
            </div>
          ) : items.map(item => (
            <div key={item.id + item.size + item.color} style={{ display: 'grid', gridTemplateColumns: '80px 1fr', gap: 16, padding: '20px 0', borderBottom: '1px solid var(--line-soft)' }}>
              <div className={'ph ' + item.ph} style={{ aspectRatio: '4/5' }} />
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontSize: 13, marginBottom: 4 }}>{item.name}</div>
                  <div style={{ fontSize: 11, color: 'var(--fg-2)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{item.color} · {item.size} · Qty {item.qty}</div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <button onClick={() => removeFromCart(item)} style={{ background: 'transparent', border: 0, padding: 0, fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--fg-2)', borderBottom: '1px solid var(--line)', cursor: 'pointer' }}>Remove</button>
                  <span style={{ fontSize: 13, fontVariantNumeric: 'tabular-nums' }}>${(item.salePrice || item.price) * item.qty}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        {items.length > 0 && (
          <div style={{ padding: '24px 28px', borderTop: '1px solid var(--line-soft)', background: 'var(--bone)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4, fontSize: 13 }}>
              <span>Subtotal</span>
              <span style={{ fontVariantNumeric: 'tabular-nums' }}>${subtotal}</span>
            </div>
            <div style={{ fontSize: 11, color: 'var(--fg-2)', marginBottom: 20 }}>Shipping calculated at checkout.</div>
            <button onClick={handleCheckout} className="btn btn--primary" style={{ width: '100%' }}>Checkout · ${subtotal}</button>
          </div>
        )}
      </aside>
    </>
  );
}
