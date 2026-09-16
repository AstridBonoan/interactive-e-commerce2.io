"use client";

import { ROOM_ART, ROOM_GLOWS, type Glow } from "@/data/world";
import { withBasePath } from "@/lib/paths";
import type { RoomId, RoomObject } from "@/types/store";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, type ReactNode } from "react";

export function RoomStage({
  roomId,
  objects,
  interactive,
  debug = false,
  onObject,
  children,
}: {
  roomId: RoomId;
  objects: RoomObject[];
  interactive: boolean;
  debug?: boolean;
  onObject: (object: RoomObject) => void;
  children?: ReactNode;
}) {
  const art = ROOM_ART[roomId];
  const stageRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    scroller.scrollLeft = 0;
    scroller.scrollTop = 0;
  }, [roomId]);

  return (
    <div ref={stageRef} className="apartment-stage">
      <div ref={scrollerRef} className="room-scroller">
        <AnimatePresence mode="wait">
          <motion.div
            key={roomId}
            className="room-frame"
            style={{
              ["--room-aspect" as string]: String(art.width / art.height),
            }}
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.99 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <img
              src={withBasePath(art.src)}
              alt={art.alt}
              width={art.width}
              height={art.height}
              draggable={false}
              className="room-art"
            />
            <div className="pointer-events-none absolute inset-0" aria-hidden>
              {ROOM_GLOWS[roomId].map((glow, index) => (
                <span
                  key={`${roomId}-glow-${index}`}
                  className={`room-glow room-glow-${glow.tone}`}
                  style={glowStyle(glow)}
                />
              ))}
            </div>
            <div className="room-hotspots">
            {objects.map((object) => (
              <button
                key={object.id}
                type="button"
                className={`hotspot hotspot-${object.interaction?.type ?? "quiet"} ${
                  interactive ? "" : "pointer-events-none"
                } ${debug ? "hotspot-debug" : ""}`}
                style={{
                  left: `${object.x}%`,
                  top: `${object.y}%`,
                  width: `${object.width}%`,
                  height: `${object.height}%`,
                }}
                aria-label={object.label}
                disabled={!interactive || !object.interaction}
                onClick={(event) => {
                  event.stopPropagation();
                  if (object.interaction) onObject(object);
                }}
              >
                <span className="hotspot-label">{object.label}</span>
              </button>
            ))}
            </div>
            {children}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function glowStyle(glow: Glow) {
  return {
    left: `${glow.x}%`,
    top: `${glow.y}%`,
    width: `${glow.width}%`,
    height: `${glow.height}%`,
  };
}
