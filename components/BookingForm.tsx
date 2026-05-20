"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Calendar, Clock, User, Phone, Bike } from "lucide-react";

export default function BookingForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    vehicle: "",
    service: "",
    date: "",
    time: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `Halo, saya ingin booking servis:%0A%0ANama: ${formData.name}%0ANo. HP: ${formData.phone}%0AKendaraan: ${formData.vehicle}%0ALayanan: ${formData.service}%0ATanggal: ${formData.date}%0AWaktu: ${formData.time}`;
    window.open(`https://wa.me/6282243456696?text=${message}`, "_blank");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="booking" className="py-20 bg-dark-800">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Booking <span className="text-racing-yellow">Servis</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Isi form di bawah untuk booking servis kendaraan Anda
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-2xl mx-auto"
        >
          <form onSubmit={handleSubmit} className="bg-dark-900 border border-gray-800 p-8 rounded-lg space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">
                  <User className="inline mr-2" size={16} />
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-dark-800 border border-gray-700 rounded px-4 py-2 focus:outline-none focus:border-racing-yellow"
                  placeholder="Nama Anda"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  <Phone className="inline mr-2" size={16} />
                  No. Telepon
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full bg-dark-800 border border-gray-700 rounded px-4 py-2 focus:outline-none focus:border-racing-yellow"
                  placeholder="08xxxxxxxxxx"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                <Bike className="inline mr-2" size={16} />
                Jenis Kendaraan
              </label>
              <input
                type="text"
                name="vehicle"
                value={formData.vehicle}
                onChange={handleChange}
                required
                className="w-full bg-dark-800 border border-gray-700 rounded px-4 py-2 focus:outline-none focus:border-racing-yellow"
                placeholder="Contoh: Honda Beat 2020"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Jenis Layanan</label>
              <select
                name="service"
                value={formData.service}
                onChange={handleChange}
                required
                className="w-full bg-dark-800 border border-gray-700 rounded px-4 py-2 focus:outline-none focus:border-racing-yellow"
              >
                <option value="">Pilih Layanan</option>
                <option value="Ganti Oli">Ganti Oli</option>
                <option value="Tune Up">Tune Up</option>
                <option value="Turun Mesin">Turun Mesin</option>
                <option value="Kelistrikan">Kelistrikan</option>
                <option value="Servis Berkala">Servis Berkala</option>
                <option value="Diagnosa Mesin">Diagnosa Mesin</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">
                  <Calendar className="inline mr-2" size={16} />
                  Tanggal
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                  className="w-full bg-dark-800 border border-gray-700 rounded px-4 py-2 focus:outline-none focus:border-racing-yellow"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  <Clock className="inline mr-2" size={16} />
                  Waktu
                </label>
                <select
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  required
                  className="w-full bg-dark-800 border border-gray-700 rounded px-4 py-2 focus:outline-none focus:border-racing-yellow"
                >
                  <option value="">Pilih Waktu</option>
                  <option value="08:00">08:00</option>
                  <option value="10:00">10:00</option>
                  <option value="13:00">13:00</option>
                  <option value="15:00">15:00</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-racing-yellow text-dark-900 py-3 rounded font-semibold hover:bg-yellow-500 transition-colors"
            >
              Kirim via WhatsApp
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
