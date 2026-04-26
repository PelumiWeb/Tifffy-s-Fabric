'use client';

import { useState } from 'react';
import { useCart } from '@/lib/CartContext';
import { Product } from '@/lib/products';

const COLORS = [
  { name: 'Black', hex: '#1A1614' },
  { name: 'Rouge', hex: '#7A1F23' },
  { name: 'Bone',  hex: '#E8DFD1' },
  { name: 'Olive', hex: '#3D4A3A' },
];
const SIZES = ['XS', 'S', 'M', 'L', 'XL'];
const OOS = ['XL'];

function Accordion({ title, children, defaultOpen = false }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div style={{ borderBottom: '1px solid var(--line-soft)' }}>
      <button onClick={() => setOpen(o => !o)} style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'transparent', border: 0, padding: '20px 0', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 500, color: 'var(--ink)', cursor: 'pointer' }}>
        {title}
        <span style={{ fontSize: 18, fontWeight: 300 }}>{open ? '−' : '+'}</span>
      </button>
      {open && <div style={{ padding: '0 0 24px', fontSize: 14, lineHeight: 1.6, color: 'var(--fg-1)' }}>{children}</div>}
    </div>
  );
}

export default function ProductDetail({ product }: { product: Product }) {
  const [size, setSize] = useState('S');
  const [color, setColor] = useState(COLORS[0]);
  const { addToCart, openCart } = useCart();
  const hasImages = product.image_urls && product.image_urls.length > 0;
  const phs = [product.ph, 'ph-sand', 'ph-ink', 'ph-cream'];
  const colors = COLORS.slice(0, product.colors);

  const handleAdd = () => {
    addToCart({ ...product, size, color: color.name, qty: 1 });
    openCart();
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 64, alignItems: 'flex-start' }}>
      {/* Gallery */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
        {hasImages
          ? product.image_urls!.slice(0, 4).map((url, i) => (
              <img key={i} src={url} alt={product.name} style={{ aspectRatio: '4 / 5', width: '100%', objectFit: 'cover' }} />
            ))
          : phs.map((p, i) => (
              <div key={i} className={'ph ' + p} style={{ aspectRatio: '4 / 5' }} />
            ))
        }
      </div>

      {/* Details */}
      <div style={{ position: 'sticky', top: 140, paddingTop: 8, display: 'flex', flexDirection: 'column', gap: 28 }}>
        <div>
          <div style={{ fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--fg-2)', marginBottom: 12, fontWeight: 500 }}>The Slip Edit</div>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 40, lineHeight: 1.05, margin: 0, fontWeight: 400 }}>{product.name}</h1>
          <div style={{ display: 'flex', gap: 12, marginTop: 16, fontSize: 17, fontVariantNumeric: 'tabular-nums' }}>
            {product.salePrice ? (
              <>
                <span style={{ color: 'var(--fg-3)', textDecoration: 'line-through' }}>${product.price}</span>
                <span style={{ color: 'var(--rouge)', fontWeight: 500 }}>${product.salePrice}</span>
              </>
            ) : <span>${product.price}</span>}
          </div>
        </div>

        <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6, color: 'var(--fg-1)', maxWidth: 420 }}>
          Backless. Bias-cut. Built to move. A floor-sweeping slip in heavyweight satin with a cowl back and adjustable straps.
        </p>

        {/* Color picker */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
            <span style={{ fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--fg-2)', fontWeight: 500 }}>Color — {color.name}</span>
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            {colors.map(c => (
              <button key={c.name} onClick={() => setColor(c)} aria-label={c.name} style={{ width: 28, height: 28, borderRadius: 999, background: c.hex, border: '1px solid var(--line)', padding: 0, position: 'relative', cursor: 'pointer' }}>
                {color.name === c.name && <span style={{ position: 'absolute', inset: -5, border: '1px solid var(--ink)', borderRadius: 999 }} />}
              </button>
            ))}
          </div>
        </div>

        {/* Size picker */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
            <span style={{ fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--fg-2)', fontWeight: 500 }}>Size</span>
            <a style={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--fg-2)', cursor: 'pointer', borderBottom: '1px solid var(--line)' }}>Find your fit</a>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            {SIZES.map(s => {
              const isOos = OOS.includes(s);
              const sel = size === s;
              return (
                <button key={s} disabled={isOos} onClick={() => setSize(s)} style={{ width: 54, height: 54, border: '1px solid ' + (sel ? 'var(--ink)' : 'var(--line)'), background: sel ? 'var(--ink)' : 'transparent', color: sel ? 'var(--bone)' : isOos ? 'var(--fg-3)' : 'var(--ink)', fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 500, textDecoration: isOos ? 'line-through' : 'none', cursor: isOos ? 'not-allowed' : 'pointer', transition: 'all 180ms var(--ease)' }}>
                  {s}
                </button>
              );
            })}
          </div>
        </div>

        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={handleAdd} className="btn btn--primary" style={{ flex: 1 }}>
            Add to Bag · ${product.salePrice || product.price}
          </button>
          <button className="btn btn--secondary" aria-label="Wishlist" style={{ width: 54, padding: 0 }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--fg-2)' }}>
          <span style={{ width: 6, height: 6, background: 'var(--success)', borderRadius: 999, flexShrink: 0 }} />
          In stock · Ships within 24 hours
        </div>

        <div style={{ marginTop: 16 }}>
          <Accordion title="Description" defaultOpen>
            <ul style={{ margin: 0, paddingLeft: 18, lineHeight: 1.8 }}>
              <li>92% triacetate, 8% polyester</li>
              <li>Model is 178cm and wears a S</li>
              <li>Adjustable straps, concealed back zip</li>
              <li>Dry clean only</li>
            </ul>
          </Accordion>
          <Accordion title="Delivery">
            Free express over $200 — ships within 24 hours. Standard $9 · 3–5 business days. Express $15 · 1–2 business days.
          </Accordion>
          <Accordion title="Returns">
            30-day free returns on full-priced items. Sale items are final sale. Start a return from your account or use the returns portal.
          </Accordion>
          <Accordion title="Size & Fit">
            True to size. For between sizes, size down for a body-conscious fit. Length: 142cm from shoulder to hem on a size S.
          </Accordion>
        </div>
      </div>
    </div>
  );
}
