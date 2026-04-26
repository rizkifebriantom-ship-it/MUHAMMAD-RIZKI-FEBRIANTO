/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SearchSection from './components/SearchSection';
import ToolsGrid from './components/ToolsGrid';
import WhyChooseUs from './components/WhyChooseUs';
import FAQ from './components/FAQ';
import Footer from './components/Footer';

// Tool Components
import DiscountCalculator from './components/tools/DiscountCalculator';
import QRCodeGenerator from './components/tools/QRCodeGenerator';
import ImageCompressor from './components/tools/ImageCompressor';
import InvoiceGenerator from './components/tools/InvoiceGenerator';
import JpgToPdf from './components/tools/JpgToPdf';
import PdfToJpg from './components/tools/PdfToJpg';

export default function App() {
  const [activeTool, setActiveTool] = React.useState<string | null>(null);
  const [searchTerm, setSearchTerm] = React.useState('');

  const renderTool = () => {
    switch (activeTool) {
      case 'Kalkulator Diskon':
        return <DiscountCalculator onClose={() => setActiveTool(null)} />;
      case 'QR Code Generator':
        return <QRCodeGenerator onClose={() => setActiveTool(null)} />;
      case 'Kompres Gambar':
        return <ImageCompressor onClose={() => setActiveTool(null)} />;
      case 'Invoice Generator':
        return <InvoiceGenerator onClose={() => setActiveTool(null)} />;
      case 'JPG to PDF':
        return <JpgToPdf onClose={() => setActiveTool(null)} />;
      case 'PDF to JPG':
        return <PdfToJpg onClose={() => setActiveTool(null)} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-blue-100 selection:text-blue-900">
      <Navbar />
      
      {!activeTool ? (
        <main>
          <Hero />
          <SearchSection searchTerm={searchTerm} onSearch={setSearchTerm} />
          <ToolsGrid searchTerm={searchTerm} onSelectTool={(tool) => setActiveTool(tool)} />
          <WhyChooseUs />
          <FAQ />
        </main>
      ) : (
        <div className="pt-20">
          {renderTool()}
        </div>
      )}

      <Footer />
    </div>
  );
}

