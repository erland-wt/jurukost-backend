"use client";

import { useEffect, useState } from "react";

export default function Hero() {
    const [stats, setStats] = useState({
        kost: 0,
        ai: 0,
        wilayah: 0,
    });

    useEffect(() => {
        const duration = 2000; // ms
        const frameDuration = 30;
        const totalFrames = Math.round(duration / frameDuration);

        const target = {
            kost: 300,
            ai: 95,
            wilayah: 5,
        };

        let frame = 0;
        const counter = setInterval(() => {
            frame++;
            const progress = frame / totalFrames;

            setStats({
                kost: Math.min(target.kost, Math.round(target.kost * progress)),
                ai: Math.min(target.ai, Math.round(target.ai * progress)),
                wilayah: Math.min(target.wilayah, Math.round(target.wilayah * progress)),
            });

            if (frame === totalFrames) clearInterval(counter);
        }, frameDuration);

        return () => clearInterval(counter);
    }, []);

    return (
        <section id="hero" className="w-full md:w-3/4 min-h-screen mx-auto flex flex-col justify-center items-center bg-white px-4 md:px-6 pt-24 md:pt-0 text-center">
            <h1 className="text-3xl sm:text-4xl md:text-7xl font-bold text-gray-800 mb-4 md:mb-6 leading-tight">
                Temukan Kost dengan
                <br />
                <span className="text-emerald-800">Harga yang Wajar</span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-emerald-800 mb-8 max-w-2xl">
                Platform berbasis AI yang membantu Anda menemukan kost di Jakarta dengan harga fair dan lokasi strategis
            </p>

            <a
                href="/cari-kost"
                className="bg-emerald-800 text-white px-6 py-3 rounded-full text-base sm:text-lg font-medium hover:bg-emerald-600 transition-colors duration-300 w-full sm:w-auto flex items-center justify-center gap-2"
            >
                <span>Mulai Pencarian</span>
                <svg
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                </svg>
            </a>

            {/* Stats */}
            <div className="mt-10 w-full max-w-xs sm:max-w-sm md:max-w-none">
                <div className="flex justify-between md:justify-center text-emerald-800 font-bold text-center md:space-x-12">
                    {/* Data Kost */}
                    <div className="flex-1 px-2">
                        <p className="text-2xl sm:text-3xl md:text-4xl transition-transform duration-300">
                            {stats.kost}+
                        </p>
                        <p className="mt-1 text-xs sm:text-sm md:text-base font-medium md:font-bold">
                            Data Kost
                        </p>
                    </div>

                    {/* Akurasi AI */}
                    <div className="flex-1 px-2 border-l border-emerald-500">
                        <p className="text-2xl sm:text-3xl md:text-4xl transition-transform duration-300">
                            {stats.ai}%
                        </p>
                        <p className="mt-1 text-xs sm:text-sm md:text-base font-medium md:font-bold">
                            Akurasi AI
                        </p>
                    </div>

                    {/* Lokasi Strategis */}
                    <div className="flex-1 px-2 border-l border-emerald-500">
                        <p className="text-2xl sm:text-3xl md:text-4xl transition-transform duration-300">
                            {stats.wilayah}
                        </p>
                        <p className="mt-1 text-xs sm:text-sm md:text-base font-medium md:font-bold">
                            Wilayah Jakarta
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}