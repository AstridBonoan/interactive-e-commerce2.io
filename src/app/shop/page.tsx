"use client";

import { ProductPhoto } from "@/components/store/ProductPhoto";
import { StoreHeader } from "@/components/store/StoreChrome";
import { money } from "@/data/catalog";
import { useCatalog } from "@/lib/catalog-context";
import Link from "next/link";
import { useMemo, useState } from "react";

export default function ShopPage() {
  const { catalog } = useCatalog();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const categories = ["All", ...Array.from(new Set(catalog.products.map((product) => product.category)))];
  const products = useMemo(
    () =>
      catalog.products.filter((product) => {
        if (!product.active) return false;
        if (category !== "All" && product.category !== category) return false;
        return product.name.toLowerCase().includes(query.toLowerCase());
      }),
    [catalog.products, category, query],
  );

  return (
    <main className="page-shell">
      <StoreHeader />
      <div className="mb-6">
        <p className="eyebrow">Secondary catalog</p>
        <h1 className="display-title text-4xl">Everything currently in the apartment</h1>
        <p className="mt-2 max-w-2xl text-[var(--ink-soft)]">
          The rooms are the real store. This list is here if you would rather browse after wandering.
        </p>
      </div>
      <div className="mb-5 flex flex-wrap gap-2">
        <input
          className="ink-input max-w-xs"
          placeholder="Search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        {categories.map((entry) => (
          <button
            key={entry}
            type="button"
            className={entry === category ? "ink-button-solid" : "ink-button"}
            onClick={() => setCategory(entry)}
          >
            {entry}
          </button>
        ))}
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <Link key={product.id} href={`/product/${product.slug}/`} className="panel-card">
            <ProductPhoto product={product} sizes="tile" />
            <p className="eyebrow mt-3">{product.category}</p>
            <h2 className="display-title text-2xl">{product.name}</h2>
            <p className="mt-1">{money(product.priceCents)}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
