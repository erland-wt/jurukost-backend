"use client";

import dynamic from "next/dynamic";
import NavbarMap from "@/components/map/NavbarMap";

const Map = dynamic(() => import("@/components/Map"), {
  ssr: false,
});

export default function CariKostPage() {
  return (
    <main>
      <section className="pt-16 h-[calc(100vh-4rem)] w-full">
      <NavbarMap />
        <div className="h-full w-full">
          <Map />
        </div>
      </section>
    </main>
  );
}