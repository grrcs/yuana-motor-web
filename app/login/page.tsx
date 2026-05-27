'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { useAuth } from '@/contexts/AuthContext'
import { supabase } from '@/lib/supabase'
import { Mail, Lock, User, Phone, ArrowRight } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const { user, profile, loading: authLoading, signIn, signUp } = useAuth()
  const [isLogin, setIsLogin] = useState(true)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    phone: '',
  })

  // Redirect if already logged in
  useEffect(() => {
    if (!authLoading && user) {
      if (profile?.role === 'admin') {
        router.push('/admin')
      } else {
        router.push('/dashboard')
      }
    }
  }, [user, profile, authLoading, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      if (isLogin) {
        const { error } = await signIn(formData.email, formData.password)
        if (error) {
          console.error('Login error:', error)
          throw new Error(
            error.message === 'Invalid login credentials'
              ? 'Email atau password salah'
              : error.message
          )
        }
        
        // Fetch profile with retry
        const { data: { user: currentUser } } = await supabase.auth.getUser()
        if (currentUser) {
          let profileData = null
          for (let i = 0; i < 5; i++) {
            const { data } = await supabase
              .from('profiles')
              .select('role')
              .eq('id', currentUser.id)
              .single()
            if (data) { profileData = data; break }
            await new Promise(r => setTimeout(r, 300))
          }
          
          if (profileData?.role === 'admin') {
            router.push('/admin')
          } else {
            router.push('/dashboard')
          }
        } else {
          router.push('/dashboard')
        }
      } else {
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
        const { error: loginError } = await signIn(formData.email, formData.password)
        if (loginError) {
          setError('Akun berhasil dibuat! Silakan login.')
        } else {
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
    <div className="min-h-screen bg-neutral-950 flex">
      {/* Left Side - Hero Image & Branding */}
      <div className="hidden lg:flex relative w-[55%] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/bengkel4.jpeg"
            alt="Yuana Motor Bengkel"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/90 via-neutral-950/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-neutral-950/20" />
        
        {/* Floating orbs */}
        <div className="absolute top-1/3 -left-20 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 -left-10 w-72 h-72 bg-accent-500/5 rounded-full blur-3xl" />

        <div className="relative z-10 flex flex-col justify-between h-full p-16">
          {/* Logo */}
          <div>
            <Link href="/" className="inline-block">
              <div className="relative w-56 h-20">
                <Image
                  src="/logo-ym98.png"
                  alt="YM98 Garage Logo"
                  fill
                  className="object-contain brightness-110"
                  priority
                />
              </div>
            </Link>
          </div>

          {/* Brand Message */}
          <div className="max-w-md">
            <h1 className="text-5xl font-bold text-white leading-tight mb-4">
              Bengkel Motor<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 to-accent-500">
                Langganan Warga
              </span>
              <br />Wonogiri
            </h1>
            <p className="text-neutral-300 text-lg leading-relaxed">
              Wis melayani warga Wonogiri sejak 2017. Ora asal-asalan,
              motor sampeyan ditangani montir profesional sing wis
              pengalaman puluhan tahun.
            </p>
            <div className="flex items-center gap-6 mt-6">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-neutral-950 bg-neutral-800 flex items-center justify-center text-xs font-bold text-neutral-400">
                    <Image
                      src="/logo-ym98.png"
                      alt=""
                      width={40}
                      height={40}
                      className="rounded-full opacity-0"
                    />
                  </div>
                ))}
              </div>
              <p className="text-neutral-400 text-sm">
                Dipercaya <span className="text-white font-semibold">500+</span> pelanggan
              </p>
            </div>
          </div>

          {/* Bottom info */}
          <div className="text-neutral-500 text-sm">
            <p>© {new Date().getFullYear()} Yuana Motor Wonogiri</p>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 relative">
        {/* Mobile Logo (hidden on large screens) */}
        <div className="lg:hidden absolute top-6 left-1/2 -translate-x-1/2">
          <Link href="/">
            <div className="relative w-40 h-12">
              <Image
                src="/logo-ym98.png"
                alt="YM98 Garage Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>
        </div>

        {/* Background effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none lg:hidden">
          <div className="absolute top-1/4 -left-20 w-80 h-80 bg-brand-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-brand-500/5 rounded-full blur-3xl" />
        </div>

        <div className="w-full max-w-md relative z-10">
          {/* Header */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-white">
              {isLogin ? 'Selamat Datang' : 'Gabung Yuk!'}
            </h2>
            <p className="text-neutral-400 mt-2">
              {isLogin
                ? 'Silakan masuk ke akun sampeyan'
                : 'Daftar nggo booking servis motor'}
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-neutral-900/60 backdrop-blur-xl rounded-2xl p-8 border border-neutral-800 shadow-2xl">
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
              <div className={`mb-6 p-4 rounded-xl border ${
                error.includes('berhasil') 
                  ? 'bg-green-500/10 border-green-500/30 text-green-400'
                  : 'bg-red-500/10 border-red-500/30 text-red-400'
              }`}>
                <p className="text-sm font-medium">{error}</p>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <>
                  <div>
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

                  <div>
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

              <div>
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

              <div>
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
                className="w-full bg-gradient-to-r from-brand-500 to-accent-500 text-neutral-900 py-4 rounded-xl font-bold text-lg hover:from-accent-500 hover:to-yellow-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-brand-500/20 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 group mt-2"
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
            <div className="mt-6 pt-6 border-t border-neutral-800 text-center">
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
            <p className="text-neutral-500 text-xs">
              Dengan mendaftar, kamu setuju dengan{' '}
              <Link href="#" className="text-brand-500 hover:text-accent-500 transition-colors">
                Syarat & Ketentuan
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
