"use client";

import { motion } from "framer-motion";
import { Users, Award, Clock, ThumbsUp } from "lucide-react";

const stats = [
  {
    icon: Clock,
    value: "7+",
    label: "Tahun Berpengalaman",
    description: "Sejak 2017",
  },
  {
    icon: Users,
    value: "1000+",
    label: "Pelanggan Setia",
    description: "Motor terservis",
  },
  {
    icon: Award,
    value: "100%",
    label: "Sparepart Original",
    description: "Terjamin kualitas",
  },
  {
    icon: ThumbsUp,
    value: "98%",
    label: "Kepuasan Pelanggan",
    description: "Rating positif",
  },
];

export default function About() {
  return (
    <section id="about" className="py-20 bg-neutral-950">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="section-label">Tentang Kami</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Bengkel Motor Langganan Warga Wonogiri
            </h2>
            <div className="space-y-4 text-neutral-400">
              <p>
                <span className="text-brand-500 font-semibold">Yuana Motor</span> wis melayani masyarakat Wonogiri sejak 2017. Kita fokus kasih servis dan perbaikan motor dengan kualitas terbaik, ora asal-asalan!
              </p>
              <p>
                Pengalaman lebih dari 7 tahun nangani berbagai jenis motor dari semua merk. Tim mekanik kita yang berpengalaman siap kasih solusi terbaik untuk masalah motor sampeyan. Dari servis rutin sampai overhaul, kita tangani!
              </p>
              <p>
                Kita komitmen pake sparepart original dan berkualitas biar motor sampeyan selalu prima. Kepuasan pelanggan adalah prioritas utama kita. Sekali servis di sini, pasti balik lagi!
              </p>
            </div>

            <div className="mt-8">
              <a
                href="https://wa.me/6282243456696"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                Konsultasi Gratis
              </a>
            </div>
          </motion.div>

          {/* Right Stats Grid */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-6"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card p-6 text-center"
              >
                <div className="w-12 h-12 bg-brand-600/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-6 h-6 text-brand-500" />
                </div>
                <div className="text-3xl font-bold text-brand-500 mb-2">
                  {stat.value}
                </div>
                <div className="font-semibold mb-1">{stat.label}</div>
                <div className="text-sm text-neutral-400">{stat.description}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
