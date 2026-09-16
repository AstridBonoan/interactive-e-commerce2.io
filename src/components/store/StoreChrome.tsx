"use client";

import { useAuth } from "@/lib/auth-context";
import { useCart } from "@/lib/cart";
import { useCatalog } from "@/lib/catalog-context";
import type { RoomId } from "@/types/store";
import Link from "next/link";

export function StoreHeader({ roomId }: { roomId?: RoomId }) {
  const { count } = useCart();
  const { catalog } = useCatalog();
  const { user } = useAuth();
  const room = roomId ? catalog.rooms.find((entry) => entry.id === roomId) : null;

  return (
    <header className="pointer-events-none absolute inset-x-0 top-0 z-20 flex items-start justify-between gap-3 p-3 sm:p-4">
      <Link href="/" className="pointer-events-auto rounded-2xl bg-[#120e0c]/70 px-3 py-2 text-[#f6f2ea] backdrop-blur">
        <p className="display-title text-base">B&amp;C</p>
        <p className="text-[0.7rem] tracking-[0.14em] uppercase text-[#f6f2ea]/70">
          {room ? room.subtitle : "The apartment"}
        </p>
      </Link>
      <nav className="store-nav pointer-events-auto flex flex-wrap justify-end gap-2">
        <Link className="ink-button" href="/shop/">
          Shop
        </Link>
        <Link className="ink-button hidden sm:inline-flex" href="/discover/">
          Discover
        </Link>
        <Link className="ink-button" href={user ? "/account/" : "/login/"}>
          {user ? "Account" : "Sign in"}
        </Link>
        <Link className="ink-button-solid" href="/cart/">
          Cart {count}
        </Link>
      </nav>
    </header>
  );
}

export function RoomRail({
  current,
  onSelect,
  onList,
}: {
  current: RoomId;
  onSelect: (roomId: RoomId) => void;
  onList: () => void;
}) {
  const { catalog } = useCatalog();

  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 p-3 sm:p-4">
      <div className="pointer-events-auto mx-auto flex max-w-3xl flex-col items-center gap-2">
        <p className="hidden rounded-full bg-[#120e0c]/80 px-4 py-2 text-center text-sm text-[#f6f2ea] sm:block">
          Walk the rooms. Click what looks like it belongs to you.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-1 rounded-full bg-[#f6f2ea]/85 px-2 py-1 text-sm text-[#2b241c]/55 backdrop-blur">
          {catalog.rooms.map((room) => {
            const active = room.id === current;
            return (
              <button
                key={room.id}
                type="button"
                onClick={() => onSelect(room.id)}
                className={`rounded-full px-3 py-1 ${
                  active ? "bg-[#2b241c] text-[#f6f2ea]" : "hover:text-[#2b241c]"
                }`}
              >
                {room.subtitle.replace("The ", "")}
              </button>
            );
          })}
          <button type="button" onClick={onList} className="rounded-full px-3 py-1 hover:text-[#2b241c]">
            In this room
          </button>
        </div>
      </div>
    </div>
  );
}
