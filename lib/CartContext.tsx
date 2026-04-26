'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

export type CartItem = {
  id: string;
  name: string;
  price: number;
  salePrice?: number;
  ph: string;
  size: string;
  color: string;
  qty: number;
};

type CartContextType = {
  items: CartItem[];
  cartOpen: boolean;
  addToCart: (item: CartItem) => void;
  removeFromCart: (item: CartItem) => void;
  openCart: () => void;
  closeCart: () => void;
  totalCount: number;
};

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);

  const addToCart = (item: CartItem) => {
    setItems(c => {
      const existing = c.find(x => x.id === item.id && x.size === item.size && x.color === item.color);
      if (existing) return c.map(x => x === existing ? { ...x, qty: x.qty + 1 } : x);
      return [...c, item];
    });
  };

  const removeFromCart = (item: CartItem) => {
    setItems(c => c.filter(x => !(x.id === item.id && x.size === item.size && x.color === item.color)));
  };

  const totalCount = items.reduce((a, i) => a + i.qty, 0);

  return (
    <CartContext.Provider value={{ items, cartOpen, addToCart, removeFromCart, openCart: () => setCartOpen(true), closeCart: () => setCartOpen(false), totalCount }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
