"use client";

import { StoreHeader } from "@/components/store/StoreChrome";
import { useCatalog } from "@/lib/catalog-context";
import Link from "next/link";

export function EggDetails({ slug }: { slug: string }) {
  const { eggBySlug } = useCatalog();
  const egg = eggBySlug(slug);
  if (!egg) {
    return (
      <main className="page-shell">
        <StoreHeader />
        <div className="panel-card">That secret wandered off.</div>
      </main>
    );
  }
  return (
    <main className="page-shell">
      <StoreHeader />
      <article className="panel-card max-w-2xl">
        <p className="eyebrow">{egg.kind === "collaborator" ? "Shout-out" : egg.kind}</p>
        <h1 className="display-title mt-2 text-4xl">{egg.title}</h1>
        <p className="mt-3 italic">{egg.teaser}</p>
        <p className="mt-4 leading-7">{egg.body}</p>
        {egg.extra ? <p className="mt-4 rounded-2xl bg-[var(--paper-deep)] p-4">{egg.extra}</p> : null}
        <Link className="ink-button mt-6 inline-block" href={`/?room=${egg.roomId}`}>
          Return to the room
        </Link>
      </article>
    </main>
  );
}
