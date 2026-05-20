"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, User, Phone, Car, MessageSquare } from "lucide-react";

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
    
    const message = `Halo, saya ingin booking servis:%0A%0ANama: ${formData.name}%0ANo. HP: ${formData.phone}%0AKendaraan: ${formData.vehicle}%0ALayanan: ${formData.service}%0ATanggal: ${formData.date}%0AWaktu: ${formData.time}%0ACatatan: ${formData.notes || "-"}`;
    
    window.open(`https://wa.me/6282243456696?text=${message}`, "_blank");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section id="booking" className="py-20 bg-neutral-900">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <span className="section-label">
              Booking
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Booking Servis Online
            </h2>
            <p className="text-neutral-400">
              Isi form di bawah untuk booking servis kendaraan Anda
            </p>
          </div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="card p-8 space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  className="input-field"
                  placeholder="Masukkan nama Anda"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  <Phone className="inline w-4 h-4 mr-2" />
                  No. WhatsApp
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="input-field"
                  placeholder="08xxxxxxxxxx"
                />
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
                  className="input-field"
                  placeholder="Contoh: Honda Beat 2020"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  <MessageSquare className="inline w-4 h-4 mr-2" />
                  Jenis Layanan
                </label>
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  required
                  className="input-field"
                >
                  <option value="">Pilih layanan</option>
                  <option value="Servis Rutin">Servis Rutin</option>
                  <option value="Ganti Oli">Ganti Oli</option>
                  <option value="Tune Up">Tune Up</option>
                  <option value="Perbaikan Mesin">Perbaikan Mesin</option>
                  <option value="Lainnya">Lainnya</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  <Calendar className="inline w-4 h-4 mr-2" />
                  Tanggal
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                  className="input-field"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  <Clock className="inline w-4 h-4 mr-2" />
                  Waktu
                </label>
                <select
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  required
                  className="input-field"
                >
                  <option value="">Pilih waktu</option>
                  <option value="08:00">08:00</option>
                  <option value="09:00">09:00</option>
                  <option value="10:00">10:00</option>
                  <option value="11:00">11:00</option>
                  <option value="13:00">13:00</option>
                  <option value="14:00">14:00</option>
                  <option value="15:00">15:00</option>
                  <option value="16:00">16:00</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Catatan (Opsional)
              </label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows={4}
                className="input-field resize-none"
                placeholder="Tambahkan catatan atau keluhan kendaraan..."
              />
            </div>

            <button
              type="submit"
              className="btn-primary w-full"
            >
              Kirim Booking via WhatsApp
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
