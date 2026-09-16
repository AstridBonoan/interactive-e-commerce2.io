export type RoomId = "room-1" | "room-2";

export type ProductKind = "clothing" | "print" | "home" | "music" | "book";

export type VariantOption = {
  id: string;
  name: string;
  values: string[];
};

export type ProductVariant = {
  id: string;
  label: string;
  options: Record<string, string>;
  priceCents: number;
  sku: string;
  inventory: number;
  stripePriceId?: string;
};

export type ProductPreview = {
  roomId: RoomId;
  x: number;
  y: number;
  zoom: number;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  kind: ProductKind;
  category: string;
  description: string;
  story: string;
  priceCents: number;
  compareAtCents?: number;
  images: string[];
  preview: ProductPreview;
  accent: string;
  optionTypes: VariantOption[];
  variants: ProductVariant[];
  featured?: boolean;
  active: boolean;
};

export type ProductPlacement = {
  id: string;
  productId: string;
  roomId: RoomId;
  x: number;
  y: number;
  width: number;
  height: number;
};

export type RoomConnection = {
  to: RoomId;
  label: string;
  x: number;
  y: number;
  width: number;
  height: number;
};

export type Room = {
  id: RoomId;
  number: number;
  slug: string;
  name: string;
  subtitle: string;
  category: string;
  description: string;
  connections: RoomConnection[];
};

export type EasterEgg = {
  id: string;
  slug: string;
  title: string;
  teaser: string;
  body: string;
  roomId: RoomId;
  x: number;
  y: number;
  width: number;
  height: number;
  kind:
    | "music"
    | "artist"
    | "collaborator"
    | "photo"
    | "book"
    | "message"
    | "object";
  extra?: string;
};

export type Interaction =
  | { type: "product"; productId: string }
  | { type: "egg"; eggId: string }
  | { type: "navigate"; to: RoomId }
  | { type: "listen"; eggId: string };

export type RoomObject = {
  id: string;
  roomId: RoomId;
  label: string;
  x: number;
  y: number;
  width: number;
  height: number;
  interaction?: Interaction;
};

export type CartLine = {
  productId: string;
  variantId: string;
  quantity: number;
};

export type Customer = {
  id: string;
  email: string;
  name?: string;
  createdAt: string;
};

export type OrderStatus = "draft" | "paid" | "fulfilled" | "canceled";

export type Order = {
  id: string;
  email: string;
  name: string;
  status: OrderStatus;
  items: Array<CartLine & { name: string; unitPriceCents: number }>;
  totalCents: number;
  createdAt: string;
  stripeSessionId?: string;
};

export type CmsSnapshot = {
  rooms: Room[];
  products: Product[];
  placements: ProductPlacement[];
  easterEggs: EasterEgg[];
  customers: Customer[];
  orders: Order[];
};
