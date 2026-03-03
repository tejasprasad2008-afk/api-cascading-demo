"use client";

import type { EndpointStats } from "../lib/types";
import { getLatencyRating, getJitterRating } from "../lib/testing-engine";

interface ResultsCardsProps {
  direct: EndpointStats | null;
  cascaded: EndpointStats | null;
  penaltyPercentage: number;
}

function StatCard({
  label,
  value,
  unit,
  rating,
}: {
  label: string;
  value: string | number;
  unit?: string;
  rating?: "fast" | "medium" | "slow";
}) {
  const ratingColors = {
    fast: "text-green-400",
    medium: "text-yellow-400",
    slow: "text-red-400",
  };

  return (
    <div className="bg-[#1e293b] rounded-lg p-4">
      <div className="text-sm text-slate-400 mb-1">{label}</div>
      <div className={`text-2xl font-bold ${rating ? ratingColors[rating] : "text-white"}`}>
        {value}
        {unit && <span className="text-sm font-normal text-slate-400 ml-1">{unit}</span>}
      </div>
    </div>
  );
}

function EndpointCard({
  stats,
  type,
}: {
  stats: EndpointStats;
  type: "Direct" | "Cascaded";
}) {
  const latencyRating = getLatencyRating(stats.meanLatency);
  const jitterRating = getJitterRating(stats.jitter);

  const borderColor: Record<"fast" | "medium" | "slow", string> = {
    fast: "border-green-500/30",
    medium: "border-yellow-500/30",
    slow: "border-red-500/30",
  };

  return (
    <div
      className={`bg-[#0f172a] rounded-xl p-6 border-2 ${borderColor[latencyRating]}`}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">{type} Endpoint</h3>
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${stats.successRate === 100
              ? "bg-green-500/20 text-green-400"
              : stats.successRate >= 80
                ? "bg-yellow-500/20 text-yellow-400"
                : "bg-red-500/20 text-red-400"
            }`}
        >
          {stats.successRate.toFixed(0)}% Success
        </span>
      </div>

      <div className="text-sm text-slate-400 mb-4 truncate" title={stats.url}>
        {stats.url}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <StatCard
          label="Mean Latency"
          value={stats.meanLatency.toFixed(1)}
          unit="ms"
          rating={latencyRating}
        />
        <StatCard
          label="Jitter (σ)"
          value={stats.jitter.toFixed(1)}
          unit="ms"
          rating={jitterRating}
        />
        <StatCard
          label="Min Latency"
          value={stats.minLatency.toFixed(1)}
          unit="ms"
        />
        <StatCard
          label="Max Latency"
          value={stats.maxLatency.toFixed(1)}
          unit="ms"
        />
      </div>

      <div className="mt-4 pt-4 border-t border-slate-700">
        <div className="flex justify-between text-sm">
          <span className="text-slate-400">Total Requests</span>
          <span className="text-white">{stats.totalRequests}</span>
        </div>
        <div className="flex justify-between text-sm mt-1">
          <span className="text-slate-400">Successful</span>
          <span className="text-green-400">{stats.successfulRequests}</span>
        </div>
      </div>
    </div>
  );
}

export function ResultsCards({
  direct,
  cascaded,
  penaltyPercentage,
}: ResultsCardsProps) {
  if (!direct && !cascaded) {
    return null;
  }

  return (
    <div className="space-y-6">
      {/* Penalty Banner */}
      {direct && cascaded && (
        <div
          className={`rounded-xl p-4 text-center ${penaltyPercentage <= 0
              ? "bg-green-500/10 border border-green-500/30"
              : penaltyPercentage < 20
                ? "bg-yellow-500/10 border border-yellow-500/30"
                : "bg-red-500/10 border border-red-500/30"
            }`}
        >
          <div className="text-sm text-slate-400 mb-1">Cascading Penalty</div>
          <div
            className={`text-3xl font-bold ${penaltyPercentage <= 0
                ? "text-green-400"
                : penaltyPercentage < 20
                  ? "text-yellow-400"
                  : "text-red-400"
              }`}
          >
            {penaltyPercentage > 0 ? "+" : ""}
            {penaltyPercentage.toFixed(1)}%
          </div>
          <div className="text-xs text-slate-500 mt-1">
            Lt = Σ(Pk + Sk + Ik + J(t)) + ε
          </div>
        </div>
      )}

      {/* Comparison Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {direct && <EndpointCard stats={direct} type="Direct" />}
        {cascaded && <EndpointCard stats={cascaded} type="Cascaded" />}
      </div>
    </div>
  );
}