'use client';

import { usePathname, useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const isLoginPage = pathname === '/admin/login';

  async function signOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/admin/login');
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f8f8f6', fontFamily: 'var(--font-sans, system-ui)' }}>
      {!isLoginPage && (
        <header style={{ background: '#1a1a1a', color: '#f5f0e8', padding: '0 32px', height: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontFamily: 'var(--font-serif, Georgia)', letterSpacing: '0.2em', fontSize: 16 }}>
            TIFFY'S FABRICS — Admin
          </span>
          <div style={{ display: 'flex', gap: 24, alignItems: 'center', fontSize: 13 }}>
            <a href="/admin/products" style={{ color: '#f5f0e8', opacity: 0.8 }}>Products</a>
            <a href="/admin/products/new" style={{ color: '#f5f0e8', opacity: 0.8 }}>+ New Product</a>
            <button onClick={signOut} style={{ background: 'transparent', border: '1px solid rgba(245,240,232,0.3)', color: '#f5f0e8', padding: '6px 14px', borderRadius: 4, cursor: 'pointer', fontSize: 12 }}>
              Sign out
            </button>
          </div>
        </header>
      )}
      <main style={{ maxWidth: 1100, margin: '0 auto', padding: isLoginPage ? 0 : '40px 32px' }}>
        {children}
      </main>
    </div>
  );
}
