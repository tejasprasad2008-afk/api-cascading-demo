import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Server, Shield, ShieldAlert, ShieldCheck, User as UserIcon, Timer, Trophy, RotateCcw } from 'lucide-react';
import { Link } from 'react-router-dom';

const AttackSimulation = ({ scenario }: { scenario: number }) => {
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'result'>('idle');
  const [timeLeft, setTimeLeft] = useState(15);
  const [maliciousIndex, setMaliciousIndex] = useState(-1);
  const [gameResult, setGameResult] = useState<'win' | 'lose' | null>(null);

  const startGame = () => {
    setMaliciousIndex(Math.floor(Math.random() * 100));
    setTimeLeft(15);
    setGameState('playing');
    setGameResult(null);
  };

  useEffect(() => {
    let timer: number;
    if (gameState === 'playing' && timeLeft > 0) {
      timer = window.setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && gameState === 'playing') {
      setGameState('result');
      setGameResult('lose');
    }
    return () => clearInterval(timer);
  }, [gameState, timeLeft]);

  const handleUserClick = (index: number) => {
    if (gameState !== 'playing') return;
    if (index === maliciousIndex) {
      setGameState('result');
      setGameResult('win');
    } else {
      // Small penalty or visual feedback could go here
    }
  };

  return (
    <div className="bg-[#1e1b4b] border-2 border-[#ef4444] rounded-xl p-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h3 className="text-white text-2xl font-bold">Spot the Malicious Actor</h3>
          <p className="text-[#ef4444] text-sm font-bold uppercase tracking-widest mt-1">Interactive Challenge</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="bg-[#0a0e27] px-6 py-2 rounded-full text-[#ef4444] font-bold border border-[#ef4444] flex items-center gap-2">
            <Timer size={18} /> {timeLeft}s
          </div>
        </div>
      </div>

      <div className="bg-[#0a0e27] p-8 rounded-xl min-h-[450px] flex flex-col items-center justify-center relative">
        <AnimatePresence mode="wait">
          {gameState === 'idle' && (
            <motion.div 
              key="idle"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              className="text-center"
            >
              <ShieldAlert size={64} className="text-[#ef4444] mx-auto mb-6 animate-pulse" />
              <p className="text-[#94a3b8] max-w-md mx-auto mb-8">
                Can you identify the single malicious user when traffic is aggregated through <strong>{scenario} layers</strong> of middleware?
              </p>
              <button 
                onClick={startGame}
                className="bg-[#ef4444] text-white px-10 py-4 rounded-xl font-bold hover:bg-[#d4183d] transition-all transform hover:-translate-y-1 shadow-lg shadow-[#ef4444]/20"
              >
                Start Simulation
              </button>
            </motion.div>
          )}

          {gameState === 'playing' && (
            <motion.div 
              key="playing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-10 gap-2 w-full max-w-md mx-auto"
            >
              {Array.from({ length: 100 }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => handleUserClick(i)}
                  className="transition-all hover:scale-125 focus:outline-none group relative"
                >
                  <UserIcon 
                    size={24} 
                    className={`transition-colors duration-300 ${
                      i === maliciousIndex 
                        ? scenario === 0 
                          ? 'text-[#ef4444]' 
                          : scenario === 1 
                            ? 'text-[#3b82f6] group-hover:text-[#ef4444]' 
                            : 'text-[#3b82f6]' 
                        : 'text-[#3b82f6]'
                    }`}
                  />
                  {/* Visual clue for medium difficulty */}
                  {i === maliciousIndex && scenario === 1 && (
                    <motion.div 
                      animate={{ opacity: [0, 0.5, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute inset-0 bg-[#ef4444]/10 rounded-full"
                    />
                  )}
                </button>
              ))}
            </motion.div>
          )}

          {gameState === 'result' && (
            <motion.div 
              key="result"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              {gameResult === 'win' ? (
                <>
                  <Trophy size={64} className="text-[#10b981] mx-auto mb-6" />
                  <h4 className="text-white text-3xl font-bold mb-2">Actor Detected!</h4>
                  <p className="text-[#94a3b8] mb-8">You found the malicious node with {timeLeft}s remaining.</p>
                </>
              ) : (
                <>
                  <ShieldAlert size={64} className="text-[#ef4444] mx-auto mb-6" />
                  <h4 className="text-white text-3xl font-bold mb-2">Detection Failed</h4>
                  <p className="text-[#94a3b8] mb-8">The malicious actor successfully masked their identity.</p>
                </>
              )}
              <button 
                onClick={startGame}
                className="bg-[#3b82f6] text-white px-8 py-3 rounded-lg font-bold hover:bg-[#2563eb] transition-all flex items-center gap-2 mx-auto"
              >
                <RotateCcw size={18} /> Play Again
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="mt-8 bg-[#0a0e27] border border-[#334155] p-4 rounded-lg">
        <h5 className="text-white font-bold text-sm mb-2 flex items-center gap-2">
          <Shield size={14} className="text-[#3b82f6]" /> Current Difficulty: {scenario === 0 ? 'Low (Direct Visibility)' : scenario === 1 ? 'Medium (Aggregated)' : 'High (Blind Spot)'}
        </h5>
        <p className="text-[#64748b] text-xs">
          {scenario === 0 
            ? "The malicious user is clearly identifiable by their unique signature." 
            : scenario === 1 
              ? "The signature is partially obscured. Only behavioral patterns might reveal them." 
              : "The signature is identical to other users. Identification is mathematically impossible."}
        </p>
      </div>
    </div>
  );
};

export const SecurityDemo = () => {
  const [scenario, setScenario] = useState(0); // 0: Direct, 1: 1-Hop, 2: 2-Hop

  const users = Array.from({ length: 100 }, (_, i) => ({
    id: i,
    isMalicious: i === 42,
  }));

  const scenarios = [
    {
      title: 'Direct Connection',
      description: 'The provider has full visibility of individual users.',
      status: '✓ Malicious actor detected and blocked',
      statusColor: '#10b981',
      borderColor: '#10b981',
      detectionRate: '100%',
      visibility: 'Full visibility'
    },
    {
      title: 'Cascaded (1 Hop)',
      description: 'Middleware aggregates traffic, masking individual identities.',
      status: '⚠️ Malicious actor hidden in aggregated traffic',
      statusColor: '#f59e0b',
      borderColor: '#f59e0b',
      detectionRate: '40%',
      visibility: 'Partial masking'
    },
    {
      title: 'Cascaded (2 Hops)',
      description: 'Multiple layers create a total auditability vacuum.',
      status: '❌ Detection impossible - total auditability vacuum',
      statusColor: '#ef4444',
      borderColor: '#ef4444',
      detectionRate: '0%',
      visibility: 'Total blind spot'
    }
  ];

  return (
    <div className="min-h-screen bg-[#0a0e27] pt-24 pb-12 px-6">
      <div className="max-w-[1400px] mx-auto">
        <div className="mb-12">
          <Link to="/" className="text-[#3b82f6] flex items-center gap-2 mb-8 hover:underline">
            <ArrowLeft size={20} /> Back to Demos
          </Link>
          <h1 className="text-[#f8fafc] text-4xl md:text-5xl font-bold mb-4">Security Vulnerability Demonstrator</h1>
          <p className="text-[#94a3b8] text-xl">Understand the auditability vacuum in action</p>
        </div>

        <div className="bg-[#1e1b4b] border border-[#334155] rounded-2xl p-8 md:p-12 mb-6">
          <div className="mb-12">
            <h3 className="text-white text-xl font-bold mb-6">Choose Scenario</h3>
            <div className="flex gap-4">
              {['Direct Connection', 'Cascaded (1 Hop)', 'Cascaded (2 Hops)'].map((s, i) => (
                <button
                  key={s}
                  onClick={() => setScenario(i)}
                  className={`px-8 py-3 rounded-lg font-bold transition-all ${
                    scenario === i ? 'bg-[#3b82f6] text-white shadow-lg shadow-[#3b82f6]/20' : 'bg-transparent border border-[#334155] text-[#94a3b8] hover:border-[#3b82f6]'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center min-h-[500px]">
            {/* Users Grid */}
            <div className="lg:col-span-5">
              <div className="grid grid-cols-10 gap-2 mb-4">
                {users.map((u) => (
                  <motion.div
                    key={u.id}
                    initial={false}
                    animate={{
                      scale: scenario > 0 && u.isMalicious ? 1.2 : 1,
                      opacity: scenario > 1 && !u.isMalicious ? 0.3 : 1
                    }}
                    className={`p-1 rounded flex items-center justify-center transition-colors duration-500 ${
                      u.isMalicious ? 'text-[#ef4444]' : 'text-[#3b82f6]'
                    }`}
                  >
                    <UserIcon size={24} />
                  </motion.div>
                ))}
              </div>
              <p className="text-[#94a3b8] text-sm text-center">100 Active Users</p>
            </div>

            {/* Middle: Middleware (If cascaded) */}
            <div className="lg:col-span-4 flex flex-col items-center gap-8">
              <motion.div 
                animate={{ opacity: [0, 1], x: [-20, 0] }}
                key={`flow-${scenario}`}
                className="flex items-center gap-4 w-full justify-center"
              >
                <div className="h-1 flex-1 bg-gradient-to-r from-[#3b82f6] to-[#334155]" />
                {scenario > 0 && (
                   <div className="bg-[#0a0e27] border-2 border-[#f59e0b] p-6 rounded-xl text-center w-48 relative">
                     <Server className="text-white mx-auto mb-2" size={32} />
                     <div className="text-white font-bold text-sm">Middleware</div>
                     <div className="text-[#94a3b8] text-[10px] mt-1">Aggregates Traffic</div>
                     {scenario > 1 && <div className="absolute -right-8 top-1/2 -translate-y-1/2 h-1 w-8 bg-[#334155]" />}
                   </div>
                )}
                {scenario > 1 && (
                   <div className="bg-[#0a0e27] border-2 border-[#ef4444] p-6 rounded-xl text-center w-48">
                     <Server className="text-white mx-auto mb-2" size={32} />
                     <div className="text-white font-bold text-sm">Web 1</div>
                     <div className="text-[#94a3b8] text-[10px] mt-1">Further Abstraction</div>
                   </div>
                )}
                <div className="h-1 flex-1 bg-gradient-to-r from-[#334155] to-[#10b981]" />
              </motion.div>
            </div>

            {/* Provider Box */}
            <div className="lg:col-span-3">
              <motion.div 
                animate={{ 
                  borderColor: scenarios[scenario].borderColor,
                  scale: [0.95, 1]
                }}
                className="bg-[#0a0e27] border-3 p-8 rounded-2xl text-center transition-colors duration-500"
              >
                <Server className="text-white mx-auto mb-4" size={64} />
                <div className="text-white font-bold text-lg">Provider A</div>
                <div className="text-[#94a3b8] text-sm mt-2">
                  {scenario === 0 ? 'Sees All Users' : scenario === 1 ? 'Sees 1 Combined User' : 'Sees Random Origin IP'}
                </div>
              </motion.div>

              <motion.div 
                animate={{ 
                  backgroundColor: `${scenarios[scenario].statusColor}20`,
                  borderColor: scenarios[scenario].statusColor
                }}
                className="mt-8 border p-4 rounded-xl flex items-center gap-3 transition-colors duration-500"
              >
                {scenario === 0 ? <ShieldCheck className="text-[#10b981]" /> : scenario === 1 ? <ShieldAlert className="text-[#f59e0b]" /> : <Shield className="text-[#ef4444]" />}
                <span className="text-sm font-medium" style={{ color: scenarios[scenario].statusColor }}>
                  {scenarios[scenario].status}
                </span>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Comparison Grid */}
        <div className="bg-[#0a0e27] border border-[#334155] rounded-xl p-8 mb-6">
          <h3 className="text-white text-2xl font-bold mb-8">Detection Effectiveness Comparison</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <div className="text-[#94a3b8] font-bold uppercase tracking-wider text-xs">Direct Connection</div>
              <div className="text-[#10b981] text-5xl font-bold">100%</div>
              <div className="space-y-2">
                <div className="text-[#10b981] text-sm flex items-center gap-2">✓ IP Bans Effective</div>
                <div className="text-[#10b981] text-sm flex items-center gap-2">✓ Behavior Analysis Effective</div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="text-[#94a3b8] font-bold uppercase tracking-wider text-xs">1-Hop Cascaded</div>
              <div className="text-[#f59e0b] text-5xl font-bold">40%</div>
              <div className="space-y-2">
                <div className="text-[#f59e0b] text-sm flex items-center gap-2">✗ IP Bans Ineffective</div>
                <div className="text-[#f59e0b] text-sm flex items-center gap-2">⚠️ Behavior Analysis Degraded</div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="text-[#94a3b8] font-bold uppercase tracking-wider text-xs">2-Hop Cascaded</div>
              <div className="text-[#ef4444] text-5xl font-bold">0%</div>
              <div className="space-y-2">
                <div className="text-[#ef4444] text-sm flex items-center gap-2">✗ IP Bans Impossible</div>
                <div className="text-[#ef4444] text-sm flex items-center gap-2">✗ Behavior Analysis Impossible</div>
              </div>
            </div>
          </div>
        </div>

        {/* Attack Simulation Game */}
        <AttackSimulation scenario={scenario} />
      </div>
    </div>
  );
};
