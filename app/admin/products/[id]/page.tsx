import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import ProductForm from '../ProductForm';

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: product } = await supabase.from('products').select('*').eq('id', id).single();

  if (!product) notFound();

  const initial = {
    id: product.id,
    name: product.name,
    price: String(product.price),
    sale_price: product.sale_price ? String(product.sale_price) : '',
    colors: String(product.colors),
    tag: product.tag ?? '',
    image_urls: product.image_urls ?? [],
  };

  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <a href="/admin/products" style={{ fontSize: 13, color: '#888' }}>← Products</a>
        <h1 style={{ fontSize: 24, fontWeight: 700, margin: '8px 0 0' }}>Edit: {product.name}</h1>
      </div>
      <div style={{ background: '#fff', borderRadius: 10, padding: 32, boxShadow: '0 1px 6px rgba(0,0,0,0.06)' }}>
        <ProductForm mode="edit" initial={initial} />
      </div>
    </div>
  );
}
