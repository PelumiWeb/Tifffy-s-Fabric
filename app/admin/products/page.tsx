import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import ProductsList from './ProductsList';

export default async function AdminProductsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/admin/login');
  return <ProductsList />;
}
