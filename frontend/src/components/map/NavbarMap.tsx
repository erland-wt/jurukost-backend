"use client";

export default function NavbarMap() {
  return (
    <nav className="fixed top-0 left-0 w-full h-16 bg-white shadow-md flex items-center justify-center z-10">
      <h1 className="text-3xl font-semibold ">
        <a href="../#hero">
          Juru<span className="text-amber-500">Kost</span>
        </a>
      </h1>
    </nav>
  );
}