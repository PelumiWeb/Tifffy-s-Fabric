import { Product } from '@/lib/products';
import ProductCard from './ProductCard';

export default function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div className="product-grid">
      {products.map(p => <ProductCard key={p.id} product={p} />)}
    </div>
  );
}
