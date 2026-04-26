'use client';

import { useEffect } from 'react';
import { useCart } from '@/lib/CartContext';
import { useRouter } from 'next/navigation';

function Line({ l, v }: { l: string; v: string }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', fontSize: 13 }}>
      <span style={{ color: 'var(--fg-2)' }}>{l}</span>
      <span style={{ fontVariantNumeric: 'tabular-nums' }}>{v}</span>
    </div>
  );
}

export default function CheckoutPage() {
  const { items, removeFromCart } = useCart();
  const router = useRouter();
  const subtotal = items.reduce((a, i) => a + (i.salePrice || i.price) * i.qty, 0);
  const shipping = subtotal > 200 ? 0 : 15;
  const total = subtotal + shipping;

  const handlePlace = () => {
    alert('Order placed — this is a UI kit demo.');
    router.push('/');
  };

  useEffect(() => {
    if (items.length === 0) router.push('/');
  }, [items.length, router]);

  if (items.length === 0) return null;

  return (
    <div style={{ minHeight: '100vh', display: 'grid', gridTemplateColumns: '1.3fr 1fr' }}>
      {/* Form side */}
      <div style={{ padding: '48px 64px', maxWidth: 640, justifySelf: 'end', width: '100%' }}>
        <button onClick={() => router.back()} style={{ background: 'transparent', border: 0, padding: 0, fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--fg-2)', marginBottom: 32, cursor: 'pointer' }}>← Back to shopping</button>
        <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 36, lineHeight: 1.1, margin: '0 0 32px', fontWeight: 400 }}>Checkout</h2>

        <div style={{ marginBottom: 40 }}>
          <div style={{ fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--fg-2)', marginBottom: 16, fontWeight: 500 }}>01 — Contact</div>
          <input className="field__input" placeholder="Email address" defaultValue="you@studio.co" />
        </div>

        <div style={{ marginBottom: 40 }}>
          <div style={{ fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--fg-2)', marginBottom: 16, fontWeight: 500 }}>02 — Delivery</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <input className="field__input" placeholder="First name" />
            <input className="field__input" placeholder="Last name" />
            <input className="field__input" placeholder="Address" style={{ gridColumn: '1 / -1' }} />
            <input className="field__input" placeholder="City" />
            <input className="field__input" placeholder="Postal code" />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 20 }}>
            {[
              { k: 'express',  l: 'Express — 1–2 business days', p: 'Free over $200' },
              { k: 'standard', l: 'Standard — 3–5 business days', p: '$9' },
            ].map((o, i) => (
              <label key={o.k} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 18px', border: '1px solid ' + (i === 0 ? 'var(--ink)' : 'var(--line)'), cursor: 'pointer', background: i === 0 ? 'var(--cream)' : 'transparent' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ width: 14, height: 14, borderRadius: 999, border: '1px solid var(--ink)', position: 'relative', background: i === 0 ? 'var(--ink)' : 'transparent', flexShrink: 0 }}>
                    {i === 0 && <span style={{ position: 'absolute', inset: 3, background: 'var(--bone)', borderRadius: 999 }} />}
                  </span>
                  <span style={{ fontSize: 13 }}>{o.l}</span>
                </span>
                <span style={{ fontSize: 13, color: 'var(--fg-2)' }}>{o.p}</span>
              </label>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: 40 }}>
          <div style={{ fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--fg-2)', marginBottom: 16, fontWeight: 500 }}>03 — Payment</div>
          <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
            {['Card', 'Shop Pay', 'Apple Pay', 'PayPal'].map((m, i) => (
              <div key={m} style={{ flex: 1, padding: '12px', textAlign: 'center', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 500, border: '1px solid ' + (i === 0 ? 'var(--ink)' : 'var(--line)'), background: i === 0 ? 'var(--cream)' : 'transparent', cursor: 'pointer' }}>{m}</div>
            ))}
          </div>
          <input className="field__input" placeholder="Card number" style={{ fontFamily: 'var(--font-mono)', marginBottom: 12 }} />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <input className="field__input" placeholder="MM / YY" style={{ fontFamily: 'var(--font-mono)' }} />
            <input className="field__input" placeholder="CVC" style={{ fontFamily: 'var(--font-mono)' }} />
          </div>
        </div>

        <button onClick={handlePlace} className="btn btn--primary" style={{ width: '100%' }}>Place Order · ${total}</button>
      </div>

      {/* Order summary side */}
      <aside style={{ background: 'var(--cream)', padding: '48px 64px' }}>
        <div style={{ fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--fg-2)', marginBottom: 24, fontWeight: 500 }}>Order Summary</div>
        {items.map(item => (
          <div key={item.id + item.size + item.color} style={{ display: 'grid', gridTemplateColumns: '72px 1fr auto', gap: 14, alignItems: 'center', padding: '16px 0', borderBottom: '1px solid var(--line-soft)' }}>
            <div className={'ph ' + item.ph} style={{ aspectRatio: '4/5' }} />
            <div>
              <div style={{ fontSize: 13 }}>{item.name}</div>
              <div style={{ fontSize: 11, color: 'var(--fg-2)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{item.color} · {item.size}</div>
            </div>
            <div style={{ fontSize: 13, fontVariantNumeric: 'tabular-nums' }}>${(item.salePrice || item.price) * item.qty}</div>
          </div>
        ))}
        <div style={{ marginTop: 28 }}>
          <Line l="Subtotal" v={'$' + subtotal} />
          <Line l="Shipping" v={shipping === 0 ? 'Free' : '$' + shipping} />
          <div style={{ height: 1, background: 'var(--line)', margin: '16px 0' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 17, fontFamily: 'var(--font-serif)' }}>
            <span>Total</span>
            <span style={{ fontVariantNumeric: 'tabular-nums' }}>${total} USD</span>
          </div>
        </div>
      </aside>
    </div>
  );
}
