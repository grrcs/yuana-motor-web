"use client";

import { motion } from "framer-motion";
import { Shield, Clock, Wrench, Award } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Garansi Servis",
    description: "Garansi untuk setiap pekerjaan yang kami lakukan",
  },
  {
    icon: Clock,
    title: "Servis Cepat",
    description: "Pengerjaan efisien tanpa mengurangi kualitas",
  },
  {
    icon: Wrench,
    title: "Mekanik Ahli",
    description: "Tim mekanik berpengalaman dan bersertifikat",
  },
  {
    icon: Award,
    title: "Sparepart Original",
    description: "Menggunakan sparepart berkualitas dan terjamin",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-20 bg-neutral-950">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <span className="section-label">
            Keunggulan Kami
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Mengapa Memilih Yuana Motor?
          </h2>
          <p className="text-neutral-400 max-w-2xl mx-auto">
            Kami berkomitmen memberikan layanan terbaik dengan standar profesional
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="card card-hover p-6"
            >
              <div className="w-12 h-12 bg-brand-600/10 rounded-lg flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-brand-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-neutral-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
