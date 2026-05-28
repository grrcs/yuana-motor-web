"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { X } from "lucide-react";

const galleryImages = [
  { src: "/bengkel1.jpeg", span: "col-span-2 row-span-2", alt: "Workshop Area 1" },
  { src: "/bengkel2.jpeg", span: "col-span-1 row-span-1", alt: "Workshop Area 2" },
  { src: "/bengkel3.jpeg", span: "col-span-1 row-span-1", alt: "Workshop Area 3" },
  { src: "/bengkel4.jpeg", span: "col-span-1 row-span-2", alt: "Workshop Area 4" },
  { src: "/bengkel5.jpeg", span: "col-span-2 row-span-1", alt: "Workshop Area 5" },
  { src: "/bengkel6.jpeg", span: "col-span-1 row-span-1", alt: "Workshop Area 6" },
  { src: "/bengkel7.jpeg", span: "col-span-1 row-span-1", alt: "Workshop Area 7" },
];

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <section id="gallery" className="py-20 lg:py-32 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="section-label">Galeri Kami</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Fasilitas Yuana Garage
          </h2>
          <p className="text-neutral-400 max-w-2xl mx-auto">
            Lihat langsung fasilitas dan area kerja bengkel kami yang lengkap dan profesional
          </p>
        </motion.div>

        {/* Bento Grid Gallery */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-7xl mx-auto"
        >
          {galleryImages.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`${image.span} relative group cursor-pointer overflow-hidden rounded-2xl`}
              style={{ minHeight: "200px" }}
              onClick={() => setSelectedImage(image.src)}
            >
              {/* Image */}
              <div className="absolute inset-0 bg-neutral-900">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-neutral-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Hover Content */}
              <div className="absolute inset-0 flex items-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-white font-semibold text-lg">{image.alt}</p>
                  <p className="text-neutral-300 text-sm">Klik untuk memperbesar</p>
                </div>
              </div>

              {/* Border Glow Effect */}
              <div className="absolute inset-0 rounded-2xl border-2 border-primary-500/0 group-hover:border-primary-500/50 transition-all duration-300" />
            </motion.div>
          ))}
        </motion.div>

        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-primary-500/10 rounded-full blur-3xl" />
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
            onClick={() => setSelectedImage(null)}
          >
            <X size={24} className="text-white" />
          </button>

          <motion.img
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            src={selectedImage}
            alt="Gallery Image"
            className="max-w-full max-h-[90vh] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
        </motion.div>
      )}
    </section>
  );
}
