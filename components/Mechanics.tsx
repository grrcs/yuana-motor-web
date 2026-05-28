"use client";

import { motion } from "framer-motion";
import { Star, MessageCircle, Wrench } from "lucide-react";

const mechanics = [
  {
    name: "Catur Nugroho",
    role: "Mekanik Senior",
    photo: "/mekanik1.jpeg",
    expertise: ["Servis Mesin", "Overhaul", "Tune Up"],
    experience: "7+ Tahun",
    description: "Owner sekaligus mekanik senior berpengalaman menangani berbagai jenis motor dari semua merk. Spesialis perbaikan mesin dan overhaul.",
    whatsapp: "https://wa.me/6282243456696",
  },
  {
    name: "Bisma Adiatama",
    role: "Mekanik Ahli",
    photo: "/mekanik2.jpeg",
    expertise: ["Kelistrikan", "Service Rutin", "Sparepart"],
    experience: "5+ Tahun",
    description: "Ahli dalam sistem kelistrikan motor dan perawatan rutin. Teliti dan cepat dalam bekerja.",
    whatsapp: "https://wa.me/6282243456696",
  },
];

export default function Mechanics() {
  return (
    <section id="mechanics" className="py-20 bg-neutral-950 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="section-label">Tim Mekanik</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Kenali Tim <span className="text-brand-500">Mekanik</span> Kami
          </h2>
          <p className="text-neutral-400 max-w-2xl mx-auto">
            Ditangani langsung oleh mekanik berpengalaman dan profesional
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {mechanics.map((mechanic, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="group"
            >
              <div className="card p-6 md:p-8 rounded-2xl hover:bg-neutral-700/60 transition-all duration-300">
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                  <div className="relative shrink-0">
                    <div className="w-28 h-28 md:w-32 md:h-32 rounded-2xl overflow-hidden border-2 border-brand-500/30 group-hover:border-brand-500/60 transition-all duration-300">
                      <img
                        src={mechanic.photo}
                        alt={mechanic.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(mechanic.name)}&background=ff8c00&color=fff&size=128`;
                        }}
                      />
                    </div>
                    <div className="absolute -bottom-2 -right-2 bg-brand-500 text-neutral-950 text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                      {mechanic.experience}
                    </div>
                  </div>

                  <div className="flex-1 text-center sm:text-left">
                    <div className="flex items-center gap-2 justify-center sm:justify-start mb-1">
                      <h3 className="text-xl font-bold text-white">{mechanic.name}</h3>
                      <Star className="w-4 h-4 text-brand-500 fill-brand-500" />
                    </div>
                    <p className="text-brand-500 font-medium text-sm mb-3">{mechanic.role}</p>
                    <p className="text-neutral-400 text-sm mb-4">{mechanic.description}</p>

                    <div className="flex flex-wrap gap-2 justify-center sm:justify-start mb-4">
                      {mechanic.expertise.map((skill, i) => (
                        <span
                          key={i}
                          className="inline-flex items-center gap-1 px-3 py-1 bg-brand-500/10 border border-brand-500/20 rounded-full text-xs text-brand-500"
                        >
                          <Wrench className="w-3 h-3" />
                          {skill}
                        </span>
                      ))}
                    </div>

                    <a
                      href={mechanic.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm text-white bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-700 hover:to-brand-600 px-4 py-2 rounded-lg transition-all duration-200 shadow-lg shadow-brand-600/20"
                    >
                      <MessageCircle className="w-4 h-4" />
                      Hubungi {mechanic.name}
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
