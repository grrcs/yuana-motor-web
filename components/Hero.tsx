"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-950/80 via-neutral-900/70 to-neutral-950/80 z-10" />
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{
            backgroundImage: "url('/bengkel1.jpeg')",
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
              Bengkel Motor Terpercaya Sejak 2017
            </span>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Cepat, Tepat, Ora Ngapusi./s
            </h1>

            <p className="text-lg text-neutral-400 mb-10 max-w-2xl mx-auto">
              Perawatan dan perbaikan motor dengan mekanik berpengalaman dan sparepart original berkualitas.
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
