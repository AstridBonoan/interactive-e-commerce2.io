import type { RoomId, RoomObject } from "@/types/store";

export const ROOM_ART: Record<RoomId, { src: string; width: number; height: number; alt: string }> = {
  "room-1": {
    src: "/rooms/room-1.jpg",
    width: 1024,
    height: 682,
    alt: "A dusk-lit loft bedroom with a city sunset, olive bed, desk, and green sofa",
  },
  "room-2": {
    src: "/rooms/room-2.jpg",
    width: 1280,
    height: 720,
    alt: "A creative studio with a packing table, hoodie rail, and a doorway back to the loft",
  },
};

export const ROOM_IDS: RoomId[] = ["room-1", "room-2"];

export function isRoomId(value: string | null | undefined): value is RoomId {
  return value === "room-1" || value === "room-2";
}

export type Glow = { x: number; y: number; width: number; height: number; tone: "lamp" | "window" | "lava" | "candle" };

export const ROOM_GLOWS: Record<RoomId, Glow[]> = {
  "room-1": [
    { x: 27, y: 30, width: 6, height: 8, tone: "lamp" },
    { x: 49, y: 30, width: 5, height: 8, tone: "lamp" },
    { x: 58, y: 12, width: 16, height: 18, tone: "window" },
    { x: 91, y: 28, width: 4, height: 10, tone: "lava" },
    { x: 54, y: 56, width: 3, height: 4, tone: "candle" },
    { x: 96, y: 48, width: 5, height: 10, tone: "lamp" },
  ],
  "room-2": [
    { x: 10, y: 24, width: 6, height: 10, tone: "lamp" },
    { x: 8, y: 8, width: 16, height: 20, tone: "window" },
    { x: 66, y: 34, width: 4, height: 10, tone: "lava" },
    { x: 82, y: 28, width: 6, height: 10, tone: "lamp" },
  ],
};

export const roomObjects: RoomObject[] = [
  { id: "r1-door", roomId: "room-1", label: "Open door to the studio", x: 0, y: 3, width: 8.5, height: 70, interaction: { type: "navigate", to: "room-2" } },
  { id: "r1-smiley", roomId: "room-1", label: "Door smiley", x: 0.6, y: 28, width: 4, height: 7, interaction: { type: "egg", eggId: "egg-smiley" } },
  { id: "r1-better-days", roomId: "room-1", label: "Better Days Ahead print", x: 12.2, y: 5.5, width: 10.2, height: 20, interaction: { type: "product", productId: "better-days-print" } },
  { id: "r1-wave", roomId: "room-1", label: "Night Wave print", x: 22.4, y: 5.5, width: 8.4, height: 18.5, interaction: { type: "product", productId: "night-wave-print" } },
  { id: "r1-cat", roomId: "room-1", label: "Sleeping cat", x: 33, y: 35.5, width: 9, height: 8, interaction: { type: "egg", eggId: "egg-cat-loft" } },
  { id: "r1-skate", roomId: "room-1", label: "Crown skate deck", x: 8, y: 38, width: 7, height: 28, interaction: { type: "product", productId: "loft-skate-deck" } },
  { id: "r1-bottle", roomId: "room-1", label: "B&C day bottle", x: 4.6, y: 57, width: 5.2, height: 16, interaction: { type: "product", productId: "bc-day-bottle" } },
  { id: "r1-artists", roomId: "room-1", label: "Fridge note", x: 6.5, y: 84, width: 8, height: 11, interaction: { type: "egg", eggId: "egg-artists" } },
  { id: "r1-polaroid", roomId: "room-1", label: "Fridge polaroid", x: 12.2, y: 86, width: 5, height: 9, interaction: { type: "egg", eggId: "egg-polaroid-loft" } },
  { id: "r1-sneakers", roomId: "room-1", label: "Night court sneakers", x: 29.5, y: 49, width: 7.5, height: 6, interaction: { type: "product", productId: "court-sneakers" } },
  { id: "r1-lamp", roomId: "room-1", label: "Desk glow lamp", x: 48.2, y: 27, width: 4.6, height: 13, interaction: { type: "product", productId: "desk-glow-lamp" } },
  { id: "r1-speakers", roomId: "room-1", label: "B&C bookshelf monitors", x: 50.8, y: 33, width: 17.5, height: 8, interaction: { type: "product", productId: "bc-monitors" } },
  { id: "r1-good-things", roomId: "room-1", label: "Good Things Take Time print", x: 75.2, y: 5, width: 8.2, height: 16.5, interaction: { type: "product", productId: "good-things-print" } },
  { id: "r1-portrait", roomId: "room-1", label: "Watcher print", x: 84, y: 2, width: 7, height: 15, interaction: { type: "egg", eggId: "egg-portrait" } },
  { id: "r1-turntable", roomId: "room-1", label: "Dusk turntable", x: 77.5, y: 30, width: 12.5, height: 10.5, interaction: { type: "product", productId: "dusk-turntable" } },
  { id: "r1-lava", roomId: "room-1", label: "Dusk lava lamp", x: 89.5, y: 25, width: 4.4, height: 13, interaction: { type: "product", productId: "lava-glow" } },
  { id: "r1-books", roomId: "room-1", label: "Art Life Ideas books", x: 45, y: 50.5, width: 11, height: 8, interaction: { type: "product", productId: "art-life-ideas" } },
  { id: "r1-controller", roomId: "room-1", label: "Paused controller", x: 47.5, y: 57, width: 6.5, height: 6, interaction: { type: "egg", eggId: "egg-controller" } },
  { id: "r1-pillow", roomId: "room-1", label: "Crown throw pillow", x: 82, y: 50, width: 13, height: 16, interaction: { type: "product", productId: "crown-pillow" } },
  { id: "r1-throw", roomId: "room-1", label: "Night knit throw", x: 75.5, y: 64, width: 14, height: 18, interaction: { type: "product", productId: "loft-throw" } },
  { id: "r1-nike", roomId: "room-1", label: "Sneaker box", x: 80, y: 83, width: 12, height: 12, interaction: { type: "product", productId: "court-sneakers" } },
  { id: "r1-mat", roomId: "room-1", label: "Good Vibes mat", x: 16, y: 85.5, width: 15, height: 11, interaction: { type: "egg", eggId: "egg-vibes-mat" } },

  { id: "r2-door", roomId: "room-2", label: "Doorway back to the loft", x: 73, y: 8, width: 16, height: 54, interaction: { type: "navigate", to: "room-1" } },
  { id: "r2-window", roomId: "room-2", label: "Studio window", x: 3.5, y: 5, width: 20, height: 26, interaction: { type: "egg", eggId: "egg-window-note" } },
  { id: "r2-lamp", roomId: "room-2", label: "Desk glow lamp", x: 8.5, y: 22, width: 6, height: 14, interaction: { type: "product", productId: "desk-glow-lamp" } },
  { id: "r2-speakers", roomId: "room-2", label: "B&C bookshelf monitors", x: 1.8, y: 28, width: 9, height: 14, interaction: { type: "product", productId: "bc-monitors" } },
  { id: "r2-bottle", roomId: "room-2", label: "B&C day bottle", x: 3.8, y: 48, width: 4.2, height: 14, interaction: { type: "product", productId: "bc-day-bottle" } },
  { id: "r2-nike", roomId: "room-2", label: "Sneaker box", x: 8.5, y: 48, width: 8.5, height: 11, interaction: { type: "product", productId: "court-sneakers" } },
  { id: "r2-fridge", roomId: "room-2", label: "Studio fridge gallery", x: 0.8, y: 62, width: 12, height: 32, interaction: { type: "egg", eggId: "egg-fridge-studio" } },
  { id: "r2-wave-proof", roomId: "room-2", label: "Wave proof on the table", x: 24, y: 52, width: 14, height: 16, interaction: { type: "product", productId: "proof-pack" } },
  { id: "r2-framed", roomId: "room-2", label: "Studio proof pack", x: 38, y: 50, width: 13, height: 13, interaction: { type: "product", productId: "night-wave-print" } },
  { id: "r2-sketch", roomId: "room-2", label: "Unfiled sketchbook", x: 36, y: 66, width: 12, height: 12, interaction: { type: "product", productId: "field-sketchbook" } },
  { id: "r2-mug", roomId: "room-2", label: "B&C studio mug", x: 51.5, y: 52, width: 4.6, height: 8, interaction: { type: "product", productId: "studio-mug" } },
  { id: "r2-box", roomId: "room-2", label: "Crown packed drop", x: 56, y: 50, width: 13, height: 14, interaction: { type: "product", productId: "packed-drop" } },
  { id: "r2-hoodie-moss", roomId: "room-2", label: "Moss crown hoodie", x: 40.2, y: 16, width: 6.4, height: 26, interaction: { type: "product", productId: "moss-hoodie" } },
  { id: "r2-hoodie-ink", roomId: "room-2", label: "Ink crown hoodie", x: 46.4, y: 16, width: 6.2, height: 26, interaction: { type: "product", productId: "crown-hoodie" } },
  { id: "r2-varsity", roomId: "room-2", label: "Night varsity jacket", x: 52.4, y: 16, width: 7.2, height: 26, interaction: { type: "product", productId: "night-varsity" } },
  { id: "r2-cat", roomId: "room-2", label: "Studio cat", x: 43, y: 40, width: 8, height: 10, interaction: { type: "egg", eggId: "egg-cat-studio" } },
  { id: "r2-good-things", roomId: "room-2", label: "Good Things Take Time print", x: 52.5, y: 7.5, width: 8.2, height: 15, interaction: { type: "product", productId: "good-things-print" } },
  { id: "r2-wave-poster", roomId: "room-2", label: "Night Wave print", x: 61, y: 6, width: 9.5, height: 16, interaction: { type: "product", productId: "night-wave-print" } },
  { id: "r2-pegboard", roomId: "room-2", label: "Pegboard tools", x: 59, y: 24, width: 11, height: 14, interaction: { type: "egg", eggId: "egg-pegboard" } },
  { id: "r2-polaroids", roomId: "room-2", label: "Studio polaroids", x: 70, y: 20, width: 5.5, height: 12, interaction: { type: "egg", eggId: "egg-polaroids" } },
  { id: "r2-turntable", roomId: "room-2", label: "Studio turntable", x: 54.5, y: 37.5, width: 10, height: 10, interaction: { type: "listen", eggId: "egg-turntable-song" } },
  { id: "r2-lava", roomId: "room-2", label: "Dusk lava lamp", x: 65.5, y: 32, width: 4.2, height: 13, interaction: { type: "product", productId: "lava-glow" } },
  { id: "r2-skate", roomId: "room-2", label: "Crown skate deck", x: 90.5, y: 38, width: 6.5, height: 32, interaction: { type: "product", productId: "loft-skate-deck" } },
  { id: "r2-back-soon", roomId: "room-2", label: "Back soon sign", x: 86, y: 27.5, width: 6.2, height: 10, interaction: { type: "egg", eggId: "egg-back-soon" } },
  { id: "r2-mat", roomId: "room-2", label: "Work in Progress mat", x: 71.5, y: 63, width: 13, height: 9, interaction: { type: "egg", eggId: "egg-work-mat" } },
  { id: "r2-camera", roomId: "room-2", label: "Camera on the table", x: 47.5, y: 63.5, width: 5, height: 6, interaction: { type: "egg", eggId: "egg-camera" } },
];
