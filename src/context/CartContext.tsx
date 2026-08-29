import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

export interface CartItem {
  productId: string;
  name: string;
  price: number;
  size: string;
  quantity: number;
  thumbnail: string;
  slug: string;
}

export interface CartContextType {
  items: CartItem[];
  addItem: (product: { id: string; name: string; price: number; size: string; thumbnail: string; slug: string }, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getItemCount: () => number;
  getSubtotal: () => number;
  getTotal: () => number;
  isDrawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [items, setItems] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem('zen-cart');
    if (savedCart) {
      try {
        const parsed = JSON.parse(savedCart);
        // Filter out any corrupted items from the previous bug
        return Array.isArray(parsed) ? parsed.filter(item => item && typeof item.price === 'number') : [];
      } catch (error) {
        console.error('Failed to parse cart from localStorage', error);
        return [];
      }
    }
    return [];
  });

  useEffect(() => {
    try {
      localStorage.setItem('zen-cart', JSON.stringify(items));
    } catch (error) {
      console.warn('Failed to save cart to localStorage (might be exceeding quota due to large custom images)', error);
    }
  }, [items]);

  const addItem = (product: { id: string; name: string; price: number; size: string; thumbnail: string; slug: string }, quantity: number = 1) => {
    setItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(item => item.productId === product.id);
      
      if (existingItemIndex >= 0) {
        const newItems = [...prevItems];
        newItems[existingItemIndex] = {
          ...newItems[existingItemIndex],
          quantity: newItems[existingItemIndex].quantity + quantity
        };
        return newItems;
      } else {
        return [...prevItems, {
          productId: product.id,
          name: product.name,
          price: product.price,
          size: product.size,
          thumbnail: product.thumbnail,
          slug: product.slug,
          quantity
        }];
      }
    });
    setIsDrawerOpen(true);
  };

  const removeItem = (productId: string) => {
    setItems((prevItems) => prevItems.filter(item => item.productId !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId);
      return;
    }
    
    setItems((prevItems) => 
      prevItems.map(item => 
        item.productId === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const getItemCount = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  const getSubtotal = () => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotal = () => {
    return getSubtotal(); // Can add tax/shipping here later
  };

  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);

  return (
    <CartContext.Provider value={{
      items,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      getItemCount,
      getSubtotal,
      getTotal,
      isDrawerOpen,
      openDrawer,
      closeDrawer
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
