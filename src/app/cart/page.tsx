"use client";

import { ProductPhoto } from "@/components/store/ProductPhoto";
import { StoreHeader } from "@/components/store/StoreChrome";
import { money } from "@/data/catalog";
import { findVariant, useCart } from "@/lib/cart";
import { useCatalog } from "@/lib/catalog-context";
import Link from "next/link";

export default function CartPage() {
  const { lines, setQuantity, remove } = useCart();
  const { productById } = useCatalog();
  const detailed = lines
    .map((line) => {
      const product = productById(line.productId);
      if (!product) return null;
      const variant = findVariant(product, line.variantId);
      return { line, product, variant };
    })
    .filter(Boolean);
  const total = detailed.reduce(
    (sum, entry) => sum + entry!.variant.priceCents * entry!.line.quantity,
    0,
  );

  return (
    <main className="page-shell">
      <StoreHeader />
      <h1 className="display-title text-4xl">Cart</h1>
      <div className="mt-6 space-y-3">
        {detailed.length === 0 ? (
          <div className="panel-card">
            <p>Nothing gathered yet. The print above the bed is a good start.</p>
            <Link className="ink-button mt-4 inline-block" href="/">
              Return to the rooms
            </Link>
          </div>
        ) : (
          detailed.map((entry) => (
            <div key={`${entry!.product.id}-${entry!.variant.id}`} className="panel-card flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <ProductPhoto product={entry!.product} sizes="thumb" />
                <div>
                  <h2 className="display-title text-2xl">{entry!.product.name}</h2>
                  <p className="text-sm text-[var(--ink-soft)]">{entry!.variant.label}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <input
                  className="ink-input w-20"
                  type="number"
                  min={1}
                  value={entry!.line.quantity}
                  onChange={(event) =>
                    setQuantity(entry!.product.id, entry!.variant.id, Number(event.target.value))
                  }
                />
                <p>{money(entry!.variant.priceCents * entry!.line.quantity)}</p>
                <button
                  className="ink-button"
                  onClick={() => remove(entry!.product.id, entry!.variant.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      {detailed.length ? (
        <div className="mt-6 flex items-center justify-between">
          <p className="text-xl font-bold">Total {money(total)}</p>
          <Link className="ink-button-solid" href="/checkout/">
            Checkout
          </Link>
        </div>
      ) : null}
    </main>
  );
}
