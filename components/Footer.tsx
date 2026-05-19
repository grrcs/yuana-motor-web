"use client";

import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Youtube } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark-900 border-t border-gray-800">
      <div className="container mx-auto px-4 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold mb-4 text-racing-yellow">
              Yuana Motor
            </h3>
            <p className="text-gray-400 mb-4 leading-relaxed">
              Bengkel motor dan mobil terpercaya dengan layanan profesional dan harga terjangkau.
            </p>
            <div className="flex gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-dark-800 rounded-lg flex items-center justify-center hover:bg-racing-yellow hover:text-dark-900 transition-all"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-dark-800 rounded-lg flex items-center justify-center hover:bg-racing-yellow hover:text-dark-900 transition-all"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-dark-800 rounded-lg flex items-center justify-center hover:bg-racing-yellow hover:text-dark-900 transition-all"
              >
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-4">Link Cepat</h4>
            <ul className="space-y-2">
              <li>
                <a href="#home" className="text-gray-400 hover:text-racing-yellow transition-colors">
                  Beranda
                </a>
              </li>
              <li>
                <a href="#features" className="text-gray-400 hover:text-racing-yellow transition-colors">
                  Keunggulan
                </a>
              </li>
              <li>
                <a href="#services" className="text-gray-400 hover:text-racing-yellow transition-colors">
                  Layanan
                </a>
              </li>
              <li>
                <a href="#testimonials" className="text-gray-400 hover:text-racing-yellow transition-colors">
                  Testimoni
                </a>
              </li>
              <li>
                <a href="#booking" className="text-gray-400 hover:text-racing-yellow transition-colors">
                  Booking
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold mb-4">Kontak</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-gray-400">
                <MapPin size={20} className="text-racing-yellow flex-shrink-0 mt-1" />
                <span>Jl. Raya Utama No. 123, Jakarta Selatan, DKI Jakarta 12345</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <Phone size={20} className="text-racing-yellow flex-shrink-0" />
                <a href="tel:+6281234567890" className="hover:text-racing-yellow transition-colors">
                  +62 812-3456-7890
                </a>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <Mail size={20} className="text-racing-yellow flex-shrink-0" />
                <a href="mailto:info@yuanamotor.com" className="hover:text-racing-yellow transition-colors">
                  info@yuanamotor.com
                </a>
              </li>
            </ul>
          </div>

          {/* Operating Hours */}
          <div>
            <h4 className="text-lg font-bold mb-4">Jam Operasional</h4>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-center gap-3">
                <Clock size={20} className="text-racing-yellow flex-shrink-0" />
                <div>
                  <p className="font-semibold text-white">Senin - Sabtu</p>
                  <p>08:00 - 17:00 WIB</p>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Clock size={20} className="text-racing-yellow flex-shrink-0" />
                <div>
                  <p className="font-semibold text-white">Minggu</p>
                  <p>Tutup</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Google Maps */}
        <div className="mb-8 rounded-xl overflow-hidden">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.521260322283!2d106.8195613!3d-6.194830999999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f5d2e764b12d%3A0x3d2ad6e1e0e9bcc8!2sMonas!5e0!3m2!1sen!2sid!4v1234567890"
            width="100%"
            height="300"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="grayscale hover:grayscale-0 transition-all duration-300"
          />
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
          <p>
            &copy; {currentYear} <span className="text-racing-yellow font-semibold">Yuana Motor</span>. 
            All rights reserved. Built with Next.js & Tailwind CSS.
          </p>
        </div>
      </div>
    </footer>
  );
}
