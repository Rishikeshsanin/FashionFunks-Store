"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { getProductById } from "@/lib/catalog";
import type { CartLine, CartLineWithProduct, Product } from "@/types/catalog";

const CART_KEY = "fashionfunks-cart-v4";
const WISHLIST_KEY = "fashionfunks-wishlist-v1";
const USER_KEY = "fashionfunks-user-v2";
const THEME_KEY = "fashionfunks-theme";

type User = { name: string; email: string };

type StoreContextValue = {
  hydrated: boolean;
  cart: CartLineWithProduct[];
  cartCount: number;
  subtotal: number;
  addToCart: (product: Product, size: string, color: string) => void;
  updateQuantity: (line: CartLine, quantity: number) => void;
  removeFromCart: (line: CartLine) => void;
  clearCart: () => void;
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  theme: "light" | "dark";
  toggleTheme: () => void;
  toast: (message: string) => void;
};

const StoreContext = createContext<StoreContextValue | null>(null);

function readJSON<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [hydrated, setHydrated] = useState(false);
  const [cartLines, setCartLines] = useState<CartLine[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    setCartLines(readJSON<CartLine[]>(CART_KEY, []));
    setWishlist(readJSON<string[]>(WISHLIST_KEY, []));
    setUser(readJSON<User | null>(USER_KEY, null));
    const storedTheme = window.localStorage.getItem(THEME_KEY) === "dark" ? "dark" : "light";
    setTheme(storedTheme);
    document.documentElement.dataset.theme = storedTheme;
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) window.localStorage.setItem(CART_KEY, JSON.stringify(cartLines));
  }, [cartLines, hydrated]);

  useEffect(() => {
    if (hydrated) window.localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
  }, [wishlist, hydrated]);

  const toast = useCallback((message: string) => {
    setToastMessage(message);
    window.setTimeout(() => setToastMessage(""), 2600);
  }, []);

  const addToCart = useCallback((product: Product, size: string, color: string) => {
    if (!size || !color || product.stock === 0) return;
    setCartLines((current) => {
      const existing = current.find((line) => line.productId === product.id && line.size === size && line.color === color);
      if (existing) {
        return current.map((line) => line === existing ? { ...line, quantity: Math.min(line.quantity + 1, 10) } : line);
      }
      return [...current, { productId: product.id, size, color, quantity: 1 }];
    });
    toast(`${product.name} added to your bag`);
  }, [toast]);

  const updateQuantity = useCallback((target: CartLine, quantity: number) => {
    if (quantity <= 0) {
      setCartLines((current) => current.filter((line) => !(line.productId === target.productId && line.size === target.size && line.color === target.color)));
      return;
    }
    setCartLines((current) => current.map((line) =>
      line.productId === target.productId && line.size === target.size && line.color === target.color
        ? { ...line, quantity: Math.min(quantity, 10) }
        : line,
    ));
  }, []);

  const removeFromCart = useCallback((target: CartLine) => {
    setCartLines((current) => current.filter((line) => !(line.productId === target.productId && line.size === target.size && line.color === target.color)));
    toast("Item removed from your bag");
  }, [toast]);

  const toggleWishlist = useCallback((productId: string) => {
    setWishlist((current) => current.includes(productId)
      ? current.filter((id) => id !== productId)
      : [...current, productId]);
  }, []);

  const login = useCallback((nextUser: User) => {
    setUser(nextUser);
    window.localStorage.setItem(USER_KEY, JSON.stringify(nextUser));
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    window.localStorage.removeItem(USER_KEY);
    toast("You have been logged out");
  }, [toast]);

  const toggleTheme = useCallback(() => {
    setTheme((current) => {
      const next = current === "light" ? "dark" : "light";
      document.documentElement.dataset.theme = next;
      window.localStorage.setItem(THEME_KEY, next);
      return next;
    });
  }, []);

  const cart = useMemo(() => cartLines.flatMap((line) => {
    const product = getProductById(line.productId);
    return product ? [{ ...line, product }] : [];
  }), [cartLines]);

  const value = useMemo<StoreContextValue>(() => ({
    hydrated,
    cart,
    cartCount: cart.reduce((total, line) => total + line.quantity, 0),
    subtotal: cart.reduce((total, line) => total + line.product.price * line.quantity, 0),
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart: () => setCartLines([]),
    wishlist,
    toggleWishlist,
    user,
    login,
    logout,
    theme,
    toggleTheme,
    toast,
  }), [hydrated, cart, addToCart, updateQuantity, removeFromCart, wishlist, toggleWishlist, user, login, logout, theme, toggleTheme, toast]);

  return (
    <StoreContext.Provider value={value}>
      {children}
      <div className={`toast${toastMessage ? " toast--visible" : ""}`} role="status" aria-live="polite">
        {toastMessage}
      </div>
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) throw new Error("useStore must be used within StoreProvider");
  return context;
}
