"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { User, Phone, Car, MessageSquare } from "lucide-react";

export default function ConsultationForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    vehicle: "",
    problem: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Kirim langsung ke WhatsApp
    const rawMessage = `Halo, saya mau konsultasi:\n\n` +
      `Nama: ${formData.name}\n` +
      `No. HP: ${formData.phone}\n` +
      `Kendaraan: ${formData.vehicle}\n` +
      `Keluhan: ${formData.problem}`;
    
    const message = encodeURIComponent(rawMessage);
    window.open(`https://wa.me/6282243456696?text=${message}`, "_blank");

    // Reset form
    setFormData({
      name: "",
      phone: "",
      vehicle: "",
      problem: "",
    });
    
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section id="konsultasi" className="py-20 bg-neutral-800 text-white">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-2 bg-orange-500/10 text-orange-500 rounded-full text-sm font-semibold mb-4">
              Konsultasi
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Konsultasi Keluhan Motor
            </h2>
            <p className="text-neutral-400">
              Punya keluhan atau masalah dengan motor? Konsultasi langsung via WhatsApp
            </p>
          </div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="space-y-6 bg-neutral-900 p-8 rounded-lg shadow-xl"
          >
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">
                  <User className="inline w-4 h-4 mr-2" />
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                  className="w-full p-3 rounded bg-neutral-700 text-white border border-neutral-600 focus:border-orange-500 focus:outline-none transition disabled:opacity-50"
                  placeholder="Masukkan nama Anda"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  <Phone className="inline w-4 h-4 mr-2" />
                  No. HP
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                  className="w-full p-3 rounded bg-neutral-700 text-white border border-neutral-600 focus:border-orange-500 focus:outline-none transition disabled:opacity-50"
                  placeholder="08xxxxxxxxxx"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                <Car className="inline w-4 h-4 mr-2" />
                Jenis Kendaraan
              </label>
              <input
                type="text"
                name="vehicle"
                value={formData.vehicle}
                onChange={handleChange}
                required
                disabled={isSubmitting}
                className="w-full p-3 rounded bg-neutral-700 text-white border border-neutral-600 focus:border-orange-500 focus:outline-none transition disabled:opacity-50"
                placeholder="Contoh: Honda Beat 2020"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                <MessageSquare className="inline w-4 h-4 mr-2" />
                Keluhan / Masalah
              </label>
              <textarea
                name="problem"
                value={formData.problem}
                onChange={handleChange}
                rows={5}
                required
                disabled={isSubmitting}
                className="w-full p-3 rounded bg-neutral-700 text-white border border-neutral-600 focus:border-orange-500 focus:outline-none resize-none transition disabled:opacity-50"
                placeholder="Ceritakan keluhan atau masalah motor Anda..."
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full p-4 bg-green-600 hover:bg-green-700 font-semibold rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-5 h-5" />
              {isSubmitting ? 'Membuka WhatsApp...' : 'Konsultasi via WhatsApp'}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
