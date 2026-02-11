import os
import joblib
import pandas as pd
from django.conf import settings
from rest_framework_gis.serializers import GeoFeatureModelSerializer, GeometryField
from django.contrib.gis.db.models.functions import Distance
from rest_framework import serializers
from .models import Kost, FasilitasUmum

# --- LOAD MODEL ---
model_path = os.path.join(settings.BASE_DIR, 'property', 'ml_models', 'price_predictor.joblib')
try:
    AI_MODEL = joblib.load(model_path)
    print("✅ AI Model loaded in Serializer")
except:
    AI_MODEL = None
    print("⚠️ AI Model not found. Run train_model first.")

class KostSerializer(GeoFeatureModelSerializer):
    lokasi = GeometryField()
    analisis_harga = serializers.SerializerMethodField()

    class Meta:
        model = Kost
        geo_field = 'lokasi'
        fields = '__all__'

    def get_analisis_harga(self, obj):
        if not AI_MODEL:
            return None

        try:
            # 1. Hitung Jarak Real-time (Sama seperti logic Training)
            mrt = FasilitasUmum.objects.filter(kategori='MRT') \
                    .annotate(dist=Distance('lokasi', obj.lokasi)) \
                    .order_by('dist').first()
            dist_mrt = mrt.dist.km if mrt else 10.0

            mall = FasilitasUmum.objects.filter(kategori='MALL') \
                    .annotate(dist=Distance('lokasi', obj.lokasi)) \
                    .order_by('dist').first()
            dist_mall = mall.dist.km if mall else 10.0

            bus = FasilitasUmum.objects.filter(kategori='BUS') \
                    .annotate(dist=Distance('lokasi', obj.lokasi)) \
                    .order_by('dist').first()
            dist_bus = bus.dist.km if bus else 10.0

            # 2. Siapkan Data Input
            input_data = pd.DataFrame([{
                'dist_mrt': dist_mrt,
                'dist_mall': dist_mall,
                'dist_bus': dist_bus,
                'is_ac': 1 if obj.is_ac else 0,
                'is_kamar_mandi_dalam': 1 if obj.is_kamar_mandi_dalam else 0,
                'is_wifi': 1 if obj.is_wifi else 0
            }])

            # 3. Prediksi
            prediksi = int(AI_MODEL.predict(input_data)[0])
            harga_asli = float(obj.harga_per_bulan)

            # 4. Status
            selisih = harga_asli - prediksi
            persentase_selisih = selisih / prediksi

            if persentase_selisih < -0.15:
                status = "Underprice"
            elif persentase_selisih > 0.15:
                status = "Overprice"
            else:
                status = "Normal"

            return {
                "status": status,
                "harga_wajar_ai": prediksi,
                "selisih": int(selisih),
                "jarak_mrt": round(dist_mrt, 2),
                "jarak_mall": round(dist_mall, 2),
                "jarak_bus": round(dist_bus, 2)
            }
        except Exception as e:
            return {"status": "Error", "msg": str(e)}

class KostMapSerializer(GeoFeatureModelSerializer):
    lokasi = GeometryField()

    class Meta:
        model = Kost
        geo_field = 'lokasi'
        fields = ['id', 'nama', 'alamat', 'harga_per_bulan', 'is_ac',
                  'is_wifi', 'is_kamar_mandi_dalam', 'lokasi', 'gambar_url', 'luas_kamar']