import { motion } from 'motion/react';
import { ParticleBackground } from './particle-background';

export const Hero = () => {
  return (
    <section className="relative w-full h-screen flex flex-col items-center justify-center bg-[#0a0e27] overflow-hidden px-6 pt-20">
      <div className="absolute inset-0 bg-gradient-to-b from-[#1e1b4b] to-transparent opacity-40 z-0" />
      <ParticleBackground />

      <div className="relative z-10 text-center max-w-[1200px] mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-[#f8fafc] text-4xl md:text-7xl font-bold mb-2"
        >
          The Cascading Effects of
        </motion.h1>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-[#06b6d4] text-4xl md:text-7xl font-bold mb-8"
        >
          Repackaged APIs
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-[#94a3b8] text-lg md:text-xl max-w-[800px] mx-auto mb-12 leading-relaxed"
        >
          An interactive research demonstration exploring how API cascading creates latency penalties,
          security vulnerabilities, and economic distortions.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-12"
        >
          <div className="text-[#94a3b8] text-base mb-2">
            Tejas Prasad | 17-year-old Independent Researcher
          </div>
          <div className="text-[#64748b] text-sm font-medium">
            415+ views • 20+ downloads • SSRN Published
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button
            onClick={() => document.getElementById('demos')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-10 py-3 bg-[#3b82f6] text-white font-bold rounded-lg hover:bg-[#2563eb] transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg shadow-[#3b82f6]/20"
          >
            Try Interactive Demo
          </button>
          <button
            onClick={() => document.getElementById('methodology')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-10 py-3 bg-transparent border-2 border-[#3b82f6] text-[#3b82f6] font-bold rounded-lg hover:bg-[#3b82f6]/10 transition-all duration-300"
          >
            Explore Methodology
          </button>
        </motion.div>
      </div>
    </section>
  );
};
