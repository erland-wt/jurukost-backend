"use client";

export default function PetaInteraktif() {
    return (
        <section id="peta" className="w-full min-h-screen flex flex-col items-center bg-white px-4 md:px-6 pt-30 pb-16 text-center">
            <h2 className="font-semibold uppercase text-emerald-700 tracking-[0.25em] text-center mb-3 text-xs sm:text-sm">
                EKSPLORASI LOKASI
            </h2>
            <h1 className="font-bold text-2xl sm:text-3xl md:text-5xl text-gray-800 text-center mb-4">
                Peta Interaktif
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-emerald-800 mb-6 sm:mb-8 max-w-2xl">
                Temukan kost berdasarkan area favorit Anda dengan visualisasi peta yang mudah digunakan dan informatif.
            </p>

            {/* FILTER & MAP WRAPPER */}
            <div className="w-full max-w-5xl mx-auto space-y-4 sm:space-y-5 flex flex-col">

                {/* MAP CARD */}
                <div className="relative w-full h-80 sm:h-95 md:h-110 rounded-2xl bg-emerald-900/10 border border-emerald-100/60 shadow-lg overflow-hidden backdrop-blur-md">
                    {/* Background gradient map-like */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,#dcfce7_0,#ecfdf5_35%,#e0f2fe_70%,#f1f5f9_100%)]" />

                    {/* Grid garis halus */}
                    <div className="absolute inset-0 opacity-40 mix-blend-multiply">
                        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(16,185,129,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(16,185,129,0.08)_1px,transparent_1px)] bg-size-[40px_40px]" />
                    </div>

                    {/* Dekorasi lingkaran */}
                    <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-emerald-200/40 blur-2xl" />
                    <div className="pointer-events-none absolute -left-16 bottom-0 h-32 w-32 rounded-full bg-emerald-300/40 blur-2xl" />

                    {/* Header kecil pada map */}
                    <div className="relative z-10 flex items-center justify-between px-4 sm:px-5 pt-3 sm:pt-4">
                        <div className="flex items-center gap-2 text-xs sm:text-sm text-emerald-900">
                            <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/80 shadow-sm">
                                {/* Icon pin lokasi */}
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.7"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="w-4 h-4 text-emerald-700"
                                >
                                    <path d="M12 21s-6-5.33-6-11a6 6 0 0 1 12 0c0 5.67-6 11-6 11Z" />
                                    <circle cx="12" cy="10" r="2.5" />
                                </svg>
                            </span>
                            <div className="text-left">
                                <p className="font-semibold leading-tight">Area Jakarta</p>
                                <p className="text-[11px] text-emerald-700/80 leading-tight">
                                    Visualisasi sebaran kost rekomendasi AI
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <span className="relative inline-flex h-2.5 w-2.5">
                                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-60 animate-ping" />
                                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-600" />
                            </span>
                            <span className="text-[11px] sm:text-xs text-emerald-900 font-medium">
                                Live data kost terupdate
                            </span>
                        </div>
                    </div>

                    {/* Isi map (placeholder interaktif) */}
                    <div className="relative z-10 w-full h-full px-4 pb-4 pt-2 sm:px-5 sm:pb-5">
                        <div className="relative w-full h-full rounded-xl overflow-hidden">
                            {/* Layer utama map kosong: tempat integrasi peta asli nanti */}
                            <div className="absolute inset-0 bg-linear-to-br from-emerald-200/40 via-sky-100/60 to-slate-100/40" />

                            {/* Beberapa "pin" dekoratif */}
                            <MapPin styleClass="top-[18%] left-[22%]" label="Good Deal" tone="good" />
                            <MapPin styleClass="top-[40%] right-[18%]" label="Dekat Stasiun" tone="normal" />
                            <MapPin styleClass="bottom-[22%] left-[35%]" label="Overprice" tone="overprice" />

                            {/* Jalur garis rute sederhana */}
                            <svg
                                viewBox="0 0 200 120"
                                className="absolute inset-0 w-full h-full opacity-50"
                                preserveAspectRatio="none"
                            >
                                <path
                                    d="M10 90 C40 70 70 80 90 60 C115 35 145 40 190 20"
                                    fill="none"
                                    stroke="#059669"
                                    strokeWidth="1.5"
                                    strokeDasharray="4 4"
                                />
                            </svg>

                            {/* Legend di bawah kiri */}
                            <div className="absolute left-3 bottom-3 sm:left-4 sm:bottom-4 bg-white/85 backdrop-blur rounded-xl px-3 py-2 sm:px-4 sm:py-3 shadow-md">
                                <p className="text-[11px] sm:text-xs font-semibold text-emerald-900 mb-1">
                                    Keterangan label harga
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    <LegendItem color="bg-emerald-500" label="Good Deal" />
                                    <LegendItem color="bg-amber-400" label="Normal" />
                                    <LegendItem color="bg-red-500" label="Overprice" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function LegendItem({ color, label }: { color: string; label: string }) {
    return (
        <div className="inline-flex items-center gap-1.5">
            <span className={`h-2.5 w-2.5 rounded-full ${color}`} />
            <span className="text-[11px] text-emerald-900">{label}</span>
        </div>
    );
}

function MapPin({
    styleClass,
    label,
    tone,
}: {
    styleClass: string;
    label: string;
    tone: "good" | "normal" | "overprice";
}) {
    const toneClasses =
        tone === "good"
            ? "bg-emerald-600 text-white"
            : tone === "normal"
            ? "bg-amber-400 text-gray-900"
            : "bg-red-600 text-white";

    return (
        <div
            className={`absolute ${styleClass} flex flex-col items-center gap-1 transform transition-transform duration-300 hover:-translate-y-1`}
        >
            {/* Pin bulat */}
            <div className="relative">
                <div className={`h-6 w-6 rounded-full ${toneClasses} shadow-md flex items-center justify-center`}>
                    <span className="h-1.5 w-1.5 rounded-full bg-white/90" />
                </div>
                <div className="absolute inset-x-1/2 -bottom-1 -translate-x-1/2 h-2 w-2 rotate-45 bg-emerald-900/10" />
            </div>
            {/* Label kecil */}
            <div className={`rounded-full px-2 py-0.5 text-[10px] font-medium bg-white/90 text-emerald-900 shadow-sm`}>
                {label}
            </div>
        </div>
    );
}