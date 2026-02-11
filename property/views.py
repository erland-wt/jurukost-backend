import os
import joblib
import pandas as pd
from django.conf import settings
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, generics
from django.contrib.gis.geos import Point
from django.contrib.gis.db.models.functions import Distance
from .models import Kost, FasilitasUmum
from .serializers import KostSerializer, KostMapSerializer

# --- LOAD MODEL SEKALI SAJA ---
model_path = os.path.join(settings.BASE_DIR, 'property', 'ml_models', 'price_predictor.joblib')
try:
    PRICE_MODEL = joblib.load(model_path)
except Exception:
    PRICE_MODEL = None

class KostListAPIView(generics.ListAPIView):
    queryset = Kost.objects.all()
    serializer_class = KostSerializer

class PredictPriceAPIView(APIView):
    def post(self, request):
        try:
            if PRICE_MODEL is None:
                return Response(
                    {'status': 'error', 'message': 'Model belum tersedia'},
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR,
                )

            # Ambil data dari input user (Frontend)
            lat = float(request.data.get('latitude'))
            lng = float(request.data.get('longitude'))
            is_ac = int(request.data.get('is_ac', 0))
            is_wifi = int(request.data.get('is_wifi', 0))
            is_km_dalam = int(request.data.get('is_kamar_mandi_dalam', 0))

            # --- LOGIKA BARU: HITUNG JARAK KE FASILITAS TERDEKAT ---
            # Kita buat titik lokasi user
            user_point = Point(lng, lat, srid=4326)

            # 1. Hitung Jarak ke MRT Terdekat
            mrt = FasilitasUmum.objects.filter(kategori='MRT') \
                    .annotate(dist=Distance('lokasi', user_point)) \
                    .order_by('dist').first()
            dist_mrt = mrt.dist.km if mrt else 10.0 # Default 10km jika tidak ketemu

            # 2. Hitung Jarak ke Mall Terdekat
            mall = FasilitasUmum.objects.filter(kategori='MALL') \
                    .annotate(dist=Distance('lokasi', user_point)) \
                    .order_by('dist').first()
            dist_mall = mall.dist.km if mall else 10.0

            # 3. Hitung Jarak ke Halte Busway Terdekat
            bus = FasilitasUmum.objects.filter(kategori='BUS') \
                    .annotate(dist=Distance('lokasi', user_point)) \
                    .order_by('dist').first()
            dist_bus = bus.dist.km if bus else 10.0

            # Siapkan data untuk model (Urutan kolom HARUS SAMA dengan train_model.py)
            input_data = pd.DataFrame([{
                'dist_mrt': dist_mrt,
                'dist_mall': dist_mall,
                'dist_bus': dist_bus,
                'is_ac': is_ac,
                'is_kamar_mandi_dalam': is_km_dalam,
                'is_wifi': is_wifi
            }])

            # Pakai model yang sudah di-load
            predicted_price = PRICE_MODEL.predict(input_data)[0]

            return Response({
                'status': 'success',
                'lokasi_analisis': {
                    'jarak_mrt_km': round(dist_mrt, 2),
                    'jarak_mall_km': round(dist_mall, 2),
                    'jarak_bus_km': round(dist_bus, 2)
                },
                'prediksi_harga': int(predicted_price)
            }, status=status.HTTP_200_OK)

        except Exception as e:
            print(f"Error Prediction: {str(e)}")
            return Response({'status': 'error', 'message': str(e)}, status=status.HTTP_400_BAD_REQUEST)

class KostMapListAPIView(generics.ListAPIView):
    queryset = Kost.objects.all()
    serializer_class = KostMapSerializer