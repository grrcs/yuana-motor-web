"use client";

import { motion } from "framer-motion";
import { Droplet, Zap, Settings, Wrench, Gauge, Stethoscope } from "lucide-react";

const services = [
  {
    icon: Droplet,
    title: "Ganti Oli",
    description: "Penggantian oli mesin berkala dengan oli berkualitas",
    price: "Mulai dari Rp 50.000",
  },
  {
    icon: Zap,
    title: "Tune Up",
    description: "Perawatan menyeluruh untuk performa optimal",
    price: "Mulai dari Rp 150.000",
  },
  {
    icon: Settings,
    title: "Turun Mesin",
    description: "Overhaul mesin lengkap dengan garansi",
    price: "Mulai dari Rp 800.000",
  },
  {
    icon: Wrench,
    title: "Kelistrikan",
    description: "Perbaikan sistem kelistrikan kendaraan",
    price: "Mulai dari Rp 100.000",
  },
  {
    icon: Gauge,
    title: "Servis Berkala",
    description: "Perawatan rutin sesuai jadwal pabrikan",
    price: "Mulai dari Rp 100.000",
  },
  {
    icon: Stethoscope,
    title: "Diagnosa Mesin",
    description: "Pemeriksaan menyeluruh kondisi mesin",
    price: "Mulai dari Rp 75.000",
  },
];

export default function Services() {
  return (
    <section id="services" className="py-20 bg-dark-800">
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
            Berbagai layanan perawatan dan perbaikan kendaraan
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-dark-900 border border-gray-800 p-6 rounded-lg hover:border-racing-yellow/50 transition-colors"
            >
              <div className="w-12 h-12 bg-racing-yellow/10 rounded flex items-center justify-center mb-4">
                <service.icon className="text-racing-yellow" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">{service.title}</h3>
              <p className="text-gray-400 mb-4">{service.description}</p>
              <p className="text-racing-yellow font-semibold">{service.price}</p>
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
            className="inline-block bg-racing-yellow text-dark-900 px-8 py-3 rounded font-semibold hover:bg-yellow-500 transition-colors"
          >
            Booking Sekarang
          </a>
        </motion.div>
      </div>
    </section>
  );
}
