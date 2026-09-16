"use client";

import { withBasePath } from "@/lib/paths";
import type { Product } from "@/types/store";

export function ProductPhoto({
  product,
  className,
  sizes = "hero",
}: {
  product: Product;
  className?: string;
  sizes?: "hero" | "tile" | "thumb";
}) {
  const src = withBasePath(product.images[0] ?? "/rooms/room-1.jpg");
  const frame =
    sizes === "thumb"
      ? "h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-[#1a120c]"
      : "overflow-hidden rounded-2xl bg-[#1a120c]";

  return (
    <figure className={`${frame} ${className ?? ""}`}>
      <img
        src={src}
        alt={product.name}
        className={sizes === "thumb" ? "h-full w-full object-cover" : "aspect-square w-full object-cover"}
        style={{
          objectFit: "cover",
          objectPosition: `${product.preview.x}% ${product.preview.y}%`,
          transform: `scale(${Math.min(product.preview.zoom, sizes === "thumb" ? 2.2 : product.preview.zoom)})`,
          transformOrigin: `${product.preview.x}% ${product.preview.y}%`,
        }}
      />
    </figure>
  );
}
