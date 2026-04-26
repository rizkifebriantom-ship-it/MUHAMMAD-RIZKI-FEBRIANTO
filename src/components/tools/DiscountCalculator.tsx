import React from 'react';
import { ArrowLeft, Calculator as CalcIcon } from 'lucide-react';

export default function DiscountCalculator({ onClose }: { onClose: () => void }) {
  const [price, setPrice] = React.useState<string>('');
  const [discount, setDiscount] = React.useState<string>('');
  const [finalPrice, setFinalPrice] = React.useState<number>(0);
  const [savings, setSavings] = React.useState<number>(0);

  React.useEffect(() => {
    const p = parseFloat(price) || 0;
    const d = parseFloat(discount) || 0;
    const discountAmount = (p * d) / 100;
    setFinalPrice(p - discountAmount);
    setSavings(discountAmount);
  }, [price, discount]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <button 
        onClick={onClose}
        className="flex items-center gap-2 text-slate-600 hover:text-blue-600 mb-8 transition-colors font-medium"
      >
        <ArrowLeft className="w-5 h-5" />
        Kembali ke Beranda
      </button>

      <div className="bg-white rounded-3xl border border-slate-100 shadow-xl overflow-hidden">
        <div className="p-8 border-b border-slate-50 bg-slate-50/50 flex items-center gap-4">
          <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center">
            <CalcIcon className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Kalkulator Diskon</h1>
            <p className="text-slate-500">Hitung potongan harga dengan mudah.</p>
          </div>
        </div>

        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Harga Awal (Rp)</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                placeholder="Masukkan harga..."
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Diskon (%)</label>
              <input
                type="number"
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                placeholder="Masukkan persen diskon..."
              />
            </div>
          </div>

          <div className="bg-blue-50 rounded-2xl p-8 flex flex-col justify-center">
            <div className="mb-6">
              <span className="text-sm font-bold text-blue-600 uppercase tracking-wider">Harga Akhir</span>
              <div className="text-4xl font-black text-slate-900 mt-1">
                Rp {finalPrice.toLocaleString('id-ID')}
              </div>
            </div>
            <div>
              <span className="text-sm font-bold text-green-600 uppercase tracking-wider">Hemat</span>
              <div className="text-2xl font-bold text-slate-700 mt-1">
                Rp {savings.toLocaleString('id-ID')}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
