import React from 'react';
import { ArrowLeft, FileText, Plus, Trash2, Download } from 'lucide-react';
import { jsPDF } from 'jspdf';

interface Item {
  description: string;
  quantity: string;
  price: string;
}

export default function InvoiceGenerator({ onClose }: { onClose: () => void }) {
  const [clientName, setClientName] = React.useState('');
  const [invoiceNumber, setInvoiceNumber] = React.useState(`INV-${Date.now().toString().slice(-6)}`);
  const [items, setItems] = React.useState<Item[]>([{ description: '', quantity: '1', price: '' }]);

  const addItem = () => {
    setItems([...items, { description: '', quantity: '1', price: '' }]);
  };

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const updateItem = (index: number, field: keyof Item, value: string) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };
    setItems(newItems);
  };

  const calculateTotal = () => {
    return items.reduce((acc, item) => {
      const q = parseFloat(item.quantity) || 0;
      const p = parseFloat(item.price) || 0;
      return acc + (q * p);
    }, 0);
  };

  const total = calculateTotal();

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(22);
    doc.text('INVOICE', 105, 20, { align: 'center' });
    
    doc.setFontSize(12);
    doc.text(`Nomor: ${invoiceNumber}`, 20, 40);
    doc.text(`Tanggal: ${new Date().toLocaleDateString('id-ID')}`, 20, 48);
    doc.text(`Kepada: ${clientName || '(Nama Klien)'}`, 20, 56);

    let y = 70;
    doc.line(20, y, 190, y);
    y += 10;
    doc.text('Deskripsi', 25, y);
    doc.text('Qty', 120, y);
    doc.text('Harga', 140, y);
    doc.text('Subtotal', 170, y);
    y += 10;
    doc.line(20, y, 190, y);
    y += 10;

    items.forEach((item) => {
      const q = parseFloat(item.quantity) || 0;
      const p = parseFloat(item.price) || 0;
      doc.text(item.description || '-', 25, y);
      doc.text(item.quantity, 120, y);
      doc.text(p.toLocaleString('id-ID'), 140, y);
      doc.text((q * p).toLocaleString('id-ID'), 170, y);
      y += 10;
    });

    doc.line(20, y, 190, y);
    y += 10;
    doc.setFontSize(14);
    doc.text(`TOTAL: Rp ${total.toLocaleString('id-ID')}`, 190, y, { align: 'right' });

    doc.save(`Invoice-${invoiceNumber}.pdf`);
  };

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
          <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center">
            <FileText className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Invoice Generator</h1>
            <p className="text-slate-500">Buat invoice profesional cepat dan mudah.</p>
          </div>
        </div>

        <div className="p-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Nama Klien</label>
              <input
                type="text"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                placeholder="Nama Perusahaan/Individu..."
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Nomor Invoice</label>
              <input
                type="text"
                value={invoiceNumber}
                onChange={(e) => setInvoiceNumber(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-slate-900">Daftar Item</h3>
              <button 
                onClick={addItem}
                className="flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-700"
              >
                <Plus className="w-4 h-4" />
                Tambah Item
              </button>
            </div>

            <div className="space-y-4">
              {items.map((item, index) => (
                <div key={index} className="grid grid-cols-12 gap-3 items-center">
                  <div className="col-span-12 md:col-span-6">
                    <input
                      type="text"
                      placeholder="Deskripsi..."
                      value={item.description}
                      onChange={(e) => updateItem(index, 'description', e.target.value)}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                    />
                  </div>
                  <div className="col-span-4 md:col-span-2">
                    <input
                      type="number"
                      placeholder="Qty"
                      value={item.quantity}
                      onChange={(e) => updateItem(index, 'quantity', e.target.value)}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                    />
                  </div>
                  <div className="col-span-5 md:col-span-3">
                    <input
                      type="number"
                      placeholder="Harga"
                      value={item.price}
                      onChange={(e) => updateItem(index, 'price', e.target.value)}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                    />
                  </div>
                  <div className="col-span-3 md:col-span-1 flex justify-center">
                    <button 
                      onClick={() => removeItem(index)}
                      className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <span className="text-slate-500 text-sm">Total Keseluruhan</span>
              <p className="text-3xl font-black text-slate-900">Rp {total.toLocaleString('id-ID')}</p>
            </div>
            <button 
              onClick={generatePDF}
              className="w-full md:w-auto px-10 py-5 bg-blue-600 text-white rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-blue-700 transition-all shadow-lg shadow-blue-100"
            >
              <Download className="w-5 h-5" />
              Download PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
