# Yuana Motor - Website Bengkel Motor & Mobil

Website profil dan layanan bengkel motor/mobil yang modern, profesional, dan responsif.

## 🚀 Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **Icons**: Lucide React
- **Language**: TypeScript

## 🎨 Design Features

- **Dark Mode Theme**: Slate-900/Zinc-900 base colors
- **Accent Colors**: 
  - Racing Yellow (`#FFD700`)
  - Auto Red (`#DC2626`)
  - Electric Blue (`#3B82F6`)
- **Typography**: Inter font family
- **Effects**: Glassmorphism, smooth animations, gradient overlays
- **Responsive**: Mobile-first design with md: and lg: breakpoints

## 📦 Project Structure

```
yuana-motor/
├── app/
│   ├── layout.tsx          # Root layout dengan metadata
│   ├── page.tsx            # Homepage dengan semua sections
│   └── globals.css         # Global styles
├── components/
│   ├── Navbar.tsx          # Navigation bar dengan glassmorphism
│   ├── Hero.tsx            # Hero section dengan CTA
│   ├── Features.tsx        # Keunggulan bengkel (4 cards)
│   ├── Services.tsx        # Layanan & pricing (6 services)
│   ├── Statistics.tsx      # Achievement dengan animated counter
│   ├── Testimonials.tsx    # Customer testimonials
│   ├── BookingForm.tsx     # Form booking servis
│   └── Footer.tsx          # Footer dengan maps & contact info
├── public/
│   └── images/             # Image assets
├── tailwind.config.ts      # Tailwind configuration
├── tsconfig.json           # TypeScript configuration
└── next.config.js          # Next.js configuration
```

## 🛠️ Installation

1. Clone repository:
```bash
git clone <repository-url>
cd yuana-motor
```

2. Install dependencies:
```bash
npm install
```

3. Run development server:
```bash
npm run dev
```

4. Open browser:
```
http://localhost:3000
```

## 📄 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🎯 Features

### Navbar
- Glassmorphism effect dengan backdrop blur
- Scroll behavior (transparent → solid background)
- Responsive mobile menu
- Smooth scroll ke sections

### Hero Section
- Gradient overlay background
- Animated text dengan Framer Motion
- CTA buttons (Booking & WhatsApp)
- Responsive layout

### Features Section
- 4 keunggulan utama:
  - Mekanik Tersertifikasi
  - Sparepart Original
  - Garansi Servis
  - Pengerjaan Cepat
- Icon dengan Lucide React
- Hover effects

### Services Section
- 6 layanan utama dengan pricing:
  - Servis Rutin (Rp 150.000)
  - Ganti Oli (Rp 100.000)
  - Tune Up (Rp 250.000)
  - Perbaikan Mesin (Rp 500.000)
  - Ganti Ban (Rp 200.000)
  - Cuci & Detailing (Rp 75.000)
- Detail fitur per layanan
- CTA button per card

### Statistics Section
- Animated counter dengan Framer Motion
- 4 achievement metrics:
  - 1000+ Kendaraan Ditangani
  - 10+ Tahun Pengalaman
  - 15+ Mekanik Profesional
  - 98% Kepuasan Pelanggan

### Testimonials Section
- Grid layout testimonial pelanggan
- Rating bintang
- Avatar & nama pelanggan
- Responsive 1-3 columns

### Booking Form
- Form input lengkap:
  - Nama, Email, Telepon
  - Jenis Kendaraan, Nomor Polisi
  - Jenis Servis, Tanggal & Waktu
  - Catatan Tambahan
- Validasi form
- Submit button dengan hover effect

### Footer
- Embedded Google Maps
- Alamat lengkap
- Jam operasional
- Social media links (Instagram, Facebook, WhatsApp)
- Copyright info

## 🎨 Color Palette

```css
racing-yellow: #FFD700
auto-red: #DC2626
electric-blue: #3B82F6
slate-900: #0F172A
zinc-900: #18181B
```

## 📱 Responsive Breakpoints

- Mobile: < 768px
- Tablet: 768px - 1024px (md:)
- Desktop: > 1024px (lg:)

## 🔧 Customization

### Mengubah Warna
Edit `tailwind.config.ts`:
```typescript
colors: {
  'racing-yellow': '#FFD700',
  'auto-red': '#DC2626',
  'electric-blue': '#3B82F6',
}
```

### Mengubah Konten
Edit komponen di folder `components/` sesuai kebutuhan.

### Menambah Section
1. Buat komponen baru di `components/`
2. Import dan tambahkan di `app/page.tsx`

## 📞 Contact Information

- **Alamat**: Jl. Raya Wonogiri-Ponorogo No.468, Jatibedug, Purworejo, Kec. Wonogiri, Kabupaten Wonogiri, Jawa Tengah 57615
- **Telepon**: +62 822-4345-6696
- **WhatsApp**: +62 822-4345-6696
- **Email**: info@yuanamotor.com
- **Jam Operasional**: Shift 1: 09.00 - 18.00 WIB | Shift 2: 20.00 - 04.00 WIB

## 📝 License

Copyright © 2024 Yuana Motor. All rights reserved.

## 🤝 Contributing

Untuk kontribusi, silakan buat pull request atau hubungi tim development.

---

**Built with ❤️ by Yuana Motor Team**
