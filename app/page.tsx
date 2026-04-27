import Hero from '@/components/Hero';
import EditRow from '@/components/EditRow';
import { createClient } from '@/lib/supabase/server';
import { dbToProduct } from '@/lib/products';

export const revalidate = 0;

export default async function HomePage() {
  const supabase = await createClient();
  const { data } = await supabase.from('products').select('*').order('created_at', { ascending: false });
  const products = (data ?? []).map(dbToProduct);

  return (
    <>
      <Hero />
      <EditRow eyebrow="New this week" title="The Slip Edit" products={products.slice(0, 3)} />
      <section className="lookbook-section" style={{ position: 'relative', height: 520, margin: '0 32px', overflow: 'hidden' }}>
        <div className="ph ph-olive" style={{ position: 'absolute', inset: 0 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(26,22,20,0.55), transparent 55%)' }} />
        <div className="lookbook-content" style={{ position: 'absolute', left: 48, top: '50%', transform: 'translateY(-50%)', color: 'var(--bone)', maxWidth: 480 }}>
          <div style={{ fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', opacity: 0.8, marginBottom: 14, fontWeight: 500 }}>Lookbook · The Editorial</div>
          <h2 className="lookbook-title" style={{ fontFamily: 'var(--font-serif)', fontSize: 52, lineHeight: 1.05, letterSpacing: '-0.01em', margin: 0, fontWeight: 400 }}>Dressed for a long night.</h2>
          <button className="btn btn--secondary" style={{ borderColor: 'var(--bone)', color: 'var(--bone)', marginTop: 28 }}>View Lookbook</button>
        </div>
      </section>
      <EditRow eyebrow="Back in stock" title="The classics, returning" products={products.slice(3, 6)} />
    </>
  );
}
