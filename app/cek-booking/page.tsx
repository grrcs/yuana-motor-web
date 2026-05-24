"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Calendar, Clock, User, Phone, Car, MessageSquare, CheckCircle, XCircle, Loader2 } from "lucide-react";
import { supabase, type Booking } from "@/lib/supabase";

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
          setError('Nomor booking tidak ditemukan');
        } else {
          throw searchError;
        }
        return;
      }

      setBooking(data);
    } catch (err: any) {
      console.error('Error searching booking:', err);
      setError(`Terjadi kesalahan: ${err.message}`);
    } finally {
      setIsSearching(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { label: 'Menunggu', color: 'bg-yellow-900/50 text-yellow-300 border-yellow-700' },
      confirmed: { label: 'Dikonfirmasi', color: 'bg-blue-900/50 text-blue-300 border-blue-700' },
      in_progress: { label: 'Sedang Dikerjakan', color: 'bg-purple-900/50 text-purple-300 border-purple-700' },
      completed: { label: 'Selesai', color: 'bg-green-900/50 text-green-300 border-green-700' },
      cancelled: { label: 'Dibatalkan', color: 'bg-red-900/50 text-red-300 border-red-700' },
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    
    return (
      <span className={`px-3 py-1 rounded-full text-sm font-medium border ${config.color}`}>
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
    <div className="min-h-screen bg-neutral-900 text-white py-20">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="section-label">Cek Status</span>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                Cek Status Booking
              </h1>
              <p className="text-neutral-400">
                Masukkan nomor booking untuk melihat status servis Anda
              </p>
            </motion.div>
          </div>

          {/* Search Form */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            onSubmit={handleSearch}
            className="card p-6 bg-neutral-800 rounded-xl mb-8"
          >
            <div className="flex gap-3">
              <div className="flex-1">
                <input
                  type="text"
                  value={bookingNumber}
                  onChange={(e) => setBookingNumber(e.target.value)}
                  placeholder="Contoh: BK-20260524-001"
                  required
                  disabled={isSearching}
                  className="input-field w-full p-3 rounded bg-neutral-700 text-white disabled:opacity-50"
                />
              </div>
              <button
                type="submit"
                disabled={isSearching}
                className="btn-primary px-6 py-3 bg-green-600 hover:bg-green-700 font-semibold rounded transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isSearching ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Mencari...
                  </>
                ) : (
                  <>
                    <Search className="w-5 h-5" />
                    Cek Status
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
              className="mb-6 p-4 rounded-lg bg-red-900/50 border border-red-700 flex items-start gap-3"
            >
              <XCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
              <p className="text-red-100">{error}</p>
            </motion.div>
          )}

          {/* Booking Details */}
          {booking && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="card p-8 bg-neutral-800 rounded-xl space-y-6"
            >
              {/* Status Badge */}
              <div className="flex items-center justify-between pb-6 border-b border-neutral-700">
                <div>
                  <h2 className="text-2xl font-bold mb-2">{booking.booking_number}</h2>
                  <p className="text-neutral-400 text-sm">
                    Dibuat: {formatDate(booking.created_at)}
                  </p>
                </div>
                {getStatusBadge(booking.status)}
              </div>

              {/* Customer Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center gap-2 text-neutral-400 text-sm mb-1">
                      <User className="w-4 h-4" />
                      <span>Nama</span>
                    </div>
                    <p className="text-lg font-medium">{booking.name}</p>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 text-neutral-400 text-sm mb-1">
                      <Phone className="w-4 h-4" />
                      <span>No. WhatsApp</span>
                    </div>
                    <p className="text-lg font-medium">{booking.phone}</p>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 text-neutral-400 text-sm mb-1">
                      <Car className="w-4 h-4" />
                      <span>Kendaraan</span>
                    </div>
                    <p className="text-lg font-medium">{booking.vehicle}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="flex items-center gap-2 text-neutral-400 text-sm mb-1">
                      <MessageSquare className="w-4 h-4" />
                      <span>Layanan</span>
                    </div>
                    <p className="text-lg font-medium">{booking.service}</p>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 text-neutral-400 text-sm mb-1">
                      <Calendar className="w-4 h-4" />
                      <span>Tanggal</span>
                    </div>
                    <p className="text-lg font-medium">{formatDate(booking.booking_date)}</p>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 text-neutral-400 text-sm mb-1">
                      <Clock className="w-4 h-4" />
                      <span>Waktu</span>
                    </div>
                    <p className="text-lg font-medium">{booking.booking_time}</p>
                  </div>
                </div>
              </div>

              {/* Notes */}
              {booking.notes && (
                <div className="pt-6 border-t border-neutral-700">
                  <div className="flex items-center gap-2 text-neutral-400 text-sm mb-2">
                    <MessageSquare className="w-4 h-4" />
                    <span>Catatan</span>
                  </div>
                  <p className="text-neutral-200">{booking.notes}</p>
                </div>
              )}

              {/* Status Info */}
              <div className="pt-6 border-t border-neutral-700 bg-neutral-900/50 -mx-8 -mb-8 px-8 py-6 rounded-b-xl">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-neutral-300">
                      {booking.status === 'pending' && 'Booking Anda sedang menunggu konfirmasi dari kami'}
                      {booking.status === 'confirmed' && 'Booking Anda sudah dikonfirmasi, silakan datang sesuai jadwal'}
                      {booking.status === 'in_progress' && 'Kendaraan Anda sedang dalam proses servis'}
                      {booking.status === 'completed' && 'Servis kendaraan Anda sudah selesai, terima kasih!'}
                      {booking.status === 'cancelled' && 'Booking ini telah dibatalkan'}
                    </p>
                    <p className="text-xs text-neutral-500 mt-1">
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
