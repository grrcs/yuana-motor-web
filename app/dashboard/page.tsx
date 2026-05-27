'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { useAuth } from '@/contexts/AuthContext'
import { supabase } from '@/lib/supabase'
import type { Booking, Profile } from '@/lib/supabase'
import { Calendar, Clock, CheckCircle, XCircle, AlertCircle, Star, MessageSquare, Wrench, LogOut } from 'lucide-react'
import ReviewForm from '@/components/ReviewForm'

export default function DashboardPage() {
  const router = useRouter()
  const { user, loading: authLoading, signOut } = useAuth()
  const [profile, setProfile] = useState<Profile | null>(null)
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [showReviewForm, setShowReviewForm] = useState<string | null>(null)

  const fetchUserData = async () => {
    if (!user) return

    try {
      // Fetch profile
      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

      setProfile(profileData)

      // Fetch bookings
      const { data: bookingsData } = await supabase
        .from('bookings')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      setBookings(bookingsData || [])
    } catch (error) {
      console.error('Error fetching user data:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login')
    }
  }, [user, authLoading, router])

  useEffect(() => {
    if (user) {
      fetchUserData()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5" />
      case 'cancelled':
        return <XCircle className="w-5 h-5" />
      case 'confirmed':
        return <AlertCircle className="w-5 h-5" />
      default:
        return <Clock className="w-5 h-5" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500/10 border-green-500/30 text-green-400'
      case 'cancelled':
        return 'bg-red-500/10 border-red-500/30 text-red-400'
      case 'confirmed':
        return 'bg-blue-500/10 border-blue-500/30 text-blue-400'
      default:
        return 'bg-accent-500/10 border-accent-500/30 text-brand-500'
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Menunggu Konfirmasi'
      case 'confirmed':
        return 'Dikonfirmasi'
      case 'in_progress':
        return 'Sedang Dikerjakan'
      case 'completed':
        return 'Selesai'
      case 'cancelled':
        return 'Dibatalkan'
      default:
        return status
    }
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  // Loading state
  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-brand-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-brand-500 font-semibold">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950">
      {/* Header */}
      <div className="border-b border-neutral-800 bg-neutral-900/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 group">
              <Image 
                src="/logo-ym98.png" 
                alt="Yuana Motor" 
                width={50} 
                height={50}
                className="transition-transform group-hover:scale-110"
              />
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-brand-500 to-accent-500 bg-clip-text text-transparent">
                  Yuana Motor 98
                </h1>
                <p className="text-xs text-neutral-400">My Bookings</p>
              </div>
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 rounded-lg text-neutral-300 hover:text-white transition-all"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">
            Halo, <span className="bg-gradient-to-r from-brand-500 to-accent-500 bg-clip-text text-transparent">{profile?.full_name}</span>!
          </h2>
          <p className="text-neutral-400">Kelola booking motor kamu di sini</p>
        </div>

        {/* Bookings List */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-gradient-to-br from-brand-500/20 to-accent-500/20 rounded-lg">
              <Wrench className="w-6 h-6 text-brand-500" />
            </div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-brand-500 to-accent-500 bg-clip-text text-transparent">
              Riwayat Booking
            </h2>
          </div>

          {bookings.length === 0 ? (
            <div className="bg-neutral-900/50 backdrop-blur-xl border border-neutral-800 rounded-2xl p-12 text-center">
              <Wrench className="w-16 h-16 text-neutral-600 mx-auto mb-4" />
              <p className="text-neutral-400 text-lg mb-2">Belum ada booking</p>
              <p className="text-neutral-500 text-sm mb-6">Booking sekarang untuk service motor kamu!</p>
              <Link
                href="/#booking"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700 text-white font-semibold rounded-lg transition-all shadow-lg shadow-brand-500/20"
              >
                Booking Sekarang
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {bookings.map((booking) => (
                <div
                  key={booking.id}
                  className="bg-neutral-900/80 backdrop-blur-xl border border-neutral-800 rounded-2xl p-6 hover:border-brand-500/30 transition-all duration-300 group"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    {/* Booking Info */}
                    <div className="flex-1 space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-lg font-bold text-white mb-1">
                            {booking.service}
                          </h3>
                          <p className="text-sm text-neutral-400">
                            Booking #{booking.booking_number}
                          </p>
                        </div>
                        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-sm font-medium ${getStatusColor(booking.status)}`}>
                          {getStatusIcon(booking.status)}
                          <span>{getStatusLabel(booking.status)}</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                        <div className="flex items-center gap-2 text-neutral-400">
                          <Calendar className="w-4 h-4 text-brand-500" />
                          <span>{new Date(booking.booking_date).toLocaleDateString('id-ID', { 
                            weekday: 'long', 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}</span>
                        </div>
                        <div className="flex items-center gap-2 text-neutral-400">
                          <Clock className="w-4 h-4 text-brand-500" />
                          <span>{booking.booking_time}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-neutral-400">
                        <Wrench className="w-4 h-4 text-brand-500" />
                        <span>{booking.vehicle}</span>
                      </div>

                      {booking.notes && (
                        <div className="flex items-start gap-2 text-sm text-neutral-400 bg-neutral-800/50 rounded-lg p-3">
                          <MessageSquare className="w-4 h-4 text-brand-500 mt-0.5 flex-shrink-0" />
                          <span>{booking.notes}</span>
                        </div>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col gap-2 lg:min-w-[180px]">
                      {booking.status === 'completed' && !booking.reviewed && (
                        <>
                          {showReviewForm === booking.booking_number ? (
                            <button
                              onClick={() => setShowReviewForm(null)}
                              className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 rounded-lg text-neutral-300 hover:text-white transition-all text-sm"
                            >
                              Batal
                            </button>
                          ) : (
                            <button
                              onClick={() => setShowReviewForm(booking.booking_number)}
                              className="flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700 text-white font-semibold rounded-lg transition-all shadow-lg shadow-brand-500/20 text-sm"
                            >
                              <Star className="w-4 h-4" />
                              Kasih Review
                            </button>
                          )}
                        </>
                      )}
                      {booking.reviewed && (
                        <div className="flex items-center justify-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/30 text-green-400 rounded-lg text-sm">
                          <CheckCircle className="w-4 h-4" />
                          Sudah Review
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Review Form */}
                  {showReviewForm === booking.booking_number && (
                    <div className="mt-6 pt-6 border-t border-neutral-800">
                      <ReviewForm
                        bookingId={booking.id}
                        bookingNumber={booking.booking_number}
                        onSuccess={() => {
                          setShowReviewForm(null)
                          fetchUserData()
                        }}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(38, 38, 38, 0.5);
          border-radius: 10px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(250, 204, 21, 0.3);
          border-radius: 10px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(250, 204, 21, 0.5);
        }
      `}</style>
    </div>
  )
}
