"use client";

import { StoreHeader } from "@/components/store/StoreChrome";
import { money, seedCatalog } from "@/data/catalog";
import { useAuth } from "@/lib/auth-context";
import { useCatalog } from "@/lib/catalog-context";
import Link from "next/link";
import { useMemo, useState } from "react";

const tabs = ["Products", "Rooms", "Eggs", "Orders", "Customers"] as const;

export default function CmsPage() {
  const { catalog, setCatalog } = useCatalog();
  const { user, isAdmin, loading } = useAuth();
  const [tab, setTab] = useState<(typeof tabs)[number]>("Products");
  const [query, setQuery] = useState("");
  const products = useMemo(
    () =>
      catalog.products.filter((product) =>
        product.name.toLowerCase().includes(query.toLowerCase()),
      ),
    [catalog.products, query],
  );

  if (loading) {
    return (
      <main className="page-shell">
        <StoreHeader />
        <p className="text-[var(--ink-soft)]">Checking account…</p>
      </main>
    );
  }

  if (!isAdmin) {
    return (
      <main className="page-shell">
        <StoreHeader />
        <div className="panel-card max-w-lg">
          <p className="eyebrow">Admin only</p>
          <h1 className="display-title mt-2 text-4xl">Content management</h1>
          <p className="mt-3 text-[var(--ink-soft)]">
            Create or sign in as admin, then open this from Account.
          </p>
          <Link className="ink-button-solid mt-5 inline-block" href={user ? "/account/" : "/login/"}>
            {user ? "Back to account" : "Sign in"}
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="page-shell">
      <StoreHeader />
      <p className="eyebrow">Apartment CMS</p>
      <h1 className="display-title text-4xl">Back office of the loft</h1>
      <p className="mt-2 max-w-3xl text-[var(--ink-soft)]">
        Seed data lives in <code>src/data/catalog.ts</code> and room objects in <code>src/data/world.ts</code>.
        This dashboard edits a local overlay. Signed in as {user?.email}.
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        {tabs.map((entry) => (
          <button
            key={entry}
            className={entry === tab ? "ink-button-solid" : "ink-button"}
            onClick={() => setTab(entry)}
          >
            {entry}
          </button>
        ))}
        <button className="ink-button" onClick={() => setCatalog(structuredClone(seedCatalog))}>
          Reset seed
        </button>
      </div>

      {tab === "Products" ? (
        <section className="mt-6 space-y-3">
          <input
            className="ink-input w-full max-w-md"
            placeholder="Search products"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          {products.map((product) => (
            <article key={product.id} className="panel-card grid gap-3 md:grid-cols-[1fr_auto]">
              <div>
                <p className="eyebrow">
                  {product.kind} · {product.category} · {product.variants.length} variants
                </p>
                <input
                  className="ink-input mt-2 w-full"
                  value={product.name}
                  onChange={(event) =>
                    setCatalog({
                      ...catalog,
                      products: catalog.products.map((entry) =>
                        entry.id === product.id ? { ...entry, name: event.target.value } : entry,
                      ),
                    })
                  }
                />
                <textarea
                  className="ink-input mt-2 w-full"
                  rows={3}
                  value={product.description}
                  onChange={(event) =>
                    setCatalog({
                      ...catalog,
                      products: catalog.products.map((entry) =>
                        entry.id === product.id
                          ? { ...entry, description: event.target.value }
                          : entry,
                      ),
                    })
                  }
                />
              </div>
              <div className="text-right">
                <p className="text-xl font-bold">{money(product.priceCents)}</p>
                <p className="text-sm">{product.active ? "Active" : "Hidden"}</p>
              </div>
            </article>
          ))}
        </section>
      ) : null}

      {tab === "Rooms" ? (
        <section className="mt-6 grid gap-3">
          {catalog.rooms.map((room) => (
            <article key={room.id} className="panel-card">
              <p className="eyebrow">{room.id}</p>
              <h2 className="display-title text-2xl">
                {room.name} — {room.subtitle}
              </h2>
              <p>{room.description}</p>
            </article>
          ))}
        </section>
      ) : null}

      {tab === "Eggs" ? (
        <section className="mt-6 grid gap-3 md:grid-cols-2">
          {catalog.easterEggs.map((egg) => (
            <article key={egg.id} className="panel-card">
              <p className="eyebrow">{egg.kind}</p>
              <h2 className="display-title text-2xl">{egg.title}</h2>
              <p>{egg.body}</p>
            </article>
          ))}
        </section>
      ) : null}

      {tab === "Orders" ? (
        <section className="mt-6 space-y-3">
          {catalog.orders.length === 0 ? (
            <div className="panel-card">No orders yet.</div>
          ) : (
            catalog.orders.map((order) => (
              <article key={order.id} className="panel-card">
                <p className="eyebrow">{order.status}</p>
                <h2 className="display-title text-2xl">{order.name}</h2>
                <p>{order.email}</p>
                <p className="font-bold">{money(order.totalCents)}</p>
              </article>
            ))
          )}
        </section>
      ) : null}

      {tab === "Customers" ? (
        <section className="mt-6 space-y-3">
          {catalog.customers.length === 0 ? (
            <div className="panel-card">Customers appear after checkout.</div>
          ) : (
            catalog.customers.map((customer) => (
              <article key={customer.id} className="panel-card">
                <h2 className="display-title text-2xl">{customer.name || "Unnamed guest"}</h2>
                <p>{customer.email}</p>
              </article>
            ))
          )}
        </section>
      ) : null}
    </main>
  );
}
