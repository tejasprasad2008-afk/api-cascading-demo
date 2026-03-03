import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, User, Server, Cloud, Zap, RefreshCw, AlertTriangle, Download, Share2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import html2canvas from 'html2canvas';
import { LiveLatencyTest } from '../components/LiveLatencyTest';

export const LatencySimulator = () => {
  const [propagation, setPropagation] = useState(30);
  const [serialization, setSerialization] = useState(15);
  const [internal, setInternal] = useState(40);
  const [hops, setHops] = useState(2);

  const calculateLatency = (h: number) => {
    // Lt = Sum(Pk + Sk + Ik) for k=1 to n
    // Base latency + overhead per hop
    const perHop = propagation + serialization + internal;
    return perHop * h;
  };

  const directLatency = propagation + serialization + internal;
  const cascadedLatency = calculateLatency(hops + 1); // User to WEB2 to WEB1... to Provider
  const penalty = Math.round(((cascadedLatency - directLatency) / directLatency) * 100);

  const chartData = [
    { name: 'Direct', value: directLatency, color: '#10b981' },
    { name: '1-Hop', value: calculateLatency(2), color: '#f59e0b' },
    { name: '2-Hop', value: calculateLatency(3), color: '#fb923c' },
    { name: '3-Hop', value: calculateLatency(4), color: '#ef4444' },
  ];

  const handleExportPNG = async () => {
    const element = document.getElementById('simulation-container');
    if (element) {
      const canvas = await html2canvas(element);
      const data = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = data;
      link.download = 'latency-simulation.png';
      link.click();
    }
  };

  const handleExportCSV = () => {
    const headers = ['Hop Count', 'Latency (ms)', 'Type'];
    const rows = chartData.map(d => [`${d.name}`, `${d.value}`, 'Simulated']);
    const csvContent = "data:text/csv;charset=utf-8,"
      + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.href = encodedUri;
    link.download = 'latency_data.csv';
    link.click();
  };

  return (
    <div className="min-h-screen bg-[#0a0e27] pt-24 pb-12 px-6" id="simulation-container">
      <div className="max-w-[1400px] mx-auto">
        {/* Hero */}
        <div className="mb-12">
          <Link to="/" className="text-[#3b82f6] flex items-center gap-2 mb-8 hover:underline">
            <ArrowLeft size={20} /> Back to Demos
          </Link>
          <h1 className="text-[#f8fafc] text-4xl md:text-5xl font-bold mb-4">Latency Simulator</h1>
          <p className="text-[#94a3b8] text-xl">Visualize cascading latency penalties in real-time</p>
        </div>

        {/* Visualization Panel */}
        <div className="bg-[#1e1b4b] border border-[#334155] rounded-2xl p-6 md:p-12 mb-6 flex flex-col lg:flex-row gap-12">
          {/* Left: Diagram */}
          <div className="flex-[3] flex flex-col justify-center overflow-x-auto min-h-[400px]">
            <div className="flex items-center justify-between min-w-[800px] relative px-4">
              <div className="flex flex-col items-center gap-4 z-10">
                <div className="w-24 h-24 rounded-full bg-[#0a0e27] border-3 border-[#3b82f6] flex items-center justify-center">
                  <User className="text-white" size={40} />
                </div>
                <div className="text-center">
                  <div className="text-white font-bold">USER</div>
                  <div className="text-[#94a3b8] text-sm">0ms</div>
                </div>
              </div>

              {[...Array(hops)].map((_, i) => (
                <React.Fragment key={i}>
                  <div className="flex-1 relative mx-4">
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#334155] px-3 py-1 rounded-md text-white text-xs whitespace-nowrap">
                      Total: {calculateLatency(i + 1)}ms
                    </div>
                    <div className="h-[4px] w-full bg-[#334155] rounded-full overflow-hidden relative">
                      <motion.div
                        animate={{ left: ['0%', '100%'] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                        className="absolute top-0 w-3 h-full bg-[#06b6d4] rounded-full shadow-[0_0_8px_#06b6d4]"
                      />
                      <div className="h-full bg-gradient-to-r from-[#3b82f6] to-[#06b6d4]" style={{ width: '100%' }} />
                    </div>
                    <div className="text-[#94a3b8] text-[10px] text-center mt-2">
                      P: {propagation}ms | S: {serialization}ms | I: {internal}ms
                    </div>
                  </div>
                  <div className="flex flex-col items-center gap-4 z-10">
                    <div className="w-24 h-24 rounded-full bg-[#0a0e27] border-3 border-[#3b82f6] flex items-center justify-center">
                      <Server className="text-white" size={40} />
                    </div>
                    <div className="text-center">
                      <div className="text-white font-bold">WEB{hops - i}</div>
                      <div className="text-[#94a3b8] text-sm">{calculateLatency(i + 1)}ms</div>
                    </div>
                  </div>
                </React.Fragment>
              ))}

              <div className="flex-1 relative mx-4">
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#334155] px-3 py-1 rounded-md text-white text-xs whitespace-nowrap">
                  Total: {cascadedLatency}ms
                </div>
                <div className="h-[4px] w-full bg-[#334155] rounded-full overflow-hidden relative">
                  <motion.div
                    animate={{ left: ['0%', '100%'] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                    className="absolute top-0 w-3 h-full bg-[#06b6d4] rounded-full shadow-[0_0_8px_#06b6d4]"
                  />
                  <div className="h-full bg-gradient-to-r from-[#3b82f6] to-[#06b6d4]" style={{ width: '100%' }} />
                </div>
                <div className="text-[#94a3b8] text-[10px] text-center mt-2">
                  P: {propagation}ms | S: {serialization}ms | I: {internal}ms
                </div>
              </div>

              <div className="flex flex-col items-center gap-4 z-10">
                <div className="w-24 h-24 rounded-full bg-[#0a0e27] border-3 border-[#3b82f6] flex items-center justify-center">
                  <Cloud className="text-white" size={40} />
                </div>
                <div className="text-center">
                  <div className="text-white font-bold">PROVIDER A</div>
                  <div className="text-[#94a3b8] text-sm">{cascadedLatency}ms</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Controls */}
          <div className="flex-[2] bg-[#0a0e27] border border-[#334155] rounded-xl p-8">
            <h3 className="text-white text-xl font-bold mb-8">Adjust Parameters</h3>

            <div className="space-y-8">
              <div>
                <div className="flex justify-between items-center mb-4">
                  <label className="text-[#94a3b8] text-sm">Propagation Delay (ms)</label>
                  <span className="text-white text-2xl font-bold">{propagation}ms</span>
                </div>
                <input
                  type="range" min="10" max="200" value={propagation}
                  onChange={(e) => setPropagation(parseInt(e.target.value))}
                  className="w-full h-1 bg-[#334155] rounded-lg appearance-none cursor-pointer accent-[#3b82f6]"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-4">
                  <label className="text-[#94a3b8] text-sm">Serialization Time (ms)</label>
                  <span className="text-white text-2xl font-bold">{serialization}ms</span>
                </div>
                <input
                  type="range" min="5" max="50" value={serialization}
                  onChange={(e) => setSerialization(parseInt(e.target.value))}
                  className="w-full h-1 bg-[#334155] rounded-lg appearance-none cursor-pointer accent-[#3b82f6]"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-4">
                  <label className="text-[#94a3b8] text-sm">Internal Processing (ms)</label>
                  <span className="text-white text-2xl font-bold">{internal}ms</span>
                </div>
                <input
                  type="range" min="50" max="500" value={internal}
                  onChange={(e) => setInternal(parseInt(e.target.value))}
                  className="w-full h-1 bg-[#334155] rounded-lg appearance-none cursor-pointer accent-[#3b82f6]"
                />
              </div>

              <div>
                <label className="text-[#94a3b8] text-sm block mb-4">Number of Hops</label>
                <div className="flex gap-4">
                  {[1, 2, 3, 4].map((h) => (
                    <button
                      key={h}
                      onClick={() => setHops(h)}
                      className={`flex-1 h-12 rounded-lg font-bold transition-all ${hops === h ? 'bg-[#3b82f6] text-white' : 'bg-transparent border border-[#334155] text-[#94a3b8] hover:border-[#3b82f6]'
                        }`}
                    >
                      {h}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Results Panel */}
        <div className="bg-[#1e1b4b] border border-[#334155] rounded-xl p-8 mb-6">
          <h3 className="text-white text-2xl font-bold mb-8">Latency Analysis</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-[#0a0e27] rounded-xl border border-[#334155]">
              <div className="text-[#10b981] mb-2"><Zap size={32} /></div>
              <div className="text-[#94a3b8] text-sm">Direct Connection</div>
              <div className="text-white text-4xl font-bold my-2">{directLatency}ms</div>
              <div className="text-[#64748b] text-xs">Baseline latency</div>
            </div>
            <div className="p-6 bg-[#0a0e27] rounded-xl border border-[#334155]">
              <div className="text-[#f59e0b] mb-2"><RefreshCw size={32} /></div>
              <div className="text-[#94a3b8] text-sm">Cascaded Latency</div>
              <div className="text-white text-4xl font-bold my-2">{cascadedLatency}ms</div>
              <div className="text-[#64748b] text-xs">Through {hops} hops</div>
            </div>
            <div className="p-6 bg-[#0a0e27] rounded-xl border border-[#334155]">
              <div className="text-[#ef4444] mb-2"><AlertTriangle size={32} /></div>
              <div className="text-[#94a3b8] text-sm">Cascading Penalty</div>
              <div className="text-[#ef4444] text-4xl font-bold my-2">+{penalty}%</div>
              <div className="text-[#64748b] text-xs">Performance impact</div>
            </div>
          </div>
        </div>

        {/* Live Latency Test Component */}
        <LiveLatencyTest />

        {/* Chart & Formula */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-[#1e1b4b] border border-[#334155] rounded-xl p-8 min-h-[400px]">
            <h3 className="text-white text-2xl font-bold mb-8">Latency Comparison</h3>
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8' }} />
                  <YAxis hide />
                  <Tooltip
                    cursor={{ fill: 'transparent' }}
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-[#0a0e27] border border-[#334155] p-2 rounded shadow-lg">
                            <p className="text-white text-sm font-bold">{payload[0].value}ms</p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar dataKey="value" radius={[8, 8, 0, 0]} barSize={60}>
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-[#0a0e27] border-2 border-dashed border-[#334155] rounded-xl p-8 flex flex-col justify-center">
            <h3 className="text-white text-xl font-bold mb-8">Cascading Latency Formula</h3>
            <div className="bg-[#1e1b4b] p-6 rounded-lg text-center mb-8">
              <code className="text-[#3b82f6] text-2xl font-['JetBrains_Mono']">
                Lt = Σ(Pk + Sk + Ik) for k=1 to n
              </code>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Lt', desc: 'Total Latency' },
                { label: 'P', desc: 'Propagation Delay' },
                { label: 'S', desc: 'Serialization Time' },
                { label: 'I', desc: 'Internal Processing' },
                { label: 'k', desc: 'Hop number' },
                { label: 'n', desc: 'Total hops' }
              ].map((v) => (
                <div key={v.label} className="bg-[#1e1b4b] border border-[#334155] p-3 rounded-md">
                  <span className="text-[#3b82f6] font-bold mr-2">{v.label}</span>
                  <span className="text-[#94a3b8] text-sm">= {v.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Export */}
        <div className="mt-8 flex justify-between items-center">
          <div className="flex gap-4">
            <button
              onClick={handleExportCSV}
              className="flex items-center gap-2 bg-[#1e1b4b] border border-[#3b82f6] text-[#3b82f6] px-5 py-3 rounded-lg text-sm hover:bg-[#3b82f6]/10 transition-all"
            >
              <Download size={18} /> Export as CSV
            </button>
            <button
              onClick={handleExportPNG}
              className="flex items-center gap-2 bg-[#1e1b4b] border border-[#3b82f6] text-[#3b82f6] px-5 py-3 rounded-lg text-sm hover:bg-[#3b82f6]/10 transition-all"
            >
              <Download size={18} /> Export Screenshot
            </button>
          </div>
          <button className="flex items-center gap-2 bg-[#3b82f6] text-white px-6 py-3 rounded-lg text-sm font-bold hover:bg-[#2563eb] transition-all">
            <Share2 size={18} /> Share Results
          </button>
        </div>
      </div>
    </div>
  );
};
