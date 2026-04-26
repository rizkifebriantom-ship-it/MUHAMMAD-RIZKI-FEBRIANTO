import React from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
  {
    question: 'Apakah tools ini benar-benar gratis?',
    answer: 'Ya, semua tools di SerbaTools.id 100% gratis selamanya. Kami mendanai operasional melalui donasi dari pengguna yang merasa terbantu.',
  },
  {
    question: 'Apa file saya aman?',
    answer: 'Keamanan adalah prioritas kami. Hampir semua tools kami memproses data di sisi klien (browser Anda). Artinya, file Anda tidak pernah diunggah ke server kami.',
  },
  {
    question: 'Berapa banyak file yang bisa saya kompres/ubah?',
    answer: 'Tidak ada batasan harian. Anda bisa menggunakan tools kami sebanyak yang Anda butuhkan tanpa batasan jumlah file.',
  },
  {
    question: 'Bagaimana cara berdonasi?',
    answer: 'Anda bisa klik tombol "Donasi" di bagian atas halaman atau Footer. Kami menerima berbagai metode pembayaran digital seperti QRIS, GoPay, dan OVO.',
  },
];

interface FAQProps {
  question: string;
  answer: string;
}

function FAQItem({ question, answer }: FAQProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="border-b border-slate-100 last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex items-center justify-between text-left group"
      >
        <span className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
          {question}
        </span>
        <ChevronDown
          className={`w-5 h-5 text-slate-400 transition-transform ${
            isOpen ? 'rotate-180 text-blue-600' : ''
          }`}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-slate-600 leading-relaxed italic border-l-2 border-blue-100 pl-4">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  return (
    <section className="py-24 bg-slate-50/50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Pertanyaan Umum</h2>
          <p className="text-slate-600">Punya pertanyaan? Cari jawabannya di sini.</p>
        </div>

        <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
          {faqs.map((faq, index) => (
            <div key={index}>
              <FAQItem question={faq.question} answer={faq.answer} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
