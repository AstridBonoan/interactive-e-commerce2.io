"use client";

import { RoomStage } from "@/components/apartment/RoomStage";
import { EggPanel } from "@/components/store/EggPanel";
import { ProductPanel } from "@/components/store/ProductPanel";
import { RoomRail, StoreHeader } from "@/components/store/StoreChrome";
import { isRoomId, roomObjects } from "@/data/world";
import { useCatalog } from "@/lib/catalog-context";
import type { EasterEgg, Product, RoomId, RoomObject } from "@/types/store";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

export function ApartmentExplorer({ initialRoom }: { initialRoom?: RoomId }) {
  const params = useSearchParams();
  const router = useRouter();
  const { productById, eggById, catalog } = useCatalog();
  const debug = params.get("debug") === "1";
  const requested = params.get("room") ?? initialRoom ?? "room-1";
  const roomId: RoomId = isRoomId(requested) ? requested : "room-1";
  const room = catalog.rooms.find((entry) => entry.id === roomId);

  const [product, setProduct] = useState<Product | null>(null);
  const [egg, setEgg] = useState<EasterEgg | null>(null);
  const [listOpen, setListOpen] = useState(false);
  const [intro, setIntro] = useState(true);

  const closeOverlays = () => {
    setProduct(null);
    setEgg(null);
    setListOpen(false);
  };

  useEffect(() => {
    if (window.sessionStorage.getItem("bc-atelier-entered") === "1") setIntro(false);
  }, []);

  const objects = useMemo(
    () => roomObjects.filter((object) => object.roomId === roomId && object.interaction),
    [roomId],
  );

  const goTo = (next: RoomId) => {
    closeOverlays();
    router.replace(debug ? `/?room=${next}&debug=1` : `/?room=${next}`, { scroll: false });
  };

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (intro) {
          window.sessionStorage.setItem("bc-atelier-entered", "1");
          setIntro(false);
          return;
        }
        closeOverlays();
        return;
      }
      if (intro || product || egg || listOpen) return;
      if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
        event.preventDefault();
        goTo(roomId === "room-1" ? "room-2" : "room-1");
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [egg, intro, listOpen, product, roomId]);

  const handleObject = (object: RoomObject) => {
    const action = object.interaction;
    if (!action) return;
    if (action.type === "navigate") {
      goTo(action.to);
      return;
    }
    if (action.type === "product") {
      const item = productById(action.productId);
      if (item) setProduct(item);
      return;
    }
    const found = eggById(action.eggId);
    if (found) setEgg(found);
  };

  return (
    <div className="apartment-shell">
      <StoreHeader roomId={roomId} />
      <RoomStage
        roomId={roomId}
        objects={objects}
        interactive={!product && !egg && !listOpen}
        debug={debug}
        onObject={handleObject}
      />
      <RoomRail current={roomId} onSelect={goTo} onList={() => setListOpen(true)} />
      <ProductPanel
        product={product}
        onClose={() => setProduct(null)}
        onBuyNow={() => router.push("/checkout/")}
      />
      <EggPanel egg={egg} onClose={() => setEgg(null)} />
      <AnimatePresence>
        {listOpen ? (
          <motion.div
            className="fixed inset-0 z-30 flex items-end justify-center bg-[#1a120c]/45 p-3 sm:items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setListOpen(false)}
          >
            <motion.aside
              className="panel-card relative max-h-[80vh] w-full max-w-lg overflow-auto"
              initial={{ y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 16, opacity: 0 }}
              onClick={(event) => event.stopPropagation()}
            >
              <button className="absolute right-4 top-4 ink-button px-3 py-1 text-sm" onClick={() => setListOpen(false)}>
                Close
              </button>
              <p className="eyebrow">Accessible list</p>
              <h2 className="display-title mt-2 text-3xl">{room?.subtitle}</h2>
              <p className="mt-2 text-sm text-[var(--ink-soft)]">{room?.description}</p>
              <ul className="mt-4 space-y-2">
                {objects.map((object) => (
                  <li key={object.id}>
                    <button
                      className="ink-button w-full text-left"
                      onClick={() => {
                        setListOpen(false);
                        handleObject(object);
                      }}
                    >
                      {object.label}
                    </button>
                  </li>
                ))}
              </ul>
            </motion.aside>
          </motion.div>
        ) : null}
      </AnimatePresence>
      {intro ? (
        <button
          className="intro-card"
          onClick={() => {
            window.sessionStorage.setItem("bc-atelier-entered", "1");
            setIntro(false);
          }}
        >
          <p className="eyebrow">A store you can walk through</p>
          <h1 className="display-title mt-2 text-4xl sm:text-5xl">Come in.</h1>
          <p className="mt-3 max-w-md leading-7 text-[#f6f2ea]/90">
            Two rooms in one apartment. The loft is where things live. The studio is where they leave.
            Click the open door, then click anything that looks like it might be yours.
          </p>
          <p className="mt-5 font-semibold">Tap anywhere to enter</p>
        </button>
      ) : null}
    </div>
  );
}
