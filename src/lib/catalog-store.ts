"use client";

import { seedCatalog } from "@/data/catalog";
import { getSupabase } from "@/lib/supabase";
import type { CmsSnapshot } from "@/types/store";

const STORAGE_KEY = "bc-atelier-cms-v1";

export function loadLocalCatalog(): CmsSnapshot {
  if (typeof window === "undefined") return structuredClone(seedCatalog);
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return structuredClone(seedCatalog);
    const parsed = JSON.parse(raw) as CmsSnapshot;
    return {
      rooms: parsed.rooms?.length ? parsed.rooms : seedCatalog.rooms,
      products: parsed.products?.length ? parsed.products : seedCatalog.products,
      placements: parsed.placements?.length ? parsed.placements : seedCatalog.placements,
      easterEggs: parsed.easterEggs?.length ? parsed.easterEggs : seedCatalog.easterEggs,
      customers: parsed.customers ?? [],
      orders: parsed.orders ?? [],
    };
  } catch {
    return structuredClone(seedCatalog);
  }
}

export function saveLocalCatalog(snapshot: CmsSnapshot) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot));
}

export async function hydrateCatalogFromSupabase(): Promise<CmsSnapshot | null> {
  const supabase = getSupabase();
  if (!supabase) return null;

  const [rooms, products, placements, eggs, customers, orders] = await Promise.all([
    supabase.from("rooms").select("*"),
    supabase.from("products").select("*, product_variants(*)"),
    supabase.from("product_placements").select("*"),
    supabase.from("easter_eggs").select("*"),
    supabase.from("customers").select("*"),
    supabase.from("orders").select("*, order_items(*)"),
  ]);

  if (rooms.error || products.error) return null;
  if (!rooms.data?.length || !products.data?.length) return null;

  return {
    rooms: rooms.data as CmsSnapshot["rooms"],
    products: products.data as CmsSnapshot["products"],
    placements: (placements.data ?? []) as CmsSnapshot["placements"],
    easterEggs: (eggs.data ?? []) as CmsSnapshot["easterEggs"],
    customers: (customers.data ?? []) as CmsSnapshot["customers"],
    orders: (orders.data ?? []) as CmsSnapshot["orders"],
  };
}
