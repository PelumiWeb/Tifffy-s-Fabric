export type Product = {
  id: string;
  name: string;
  price: number;
  salePrice?: number;
  ph: string;
  colors: number;
  tag: string | null;
};

export const PRODUCTS: Product[] = [
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
