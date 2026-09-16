"use client";

import { StoreHeader } from "@/components/store/StoreChrome";
import { money } from "@/data/catalog";
import { findVariant, useCart } from "@/lib/cart";
import { useCatalog } from "@/lib/catalog-context";
import { startStripeCheckout } from "@/lib/stripe-checkout";
import { withBasePath } from "@/lib/paths";
import type { Order } from "@/types/store";
import { useState } from "react";

export default function CheckoutPage() {
  const { lines, clear } = useCart();
  const { catalog, productById, setCatalog } = useCatalog();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const detailed = lines
    .map((line) => {
      const product = productById(line.productId);
      if (!product) return null;
      return { line, product, variant: findVariant(product, line.variantId) };
    })
    .filter(Boolean);
  const total = detailed.reduce(
    (sum, entry) => sum + entry!.variant.priceCents * entry!.line.quantity,
    0,
  );

  const placeLocalOrder = () => {
    const order: Order = {
      id: `ord_${Date.now()}`,
      email,
      name,
      status: "paid",
      items: detailed.map((entry) => ({
        productId: entry!.product.id,
        variantId: entry!.variant.id,
        quantity: entry!.line.quantity,
        name: `${entry!.product.name} — ${entry!.variant.label}`,
        unitPriceCents: entry!.variant.priceCents,
      })),
      totalCents: total,
      createdAt: new Date().toISOString(),
    };
    setCatalog({
      ...catalog,
      orders: [order, ...catalog.orders],
      customers: catalog.customers.some((customer) => customer.email === email)
        ? catalog.customers
        : [
            { id: `cus_${Date.now()}`, email, name, createdAt: new Date().toISOString() },
            ...catalog.customers,
          ],
    });
    clear();
    window.location.assign(withBasePath("/checkout/success/"));
  };

  const pay = async () => {
    setError(null);
    if (!name || !email || detailed.length === 0) {
      setError("Add a name, email, and at least one found object.");
      return;
    }
    setBusy(true);
    try {
      const origin = window.location.origin;
      const result = await startStripeCheckout({
        lines,
        products: catalog.products,
        email,
        name,
        successUrl: `${origin}${withBasePath("/checkout/success/")}`,
        cancelUrl: `${origin}${withBasePath("/checkout/")}`,
      });
      if (result.ok) return;
      placeLocalOrder();
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Checkout failed.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className="page-shell">
      <StoreHeader />
      <h1 className="display-title text-4xl">Checkout</h1>
      <p className="mt-2 max-w-2xl text-[var(--ink-soft)]">
        Stripe Checkout is used when keys are configured. Until then, the apartment records a local
        demo order so the path can be walked end to end.
      </p>
      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <section className="panel-card space-y-3">
          <label className="block text-sm">
            Name
            <input className="ink-input mt-1 w-full" value={name} onChange={(e) => setName(e.target.value)} />
          </label>
          <label className="block text-sm">
            Email
            <input
              className="ink-input mt-1 w-full"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          {error ? <p className="text-sm text-red-700">{error}</p> : null}
          <button className="ink-button-solid" disabled={busy} onClick={() => void pay()}>
            {busy ? "Opening the till..." : "Pay"}
          </button>
        </section>
        <section className="panel-card">
          {detailed.map((entry) => (
            <p key={`${entry!.product.id}-${entry!.variant.id}`} className="flex justify-between gap-3 py-2">
              <span>
                {entry!.product.name} · {entry!.variant.label} × {entry!.line.quantity}
              </span>
              <span>{money(entry!.variant.priceCents * entry!.line.quantity)}</span>
            </p>
          ))}
          <p className="mt-4 text-lg font-bold">Total {money(total)}</p>
        </section>
      </div>
    </main>
  );
}
