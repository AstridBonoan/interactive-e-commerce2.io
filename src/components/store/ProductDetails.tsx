"use client";

import { ProductPhoto } from "@/components/store/ProductPhoto";
import { StoreHeader } from "@/components/store/StoreChrome";
import { ProductForm } from "@/components/store/ProductPanel";
import { money } from "@/data/catalog";
import { useCatalog } from "@/lib/catalog-context";
import Link from "next/link";

export function ProductDetails({ slug }: { slug: string }) {
  const { productBySlug, catalog } = useCatalog();
  const product = productBySlug(slug);
  const rooms = catalog.placements
    .filter((placement) => placement.productId === product?.id)
    .map((placement) => catalog.rooms.find((room) => room.id === placement.roomId))
    .filter(Boolean);

  if (!product) {
    return (
      <main className="page-shell">
        <StoreHeader />
        <div className="panel-card">
          <h1 className="display-title text-3xl">That object is not in the apartment.</h1>
          <Link className="ink-button mt-4 inline-block" href="/">
            Back inside
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="page-shell">
      <StoreHeader />
      <div className="panel-card grid gap-8 md:grid-cols-[0.9fr_1.1fr]">
        <ProductPhoto product={product} />
        <div>
          <p className="eyebrow">{product.category}</p>
          <h1 className="display-title mt-1 text-4xl">{product.name}</h1>
          <p className="mt-2 text-xl">{money(product.priceCents)}</p>
          <p className="mt-4 leading-7">{product.description}</p>
          <p className="mt-3 italic text-[var(--ink-soft)]">{product.story}</p>
          <div className="mt-5">
            <ProductForm product={product} />
          </div>
          {rooms.length ? (
            <p className="mt-6 text-sm text-[var(--ink-soft)]">
              Found in{" "}
              {rooms.map((room) => (
                <Link key={room!.id} className="underline" href={`/?room=${room!.id}`}>
                  {room!.subtitle}
                  {" "}
                </Link>
              ))}
            </p>
          ) : null}
        </div>
      </div>
    </main>
  );
}
