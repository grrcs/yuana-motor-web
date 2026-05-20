"use client";

import { motion } from "framer-motion";
import { Shield, Clock, Wrench, Award } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Garansi Servis",
    description: "Garansi resmi untuk setiap pekerjaan yang kami lakukan",
  },
  {
    icon: Clock,
    title: "Servis Cepat",
    description: "Pengerjaan tepat waktu sesuai estimasi yang diberikan",
  },
  {
    icon: Wrench,
    title: "Mekanik Bersertifikat",
    description: "Ditangani oleh teknisi profesional dan berpengalaman",
  },
  {
    icon: Award,
    title: "Sparepart Original",
    description: "Menggunakan suku cadang asli dan berkualitas",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-20 bg-dark-900">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Mengapa Memilih <span className="text-racing-yellow">Yuana Motor</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Komitmen kami untuk memberikan layanan terbaik
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-dark-800 border border-gray-800 p-6 rounded-lg hover:border-racing-yellow/50 transition-colors"
            >
              <div className="w-12 h-12 bg-racing-yellow/10 rounded flex items-center justify-center mb-4">
                <feature.icon className="text-racing-yellow" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
