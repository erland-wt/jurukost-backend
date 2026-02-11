# Gunakan Python 3.12
FROM python:3.12-slim

# Install GDAL (Wajib untuk GeoDjango/PostGIS)
RUN apt-get update && apt-get install -y \
    binutils \
    libproj-dev \
    gdal-bin \
    libgdal-dev \
    python3-gdal \
    && rm -rf /var/lib/apt/lists/*

# Setup Environment
ENV PYTHONUNBUFFERED=1
ENV PYTHONPATH=/app

# Setup Folder Kerja
WORKDIR /app

# Install Dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy Project
COPY . .

# Jalankan Server (Ganti 'juragankost' sesuai nama folder project django anda)
CMD ["gunicorn", "backend.wsgi:application", "--bind", "0.0.0.0:8000"]