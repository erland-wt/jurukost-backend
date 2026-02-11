# Gunakan Python 3.12 (sesuai fix sebelumnya)
FROM python:3.12-slim

# Install system dependencies (GDAL untuk PostGIS)
RUN apt-get update && apt-get install -y \
    binutils \
    libproj-dev \
    gdal-bin \
    libgdal-dev \
    python3-gdal \
    && rm -rf /var/lib/apt/lists/*

# Set environment variables
ENV PYTHONUNBUFFERED=1
ENV PYTHONDONTWRITEBYTECODE=1

# Set working directory
WORKDIR /app

# Copy requirements dan install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy seluruh project ke dalam container
COPY . .

# Pastikan folder tempat manage.py berada ditambahkan ke PYTHONPATH
ENV PYTHONPATH=/app

# Perintah menjalankan server
# Pastikan 'juragankost' sesuai dengan nama folder yang berisi settings.py
CMD ["gunicorn", "backend.wsgi:application", "--bind", "0.0.0.0:8000"]