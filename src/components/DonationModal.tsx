import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, Copy, CheckCircle2 } from 'lucide-react';

export default function DonationModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [copied, setCopied] = React.useState(false);
  const danaNumber = '085664264936';

  const copyToClipboard = () => {
    navigator.clipboard.writeText(danaNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden"
          >
            <div className="p-6 border-b border-slate-50 flex justify-between items-center bg-blue-50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                  <Heart className="w-5 h-5 text-blue-600 fill-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Dukung SerbaTools</h3>
              </div>
              <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-8 space-y-6">
              <div className="text-center">
                <p className="text-slate-600 leading-relaxed">
                  Donasi Anda membantu kami tetap online dan gratis. Mendukung <strong>Semua Bank & E-Wallet</strong>.
                </p>
              </div>

              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 italic text-center">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-4">Scan QRIS (Semua Bank / E-Wallet)</span>
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 inline-block">
                  <img 
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=https://link.dana.id/qr/8u7m9qf`} 
                    alt="QRIS DANA" 
                    className="w-48 h-48"
                  />
                  <div className="mt-4 flex flex-col items-center">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/e/eb/Logo_QRIS.svg" alt="QRIS" className="h-6 mb-2" />
                    <span className="text-[10px] text-slate-400">Terima transfer dari semua bank (BCA, Mandiri, BNI, dll)</span>
                  </div>
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col items-center gap-3">
                <span className="text-xs font-bold text-slate-400 uppercase">Input Manual DANA</span>
                <span className="text-2xl font-black text-slate-900 tracking-wider font-mono">{danaNumber}</span>
                <button 
                  onClick={copyToClipboard}
                  className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-full text-sm font-bold hover:bg-blue-700 transition-all shadow-md shadow-blue-100"
                >
                  {copied ? <><CheckCircle2 className="w-4 h-4" /> Berhasil Salin</> : <><Copy className="w-4 h-4" /> Salin Nomor DANA</>}
                </button>
              </div>

              <div className="text-center pt-2">
                <p className="text-xs text-slate-400">
                  Semua donasi akan digunakan untuk biaya server dan pengembangan fitur baru.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
