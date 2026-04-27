'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/lib/CartContext';

export default function TopNav() {
  const [hovered, setHovered] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const { openCart, totalCount } = useCart();
  const links = ['New', 'Dresses', 'Sets', 'Sale'];

  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 40, background: 'var(--bone)' }}>
      <div style={{ background: 'var(--ink)', color: 'var(--bone)', textAlign: 'center', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', padding: '10px', fontWeight: 500 }}>
        Free express over $200 — ships within 24 hours
      </div>

      {/* Desktop nav */}
      <nav className="nav-desktop" style={{ gridTemplateColumns: '1fr auto 1fr', alignItems: 'center', padding: '22px 32px', borderBottom: '1px solid var(--line-soft)' }}>
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
          <Link href="/admin" style={{ cursor: 'pointer', whiteSpace: 'nowrap', color: 'var(--ink)' }}>Account</Link>
          <button onClick={openCart} style={{ background: 'transparent', border: 0, padding: 0, fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 500, cursor: 'pointer', whiteSpace: 'nowrap', color: 'var(--ink)' }}>
            Bag — {totalCount}
          </button>
        </div>
      </nav>

      {/* Mobile nav */}
      <nav className="nav-mobile" style={{ alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', borderBottom: '1px solid var(--line-soft)' }}>
        <button
          onClick={() => setMenuOpen(o => !o)}
          style={{ background: 'transparent', border: 0, padding: 4, cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: 5 }}
          aria-label="Menu"
        >
          <span style={{ display: 'block', width: 22, height: 1.5, background: 'var(--ink)', transition: `transform 200ms var(--ease), opacity 200ms`, transform: menuOpen ? 'translateY(6.5px) rotate(45deg)' : 'none' }} />
          <span style={{ display: 'block', width: 22, height: 1.5, background: 'var(--ink)', opacity: menuOpen ? 0 : 1, transition: 'opacity 200ms' }} />
          <span style={{ display: 'block', width: 22, height: 1.5, background: 'var(--ink)', transition: `transform 200ms var(--ease), opacity 200ms`, transform: menuOpen ? 'translateY(-6.5px) rotate(-45deg)' : 'none' }} />
        </button>

        <Link href="/" style={{ fontFamily: 'var(--font-serif)', fontSize: 18, letterSpacing: '0.24em', color: 'var(--ink)', position: 'absolute', left: '50%', transform: 'translateX(-50%)', whiteSpace: 'nowrap' }}>
          TIFFY'S&nbsp;FABRICS
        </Link>

        <button onClick={openCart} style={{ background: 'transparent', border: 0, padding: 4, fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 500, cursor: 'pointer', color: 'var(--ink)' }}>
          Bag {totalCount > 0 && `(${totalCount})`}
        </button>
      </nav>

      {/* Mobile menu drawer */}
      {menuOpen && (
        <div style={{ background: 'var(--bone)', borderBottom: '1px solid var(--line-soft)', padding: '8px 0 20px' }}>
          {links.map(l => (
            <Link
              key={l}
              href="/shop"
              onClick={() => setMenuOpen(false)}
              style={{ display: 'block', padding: '14px 24px', fontSize: 13, fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: l === 'Sale' ? 'var(--rouge)' : 'var(--ink)', borderBottom: '1px solid var(--line-soft)' }}
            >
              {l}
            </Link>
          ))}
          <div style={{ display: 'flex', gap: 0, marginTop: 8 }}>
            <span style={{ display: 'block', padding: '14px 24px', fontSize: 13, fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--fg-2)', cursor: 'pointer', flex: 1 }}>Search</span>
            <Link href="/admin" onClick={() => setMenuOpen(false)} style={{ display: 'block', padding: '14px 24px', fontSize: 13, fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--fg-2)', flex: 1 }}>Account</Link>
          </div>
        </div>
      )}
    </header>
  );
}
