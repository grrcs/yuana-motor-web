"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-neutral-950/95 backdrop-blur-sm border-b border-neutral-800 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-3">
            <div className="relative w-40 h-12">
              <Image 
                src="/logo-ym98.png" 
                alt="YM98 Garage Logo" 
                fill
                className="object-contain"
                priority
              />
            </div>
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm text-neutral-400 hover:text-neutral-100 transition-colors duration-200"
              >
                {link.name}
              </a>
            ))}
            <a
              href="#booking"
              className="btn-primary text-sm py-2 px-5"
            >
              Booking Servis
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-neutral-400 hover:text-white p-1.5 transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden mt-3 bg-neutral-900 border border-neutral-800 rounded-xl p-4"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block py-2.5 text-sm text-neutral-400 hover:text-neutral-100 transition-colors border-b border-neutral-800 last:border-0"
              >
                {link.name}
              </a>
            ))}
            <a
              href="#booking"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block mt-3 btn-primary text-sm text-center"
            >
              Booking Servis
            </a>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}
