import { motion } from 'motion/react';
import { FileText, Search, Code, Scale, Info, CheckCircle, AlertTriangle } from 'lucide-react';

export const Methodology = () => {
  return (
    <div className="min-h-screen bg-[#0a0e27] pt-24 pb-12 px-6">
      <div className="max-w-[900px] mx-auto">
        <div className="mb-16 text-center">
          <h1 className="text-[#f8fafc] text-4xl md:text-6xl font-bold mb-6">Research Methodology</h1>
          <p className="text-[#94a3b8] text-xl">How this research was conducted</p>
        </div>

        {/* Section 1 */}
        <div className="bg-[#1e1b4b] border-l-4 border-[#3b82f6] border border-[#334155] rounded-r-xl p-10 mb-12">
          <h2 className="text-white text-3xl font-bold mb-6">Research Overview</h2>
          <div className="text-[#94a3b8] text-lg leading-relaxed space-y-6">
            <p>
              This research explores the technical, security, and economic implications of "API Cascading" — the practice where middleware providers repackage upstream APIs and resell them to downstream users.
            </p>
            <p>
              The study employs a multi-disciplinary approach, combining conceptual technical modeling, mathematical latency analysis, and a review of the current legal landscape surrounding the Computer Fraud and Abuse Act (CFAA).
            </p>
          </div>
        </div>

        {/* Section 2 */}
        <div className="bg-[#1e1b4b] border-l-4 border-[#06b6d4] border border-[#334155] rounded-r-xl p-10 mb-12">
          <h2 className="text-white text-3xl font-bold mb-6">Mirror API Theory</h2>
          <div className="text-[#94a3b8] text-lg leading-relaxed mb-8">
            <p>
              The central framework developed in this paper is the "Mirror API Theory," which posits that every layer of repackaging creates a degraded "mirror" of the original service.
            </p>
          </div>
          <div className="flex items-center justify-between bg-[#0a0e27] p-8 rounded-xl">
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded bg-[#10b981] mb-2" />
              <div className="text-white text-xs font-bold">Original API</div>
              <div className="text-[#10b981] text-[10px]">100% Quality</div>
            </div>
            <div className="text-[#334155]">→</div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded bg-[#f59e0b] mb-2" />
              <div className="text-white text-xs font-bold">Mirror 1</div>
              <div className="text-[#f59e0b] text-[10px]">80% Quality</div>
            </div>
            <div className="text-[#334155]">→</div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded bg-[#fb923c] mb-2" />
              <div className="text-white text-xs font-bold">Mirror 2</div>
              <div className="text-[#fb923c] text-[10px]">60% Quality</div>
            </div>
            <div className="text-[#334155]">→</div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded bg-[#ef4444] mb-2" />
              <div className="text-white text-xs font-bold">Mirror 3</div>
              <div className="text-[#ef4444] text-[10px]">40% Quality</div>
            </div>
          </div>
        </div>

        {/* Section 3 */}
        <div className="bg-[#0a0e27] border-2 border-[#3b82f6] rounded-2xl p-12 mb-12 text-center">
          <h2 className="text-white text-3xl font-bold mb-8">Cascading Latency Formula</h2>
          <div className="bg-[#1e1b4b] p-8 rounded-xl mb-12">
            <code className="text-[#3b82f6] text-3xl font-['JetBrains_Mono']">
              Lt = Σ(Pk + Sk + Ik) for k=1 to n
            </code>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
            {[
              { label: 'Lt', desc: 'Total Latency' },
              { label: 'P', desc: 'Propagation Delay' },
              { label: 'S', desc: 'Serialization Time' },
              { label: 'I', desc: 'Internal Processing' },
              { label: 'k', desc: 'Current hop number' },
              { label: 'n', desc: 'Total hops' }
            ].map((v) => (
              <div key={v.label} className="bg-[#1e1b4b] border border-[#334155] p-4 rounded-lg">
                <span className="text-[#3b82f6] font-bold text-lg mr-2">{v.label}</span>
                <span className="text-[#94a3b8] text-sm">= {v.desc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Section 4 */}
        <div className="bg-[#1e1b4b] border border-[#334155] rounded-xl p-10 mb-12">
          <h2 className="text-white text-3xl font-bold mb-8">Research Data Sources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex gap-4">
              <FileText className="text-[#3b82f6] shrink-0" size={24} />
              <div>
                <div className="text-white font-bold">ToS Analysis</div>
                <div className="text-[#94a3b8] text-sm">Review of 15+ major API providers and their terms regarding resale.</div>
              </div>
            </div>
            <div className="flex gap-4">
              <Search className="text-[#3b82f6] shrink-0" size={24} />
              <div>
                <div className="text-white font-bold">Literature Review</div>
                <div className="text-[#94a3b8] text-sm">Integration of findings from 40+ academic papers in CS and Economics.</div>
              </div>
            </div>
            <div className="flex gap-4">
              <Code className="text-[#3b82f6] shrink-0" size={24} />
              <div>
                <div className="text-white font-bold">Conceptual Modeling</div>
                <div className="text-[#94a3b8] text-sm">Building theoretical models using physical supply chain analogies.</div>
              </div>
            </div>
            <div className="flex gap-4">
              <Scale className="text-[#3b82f6] shrink-0" size={24} />
              <div>
                <div className="text-white font-bold">Legal Analysis</div>
                <div className="text-[#94a3b8] text-sm">Evaluation of the CFAA statutory framework in the context of API access.</div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 5 */}
        <div className="bg-[#1e1b4b] border-l-4 border-[#f59e0b] border border-[#334155] rounded-r-xl p-10 mb-12">
          <h2 className="text-white text-3xl font-bold mb-8">Study Limitations</h2>
          <div className="space-y-4">
            {[
              "Primarily a theoretical framework for future empirical validation",
              "Limited empirical latency data from proprietary middleware providers",
              "Focuses specifically on U.S. legal frameworks (CFAA)",
              "Does not currently cover GraphQL or asynchronous API architectures"
            ].map((item) => (
              <div key={item} className="flex gap-3 text-[#94a3b8]">
                <AlertTriangle size={20} className="text-[#f59e0b] shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
