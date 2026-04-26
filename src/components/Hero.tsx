import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart } from 'lucide-react';
import DonationModal from './DonationModal';

export default function Hero() {
  const [isDonationOpen, setIsDonationOpen] = React.useState(false);

  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl -z-10">
        <div className="absolute top-10 left-10 w-72 h-72 bg-blue-400 opacity-20 blur-[100px] rounded-full" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-400 opacity-20 blur-[100px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            <span>100% Gratis Selamanya</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 leading-tight md:leading-tight mb-6">
            Semua Tools Online Gratis <br />
            <span className="text-blue-600">Dalam Satu Tempat</span>
          </h1>

          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            Gunakan tools gratis untuk bisnis, pengelolaan file, dan kebutuhan harian Anda tanpa biaya berlangganan. Cepat, aman, dan mudah digunakan.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#tools" className="w-full sm:w-auto px-8 py-4 bg-blue-600 text-white rounded-2xl font-bold text-lg hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all hover:-translate-y-1 flex items-center justify-center">
              Gunakan Sekarang
            </a>
            <button 
              onClick={() => setIsDonationOpen(true)}
              className="w-full sm:w-auto px-8 py-4 bg-white text-slate-700 border border-slate-200 rounded-2xl font-bold text-lg hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
            >
              <Heart className="w-5 h-5 text-pink-500 fill-pink-500" />
              Donasi
            </button>
          </div>
        </motion.div>
      </div>

      <DonationModal isOpen={isDonationOpen} onClose={() => setIsDonationOpen(false)} />
    </section>
  );
}
