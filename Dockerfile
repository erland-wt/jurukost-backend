FROM python:3.12-slim

RUN apt-get update && apt-get install -y \
    binutils \
    libproj-dev \
    gdal-bin \
    libgdal-dev \
    python3-gdal \
    && rm -rf /var/lib/apt/lists/*

ENV PYTHONUNBUFFERED=1
ENV PYTHONPATH=/app
WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# Start command akan kita atur di dashboard Railway saja agar lebih fleksibel
CMD ["gunicorn", "backend.wsgi:application", "--bind", "0.0.0.0:8000"]