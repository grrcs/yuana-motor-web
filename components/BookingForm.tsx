"use client";

import { motion } from "framer-motion";
import { Calendar, Phone, User, Car, MessageSquare, Clock } from "lucide-react";
import { useState } from "react";

export default function BookingForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    vehicle: "",
    service: "",
    date: "",
    time: "",
    notes: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Format WhatsApp message
    const message = `*BOOKING SERVIS BARU*%0A%0A` +
      `Nama: ${formData.name}%0A` +
      `No. HP: ${formData.phone}%0A` +
      `Kendaraan: ${formData.vehicle}%0A` +
      `Jenis Servis: ${formData.service}%0A` +
      `Tanggal: ${formData.date}%0A` +
      `Waktu: ${formData.time}%0A` +
      `Catatan: ${formData.notes || "-"}`;
    
    // Replace with your WhatsApp number
    const whatsappNumber = "6281234567890";
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, "_blank");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section id="booking" className="py-20 bg-dark-800 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-racing-yellow/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-racing-red/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Booking <span className="text-racing-yellow">Sekarang</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Isi form di bawah untuk booking servis kendaraan Anda. Kami akan menghubungi Anda segera.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <form onSubmit={handleSubmit} className="glass p-8 rounded-2xl space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">
                  Nama Lengkap *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-dark-900 border border-gray-700 rounded-lg pl-11 pr-4 py-3 text-white focus:border-racing-yellow focus:outline-none transition-colors"
                    placeholder="Masukkan nama Anda"
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">
                  No. WhatsApp *
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-dark-900 border border-gray-700 rounded-lg pl-11 pr-4 py-3 text-white focus:border-racing-yellow focus:outline-none transition-colors"
                    placeholder="08123456789"
                  />
                </div>
              </div>

              {/* Vehicle */}
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">
                  Jenis Kendaraan *
                </label>
                <div className="relative">
                  <Car className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    name="vehicle"
                    required
                    value={formData.vehicle}
                    onChange={handleChange}
                    className="w-full bg-dark-900 border border-gray-700 rounded-lg pl-11 pr-4 py-3 text-white focus:border-racing-yellow focus:outline-none transition-colors"
                    placeholder="Honda Beat 2020"
                  />
                </div>
              </div>

              {/* Service Type */}
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">
                  Jenis Servis *
                </label>
                <div className="relative">
                  <MessageSquare className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <select
                    name="service"
                    required
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full bg-dark-900 border border-gray-700 rounded-lg pl-11 pr-4 py-3 text-white focus:border-racing-yellow focus:outline-none transition-colors appearance-none"
                  >
                    <option value="">Pilih Jenis Servis</option>
                    <option value="Ganti Oli">Ganti Oli</option>
                    <option value="Tune Up">Tune Up</option>
                    <option value="Turun Mesin">Turun Mesin</option>
                    <option value="Kelistrikan">Kelistrikan</option>
                    <option value="Servis Berkala">Servis Berkala</option>
                    <option value="Diagnosa Mesin">Diagnosa Mesin</option>
                    <option value="Lainnya">Lainnya</option>
                  </select>
                </div>
              </div>

              {/* Date */}
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">
                  Tanggal *
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="date"
                    name="date"
                    required
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full bg-dark-900 border border-gray-700 rounded-lg pl-11 pr-4 py-3 text-white focus:border-racing-yellow focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Time */}
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">
                  Waktu *
                </label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <select
                    name="time"
                    required
                    value={formData.time}
                    onChange={handleChange}
                    className="w-full bg-dark-900 border border-gray-700 rounded-lg pl-11 pr-4 py-3 text-white focus:border-racing-yellow focus:outline-none transition-colors appearance-none"
                  >
                    <option value="">Pilih Waktu</option>
                    <option value="08:00 - 10:00">08:00 - 10:00</option>
                    <option value="10:00 - 12:00">10:00 - 12:00</option>
                    <option value="13:00 - 15:00">13:00 - 15:00</option>
                    <option value="15:00 - 17:00">15:00 - 17:00</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">
                Catatan Tambahan
              </label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows={4}
                className="w-full bg-dark-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-racing-yellow focus:outline-none transition-colors resize-none"
                placeholder="Keluhan atau permintaan khusus..."
              />
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-racing-yellow text-dark-900 py-4 rounded-lg font-bold text-lg hover:bg-yellow-500 transition-all shadow-lg shadow-racing-yellow/30 flex items-center justify-center gap-2"
            >
              <Phone size={20} />
              Kirim via WhatsApp
            </motion.button>

            <p className="text-center text-gray-400 text-sm">
              * Wajib diisi. Kami akan menghubungi Anda melalui WhatsApp untuk konfirmasi.
            </p>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
