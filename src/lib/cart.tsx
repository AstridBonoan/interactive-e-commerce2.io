"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { CartLine, Product } from "@/types/store";

const CART_KEY = "bc-atelier-cart-v1";

type CartContextValue = {
  lines: CartLine[];
  add: (productId: string, variantId: string, quantity?: number) => void;
  setQuantity: (productId: string, variantId: string, quantity: number) => void;
  remove: (productId: string, variantId: string) => void;
  clear: () => void;
  count: number;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(CART_KEY);
      if (raw) setLines(JSON.parse(raw) as CartLine[]);
    } catch {
      setLines([]);
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) window.localStorage.setItem(CART_KEY, JSON.stringify(lines));
  }, [lines, ready]);

  const value = useMemo<CartContextValue>(() => {
    const add: CartContextValue["add"] = (productId, variantId, quantity = 1) => {
      setLines((current) => {
        const match = current.find(
          (line) => line.productId === productId && line.variantId === variantId,
        );
        if (match) {
          return current.map((line) =>
            line === match ? { ...line, quantity: line.quantity + quantity } : line,
          );
        }
        return [...current, { productId, variantId, quantity }];
      });
    };

    return {
      lines,
      add,
      setQuantity: (productId, variantId, quantity) => {
        setLines((current) =>
          quantity <= 0
            ? current.filter(
                (line) => !(line.productId === productId && line.variantId === variantId),
              )
            : current.map((line) =>
                line.productId === productId && line.variantId === variantId
                  ? { ...line, quantity }
                  : line,
              ),
        );
      },
      remove: (productId, variantId) => {
        setLines((current) =>
          current.filter(
            (line) => !(line.productId === productId && line.variantId === variantId),
          ),
        );
      },
      clear: () => setLines([]),
      count: lines.reduce((sum, line) => sum + line.quantity, 0),
    };
  }, [lines]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const value = useContext(CartContext);
  if (!value) throw new Error("useCart must be used inside CartProvider");
  return value;
}

export function findVariant(product: Product, variantId: string) {
  return product.variants.find((variant) => variant.id === variantId) ?? product.variants[0];
}
