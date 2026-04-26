import FilterBar from '@/components/FilterBar';
import ProductGrid from '@/components/ProductGrid';
import { PRODUCTS } from '@/lib/products';

export default function ShopPage() {
  return (
    <>
      <div style={{ padding: '64px 32px 32px' }}>
        <div style={{ fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--fg-2)', marginBottom: 20 }}>Shop / Dresses</div>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 56, lineHeight: 1.05, margin: '0 0 16px', fontWeight: 400, letterSpacing: '-0.01em' }}>Dresses</h1>
        <p style={{ margin: 0, fontSize: 15, color: 'var(--fg-2)', maxWidth: 520 }}>Mini, midi, maxi. Built for after-dark, weddings, and the long Sunday lunch.</p>
      </div>
      <FilterBar count={PRODUCTS.length} />
      <section style={{ padding: '32px' }}>
        <ProductGrid products={PRODUCTS} />
      </section>
    </>
  );
}
