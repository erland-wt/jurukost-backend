import os
import joblib
import pandas as pd
import numpy as np
from django.core.management.base import BaseCommand
from django.conf import settings
from django.contrib.gis.db.models.functions import Distance
from property.models import Kost, FasilitasUmum
from sklearn.ensemble import RandomForestRegressor

class Command(BaseCommand):
    help = 'Melatih model ML menggunakan 100% DATA REAL (MRT/Mall/Bus)'

    def handle(self, *args, **options):
        self.stdout.write(self.style.WARNING('🧠 Memulai Training Model V2 (Real Data)...'))

        # 1. Ambil Data Real dari Database
        kosts = Kost.objects.all()
        total_data = kosts.count()
        
        if total_data < 10:
            self.stdout.write(self.style.ERROR("❌ Data Kost terlalu sedikit! Jalankan scraping dulu."))
            return

        self.stdout.write(f"📊 Menggunakan {total_data} data REAL dari database.")
        self.stdout.write("   (Menghitung jarak ke fasilitas terdekat untuk setiap kost...)")

        data = []
        count = 0

        # Loop semua data kost untuk Feature Engineering
        for k in kosts:
            # --- LOGIKA BARU: HITUNG JARAK KE FASILITAS TERDEKAT ---
            # A. Jarak ke MRT/KRL Terdekat
            mrt = FasilitasUmum.objects.filter(kategori='MRT') \
                    .annotate(dist=Distance('lokasi', k.lokasi)) \
                    .order_by('dist').first()
            dist_mrt = mrt.dist.km if mrt else 10.0 

            # B. Jarak ke Mall Terdekat
            mall = FasilitasUmum.objects.filter(kategori='MALL') \
                    .annotate(dist=Distance('lokasi', k.lokasi)) \
                    .order_by('dist').first()
            dist_mall = mall.dist.km if mall else 10.0

            # C. Jarak ke Halte Busway Terdekat
            bus = FasilitasUmum.objects.filter(kategori='BUS') \
                    .annotate(dist=Distance('lokasi', k.lokasi)) \
                    .order_by('dist').first()
            dist_bus = bus.dist.km if bus else 10.0

            # Masukkan ke list dataset
            data.append({
                'dist_mrt': dist_mrt,
                'dist_mall': dist_mall,
                'dist_bus': dist_bus,
                'is_ac': 1 if k.is_ac else 0,
                'is_kamar_mandi_dalam': 1 if k.is_kamar_mandi_dalam else 0,
                'is_wifi': 1 if k.is_wifi else 0,
                'harga': float(k.harga_per_bulan)
            })

            count += 1
            if count % 50 == 0:
                self.stdout.write(f"   -> Memproses fitur spasial: {count}/{total_data}")

        # 2. Training Model
        df = pd.DataFrame(data)

        features = ['dist_mrt', 'dist_mall', 'dist_bus', 'is_ac', 'is_kamar_mandi_dalam', 'is_wifi']
        X = df[features]
        y = df['harga']

        self.stdout.write("🔥 Sedang melatih Random Forest (Tanpa Data Sintetis)...")
        model = RandomForestRegressor(n_estimators=100, random_state=42)
        model.fit(X, y)

        # 3. Evaluasi Singkat (Tes Prediksi)
        sample_data = {
            'dist_mrt': [0.5], 
            'dist_mall': [1.0], 
            'dist_bus': [0.2], 
            'is_ac': [1], 
            'is_kamar_mandi_dalam': [1], 
            'is_wifi': [1]
        }
        sample_df = pd.DataFrame(sample_data)
        
        prediksi = model.predict(sample_df)[0]
        self.stdout.write(f"🧪 Test Prediksi: Kos Strategis (0.5km ke MRT) = Rp {prediksi:,.0f}")

        # 4. Simpan Model
        model_dir = os.path.join(settings.BASE_DIR, 'property', 'ml_models')
        os.makedirs(model_dir, exist_ok=True)
        
        model_path = os.path.join(model_dir, 'price_predictor.joblib')
        joblib.dump(model, model_path)

        self.stdout.write(self.style.SUCCESS(f'✅ Model V2 berhasil disimpan di: {model_path}'))