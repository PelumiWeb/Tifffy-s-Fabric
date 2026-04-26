export type Product = {
  id: string;
  name: string;
  price: number;
  salePrice?: number;
  ph: string;
  colors: number;
  tag: string | null;
  image_urls?: string[];
};

// Placeholder colours assigned per-product for fallback display
const PH_MAP: Record<string, string> = {
  deras: 'ph-ink', cowl: 'ph-sand', naia: 'ph-rouge', odell: 'ph-olive',
  vale: 'ph-cream', sena: 'ph-ink', mira: 'ph-sand', ellis: 'ph-rouge', noa: 'ph-olive',
};
const PH_CYCLE = ['ph-ink', 'ph-sand', 'ph-rouge', 'ph-olive', 'ph-cream'];
let phIdx = 0;

function ph(id: string) {
  return PH_MAP[id] ?? PH_CYCLE[phIdx++ % PH_CYCLE.length];
}

type DbProduct = {
  id: string;
  name: string;
  price: number;
  sale_price: number | null;
  colors: number;
  tag: string | null;
  image_urls: string[];
};

export function dbToProduct(p: DbProduct): Product {
  return {
    id: p.id,
    name: p.name,
    price: p.price,
    salePrice: p.sale_price ?? undefined,
    ph: ph(p.id),
    colors: p.colors,
    tag: p.tag,
    image_urls: p.image_urls ?? [],
  };
}

// Seed data — used only as a reference / for initial DB population
export const SEED_PRODUCTS: Product[] = [
  { id: 'deras',  name: 'Backless Deras Maxi',   price: 289, ph: 'ph-ink',   colors: 4, tag: 'New' },
  { id: 'cowl',   name: 'Cowl Slip Dress',        price: 229, salePrice: 159, ph: 'ph-sand',  colors: 2, tag: 'Sale' },
  { id: 'naia',   name: 'Naia Corset Mini',       price: 249, ph: 'ph-rouge', colors: 3, tag: null },
  { id: 'odell',  name: 'Odell Draped Gown',      price: 329, ph: 'ph-olive', colors: 2, tag: 'New' },
  { id: 'vale',   name: 'Vale Satin Midi',        price: 219, ph: 'ph-cream', colors: 4, tag: null },
  { id: 'sena',   name: 'Sena Column Dress',      price: 269, ph: 'ph-ink',   colors: 3, tag: null },
  { id: 'mira',   name: 'Mira Halter Dress',      price: 199, salePrice: 139, ph: 'ph-sand', colors: 2, tag: 'Sale' },
  { id: 'ellis',  name: 'Ellis Open-Back Midi',   price: 259, ph: 'ph-rouge', colors: 3, tag: null },
  { id: 'noa',    name: 'Noa Bias Cut Slip',      price: 289, ph: 'ph-olive', colors: 4, tag: 'New' },
];
