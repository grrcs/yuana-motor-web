"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Calendar, Clock, User, Phone, Car, MessageSquare, 
  CheckCircle, XCircle, Loader2, Edit, Trash2, 
  LayoutDashboard, RefreshCw, Search, Filter
} from "lucide-react";
import { supabase, type Booking } from "@/lib/supabase";

type StatusType = 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';

export default function AdminPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filteredBookings, setFilteredBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // Stats
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    confirmed: 0,
    in_progress: 0,
    completed: 0,
    cancelled: 0,
  });

  useEffect(() => {
    fetchBookings();
  }, []);

  useEffect(() => {
    // Filter bookings based on search and status
    let filtered = bookings;

    if (searchQuery) {
      filtered = filtered.filter(booking => 
        booking.booking_number.toLowerCase().includes(searchQuery.toLowerCase()) ||
        booking.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        booking.phone.includes(searchQuery) ||
        booking.vehicle.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter(booking => booking.status === statusFilter);
    }

    setFilteredBookings(filtered);
  }, [searchQuery, statusFilter, bookings]);

  const fetchBookings = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setBookings(data || []);
      setFilteredBookings(data || []);
      
      // Calculate stats
      const newStats = {
        total: data?.length || 0,
        pending: data?.filter(b => b.status === 'pending').length || 0,
        confirmed: data?.filter(b => b.status === 'confirmed').length || 0,
        in_progress: data?.filter(b => b.status === 'in_progress').length || 0,
        completed: data?.filter(b => b.status === 'completed').length || 0,
        cancelled: data?.filter(b => b.status === 'cancelled').length || 0,
      };
      setStats(newStats);
    } catch (error: any) {
      console.error('Error fetching bookings:', error);
      alert(`Gagal memuat data: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const updateBookingStatus = async (bookingId: string, newStatus: StatusType) => {
    setIsUpdating(true);
    try {
      const { error } = await supabase
        .from('bookings')
        .update({ status: newStatus })
        .eq('id', bookingId);

      if (error) throw error;

      await fetchBookings();
      setSelectedBooking(null);
      alert('Status berhasil diupdate!');
    } catch (error: any) {
      console.error('Error updating status:', error);
      alert(`Gagal update status: ${error.message}`);
    } finally {
      setIsUpdating(false);
    }
  };

  const deleteBooking = async (bookingId: string) => {
    if (!confirm('Yakin ingin menghapus booking ini?')) return;

    try {
      const { error } = await supabase
        .from('bookings')
        .delete()
        .eq('id', bookingId);

      if (error) throw error;

      await fetchBookings();
      setSelectedBooking(null);
      alert('Booking berhasil dihapus!');
    } catch (error: any) {
      console.error('Error deleting booking:', error);
      alert(`Gagal hapus booking: ${error.message}`);
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { label: 'Menunggu', color: 'bg-yellow-900/50 text-yellow-300 border-yellow-700' },
      confirmed: { label: 'Dikonfirmasi', color: 'bg-blue-900/50 text-blue-300 border-blue-700' },
      in_progress: { label: 'Dikerjakan', color: 'bg-purple-900/50 text-purple-300 border-purple-700' },
      completed: { label: 'Selesai', color: 'bg-green-900/50 text-green-300 border-green-700' },
      cancelled: { label: 'Dibatalkan', color: 'bg-red-900/50 text-red-300 border-red-700' },
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${config.color}`}>
        {config.label}
      </span>
    );
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', { 
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-neutral-900 text-white py-20">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-between"
          >
            <div>
              <div className="flex items-center gap-3 mb-2">
                <LayoutDashboard className="w-8 h-8 text-green-500" />
                <h1 className="text-3xl md:text-4xl font-bold">Admin Panel</h1>
              </div>
              <p className="text-neutral-400">Kelola booking servis Yuana Motor</p>
            </div>
            <button
              onClick={fetchBookings}
              disabled={isLoading}
              className="btn-primary px-4 py-2 bg-green-600 hover:bg-green-700 rounded flex items-center gap-2 disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
          </motion.div>
        </div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8"
        >
          <div className="card p-4 bg-neutral-800 rounded-xl">
            <p className="text-neutral-400 text-sm mb-1">Total</p>
            <p className="text-2xl font-bold">{stats.total}</p>
          </div>
          <div className="card p-4 bg-yellow-900/20 border border-yellow-700/30 rounded-xl">
            <p className="text-yellow-300 text-sm mb-1">Menunggu</p>
            <p className="text-2xl font-bold text-yellow-300">{stats.pending}</p>
          </div>
          <div className="card p-4 bg-blue-900/20 border border-blue-700/30 rounded-xl">
            <p className="text-blue-300 text-sm mb-1">Dikonfirmasi</p>
            <p className="text-2xl font-bold text-blue-300">{stats.confirmed}</p>
          </div>
          <div className="card p-4 bg-purple-900/20 border border-purple-700/30 rounded-xl">
            <p className="text-purple-300 text-sm mb-1">Dikerjakan</p>
            <p className="text-2xl font-bold text-purple-300">{stats.in_progress}</p>
          </div>
          <div className="card p-4 bg-green-900/20 border border-green-700/30 rounded-xl">
            <p className="text-green-300 text-sm mb-1">Selesai</p>
            <p className="text-2xl font-bold text-green-300">{stats.completed}</p>
          </div>
          <div className="card p-4 bg-red-900/20 border border-red-700/30 rounded-xl">
            <p className="text-red-300 text-sm mb-1">Dibatalkan</p>
            <p className="text-2xl font-bold text-red-300">{stats.cancelled}</p>
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="card p-4 bg-neutral-800 rounded-xl mb-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari booking number, nama, HP, kendaraan..."
                className="w-full pl-10 pr-4 py-2 bg-neutral-700 rounded text-white placeholder-neutral-400"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-neutral-700 rounded text-white appearance-none"
              >
                <option value="all">Semua Status</option>
                <option value="pending">Menunggu</option>
                <option value="confirmed">Dikonfirmasi</option>
                <option value="in_progress">Dikerjakan</option>
                <option value="completed">Selesai</option>
                <option value="cancelled">Dibatalkan</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Bookings Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="card bg-neutral-800 rounded-xl overflow-hidden"
        >
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-green-500" />
            </div>
          ) : filteredBookings.length === 0 ? (
            <div className="text-center py-20 text-neutral-400">
              <p>Tidak ada booking ditemukan</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-neutral-900 border-b border-neutral-700">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium text-neutral-400">No. Booking</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-neutral-400">Nama</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-neutral-400">HP</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-neutral-400">Kendaraan</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-neutral-400">Layanan</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-neutral-400">Tanggal</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-neutral-400">Waktu</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-neutral-400">Status</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-neutral-400">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-700">
                  {filteredBookings.map((booking) => (
                    <tr key={booking.id} className="hover:bg-neutral-700/50 transition">
                      <td className="px-4 py-3 text-sm font-mono">{booking.booking_number}</td>
                      <td className="px-4 py-3 text-sm">{booking.name}</td>
                      <td className="px-4 py-3 text-sm">{booking.phone}</td>
                      <td className="px-4 py-3 text-sm">{booking.vehicle}</td>
                      <td className="px-4 py-3 text-sm">{booking.service}</td>
                      <td className="px-4 py-3 text-sm">{formatDate(booking.booking_date)}</td>
                      <td className="px-4 py-3 text-sm">{booking.booking_time}</td>
                      <td className="px-4 py-3 text-sm">{getStatusBadge(booking.status)}</td>
                      <td className="px-4 py-3 text-sm">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setSelectedBooking(booking)}
                            className="p-1.5 hover:bg-neutral-600 rounded transition"
                            title="Edit"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => deleteBooking(booking.id)}
                            className="p-1.5 hover:bg-red-900/50 rounded transition"
                            title="Hapus"
                          >
                            <Trash2 className="w-4 h-4 text-red-400" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>

        {/* Edit Modal */}
        {selectedBooking && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-neutral-800 rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Edit Booking</h2>
                <button
                  onClick={() => setSelectedBooking(null)}
                  className="p-2 hover:bg-neutral-700 rounded transition"
                >
                  <XCircle className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4 mb-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-neutral-400 mb-1">No. Booking</p>
                    <p className="font-mono font-bold">{selectedBooking.booking_number}</p>
                  </div>
                  <div>
                    <p className="text-sm text-neutral-400 mb-1">Dibuat</p>
                    <p>{formatDate(selectedBooking.created_at)}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-neutral-400 mb-1">Nama</p>
                    <p>{selectedBooking.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-neutral-400 mb-1">HP</p>
                    <p>{selectedBooking.phone}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-neutral-400 mb-1">Kendaraan</p>
                    <p>{selectedBooking.vehicle}</p>
                  </div>
                  <div>
                    <p className="text-sm text-neutral-400 mb-1">Layanan</p>
                    <p>{selectedBooking.service}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-neutral-400 mb-1">Tanggal</p>
                    <p>{formatDate(selectedBooking.booking_date)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-neutral-400 mb-1">Waktu</p>
                    <p>{selectedBooking.booking_time}</p>
                  </div>
                </div>

                {selectedBooking.notes && (
                  <div>
                    <p className="text-sm text-neutral-400 mb-1">Catatan</p>
                    <p className="text-neutral-200">{selectedBooking.notes}</p>
                  </div>
                )}
              </div>

              <div className="border-t border-neutral-700 pt-6">
                <p className="text-sm text-neutral-400 mb-3">Update Status</p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  <button
                    onClick={() => updateBookingStatus(selectedBooking.id, 'pending')}
                    disabled={isUpdating || selectedBooking.status === 'pending'}
                    className="p-3 bg-yellow-900/30 hover:bg-yellow-900/50 border border-yellow-700 rounded text-yellow-300 disabled:opacity-50 disabled:cursor-not-allowed transition"
                  >
                    Menunggu
                  </button>
                  <button
                    onClick={() => updateBookingStatus(selectedBooking.id, 'confirmed')}
                    disabled={isUpdating || selectedBooking.status === 'confirmed'}
                    className="p-3 bg-blue-900/30 hover:bg-blue-900/50 border border-blue-700 rounded text-blue-300 disabled:opacity-50 disabled:cursor-not-allowed transition"
                  >
                    Dikonfirmasi
                  </button>
                  <button
                    onClick={() => updateBookingStatus(selectedBooking.id, 'in_progress')}
                    disabled={isUpdating || selectedBooking.status === 'in_progress'}
                    className="p-3 bg-purple-900/30 hover:bg-purple-900/50 border border-purple-700 rounded text-purple-300 disabled:opacity-50 disabled:cursor-not-allowed transition"
                  >
                    Dikerjakan
                  </button>
                  <button
                    onClick={() => updateBookingStatus(selectedBooking.id, 'completed')}
                    disabled={isUpdating || selectedBooking.status === 'completed'}
                    className="p-3 bg-green-900/30 hover:bg-green-900/50 border border-green-700 rounded text-green-300 disabled:opacity-50 disabled:cursor-not-allowed transition"
                  >
                    Selesai
                  </button>
                  <button
                    onClick={() => updateBookingStatus(selectedBooking.id, 'cancelled')}
                    disabled={isUpdating || selectedBooking.status === 'cancelled'}
                    className="p-3 bg-red-900/30 hover:bg-red-900/50 border border-red-700 rounded text-red-300 disabled:opacity-50 disabled:cursor-not-allowed transition"
                  >
                    Dibatalkan
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
