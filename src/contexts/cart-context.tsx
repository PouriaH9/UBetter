"use client";

import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useCallback,
  useRef,
} from "react";
import {
  medusa,
  MEDUSA_ENABLED,
  CART_ID_KEY,
  REGION_ID_KEY,
} from "@/lib/medusa";
import { getRegionId } from "@/lib/products";

export type LocalizedLabel = { fa: string; en: string; zh?: string };

export interface CartItem {
  productNum: number;
  lineItemId?: string;
  variantId?: string;
  name: LocalizedLabel;
  category: LocalizedLabel;
  qty: number;
  unitPriceIrr?: number;
}

interface CartState {
  items: CartItem[];
  open: boolean;
  cartId: string | null;
  loading: boolean;
  totalIrr: number;
}

type CartAction =
  | { type: "SET_LOADING"; loading: boolean }
  | { type: "SET_CART"; cartId: string | null; items: CartItem[]; totalIrr: number }
  | { type: "ADD_LOCAL"; item: Omit<CartItem, "qty"> }
  | { type: "REMOVE_LOCAL"; productNum: number }
  | { type: "SET_QTY_LOCAL"; productNum: number; qty: number }
  | { type: "CLEAR_LOCAL" }
  | { type: "OPEN" }
  | { type: "CLOSE" };

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, loading: action.loading };
    case "SET_CART":
      return {
        ...state,
        cartId: action.cartId,
        items: action.items,
        totalIrr: action.totalIrr,
        loading: false,
      };
    case "ADD_LOCAL": {
      const exists = state.items.find((i) => i.productNum === action.item.productNum);
      return {
        ...state,
        items: exists
          ? state.items.map((i) =>
              i.productNum === action.item.productNum ? { ...i, qty: i.qty + 1 } : i
            )
          : [...state.items, { ...action.item, qty: 1 }],
      };
    }
    case "REMOVE_LOCAL":
      return { ...state, items: state.items.filter((i) => i.productNum !== action.productNum) };
    case "SET_QTY_LOCAL":
      return {
        ...state,
        items:
          action.qty <= 0
            ? state.items.filter((i) => i.productNum !== action.productNum)
            : state.items.map((i) =>
                i.productNum === action.productNum ? { ...i, qty: action.qty } : i
              ),
      };
    case "CLEAR_LOCAL":
      return { ...state, items: [], totalIrr: 0, cartId: null };
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
  totalIrr: number;
  open: boolean;
  loading: boolean;
  cartId: string | null;
  addItem: (item: Omit<CartItem, "qty">) => Promise<void>;
  removeItem: (productNum: number) => Promise<void>;
  setQty: (productNum: number, qty: number) => Promise<void>;
  clearCart: () => Promise<void>;
  openCart: () => void;
  closeCart: () => void;
  isInCart: (productNum: number) => boolean;
  refreshCart: () => Promise<void>;
}

const CartContext = createContext<CartContextValue | null>(null);

function mapMedusaCart(cart: {
  id: string;
  items?: Array<{
    id: string;
    quantity: number;
    unit_price?: number;
    variant_id?: string;
    variant?: { metadata?: Record<string, unknown> };
    product?: { metadata?: Record<string, unknown> };
    title?: string;
  }>;
  total?: number;
}): { items: CartItem[]; totalIrr: number } {
  const items: CartItem[] = (cart.items || []).map((line) => {
    const productNum = Number(
      line.product?.metadata?.legacy_product_num ??
        line.variant?.metadata?.legacy_product_num ??
        0
    );
    return {
      productNum,
      lineItemId: line.id,
      variantId: line.variant_id,
      name: { fa: line.title || "", en: line.title || "" },
      category: { fa: "", en: "" },
      qty: line.quantity,
      unitPriceIrr: line.unit_price,
    };
  });
  return { items, totalIrr: cart.total ?? 0 };
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    open: false,
    cartId: null,
    loading: false,
    totalIrr: 0,
  });
  const hydrating = useRef(false);

  const syncFromMedusa = useCallback(async (cartId: string) => {
    const { cart } = await medusa.store.cart.retrieve(cartId, {
      fields: "+items.variant,+items.product",
    });
    if (!cart) return;
    const mapped = mapMedusaCart(cart);
    dispatch({
      type: "SET_CART",
      cartId: cart.id,
      items: mapped.items,
      totalIrr: mapped.totalIrr,
    });
  }, []);

  const ensureCart = useCallback(async (): Promise<string | null> => {
    if (!MEDUSA_ENABLED) return null;

    let cartId = localStorage.getItem(CART_ID_KEY);
    if (cartId) {
      try {
        await syncFromMedusa(cartId);
        return cartId;
      } catch {
        localStorage.removeItem(CART_ID_KEY);
        cartId = null;
      }
    }

    const regionId =
      localStorage.getItem(REGION_ID_KEY) || (await getRegionId());
    if (regionId) localStorage.setItem(REGION_ID_KEY, regionId);

    const { cart } = await medusa.store.cart.create({
      region_id: regionId ?? undefined,
    });
    if (!cart?.id) return null;

    localStorage.setItem(CART_ID_KEY, cart.id);
    dispatch({ type: "SET_CART", cartId: cart.id, items: [], totalIrr: 0 });
    return cart.id;
  }, [syncFromMedusa]);

  const refreshCart = useCallback(async () => {
    if (!MEDUSA_ENABLED) return;
    const cartId = localStorage.getItem(CART_ID_KEY);
    if (!cartId) return;
    dispatch({ type: "SET_LOADING", loading: true });
    try {
      await syncFromMedusa(cartId);
    } catch {
      dispatch({ type: "SET_LOADING", loading: false });
    }
  }, [syncFromMedusa]);

  useEffect(() => {
    if (hydrating.current || !MEDUSA_ENABLED) return;
    hydrating.current = true;
    refreshCart().finally(() => {
      hydrating.current = false;
    });
  }, [refreshCart]);

  const addItem = useCallback(
    async (item: Omit<CartItem, "qty">) => {
      if (!MEDUSA_ENABLED || !item.variantId) {
        dispatch({ type: "ADD_LOCAL", item });
        return;
      }

      dispatch({ type: "SET_LOADING", loading: true });
      try {
        const cartId = await ensureCart();
        if (!cartId) {
          dispatch({ type: "ADD_LOCAL", item });
          return;
        }

        await medusa.store.cart.createLineItem(cartId, {
          variant_id: item.variantId,
          quantity: 1,
        });
        await syncFromMedusa(cartId);
      } catch {
        dispatch({ type: "ADD_LOCAL", item });
      }
    },
    [ensureCart, syncFromMedusa]
  );

  const removeItem = useCallback(
    async (productNum: number) => {
      const existing = state.items.find((i) => i.productNum === productNum);
      if (!MEDUSA_ENABLED || !state.cartId || !existing?.lineItemId) {
        dispatch({ type: "REMOVE_LOCAL", productNum });
        return;
      }

      await medusa.store.cart.deleteLineItem(state.cartId, existing.lineItemId);
      await syncFromMedusa(state.cartId);
    },
    [state.cartId, state.items, syncFromMedusa]
  );

  const setQty = useCallback(
    async (productNum: number, qty: number) => {
      const existing = state.items.find((i) => i.productNum === productNum);
      if (!MEDUSA_ENABLED || !state.cartId || !existing?.lineItemId) {
        dispatch({ type: "SET_QTY_LOCAL", productNum, qty });
        return;
      }

      if (qty <= 0) {
        await medusa.store.cart.deleteLineItem(state.cartId, existing.lineItemId);
      } else {
        await medusa.store.cart.updateLineItem(state.cartId, existing.lineItemId, {
          quantity: qty,
        });
      }
      await syncFromMedusa(state.cartId);
    },
    [state.cartId, state.items, syncFromMedusa]
  );

  const clearCart = useCallback(async () => {
    localStorage.removeItem(CART_ID_KEY);
    dispatch({ type: "CLEAR_LOCAL" });
    if (MEDUSA_ENABLED) {
      await ensureCart();
    }
  }, [ensureCart]);

  const totalQty = state.items.reduce((s, i) => s + i.qty, 0);

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        totalQty,
        totalIrr: state.totalIrr,
        open: state.open,
        loading: state.loading,
        cartId: state.cartId,
        addItem,
        removeItem,
        setQty,
        clearCart,
        openCart: () => dispatch({ type: "OPEN" }),
        closeCart: () => dispatch({ type: "CLOSE" }),
        isInCart: (productNum: number) =>
          state.items.some((i) => i.productNum === productNum),
        refreshCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
