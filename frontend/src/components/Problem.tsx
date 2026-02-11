"use client";

const problems = [
    {
        title: "Harga Tidak Transparan",
        description:
            "Pemilik kost sering menetapkan harga tanpa standar yang jelas, membuat sulit menilai kewajaran harga.",
        accent: "from-emerald-500/10 to-emerald-500/0",
    },
    {
        title: "Informasi Jarak Menyesatkan",
        description:
            'Klaim "dekat stasiun" sering tidak akurat. Kami menghitung jarak sesungguhnya untuk Anda.',
        accent: "from-orange-500/10 to-orange-500/0",
    },
    {
        title: "Membuang Waktu & Tenaga",
        description:
            "Tidak perlu berkeliling Jakarta. Semua informasi tersedia dalam satu platform terintegrasi.",
        accent: "from-emerald-700/10 to-emerald-700/0",
    },
];

export default function Problem() {
    return (
        <section
            id="problem"
            className="w-full relative bg-gray-900 py-16 md:py-28 px-4 flex justify-center bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url('/background/bg-jurukost.jpg')" }}
        >
            {/* Overlay gelap supaya teks & card lebih terbaca */}
            <div className="absolute inset-0 bg-black/40" />

            <div className="relative z-10 w-full max-w-5xl flex flex-col items-center text-center">
                <h2 className="text-xs sm:text-sm tracking-[0.25em] text-emerald-100 font-semibold">
                    MASALAH YANG SERING TERJADI
                </h2>
                <h1 className="mt-3 text-2xl sm:text-3xl md:text-5xl font-bold text-white">
                    Kesulitan Mencari Kost?
                </h1>
                <p className="mt-3 text-sm sm:text-base text-gray-100/80 max-w-xl">
                    Kami memahami tantangan mencari kost yang sesuai budget, kebutuhan, dan lokasi Anda.
                </p>

                {/* Card Problem */}
                <div className="mt-10 md:mt-14 grid w-full gap-5 sm:gap-6 md:gap-8 sm:grid-cols-2 md:grid-cols-3">
                    {problems.map((item, index) => (
                        <article
                            key={item.title}
                            className="group relative overflow-hidden rounded-2xl bg-white/90 backdrop-blur border border-emerald-50 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                        >
                            {/* Accent gradient */}
                            <div
                                className={`pointer-events-none absolute inset-0 bg-linear-to-b ${item.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                            />

                            {/* Top border highlight */}
                            <div className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-emerald-500 via-orange-400 to-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                            <div className="relative p-5 sm:p-6 flex flex-col h-full text-left">
                                {/* Icon */}
                                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 group-hover:bg-emerald-700 group-hover:text-white transition-colors duration-300">
                                    {index === 0 && (
                                        <svg
                                            className="w-5 h-5"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <rect x="3" y="4" width="18" height="14" rx="2" />
                                            <line x1="3" y1="10" x2="21" y2="10" />
                                            <line x1="8" y1="15" x2="10" y2="15" />
                                            <line x1="12" y1="15" x2="16" y2="15" />
                                        </svg>
                                    )}
                                    {index === 1 && (
                                        <svg
                                            className="w-5 h-5"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <path d="M12 2L3 7l9 5 9-5-9-5Z" />
                                            <path d="M3 17l9 5 9-5" />
                                            <path d="M3 12l9 5 9-5" />
                                        </svg>
                                    )}
                                    {index === 2 && (
                                        <svg
                                            className="w-5 h-5"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <path d="M3 11h4l3 7 4-14 3 7h4" />
                                        </svg>
                                    )}
                                </div>

                                <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                                    {item.title}
                                </h3>
                                <p className="mt-2 text-xs sm:text-sm text-gray-600 leading-relaxed">
                                    {item.description}
                                </p>

                                {/* Subtle bottom line animation */}
                                <div className="mt-4 h-px w-0 bg-linear-to-r from-emerald-500 to-orange-400 group-hover:w-full transition-all duration-500" />
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}