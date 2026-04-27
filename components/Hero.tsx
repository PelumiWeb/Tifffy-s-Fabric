'use client';

import Link from 'next/link';

export default function Hero() {
  return (
    <section style={{ position: 'relative', height: '82vh', minHeight: 560, overflow: 'hidden' }}>
      <div className="ph ph-ink" style={{ position: 'absolute', inset: 0 }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(26,22,20,0.55), transparent 55%)' }} />
      <div className="hero-content" style={{ position: 'absolute', left: 48, bottom: 56, color: 'var(--bone)', maxWidth: 640 }}>
        <div style={{ fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', opacity: 0.8, marginBottom: 18, fontWeight: 500 }}>
          The Slip Edit · SS26
        </div>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(36px, 6vw, 88px)', lineHeight: 1.02, letterSpacing: '-0.01em', margin: 0, fontWeight: 400 }}>
          Silhouettes built<br />for standing still<br /><em style={{ fontStyle: 'italic' }}>and making people look.</em>
        </h1>
        <div style={{ display: 'flex', gap: 12, marginTop: 32, flexWrap: 'wrap' }}>
          <Link href="/shop" className="btn btn--primary" style={{ background: 'var(--bone)', color: 'var(--ink)' }}>Shop the Edit</Link>
          <button className="btn btn--secondary" style={{ borderColor: 'var(--bone)', color: 'var(--bone)' }}>View Lookbook</button>
        </div>
      </div>
      <div style={{ position: 'absolute', right: 32, bottom: 32, color: 'var(--bone)', fontFamily: 'var(--font-mono)', fontSize: 11, opacity: 0.6 }}>01 / 03</div>
    </section>
  );
}
