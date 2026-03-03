import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, TrendingDown, TrendingUp, DollarSign, Users, AlertTriangle, Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, CartesianGrid } from 'recharts';

export const EconomicCalculator = () => {
  const [retailPrice, setRetailPrice] = useState(0.50);
  const [bulkPrice, setBulkPrice] = useState(0.10);
  const [markup, setMarkup] = useState(20);
  const [volume, setVolume] = useState(1000);
  const [usage, setUsage] = useState(100000);
  const [marketShare, setMarketShare] = useState(30);

  const presets = [
    { name: 'LLM APIs', retail: 0.50, bulk: 0.10, markup: 25, vol: 1000, usage: 100000, desc: 'High compute, aggressive bulk discounts' },
    { name: 'Payments', retail: 0.05, bulk: 0.02, markup: 10, vol: 50000, usage: 1000, desc: 'Transactional, low margin, massive scale' },
    { name: 'Geocoding', retail: 0.15, bulk: 0.04, markup: 40, vol: 5000, usage: 20000, desc: 'Data-intensive, high middleware markup potential' }
  ];

  const applyPreset = (p: typeof presets[0]) => {
    setRetailPrice(p.retail);
    setBulkPrice(p.bulk);
    setMarkup(p.markup);
    setVolume(p.vol);
    setUsage(p.usage);
  };

  const totalMonthlyTokens = volume * usage;
  const directRevenue = totalMonthlyTokens * (retailPrice / 1000);
  
  const middlewareBuyPrice = totalMonthlyTokens * (bulkPrice / 1000);
  const middlewareSellPricePer1k = bulkPrice * (1 + markup / 100);
  const middlewareSellPriceTotal = totalMonthlyTokens * (middlewareSellPricePer1k / 1000);
  const middlewareProfit = middlewareSellPriceTotal - middlewareBuyPrice;
  
  const userCostDirect = usage * (retailPrice / 1000);
  const userCostCascaded = usage * (middlewareSellPricePer1k / 1000);
  const userSavings = userCostDirect - userCostCascaded;
  const userSavingsPercent = Math.round(((userCostDirect - userCostCascaded) / userCostDirect) * 100);

  const revenueLoss = directRevenue - middlewareBuyPrice;
  const revenueLossPercent = Math.round(((directRevenue - middlewareBuyPrice) / directRevenue) * 100);

  const chartData = [
    {
      name: 'Direct Model',
      provider: directRevenue,
      middleware: 0,
      savings: 0,
    },
    {
      name: 'Cascaded Model',
      provider: middlewareBuyPrice,
      middleware: middlewareProfit,
      savings: directRevenue - (middlewareBuyPrice + middlewareProfit),
    }
  ];

  return (
    <div className="min-h-screen bg-[#0a0e27] pt-24 pb-12 px-6">
      <div className="max-w-[1400px] mx-auto">
        <div className="mb-12">
          <Link to="/" className="text-[#3b82f6] flex items-center gap-2 mb-8 hover:underline">
            <ArrowLeft size={20} /> Back to Demos
          </Link>
          <h1 className="text-[#f8fafc] text-4xl md:text-5xl font-bold mb-4">Economic Impact Calculator</h1>
          <p className="text-[#94a3b8] text-xl">Calculate the cost of API arbitrage and market distortion</p>
        </div>

        <div className="bg-[#1e1b4b] border border-[#334155] rounded-2xl p-8 md:p-12 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <h3 className="text-white text-2xl font-bold">Configure Pricing Model</h3>
            <div className="flex flex-wrap gap-2">
              {presets.map((p) => (
                <button
                  key={p.name}
                  onClick={() => applyPreset(p)}
                  className="px-4 py-1.5 rounded-full bg-[#0a0e27] border border-[#334155] text-[#94a3b8] text-xs font-bold hover:border-[#3b82f6] hover:text-white transition-all"
                >
                  {p.name}
                </button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="space-y-4">
              <label className="text-[#94a3b8] text-sm block">Provider A Retail Price (per 1k tokens)</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#3b82f6]">$</span>
                <input 
                  type="number" step="0.01" value={retailPrice}
                  onChange={(e) => setRetailPrice(parseFloat(e.target.value) || 0)}
                  className="w-full bg-[#0a0e27] border border-[#334155] rounded-xl py-3 pl-8 pr-4 text-white text-lg focus:border-[#3b82f6] outline-none"
                />
              </div>
            </div>
            <div className="space-y-4">
              <label className="text-[#94a3b8] text-sm block">Provider A Bulk/Enterprise Price</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#3b82f6]">$</span>
                <input 
                  type="number" step="0.01" value={bulkPrice}
                  onChange={(e) => setBulkPrice(parseFloat(e.target.value) || 0)}
                  className="w-full bg-[#0a0e27] border border-[#334155] rounded-xl py-3 pl-8 pr-4 text-white text-lg focus:border-[#3b82f6] outline-none"
                />
              </div>
            </div>
            <div className="space-y-4">
              <label className="text-[#94a3b8] text-sm block">Middleware Markup (%)</label>
              <div className="flex gap-4 items-center">
                <input 
                  type="range" min="0" max="100" value={markup}
                  onChange={(e) => setMarkup(parseInt(e.target.value))}
                  className="flex-1 h-1 bg-[#334155] rounded-lg appearance-none cursor-pointer accent-[#3b82f6]"
                />
                <span className="text-white font-bold w-12">{markup}%</span>
              </div>
            </div>
            <div className="space-y-4">
              <label className="text-[#94a3b8] text-sm block">Users Behind Middleware</label>
              <div className="relative">
                <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-[#3b82f6]" size={18} />
                <input 
                  type="number" value={volume}
                  onChange={(e) => setVolume(parseInt(e.target.value) || 0)}
                  className="w-full bg-[#0a0e27] border border-[#334155] rounded-xl py-3 pl-12 pr-4 text-white text-lg focus:border-[#3b82f6] outline-none"
                />
              </div>
            </div>
            <div className="space-y-4">
              <label className="text-[#94a3b8] text-sm block">Avg. Tokens per User (Monthly)</label>
              <input 
                type="number" value={usage}
                onChange={(e) => setUsage(parseInt(e.target.value) || 0)}
                className="w-full bg-[#0a0e27] border border-[#334155] rounded-xl py-3 px-4 text-white text-lg focus:border-[#3b82f6] outline-none"
              />
            </div>
          </div>
        </div>

        {/* Impact Analysis */}
        <div className="bg-[#0a0e27] border border-[#334155] rounded-2xl p-8 md:p-12 mb-8">
          <h3 className="text-white text-3xl font-bold mb-12">Economic Impact Analysis</h3>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* User Perspective */}
            <div className="bg-[#1e1b4b] rounded-xl p-8 space-y-8">
              <div className="flex justify-between items-start">
                <div className="text-white font-bold text-lg">User Perspective</div>
                <Users className="text-[#3b82f6]" />
              </div>
              <div>
                <div className="text-[#94a3b8] text-xs uppercase mb-1">Direct from Provider</div>
                <div className="text-white text-3xl">${userCostDirect.toFixed(2)} <span className="text-sm text-[#94a3b8]">/mo</span></div>
              </div>
              <div>
                <div className="text-[#94a3b8] text-xs uppercase mb-1 text-[#10b981]">Through Middleware</div>
                <div className="text-[#10b981] text-3xl font-bold">${userCostCascaded.toFixed(2)} <span className="text-sm text-[#94a3b8]">/mo</span></div>
              </div>
              <div className="pt-6 border-t border-[#334155]">
                <div className="text-white text-4xl font-bold text-[#10b981]">${userSavings.toFixed(2)}</div>
                <div className="bg-[#10b98120] text-[#10b981] text-xs font-bold px-3 py-1 rounded-full w-fit mt-2">
                  {userSavingsPercent}% cheaper
                </div>
              </div>
            </div>

            {/* Provider Impact */}
            <div className="bg-[#1e1b4b] rounded-xl p-8 space-y-8">
              <div className="flex justify-between items-start">
                <div className="text-white font-bold text-lg">Provider Impact</div>
                <TrendingDown className="text-[#ef4444]" />
              </div>
              <div>
                <div className="text-[#94a3b8] text-xs uppercase mb-1">Potential Revenue</div>
                <div className="text-white text-3xl">${(directRevenue/1000).toFixed(1)}k <span className="text-sm text-[#94a3b8]">/mo</span></div>
              </div>
              <div>
                <div className="text-[#94a3b8] text-xs uppercase mb-1 text-[#ef4444]">Actual Revenue</div>
                <div className="text-[#ef4444] text-3xl font-bold">${(middlewareBuyPrice/1000).toFixed(1)}k <span className="text-sm text-[#94a3b8]">/mo</span></div>
              </div>
              <div className="pt-6 border-t border-[#334155]">
                <div className="text-white text-4xl font-bold text-[#ef4444]">-${(revenueLoss/1000).toFixed(1)}k</div>
                <div className="bg-[#ef444420] text-[#ef4444] text-xs font-bold px-3 py-1 rounded-full w-fit mt-2">
                  {revenueLossPercent}% revenue loss
                </div>
              </div>
            </div>

            {/* Middleware Profit */}
            <div className="bg-[#1e1b4b] rounded-xl p-8 space-y-8">
              <div className="flex justify-between items-start">
                <div className="text-white font-bold text-lg">Middleware Arbitrage</div>
                <TrendingUp className="text-[#10b981]" />
              </div>
              <div>
                <div className="text-[#94a3b8] text-xs uppercase mb-1">Buy Price (Bulk)</div>
                <div className="text-white text-3xl">${(middlewareBuyPrice/1000).toFixed(1)}k</div>
              </div>
              <div>
                <div className="text-[#94a3b8] text-xs uppercase mb-1">Sell Price (Retail)</div>
                <div className="text-white text-3xl font-bold">${(middlewareSellPriceTotal/1000).toFixed(1)}k</div>
              </div>
              <div className="pt-6 border-t border-[#334155]">
                <div className="text-white text-4xl font-bold text-[#10b981]">+${(middlewareProfit/1000).toFixed(1)}k</div>
                <div className="bg-[#10b98120] text-[#10b981] text-xs font-bold px-3 py-1 rounded-full w-fit mt-2">
                  {markup}% margin
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Revenue Breakdown Chart */}
        <div className="bg-[#1e1b4b] border border-[#334155] rounded-xl p-8 mb-8">
          <h3 className="text-white text-2xl font-bold mb-8">Revenue Breakdown</h3>
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                <XAxis dataKey="name" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0a0e27', border: '1px solid #334155' }}
                  itemStyle={{ fontSize: '12px' }}
                />
                <Bar dataKey="provider" stackId="a" fill="#10b981" name="Provider Revenue" />
                <Bar dataKey="middleware" stackId="a" fill="#f59e0b" name="Middleware Profit" />
                <Bar dataKey="savings" stackId="a" fill="#3b82f6" name="User Savings / Loss" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-12 mt-8">
             <div className="flex items-center gap-2">
               <div className="w-3 h-3 rounded-full bg-[#10b981]" />
               <span className="text-[#94a3b8] text-sm">Provider Revenue</span>
             </div>
             <div className="flex items-center gap-2">
               <div className="w-3 h-3 rounded-full bg-[#f59e0b]" />
               <span className="text-[#94a3b8] text-sm">Middleware Profit</span>
             </div>
             <div className="flex items-center gap-2">
               <div className="w-3 h-3 rounded-full bg-[#3b82f6]" />
               <span className="text-[#94a3b8] text-sm">User Savings (Theoretical)</span>
             </div>
          </div>
        </div>

        {/* Industry Vulnerability Comparison */}
        <div className="bg-[#1e1b4b] border border-[#334155] rounded-xl p-8 mb-8">
          <div className="flex items-center gap-3 mb-8">
             <div className="bg-[#3b82f6]/10 p-2 rounded-lg">
               <Info className="text-[#3b82f6]" size={20} />
             </div>
             <div>
               <h3 className="text-white text-xl font-bold">Cross-Industry Revenue Vulnerability</h3>
               <p className="text-[#94a3b8] text-sm">Estimated annual provider revenue loss at 50% market saturation</p>
             </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart 
                layout="vertical"
                data={[
                  { category: 'Generative AI', loss: 80, color: '#ef4444' },
                  { category: 'Payment Rails', loss: 60, color: '#f59e0b' },
                  { category: 'Location Services', loss: 72, color: '#fb923c' },
                  { category: 'Communication (SMS)', loss: 45, color: '#10b981' },
                ]}
                margin={{ left: 40, right: 40 }}
              >
                <XAxis type="number" hide domain={[0, 100]} />
                <YAxis dataKey="category" type="category" axisLine={false} tickLine={false} tick={{ fill: '#f8fafc', fontSize: 12 }} width={120} />
                <Tooltip 
                  cursor={{ fill: '#334155', opacity: 0.1 }}
                  content={({ payload }) => payload?.[0] ? (
                    <div className="bg-[#0a0e27] border border-[#334155] p-2 rounded text-xs font-bold text-[#ef4444]">
                      {payload[0].value}% Vulnerability
                    </div>
                  ) : null}
                />
                <Bar dataKey="loss" radius={[0, 4, 4, 0]} barSize={20}>
                  {[
                    { category: 'Generative AI', loss: 80, color: '#ef4444' },
                    { category: 'Payment Rails', loss: 60, color: '#f59e0b' },
                    { category: 'Location Services', loss: 72, color: '#fb923c' },
                    { category: 'Communication (SMS)', loss: 45, color: '#10b981' },
                  ].map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Market Collapse simulation */}
        <div className="bg-[#0a0e27] border-2 border-dashed border-[#334155] rounded-2xl p-12">
          <h3 className="text-white text-2xl font-bold mb-8">Long-Term Market Impact</h3>
          <div className="max-w-2xl mb-12">
            <label className="text-[#94a3b8] text-sm block mb-4">% of Users Using Middleware</label>
            <input 
              type="range" min="0" max="100" value={marketShare}
              onChange={(e) => setMarketShare(parseInt(e.target.value))}
              className="w-full h-2 bg-[#334155] rounded-lg appearance-none cursor-pointer accent-[#ef4444]"
            />
            <div className="flex justify-between mt-2 text-[#64748b] text-xs">
              <span>Healthy Market (0%)</span>
              <span>Total Saturation (100%)</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
               <div className="bg-[#1e1b4b] p-6 rounded-xl border border-[#334155]">
                 <div className="text-[#94a3b8] text-sm mb-4">Provider R&D Budget</div>
                 <div className="flex items-end gap-4">
                   <div className={`text-3xl font-bold ${marketShare > 50 ? 'text-[#ef4444]' : 'text-[#10b981]'}`}>
                     ${Math.round(15000 * (1 - marketShare/100)).toLocaleString()}/mo
                   </div>
                   <div className="text-[#ef4444] font-bold pb-1">-{marketShare}% capacity</div>
                 </div>
               </div>
               <div className="bg-[#1e1b4b] p-6 rounded-xl border border-[#ef4444]/50">
                 <div className="flex items-center gap-2 text-[#ef4444] text-sm mb-4">
                   <AlertTriangle size={16} /> Time to Market Collapse
                 </div>
                 <div className="text-white text-4xl font-bold">
                   {marketShare < 20 ? 'Infinite' : `${Math.round(36 * (1 - marketShare/100))} Months`}
                 </div>
                 <div className="text-[#64748b] text-xs mt-2">Based on current industry R&D burn rate</div>
               </div>
            </div>
            <div className="bg-[#1e1b4b] p-8 rounded-xl h-[300px] flex items-center justify-center text-center">
              <div>
                <TrendingDown className="text-[#ef4444] mx-auto mb-4" size={48} />
                <p className="text-[#94a3b8] text-sm">
                   At <span className="text-white font-bold">{marketShare}%</span> market saturation, provider revenue is reduced by <span className="text-[#ef4444] font-bold">{marketShare}%</span>, leading to an unsustainable innovation cycle.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
