"use client";

import { useEffect, useState } from "react";
import { useCardFitur, BadgeVariant } from "../hooks/useCardFitur";

function getBadgeClasses(variant: BadgeVariant): string {
    const base =
        "w-full inline-flex items-center gap-2 rounded-full px-3 py-2 text-xs sm:text-sm font-medium shadow-sm transition-transform duration-200 hover:-translate-y-0.5";
    switch (variant) {
        case "good":
            return `${base} bg-emerald-100 text-gray-900`;
        case "normal":
            return `${base} bg-amber-100 text-gray-900`;
        case "overprice":
            return `${base} bg-red-100 text-gray-900`;
    }
}

function getBadgeIconWrapperClasses(variant: BadgeVariant): string {
    const base =
        "inline-flex h-5 w-5 items-center justify-center rounded-full text-white flex-shrink-0";
    switch (variant) {
        case "good":
            return `${base} bg-emerald-700`;
        case "normal":
            return `${base} bg-amber-500`;
        case "overprice":
            return `${base} bg-red-700`;
    }
}

function BadgeIcon({ variant }: { variant: BadgeVariant }) {
    const common = "w-3.5 h-3.5 stroke-current";
    if (variant === "good") {
        return (
            <svg viewBox="0 0 20 20" fill="none" className={common}>
                <polyline points="4 11 8 15 16 5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        );
    }
    if (variant === "normal") {
        return (
            <svg viewBox="0 0 20 20" fill="none" className={common}>
                <path
                    d="M7 17H5a2 2 0 0 1-2-2v-3.5A1.5 1.5 0 0 1 4.5 10H7m0 7h5.2a2 2 0 0 0 1.96-1.57l1.1-5A2 2 0 0 0 13.32 8H11V4.5A1.5 1.5 0 0 0 9.5 3h-.3a1.5 1.5 0 0 0-1.48 1.26L7 7v10Z"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        );
    }
    // overprice
    return (
        <svg viewBox="0 0 20 20" fill="none" className={common}>
            <line x1="5" y1="5" x2="15" y2="15" strokeWidth="2" strokeLinecap="round" />
            <line x1="15" y1="5" x2="5" y2="15" strokeWidth="2" strokeLinecap="round" />
        </svg>
    );
}

export default function FiturUnggulan() {
    const cards = useCardFitur();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const t = setTimeout(() => setMounted(true), 50);
        return () => clearTimeout(t);
    }, []);

    return (
        <section
            id="fitur"
            className="w-full min-h-screen bg-white py-16 md:py-24 px-4 flex justify-center bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url('/background/bg-jurukost2.jpg')" }}
        >
            <div className="w-full max-w-5xl">
                <h2 className="font-semibold uppercase text-emerald-700 tracking-[0.25em] text-center mb-3 text-xs sm:text-sm">
                    Teknologi AI
                </h2>
                <h1 className="font-bold text-2xl sm:text-3xl md:text-5xl text-gray-800 text-center mb-10 md:mb-12">
                    Fitur Unggulan
                </h1>

                {/* Card Fitur Unggulan */}
                <div className="flex flex-col items-center justify-center space-y-12 md:space-y-16 mt-4">
                    {cards.map((card) => {
                        const slideInitial =
                            card.imagePosition === "right"
                                ? "opacity-0 -translate-x-8"
                                : "opacity-0 translate-x-8";
                        const slideFinal = "opacity-100 translate-x-0";

                        return (
                            <div
                                key={card.id}
                                className={`flex flex-col md:flex-row ${
                                    card.imagePosition === "right" ? "md:flex-row-reverse" : ""
                                } items-center md:items-stretch gap-6 md:gap-10 max-w-4xl w-full px-10 py-15 rounded-lg
                                bg-white/10 backdrop-blur-md border border-white/25 shadow-md
                                transform transition-all duration-1500 ease-out
                                ${mounted ? slideFinal : slideInitial}`}
                            >
                                {/* Gambar */}
                                <div className="w-full md:w-auto">
                                    <div className="bg-linear-to-br from-emerald-800 to-emerald-600 px-10 py-6 sm:px-16 sm:py-8 rounded-2xl shadow-lg flex items-center justify-center transform transition-transform duration-300 hover:-translate-y-1">
                                        <img
                                            src={card.image}
                                            alt={card.imageAlt}
                                            className="w-24 sm:w-32 md:w-36 h-auto object-contain"
                                        />
                                    </div>
                                </div>

                                {/* Deskripsi + List */}
                                <div className="flex-1 flex flex-col justify-center text-center md:text-left">
                                    <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold text-amber-500">
                                        {card.title}
                                    </h3>
                                    <p className="text-sm sm:text-base text-gray-800 mt-3 md:mt-5 max-w-lg mx-auto md:mx-0">
                                        {card.description}
                                    </p>

                                    {card.items && (
                                        <ul className="mt-4 space-y-2">
                                            {card.items.map((item, index) => {
                                                if (item.type === "check") {
                                                    return (
                                                        <li
                                                            key={`${card.id}-item-${index}`}
                                                            className="flex items-start gap-2 text-sm sm:text-base text-gray-800"
                                                        >
                                                            <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 shrink-0">
                                                                <BadgeIcon variant="good" />
                                                            </span>
                                                            <span>{item.text}</span>
                                                        </li>
                                                    );
                                                }

                                                return (
                                                    <li key={`${card.id}-item-${index}`}>
                                                        <div className={getBadgeClasses(item.variant)}>
                                                            <span className={getBadgeIconWrapperClasses(item.variant)}>
                                                                <BadgeIcon variant={item.variant} />
                                                            </span>
                                                            <span>
                                                                <span className="font-semibold">{item.label}:</span>{" "}
                                                                {item.text}
                                                            </span>
                                                        </div>
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}