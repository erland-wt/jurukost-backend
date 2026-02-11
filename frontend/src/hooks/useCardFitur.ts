export type BadgeVariant = "good" | "normal" | "overprice";

export type FeatureListItem =
    | {
          type: "check";
          text: string;
      }
    | {
          type: "badge";
          variant: BadgeVariant;
          label: string;
          text: string;
      };

export type FeatureCard = {
    id: string;
    title: string;
    description: string;
    image: string;
    imageAlt: string;
    imagePosition: "left" | "right";
    items?: FeatureListItem[];
};

export function useCardFitur(): FeatureCard[] {
    return [
        {
            id: "ai-price-validator",
            title: "AI Price Validator",
            description:
                "Algoritma machine learning kami menganalisis luas kamar, fasilitas, dan lokasi untuk memberikan prediksi harga yang akurat dan fair.",
            image: "/icon/icon-fitur-1.svg",
            imageAlt: "AI Price Validator Icon",
            imagePosition: "left",
            items: [
                { type: "check", text: "Perbandingan multi-parameter" },
                { type: "check", text: "Data real-time dari 300+ kost" },
                { type: "check", text: "Akurasi prediksi hingga 95%" },
            ],
        },
        {
            id: "label-harga-instan",
            title: "Label Harga Instan",
            description:
                "Setiap listing kost dilengkapi dengan label status harga yang jelas: Good Deal, Normal, atau Overprice.",
            image: "/icon/icon-fitur-2.svg",
            imageAlt: "Label Harga Instan Icon",
            imagePosition: "right",
            items: [
                {
                    type: "badge",
                    variant: "good",
                    label: "Good Deal",
                    text: "Harga di bawah rata-rata pasar, kesempatan langka!",
                },
                {
                    type: "badge",
                    variant: "normal",
                    label: "Normal",
                    text: "Harga sesuai standar pasar.",
                },
                {
                    type: "badge",
                    variant: "overprice",
                    label: "Overprice",
                    text: "Harga di atas rata-rata pasar, pertimbangkan opsi lain.",
                },
            ],
        },
        {
            id: "data-terverifikasi",
            title: "Data Terverifikasi",
            description:
                "Semua informasi kost telah melalui proses verifikasi dan validasi untuk memastikan akurasi dan kredibilitas data.",
            image: "/icon/icon-fitur-3.svg",
            imageAlt: "Data Terverifikasi Icon",
            imagePosition: "left",
        },
    ];
}