from django.contrib.gis.db import models

class Kost(models.Model):
    nama = models.CharField(max_length=255)
    alamat = models.TextField()
    harga_per_bulan = models.DecimalField(max_digits=12, decimal_places=0)
    
    # Field untuk menyimpan luas kamar asli (contoh: "3x4 m")
    luas_kamar = models.CharField(max_length=50, default="Unknown") 
    
    # Fasilitas
    is_ac = models.BooleanField(default=False)
    is_wifi = models.BooleanField(default=False)
    is_kamar_mandi_dalam = models.BooleanField(default=False)
    
    # Link Foto Asli & Link Halaman Detail
    gambar_url = models.TextField(default="", blank=True)
    link_url = models.TextField(default="", blank=True)
    
    lokasi = models.PointField(srid=4326)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.nama
    
class FasilitasUmum(models.Model):
    KATEGORI_CHOICES = [
        ('MRT', 'Stasiun MRT/LRT/KRL'),
        ('BUS', 'Halte TransJakarta'),
        ('MALL', 'Mall & Pusat Perbelanjaan'),
        ('MART', 'Minimarket (Indomaret/Alfamart)'),
    ]

    nama = models.CharField(max_length=255)
    kategori = models.CharField(max_length=10, choices=KATEGORI_CHOICES)
    lokasi = models.PointField(srid=4326)
    alamat_lengkap = models.TextField(blank=True, null=True)
    
    def __str__(self):
        return f"{self.kategori} - {self.nama}"