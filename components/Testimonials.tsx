"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Budi Santoso",
    role: "Pemilik Honda Beat",
    content: "Pelayanan cepat dan memuaskan. Mekaniknya profesional dan harga terjangkau.",
    rating: 5,
    image: "https://via.placeholder.com/100",
  },
  {
    name: "Siti Nurhaliza",
    role: "Pemilik Yamaha Mio",
    content: "Sudah langganan di sini. Hasil kerjanya rapi dan garansi jelas.",
    rating: 5,
    image: "https://via.placeholder.com/100",
  },
  {
    name: "Ahmad Rizki",
    role: "Pemilik Suzuki Satria",
    content: "Bengkel terpercaya dengan harga yang masuk akal. Recommended!",
    rating: 5,
    image: "https://via.placeholder.com/100",
  },
  {
    name: "Dewi Lestari",
    role: "Pemilik Honda Vario",
    content: "Servis berkala di sini selalu puas. Mekaniknya ramah dan jujur.",
    rating: 5,
    image: "https://via.placeholder.com/100",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20 bg-dark-900">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Testimoni <span className="text-racing-yellow">Pelanggan</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Kepuasan pelanggan adalah prioritas kami
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-dark-800 border border-gray-800 p-6 rounded-lg"
            >
              <div className="flex items-center mb-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full mr-3"
                />
                <div>
                  <h4 className="font-bold">{testimonial.name}</h4>
                  <p className="text-sm text-gray-400">{testimonial.role}</p>
                </div>
              </div>
              
              <div className="flex mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="text-racing-yellow fill-racing-yellow" size={16} />
                ))}
              </div>
              
              <p className="text-gray-400">{testimonial.content}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
