from django.contrib import admin
from django.contrib.gis.admin import GISModelAdmin
from .models import Kost, FasilitasUmum

@admin.register(Kost)
class KostAdmin(GISModelAdmin):
    # Menampilkan kolom ini di list view
    list_display = ('nama', 'harga_per_bulan', 'is_ac', 'created_at')
    
    # Agar bisa filter data di sidebar kanan
    list_filter = ('is_ac', 'is_kamar_mandi_dalam')
    
    # Agar bisa cari data berdasarkan nama
    search_fields = ('nama', 'alamat')
    
    # Mengatur tampilan peta di Admin (OpenStreetMap)
    gis_widget_kwargs = {
        'attrs': {
            'default_zoom': 12,
            'default_lat': -6.2088,
            'default_lon': 106.8456,
        }
    }

@admin.register(FasilitasUmum)
class FasilitasUmumAdmin(GISModelAdmin):
    list_display = ('nama', 'kategori', 'lokasi')
    list_filter = ('kategori',)
    search_fields = ('nama',)
    gis_widget_kwargs = {
        'attrs': {
            'default_zoom': 12,
            'default_lat': -6.2088,
            'default_lon': 106.8456,
        }
    }