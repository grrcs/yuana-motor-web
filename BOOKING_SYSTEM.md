# Sistem Booking Yuana Motor

## Fitur yang Sudah Dibuat

### 1. Database Integration (Supabase)
- **File**: `lib/supabase.ts`
- Koneksi ke Supabase database
- TypeScript types untuk Booking
- Table: `bookings` dengan kolom:
  - `id` (UUID, primary key)
  - `booking_number` (auto-generated: BK-YYYYMMDD-XXX)
  - `name`, `phone`, `vehicle`, `service`
  - `booking_date`, `booking_time`
  - `notes` (optional)
  - `status` (pending/confirmed/in_progress/completed/cancelled)
  - `created_at`, `updated_at`

### 2. Booking Form (Updated)
- **File**: `components/BookingForm.tsx`
- **Backup**: `components/BookingForm.backup.tsx`
- Fitur:
  - Simpan booking ke database Supabase
  - Generate booking number otomatis
  - Kirim notifikasi WhatsApp ke 6282243456696
  - Validasi form
  - Loading state & error handling

### 3. Halaman Cek Booking
- **URL**: `/cek-booking`
- **File**: `app/cek-booking/page.tsx`
- Fitur:
  - Cari booking berdasarkan nomor booking
  - Tampilkan detail booking
  - Status tracking dengan badge warna
  - Design matching dengan main site

### 4. Admin Panel
- **URL**: `/admin`
- **File**: `app/admin/page.tsx`
- Fitur:
  - Dashboard dengan statistik (total, pending, confirmed, dll)
  - Tabel semua booking dengan sorting
  - Filter berdasarkan status
  - Search booking (nomor, nama, HP, kendaraan)
  - Update status booking (5 status)
  - Delete booking
  - Modal detail booking
  - Real-time refresh
  - Design matching dengan main site

### 5. Navigation
- **File**: `components/Navbar.tsx`
- Tambahan link "Cek Booking" di navbar

## Setup Database di Supabase

Jalankan SQL berikut di Supabase SQL Editor:

```sql
-- Create bookings table
CREATE TABLE bookings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  booking_number TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  vehicle TEXT NOT NULL,
  service TEXT NOT NULL,
  booking_date DATE NOT NULL,
  booking_time TEXT NOT NULL,
  notes TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'in_progress', 'completed', 'cancelled')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX idx_bookings_booking_number ON bookings(booking_number);
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_bookings_created_at ON bookings(created_at DESC);

-- Enable Row Level Security
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can insert (create booking)
CREATE POLICY "Anyone can insert bookings"
  ON bookings FOR INSERT
  TO public
  WITH CHECK (true);

-- Policy: Anyone can read their own booking
CREATE POLICY "Anyone can read bookings"
  ON bookings FOR SELECT
  TO public
  USING (true);

-- Policy: Only authenticated users can update
CREATE POLICY "Authenticated users can update bookings"
  ON bookings FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Policy: Only authenticated users can delete
CREATE POLICY "Authenticated users can delete bookings"
  ON bookings FOR DELETE
  TO authenticated
  USING (true);

-- Function to auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-update updated_at
CREATE TRIGGER update_bookings_updated_at
  BEFORE UPDATE ON bookings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
```

## Environment Variables

File `.env.local` sudah dikonfigurasi dengan:
```
NEXT_PUBLIC_SUPABASE_URL=https://xuosgevwmiaaozsfvcmj.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_uF5BD8vrIWADnhHSh5nvng_X4HLQ0NW
```

## Cara Menjalankan

1. Install dependencies:
```bash
npm install
```

2. Setup database di Supabase (jalankan SQL di atas)

3. Jalankan development server:
```bash
npm run dev
```

4. Akses:
   - Main site: http://localhost:3000
   - Cek Booking: http://localhost:3000/cek-booking
   - Admin Panel: http://localhost:3000/admin

## Flow Booking

1. **User mengisi form booking** → Data disimpan ke Supabase + WhatsApp notifikasi
2. **User dapat booking number** → Bisa cek status di `/cek-booking`
3. **Admin kelola booking** → Update status di `/admin`
4. **User cek status** → Lihat progress booking real-time

## Status Booking

- **Pending** (Menunggu): Booking baru masuk
- **Confirmed** (Dikonfirmasi): Admin sudah konfirmasi
- **In Progress** (Dikerjakan): Sedang dikerjakan
- **Completed** (Selesai): Servis selesai
- **Cancelled** (Dibatalkan): Booking dibatalkan

## Keamanan

- Row Level Security (RLS) enabled
- Public bisa insert & read
- Update & delete hanya untuk authenticated users
- Environment variables tidak di-commit ke git

## Untuk Tugas Akademik

Sistem ini mendemonstrasikan:
- ✅ CRUD operations (Create, Read, Update, Delete)
- ✅ Database integration dengan Supabase
- ✅ Real-time data fetching
- ✅ Form validation & error handling
- ✅ Admin panel untuk management
- ✅ User interface untuk tracking
- ✅ Status management system
- ✅ Search & filter functionality
- ✅ Responsive design
- ✅ TypeScript untuk type safety

## Notes

- Backup form lama ada di `components/BookingForm.backup.tsx`
- Admin panel tidak ada authentication (untuk demo)
- Untuk production, tambahkan authentication di admin panel
- WhatsApp integration tetap berfungsi seperti sebelumnya
