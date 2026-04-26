import React from 'react';
import { 
  FileText, 
  Calculator, 
  QrCode, 
  FileImage, 
  FileOutput, 
  Image as ImageIcon,
  ArrowUpRight
} from 'lucide-react';
import { motion } from 'framer-motion';

const tools = [
  {
    title: 'Invoice Generator',
    description: 'Buat invoice profesional secara instan dengan PDF downloader.',
    icon: <FileText className="w-6 h-6 text-blue-500" />,
    tag: 'Bisnis',
  },
  {
    title: 'Kalkulator Diskon',
    description: 'Hitung potongan harga dan harga akhir dengan cepat.',
    icon: <Calculator className="w-6 h-6 text-green-500" />,
    tag: 'Utility',
  },
  {
    title: 'QR Code Generator',
    description: 'Buat QR Code untuk URL, WhatsApp, atau WiFi gratis.',
    icon: <QrCode className="w-6 h-6 text-purple-500" />,
    tag: 'Marketing',
  },
  {
    title: 'JPG to PDF',
    description: 'Ubah file gambar JPG ke dokumen PDF berkualitas tinggi.',
    icon: <FileOutput className="w-6 h-6 text-red-500" />,
    tag: 'File',
  },
  {
    title: 'PDF to JPG',
    description: 'Ekstrak halaman PDF menjadi gambar JPG dengan mudah.',
    icon: <FileImage className="w-6 h-6 text-orange-500" />,
    tag: 'File',
  },
  {
    title: 'Kompres Gambar',
    description: 'Kecilkan ukuran file gambar tanpa mengurangi kualitas.',
    icon: <ImageIcon className="w-6 h-6 text-cyan-500" />,
    tag: 'Utility',
  },
];

export default function ToolsGrid() {
  return (
    <section id="tools" className="py-24 bg-slate-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Tools Populer</h2>
            <p className="text-slate-600">Paling banyak digunakan oleh ribuan pengguna setiap hari.</p>
          </div>
          <button className="hidden sm:flex items-center gap-2 text-blue-600 font-semibold hover:gap-3 transition-all">
            Lihat Semua Tools
            <ArrowUpRight className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tools.map((tool, index) => (
            <motion.div
              key={tool.title}
              whileHover={{ y: -8 }}
              className="group bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:border-blue-100 transition-all cursor-pointer"
            >
              <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-50 transition-colors">
                {tool.icon}
              </div>
              <div className="inline-flex px-3 py-1 rounded-full bg-slate-100 text-slate-500 text-xs font-bold uppercase tracking-wider mb-4 group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors">
                {tool.tag}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                {tool.title}
              </h3>
              <p className="text-slate-600 leading-relaxed mb-6">
                {tool.description}
              </p>
              <div className="flex items-center gap-2 text-sm font-bold text-blue-600 opacity-0 group-hover:opacity-100 transition-all">
                Gunakan Tool
                <ArrowUpRight className="w-4 h-4 ml-1" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
