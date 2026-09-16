import { ApartmentExplorer } from "@/components/apartment/ApartmentExplorer";
import { rooms } from "@/data/catalog";
import type { RoomId } from "@/types/store";
import { Suspense } from "react";

export function generateStaticParams() {
  return rooms.map((room) => ({ slug: room.slug }));
}

export default async function RoomPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const room = rooms.find((entry) => entry.slug === slug) ?? rooms[0];
  return (
    <Suspense fallback={<div className="apartment-shell" />}>
      <ApartmentExplorer initialRoom={room.id as RoomId} />
    </Suspense>
  );
}
