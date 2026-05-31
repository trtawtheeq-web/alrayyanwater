import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';

export interface Variant {
  id: number;
  title: string;
  price: string;
  compareAtPrice: string | null;
}

export interface Product {
  id: number;
  title: string;
  titleAr?: string;
  handle: string;
  vendor: string;
  productType: string;
  isNew: boolean;
  isOffer: boolean;
  variants: Variant[];
  image: string;
  images?: string[];
  bodyHtml?: string;
  descriptionAr?: string;
  availableIn?: string[];
  tags?: string[];
}

export interface CartItem {
  product: Product;
  variant: Variant;
  quantity: number;
}

export interface SubCategory {
  handle: string;
  title: string;
  titleEn: string;
  subcategories?: SubCategory[];
}

export interface Category {
  title: string;
  titleEn: string;
  handle: string;
  subcategories: SubCategory[];
}

interface StoreData {
  products: Product[];
  collectionProducts: Record<string, number[]>;
  categories: Record<string, Category>;
}

interface StoreContextType {
  products: Product[];
  collectionProducts: Record<string, number[]>;
  categories: Record<string, Category>;
  cart: CartItem[];
  isLoading: boolean;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  addToCart: (product: Product, variant: Variant, quantity?: number) => void;
  removeFromCart: (productId: number, variantId: number) => void;
  updateCartQuantity: (productId: number, variantId: number, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;
  getProductsByCollection: (handle: string) => Product[];
  getProductByHandle: (handle: string) => Product | undefined;
  searchProducts: (query: string) => Product[];
  cartDrawerOpen: boolean;
  setCartDrawerOpen: (open: boolean) => void;
  showCartToast: boolean;
  triggerCartToast: () => void;
  hideCartToast: () => void;
}

const StoreContext = createContext<StoreContextType | null>(null);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [collectionProducts, setCollectionProducts] = useState<Record<string, number[]>>({});
  const [categories, setCategories] = useState<Record<string, Category>>({});
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('rayyan-cart');
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [showCartToast, setShowCartToast] = useState(false);
  const cartToastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const triggerCartToast = useCallback(() => {
    setShowCartToast(true);
    if (cartToastTimer.current) clearTimeout(cartToastTimer.current);
    cartToastTimer.current = setTimeout(() => setShowCartToast(false), 2000);
  }, []);

  const hideCartToast = useCallback(() => {
    setShowCartToast(false);
    if (cartToastTimer.current) clearTimeout(cartToastTimer.current);
  }, []);

  // Load store data
  useEffect(() => {
    fetch('/store-data/products.json')
      .then(r => r.json())
      .then((data: any) => {
        // Map products to include single image field
        const mapped = (data.products || []).map((p: any) => ({
          ...p,
          image: p.image || (p.images && p.images[0]) || '',
        }));
        setProducts(mapped);
        setCollectionProducts(data.collections || data.collectionProducts || {});
        setCategories(data.categories || {});
        setIsLoading(false);
      })
      .catch(err => {
        console.error('Failed to load store data:', err);
        setIsLoading(false);
      });
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem('rayyan-cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = useCallback((product: Product, variant: Variant, quantity = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id && item.variant.id === variant.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id && item.variant.id === variant.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, variant, quantity }];
    });
    triggerCartToast();
  }, [triggerCartToast]);

  const removeFromCart = useCallback((productId: number, variantId: number) => {
    setCart(prev => prev.filter(item => !(item.product.id === productId && item.variant.id === variantId)));
  }, []);

  const updateCartQuantity = useCallback((productId: number, variantId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, variantId);
      return;
    }
    setCart(prev => prev.map(item =>
      item.product.id === productId && item.variant.id === variantId
        ? { ...item, quantity }
        : item
    ));
  }, [removeFromCart]);

  const clearCart = useCallback(() => setCart([]), []);

  const getCartTotal = useCallback(() => {
    return cart.reduce((total, item) => total + parseFloat(item.variant.price) * item.quantity, 0);
  }, [cart]);

  const getCartCount = useCallback(() => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  }, [cart]);

  const getProductsByCollection = useCallback((handle: string) => {
    // First try collectionProducts map (for curated collections like frontpage, new-arrivals)
    const ids = collectionProducts[handle] || [];
    if (ids.length > 0) {
      const idMap = new Map(products.map(p => [p.id, p]));
      return ids.map(id => idMap.get(id)).filter(Boolean) as Product[];
    }
    // Fallback: filter products by collections field
    return products.filter(p => p.productType === handle);
  }, [products, collectionProducts]);

  const getProductByHandle = useCallback((handle: string) => {
    return products.find(p => p.handle === handle);
  }, [products]);

  const searchProducts = useCallback((query: string) => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return products.filter(p =>
      p.title.toLowerCase().includes(q) ||
      (p.titleAr && p.titleAr.includes(q)) ||
      p.vendor.toLowerCase().includes(q) ||
      (p.tags && p.tags.some(t => t.toLowerCase().includes(q)))
    );
  }, [products]);

  return (
    <StoreContext.Provider value={{
      products, collectionProducts, categories, cart, isLoading,
      searchQuery, setSearchQuery,
      addToCart, removeFromCart, updateCartQuantity, clearCart,
      getCartTotal, getCartCount, getProductsByCollection, getProductByHandle, searchProducts,
      cartDrawerOpen, setCartDrawerOpen,
      showCartToast, triggerCartToast, hideCartToast,
    }}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used within StoreProvider');
  return ctx;
}
