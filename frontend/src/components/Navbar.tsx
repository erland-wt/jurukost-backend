"use client";

import React from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <nav className="w-full fixed top-0 left-0 z-50">
      {/* Wrapper utama navbar */}
      <div className="w-full h-20 bg-gray-50/90 backdrop-blur flex items-center px-4 md:px-12 shadow-md justify-between md:justify-around transition-all duration-300">
        <Link href="#hero">
            <h1 className="text-emerald-700 text-2xl md:text-3xl font-bold select-none hover:scale-[1.02] transition-transform duration-300">
                Juru<span className="text-amber-500">Kost</span>
            </h1>
        </Link>

        {/* Menu Navbar (desktop) */}
        <div className="hidden md:flex space-x-12">
            <Link href="#problem" className="relative text-emerald-800 hover:text-emerald-600 font-medium transition-colors duration-300">
            <span className="after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-emerald-600 after:transition-all after:duration-300 hover:after:w-full">
                Tujuan
            </span>
          </Link>
          <Link href="#fitur" className="relative text-emerald-800 hover:text-emerald-600 font-medium transition-colors duration-300">
            <span className="after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-emerald-600 after:transition-all after:duration-300 hover:after:w-full">
              Fitur
            </span>
          </Link>
          <Link href="#peta" className="relative text-emerald-800 hover:text-emerald-600 font-medium transition-colors duration-300">
            <span className="after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-emerald-600 after:transition-all after:duration-300 hover:after:w-full">
              Peta Lokasi
            </span>
          </Link>
        </div>

        {/* Button Mulai (desktop) */}
        <div className="hidden md:block">
          <Link
            href="/cari-kost"
            className="inline-flex items-center gap-2 bg-emerald-800 px-5 py-2 rounded-full text-white font-medium hover:bg-emerald-600 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
          >
            {/* Icon kaca pembesar */}
            <svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="6" />
              <line x1="16" y1="16" x2="21" y2="21" />
            </svg>
            <span>Cari Kost</span>
          </Link>
        </div>

        {/* Tombol hamburger (mobile) */}
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-emerald-800 hover:bg-emerald-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors duration-200"
          aria-label="Toggle navigation"
        >
          <div className="space-y-1">
            <span
              className={`block h-0.5 w-6 bg-emerald-800 transition-transform duration-300 ${
                isOpen ? 'translate-y-1.5 rotate-45' : ''
              }`}
            />
            <span
              className={`block h-0.5 w-6 bg-emerald-800 transition-opacity duration-300 ${
                isOpen ? 'opacity-0' : 'opacity-100'
              }`}
            />
            <span
              className={`block h-0.5 w-6 bg-emerald-800 transition-transform duration-300 ${
                isOpen ? '-translate-y-1.5 -rotate-45' : ''
              }`}
            />
          </div>
        </button>
      </div>

      {/* Menu dropdown (mobile) */}
      <div
        className={`md:hidden overflow-hidden bg-gray-50/95 backdrop-blur shadow-md transition-all duration-300 ${
          isOpen ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-6 pb-4 pt-2 space-y-3">
          <Link
            href="/"
            className="block text-emerald-800 hover:text-emerald-600 font-medium transition-colors duration-300"
            onClick={() => setIsOpen(false)}
          >
            Fitur
          </Link>
          <Link
            href="/about"
            className="block text-emerald-800 hover:text-emerald-600 font-medium transition-colors duration-300"
            onClick={() => setIsOpen(false)}
          >
            Peta Lokasi
          </Link>
          <Link
            href="/contact"
            className="block text-emerald-800 hover:text-emerald-600 font-medium transition-colors duration-300"
            onClick={() => setIsOpen(false)}
          >
            Data
          </Link>

          <Link
            href="/cari-kost"
            className="inline-flex items-center gap-2 bg-emerald-800 px-5 py-2 rounded-full text-white font-medium hover:bg-emerald-600 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
            onClick={() => setIsOpen(false)}
          >
            {/* Icon kaca pembesar */}
            <svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="6" />
              <line x1="16" y1="16" x2="21" y2="21" />
            </svg>
            <span>Cari Kost</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
