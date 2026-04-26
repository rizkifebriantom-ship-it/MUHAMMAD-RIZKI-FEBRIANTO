import React from 'react';
import { ArrowLeft, FileOutput, Upload, Download, Loader2, X } from 'lucide-react';
import { jsPDF } from 'jspdf';

export default function JpgToPdf({ onClose }: { onClose: () => void }) {
  const [images, setImages] = React.useState<File[]>([]);
  const [loading, setLoading] = React.useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages([...images, ...Array.from(e.target.files)]);
    }
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const convertToPdf = async () => {
    if (images.length === 0) return;
    setLoading(true);
    try {
      const pdf = new jsPDF();
      
      for (let i = 0; i < images.length; i++) {
        const imgData = await new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onload = (e) => resolve(e.target?.result as string);
          reader.readAsDataURL(images[i]);
        });
        
        if (i > 0) pdf.addPage();
        
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        
        pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
      }
      
      pdf.save('serbatools-converted.pdf');
    } catch (error) {
      console.error(error);
      alert('Gagal konversi ke PDF.');
    } finally {
      setLoading(false);
    }
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
          <div className="w-12 h-12 bg-red-100 rounded-2xl flex items-center justify-center">
            <FileOutput className="w-6 h-6 text-red-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">JPG to PDF</h1>
            <p className="text-slate-500">Ubah banyak gambar menjadi satu file PDF.</p>
          </div>
        </div>

        <div className="p-8">
          <label className="flex flex-col items-center justify-center h-48 border-2 border-dashed border-slate-200 rounded-3xl bg-slate-50 hover:bg-blue-50 hover:border-blue-200 transition-all cursor-pointer group mb-8">
            <Upload className="w-10 h-10 text-slate-400 mb-4 group-hover:text-blue-500 transition-colors" />
            <span className="text-slate-600 font-bold">Tambah Gambar</span>
            <input type="file" onChange={handleFileChange} className="hidden" accept="image/jpeg,image/jpg" multiple />
          </label>

          {images.length > 0 && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
                {images.map((img, idx) => (
                  <div key={idx} className="relative aspect-square bg-slate-100 rounded-xl overflow-hidden group">
                    <img src={URL.createObjectURL(img)} className="w-full h-full object-cover" alt="preview" />
                    <button 
                      onClick={() => removeImage(idx)}
                      className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="pt-8 border-t border-slate-100 flex justify-end">
                <button 
                  onClick={convertToPdf}
                  disabled={loading}
                  className="px-10 py-5 bg-blue-600 text-white rounded-2xl font-bold flex items-center gap-3 hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 disabled:opacity-50"
                >
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Download className="w-5 h-5" /> Konversi Sekarang</>}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
