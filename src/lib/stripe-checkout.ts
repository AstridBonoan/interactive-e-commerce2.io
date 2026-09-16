import type { CartLine, Product } from "@/types/store";
import { findVariant } from "@/lib/cart";

function randomSuffix() {
  const letters = "abcdefghijklmnopqrstuvwxyz";
  return Array.from({ length: 8 }, () => letters[Math.floor(Math.random() * letters.length)]).join("");
}

export function getCheckoutConfig() {
  return {
    publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? "",
    functionUrl: process.env.NEXT_PUBLIC_CHECKOUT_FUNCTION_URL ?? "",
  };
}

export async function startStripeCheckout(input: {
  lines: CartLine[];
  products: Product[];
  email: string;
  name: string;
  successUrl: string;
  cancelUrl: string;
}) {
  const { publishableKey, functionUrl } = getCheckoutConfig();
  if (!publishableKey || !functionUrl) {
    return { ok: false as const, reason: "unconfigured" as const };
  }

  const items = input.lines.map((line) => {
    const product = input.products.find((entry) => entry.id === line.productId);
    if (!product) throw new Error("Missing product in cart");
    const variant = findVariant(product, line.variantId);
    return {
      name: `${product.name} — ${variant.label}`,
      amount: variant.priceCents,
      quantity: line.quantity,
      sku: variant.sku,
    };
  });

  const response = await fetch(functionUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      items,
      email: input.email,
      name: input.name,
      success_url: input.successUrl,
      cancel_url: input.cancelUrl,
      integration_identifier: `bc-atelier-${randomSuffix()}`,
    }),
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || "Checkout session failed");
  }

  const payload = (await response.json()) as { id?: string; url?: string };
  if (!payload.url) throw new Error("Checkout session did not return a URL");
  window.location.assign(payload.url);
  return { ok: true as const };
}
