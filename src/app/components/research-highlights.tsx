
import { motion } from 'motion/react';

export const ResearchHighlights = () => {
  return (
    <section className="w-full py-20 px-6 bg-[#0a0e27]">
      <div className="max-w-[1200px] mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-white text-4xl md:text-5xl font-bold mb-16"
        >
          Research Highlights
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-[900px] mx-auto bg-[#1e1b4b] border border-[#334155] rounded-xl p-12 text-left shadow-2xl"
        >
          <p className="text-[#f8fafc] text-xl md:text-2xl leading-relaxed">
            "The study shows that API cascading introduces a{' '}
            <span className="bg-[#3b82f640] px-2 py-1 rounded inline-block">
              48.6% latency penalty
            </span>{' '}
            in typical multi-hop chains and creates an{' '}
            <span className="relative inline-block">
              auditability vacuum
              <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-[#ef4444]" />
            </span>{' '}
            that conventional monitoring misses."
          </p>
        </motion.div>
      </div>
    </section>
  );
};
