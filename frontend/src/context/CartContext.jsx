import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

const INITIAL_EXAMPLE_ITEMS = [
  {
    id: 1,
    name: 'Galón de Esmalte',
    category: 'Esmalte semi-industrial',
    presentation: 'Galón (3.785 L)',
    finish: 'Brillante / Satinado',
    price_ves: 35804.20,
    price_ref: '40,60 REF',
    quantity: 1,
    image_url: '/products/producto_pintura_esmalte_materiales_construy.png',
    local_image: '/products/producto_pintura_esmalte_materiales_construy.png'
  },
  {
    id: 2,
    name: 'Cuñete Caucho Clase A',
    category: 'Pinturas de caucho',
    presentation: 'Cuñete (18.9 L)',
    finish: 'Mate Lavable',
    price_ves: 97182.83,
    price_ref: '110,20 REF',
    quantity: 1,
    image_url: '/products/producto_cunete_pintura_caucho_materiales_construy-25.png',
    local_image: '/products/producto_cunete_pintura_caucho_materiales_construy-25.png'
  },
  {
    id: 6,
    name: 'Taza Construy',
    category: 'Taza',
    presentation: 'Unidad',
    finish: 'Cerámica Oficial',
    price_ves: 8818.77,
    price_ref: '10,00 REF',
    quantity: 1,
    image_url: '/products/ahj9m1443p/taza_construy.png',
    local_image: '/products/krkbyxq4n9/taza_construy2.png'
  }
];

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem('construy_cart');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_EXAMPLE_ITEMS;
  });

  useEffect(() => {
    try {
      localStorage.setItem('construy_cart', JSON.stringify(items));
    } catch (e) {
      console.error(e);
    }
  }, [items]);

  const addToCart = (product, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.id === product.id ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      return [...prev, { ...product, quantity }];
    });
  };

  const removeFromCart = (productId) => {
    setItems((prev) => prev.filter((i) => i.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    const qty = parseInt(newQuantity, 10);
    const validQty = isNaN(qty) || qty < 1 ? 1 : qty;
    setItems((prev) =>
      prev.map((i) => (i.id === productId ? { ...i, quantity: validQty } : i))
    );
  };

  const incrementQuantity = (productId) => {
    setItems((prev) =>
      prev.map((i) =>
        i.id === productId ? { ...i, quantity: i.quantity + 1 } : i
      )
    );
  };

  const decrementQuantity = (productId) => {
    setItems((prev) =>
      prev.map((i) =>
        i.id === productId ? { ...i, quantity: Math.max(1, i.quantity - 1) } : i
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const resetToSample = () => {
    setItems(INITIAL_EXAMPLE_ITEMS);
  };

  const totalItemsCount = items.reduce((sum, item) => sum + (Number(item.quantity) || 0), 0);

  const subtotalVES = items.reduce(
    (sum, item) => sum + (Number(item.price_ves) || 0) * (Number(item.quantity) || 0),
    0
  );

  // Parse REF numeric approximately
  const subtotalREF = items.reduce((sum, item) => {
    if (!item.price_ref) return sum;
    const cleanStr = String(item.price_ref).replace(/[^\d.,]/g, '').replace(',', '.');
    const num = parseFloat(cleanStr) || 0;
    return sum + num * (Number(item.quantity) || 0);
  }, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        incrementQuantity,
        decrementQuantity,
        clearCart,
        resetToSample,
        totalItemsCount,
        subtotalVES,
        subtotalREF
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe ser usado dentro de un CartProvider');
  }
  return context;
}
