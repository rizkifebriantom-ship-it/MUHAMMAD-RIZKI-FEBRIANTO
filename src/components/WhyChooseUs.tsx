import React from 'react';
import { Zap, ShieldCheck, Heart, Smartphone } from 'lucide-react';

const features = [
  {
    title: '100% Gratis',
    description: 'Semua tools kami bisa Anda gunakan sepenuhnya gratis tanpa biaya tersembunyi.',
    icon: <Heart className="w-8 h-8 text-pink-500" />,
  },
  {
    title: 'Super Cepat',
    description: 'Proses file dilakukan langsung di browser Anda. Tidak perlu menunggu lama.',
    icon: <Zap className="w-8 h-8 text-yellow-500" />,
  },
  {
    title: 'Aman & Privat',
    description: 'File Anda tidak pernah disimpan di server kami. Privasi Anda prioritas utama.',
    icon: <ShieldCheck className="w-8 h-8 text-green-500" />,
  },
  {
    title: 'Mobile Friendly',
    description: 'Akses tools kami dengan nyaman melalui HP, tablet, maupun komputer Anda.',
    icon: <Smartphone className="w-8 h-8 text-blue-500" />,
  },
];

export default function WhyChooseUs() {
  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Kenapa Pilih SerbaTools?</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">Kami berkomitmen menghadirkan pengalaman terbaik dalam mengelola kebutuhan digital harian Anda.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <div key={feature.title} className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-lg transition-all text-center">
              <div className="inline-flex w-16 h-16 items-center justify-center bg-white rounded-2xl shadow-sm mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
