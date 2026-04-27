export default function Footer() {
  const cols = [
    { title: 'Shop',  items: ['New Arrivals', 'Dresses', 'Sets', 'Accessories', 'Sale'] },
    { title: 'Help',  items: ['Shipping', 'Returns', 'Size Guide', 'Contact', 'FAQ'] },
    { title: 'About', items: ['Our Story', 'Lookbook', 'Journal', 'Careers'] },
  ];

  return (
    <footer style={{ background: 'var(--ink)', color: 'var(--bone)', padding: '80px 32px 32px', marginTop: 96 }}>
      <div className="footer-grid">
        <div>
          <div style={{ fontFamily: 'var(--font-serif)', fontSize: 24, letterSpacing: '0.28em', marginBottom: 24 }}>TIFFY'S FABRICS</div>
          <div style={{ fontSize: 13, lineHeight: 1.6, opacity: 0.72, marginBottom: 24, maxWidth: 360 }}>
            Join the list for first access to drops, events, and the occasional private sale.
          </div>
          <div style={{ display: 'flex', borderBottom: '1px solid rgba(245,240,232,0.4)' }}>
            <input
              placeholder="Email address"
              style={{ flex: 1, background: 'transparent', border: 0, padding: '12px 0', color: 'var(--bone)', fontFamily: 'var(--font-sans)', fontSize: 13, outline: 'none' }}
            />
            <button style={{ background: 'transparent', border: 0, color: 'var(--bone)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 500, cursor: 'pointer' }}>
              Subscribe →
            </button>
          </div>
        </div>
        {cols.map(c => (
          <div key={c.title}>
            <div style={{ fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 500, marginBottom: 20, opacity: 0.72 }}>{c.title}</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {c.items.map(i => (
                <a key={i} style={{ fontSize: 13, opacity: 0.88, cursor: 'pointer' }}>{i}</a>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="footer-bottom" style={{ marginTop: 64, paddingTop: 24, borderTop: '1px solid rgba(245,240,232,0.14)', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', opacity: 0.6, maxWidth: 1440, margin: '64px auto 0' }}>
        <span>© 2026 Tiffy's Fabrics</span>
        <div style={{ display: 'flex', gap: 20 }}>
          <a style={{ cursor: 'pointer' }}>Instagram</a>
          <a style={{ cursor: 'pointer' }}>TikTok</a>
          <a style={{ cursor: 'pointer' }}>Pinterest</a>
        </div>
        <span>Sydney · Los Angeles</span>
      </div>
    </footer>
  );
}
