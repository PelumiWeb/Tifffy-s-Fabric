import { notFound } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { dbToProduct } from '@/lib/products';
import ProductDetail from '@/components/ProductDetail';

export const revalidate = 0;

export default async function ProductPage({ params }: { params: Promise<{ productId: string }> }) {
  const { productId } = await params;
  const supabase = await createClient();
  const { data } = await supabase.from('products').select('*').eq('id', productId).single();
  if (!data) notFound();
  const product = dbToProduct(data);

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
