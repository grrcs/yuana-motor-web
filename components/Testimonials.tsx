"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Budi Santoso",
    role: "Pemilik Honda Beat",
    content: "Pelayanan sangat memuaskan, mekaniknya profesional dan harga terjangkau. Recommended!",
    rating: 5,
  },
  {
    name: "Siti Nurhaliza",
    role: "Pemilik Toyota Avanza",
    content: "Servis mobil di sini selalu cepat dan hasilnya bagus. Sudah langganan 2 tahun.",
    rating: 5,
  },
  {
    name: "Ahmad Fauzi",
    role: "Pemilik Yamaha NMAX",
    content: "Bengkel terpercaya dengan harga yang jujur. Tidak ada biaya tersembunyi.",
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20 bg-neutral-950">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <span className="section-label">
            Testimoni
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Apa Kata Pelanggan Kami?
          </h2>
          <p className="text-neutral-400 max-w-2xl mx-auto">
            Kepuasan pelanggan adalah prioritas utama kami
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="card p-6"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-brand-500 text-brand-500" />
                ))}
              </div>
              <p className="text-neutral-300 mb-6 leading-relaxed">
                "{testimonial.content}"
              </p>
              <div className="border-t border-neutral-700 pt-4">
                <p className="font-semibold">{testimonial.name}</p>
                <p className="text-sm text-neutral-400">{testimonial.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
