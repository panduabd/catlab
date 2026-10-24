import React, { createContext, useContext, useState, useEffect } from 'react';

export interface CartItem {
  id: string;
  titleEn: string;
  titleZh: string;
  subtitleEn: string;
  subtitleZh: string;
  priceEn: number;
  priceZh: number;
  quantity: number;
  image: string;
  variant?: string;
  variantId?: string;
}

interface CartContextType {
  items: CartItem[];
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addToCart: (item: Omit<CartItem, 'quantity'>, quantity?: number) => void;
  updateQuantity: (id: string, delta: number) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  totalQuantity: number;
  getSubtotal: (lang: 'en' | 'zh') => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const INITIAL_CART: CartItem[] = [
  {
    id: 'catlab-collection-kit',
    titleEn: 'CAT LAB+ At-Home Hydrophobic Urine Collection Kit',
    titleZh: 'CAT LAB+ 居家疏水性貓砂尿液採集套裝',
    subtitleEn: 'Complete non-invasive kit with 10-parameter test strip',
    subtitleZh: '完整非侵入式採尿套組，附10項檢測試紙',
    priceEn: 29.0,
    priceZh: 890,
    quantity: 1,
    image: '/images/product.webp'
  }
];

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('catlab_cart');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback to initial
    }
    return INITIAL_CART;
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('catlab_cart', JSON.stringify(items));
    } catch {
      // ignore
    }
  }, [items]);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const addToCart = (newItem: Omit<CartItem, 'quantity'>, qty = 1) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.id === newItem.id);
      if (existing) {
        return prev.map((item) =>
          item.id === newItem.id ? { ...item, quantity: item.quantity + qty } : item
        );
      }
      return [...prev, { ...newItem, quantity: qty }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (id: string, delta: number) => {
    setItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null)
    );
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalQuantity = items.reduce((acc, item) => acc + item.quantity, 0);

  const getSubtotal = (lang: 'en' | 'zh') => {
    return items.reduce((acc, item) => {
      const unitPrice = lang === 'en' ? item.priceEn : item.priceZh;
      return acc + unitPrice * item.quantity;
    }, 0);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        isCartOpen,
        openCart,
        closeCart,
        addToCart,
        updateQuantity,
        removeItem,
        clearCart,
        totalQuantity,
        getSubtotal
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
