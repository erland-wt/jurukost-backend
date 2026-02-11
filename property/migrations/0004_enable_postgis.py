from django.db import migrations
from django.contrib.postgres.operations import CreateExtension

class Migration(migrations.Migration):

    dependencies = [
        ('property', '0003_remove_kost_deskripsi_kost_gambar_url_kost_link_url_and_more'), 
    ]

    operations = [
        CreateExtension('postgis'),
    ]