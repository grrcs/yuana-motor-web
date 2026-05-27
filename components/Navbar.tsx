"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, User, LogOut } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, profile, signOut } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Beranda", href: "#home" },
    { name: "Layanan", href: "#services" },
    { name: "Keunggulan", href: "#features" },
    { name: "Testimoni", href: "#testimonials" },
    { name: "Kontak", href: "#contact" },
    { name: "Cek Booking", href: "/cek-booking" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-neutral-950/80 backdrop-blur-xl border-b border-neutral-800/50 shadow-lg shadow-black/10 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.a 
            href="#home" 
            className="flex items-center gap-3 group"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <div className="relative w-40 h-12">
              <Image 
                src="/logo-ym98.png" 
                alt="YM98 Garage Logo" 
                fill
                className="object-contain group-hover:brightness-110 transition-all duration-300"
                priority
              />
            </div>
          </motion.a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link, idx) => (
              <motion.a
                key={link.name}
                href={link.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05, duration: 0.3 }}
                className="relative px-4 py-2 text-sm text-neutral-400 hover:text-white transition-colors duration-200 group"
              >
                {link.name}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-brand-500 to-accent-500 group-hover:w-3/4 transition-all duration-300" />
              </motion.a>
            ))}
            
            {user ? (
              <>
                <Link
                  href="/dashboard"
                  className="relative px-4 py-2 text-sm text-neutral-400 hover:text-white transition-colors duration-200 group"
                >
                  Dashboard
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-brand-500 to-accent-500 group-hover:w-3/4 transition-all duration-300" />
                </Link>
                
                {profile?.role === 'admin' && (
                  <Link
                    href="/admin"
                    className="relative px-4 py-2 text-sm text-brand-500 hover:text-brand-400 transition-colors duration-200 font-medium group"
                  >
                    Admin
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-brand-500 to-accent-500 group-hover:w-3/4 transition-all duration-300" />
                  </Link>
                )}
                
                <div className="flex items-center gap-2 ml-2">
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-neutral-900/80 to-neutral-800/80 backdrop-blur-sm border border-neutral-700/50 rounded-full"
                  >
                    <User className="w-4 h-4 text-brand-500" />
                    <span className="text-sm text-white font-medium">
                      {profile?.full_name || 'User'}
                    </span>
                  </motion.div>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={signOut}
                    className="p-2 text-neutral-400 hover:text-red-400 hover:bg-red-500/10 rounded-full transition-all duration-200"
                    title="Keluar"
                  >
                    <LogOut className="w-4 h-4" />
                  </motion.button>
                </div>
              </>
            ) : (
              <Link
                href="/login"
                className="relative px-4 py-2 text-sm text-neutral-400 hover:text-white transition-colors duration-200 group"
              >
                Masuk
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-brand-500 to-accent-500 group-hover:w-3/4 transition-all duration-300" />
              </Link>
            )}
            
            <motion.a
              href="#booking"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="ml-2 btn-primary text-sm py-2.5 px-6 shadow-lg shadow-brand-500/20 hover:shadow-brand-500/40"
            >
              Booking Servis
            </motion.a>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-neutral-400 hover:text-white p-2 transition-colors rounded-lg hover:bg-neutral-800/50"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden mt-4 bg-neutral-900/95 backdrop-blur-xl border border-neutral-800/50 rounded-2xl overflow-hidden shadow-xl"
            >
              <div className="p-4 space-y-1">
                {navLinks.map((link) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    whileHover={{ x: 4 }}
                    className="block py-3 px-4 text-sm text-neutral-400 hover:text-white hover:bg-neutral-800/50 rounded-lg transition-all duration-200"
                  >
                    {link.name}
                  </motion.a>
                ))}
                
                {user ? (
                  <>
                    <Link
                      href="/dashboard"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block py-3 px-4 text-sm text-neutral-400 hover:text-white hover:bg-neutral-800/50 rounded-lg transition-all duration-200"
                    >
                      Dashboard
                    </Link>
                    
                    {profile?.role === 'admin' && (
                      <Link
                        href="/admin"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block py-3 px-4 text-sm text-brand-500 hover:text-brand-400 hover:bg-brand-500/10 rounded-lg transition-all duration-200 font-medium"
                      >
                        Admin
                      </Link>
                    )}
                    
                    <div className="py-3 px-4 text-sm text-white font-medium bg-neutral-800/50 rounded-lg flex items-center gap-2">
                      <User className="w-4 h-4 text-brand-500" />
                      {profile?.full_name || 'User'}
                    </div>
                    
                    <button
                      onClick={() => {
                        signOut()
                        setIsMobileMenuOpen(false)
                      }}
                      className="w-full text-left py-3 px-4 text-sm text-red-400 hover:bg-red-500/10 rounded-lg transition-all duration-200 flex items-center gap-2"
                    >
                      <LogOut className="w-4 h-4" />
                      Keluar
                    </button>
                  </>
                ) : (
                  <Link
                    href="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block py-3 px-4 text-sm text-neutral-400 hover:text-white hover:bg-neutral-800/50 rounded-lg transition-all duration-200"
                  >
                    Masuk
                  </Link>
                )}
                
                <a
                  href="#booking"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block mt-2 btn-primary text-sm text-center py-3"
                >
                  Booking Servis
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
