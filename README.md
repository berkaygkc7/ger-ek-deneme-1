# Servispark Taşımacılık Web Sitesi

Modern, profesyonel ve tamamen responsive bir web sitesi. Servispark Taşımacılık şirketi için tasarlanmıştır.

## 📁 Klasör Yapısı

```
servispark-website/
├── index.html          # Ana HTML dosyası
├── css/
│   └── style.css       # Tüm CSS stilleri
├── js/
│   └── main.js         # JavaScript dosyası
├── images/             # Resim dosyaları (placeholder)
│   ├── logo.png
│   ├── hero-main.jpg
│   ├── hero-bg.jpg
│   ├── about-main.jpg
│   ├── fleet-minibus.jpg
│   ├── fleet-midibus.jpg
│   ├── fleet-bus.jpg
│   ├── fleet-vip.jpg
│   ├── gallery-1.jpg
│   ├── gallery-2.jpg
│   ├── gallery-3.jpg
│   ├── gallery-4.jpg
│   ├── gallery-5.jpg
│   ├── testimonial-1.jpg
│   ├── testimonial-2.jpg
│   ├── testimonial-3.jpg
│   ├── partner-1.png
│   ├── partner-2.png
│   ├── partner-3.png
│   ├── partner-4.png
│   ├── partner-5.png
│   ├── favicon-32x32.png
│   ├── favicon-16x16.png
│   ├── apple-touch-icon.png
│   └── og-image.jpg
└── README.md           # Bu dosya
```

## 🚀 Kullanılan Teknolojiler ve Kütüphaneler

### CDN Üzerinden Yüklenen Kütüphaneler:

1. **Google Fonts (Inter)** - Modern ve okunabilir tipografi
   ```html
   <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
   ```

2. **Font Awesome 6.5.1** - Profesyonel ikonlar
   ```html
   <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
   ```

3. **AOS (Animate On Scroll) 2.3.4** - Scroll animasyonları
   ```html
   <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.css">
   <script src="https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.js"></script>
   ```

## ✨ Özellikler

- 🎨 **Siyah ve Sarı Tema** - Profesyonel ve dikkat çekici renk paleti
- 📱 **Tam Responsive** - Mobil, tablet ve masaüstü uyumlu
- 🎬 **Animasyonlar** - AOS kütüphanesi ile scroll animasyonları
- 🔄 **Smooth Scroll** - Yumuşak sayfa geçişleri
- 📊 **İstatistik Sayaçları** - Animasyonlu sayı sayaçları
- 🖼️ **Lightbox Galeri** - Tıklanabilir galeri görselleri
- ❓ **FAQ Accordion** - Açılır/kapanır SSS bölümü
- 📝 **İletişim Formu** - Form validasyonu ile
- ⬆️ **Back to Top** - Yukarı çık butonu
- 🔍 **SEO Optimizasyonu** - Meta etiketleri ve Open Graph

## 🖼️ Resim Ekleme

Resimler `images/` klasörüne eklenmelidir. Mevcut placeholder'lar otomatik olarak değiştirilecektir.

### Önerilen Resim Boyutları:

| Dosya | Boyut | Format |
|-------|-------|--------|
| logo.png | 200x200 px | PNG (şeffaf) |
| hero-main.jpg | 1200x800 px | JPG |
| hero-bg.jpg | 1920x1080 px | JPG |
| about-main.jpg | 800x600 px | JPG |
| fleet-*.jpg | 600x400 px | JPG |
| gallery-*.jpg | 800x600 px | JPG |
| testimonial-*.jpg | 200x200 px | JPG |
| partner-*.png | 300x150 px | PNG |
| favicon-32x32.png | 32x32 px | PNG |
| favicon-16x16.png | 16x16 px | PNG |
| apple-touch-icon.png | 180x180 px | PNG |
| og-image.jpg | 1200x630 px | JPG |

## 🌐 Tarayıcıda Açma

### Yöntem 1: Doğrudan Açma
`index.html` dosyasına çift tıklayarak tarayıcıda açabilirsiniz.

### Yöntem 2: Live Server (VS Code)
1. VS Code'da Live Server eklentisini yükleyin
2. `index.html` dosyasına sağ tıklayın
3. "Open with Live Server" seçin

### Yöntem 3: Python HTTP Server
```bash
# Python 3
python -m http.server 8000

# Ardından tarayıcıda açın:
# http://localhost:8000
```

### Yöntem 4: Node.js HTTP Server
```bash
# http-server paketini global olarak yükleyin
npm install -g http-server

# Sunucuyu başlatın
http-server

# Ardından tarayıcıda açın:
# http://localhost:8080
```

## 📧 İletişim Bilgilerini Düzenleme

`index.html` dosyasında aşağıdaki bölümleri kendi bilgilerinizle değiştirin:

1. **Telefon numaraları**
2. **E-posta adresi**
3. **Adres bilgisi**
4. **Sosyal medya linkleri**
5. **WhatsApp numarası**
6. **Google Maps embed kodu**

## 🗺️ Google Maps Ekleme

1. [Google Maps](https://www.google.com/maps) adresine gidin
2. Konumunuzu bulun
3. "Paylaş" > "Harita yerleştir" seçin
4. HTML kodunu kopyalayın
5. `index.html` dosyasındaki map-section bölümüne yapıştırın

## 📝 Lisans

Bu proje Servispark Taşımacılık için özel olarak hazırlanmıştır.

---

**Geliştirici:** Web Tasarım Ekibi  
**Versiyon:** 1.0.0  
**Tarih:** 2024
