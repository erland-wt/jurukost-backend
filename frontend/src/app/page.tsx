"use client";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Problem from "@/components/Problem";
import FiturUnggulan from "@/components/FiturUnggulan";
import PetaInteraktif from "@/components/PetaInteraktif";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="w-full h-screen relative">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <Hero />

      {/* Problem Section */}
      <Problem />

      {/* Fitur Unggulan Section */}
      <FiturUnggulan />

      {/* Peta Interaktif Section */}
      <PetaInteraktif />

      {/* Footer */}
      <Footer />
    </main>
  );
}