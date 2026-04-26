import ProductForm from '../ProductForm';

export default function NewProductPage() {
  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <a href="/admin/products" style={{ fontSize: 13, color: '#888' }}>← Products</a>
        <h1 style={{ fontSize: 24, fontWeight: 700, margin: '8px 0 0' }}>New Product</h1>
      </div>
      <div style={{ background: '#fff', borderRadius: 10, padding: 32, boxShadow: '0 1px 6px rgba(0,0,0,0.06)' }}>
        <ProductForm mode="new" />
      </div>
    </div>
  );
}
