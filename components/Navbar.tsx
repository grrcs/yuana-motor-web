"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X, Wrench } from "lucide-react";

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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "glass shadow-lg py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 cursor-pointer"
          >
            <div className="bg-racing-yellow p-2 rounded-lg">
              <Wrench className="w-6 h-6 text-dark-900" />
            </div>
            <span className="text-xl font-bold text-white">
              Yuana <span className="text-racing-yellow">Motor</span>
            </span>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-gray-300 hover:text-racing-yellow transition-colors duration-200 font-medium"
              >
                {link.name}
              </a>
            ))}
            <motion.a
              href="#booking"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-racing-yellow text-dark-900 px-6 py-2.5 rounded-lg font-semibold hover:bg-yellow-500 transition-colors"
            >
              Booking Servis
            </motion.a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-white p-2"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden mt-4 glass rounded-lg p-4"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block py-3 text-gray-300 hover:text-racing-yellow transition-colors"
              >
                {link.name}
              </a>
            ))}
            <a
              href="#booking"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block mt-3 bg-racing-yellow text-dark-900 px-6 py-2.5 rounded-lg font-semibold text-center"
            >
              Booking Servis
            </a>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}
