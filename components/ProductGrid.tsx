import { Product } from '@/lib/products';
import ProductCard from './ProductCard';

export default function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
      {products.map(p => <ProductCard key={p.id} product={p} />)}
    </div>
  );
}
