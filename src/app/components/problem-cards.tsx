
import { motion } from 'motion/react';
import { Clock, Shield, DollarSign } from 'lucide-react';

const problems = [
  {
    icon: Clock,
    color: '#3b82f6',
    title: 'Latency Penalties',
    description: 'Each middleware layer adds propagation delay, serialization time, and processing overhead that compounds across the chain.'
  },
  {
    icon: Shield,
    color: '#ef4444',
    title: 'Security Vulnerabilities',
    description: 'The auditability vacuum hides malicious actors inside aggregated traffic, weakening conventional defense systems.'
  },
  {
    icon: DollarSign,
    color: '#10b981',
    title: 'Economic Distortion',
    description: 'Arbitrage creates short-term savings but reduces provider incentives to innovate and invest in performance.'
  }
];

export const ProblemCards = () => {
  return (
    <section className="w-full py-20 px-6 bg-[#0a0e27]">
      <div className="max-w-[1200px] mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-white text-4xl md:text-5xl font-bold mb-16"
        >
          Cascading APIs Mask the Real Cost
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {problems.map((prob, idx) => (
            <motion.div
              key={prob.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -4, borderColor: '#3b82f6' }}
              className="bg-[#1e1b4b] border border-[#334155] rounded-xl p-8 text-left transition-all duration-300 hover:shadow-2xl hover:shadow-[#3b82f6]/10 cursor-default"
            >
              <div className="mb-6 p-3 rounded-lg bg-[#0a0e27] w-fit">
                <prob.icon size={48} style={{ color: prob.color }} />
              </div>
              <h3 className="text-white text-2xl font-bold mb-4">{prob.title}</h3>
              <p className="text-[#94a3b8] text-base leading-relaxed">
                {prob.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
