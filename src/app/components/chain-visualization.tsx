import { motion } from 'motion/react';
import { User, Server, Cloud } from 'lucide-react';

const Node = ({ icon: Icon, label, delay = 0 }: { icon: any, label: string, delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    className="flex flex-col items-center gap-4"
  >
    <div className="w-20 h-20 rounded-full bg-[#1e1b4b] border-2 border-[#3b82f6] flex items-center justify-center shadow-lg shadow-[#3b82f6]/20">
      <Icon className="text-white" size={32} />
    </div>
    <span className="text-[#f8fafc] text-sm font-medium">{label}</span>
  </motion.div>
);

const AnimatedLine = ({ delay = 0 }: { delay?: number }) => (
  <div className="relative flex-1 h-[2px] bg-[#334155] mx-2 self-start mt-10">
    <motion.div
      initial={{ width: 0 }}
      whileInView={{ width: '100%' }}
      viewport={{ once: true }}
      transition={{ duration: 1.5, delay }}
      className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#3b82f6] to-[#06b6d4]"
    />
    {[0, 1, 2].map((i) => (
      <motion.div
        key={i}
        animate={{
          left: ['0%', '100%'],
          opacity: [0, 1, 0]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          delay: delay + (i * 0.6),
          ease: "linear"
        }}
        className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]"
      />
    ))}
  </div>
);

export const ChainVisualization = () => {
  return (
    <section className="w-full py-20 px-6 bg-[#0a0e27]">
      <div className="max-w-[1200px] mx-auto overflow-x-auto scrollbar-hide">
        <div className="flex items-center justify-between min-w-[800px] pb-10 px-4">
          <Node icon={User} label="USER" delay={0} />
          <AnimatedLine delay={0.3} />
          <Node icon={Server} label="WEB2" delay={0.6} />
          <AnimatedLine delay={0.9} />
          <Node icon={Server} label="WEB1" delay={1.2} />
          <AnimatedLine delay={1.5} />
          <Node icon={Cloud} label="PROVIDER A" delay={1.8} />
        </div>
      </div>
    </section>
  );
};
