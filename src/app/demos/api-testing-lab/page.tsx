import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BeakerIcon } from 'lucide-react';

import { InputSection } from '../../components/input-section';
import { ApiChainDiagram } from '../../components/api-chain-diagram';
import { ResultsCards } from '../../components/results-cards';
import { LatencyLineChart, ComparisonBarChart, JitterScatterPlot } from '../../components/latency-charts';
import { ExportButtons } from '../../components/export-buttons';

import { testEndpoint, calculatePenalty } from '../../lib/testing-engine';
import { DEFAULT_CONFIG, type TestConfig, type EndpointStats, type ComparisonResult } from '../../lib/types';

export const ApiTestingLab = () => {
    const [config, setConfig] = useState<TestConfig>(DEFAULT_CONFIG);
    const [isTesting, setIsTesting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [result, setResult] = useState<ComparisonResult | null>(null);

    // Parse URL parameters for shared links (simulated since we're using react-router hash or browserrouter without specific query parsing logic set up here, but keeping it simple)
    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        const directParam = searchParams.get('direct');
        const cascadedParam = searchParams.get('cascaded');
        if (directParam || cascadedParam) {
            setConfig((prev: TestConfig) => ({
                ...prev,
                directUrl: directParam ? decodeURIComponent(directParam) : prev.directUrl,
                cascadedUrl: cascadedParam ? decodeURIComponent(cascadedParam) : prev.cascadedUrl
            }));
        }
    }, []);

    const handleTest = async () => {
        setIsTesting(true);
        setError(null);

        try {
            let directStats: EndpointStats | null = null;
            let cascadedStats: EndpointStats | null = null;

            // Test Direct URL
            if (config.directUrl) {
                directStats = await testEndpoint(config.directUrl, 'Direct', config);
            }

            // Test Cascaded URL
            if (config.cascadedUrl) {
                cascadedStats = await testEndpoint(config.cascadedUrl, 'Cascaded', config);
            }

            if (!directStats && !cascadedStats) {
                throw new Error('Please provide at least one valid URL to test.');
            }

            const penaltyPercentage = calculatePenalty(directStats, cascadedStats);

            setResult({
                direct: directStats,
                cascaded: cascadedStats,
                penaltyPercentage,
                timestamp: Date.now(),
            });
        } catch (err: any) {
            setError(err.message || 'An error occurred during testing.');
        } finally {
            setIsTesting(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0a0e27] pt-24 pb-12 px-6">
            <div className="max-w-[1400px] mx-auto space-y-8">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-8"
                >
                    <div className="flex items-center gap-3 mb-4">
                        <BeakerIcon className="w-8 h-8 text-[#3b82f6]" />
                        <h1 className="text-[#f8fafc] text-4xl md:text-5xl font-bold">API Testing Lab</h1>
                    </div>
                    <p className="text-[#94a3b8] text-xl">Live latency analysis and comparison</p>
                </motion.div>

                {/* Error Message */}
                {error && (
                    <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-xl">
                        {error}
                    </div>
                )}

                {/* Input Section */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                >
                    <InputSection
                        config={config}
                        onConfigChange={setConfig}
                        onTest={handleTest}
                        isTesting={isTesting}
                    />
                </motion.div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

                    {/* Left Column: Animation (60%) */}
                    <motion.div
                        className="lg:col-span-3 space-y-8"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <div className="bg-[#1e1b4b] border border-[#334155] rounded-2xl p-6 h-full flex flex-col justify-center">
                            <ApiChainDiagram
                                isAnimating={isTesting}
                                directUrl={config.directUrl}
                                cascadedUrl={config.cascadedUrl}
                            />
                        </div>
                    </motion.div>

                    {/* Right Column: Results Cards (40%) */}
                    <motion.div
                        className="lg:col-span-2 space-y-8"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        {result ? (
                            <div className="bg-[#1e1b4b] border border-[#334155] rounded-2xl p-6 h-full">
                                <ResultsCards
                                    direct={result.direct}
                                    cascaded={result.cascaded}
                                    penaltyPercentage={result.penaltyPercentage}
                                />
                            </div>
                        ) : (
                            <div className="bg-[#1e1b4b] border border-[#334155] rounded-2xl p-6 h-full flex flex-col items-center justify-center text-center">
                                <BeakerIcon className="w-16 h-16 text-[#334155] mb-4" />
                                <h3 className="text-xl font-semibold text-white mb-2">No Data Yet</h3>
                                <p className="text-slate-400">Run a test to see live latency statistics and cascading penalties.</p>
                            </div>
                        )}
                    </motion.div>

                </div>

                {/* Charts Section */}
                {result && (
                    <motion.div
                        className="grid grid-cols-1 lg:grid-cols-2 gap-8"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        <div className="bg-[#1e1b4b] border border-[#334155] rounded-2xl p-6">
                            <LatencyLineChart direct={result.direct} cascaded={result.cascaded} />
                        </div>
                        <div className="bg-[#1e1b4b] border border-[#334155] rounded-2xl p-6">
                            <ComparisonBarChart direct={result.direct} cascaded={result.cascaded} />
                        </div>
                        <div className="bg-[#1e1b4b] border border-[#334155] rounded-2xl p-6 lg:col-span-2">
                            <JitterScatterPlot direct={result.direct} cascaded={result.cascaded} />
                        </div>
                    </motion.div>
                )}

                {/* Footer: Export */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                >
                    <ExportButtons
                        result={result}
                        directUrl={config.directUrl}
                        cascadedUrl={config.cascadedUrl}
                    />
                </motion.div>

            </div>
        </div>
    );
};
