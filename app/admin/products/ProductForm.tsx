'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

type FormValues = {
  id: string;
  name: string;
  price: string;
  sale_price: string;
  colors: string;
  tag: string;
};

type Props = {
  initial?: FormValues & { image_urls?: string[] };
  mode: 'new' | 'edit';
};

const EMPTY: FormValues = { id: '', name: '', price: '', sale_price: '', colors: '1', tag: '' };

export default function ProductForm({ initial, mode }: Props) {
  const [values, setValues] = useState<FormValues>(initial ?? EMPTY);
  const [images, setImages] = useState<string[]>(initial?.image_urls ?? []);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  function set(field: keyof FormValues) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const v = e.target.value;
      setValues(prev => {
        const next = { ...prev, [field]: v };
        if (field === 'name' && mode === 'new') {
          next.id = v.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        }
        return next;
      });
    };
  }

  async function uploadFiles(files: FileList) {
    setUploading(true);
    const urls: string[] = [];
    for (const file of Array.from(files)) {
      const fd = new FormData();
      fd.append('file', file);
      const res = await fetch('/api/upload', { method: 'POST', body: fd });
      const json = await res.json();
      if (json.url) urls.push(json.url);
    }
    setImages(prev => [...prev, ...urls]);
    setUploading(false);
  }

  function removeImage(url: string) {
    setImages(prev => prev.filter(u => u !== url));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setSaving(true);

    const body = {
      id: values.id,
      name: values.name,
      price: parseFloat(values.price),
      sale_price: values.sale_price ? parseFloat(values.sale_price) : null,
      colors: parseInt(values.colors) || 1,
      tag: values.tag || null,
      image_urls: images,
    };

    const url = mode === 'new' ? '/api/products' : `/api/products/${initial!.id}`;
    const method = mode === 'new' ? 'POST' : 'PUT';
    const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
    const json = await res.json();

    if (!res.ok) {
      setError(json.error ?? 'Something went wrong');
      setSaving(false);
      return;
    }
    router.push('/admin/products');
    router.refresh();
  }

  const label: React.CSSProperties = { fontSize: 12, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#555', display: 'block', marginBottom: 6 };
  const input: React.CSSProperties = { width: '100%', padding: '11px 13px', border: '1px solid #ddd', borderRadius: 6, fontSize: 14, fontFamily: 'inherit', boxSizing: 'border-box', outline: 'none' };

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        {/* Name */}
        <div style={{ gridColumn: '1 / -1' }}>
          <label style={label}>Product Name</label>
          <input style={input} value={values.name} onChange={set('name')} required placeholder="e.g. Naia Corset Mini" />
        </div>

        {/* ID */}
        <div style={{ gridColumn: '1 / -1' }}>
          <label style={label}>Product ID (slug)</label>
          <input style={{ ...input, fontFamily: 'monospace', color: '#555' }} value={values.id} onChange={set('id')} required placeholder="naia-corset-mini" disabled={mode === 'edit'} />
          {mode === 'edit' && <span style={{ fontSize: 11, color: '#aaa', marginTop: 4, display: 'block' }}>ID cannot be changed after creation.</span>}
        </div>

        {/* Price */}
        <div>
          <label style={label}>Price ($)</label>
          <input style={input} type="number" min="0" step="0.01" value={values.price} onChange={set('price')} required placeholder="229" />
        </div>

        {/* Sale Price */}
        <div>
          <label style={label}>Sale Price ($) — optional</label>
          <input style={input} type="number" min="0" step="0.01" value={values.sale_price} onChange={set('sale_price')} placeholder="159" />
        </div>

        {/* Colors */}
        <div>
          <label style={label}>Number of Colors</label>
          <input style={input} type="number" min="1" max="10" value={values.colors} onChange={set('colors')} required />
        </div>

        {/* Tag */}
        <div>
          <label style={label}>Tag</label>
          <select style={{ ...input, background: '#fff' }} value={values.tag} onChange={set('tag')}>
            <option value="">None</option>
            <option value="New">New</option>
            <option value="Sale">Sale</option>
          </select>
        </div>

        {/* Images */}
        <div style={{ gridColumn: '1 / -1' }}>
          <label style={label}>Product Images</label>

          {images.length > 0 && (
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 14 }}>
              {images.map((url, i) => (
                <div key={url} style={{ position: 'relative' }}>
                  <img src={url} alt="" style={{ width: 88, height: 110, objectFit: 'cover', borderRadius: 6, border: i === 0 ? '2px solid #1a1a1a' : '2px solid transparent' }} />
                  {i === 0 && <span style={{ position: 'absolute', bottom: 4, left: 4, background: '#1a1a1a', color: '#fff', fontSize: 9, padding: '2px 5px', borderRadius: 3 }}>Main</span>}
                  <button type="button" onClick={() => removeImage(url)} style={{ position: 'absolute', top: 4, right: 4, background: 'rgba(0,0,0,0.6)', color: '#fff', border: 0, borderRadius: '50%', width: 20, height: 20, cursor: 'pointer', fontSize: 12, lineHeight: '20px', textAlign: 'center', padding: 0 }}>×</button>
                </div>
              ))}
            </div>
          )}

          <label style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 16px', border: '1px dashed #ccc', borderRadius: 6, cursor: 'pointer', fontSize: 13, color: '#666' }}>
            {uploading ? 'Uploading…' : '+ Add images'}
            <input type="file" accept="image/*" multiple style={{ display: 'none' }} onChange={e => e.target.files && uploadFiles(e.target.files)} disabled={uploading} />
          </label>
          <span style={{ fontSize: 11, color: '#aaa', marginLeft: 10 }}>First image will be shown as the main photo.</span>
        </div>
      </div>

      {error && (
        <div style={{ marginTop: 20, background: '#fff0f0', border: '1px solid #fcc', borderRadius: 6, padding: '10px 14px', fontSize: 13, color: '#c00' }}>{error}</div>
      )}

      <div style={{ display: 'flex', gap: 12, marginTop: 32 }}>
        <button type="submit" disabled={saving || uploading} style={{ background: '#1a1a1a', color: '#f5f0e8', border: 0, borderRadius: 6, padding: '12px 28px', fontSize: 13, fontWeight: 600, letterSpacing: '0.08em', cursor: saving ? 'not-allowed' : 'pointer', opacity: saving ? 0.7 : 1 }}>
          {saving ? 'Saving…' : mode === 'new' ? 'Create Product' : 'Save Changes'}
        </button>
        <button type="button" onClick={() => router.push('/admin/products')} style={{ background: 'transparent', border: '1px solid #ddd', borderRadius: 6, padding: '12px 20px', fontSize: 13, cursor: 'pointer', color: '#555' }}>
          Cancel
        </button>
      </div>
    </form>
  );
}
