'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

type Product = {
  id: string;
  name: string;
  price: number;
  sale_price: number | null;
  colors: number;
  tag: string | null;
  image_urls: string[];
  created_at: string;
};

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [deleting, setDeleting] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => { load(); }, []);

  async function load() {
    setLoading(true);
    setLoadError('');
    try {
      const res = await fetch('/api/products');
      const data = await res.json();
      if (!res.ok) {
        setLoadError(data.error ?? `Server error ${res.status}`);
        setProducts([]);
      } else {
        setProducts(Array.isArray(data) ? data : []);
      }
    } catch (e) {
      setLoadError('Failed to connect to the server.');
      setProducts([]);
    }
    setLoading(false);
  }

  async function deleteProduct(id: string) {
    if (!confirm(`Delete "${id}"? This cannot be undone.`)) return;
    setDeleting(id);
    await fetch(`/api/products/${id}`, { method: 'DELETE' });
    setProducts(prev => prev.filter(p => p.id !== id));
    setDeleting(null);
  }

  const th: React.CSSProperties = { textAlign: 'left', padding: '10px 16px', fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#888', borderBottom: '1px solid #eee', whiteSpace: 'nowrap' };
  const td: React.CSSProperties = { padding: '14px 16px', fontSize: 14, borderBottom: '1px solid #f0f0f0', verticalAlign: 'middle' };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 700, margin: 0 }}>Products</h1>
          {!loading && <p style={{ margin: '4px 0 0', color: '#888', fontSize: 13 }}>{products.length} total</p>}
        </div>
        <button
          onClick={() => router.push('/admin/products/new')}
          style={{ background: '#1a1a1a', color: '#f5f0e8', border: 0, borderRadius: 6, padding: '10px 20px', fontSize: 13, fontWeight: 600, letterSpacing: '0.06em', cursor: 'pointer' }}
        >
          + New Product
        </button>
      </div>

      {loadError && (
        <div style={{ background: '#fff0f0', border: '1px solid #fcc', borderRadius: 8, padding: '16px 20px', marginBottom: 24, fontSize: 14, color: '#c00' }}>
          <strong>Could not load products:</strong> {loadError}
          <div style={{ marginTop: 8, fontSize: 12, color: '#888' }}>Make sure you have run the setup SQL in your Supabase dashboard to create the products table.</div>
        </div>
      )}

      {loading ? (
        <div style={{ textAlign: 'center', padding: 60, color: '#aaa', fontSize: 14 }}>Loading…</div>
      ) : !loadError && products.length === 0 ? (
        <div style={{ textAlign: 'center', padding: 80, background: '#fff', borderRadius: 10, color: '#aaa' }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>📦</div>
          <div style={{ fontSize: 16, marginBottom: 8, color: '#555' }}>No products yet</div>
          <button onClick={() => router.push('/admin/products/new')} style={{ marginTop: 12, background: '#1a1a1a', color: '#f5f0e8', border: 0, borderRadius: 6, padding: '10px 20px', fontSize: 13, cursor: 'pointer' }}>
            Add your first product
          </button>
        </div>
      ) : (
        <div style={{ background: '#fff', borderRadius: 10, overflow: 'hidden', boxShadow: '0 1px 6px rgba(0,0,0,0.06)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={th}>Image</th>
                <th style={th}>Name</th>
                <th style={th}>ID</th>
                <th style={th}>Price</th>
                <th style={th}>Tag</th>
                <th style={th}>Colors</th>
                <th style={th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map(p => (
                <tr key={p.id} style={{ transition: 'background 150ms' }} onMouseEnter={e => (e.currentTarget.style.background = '#fafafa')} onMouseLeave={e => (e.currentTarget.style.background = '')}>
                  <td style={td}>
                    {p.image_urls?.[0] ? (
                      <img src={p.image_urls[0]} alt={p.name} style={{ width: 48, height: 60, objectFit: 'cover', borderRadius: 4 }} />
                    ) : (
                      <div style={{ width: 48, height: 60, background: '#eee', borderRadius: 4 }} />
                    )}
                  </td>
                  <td style={{ ...td, fontWeight: 600 }}>{p.name}</td>
                  <td style={{ ...td, color: '#888', fontSize: 12, fontFamily: 'monospace' }}>{p.id}</td>
                  <td style={td}>
                    <span>${p.price}</span>
                    {p.sale_price && <span style={{ marginLeft: 6, color: '#c0392b', fontSize: 12 }}>${p.sale_price}</span>}
                  </td>
                  <td style={td}>
                    {p.tag ? (
                      <span style={{ background: p.tag === 'Sale' ? '#fff0f0' : '#f0f7ff', color: p.tag === 'Sale' ? '#c0392b' : '#2563eb', padding: '2px 8px', borderRadius: 4, fontSize: 11, fontWeight: 600 }}>
                        {p.tag}
                      </span>
                    ) : '—'}
                  </td>
                  <td style={td}>{p.colors}</td>
                  <td style={td}>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button
                        onClick={() => router.push(`/admin/products/${p.id}`)}
                        style={{ background: '#f0f0f0', border: 0, borderRadius: 5, padding: '6px 14px', fontSize: 12, cursor: 'pointer', fontWeight: 500 }}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteProduct(p.id)}
                        disabled={deleting === p.id}
                        style={{ background: '#fff0f0', border: 0, borderRadius: 5, padding: '6px 14px', fontSize: 12, cursor: 'pointer', color: '#c0392b', fontWeight: 500, opacity: deleting === p.id ? 0.5 : 1 }}
                      >
                        {deleting === p.id ? '…' : 'Delete'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
