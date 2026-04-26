import React from 'react';
import { Search } from 'lucide-react';

export default function SearchSection() {
  return (
    <section className="py-12 bg-white sticky top-16 z-40 shadow-sm border-b border-slate-100">
      <div className="max-w-3xl mx-auto px-4">
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
          </div>
          <input
            type="text"
            className="block w-full pl-11 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm"
            placeholder="Cari tools (Contoh: Invoice, PDF, QR Code...)"
          />
        </div>
      </div>
    </section>
  );
}
