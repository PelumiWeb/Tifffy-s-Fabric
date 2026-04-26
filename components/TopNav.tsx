'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/lib/CartContext';

export default function TopNav() {
  const [hovered, setHovered] = useState<string | null>(null);
  const { openCart, totalCount } = useCart();
  const links = ['New', 'Dresses', 'Sets', 'Sale'];

  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 40, background: 'var(--bone)' }}>
      <div style={{ background: 'var(--ink)', color: 'var(--bone)', textAlign: 'center', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', padding: '10px', fontWeight: 500 }}>
        Free express over $200 — ships within 24 hours
      </div>
      <nav style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center', padding: '22px 32px', borderBottom: '1px solid var(--line-soft)' }}>
        <div style={{ display: 'flex', gap: 28, fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 500 }}>
          {links.map(l => (
            <Link
              key={l}
              href="/shop"
              onMouseEnter={() => setHovered(l)}
              onMouseLeave={() => setHovered(null)}
              style={{
                cursor: 'pointer',
                position: 'relative',
                paddingBottom: 2,
                backgroundImage: 'linear-gradient(var(--ink),var(--ink))',
                backgroundSize: (hovered === l ? '100%' : '0%') + ' 1px',
                backgroundPosition: '0 100%',
                backgroundRepeat: 'no-repeat',
                transition: 'background-size 220ms var(--ease)',
                color: l === 'Sale' ? 'var(--rouge)' : 'var(--ink)',
              }}
            >
              {l}
            </Link>
          ))}
        </div>
        <Link href="/" style={{ fontFamily: 'var(--font-serif)', fontSize: 22, letterSpacing: '0.28em', textAlign: 'center', whiteSpace: 'nowrap', color: 'var(--ink)' }}>
          TIFFY'S&nbsp;FABRICS
        </Link>
        <div style={{ display: 'flex', gap: 24, justifyContent: 'flex-end', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 500, alignItems: 'center' }}>
          <span style={{ cursor: 'pointer', whiteSpace: 'nowrap' }}>Search</span>
          <span style={{ cursor: 'pointer', whiteSpace: 'nowrap' }}>Account</span>
          <button onClick={openCart} style={{ background: 'transparent', border: 0, padding: 0, fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 500, cursor: 'pointer', whiteSpace: 'nowrap', color: 'var(--ink)' }}>
            Bag — {totalCount}
          </button>
        </div>
      </nav>
    </header>
  );
}
