"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { 
  Calendar, Clock, User, Phone, Car, MessageSquare, 
  CheckCircle, XCircle, Loader2, Edit, Trash2, 
  LayoutDashboard, RefreshCw, Search, Filter, ShieldAlert, Star,
  TrendingUp, BarChart3
} from "lucide-react";
import { supabase, type Booking, type Review } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";

type StatusType = 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';

export default function AdminPage() {
  const router = useRouter()
  const { user, isAdmin, loading: authLoading } = useAuth()
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filteredBookings, setFilteredBookings] = useState<Booking[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [activeTab, setActiveTab] = useState<'bookings' | 'reviews' | 'analytics'>('bookings');

  // Stats
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    confirmed: 0,
    in_progress: 0,
    completed: 0,
    cancelled: 0,
  });

  // Auth check first
  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        router.push('/login')
      } else if (!isAdmin) {
        router.push('/dashboard')
      } else {
        fetchBookings();
        fetchReviews();
      }
    }
  }, [user, isAdmin, authLoading, router])

  // Show loading while checking auth or not authorized
  if (authLoading || !user || !isAdmin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-brand-500 animate-spin mx-auto mb-4" />
          <p className="text-neutral-400">
            {authLoading ? 'Cek akses...' : !user ? 'Arahno mlebu...' : 'Ora duwe akses...'}
          </p>
        </div>
      </div>
    )
  }

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

  const fetchReviews = async () => {
    try {
      const { data, error } = await supabase
        .from('reviews')
        .select(`
          *,
          bookings!inner(booking_number, name, service, vehicle)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setReviews(data || []);
    } catch (error: any) {
      console.error('Error fetching reviews:', error);
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

  const deleteReview = async (reviewId: string) => {
    if (!confirm('Yakin ingin menghapus review ini?')) return;

    try {
      const { error } = await supabase
        .from('reviews')
        .delete()
        .eq('id', reviewId);

      if (error) throw error;

      await fetchReviews();
      alert('Review berhasil dihapus!');
    } catch (error: any) {
      console.error('Error deleting review:', error);
      alert(`Gagal hapus review: ${error.message}`);
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

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating ? 'fill-accent-500 text-accent-500' : 'text-neutral-600'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 py-12 px-4 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-brand-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-brand-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Header */}
        <div className="mb-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-between"
          >
            <div className="flex items-center gap-6">
              <div className="relative w-32 h-12">
                <Image 
                  src="/logo-ym98.png" 
                  alt="YM98 Garage Logo" 
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <ShieldAlert className="w-8 h-8 text-brand-500" />
                  <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-brand-500 to-accent-500 bg-clip-text text-transparent">Admin Panel</h1>
                </div>
                <p className="text-neutral-400">Kelola booking servis Yuana Motor</p>
              </div>
            </div>
            <button
              onClick={() => {
                fetchBookings();
                fetchReviews();
              }}
              disabled={isLoading}
              className="px-6 py-3 bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-700 hover:to-brand-600 rounded-xl text-white font-semibold transition-all duration-300 hover:scale-105 flex items-center gap-2 shadow-lg shadow-brand-600/20 disabled:opacity-50 disabled:cursor-not-allowed"
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
          <motion.div 
            whileHover={{ scale: 1.02, y: -2 }}
            transition={{ duration: 0.2 }}
            className="card p-6 bg-gradient-to-br from-neutral-800/80 to-neutral-900/80 backdrop-blur-sm border border-neutral-700/50 rounded-xl shadow-lg hover:shadow-brand-500/10 transition-shadow"
          >
            <p className="text-neutral-400 text-sm mb-1">Total</p>
            <p className="text-3xl font-bold bg-gradient-to-r from-white to-neutral-300 bg-clip-text text-transparent">{stats.total}</p>
          </motion.div>
          <motion.div 
            whileHover={{ scale: 1.02, y: -2 }}
            transition={{ duration: 0.2 }}
            className="card p-6 bg-gradient-to-br from-accent-500/10 to-accent-600/5 border border-accent-500/30 rounded-xl shadow-lg hover:shadow-accent-500/20 transition-shadow"
          >
            <p className="text-accent-400 text-sm mb-1">Menunggu</p>
            <p className="text-3xl font-bold text-accent-300">{stats.pending}</p>
          </motion.div>
          <motion.div 
            whileHover={{ scale: 1.02, y: -2 }}
            transition={{ duration: 0.2 }}
            className="card p-6 bg-gradient-to-br from-blue-500/10 to-blue-600/5 border border-blue-500/30 rounded-xl shadow-lg hover:shadow-blue-500/20 transition-shadow"
          >
            <p className="text-blue-400 text-sm mb-1">Dikonfirmasi</p>
            <p className="text-3xl font-bold text-blue-300">{stats.confirmed}</p>
          </motion.div>
          <motion.div 
            whileHover={{ scale: 1.02, y: -2 }}
            transition={{ duration: 0.2 }}
            className="card p-6 bg-gradient-to-br from-purple-500/10 to-purple-600/5 border border-purple-500/30 rounded-xl shadow-lg hover:shadow-purple-500/20 transition-shadow"
          >
            <p className="text-purple-400 text-sm mb-1">Dikerjakan</p>
            <p className="text-3xl font-bold text-purple-300">{stats.in_progress}</p>
          </motion.div>
          <motion.div 
            whileHover={{ scale: 1.02, y: -2 }}
            transition={{ duration: 0.2 }}
            className="card p-6 bg-gradient-to-br from-green-500/10 to-green-600/5 border border-green-500/30 rounded-xl shadow-lg hover:shadow-green-500/20 transition-shadow"
          >
            <p className="text-green-400 text-sm mb-1">Selesai</p>
            <p className="text-3xl font-bold text-green-300">{stats.completed}</p>
          </motion.div>
          <motion.div 
            whileHover={{ scale: 1.02, y: -2 }}
            transition={{ duration: 0.2 }}
            className="card p-6 bg-gradient-to-br from-red-500/10 to-red-600/5 border border-red-500/30 rounded-xl shadow-lg hover:shadow-red-500/20 transition-shadow"
          >
            <p className="text-red-400 text-sm mb-1">Dibatalkan</p>
            <p className="text-3xl font-bold text-red-300">{stats.cancelled}</p>
          </motion.div>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex gap-2 border-b border-neutral-700/50">
            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveTab('bookings')}
              className={`px-6 py-3 font-medium transition-all relative ${
                activeTab === 'bookings'
                  ? 'text-brand-500'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Bookings ({stats.total})
              {activeTab === 'bookings' && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-brand-500 to-accent-500"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </motion.button>
            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveTab('reviews')}
              className={`px-6 py-3 font-medium transition-all relative ${
                activeTab === 'reviews'
                  ? 'text-brand-500'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Reviews ({reviews.length})
              {activeTab === 'reviews' && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-brand-500 to-accent-500"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </motion.button>
            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveTab('analytics')}
              className={`px-6 py-3 font-medium transition-all relative ${
                activeTab === 'analytics'
                  ? 'text-brand-500'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Analytics
              {activeTab === 'analytics' && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-brand-500 to-accent-500"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </motion.button>
          </div>
        </motion.div>

        {activeTab === 'bookings' && (
          <>
            {/* Filters */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="card p-6 bg-gradient-to-br from-neutral-800/80 to-neutral-900/80 backdrop-blur-sm border border-neutral-700/50 rounded-xl mb-8 shadow-lg"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <motion.div 
                  whileFocus={{ scale: 1.01 }}
                  className="relative"
                >
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Cari booking number, nama, HP, kendaraan..."
                    className="w-full pl-10 pr-4 py-3 bg-neutral-700/50 border border-neutral-600/50 rounded-lg text-white placeholder-neutral-400 focus:outline-none focus:border-brand-500/50 focus:ring-2 focus:ring-brand-500/20 transition-all"
                  />
                </motion.div>
                <motion.div 
                  whileFocus={{ scale: 1.01 }}
                  className="relative"
                >
                  <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-neutral-700/50 border border-neutral-600/50 rounded-lg text-white appearance-none focus:outline-none focus:border-brand-500/50 focus:ring-2 focus:ring-brand-500/20 transition-all cursor-pointer"
                  >
                    <option value="all">Semua Status</option>
                    <option value="pending">Menunggu</option>
                    <option value="confirmed">Dikonfirmasi</option>
                    <option value="in_progress">Dikerjakan</option>
                    <option value="completed">Selesai</option>
                    <option value="cancelled">Dibatalkan</option>
                  </select>
                </motion.div>
              </div>
            </motion.div>

            {/* Bookings Table */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
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
                <tbody className="divide-y divide-neutral-700/50">
                  {filteredBookings.map((booking, index) => (
                    <motion.tr 
                      key={booking.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      whileHover={{ backgroundColor: 'rgba(64, 64, 64, 0.3)' }}
                      className="transition-colors"
                    >
                      <td className="px-4 py-4 text-sm font-mono text-brand-400">{booking.booking_number}</td>
                      <td className="px-4 py-4 text-sm text-neutral-200">{booking.name}</td>
                      <td className="px-4 py-4 text-sm text-neutral-300">{booking.phone}</td>
                      <td className="px-4 py-4 text-sm text-neutral-300">{booking.vehicle}</td>
                      <td className="px-4 py-4 text-sm text-neutral-300">{booking.service}</td>
                      <td className="px-4 py-4 text-sm text-neutral-300">{formatDate(booking.booking_date)}</td>
                      <td className="px-4 py-4 text-sm text-neutral-300">{booking.booking_time}</td>
                      <td className="px-4 py-4 text-sm">{getStatusBadge(booking.status)}</td>
                      <td className="px-4 py-4 text-sm">
                        <div className="flex items-center gap-2">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setSelectedBooking(booking)}
                            className="p-2 hover:bg-brand-500/20 rounded-lg transition-colors"
                            title="Edit"
                          >
                            <Edit className="w-4 h-4 text-brand-400" />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => deleteBooking(booking.id)}
                            className="p-2 hover:bg-red-500/20 rounded-lg transition-colors"
                            title="Hapus"
                          >
                            <Trash2 className="w-4 h-4 text-red-400" />
                          </motion.button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
            </motion.div>
          </>
        )}

        {activeTab === 'reviews' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="space-y-4"
          >
            {isLoading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="w-8 h-8 animate-spin text-brand-500" />
              </div>
            ) : reviews.length === 0 ? (
              <div className="card bg-neutral-800 rounded-xl p-12 text-center">
                <Star className="w-12 h-12 text-neutral-600 mx-auto mb-4" />
                <p className="text-neutral-400">Belum ada review</p>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="grid gap-4"
              >
                {reviews.map((review: any, index: number) => (
                  <motion.div 
                    key={review.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    whileHover={{ scale: 1.01, y: -2 }}
                    className="card bg-gradient-to-br from-neutral-800/80 to-neutral-900/80 backdrop-blur-sm border border-neutral-700/50 rounded-xl p-6 shadow-lg hover:shadow-brand-500/10 transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          {renderStars(review.rating)}
                          <span className="text-sm text-neutral-400">
                            {new Date(review.created_at).toLocaleDateString('id-ID')}
                          </span>
                        </div>
                        <p className="text-neutral-300 mb-3">{review.comment}</p>
                        <div className="flex flex-wrap gap-2 text-sm text-neutral-400">
                          <span className="px-3 py-1 bg-neutral-700/50 rounded-full">📋 {review.booking_number}</span>
                          <span className="px-3 py-1 bg-neutral-700/50 rounded-full">👤 {review.name}</span>
                          <span className="px-3 py-1 bg-neutral-700/50 rounded-full">🔧 {review.service}</span>
                          <span className="px-3 py-1 bg-neutral-700/50 rounded-full">🏍️ {review.vehicle}</span>
                        </div>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => deleteReview(review.id)}
                        className="p-2 hover:bg-red-500/20 rounded-lg transition-colors ml-4"
                        title="Hapus review"
                      >
                        <Trash2 className="w-5 h-5 text-red-400" />
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </motion.div>
        )}

        {activeTab === 'analytics' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="space-y-6"
          >
            {/* Revenue & Bookings Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="card bg-gradient-to-br from-brand-900/30 to-brand-800/20 border border-brand-700/30 rounded-xl p-6">
                <div className="flex items-center justify-between mb-2">
                  <TrendingUp className="w-8 h-8 text-brand-400" />
                  <span className="text-xs text-brand-300 bg-brand-900/50 px-2 py-1 rounded">Total</span>
                </div>
                <p className="text-3xl font-bold text-white mb-1">{stats.total}</p>
                <p className="text-sm text-neutral-400">Total Bookings</p>
              </div>

              <div className="card bg-gradient-to-br from-green-900/30 to-green-800/20 border border-green-700/30 rounded-xl p-6">
                <div className="flex items-center justify-between mb-2">
                  <CheckCircle className="w-8 h-8 text-green-400" />
                  <span className="text-xs text-green-300 bg-green-900/50 px-2 py-1 rounded">Selesai</span>
                </div>
                <p className="text-3xl font-bold text-white mb-1">{stats.completed}</p>
                <p className="text-sm text-neutral-400">Completed</p>
              </div>

              <div className="card bg-gradient-to-br from-yellow-900/30 to-yellow-800/20 border border-yellow-700/30 rounded-xl p-6">
                <div className="flex items-center justify-between mb-2">
                  <Clock className="w-8 h-8 text-yellow-400" />
                  <span className="text-xs text-yellow-300 bg-yellow-900/50 px-2 py-1 rounded">Aktif</span>
                </div>
                <p className="text-3xl font-bold text-white mb-1">
                  {stats.pending + stats.confirmed + stats.in_progress}
                </p>
                <p className="text-sm text-neutral-400">Active Bookings</p>
              </div>

              <div className="card bg-gradient-to-br from-purple-900/30 to-purple-800/20 border border-purple-700/30 rounded-xl p-6">
                <div className="flex items-center justify-between mb-2">
                  <Star className="w-8 h-8 text-purple-400" />
                  <span className="text-xs text-purple-300 bg-purple-900/50 px-2 py-1 rounded">Reviews</span>
                </div>
                <p className="text-3xl font-bold text-white mb-1">{reviews.length}</p>
                <p className="text-sm text-neutral-400">Total Reviews</p>
              </div>
            </div>

            {/* Service Breakdown */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="card bg-gradient-to-br from-neutral-800/80 to-neutral-900/80 backdrop-blur-sm border border-neutral-700/50 rounded-xl p-6 shadow-lg"
            >
              <div className="flex items-center gap-3 mb-6">
                <motion.div
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                >
                  <BarChart3 className="w-6 h-6 text-brand-500" />
                </motion.div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-brand-400 to-accent-400 bg-clip-text text-transparent">
                  Service Breakdown
                </h3>
              </div>
              <div className="space-y-4">
                {(() => {
                  const serviceCount: Record<string, number> = {};
                  bookings.forEach(booking => {
                    serviceCount[booking.service] = (serviceCount[booking.service] || 0) + 1;
                  });
                  
                  return Object.entries(serviceCount)
                    .sort((a, b) => b[1] - a[1])
                    .map(([service, count], index) => {
                      const percentage = stats.total > 0 ? (count / stats.total) * 100 : 0;
                      return (
                        <motion.div 
                          key={service}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-neutral-300 font-medium">{service}</span>
                            <span className="text-neutral-400 text-sm">{count} bookings ({percentage.toFixed(1)}%)</span>
                          </div>
                          <div className="w-full bg-neutral-700/50 rounded-full h-2.5 overflow-hidden">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: `${percentage}%` }}
                              transition={{ duration: 1, delay: index * 0.1, ease: "easeOut" }}
                              className="bg-gradient-to-r from-brand-500 to-accent-500 h-2.5 rounded-full shadow-lg shadow-brand-500/30"
                            />
                          </div>
                        </motion.div>
                      );
                    });
                })()}
              </div>
            </motion.div>

            {/* Vehicle Type Breakdown */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="card bg-gradient-to-br from-neutral-800/80 to-neutral-900/80 backdrop-blur-sm border border-neutral-700/50 rounded-xl p-6 shadow-lg"
            >
              <div className="flex items-center gap-3 mb-6">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                >
                  <Car className="w-6 h-6 text-brand-500" />
                </motion.div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-brand-400 to-accent-400 bg-clip-text text-transparent">
                  Vehicle Type Breakdown
                </h3>
              </div>
              <div className="space-y-4">
                {(() => {
                  const vehicleCount: Record<string, number> = {};
                  bookings.forEach(booking => {
                    vehicleCount[booking.vehicle] = (vehicleCount[booking.vehicle] || 0) + 1;
                  });
                  
                  return Object.entries(vehicleCount)
                    .sort((a, b) => b[1] - a[1])
                    .map(([vehicle, count], index) => {
                      const percentage = stats.total > 0 ? (count / stats.total) * 100 : 0;
                      return (
                        <motion.div 
                          key={vehicle}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-neutral-300 font-medium">{vehicle}</span>
                            <span className="text-neutral-400 text-sm">{count} bookings ({percentage.toFixed(1)}%)</span>
                          </div>
                          <div className="w-full bg-neutral-700/50 rounded-full h-2.5 overflow-hidden">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: `${percentage}%` }}
                              transition={{ duration: 1, delay: index * 0.1, ease: "easeOut" }}
                              className="bg-gradient-to-r from-accent-500 to-brand-500 h-2.5 rounded-full shadow-lg shadow-accent-500/30"
                            />
                          </div>
                        </motion.div>
                      );
                    });
                })()}
              </div>
            </motion.div>

            {/* Review Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="card bg-gradient-to-br from-neutral-800/80 to-neutral-900/80 backdrop-blur-sm border border-neutral-700/50 rounded-xl p-6 shadow-lg"
            >
              <div className="flex items-center gap-3 mb-6">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                >
                  <Star className="w-6 h-6 text-brand-500" />
                </motion.div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-brand-400 to-accent-400 bg-clip-text text-transparent">
                  Review Statistics
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                >
                  <p className="text-sm text-neutral-400 mb-3">Average Rating</p>
                  <div className="flex items-center gap-3">
                    <motion.p 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.8, type: "spring" }}
                      className="text-4xl font-bold text-accent-500"
                    >
                      {reviews.length > 0 
                        ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
                        : '0.0'
                      }
                    </motion.p>
                    <div className="flex flex-col">
                      {renderStars(reviews.length > 0 
                        ? Math.round(reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length)
                        : 0
                      )}
                      <span className="text-xs text-neutral-500 mt-1">dari {reviews.length} reviews</span>
                    </div>
                  </div>
                </motion.div>
                <div>
                  <p className="text-sm text-neutral-400 mb-3">Rating Distribution</p>
                  <div className="space-y-2">
                    {[5, 4, 3, 2, 1].map((star, index) => {
                      const count = reviews.filter(r => r.rating === star).length;
                      const percentage = reviews.length > 0 ? (count / reviews.length) * 100 : 0;
                      return (
                        <motion.div 
                          key={star} 
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: 0.7 + index * 0.1 }}
                          className="flex items-center gap-2"
                        >
                          <span className="text-sm text-neutral-400 w-8">{star}★</span>
                          <div className="flex-1 bg-neutral-700/50 rounded-full h-2 overflow-hidden">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: `${percentage}%` }}
                              transition={{ duration: 1, delay: 0.7 + index * 0.1, ease: "easeOut" }}
                              className="bg-gradient-to-r from-accent-500 to-yellow-400 h-2 rounded-full shadow-lg shadow-accent-500/30"
                            />
                          </div>
                          <span className="text-sm text-neutral-400 w-12 text-right">{count}</span>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Status Flow */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="card bg-gradient-to-br from-neutral-800/80 to-neutral-900/80 backdrop-blur-sm border border-neutral-700/50 rounded-xl p-6 shadow-lg"
            >
              <div className="flex items-center gap-3 mb-6">
                <motion.div
                  animate={{ rotate: [0, 90, 180, 270, 360] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  <LayoutDashboard className="w-6 h-6 text-brand-500" />
                </motion.div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-brand-400 to-accent-400 bg-clip-text text-transparent">
                  Booking Status Flow
                </h3>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.8 }}
                  whileHover={{ scale: 1.05 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-gradient-to-br from-yellow-900/40 to-yellow-800/40 border-2 border-yellow-600/50 flex items-center justify-center shadow-lg shadow-yellow-500/20">
                    <p className="text-2xl font-bold text-yellow-300">{stats.pending}</p>
                  </div>
                  <p className="text-sm text-neutral-400 font-medium">Menunggu</p>
                </motion.div>
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.9 }}
                  whileHover={{ scale: 1.05 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-gradient-to-br from-blue-900/40 to-blue-800/40 border-2 border-blue-600/50 flex items-center justify-center shadow-lg shadow-blue-500/20">
                    <p className="text-2xl font-bold text-blue-300">{stats.confirmed}</p>
                  </div>
                  <p className="text-sm text-neutral-400 font-medium">Dikonfirmasi</p>
                </motion.div>
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 1.0 }}
                  whileHover={{ scale: 1.05 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-gradient-to-br from-purple-900/40 to-purple-800/40 border-2 border-purple-600/50 flex items-center justify-center shadow-lg shadow-purple-500/20">
                    <p className="text-2xl font-bold text-purple-300">{stats.in_progress}</p>
                  </div>
                  <p className="text-sm text-neutral-400 font-medium">Dikerjakan</p>
                </motion.div>
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 1.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-gradient-to-br from-green-900/40 to-green-800/40 border-2 border-green-600/50 flex items-center justify-center shadow-lg shadow-green-500/20">
                    <p className="text-2xl font-bold text-green-300">{stats.completed}</p>
                  </div>
                  <p className="text-sm text-neutral-400 font-medium">Selesai</p>
                </motion.div>
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 1.2 }}
                  whileHover={{ scale: 1.05 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-gradient-to-br from-red-900/40 to-red-800/40 border-2 border-red-600/50 flex items-center justify-center shadow-lg shadow-red-500/20">
                    <p className="text-2xl font-bold text-red-300">{stats.cancelled}</p>
                  </div>
                  <p className="text-sm text-neutral-400 font-medium">Dibatalkan</p>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}

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
