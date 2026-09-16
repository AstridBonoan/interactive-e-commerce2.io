# B&C — The Apartment Shop

An illustrated loft that is also a store. Visitors walk two rooms, pick up objects that are for sale, and find a few things that are not.

This is not a game. There are no characters, levels, points, or combat. The apartment is the storefront.

Live repository: [AstridBonoan/interactive-e-commerce2.io](https://github.com/AstridBonoan/interactive-e-commerce2.io)

## Rooms

| Room | Place | What lives there |
| --- | --- | --- |
| Room 1 | The Loft | Prints, vinyl, living objects |
| Room 2 | The Studio | Apparel, proofs, packed orders |

The open door in the loft leads into the studio. The studio doorway looks back into the loft. A small room rail exists for accessibility.

Products sit on walls, rails, tables, and shelves. Clicking one opens a normal product sheet: art, description, price, variants, quantity, Add to Cart, and Buy Now.

## Stack

- Next.js, React, TypeScript, Tailwind CSS, Framer Motion
- Per-room illustrated scenes with object metadata
- Optional Supabase and Stripe Checkout
- GitHub Actions deploying a static export to the `gh-pages` branch

GitHub Pages is the primary host. The app is a static export, so there are no Next.js server routes on Pages.

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Leave `NEXT_PUBLIC_BASE_PATH` empty locally.

## GitHub Pages

The production workflow is **Deploy from branch → `gh-pages`**.

1. Push to `main`.
2. GitHub Actions builds `output: "export"` and publishes the `out` folder to `gh-pages`.
3. In the repository settings, set Pages to **Deploy from a branch**, branch `gh-pages`, folder `/ (root)`.
4. The project URL will be `https://astridbonoan.github.io/interactive-e-commerce2.io/`.

The workflow sets `NEXT_PUBLIC_BASE_PATH=/interactive-e-commerce2.io` so asset and route prefixes match a project site.

A `.nojekyll` file is written so the `_next` folder is not ignored by GitHub Pages.

## Adding another room

1. Add a room illustration under `public/rooms/`.
2. Register it in `src/data/world.ts` (`ROOM_ART`, `roomObjects`, glows).
3. Add the room record, products, and Easter eggs in `src/data/catalog.ts`.
4. Extend `RoomId` in `src/types/store.ts`.

Objects reference products or actions. They do not hardcode checkout behavior into the scene.
