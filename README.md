# CAT LAB+ Web Prototype

Duplikasi visual dan fungsional berbasis web untuk [catlabplus.com](https://catlabplus.com). Dibangun menggunakan React + TypeScript + Vite + Tailwind CSS v4, lengkap dengan semua aset media resmi (logo, gambar produk, ilustrasi instruksi, dan video demo 1080p).

## 🚀 Fitur yang Direplikasi

1. **Header & Sticky Navigation**:
   - Logo resmi CAT LAB+
   - Navigasi link (Product, Instructions, Features, Benefits, FAQs, Contact)
   - **Bilingual Switcher**: Beralih instan antara **English** dan **繁體中文** (Traditional Chinese)
   - Tombol CTA *"Free Consultation"*

2. **Hero Section**:
   - Badge *"Chosen by an increasing number of veterinarians"*
   - Heading warna brand (*#fed700* & *#282828*)
   - Hero background dengan gradient overlay
   - Render 3D box produk dengan floating feature pill badges
   - Avatar dokter hewan & rating bintang

3. **Trust Marquee**:
   - Ticker berjalan horizontal tanpa henti dengan highlight klinis

4. **Product Showcase**:
   - Render kemasan produk CAT LAB+
   - 3 pilar fitur utama (Veterinary-Approved Precision, Stress-Free for Cats, Complete Home Kit)
   - Dropdown *"Package Includes"* (daftar isi kit lengkap)
   - Dark summary banner

5. **Video Demonstration**:
   - Pemutar video interaktif dengan file video asli `demo-en.mp4`
   - Kontrol kustom (Play/Pause, scrub slider progress, mute toggle, fullscreen)
   - Trust badges: *Patented Technology*, *Chosen by More Animal Lovers*, *Clinically Validated*

6. **Instructions for Use (8 Langkah)**:
   - 8 kartu langkah lengkap dengan foto ilustrasi step 1 s/d step 8
   - Box "Important Notice" (peringatan medis & batas penyimpanan sampel)
   - Box "Waste Disposal" (panduan pembuangan ramah lingkungan)

7. **Fitur Khusus Dokter Hewan & Pemilik Kucing**:
   - *For Veterinarians*: 4 kartu benefit klinis + foto pemeriksaan dokter hewan asli
   - *For Cat Owners*: 4 kartu kenyamanan kucing di rumah + foto pemilik kucing asli

8. **Dual Benefits Comparison**:
   - Tabel perbandingan dual-manfaat (Klinik Hewan vs Pemilik Kucing) untuk 4 teknologi utama

9. **Connected Care Ecosystem**:
   - 3 simpul alur: Cat Owner ↔ CAT LAB+ ↔ Veterinarian
   - Testimoni dokter hewan (Dr. Chen) & pemilik kucing (Mrs. Zhang)

10. **Ready to Transform (Plan / CTA)**:
    - Card paket produk dengan bullet point keunggulan dan tombol konsultasi

11. **Accessible FAQ Accordion**:
    - 5 pertanyaan & jawaban esensial menggunakan elemen native `<details name="catlab-faqs">` yang mutually-exclusive, ramah pembaca layar (*screen reader*), dan dapat dicari langsung via *Find in page* browser

12. **Halaman Contact Us (`/contact`)**:
    - Form kontak lengkap: Company, Name, Telephone, Email, Address, Subject selector, Message content
    - Verification code (Captcha) dinamis interaktif dengan tombol *refresh*
    - Informasi kantor produsen (*CL Infinite Technology Co., Ltd.*, alamat, hotline, email resmi)
    - Notifikasi sukses pengiriman pesan

13. **Footer**:
    - Logo footer, deskripsi, navigasi cepat, copyright, dan tautan sosial (LINE, IG, FB) serta tombol *Back to Top*.

---

## 🛠️ Menjalankan Project

### 1. Mode Development
```bash
npm run dev
```
Buka browser di: [http://localhost:5173/](http://localhost:5173/)

### 2. Build untuk Production
```bash
npm run build
```

### 3. Preview Hasil Build
```bash
npm run preview
```

---

## 📁 Struktur Direktori
```
catlabplus/
├── public/
│   ├── images/       # Semua aset logo, avatar, step 1-8, foto produk & vet
│   └── videos/       # File video demo-en.mp4 resmi
├── src/
│   ├── components/   # Komponen-komponen modular UI
│   ├── context/      # LanguageContext (EN / ZH switcher)
│   ├── translations.ts # Seluruh data teks lengkap EN & ZH
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── package.json
└── vite.config.ts
```
