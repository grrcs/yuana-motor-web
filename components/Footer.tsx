"use client";

import { MapPin, Phone, Mail, Clock } from "lucide-react";
import Image from "next/image";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-neutral-950 border-t border-neutral-800">
      <div className="container mx-auto px-4 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <div className="relative w-36 h-12 mb-4">
              <Image
                src="/logo-ym98.png"
                alt="Yuana Motor"
                fill
                className="object-contain"
              />
            </div>
            <p className="text-neutral-400 mb-4 leading-relaxed text-sm">
              Bengkel motor terpercaya dengan layanan profesional dan harga terjangkau. Wis melayani warga Wonogiri sejak 2017!
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-4">Link Cepat</h4>
            <ul className="space-y-2">
              <li>
                <a href="#home" className="text-neutral-400 hover:text-brand-500 transition-colors text-sm">
                  Beranda
                </a>
              </li>
              <li>
                <a href="#features" className="text-neutral-400 hover:text-brand-500 transition-colors text-sm">
                  Keunggulan
                </a>
              </li>
              <li>
                <a href="#services" className="text-neutral-400 hover:text-brand-500 transition-colors text-sm">
                  Layanan
                </a>
              </li>
              <li>
                <a href="#testimonials" className="text-neutral-400 hover:text-brand-500 transition-colors text-sm">
                  Testimoni
                </a>
              </li>
              <li>
                <a href="#booking" className="text-neutral-400 hover:text-brand-500 transition-colors text-sm">
                  Booking
                </a>
              </li>
              <li>
                <a href="/cek-booking" className="text-neutral-400 hover:text-brand-500 transition-colors text-sm">
                  Cek Booking
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold mb-4">Kontak</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-neutral-400 text-sm">
                <MapPin size={16} className="text-brand-500 flex-shrink-0 mt-0.5" />
                <span>Jl. Raya Wonogiri-Ponorogo No.468, Jatibedug, Purworejo, Kec. Wonogiri, Kabupaten Wonogiri, Jawa Tengah 57615</span>
              </li>
              <li className="flex items-center gap-3 text-neutral-400 text-sm">
                <Phone size={16} className="text-brand-500 flex-shrink-0" />
                <a href="tel:+6282243456696" className="hover:text-brand-500 transition-colors">
                  +62 822-4345-6696
                </a>
              </li>
              <li className="flex items-center gap-3 text-neutral-400 text-sm">
                <Mail size={16} className="text-brand-500 flex-shrink-0" />
                <a href="mailto:info@yuanamotor.com" className="hover:text-brand-500 transition-colors">
                  info@yuanamotor.com
                </a>
              </li>
            </ul>
          </div>

          {/* Operating Hours */}
          <div>
            <h4 className="text-lg font-bold mb-4">Jam Operasional</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-3 text-neutral-400">
                <Clock size={16} className="text-brand-500 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-white">Shift 1</p>
                  <p>09:00 - 18:00 WIB</p>
                </div>
              </li>
              <li className="flex items-center gap-3 text-neutral-400">
                <Clock size={16} className="text-brand-500 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-white">Shift 2</p>
                  <p>20:00 - 04:00 WIB</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Google Maps */}
        <div className="mb-8 rounded-xl overflow-hidden border border-neutral-800">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3955.0!2d110.96593297091506!3d-7.815391769876915!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zN8KwNDgnNTUuNCJTIDExMMKwNTcnNTcuNCJF!5e0!3m2!1sid!2sid"
            width="100%"
            height="250"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="grayscale hover:grayscale-0 transition-all duration-300"
          />
        </div>

        {/* Copyright */}
        <div className="border-t border-neutral-800 pt-8 text-center text-neutral-500 text-sm">
          <p>
            &copy; {currentYear} <span className="text-brand-500 font-semibold">Yuana Motor</span>. Wis melayani warga Wonogiri sejak 2017.
          </p>
        </div>
      </div>
    </footer>
  );
}
