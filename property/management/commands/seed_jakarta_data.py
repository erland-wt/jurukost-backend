import osmnx as ox
from django.core.management.base import BaseCommand
from django.contrib.gis.geos import Point
from property.models import FasilitasUmum

class Command(BaseCommand):
    help = 'Download data fasilitas umum se-Jakarta dari OpenStreetMap'

    def handle(self, *args, **options):
        self.stdout.write(self.style.WARNING('🌍 Memulai download data Jakarta... (Bisa memakan waktu 5-10 menit)'))

        # Wilayah Target: Seluruh Provinsi DKI Jakarta
        place_name = "Jakarta, Indonesia"

        # --- 1. DOWNLOAD DATA TRANSPORTASI (Kereta/MRT/KRL) ---
        self.stdout.write("   🚅 Mengambil data Stasiun MRT/KRL/LRT...")
        try:
            tags_train = {'railway': ['station', 'subway_entrance'], 'station': 'subway'}
            gdf_train = ox.features_from_place(place_name, tags=tags_train)
            
            self.save_to_db(gdf_train, 'MRT')
        except Exception as e:
            self.stdout.write(self.style.ERROR(f"   ❌ Gagal MRT: {e}"))

        # --- 2. DOWNLOAD DATA TRANSJAKARTA (Bus Stop) ---
        self.stdout.write("   🚌 Mengambil data Halte TransJakarta...")
        try:
            tags_bus = {'highway': 'bus_stop', 'public_transport': 'platform'}
            gdf_bus = ox.features_from_place(place_name, tags=tags_bus)
            gdf_bus = gdf_bus[gdf_bus['name'].notna()]
            
            self.save_to_db(gdf_bus, 'BUS')
        except Exception as e:
             self.stdout.write(self.style.ERROR(f"   ❌ Gagal Bus: {e}"))

        # --- 3. DOWNLOAD DATA MALL ---
        self.stdout.write("   🛍️ Mengambil data Mall...")
        try:
            tags_mall = {'shop': 'mall'}
            gdf_mall = ox.features_from_place(place_name, tags=tags_mall)
            self.save_to_db(gdf_mall, 'MALL')
        except Exception as e:
             self.stdout.write(self.style.ERROR(f"   ❌ Gagal Mall: {e}"))
             
        # --- 4. DOWNLOAD MINIMARKET (Indomaret/Alfamart) ---
        self.stdout.write("   🏪 Mengambil data Minimarket (Indomaret/Alfamart)...")
        try:
            tags_mart = {'shop': 'convenience'}
            gdf_mart = ox.features_from_place(place_name, tags=tags_mart)
            
            # Filter nama spesifik agar warung kelontong tidak masuk
            gdf_mart = gdf_mart[gdf_mart['name'].str.contains('Indomaret|Alfamart|Alfa Midi', case=False, na=False)]
            
            self.save_to_db(gdf_mart, 'MART')
        except Exception as e:
             self.stdout.write(self.style.ERROR(f"   ❌ Gagal Minimarket: {e}"))

        self.stdout.write(self.style.SUCCESS('\n✅ Selesai! Data Jakarta berhasil disimpan.'))

    def save_to_db(self, gdf, kategori_code):
        count = 0
        for index, row in gdf.iterrows():
            try:
                # Ambil geometri (Point)
                geom = row['geometry']
                
                if geom.geom_type != 'Point':
                    geom = geom.centroid

                # Koordinat
                lng = geom.x
                lat = geom.y
                
                # Nama
                nama = row['name'] if 'name' in row and str(row['name']) != 'nan' else 'Tanpa Nama'

                # Simpan ke Database Django
                FasilitasUmum.objects.get_or_create(
                    nama=nama,
                    kategori=kategori_code,
                    defaults={
                        'lokasi': Point(lng, lat, srid=4326),
                        'alamat_lengkap': f"Data OSM ID: {index}"
                    }
                )
                count += 1
            except Exception as e:
                continue
        
        self.stdout.write(self.style.SUCCESS(f"      -> Tersimpan {count} data {kategori_code}"))