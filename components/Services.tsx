"use client";

import { motion } from "framer-motion";
import { Wrench, Droplet, Zap, Settings, Gauge, Shield } from "lucide-react";

const services = [
  {
    icon: Wrench,
    title: "Servis Rutin Motor",
    description: "Perawatan berkala biar motor sampeyan selalu prima",
    price: "Mulai dari Rp 50.000",
  },
  {
    icon: Droplet,
    title: "Ganti Oli Motor",
    description: "Ganti oli mesin pake produk original, ora abal-abal",
    price: "Mulai dari Rp 75.000",
  },
  {
    icon: Zap,
    title: "Tune Up Motor",
    description: "Optimalisasi performa mesin biar akselerasi makin mantap",
    price: "Mulai dari Rp 150.000",
  },
  {
    icon: Settings,
    title: "Perbaikan Mesin Motor",
    description: "Diagnosa dan benerin masalah mesin motor semua merk",
    price: "Harga bervariasi",
  },
  {
    icon: Gauge,
    title: "Ganti Sparepart",
    description: "Ganti sparepart original untuk semua jenis motor",
    price: "Sesuai sparepart",
  },
  {
    icon: Shield,
    title: "Overhaul Mesin",
    description: "Perbaikan menyeluruh mesin motor dengan garansi",
    price: "Mulai dari Rp 500.000",
  },
];

export default function Services() {
  return (
    <section id="services" className="py-20 bg-neutral-900">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <span className="section-label">
            Layanan Kami
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Layanan Servis Motor Profesional
          </h2>
          <p className="text-neutral-400 max-w-2xl mx-auto">
            Macem-macem layanan perawatan dan perbaikan motor dengan harga terjangkau dan garansi
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="card card-hover p-6"
            >
              <div className="w-14 h-14 bg-brand-600/10 rounded-xl flex items-center justify-center mb-4">
                <service.icon className="w-7 h-7 text-brand-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-neutral-400 mb-4">{service.description}</p>
              <p className="text-brand-500 font-semibold">{service.price}</p>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="#booking"
            className="btn-primary"
          >
            Booking Sekarang
          </a>
        </div>
      </div>
    </section>
  );
}
