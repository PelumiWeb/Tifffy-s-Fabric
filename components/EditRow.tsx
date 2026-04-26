import { Product } from '@/lib/products';
import ProductGrid from './ProductGrid';

export default function EditRow({ title, eyebrow, products }: { title: string; eyebrow: string; products: Product[] }) {
  return (
    <section style={{ padding: '96px 32px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 48 }}>
        <div>
          <div style={{ fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--fg-2)', marginBottom: 12, fontWeight: 500 }}>{eyebrow}</div>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 44, lineHeight: 1.1, letterSpacing: '-0.01em', margin: 0, fontWeight: 400 }}>{title}</h2>
        </div>
        <a href="/shop" style={{ fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 500, cursor: 'pointer', borderBottom: '1px solid var(--ink)', paddingBottom: 2 }}>View all</a>
      </div>
      <ProductGrid products={products} />
    </section>
  );
}
