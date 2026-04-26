import React from 'react';
import { ArrowLeft, Image as ImageIcon, Upload, FileCheck, Loader2 } from 'lucide-react';
import imageCompression from 'browser-image-compression';

export default function ImageCompressor({ onClose }: { onClose: () => void }) {
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const [compressedFile, setCompressedFile] = React.useState<File | null>(null);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [quality, setQuality] = React.useState<number>(0.8);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      setCompressedFile(null);
    }
  };

  const compressImage = async () => {
    if (!selectedFile) return;
    setLoading(true);
    try {
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
        initialQuality: quality,
      };
      const result = await imageCompression(selectedFile, options);
      setCompressedFile(result);
    } catch (error) {
      console.error(error);
      alert('Gagal mengompres gambar.');
    } finally {
      setLoading(false);
    }
  };

  const downloadImage = () => {
    if (!compressedFile) return;
    const url = URL.createObjectURL(compressedFile);
    const link = document.createElement('a');
    link.href = url;
    link.download = `compressed-${selectedFile?.name}`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
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
          <div className="w-12 h-12 bg-cyan-100 rounded-2xl flex items-center justify-center">
            <ImageIcon className="w-6 h-6 text-cyan-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Kompres Gambar</h1>
            <p className="text-slate-500">Kecilkan ukuran gambar tanpa pecah.</p>
          </div>
        </div>

        <div className="p-8">
          {!selectedFile ? (
            <label className="flex flex-col items-center justify-center h-64 border-2 border-dashed border-slate-200 rounded-3xl bg-slate-50 hover:bg-blue-50 hover:border-blue-200 transition-all cursor-pointer group">
              <Upload className="w-10 h-10 text-slate-400 mb-4 group-hover:text-blue-500 transition-colors" />
              <span className="text-slate-600 font-bold">Pilih atau Seret Gambar ke Sini</span>
              <span className="text-slate-400 text-sm mt-1">Mendukung JPG, PNG, WebP</span>
              <input type="file" onChange={handleFileChange} className="hidden" accept="image/*" />
            </label>
          ) : (
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-4">File Asli</span>
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center shadow-sm">
                      <ImageIcon className="w-8 h-8 text-slate-300" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-800 line-clamp-1">{selectedFile.name}</p>
                      <p className="text-slate-500 text-sm">{formatSize(selectedFile.size)}</p>
                    </div>
                  </div>
                </div>

                {compressedFile && (
                  <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
                    <span className="text-xs font-bold text-blue-400 uppercase tracking-widest block mb-4">Hasil Kompresi</span>
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center shadow-sm">
                        <FileCheck className="w-8 h-8 text-blue-500" />
                      </div>
                      <div>
                        <p className="font-bold text-blue-800">Siap Diunduh</p>
                        <p className="text-blue-600 text-sm">{formatSize(compressedFile.size)} ({Math.round((1 - compressedFile.size / selectedFile.size) * 100)}% lebih kecil)</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 border-t border-slate-100">
                {!compressedFile ? (
                  <>
                    <div className="flex-1 w-full">
                      <label className="block text-sm font-bold text-slate-700 mb-2">Kualitas: {Math.round(quality * 100)}%</label>
                      <input 
                        type="range" 
                        min="0.1" 
                        max="1" 
                        step="0.1" 
                        value={quality} 
                        onChange={(e) => setQuality(Number(e.target.value))}
                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                      />
                    </div>
                    <button 
                      onClick={compressImage}
                      disabled={loading}
                      className="w-full sm:w-auto px-8 py-4 bg-blue-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-blue-700 transition-all disabled:opacity-50"
                    >
                      {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Mulai Kompres'}
                    </button>
                  </>
                ) : (
                  <div className="flex gap-4 w-full">
                    <button 
                      onClick={downloadImage}
                      className="flex-1 px-8 py-4 bg-blue-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-blue-700 transition-all shadow-lg shadow-blue-100"
                    >
                      Download Gambar
                    </button>
                    <button 
                      onClick={() => { setSelectedFile(null); setCompressedFile(null); }}
                      className="px-8 py-4 bg-slate-100 text-slate-600 rounded-2xl font-bold hover:bg-slate-200 transition-all"
                    >
                      Batal
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
