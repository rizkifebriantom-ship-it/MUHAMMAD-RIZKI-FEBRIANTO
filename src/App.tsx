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

export default function App() {
  return (
    <div className="min-h-screen bg-white font-sans selection:bg-blue-100 selection:text-blue-900">
      <Navbar />
      
      <main>
        <Hero />
        <SearchSection />
        <ToolsGrid />
        <WhyChooseUs />
        <FAQ />
      </main>

      <Footer />
    </div>
  );
}

