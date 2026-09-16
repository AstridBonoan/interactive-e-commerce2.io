"use client";

import { StoreHeader } from "@/components/store/StoreChrome";
import { useCatalog } from "@/lib/catalog-context";
import Link from "next/link";

export default function DiscoverPage() {
  const { catalog } = useCatalog();
  return (
    <main className="page-shell">
      <StoreHeader />
      <h1 className="display-title text-4xl">Discoveries</h1>
      <p className="mt-2 max-w-2xl text-[var(--ink-soft)]">
        These are not products. They are the apartment remembering people, songs, and leftover notes.
      </p>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {catalog.easterEggs.map((egg) => (
          <Link key={egg.id} href={`/discover/${egg.slug}/`} className="panel-card">
            <p className="eyebrow">{egg.kind} · {egg.roomId}</p>
            <h2 className="display-title text-2xl">{egg.title}</h2>
            <p className="mt-2">{egg.teaser}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
