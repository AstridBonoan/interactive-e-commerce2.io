import { ApartmentExplorer } from "@/components/apartment/ApartmentExplorer";
import { Suspense } from "react";

export default function Home() {
  return (
    <Suspense fallback={<div className="apartment-shell" />}>
      <ApartmentExplorer />
    </Suspense>
  );
}
