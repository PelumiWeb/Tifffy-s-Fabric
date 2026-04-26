'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.push('/admin/products');
      router.refresh();
    }
  }

  const input: React.CSSProperties = {
    width: '100%', padding: '12px 14px', border: '1px solid #ddd', borderRadius: 6,
    fontSize: 14, fontFamily: 'inherit', boxSizing: 'border-box', outline: 'none',
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8f8f6' }}>
      <div style={{ width: '100%', maxWidth: 400, padding: 40, background: '#fff', borderRadius: 10, boxShadow: '0 2px 20px rgba(0,0,0,0.08)' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontFamily: 'var(--font-serif, Georgia)', fontSize: 22, letterSpacing: '0.2em', marginBottom: 8 }}>TIFFY'S FABRICS</div>
          <div style={{ fontSize: 13, color: '#888' }}>Admin login</div>
        </div>

        {error && (
          <div style={{ background: '#fff0f0', border: '1px solid #fcc', borderRadius: 6, padding: '10px 14px', fontSize: 13, color: '#c00', marginBottom: 20 }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <label style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#555', display: 'block', marginBottom: 6 }}>Email</label>
            <input style={input} type="email" value={email} onChange={e => setEmail(e.target.value)} required autoComplete="email" />
          </div>
          <div>
            <label style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#555', display: 'block', marginBottom: 6 }}>Password</label>
            <input style={input} type="password" value={password} onChange={e => setPassword(e.target.value)} required autoComplete="current-password" />
          </div>
          <button
            type="submit"
            disabled={loading}
            style={{ marginTop: 8, padding: '13px', background: '#1a1a1a', color: '#f5f0e8', border: 0, borderRadius: 6, fontSize: 13, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1 }}
          >
            {loading ? 'Signing in…' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  );
}
