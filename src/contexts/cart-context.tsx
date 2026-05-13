"use client";

import { createContext, useContext, useReducer, useEffect, useCallback } from "react";

export type LocalizedLabel = { fa: string; en: string; zh?: string };

export interface CartItem {
  productNum: number;
  name: LocalizedLabel;
  category: LocalizedLabel;
  qty: number;
}

interface CartState {
  items: CartItem[];
  open: boolean;
}

type CartAction =
  | { type: "ADD"; item: Omit<CartItem, "qty"> }
  | { type: "REMOVE"; productNum: number }
  | { type: "SET_QTY"; productNum: number; qty: number }
  | { type: "CLEAR" }
  | { type: "OPEN" }
  | { type: "CLOSE" };

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD": {
      const exists = state.items.find((i) => i.productNum === action.item.productNum);
      return {
        ...state,
        items: exists
          ? state.items.map((i) => i.productNum === action.item.productNum ? { ...i, qty: i.qty + 1 } : i)
          : [...state.items, { ...action.item, qty: 1 }],
      };
    }
    case "REMOVE":
      return { ...state, items: state.items.filter((i) => i.productNum !== action.productNum) };
    case "SET_QTY":
      return {
        ...state,
        items: action.qty <= 0
          ? state.items.filter((i) => i.productNum !== action.productNum)
          : state.items.map((i) => i.productNum === action.productNum ? { ...i, qty: action.qty } : i),
      };
    case "CLEAR":
      return { ...state, items: [] };
    case "OPEN":
      return { ...state, open: true };
    case "CLOSE":
      return { ...state, open: false };
    default:
      return state;
  }
}

interface CartContextValue {
  items: CartItem[];
  totalQty: number;
  open: boolean;
  addItem: (item: Omit<CartItem, "qty">) => void;
  removeItem: (productNum: number) => void;
  setQty: (productNum: number, qty: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  isInCart: (productNum: number) => boolean;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [], open: false }, (init) => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("ube_cart");
        if (saved) return { ...init, items: JSON.parse(saved) as CartItem[] };
      } catch {}
    }
    return init;
  });

  useEffect(() => {
    localStorage.setItem("ube_cart", JSON.stringify(state.items));
  }, [state.items]);

  const addItem = useCallback((item: Omit<CartItem, "qty">) => dispatch({ type: "ADD", item }), []);
  const removeItem = useCallback((productNum: number) => dispatch({ type: "REMOVE", productNum }), []);
  const setQty = useCallback((productNum: number, qty: number) => dispatch({ type: "SET_QTY", productNum, qty }), []);
  const clearCart = useCallback(() => dispatch({ type: "CLEAR" }), []);
  const openCart = useCallback(() => dispatch({ type: "OPEN" }), []);
  const closeCart = useCallback(() => dispatch({ type: "CLOSE" }), []);
  const isInCart = useCallback((productNum: number) => state.items.some((i) => i.productNum === productNum), [state.items]);

  const totalQty = state.items.reduce((s, i) => s + i.qty, 0);

  return (
    <CartContext.Provider value={{ items: state.items, totalQty, open: state.open, addItem, removeItem, setQty, clearCart, openCart, closeCart, isInCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
