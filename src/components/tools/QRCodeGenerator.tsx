import React from 'react';
import { ArrowLeft, QrCode as QrIcon, Download } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

export default function QRCodeGenerator({ onClose }: { onClose: () => void }) {
  const [text, setText] = React.useState<string>('https://serbatools.id');
  const [size, setSize] = React.useState<string>('256');

  const downloadQRCode = () => {
    const svg = document.querySelector('#qrcode-svg');
    if (!svg) return;
    const sizeNum = parseInt(size) || 256;
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.onload = () => {
      canvas.width = sizeNum;
      canvas.height = sizeNum;
      ctx?.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL('image/png');
      const downloadLink = document.createElement('a');
      downloadLink.download = 'serbatools-qrcode.png';
      downloadLink.href = pngFile;
      downloadLink.click();
    };
    img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
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
          <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center">
            <QrIcon className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">QR Code Generator</h1>
            <p className="text-slate-500">Buat QR Code untuk URL atau Teks.</p>
          </div>
        </div>

        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">URL atau Teks</label>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                rows={4}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all resize-none"
                placeholder="Masukkan URL atau teks di sini..."
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Ukuran (px)</label>
              <input
                type="number"
                value={size}
                onChange={(e) => setSize(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
              />
            </div>
          </div>

          <div className="flex flex-col items-center justify-center bg-slate-50 rounded-2xl p-8 border-2 border-dashed border-slate-200">
            <div className="bg-white p-4 rounded-2xl shadow-sm mb-6">
              <QRCodeSVG 
                id="qrcode-svg"
                value={text} 
                size={parseInt(size) || 256} 
                level="H"
                includeMargin={true}
              />
            </div>
            <button 
              onClick={downloadQRCode}
              className="px-6 py-3 bg-blue-600 text-white rounded-xl font-bold flex items-center gap-2 hover:bg-blue-700 transition-all shadow-lg shadow-blue-100"
            >
              <Download className="w-5 h-5" />
              Download PNG
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
