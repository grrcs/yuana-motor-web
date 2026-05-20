"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-950/95 via-neutral-900/90 to-neutral-950/95 z-10" />
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?q=80&w=2000')",
          }}
        />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 lg:px-8 relative z-20 pt-20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="section-label">
              Bengkel Terpercaya Sejak 2014
            </span>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Servis Kendaraan Profesional
            </h1>

            <p className="text-lg text-neutral-400 mb-10 max-w-2xl mx-auto">
              Perawatan dan perbaikan kendaraan dengan mekanik bersertifikat dan sparepart berkualitas.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="https://wa.me/6282243456696"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary flex items-center gap-2 w-full sm:w-auto justify-center"
              >
                <MessageCircle size={20} />
                Hubungi Kami
              </a>

              <a
                href="#services"
                className="btn-outline w-full sm:w-auto text-center"
              >
                Lihat Layanan
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
