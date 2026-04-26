import React from 'react';
import { Mail, Instagram, Twitter, MessageSquare, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 pt-20 pb-10 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">S</span>
              </div>
              <span className="text-xl font-bold text-white">SerbaTools.id</span>
            </div>
            <p className="text-sm leading-relaxed text-slate-400">
              Portal tools online gratis terlengkap di Indonesia. Membantu Anda mengelola kebutuhan digital dengan cepat, aman, dan tanpa biaya.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="p-2 bg-slate-800 rounded-lg hover:text-white transition-all">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-slate-800 rounded-lg hover:text-white transition-all">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-slate-800 rounded-lg hover:text-white transition-all">
                <MessageSquare className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-6">Navigasi</h4>
            <ul className="space-y-4 text-sm">
              <li><a href="#" className="hover:text-blue-400 transition-all">Home</a></li>
              <li><a href="#tools" className="hover:text-blue-400 transition-all">Semua Tools</a></li>
              <li><a href="#about" className="hover:text-blue-400 transition-all">Tentang Kami</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-all">Kebijakan Privasi</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold mb-6">Hubungi Kami</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-blue-500" />
                <span>support@serbatools.id</span>
              </li>
              <li className="flex items-center gap-3 text-slate-400">
                <MessageSquare className="w-4 h-4 text-blue-500" />
                <span>Live Chat (Fast Response)</span>
              </li>
            </ul>
          </div>

          {/* Newsletter / Donation */}
          <div>
            <h4 className="text-white font-bold mb-6">Dukung Kami</h4>
            <p className="text-xs text-slate-400 mb-4 leading-relaxed">
              Bantu kami menjaga SerbaTools tetap gratis dengan memberikan donasi kecil.
            </p>
            <button className="w-full py-4 bg-white text-slate-900 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-blue-50 transition-all">
              <Heart className="w-4 h-4 text-pink-500 fill-pink-500" />
              Kirim Donasi
            </button>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 text-center">
          <p className="text-xs text-slate-500">
            © 2026 SerbaTools.id • Bangga Buatan Indonesia <span className="mx-2">|</span> Dibuat dengan <Heart className="w-3 h-3 inline text-pink-500 fill-pink-500 mx-0.5" /> untuk efisiensi Anda.
          </p>
        </div>
      </div>
    </footer>
  );
}
