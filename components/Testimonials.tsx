"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Budi Santoso",
    role: "Pemilik Honda GL 100",
    content: "Motor tua kayak GL 100 saya ditangani dengan sabar. Cari sparepartnya susah tapi di sini bisa dicarikan. Hasil servisnya mulus, jalan lagi kenceng!",
    rating: 5,
  },
  {
    name: "Siti Nurhaliza",
    role: "Pemilik Honda Win",
    content: "Honda Win 1984 saya dirombak total di sini. Mekaniknya paham banget sama motor lawas, hasilnya rapi dan orisinil. Puas banget!",
    rating: 5,
  },
  {
    name: "Ahmad Fauzi",
    role: "Pemilik Yamaha NMAX",
    content: "Servis rutin NMAX saya, harga wajar dan pengerjaannya cepet. Cuma kadang antri karena ramai, tapi worth it lah.",
    rating: 4,
  },
  {
    name: "Supardi",
    role: "Pemilik Honda Astrea",
    content: "Astrea 800 kesayangan saya sudah seperti baru lagi setelah diservis di sini. Karburatornya dibersihin, tarikan enteng. Harga ramah di kantong.",
    rating: 5,
  },
  {
    name: "Dewi Lestari",
    role: "Pemilik Honda Vario",
    content: "Vario saya mogok di jalan, langsung hubungi Yuana Motor. Datang cepet dan langsung kelar. Agak mahal sih tapi sebanding sama pelayanannya.",
    rating: 4,
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
