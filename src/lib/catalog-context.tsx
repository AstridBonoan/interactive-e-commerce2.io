"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  hydrateCatalogFromSupabase,
  loadLocalCatalog,
  saveLocalCatalog,
} from "@/lib/catalog-store";
import type { CmsSnapshot, EasterEgg, Product, Room, RoomId } from "@/types/store";

type CatalogContextValue = {
  catalog: CmsSnapshot;
  setCatalog: (snapshot: CmsSnapshot) => void;
  productById: (id: string) => Product | undefined;
  productBySlug: (slug: string) => Product | undefined;
  roomById: (id: RoomId) => Room | undefined;
  eggById: (id: string) => EasterEgg | undefined;
  eggBySlug: (slug: string) => EasterEgg | undefined;
};

const CatalogContext = createContext<CatalogContextValue | null>(null);

export function CatalogProvider({ children }: { children: ReactNode }) {
  const [catalog, setCatalogState] = useState<CmsSnapshot>(loadLocalCatalog);

  useEffect(() => {
    void hydrateCatalogFromSupabase().then((remote) => {
      if (remote) setCatalogState(remote);
    });
  }, []);

  const setCatalog = (snapshot: CmsSnapshot) => {
    setCatalogState(snapshot);
    saveLocalCatalog(snapshot);
  };

  const value = useMemo<CatalogContextValue>(
    () => ({
      catalog,
      setCatalog,
      productById: (id) => catalog.products.find((product) => product.id === id),
      productBySlug: (slug) => catalog.products.find((product) => product.slug === slug),
      roomById: (id) => catalog.rooms.find((room) => room.id === id),
      eggById: (id) => catalog.easterEggs.find((egg) => egg.id === id),
      eggBySlug: (slug) => catalog.easterEggs.find((egg) => egg.slug === slug),
    }),
    [catalog],
  );

  return <CatalogContext.Provider value={value}>{children}</CatalogContext.Provider>;
}

export function useCatalog() {
  const value = useContext(CatalogContext);
  if (!value) throw new Error("useCatalog must be used inside CatalogProvider");
  return value;
}
