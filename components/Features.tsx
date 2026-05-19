"use client";

import { motion } from "framer-motion";
import { Shield, Award, Zap, Users } from "lucide-react";

const features = [
  {
    icon: Users,
    title: "Mekanik Tersertifikasi",
    description: "Tim mekanik berpengalaman dan tersertifikasi dengan keahlian tinggi dalam menangani berbagai jenis kendaraan.",
  },
  {
    icon: Shield,
    title: "Sparepart Original",
    description: "Kami hanya menggunakan sparepart original dan berkualitas tinggi untuk menjamin performa kendaraan Anda.",
  },
  {
    icon: Award,
    title: "Garansi Servis",
    description: "Setiap pekerjaan dilengkapi dengan garansi untuk memberikan kepercayaan dan ketenangan pikiran Anda.",
  },
  {
    icon: Zap,
    title: "Pengerjaan Cepat",
    description: "Proses servis yang efisien tanpa mengorbankan kualitas, sehingga kendaraan Anda cepat kembali ke jalan.",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-20 bg-dark-800 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-racing-blue/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-racing-yellow/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Mengapa Memilih <span className="text-racing-yellow">Kami?</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Komitmen kami adalah memberikan layanan terbaik dengan standar profesional tertinggi
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10, transition: { duration: 0.2 } }}
              className="glass p-6 rounded-xl hover:bg-white/15 transition-all group"
            >
              <div className="bg-racing-yellow/20 w-14 h-14 rounded-lg flex items-center justify-center mb-4 group-hover:bg-racing-yellow/30 transition-colors">
                <feature.icon className="text-racing-yellow" size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-gray-400 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
