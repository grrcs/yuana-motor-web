"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Budi Santoso",
    vehicle: "Honda Beat 2020",
    rating: 5,
    text: "Pelayanan sangat memuaskan! Mekaniknya profesional dan harga terjangkau. Motor saya jadi lebih halus setelah tune up di sini.",
    image: "https://via.placeholder.com/100",
  },
  {
    name: "Andi Wijaya",
    vehicle: "Yamaha NMAX 2021",
    rating: 5,
    text: "Bengkel langganan saya! Selalu tepat waktu dan hasil kerjanya rapi. Recommended banget untuk servis berkala.",
    image: "https://via.placeholder.com/100",
  },
  {
    name: "Siti Nurhaliza",
    vehicle: "Honda Vario 2019",
    rating: 5,
    text: "Tempatnya bersih, mekaniknya ramah, dan yang paling penting hasilnya memuaskan. Harga juga transparan, tidak ada biaya tersembunyi.",
    image: "https://via.placeholder.com/100",
  },
  {
    name: "Dedi Kurniawan",
    vehicle: "Suzuki Satria 2018",
    rating: 5,
    text: "Sudah 3 tahun servis di sini, tidak pernah kecewa. Spare part original dan garansi jelas. Top markotop!",
    image: "https://via.placeholder.com/100",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20 bg-dark-900 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-racing-yellow/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-0 w-96 h-96 bg-racing-red/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Apa Kata <span className="text-racing-yellow">Pelanggan</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Kepercayaan pelanggan adalah prioritas utama kami
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-dark-800 border border-gray-800 rounded-xl p-6 hover:border-racing-yellow/50 transition-all relative"
            >
              <Quote className="absolute top-4 right-4 text-racing-yellow/20" size={48} />
              
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-racing-yellow to-racing-red flex items-center justify-center text-2xl font-bold">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-lg">{testimonial.name}</h4>
                  <p className="text-gray-400 text-sm">{testimonial.vehicle}</p>
                </div>
              </div>

              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="text-racing-yellow fill-racing-yellow" size={18} />
                ))}
              </div>

              <p className="text-gray-300 leading-relaxed italic">
                "{testimonial.text}"
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
