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
    { x: 45, y: 24, width: 5, height: 8, tone: "lamp" },
    { x: 58, y: 12, width: 16, height: 18, tone: "window" },
    { x: 93.6, y: 26, width: 4, height: 12, tone: "lava" },
    { x: 54, y: 56, width: 3, height: 4, tone: "candle" },
    { x: 96, y: 40, width: 5, height: 10, tone: "lamp" },
  ],
  "room-2": [
    { x: 9, y: 20, width: 6, height: 10, tone: "lamp" },
    { x: 8, y: 8, width: 16, height: 20, tone: "window" },
    { x: 71.4, y: 30, width: 3, height: 12, tone: "lava" },
    { x: 82, y: 28, width: 6, height: 10, tone: "lamp" },
  ],
};

export const roomObjects: RoomObject[] = [
  { id: "r1-door", roomId: "room-1", label: "Open door to the studio", x: 0, y: 1, width: 6.8, height: 74, interaction: { type: "navigate", to: "room-2" } },
  { id: "r1-smiley", roomId: "room-1", label: "Door smiley", x: 0.4, y: 28.8, width: 3.4, height: 6.6, interaction: { type: "egg", eggId: "egg-smiley" } },
  { id: "r1-better-days", roomId: "room-1", label: "Better Days Ahead print", x: 13, y: 7.2, width: 9, height: 19, interaction: { type: "product", productId: "better-days-print" } },
  { id: "r1-wave", roomId: "room-1", label: "Night Wave print", x: 22.4, y: 6.4, width: 8.4, height: 19.6, interaction: { type: "product", productId: "night-wave-print" } },
  { id: "r1-cat", roomId: "room-1", label: "Sleeping cat", x: 36.6, y: 36.6, width: 8.2, height: 6.6, interaction: { type: "egg", eggId: "egg-cat-loft" } },
  { id: "r1-skate", roomId: "room-1", label: "Crown skate deck", x: 8.6, y: 41.2, width: 5.8, height: 24.5, interaction: { type: "product", productId: "loft-skate-deck" } },
  { id: "r1-mat", roomId: "room-1", label: "Good Vibes mat", x: 20, y: 83.2, width: 17, height: 13.4, interaction: { type: "egg", eggId: "egg-vibes-mat" } },
  { id: "r1-artists", roomId: "room-1", label: "Fridge note", x: 5.2, y: 82.4, width: 7.6, height: 13, interaction: { type: "egg", eggId: "egg-artists" } },
  { id: "r1-polaroid", roomId: "room-1", label: "Fridge polaroid", x: 12.6, y: 81.8, width: 5.2, height: 11, interaction: { type: "egg", eggId: "egg-polaroid-loft" } },
  { id: "r1-bottle", roomId: "room-1", label: "B&C day bottle", x: 7, y: 59, width: 4.4, height: 16, interaction: { type: "product", productId: "bc-day-bottle" } },
  { id: "r1-sneakers", roomId: "room-1", label: "Night court sneakers", x: 32.8, y: 51.6, width: 7.8, height: 5.6, interaction: { type: "product", productId: "court-sneakers" } },
  { id: "r1-lamp", roomId: "room-1", label: "Desk glow lamp", x: 45, y: 23.2, width: 3.8, height: 14.5, interaction: { type: "product", productId: "desk-glow-lamp" } },
  { id: "r1-speakers-l", roomId: "room-1", label: "B&C bookshelf monitors", x: 52.4, y: 32, width: 3.4, height: 7.6, interaction: { type: "product", productId: "bc-monitors" } },
  { id: "r1-speakers-r", roomId: "room-1", label: "B&C bookshelf monitors", x: 64.2, y: 32.2, width: 3.6, height: 7.8, interaction: { type: "product", productId: "bc-monitors" } },
  { id: "r1-good-things", roomId: "room-1", label: "Good Things Take Time print", x: 75, y: 5.6, width: 7.4, height: 17, interaction: { type: "product", productId: "good-things-print" } },
  { id: "r1-portrait", roomId: "room-1", label: "Watcher print", x: 89.6, y: 1.2, width: 6.6, height: 15.2, interaction: { type: "egg", eggId: "egg-portrait" } },
  { id: "r1-turntable", roomId: "room-1", label: "Dusk turntable", x: 81.4, y: 33.8, width: 10.6, height: 8.4, interaction: { type: "product", productId: "dusk-turntable" } },
  { id: "r1-lava", roomId: "room-1", label: "Dusk lava lamp", x: 93.6, y: 25, width: 3.5, height: 16.8, interaction: { type: "product", productId: "lava-glow" } },
  { id: "r1-books", roomId: "room-1", label: "Art Life Ideas books", x: 50.4, y: 52, width: 6.8, height: 6.4, interaction: { type: "product", productId: "art-life-ideas" } },
  { id: "r1-controller", roomId: "room-1", label: "Paused controller", x: 47, y: 57.6, width: 5.8, height: 5.6, interaction: { type: "egg", eggId: "egg-controller" } },
  { id: "r1-pillow", roomId: "room-1", label: "Crown throw pillow", x: 84.6, y: 47.8, width: 11.8, height: 17.2, interaction: { type: "product", productId: "crown-pillow" } },
  { id: "r1-throw", roomId: "room-1", label: "Night knit throw", x: 76.8, y: 62, width: 12.4, height: 18.5, interaction: { type: "product", productId: "loft-throw" } },
  { id: "r1-nike", roomId: "room-1", label: "Sneaker box", x: 81.2, y: 79.2, width: 11.2, height: 13, interaction: { type: "product", productId: "court-sneakers" } },

  { id: "r2-door", roomId: "room-2", label: "Doorway back to the loft", x: 76.8, y: 6, width: 13.2, height: 56, interaction: { type: "navigate", to: "room-1" } },
  { id: "r2-window", roomId: "room-2", label: "Studio window", x: 2.4, y: 3.6, width: 21.2, height: 28.5, interaction: { type: "egg", eggId: "egg-window-note" } },
  { id: "r2-fridge", roomId: "room-2", label: "Studio fridge gallery", x: 0.3, y: 58.5, width: 13, height: 39.5, interaction: { type: "egg", eggId: "egg-fridge-studio" } },
  { id: "r2-lamp", roomId: "room-2", label: "Desk glow lamp", x: 8.2, y: 18.8, width: 5.6, height: 16.5, interaction: { type: "product", productId: "desk-glow-lamp" } },
  { id: "r2-speakers", roomId: "room-2", label: "B&C bookshelf monitors", x: 1.8, y: 32.5, width: 6.4, height: 10.8, interaction: { type: "product", productId: "bc-monitors" } },
  { id: "r2-speakers-r", roomId: "room-2", label: "B&C bookshelf monitors", x: 26.8, y: 31.8, width: 4.8, height: 12, interaction: { type: "product", productId: "bc-monitors" } },
  { id: "r2-bottle", roomId: "room-2", label: "B&C day bottle", x: 4.2, y: 51.2, width: 4, height: 13.2, interaction: { type: "product", productId: "bc-day-bottle" } },
  { id: "r2-nike", roomId: "room-2", label: "Sneaker box", x: 7.6, y: 55.8, width: 8.8, height: 9.6, interaction: { type: "product", productId: "court-sneakers" } },
  { id: "r2-wave-proof", roomId: "room-2", label: "Wave proof on the table", x: 23.8, y: 54.5, width: 15, height: 13.2, interaction: { type: "product", productId: "proof-pack" } },
  { id: "r2-framed", roomId: "room-2", label: "Studio proof pack", x: 38.8, y: 54.5, width: 13, height: 11, interaction: { type: "product", productId: "night-wave-print" } },
  { id: "r2-sketch", roomId: "room-2", label: "Unfiled sketchbook", x: 41, y: 71.8, width: 13, height: 11, interaction: { type: "product", productId: "field-sketchbook" } },
  { id: "r2-mug", roomId: "room-2", label: "B&C studio mug", x: 52.8, y: 53.8, width: 4, height: 7.2, interaction: { type: "product", productId: "studio-mug" } },
  { id: "r2-box", roomId: "room-2", label: "Crown packed drop", x: 57.5, y: 54.8, width: 11.2, height: 12.8, interaction: { type: "product", productId: "packed-drop" } },
  { id: "r2-good-things", roomId: "room-2", label: "Good Things Take Time print", x: 54.2, y: 4.6, width: 8, height: 16.8, interaction: { type: "product", productId: "good-things-print" } },
  { id: "r2-wave-poster", roomId: "room-2", label: "Night Wave print", x: 62.4, y: 3.8, width: 9, height: 17.2, interaction: { type: "product", productId: "night-wave-print" } },
  { id: "r2-hoodie-moss", roomId: "room-2", label: "Moss crown hoodie", x: 40, y: 15.2, width: 5.8, height: 25.8, interaction: { type: "product", productId: "moss-hoodie" } },
  { id: "r2-hoodie-ink", roomId: "room-2", label: "Ink crown hoodie", x: 45.4, y: 15.2, width: 5.6, height: 25.8, interaction: { type: "product", productId: "crown-hoodie" } },
  { id: "r2-varsity", roomId: "room-2", label: "Night varsity jacket", x: 50.4, y: 14.6, width: 6.6, height: 26.8, interaction: { type: "product", productId: "night-varsity" } },
  { id: "r2-cat", roomId: "room-2", label: "Studio cat", x: 47.8, y: 42.8, width: 6.8, height: 8, interaction: { type: "egg", eggId: "egg-cat-studio" } },
  { id: "r2-pegboard", roomId: "room-2", label: "Pegboard tools", x: 57, y: 22.2, width: 11, height: 16.5, interaction: { type: "egg", eggId: "egg-pegboard" } },
  { id: "r2-polaroids", roomId: "room-2", label: "Studio polaroids", x: 72, y: 16.8, width: 4.8, height: 12, interaction: { type: "egg", eggId: "egg-polaroids" } },
  { id: "r2-turntable", roomId: "room-2", label: "Studio turntable", x: 61, y: 41, width: 9.5, height: 7.8, interaction: { type: "listen", eggId: "egg-turntable-song" } },
  { id: "r2-lava", roomId: "room-2", label: "Dusk lava lamp", x: 71.3, y: 28.8, width: 2.6, height: 16.8, interaction: { type: "product", productId: "lava-glow" } },
  { id: "r2-skate", roomId: "room-2", label: "Crown skate deck", x: 92.4, y: 38.5, width: 5.4, height: 36.5, interaction: { type: "product", productId: "loft-skate-deck" } },
  { id: "r2-back-soon", roomId: "room-2", label: "Back soon sign", x: 91.8, y: 25.6, width: 6.2, height: 11.4, interaction: { type: "egg", eggId: "egg-back-soon" } },
  { id: "r2-mat", roomId: "room-2", label: "Work in Progress mat", x: 76.5, y: 69.5, width: 16.5, height: 12, interaction: { type: "egg", eggId: "egg-work-mat" } },
  { id: "r2-camera", roomId: "room-2", label: "Camera on the table", x: 55.4, y: 68.6, width: 5.6, height: 7.2, interaction: { type: "egg", eggId: "egg-camera" } },
];
