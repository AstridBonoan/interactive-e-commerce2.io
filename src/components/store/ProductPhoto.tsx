"use client";

import { withBasePath } from "@/lib/paths";
import type { Product } from "@/types/store";

export function productPhotoSrc(product: Product) {
  const first = product.images.find((image) => !image.startsWith("/rooms/"));
  if (first) {
    return first.startsWith("http") ? first : withBasePath(first);
  }
  return withBasePath(`/products/${product.slug}.jpg`);
}

export function ProductPhoto({
  product,
  className,
  sizes = "hero",
}: {
  product: Product;
  className?: string;
  sizes?: "hero" | "tile" | "thumb";
}) {
  const src = productPhotoSrc(product);
  const frame =
    sizes === "thumb"
      ? "h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-[#efe8dc]"
      : "overflow-hidden rounded-2xl bg-[#efe8dc]";

  return (
    <figure className={`${frame} ${className ?? ""}`}>
      <img
        src={src}
        alt={product.name}
        className={
          sizes === "thumb"
            ? "h-full w-full object-contain p-1"
            : "aspect-square w-full object-contain p-3"
        }
      />
    </figure>
  );
}
