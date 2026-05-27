"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Calendar, Clock, User, Phone, Car, MessageSquare, CheckCircle, XCircle, Loader2 } from "lucide-react";
import { supabase, type Booking } from "@/lib/supabase";
import Link from "next/link";
import Image from "next/image";

export default function CekBookingPage() {
  const [bookingNumber, setBookingNumber] = useState("");
  const [booking, setBooking] = useState<Booking | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    setError("");
    setBooking(null);

    try {
      const { data, error: searchError } = await supabase
        .from('bookings')
        .select('*')
        .eq('booking_number', bookingNumber.trim().toUpperCase())
        .single();

      if (searchError) {
        if (searchError.code === 'PGRST116') {
          setError('Nomor booking ora ketemu. Coba meneh!');
        } else {
          throw searchError;
        }
        return;
      }

      setBooking(data);
    } catch (err: any) {
      console.error('Error searching booking:', err);
      setError(`Wah error iki: ${err.message}`);
    } finally {
      setIsSearching(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { label: string; color: string }> = {
      pending: { label: 'Menunggu', color: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30' },
      confirmed: { label: 'Dikonfirmasi', color: 'bg-blue-500/10 text-blue-400 border-blue-500/30' },
      in_progress: { label: 'Dikerjakan', color: 'bg-purple-500/10 text-purple-400 border-purple-500/30' },
      completed: { label: 'Rampung', color: 'bg-green-500/10 text-green-400 border-green-500/30' },
      cancelled: { label: 'Batal', color: 'bg-red-500/10 text-red-400 border-red-500/30' },
    };

    const config = statusConfig[status] || statusConfig.pending;
    
    return (
      <span className={`px-3 py-1.5 rounded-full text-sm font-semibold border ${config.color}`}>
        {config.label}
      </span>
    );
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950">
      {/* Header */}
      <div className="border-b border-neutral-800 bg-neutral-900/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-32 h-10">
                <Image
                  src="/logo-ym98.png"
                  alt="Yuana Motor"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </Link>
            <Link
              href="/"
              className="text-sm text-neutral-400 hover:text-brand-500 transition-colors"
            >
              Kembali
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="section-label">Cek Booking</span>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                Cek Status Booking
              </h1>
              <p className="text-neutral-400">
                Ketik nomor booking sampeyan nggo cek status servis
              </p>
            </motion.div>
          </div>

          {/* Search Form */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            onSubmit={handleSearch}
            className="bg-neutral-900/80 backdrop-blur-xl border border-neutral-800 rounded-2xl p-6 mb-8 shadow-xl"
          >
            <div className="flex gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
                <input
                  type="text"
                  value={bookingNumber}
                  onChange={(e) => setBookingNumber(e.target.value)}
                  placeholder="Contoh: BK-20260524-001"
                  required
                  disabled={isSearching}
                  className="w-full pl-12 pr-4 py-4 bg-neutral-800/50 border border-neutral-700 rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all duration-300 disabled:opacity-50"
                />
              </div>
              <button
                type="submit"
                disabled={isSearching}
                className="px-8 py-4 bg-gradient-to-r from-brand-500 to-accent-500 text-neutral-900 font-bold rounded-xl hover:from-accent-500 hover:to-yellow-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-brand-500/20 flex items-center gap-2"
              >
                {isSearching ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Cek...
                  </>
                ) : (
                  <>
                    <Search className="w-5 h-5" />
                    Cek
                  </>
                )}
              </button>
            </div>
          </motion.form>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 flex items-start gap-3"
            >
              <XCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
              <p className="text-red-200">{error}</p>
            </motion.div>
          )}

          {/* Booking Details */}
          {booking && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-neutral-900/80 backdrop-blur-xl border border-neutral-800 rounded-2xl overflow-hidden shadow-xl"
            >
              {/* Header */}
              <div className="p-6 border-b border-neutral-800">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-2xl font-bold font-mono tracking-wide text-brand-500">
                    {booking.booking_number}
                  </h2>
                  {getStatusBadge(booking.status)}
                </div>
                <p className="text-sm text-neutral-500">
                  Dibuat: {formatDate(booking.created_at)}
                </p>
              </div>

              {/* Details Grid */}
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <User className="w-5 h-5 text-brand-500 mt-0.5" />
                    <div>
                      <p className="text-xs text-neutral-500">Nama</p>
                      <p className="text-white font-medium">{booking.name}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-brand-500 mt-0.5" />
                    <div>
                      <p className="text-xs text-neutral-500">No. WhatsApp</p>
                      <p className="text-white font-medium">{booking.phone}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Car className="w-5 h-5 text-brand-500 mt-0.5" />
                    <div>
                      <p className="text-xs text-neutral-500">Kendaraan</p>
                      <p className="text-white font-medium">{booking.vehicle}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MessageSquare className="w-5 h-5 text-brand-500 mt-0.5" />
                    <div>
                      <p className="text-xs text-neutral-500">Layanan</p>
                      <p className="text-white font-medium">{booking.service}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Calendar className="w-5 h-5 text-brand-500 mt-0.5" />
                    <div>
                      <p className="text-xs text-neutral-500">Tanggal</p>
                      <p className="text-white font-medium">{formatDate(booking.booking_date)}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-brand-500 mt-0.5" />
                    <div>
                      <p className="text-xs text-neutral-500">Waktu</p>
                      <p className="text-white font-medium">{booking.booking_time} WIB</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Notes */}
              {booking.notes && (
                <div className="px-6 pb-6">
                  <div className="flex items-start gap-3 bg-neutral-800/50 rounded-xl p-4">
                    <MessageSquare className="w-5 h-5 text-brand-500 mt-0.5" />
                    <div>
                      <p className="text-xs text-neutral-500 mb-1">Catatan</p>
                      <p className="text-neutral-300">{booking.notes}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Status Info */}
              <div className="border-t border-neutral-800 bg-neutral-950/50 px-6 py-5">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-neutral-300">
                      {booking.status === 'pending' && 'Booking sampeyan sek diproses, sabar yo menunggu konfirmasi soko kito'}
                      {booking.status === 'confirmed' && 'Booking wis dikonfirmasi, monggo rawuh sesuai jadwal'}
                      {booking.status === 'in_progress' && 'Motor sampeyan lagi digarap, tunggu sebentar mawon'}
                      {booking.status === 'completed' && 'Motor sampeyan wis rampung, maturnuwun sampun service neng kito!'}
                      {booking.status === 'cancelled' && 'Booking iki wis dibatalno'}
                    </p>
                    <p className="text-xs text-neutral-600 mt-1">
                      Terakhir diupdate: {formatDate(booking.updated_at)}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
