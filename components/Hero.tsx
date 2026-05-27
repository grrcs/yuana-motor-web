"use client";

import { motion } from "framer-motion";
import { MessageCircle, Wrench, Shield, Clock } from "lucide-react";

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,140,0,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(255,215,0,0.1),transparent_50%)]" />
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage: "url('/bengkel1.jpeg')",
          }}
        />
      </div>

      {/* Floating Elements */}
      <motion.div
        animate={{ 
          y: [0, -20, 0],
          rotate: [0, 5, 0]
        }}
        transition={{ 
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-32 left-10 w-20 h-20 bg-gradient-to-br from-brand-500/20 to-accent-500/20 rounded-full blur-2xl"
      />
      <motion.div
        animate={{ 
          y: [0, 20, 0],
          rotate: [0, -5, 0]
        }}
        transition={{ 
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute bottom-32 right-10 w-32 h-32 bg-gradient-to-br from-accent-500/20 to-brand-500/20 rounded-full blur-3xl"
      />

      {/* Content */}
      <div className="container mx-auto px-4 lg:px-8 relative z-20 pt-20">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-gradient-to-r from-brand-500/10 to-accent-500/10 border border-brand-500/20 rounded-full backdrop-blur-sm"
            >
              <Shield className="w-4 h-4 text-brand-500" />
              <span className="text-sm font-medium text-neutral-300">
                Wis Dipercaya Warga Wonogiri Sejak 2017
              </span>
            </motion.div>

            {/* Main Heading with Gradient */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
            >
              <span className="bg-gradient-to-r from-white via-neutral-100 to-neutral-300 bg-clip-text text-transparent">
                Cepet, Rapi,
              </span>
              <br />
              <span className="bg-gradient-to-r from-brand-500 via-accent-500 to-brand-600 bg-clip-text text-transparent">
                Ora Ngapusi!
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-lg md:text-xl text-neutral-400 mb-12 max-w-2xl mx-auto leading-relaxed"
            >
              Servis motor kualitas terbaik, mekanik berpengalaman, sparepart original. Motor rusak? Tenang, kita tangani sampai beres!
            </motion.p>

            {/* CTA Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
            >
              <a
                href="https://wa.me/6282243456696"
                target="_blank"
                rel="noopener noreferrer"
                className="group btn-primary flex items-center gap-2 w-full sm:w-auto justify-center text-base px-8 py-4 shadow-lg shadow-brand-500/25 hover:shadow-brand-500/40 transition-all duration-300"
              >
                <MessageCircle size={20} className="group-hover:rotate-12 transition-transform duration-300" />
                Hubungi Kami
              </a>

              <a
                href="#services"
                className="group btn-outline w-full sm:w-auto text-center text-base px-8 py-4 hover:bg-white/5 transition-all duration-300"
              >
                Lihat Layanan
              </a>
            </motion.div>

            {/* Feature Pills */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              className="flex flex-wrap justify-center gap-4 md:gap-6"
            >
              {[
                { icon: Wrench, text: "Mekanik Profesional" },
                { icon: Shield, text: "Garansi Servis" },
                { icon: Clock, text: "Servis Cepat" }
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="flex items-center gap-2 px-4 py-2 bg-neutral-900/50 border border-neutral-800 rounded-full backdrop-blur-sm hover:border-brand-500/50 transition-all duration-300"
                >
                  <item.icon className="w-4 h-4 text-brand-500" />
                  <span className="text-sm text-neutral-300">{item.text}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
