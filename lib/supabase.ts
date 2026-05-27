import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types
export type BookingStatus = 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled'

export interface Booking {
  id: string
  booking_number: string
  name: string
  phone: string
  vehicle: string
  service: string
  booking_date: string
  booking_time: string
  notes?: string
  status: BookingStatus
  user_id?: string
  reviewed: boolean
  created_at: string
  updated_at: string
}

export interface Profile {
  id: string
  full_name: string
  phone: string
  role: 'user' | 'admin'
  created_at: string
}

export interface Review {
  id: string
  booking_id: string
  user_id: string
  rating: number
  comment: string
  created_at: string
  booking?: Booking
  profile?: Profile
}

export interface TimeSlot {
  id: string
  date: string
  time_slot: string
  max_capacity: number
  current_bookings: number
  created_at: string
}
