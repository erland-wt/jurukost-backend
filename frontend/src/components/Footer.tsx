"use client";

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="w-full bg-emerald-950 text-emerald-50 mt-16">
            <div className="max-w-6xl mx-auto px-4 py-10 md:py-12">
                {/* Top content */}
                <div className="flex flex-col md:flex-row gap-8 md:gap-12">
                    {/* Brand + description */}
                    <div className="md:w-1/2">
                        <div className="flex items-center gap-2 mb-3">
                            <div className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-emerald-600 text-white text-sm font-semibold">
                                JK
                            </div>
                            <span className="text-lg font-semibold tracking-tight">
                                JuruKost
                            </span>
                        </div>
                        <p className="text-sm text-emerald-100/80 max-w-md">
                            Bantu kamu menemukan kost dengan harga yang wajar, data yang transparan,
                            dan lokasi yang strategis di seluruh Jakarta.
                        </p>
                    </div>

                    {/* Links + contact */}
                    <div className="md:w-1/2 flex flex-col md:flex-row justify-between gap-8">
                        {/* Navigasi */}
                        <div>
                            <h3 className="font-semibold text-emerald-100 mb-3">Navigasi</h3>
                            <ul className="space-y-2">
                                <li>
                                    <a href="#hero" className="text-emerald-100/80 hover:text-white">
                                        Beranda
                                    </a>
                                </li>
                                <li>
                                    <a href="#fitur" className="text-emerald-100/80 hover:text-white">
                                        Fitur Unggulan
                                    </a>
                                </li>
                                <li>
                                    <a href="#peta" className="text-emerald-100/80 hover:text-white">
                                        Peta Interaktif
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="mt-8 pt-5 border-t border-emerald-800 flex flex-col md:flex-row items-center justify-between gap-3 text-xs sm:text-sm text-emerald-100/70">
                    <span>&copy; {year} JuruKost. All rights reserved.</span>
                </div>
            </div>
        </footer>
    );
}