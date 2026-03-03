import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/navbar';
import { Hero } from './components/hero';
import { ChainVisualization } from './components/chain-visualization';
import { ResearchHighlights } from './components/research-highlights';
import { ProblemCards } from './components/problem-cards';
import { DemoCards } from './components/demo-cards';
import { Footer } from './components/footer';
import { LatencySimulator } from './pages/LatencySimulator';
import { SecurityDemo } from './pages/SecurityDemo';
import { EconomicCalculator } from './pages/EconomicCalculator';
import { Methodology } from './pages/Methodology';
import { About } from './pages/About';
import { ChainBuilder } from './pages/ChainBuilder';
import { ApiTestingLab } from './demos/api-testing-lab/page';


const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const HomePage = () => (
  <main>
    <Hero />
    <div id="methodology">
      <ChainVisualization />
      <ResearchHighlights />
    </div>
    <ProblemCards />
    <div id="demos">
      <DemoCards />
    </div>
  </main>
);

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen bg-[#0a0e27] font-['Inter',_sans-serif] selection:bg-[#3b82f6]/30 selection:text-white">
        <Navbar />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/demos/latency-simulator" element={<LatencySimulator />} />
          <Route path="/demos/security-demo" element={<SecurityDemo />} />
          <Route path="/demos/economic-calculator" element={<EconomicCalculator />} />
          <Route path="/demos/api-testing-lab" element={<ApiTestingLab />} />
          <Route path="/chain-builder" element={<ChainBuilder />} />
          <Route path="/methodology" element={<Methodology />} />
          <Route path="/about" element={<About />} />
        </Routes>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
