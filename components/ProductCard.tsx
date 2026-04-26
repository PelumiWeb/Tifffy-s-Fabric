'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Product } from '@/lib/products';

export default function ProductCard({ product }: { product: Product }) {
  const [hover, setHover] = useState(false);
  const altPh = product.ph === 'ph-ink' ? 'ph-rouge' : 'ph-ink';

  return (
    <Link href={`/shop/${product.id}`} style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: 12, textDecoration: 'none' }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div style={{ position: 'relative', aspectRatio: '4 / 5', overflow: 'hidden' }}>
        {product.image_urls && product.image_urls.length > 0 ? (
          <>
            <img src={product.image_urls[0]} alt={product.name} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', transition: 'opacity 400ms var(--ease)', opacity: hover && product.image_urls.length > 1 ? 0 : 1 }} />
            {product.image_urls[1] && (
              <img src={product.image_urls[1]} alt={product.name} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', transition: 'opacity 400ms var(--ease)', opacity: hover ? 1 : 0 }} />
            )}
          </>
        ) : (
          <>
            <div className={'ph ' + product.ph} style={{ position: 'absolute', inset: 0, transition: 'opacity 400ms var(--ease)', opacity: hover ? 0 : 1 }} />
            <div className={'ph ' + altPh} style={{ position: 'absolute', inset: 0, transition: 'opacity 400ms var(--ease)', opacity: hover ? 1 : 0 }} />
          </>
        )}
        {product.tag && (
          <span style={{ position: 'absolute', top: 14, left: 14, fontSize: 10, fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--bone)', background: product.tag === 'Sale' ? 'var(--rouge)' : 'var(--ink)', padding: '4px 8px' }}>
            {product.tag}
          </span>
        )}
        <button
          aria-label="Wishlist"
          onClick={e => e.preventDefault()}
          style={{ position: 'absolute', top: 12, right: 12, background: 'transparent', border: 0, color: 'var(--bone)', opacity: 0.9, padding: 4, cursor: 'pointer' }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>
      </div>
      <div style={{ fontSize: 13, color: 'var(--fg-1)' }}>{product.name}</div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <span style={{ fontSize: 11, color: 'var(--fg-2)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{product.colors} colors</span>
        <div style={{ display: 'flex', gap: 8, fontSize: 13, fontVariantNumeric: 'tabular-nums' }}>
          {product.salePrice ? (
            <>
              <span style={{ color: 'var(--fg-3)', textDecoration: 'line-through' }}>${product.price}</span>
              <span style={{ color: 'var(--rouge)', fontWeight: 500 }}>${product.salePrice}</span>
            </>
          ) : <span>${product.price}</span>}
        </div>
      </div>
    </Link>
  );
}
