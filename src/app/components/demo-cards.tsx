
import { motion } from 'framer-motion';
import { Activity, ShieldAlert, Calculator, ArrowRight, BeakerIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

const demos = [
  {
    icon: <Activity className="w-8 h-8 text-[#3b82f6]" />,
    color: 'from-[#3b82f6]/20 to-[#60a5fa]/20',
    border: 'border-[#3b82f6]/50',
    title: 'Latency Simulator',
    description: 'Visualize the cascading latency formula in real-time with multi-hop comparisons.',
    path: '/demos/latency-simulator'
  },
  {
    icon: <ShieldAlert className="w-8 h-8 text-[#ef4444]" />,
    color: 'from-[#ef4444]/20 to-[#f87171]/20',
    border: 'border-[#ef4444]/50',
    title: 'Security Demo',
    description: 'See the auditability vacuum unfold and how detection accuracy collapses.',
    path: '/demos/security-demo'
  },
  {
    title: 'Economic Calculator',
    description: 'Model the financial implications of API aggregation, token economics, and arbitrage.',
    icon: <Calculator className="w-8 h-8 text-[#a855f7]" />,
    path: '/demos/economic-calculator',
    color: 'from-[#a855f7]/20 to-[#d946ef]/20',
    border: 'border-[#a855f7]/50'
  },
  {
    title: 'API Testing Lab',
    description: 'Live latency analysis and comparison for direct vs cascaded API requests.',
    icon: <BeakerIcon className="w-8 h-8 text-[#3b82f6]" />,
    path: '/demos/api-testing-lab',
    color: 'from-[#3b82f6]/20 to-[#60a5fa]/20',
    border: 'border-[#3b82f6]/50'
  }
];

export const DemoCards = () => {
  return (
    <section id="demos" className="w-full py-20 px-6 bg-[#0a0e27]">
      <div className="max-w-[1200px] mx-auto text-center">
        <div className="mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-[#94a3b8] text-sm uppercase tracking-[2px] font-medium"
          >
            Interactive
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-white text-4xl md:text-5xl font-bold mt-2"
          >
            Demos Built for Evidence
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {demos.map((demo, idx) => (
            <motion.div
              key={demo.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{
                scale: 1.02,
                backgroundColor: 'rgba(59, 130, 246, 0.05)'
              }}
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
                e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
              }}
              className="group bg-[#1e1b4b] border border-[#334155] rounded-xl p-8 text-left transition-all duration-300 relative overflow-hidden h-[320px] flex flex-col"
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: `radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), ${demo.color} 15%, transparent 40%)`
                }}
              />

              <div className="mb-6">
                {demo.icon}
              </div>
              <h3 className="text-white text-2xl font-bold mb-4">{demo.title}</h3>
              <p className="text-[#94a3b8] text-base leading-relaxed mb-auto">
                {demo.description}
              </p>

              <Link to={demo.path} className="mt-6 flex items-center gap-2 text-[#3b82f6] text-sm font-bold uppercase tracking-wider border border-[#3b82f6] px-4 py-2 rounded-md w-fit hover:bg-[#3b82f6]/20 transition-all">
                Launch Demo <ArrowRight size={16} />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
