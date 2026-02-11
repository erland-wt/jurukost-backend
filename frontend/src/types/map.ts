export type LatLng = { lat: number; lng: number };

export type AnalisisStatus = 'Overprice' | 'Underprice' | 'Normal';

export interface AnalisisHarga {
  status: AnalisisStatus;
  harga_wajar_ai: number;
  selisih: number;
  jarak_mrt: number;
  jarak_mall: number;
  jarak_bus: number;
}

export interface KostFeatureProperties {
  nama: string;
  alamat: string;
  harga_per_bulan: number | string;
  is_ac: boolean;
  is_wifi: boolean;
  is_kamar_mandi_dalam: boolean;
  gambar_url?: string;
  luas_kamar?: string;
  analisis_harga?: AnalisisHarga;
  [key: string]: unknown;
}

export interface KostFeature {
  id: number | string;
  geometry: { type: string; coordinates: [number, number] };
  properties: KostFeatureProperties;
}

export interface PredictionResult {
  status: string;
  lokasi_analisis: {
    jarak_mrt_km: number;
    jarak_mall_km: number;
    jarak_bus_km: number;
  };
  prediksi_harga: number;
}

export interface PredictionInputs {
  is_ac: boolean;
  is_wifi: boolean;
  is_kamar_mandi_dalam: boolean;
}