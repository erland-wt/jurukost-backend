import time
import random
import re
from django.core.management.base import BaseCommand
from django.contrib.gis.geos import Point
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager
from geopy.geocoders import Nominatim
from property.models import Kost

class Command(BaseCommand):
    help = 'Scrape DEEP data V15 - Auto Load More & Smart Scroll'

    def handle(self, *args, **options):
        # 1. SETUP DRIVER
        chrome_options = Options()
        chrome_options.add_argument("--disable-blink-features=AutomationControlled")
        chrome_options.add_argument("user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36")
        
        driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=chrome_options)
        geolocator = Nominatim(user_agent="juragankost_bot_v15_expander")

        areas = [
            {"name": "Jakarta Selatan", "url": "https://mamikos.com/cari/jakarta-selatan-kota-jakarta-selatan-daerah-khusus-ibukota-jakarta-indonesia/all/bulanan/0-15000000/100?keyword=Jakarta%20Selatan&suggestion_type=search&rent=2&sort=price,-&price=10000-20000000&singgahsini=0"},
            {"name": "Jakarta Barat", "url": "https://mamikos.com/cari/jakarta-barat-kota-jakarta-barat-daerah-khusus-ibukota-jakarta-indonesia/all/bulanan/0-15000000/98?keyword=Jakarta%20Barat&suggestion_type=search&rent=2&sort=price,-&price=10000-20000000&singgahsini=0"},
            {"name": "Jakarta Pusat", "url": "https://mamikos.com/cari/jakarta-pusat-kota-jakarta-pusat-daerah-khusus-ibukota-jakarta-indonesia/all/bulanan/0-15000000/99?keyword=Jakarta%20Pusat&suggestion_type=search&rent=2&sort=price,-&price=10000-20000000&singgahsini=0"},
            {"name": "Jakarta Timur", "url": "https://mamikos.com/cari/jakarta-timur-kota-jakarta-timur-daerah-khusus-ibukota-jakarta-indonesia/all/bulanan/0-15000000/101?keyword=Jakarta%20Timur&suggestion_type=search&rent=2&sort=price,-&price=10000-20000000&singgahsini=0"},
            {"name": "Jakarta Utara", "url": "https://mamikos.com/cari/jakarta-utara-kota-jakarta-utara-daerah-khusus-ibukota-jakarta-indonesia/all/bulanan/0-15000000/102?keyword=Jakarta%20Utara&suggestion_type=search&rent=2&sort=price,-&price=10000-20000000&singgahsini=0"},
        ]

        total_saved = 0

        for area in areas:
            self.stdout.write(self.style.WARNING(f"\n🚀 Membuka Area: {area['name']}..."))
            driver.get(area['url'])
            time.sleep(5)

            # --- FASE 1: CLICK "LIHAT LEBIH BANYAK" (MAX 5 KALI) ---
            MAX_LOAD_MORE = 7
            self.stdout.write("   🔄 Mencoba memperluas daftar kost...")
            
            for click_count in range(MAX_LOAD_MORE):
                try:
                    # Scroll ke bawah dulu agar tombol terlihat
                    driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
                    time.sleep(2)
                    
                    # Cari tombol berdasarkan class yang kamu berikan
                    load_more_btn = driver.find_element(By.CLASS_NAME, 'nominatim-list__see-more')
                    
                    # Klik menggunakan JS agar lebih kuat (bypass overlay)
                    driver.execute_script("arguments[0].click();", load_more_btn)
                    
                    self.stdout.write(f"      👉 Klik 'Lihat Lebih Banyak' ({click_count + 1}/{MAX_LOAD_MORE})")
                    time.sleep(4) # Tunggu loading data baru
                except:
                    self.stdout.write("      ✋ Tombol tidak ditemukan / Data sudah habis.")
                    break

            # --- FASE 2: SCROLL HALUS LISTING (PENTING) ---
            # Setelah data diperluas, kita harus scroll dari atas ke bawah pelan-pelan
            # agar gambar lazy-load ter-render dan elemen tidak error saat diklik.
            self.stdout.write("   ⬇️  Melakukan rendering ulang (Scroll Halus)...")
            driver.execute_script("window.scrollTo(0, 0);") # Kembali ke atas
            time.sleep(2)
            
            total_height = driver.execute_script("return document.body.scrollHeight")
            for i in range(0, total_height, 700):
                driver.execute_script(f"window.scrollTo(0, {i});")
                time.sleep(0.5) # Scroll cepat tapi pasti

            # --- FASE 3: CARI SEMUA KARTU ---
            cards = driver.find_elements(By.CLASS_NAME, 'kost-rc')
            self.stdout.write(f"   📋 Total kartu ditemukan: {len(cards)}. Memulai Deep Scraping...")

            if len(cards) == 0:
                continue

            main_window = driver.current_window_handle
            
            # Kita proses SEMUA kartu yang ditemukan (atau batasi jika mau)
            # Saya batasi 50 agar kamu bisa tes dulu tanpa menunggu seharian
            limit_process = len(cards)
            
            for index, card in enumerate(cards[:limit_process]):
                try:
                    self.stdout.write(f"   🔎 ({index+1}/{len(cards)}) Memproses kartu...")
                    
                    # Scroll ke elemen kartu
                    driver.execute_script("arguments[0].scrollIntoView({block: 'center'});", card)
                    time.sleep(1)

                    # Buka Tab Baru
                    try:
                        link_el = card.find_element(By.TAG_NAME, 'a')
                        href = link_el.get_attribute('href')
                        driver.execute_script(f"window.open('{href}', '_blank');")
                    except:
                        ActionChains(driver).key_down(Keys.CONTROL).click(card).key_up(Keys.CONTROL).perform()
                    
                    time.sleep(4) 

                    if len(driver.window_handles) > 1:
                        driver.switch_to.window(driver.window_handles[-1])
                        
                        # --- FASE 4: SCROLL DETAIL PAGE (FULL SCROLL) ---
                        # Ini solusi untuk masalah Luas Kamar "Unknown"
                        # Kita paksa scroll sampai mentok bawah bertahap
                        page_height = driver.execute_script("return document.body.scrollHeight")
                        step = 800
                        for pos in range(0, page_height, step):
                            driver.execute_script(f"window.scrollTo(0, {pos});")
                            time.sleep(0.5) # Jeda dikit biar render
                        
                        # Scroll mentok akhir
                        driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
                        time.sleep(2)

                        # --- MULAI AMBIL DATA ---
                        try:
                            nama = driver.find_element(By.CSS_SELECTOR, ".detail-title__room-name").text.strip()
                        except:
                            try: nama = driver.find_element(By.TAG_NAME, "h1").text.strip()
                            except: nama = "Unknown Kost"

                        try:
                            price_el = driver.find_element(By.CSS_SELECTOR, ".rc-price__text")
                            raw_price = price_el.text
                            clean_price = re.sub(r'\D', '', raw_price)
                            harga = int(clean_price)
                        except:
                            harga = 0
                        
                        if harga < 300000:
                            driver.close()
                            driver.switch_to.window(main_window)
                            continue

                        # Ambil Seluruh Teks Halaman
                        try:
                            body_text = driver.find_element(By.TAG_NAME, "body").text.lower()
                        except:
                            body_text = ""

                        # --- A. Luas Kamar (Advanced Regex) ---
                        luas = "Unknown"
                        
                        # 1. Coba cari di Label Spesifikasi
                        try:
                            labels = driver.find_elements(By.CLASS_NAME, "detail-kost-facility-item__label")
                            for label in labels:
                                txt = label.text.lower()
                                if "x" in txt and any(c.isdigit() for c in txt):
                                    luas = txt.replace("meter", "").strip() + " m"
                                    break
                        except:
                            pass

                        # 2. Fallback Regex (Support Koma & Titik)
                        if luas == "Unknown":
                            # Mencari: Angka(.,)Angka [x] Angka(.,)Angka
                            # Contoh: 2.5x3  |  3,5 x 4
                            match = re.search(r'(\d+(?:[.,]\d+)?)\s*[xX]\s*(\d+(?:[.,]\d+)?)', body_text)
                            if match:
                                luas = f"{match.group(1)} x {match.group(2)} m"

                        # --- B. Fasilitas ---
                        is_km_dalam = any(x in body_text for x in ["k. mandi dalam", "kamar mandi dalam", "km dalam", "bath inside", "private bathroom"])
                        is_ac = "ac" in body_text and "access" not in body_text
                        is_wifi = "wifi" in body_text or "internet" in body_text

                        # --- C. Foto & Geo ---
                        gambar_url = ""
                        try:
                            meta_img = driver.find_element(By.CSS_SELECTOR, "meta[property='og:image']")
                            gambar_url = meta_img.get_attribute("content")
                        except:
                            pass
                        
                        if not gambar_url:
                            gambar_url = f"https://source.unsplash.com/random/300x200/?bedroom&sig={random.randint(1,1000)}"

                        point = None
                        alamat_final = f"{nama}, {area['name']}"
                        
                        if not Kost.objects.filter(nama=nama).exists():
                            try:
                                search_query = f"{nama}, {area['name']}, Jakarta"
                                location = geolocator.geocode(search_query, timeout=2)
                                if location:
                                    point = Point(location.longitude, location.latitude, srid=4326)
                                    alamat_final = location.address
                                else:
                                    # Fallback
                                    if "Selatan" in area['name']: center = (-6.26, 106.81)
                                    elif "Barat" in area['name']: center = (-6.16, 106.75)
                                    elif "Pusat" in area['name']: center = (-6.18, 106.82)
                                    elif "Timur" in area['name']: center = (-6.22, 106.90)
                                    else: center = (-6.13, 106.88)
                                    
                                    lat = center[0] + random.uniform(-0.02, 0.02)
                                    lng = center[1] + random.uniform(-0.02, 0.02)
                                    point = Point(lng, lat, srid=4326)
                            except:
                                pass

                            if point:
                                Kost.objects.create(
                                    nama=nama,
                                    alamat=alamat_final,
                                    harga_per_bulan=harga,
                                    luas_kamar=luas,
                                    is_ac=is_ac,
                                    is_wifi=is_wifi,
                                    is_kamar_mandi_dalam=is_km_dalam,
                                    gambar_url=gambar_url,
                                    link_url=driver.current_url,
                                    lokasi=point
                                )
                                print(f"      ✅ SAVED: {nama[:25]}... | {luas} | Rp {harga}")
                                total_saved += 1

                        driver.close()
                        driver.switch_to.window(main_window)
                    
                    else:
                        print("      ⚠️ Tab tidak terbuka")
                        
                except Exception as e:
                    if len(driver.window_handles) > 1:
                        driver.close()
                    driver.switch_to.window(main_window)
                    continue

        driver.quit()
        self.stdout.write(self.style.SUCCESS(f"\n🏁 SELESAI! Total data: {total_saved}"))