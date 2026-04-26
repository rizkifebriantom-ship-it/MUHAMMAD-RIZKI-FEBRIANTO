import React from 'react';
import { ArrowLeft, FileImage, Upload, Download, Loader2, X } from 'lucide-react';
import * as pdfjsLib from 'pdfjs-dist';

// Configure PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

export default function PdfToJpg({ onClose }: { onClose: () => void }) {
  const [pdfFile, setPdfFile] = React.useState<File | null>(null);
  const [images, setImages] = React.useState<string[]>([]);
  const [loading, setLoading] = React.useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPdfFile(e.target.files[0]);
      setImages([]);
    }
  };

  const convertPdfToImages = async () => {
    if (!pdfFile) return;
    setLoading(true);
    try {
      const arrayBuffer = await pdfFile.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      const imageUrls: string[] = [];

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: 2 });
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        if (context) {
          await page.render({ canvasContext: context, viewport } as any).promise;
          imageUrls.push(canvas.toDataURL('image/jpeg', 0.8));
        }
      }
      setImages(imageUrls);
    } catch (error) {
      console.error(error);
      alert('Gagal mengekstrak gambar dari PDF.');
    } finally {
      setLoading(false);
    }
  };

  const downloadAll = () => {
    images.forEach((url, idx) => {
      const link = document.createElement('a');
      link.href = url;
      link.download = `page-${idx + 1}.jpg`;
      link.click();
    });
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
          <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center">
            <FileImage className="w-6 h-6 text-orange-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">PDF to JPG</h1>
            <p className="text-slate-500">Ekstrak setiap halaman PDF menjadi gambar.</p>
          </div>
        </div>

        <div className="p-8">
          {!pdfFile ? (
            <label className="flex flex-col items-center justify-center h-48 border-2 border-dashed border-slate-200 rounded-3xl bg-slate-50 hover:bg-blue-50 hover:border-blue-200 transition-all cursor-pointer group">
              <Upload className="w-10 h-10 text-slate-400 mb-4 group-hover:text-blue-500 transition-colors" />
              <span className="text-slate-600 font-bold">Pilih File PDF</span>
              <input type="file" onChange={handleFileChange} className="hidden" accept="application/pdf" />
            </label>
          ) : (
            <div className="space-y-6">
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm">
                    <FileImage className="w-6 h-6 text-orange-500" />
                  </div>
                  <p className="font-bold text-slate-800">{pdfFile.name}</p>
                </div>
                <button onClick={() => setPdfFile(null)} className="text-red-500 hover:text-red-700">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {images.length === 0 ? (
                <button 
                  onClick={convertPdfToImages}
                  disabled={loading}
                  className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-blue-700 transition-all"
                >
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Ekstrak Halaman'}
                </button>
              ) : (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {images.map((img, idx) => (
                      <div key={idx} className="relative aspect-[3/4] bg-slate-100 rounded-xl overflow-hidden shadow-sm">
                        <img src={img} className="w-full h-full object-cover" alt={`page ${idx + 1}`} />
                        <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-[10px] py-1 text-center font-bold">
                          Hal {idx + 1}
                        </div>
                      </div>
                    ))}
                  </div>
                  <button 
                    onClick={downloadAll}
                    className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-blue-700 transition-all shadow-lg shadow-blue-100"
                  >
                    <Download className="w-5 h-5" />
                    Download Semua JPG
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
