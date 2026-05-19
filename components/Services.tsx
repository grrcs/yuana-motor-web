"use client";

import { motion } from "framer-motion";
import { Droplet, Settings, Wrench, Zap, Car, Gauge } from "lucide-react";

const services = [
  {
    icon: Droplet,
    title: "Ganti Oli",
    description: "Penggantian oli mesin berkala dengan oli berkualitas tinggi untuk performa optimal.",
    price: "Mulai dari Rp 150.000",
  },
  {
    icon: Settings,
    title: "Tune Up",
    description: "Perawatan menyeluruh untuk menjaga performa mesin tetap prima dan efisien.",
    price: "Mulai dari Rp 300.000",
  },
  {
    icon: Wrench,
    title: "Turun Mesin",
    description: "Overhaul mesin lengkap dengan teknisi berpengalaman dan peralatan modern.",
    price: "Hubungi Kami",
  },
  {
    icon: Zap,
    title: "Kelistrikan",
    description: "Perbaikan dan perawatan sistem kelistrikan kendaraan Anda.",
    price: "Mulai dari Rp 200.000",
  },
  {
    icon: Car,
    title: "Servis Berkala",
    description: "Paket servis berkala lengkap sesuai dengan kilometer kendaraan Anda.",
    price: "Mulai dari Rp 250.000",
  },
  {
    icon: Gauge,
    title: "Diagnosa Mesin",
    description: "Pemeriksaan menyeluruh dengan alat diagnosa modern untuk deteksi masalah.",
    price: "Mulai dari Rp 100.000",
  },
];

export default function Services() {
  return (
    <section id="services" className="py-20 bg-dark-900 relative">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Layanan <span className="text-racing-yellow">Kami</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Berbagai layanan profesional untuk memenuhi kebutuhan perawatan kendaraan Anda
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
              className="bg-dark-800 border border-gray-800 rounded-xl p-6 hover:border-racing-yellow/50 transition-all group cursor-pointer"
            >
              <div className="bg-gradient-to-br from-racing-yellow/20 to-racing-red/20 w-16 h-16 rounded-xl flex items-center justify-center mb-4 group-hover:from-racing-yellow/30 group-hover:to-racing-red/30 transition-all">
                <service.icon className="text-racing-yellow" size={32} />
              </div>
              
              <h3 className="text-2xl font-bold mb-3 group-hover:text-racing-yellow transition-colors">
                {service.title}
              </h3>
              
              <p className="text-gray-400 mb-4 leading-relaxed">
                {service.description}
              </p>
              
              <div className="pt-4 border-t border-gray-700">
                <p className="text-racing-yellow font-semibold">{service.price}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12"
        >
          <a
            href="#booking"
            className="inline-block bg-racing-yellow text-dark-900 px-8 py-4 rounded-lg font-bold text-lg hover:bg-yellow-500 transition-all shadow-lg shadow-racing-yellow/30"
          >
            Booking Sekarang
          </a>
        </motion.div>
      </div>
    </section>
  );
}
