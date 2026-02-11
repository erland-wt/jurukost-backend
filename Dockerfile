# Gunakan Python Image
FROM python:3.10-slim

# Install Library Geo-Spatial (GDAL/GEOS) Wajib untuk PostGIS
RUN apt-get update && apt-get install -y \
    binutils \
    libproj-dev \
    gdal-bin \
    libgdal-dev \
    python3-gdal \
    && rm -rf /var/lib/apt/lists/*

# Setup Folder Kerja
WORKDIR /app

# Copy Requirements & Install
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy Project Code
COPY . .

# Collect Static (Jika ada)
# RUN python manage.py collectstatic --noinput

# Perintah menjalankan server
CMD ["gunicorn", "juragankost.wsgi:application", "--bind", "0.0.0.0:8000"]