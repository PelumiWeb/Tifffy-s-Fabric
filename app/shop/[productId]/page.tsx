import { notFound } from 'next/navigation';
import Link from 'next/link';
import { PRODUCTS } from '@/lib/products';
import ProductDetail from '@/components/ProductDetail';

export async function generateStaticParams() {
  return PRODUCTS.map(p => ({ productId: p.id }));
}

export default async function ProductPage({ params }: { params: Promise<{ productId: string }> }) {
  const { productId } = await params;
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) notFound();

  return (
    <section style={{ padding: '32px' }}>
      <div style={{ fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--fg-2)', marginBottom: 24 }}>
        <Link href="/shop" style={{ cursor: 'pointer', color: 'var(--fg-2)' }}>Dresses</Link>
        {' / '}
        <span style={{ color: 'var(--ink)' }}>{product.name}</span>
      </div>
      <ProductDetail product={product} />
    </section>
  );
}
