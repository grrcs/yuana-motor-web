'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { useAuth } from '@/contexts/AuthContext'
import { supabase } from '@/lib/supabase'
import { Mail, Lock, User, Phone, ArrowRight } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const { signIn, signUp } = useAuth()
  const [isLogin, setIsLogin] = useState(true)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    phone: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      if (isLogin) {
        // LOGIN
        const { error } = await signIn(formData.email, formData.password)
        if (error) {
          console.error('Login error:', error)
          throw new Error(
            error.message === 'Invalid login credentials'
              ? 'Email atau password salah'
              : error.message
          )
        }
        
        // Wait for profile to be fetched and check role
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // Fetch profile directly to check role
        const { data: { user } } = await supabase.auth.getUser()
        if (user) {
          const { data: profileData } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', user.id)
            .single()
          
          console.log('🔐 Login redirect - Profile role:', profileData?.role)
          
          if (profileData?.role === 'admin') {
            router.push('/admin')
          } else {
            router.push('/dashboard')
          }
        } else {
          router.push('/dashboard')
        }
      } else {
        // REGISTER
        const { error } = await signUp(
          formData.email,
          formData.password,
          formData.fullName,
          formData.phone
        )
        if (error) {
          console.error('Register error:', error)
          throw new Error(
            error.message === 'User already registered'
              ? 'Email sudah terdaftar'
              : error.message
          )
        }
        // Auto login after register (no email confirmation needed)
        const { error: loginError } = await signIn(formData.email, formData.password)
        if (loginError) {
          setError('Akun berhasil dibuat! Silakan login.')
        } else {
          await new Promise(resolve => setTimeout(resolve, 500))
          router.push('/dashboard')
        }
      }
    } catch (err: any) {
      setError(err.message || 'Terjadi kesalahan')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-brand-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-brand-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-md w-full relative z-10">
        {/* Header with Logo */}
        <div className="text-center mb-8 animate-fade-in">
          <Link href="/" className="inline-block group">
            <div className="flex flex-col items-center justify-center gap-4 mb-3">
              <div className="relative w-48 h-16 group-hover:scale-105 transition-transform duration-300">
                <Image 
                  src="/logo-ym98.png" 
                  alt="YM98 Garage Logo" 
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          </Link>
          <p className="text-neutral-400 text-lg">
            {isLogin ? 'Selamat datang kembali!' : 'Gabung dengan kami'}
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-neutral-900/80 backdrop-blur-xl rounded-2xl p-8 border border-neutral-800 shadow-2xl animate-slide-up">
          {/* Tab Switcher */}
          <div className="flex gap-2 mb-6 bg-neutral-800/50 p-1 rounded-xl">
            <button
              onClick={() => {
                setIsLogin(true)
                setError('')
              }}
              className={`flex-1 py-3 rounded-lg font-semibold transition-all duration-300 ${
                isLogin
                  ? 'bg-gradient-to-r from-brand-500 to-accent-500 text-neutral-900 shadow-lg'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Masuk
            </button>
            <button
              onClick={() => {
                setIsLogin(false)
                setError('')
              }}
              className={`flex-1 py-3 rounded-lg font-semibold transition-all duration-300 ${
                !isLogin
                  ? 'bg-gradient-to-r from-brand-500 to-accent-500 text-neutral-900 shadow-lg'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Daftar
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className={`mb-6 p-4 rounded-xl border animate-shake ${
              error.includes('berhasil') 
                ? 'bg-green-500/10 border-green-500/30 text-green-400'
                : 'bg-red-500/10 border-red-500/30 text-red-400'
            }`}>
              <p className="text-sm font-medium">{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <>
                <div className="animate-fade-in">
                  <label className="block text-sm font-medium text-neutral-300 mb-2">
                    <User className="inline w-4 h-4 mr-2" />
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-4 py-3 bg-neutral-800/50 border border-neutral-700 rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all duration-300"
                    placeholder="Masukkan nama lengkap"
                  />
                </div>

                <div className="animate-fade-in delay-100">
                  <label className="block text-sm font-medium text-neutral-300 mb-2">
                    <Phone className="inline w-4 h-4 mr-2" />
                    No. WhatsApp
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 bg-neutral-800/50 border border-neutral-700 rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all duration-300"
                    placeholder="08xxxxxxxxxx"
                  />
                </div>
              </>
            )}

            <div className="animate-fade-in delay-200">
              <label className="block text-sm font-medium text-neutral-300 mb-2">
                <Mail className="inline w-4 h-4 mr-2" />
                Email
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 bg-neutral-800/50 border border-neutral-700 rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all duration-300"
                placeholder="email@example.com"
              />
            </div>

            <div className="animate-fade-in delay-300">
              <label className="block text-sm font-medium text-neutral-300 mb-2">
                <Lock className="inline w-4 h-4 mr-2" />
                Password
              </label>
              <input
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full px-4 py-3 bg-neutral-800/50 border border-neutral-700 rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all duration-300"
                placeholder="Minimal 6 karakter"
                minLength={6}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-brand-500 to-accent-500 text-neutral-900 py-4 rounded-xl font-bold text-lg hover:from-accent-500 hover:to-yellow-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-brand-500/20 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 group"
            >
              {loading ? (
                <div className="w-6 h-6 border-3 border-neutral-900 border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  {isLogin ? 'Masuk Sekarang' : 'Daftar Sekarang'}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          {/* Footer Links */}
          <div className="mt-8 pt-6 border-t border-neutral-800 text-center space-y-3">
            <Link 
              href="/" 
              className="text-neutral-400 hover:text-brand-500 text-sm transition-colors duration-300 inline-flex items-center gap-2 group"
            >
              <ArrowRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
              Kembali ke beranda
            </Link>
          </div>
        </div>

        {/* Bottom Info */}
        <div className="mt-6 text-center">
          <p className="text-neutral-500 text-sm">
            Dengan mendaftar, kamu setuju dengan{' '}
            <Link href="#" className="text-brand-500 hover:text-accent-500 transition-colors">
              Syarat & Ketentuan
            </Link>
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }

        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }

        .animate-slide-up {
          animation: slide-up 0.6s ease-out forwards;
        }

        .animate-shake {
          animation: shake 0.3s ease-in-out;
        }

        .delay-100 {
          animation-delay: 0.1s;
          opacity: 0;
        }

        .delay-200 {
          animation-delay: 0.2s;
          opacity: 0;
        }

        .delay-300 {
          animation-delay: 0.3s;
          opacity: 0;
        }

        .delay-1000 {
          animation-delay: 1s;
        }
      `}</style>
    </div>
  )
}
