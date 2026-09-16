"use client";

import type { EasterEgg } from "@/types/store";
import { AnimatePresence, motion } from "framer-motion";

export function EggPanel({ egg, onClose }: { egg: EasterEgg | null; onClose: () => void }) {
  return (
    <AnimatePresence>
      {egg ? (
        <motion.div
          className="fixed inset-0 z-40 flex items-end justify-center bg-[#1a120c]/55 p-3 sm:items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.aside
            className="panel-card relative w-full max-w-xl"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 16, opacity: 0 }}
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="egg-title"
          >
            <button className="absolute right-4 top-4 ink-button px-3 py-1 text-sm" onClick={onClose}>
              Close
            </button>
            <p className="eyebrow">{egg.kind === "collaborator" ? "Shout-out" : `Easter egg · ${egg.kind}`}</p>
            <h2 id="egg-title" className="display-title mt-2 text-3xl">
              {egg.title}
            </h2>
            <p className="mt-2 italic text-[var(--ink-soft)]">{egg.teaser}</p>
            <p className="mt-4 leading-7">{egg.body}</p>
            {egg.extra ? (
              <p className="mt-4 rounded-2xl bg-[var(--paper-deep)] px-4 py-3 text-sm">{egg.extra}</p>
            ) : null}
          </motion.aside>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
