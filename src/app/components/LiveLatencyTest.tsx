import React, { useState } from 'react';
import { Network, Activity, Clock, Zap } from 'lucide-react';
import { motion } from 'motion/react';

export const LiveLatencyTest = () => {
    const [directLatency, setDirectLatency] = useState<number | null>(null);
    const [cascadedLatency, setCascadedLatency] = useState<number | null>(null);
    const [loading, setLoading] = useState<'idle' | 'direct' | 'cascaded'>('idle');

    const ping = async (url: string) => {
        const start = performance.now();
        await fetch(url, { mode: 'no-cors' }); // no-cors to avoid opaque response issues if cross-origin, though time is less accurate. 
        // Actually no-cors prevents reading time accurately sometimes due to caching or opaqueness.
        // Better to use a reliable public API that supports CORS.
        // JSONPlaceholder is good.
        return performance.now() - start;
    };

    const handleTest = async () => {
        setLoading('direct');
        setDirectLatency(null);
        setCascadedLatency(null);

        // warm up
        try {
            // 1. Direct Ping
            const startDirect = performance.now();
            await fetch('https://jsonplaceholder.typicode.com/todos/1');
            const endDirect = performance.now();
            const directTime = Math.round(endDirect - startDirect);
            setDirectLatency(directTime);

            setLoading('cascaded');

            // 2. Simulated Cascaded Ping (adding arbitrary 300ms overhead for 3 hops)
            const overhead = 300;
            await new Promise(r => setTimeout(r, overhead));
            const startCascaded = performance.now();
            await fetch('https://jsonplaceholder.typicode.com/todos/1'); // Fetching same resource
            const endCascaded = performance.now();
            // The "Cascaded" time is the overhead + the fetch
            const cascadedTime = Math.round((endCascaded - startCascaded) + overhead);
            setCascadedLatency(cascadedTime);

        } catch (e) {
            console.error(e);
        } finally {
            setLoading('idle');
        }
    };

    return (
        <div className="bg-[#1e1b4b] border border-[#334155] rounded-xl p-8 mb-6">
            <div className="flex items-center gap-3 mb-6">
                <Activity className="text-[#3b82f6]" />
                <h3 className="text-white text-2xl font-bold">Live Latency Test</h3>
            </div>

            <p className="text-[#94a3b8] mb-6">
                Compare a real request to a public API (Direct) versus a simulated cascaded request with 3 hops of overhead.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-[#0a0e27] border border-[#334155] rounded-lg p-6 flex flex-col items-center justify-center min-h-[160px]">
                    <div className="text-[#94a3b8] text-sm mb-2 text-center uppercase tracking-wider">Direct API Call</div>
                    {loading === 'direct' ? (
                        <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }}>
                            <Clock className="text-[#3b82f6]" size={32} />
                        </motion.div>
                    ) : (
                        <div className="text-4xl font-bold text-[#10b981]">
                            {directLatency ? `${directLatency}ms` : '--'}
                        </div>
                    )}
                </div>

                <div className="bg-[#0a0e27] border border-[#334155] rounded-lg p-6 flex flex-col items-center justify-center min-h-[160px]">
                    <div className="text-[#94a3b8] text-sm mb-2 text-center uppercase tracking-wider">Cascaded (Simulated)</div>
                    {loading === 'cascaded' ? (
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 1 }}
                            className="relative"
                        >
                            <Network className="text-[#ef4444]" size={32} />
                        </motion.div>
                    ) : (
                        <div className="text-4xl font-bold text-[#ef4444]">
                            {cascadedLatency ? `${cascadedLatency}ms` : '--'}
                        </div>
                    )}
                </div>
            </div>

            <button
                onClick={handleTest}
                disabled={loading !== 'idle'}
                className="w-full mt-6 bg-[#3b82f6] text-white font-bold py-4 rounded-lg hover:bg-[#2563eb] disabled:opacity-50 disabled:cursor-not-allowed transition-all flex justify-center items-center gap-2"
            >
                {loading !== 'idle' ? 'Running Test...' : (
                    <>
                        <Zap size={20} /> Run Live Test
                    </>
                )}
            </button>
        </div>
    );
};
