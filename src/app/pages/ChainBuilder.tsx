import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, X, Server, Database, Box, ArrowRight, Play, RotateCcw, Save } from 'lucide-react';
import { Link } from 'react-router-dom';

type NodeType = 'middleware' | 'database' | 'cache' | 'external';

interface Node {
    id: string;
    type: NodeType;
    latency: number;
}

const presetNodes: Record<NodeType, { label: string; latency: number; icon: React.ReactNode; color: string }> = {
    middleware: { label: 'Middleware', latency: 45, icon: <Server size={20} />, color: '#3b82f6' },
    database: { label: 'Database', latency: 25, icon: <Database size={20} />, color: '#10b981' },
    cache: { label: 'Redis Cache', latency: 5, icon: <Box size={20} />, color: '#f59e0b' },
    external: { label: '3rd Party API', latency: 120, icon: <Server size={20} />, color: '#ef4444' },
};

export const ChainBuilder = () => {
    const [chain, setChain] = useState<Node[]>([]);
    const [isSimulating, setIsSimulating] = useState(false);

    const addNode = (type: NodeType) => {
        const newNode: Node = {
            id: Math.random().toString(36).substr(2, 9),
            type,
            latency: presetNodes[type].latency,
        };
        setChain([...chain, newNode]);
    };

    const removeNode = (id: string) => {
        setChain(chain.filter(n => n.id !== id));
    };

    const totalLatency = chain.reduce((acc, node) => acc + node.latency, 0);

    const simulateRequest = () => {
        setIsSimulating(true);
        setTimeout(() => setIsSimulating(false), 2000); // Simulate processing
    };

    return (
        <div className="min-h-screen bg-[#0a0e27] pt-24 pb-12 px-6">
            <div className="max-w-[1400px] mx-auto">
                <div className="mb-8 flex justify-between items-end">
                    <div>
                        <h1 className="text-[#f8fafc] text-4xl font-bold mb-2">Chain Builder Playground</h1>
                        <p className="text-[#94a3b8]">Design custom API architectures and estimate latency impact.</p>
                    </div>
                    <div className="bg-[#1e1b4b] px-6 py-3 rounded-xl border border-[#3b82f6] text-center">
                        <div className="text-xs text-[#94a3b8] uppercase mb-1">Total Latency</div>
                        <div className="text-3xl font-bold text-white">{totalLatency}ms</div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Sidebar */}
                    <div className="lg:col-span-1 bg-[#1e1b4b] border border-[#334155] rounded-xl p-6 h-fit">
                        <h3 className="text-white font-bold mb-4">Component Library</h3>
                        <div className="space-y-3">
                            {(Object.keys(presetNodes) as NodeType[]).map((type) => (
                                <button
                                    key={type}
                                    onClick={() => addNode(type)}
                                    className="w-full flex items-center justify-between p-3 rounded-lg border border-[#334155] hover:border-[#3b82f6] hover:bg-[#3b82f6]/10 transition-all group"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className={`p-2 rounded bg-[${presetNodes[type].color}]/20`} style={{ color: presetNodes[type].color }}>
                                            {presetNodes[type].icon}
                                        </div>
                                        <div className="text-left">
                                            <div className="text-white text-sm font-bold">{presetNodes[type].label}</div>
                                            <div className="text-[#94a3b8] text-xs">+{presetNodes[type].latency}ms</div>
                                        </div>
                                    </div>
                                    <Plus size={16} className="text-[#94a3b8] group-hover:text-white" />
                                </button>
                            ))}
                        </div>

                        <div className="mt-8 pt-8 border-t border-[#334155]">
                            <button
                                onClick={() => setChain([])}
                                className="w-full py-2 flex items-center justify-center gap-2 text-[#ef4444] border border-[#ef4444]/30 rounded-lg hover:bg-[#ef4444]/10 transition-all"
                            >
                                <RotateCcw size={16} /> Reset Chain
                            </button>
                        </div>
                    </div>

                    {/* Canvas */}
                    <div className="lg:col-span-3 bg-[#0a0e27] border-2 border-dashed border-[#334155] rounded-xl p-8 min-h-[500px] flex flex-col relative overflow-hidden">
                        <div className="flex-1 flex items-center overflow-x-auto pb-4 custom-scrollbar">
                            <AnimatePresence>
                                {/* Initial Client */}
                                <div className="flex-shrink-0 flex flex-col items-center gap-4 mx-2">
                                    <div className="w-16 h-16 rounded-full bg-[#3b82f6] flex items-center justify-center shadow-[0_0_15px_#3b82f6]">
                                        <span className="text-white font-bold text-xs">CLIENT</span>
                                    </div>
                                </div>

                                {/* Arrow */}
                                <div className="flex-shrink-0 mx-2 text-[#334155]">
                                    <ArrowRight size={24} />
                                </div>

                                {chain.map((node, index) => (
                                    <React.Fragment key={node.id}>
                                        <motion.div
                                            initial={{ scale: 0, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            exit={{ scale: 0, opacity: 0 }}
                                            className="flex-shrink-0 relative group"
                                        >
                                            <button
                                                onClick={() => removeNode(node.id)}
                                                className="absolute -top-2 -right-2 bg-[#ef4444] text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity z-10"
                                            >
                                                <X size={12} />
                                            </button>
                                            <div
                                                className="w-32 h-32 rounded-xl flex flex-col items-center justify-center border-2 bg-[#1e1b4b] relative overflow-hidden"
                                                style={{ borderColor: presetNodes[node.type].color }}
                                            >
                                                {isSimulating && (
                                                    <motion.div
                                                        className="absolute inset-0 bg-white/10"
                                                        initial={{ x: '-100%' }}
                                                        animate={{ x: '100%' }}
                                                        transition={{ duration: 0.5, delay: index * 0.3 }}
                                                    />
                                                )}
                                                <div style={{ color: presetNodes[node.type].color }} className="mb-2">
                                                    {presetNodes[node.type].icon}
                                                </div>
                                                <div className="text-white font-bold text-sm">{presetNodes[node.type].label}</div>
                                                <div className="text-[#94a3b8] text-xs mt-1">+{node.latency}ms</div>
                                            </div>
                                        </motion.div>

                                        {/* Connector */}
                                        <div className="flex-shrink-0 mx-2 text-[#334155]">
                                            <ArrowRight size={24} />
                                        </div>
                                    </React.Fragment>
                                ))}

                                {/* End Response */}
                                <div className="flex-shrink-0 flex flex-col items-center gap-4 mx-2 opacity-50">
                                    <div className="w-16 h-16 rounded-full bg-[#334155] flex items-center justify-center border border-[#94a3b8]">
                                        <span className="text-[#94a3b8] font-bold text-xs">END</span>
                                    </div>
                                </div>
                            </AnimatePresence>
                        </div>

                        <div className="mt-8 flex justify-center">
                            <button
                                onClick={simulateRequest}
                                disabled={chain.length === 0 || isSimulating}
                                className="px-8 py-3 bg-[#10b981] text-white font-bold rounded-lg hover:bg-[#059669] disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
                            >
                                <Play size={20} /> Simulate Request Flow
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
