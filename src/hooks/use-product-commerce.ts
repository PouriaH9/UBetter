"use client";

import { useEffect, useState } from "react";
import type { Locale } from "@/i18n/config";
import { fetchAllMergedProducts } from "@/lib/products";

export type ProductCommerceInfo = {
  variantId?: string;
  priceLabel?: string;
  priceIrr?: number;
  inStock: boolean;
};

export function useProductCommerceMap(locale: Locale) {
  const [map, setMap] = useState<Record<number, ProductCommerceInfo>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    fetchAllMergedProducts(locale)
      .then((products) => {
        if (cancelled) return;
        const next: Record<number, ProductCommerceInfo> = {};
        for (const p of products) {
          next[p.productNum] = {
            variantId: p.variantId,
            priceLabel: p.priceLabel,
            priceIrr: p.priceIrr,
            inStock: p.inStock,
          };
        }
        setMap(next);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [locale]);

  return { map, loading };
}
