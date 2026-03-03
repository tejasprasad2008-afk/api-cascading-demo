"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  ScatterChart,
  Scatter,
  ZAxis,
} from "recharts";
import type { EndpointStats } from "../lib/types";

interface LatencyChartsProps {
  direct: EndpointStats | null;
  cascaded: EndpointStats | null;
}

export function LatencyLineChart({ direct, cascaded }: LatencyChartsProps) {
  if (!direct && !cascaded) return null;

  // Combine data for the line chart
  const maxRequests = Math.max(
    direct?.results.length || 0,
    cascaded?.results.length || 0
  );

  const data = Array.from({ length: maxRequests }, (_, i) => ({
    request: i + 1,
    direct: direct?.results[i]?.latency || null,
    cascaded: cascaded?.results[i]?.latency || null,
  }));

  return (
    <div className="bg-[#0f172a] rounded-xl p-6 border border-slate-700/50">
      <h3 className="text-lg font-semibold text-white mb-4">
        Latency per Request
      </h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis
              dataKey="request"
              stroke="#94a3b8"
              tick={{ fill: "#94a3b8" }}
              label={{
                value: "Request #",
                position: "insideBottom",
                offset: -5,
                fill: "#94a3b8",
              }}
            />
            <YAxis
              stroke="#94a3b8"
              tick={{ fill: "#94a3b8" }}
              label={{
                value: "Latency (ms)",
                angle: -90,
                position: "insideLeft",
                fill: "#94a3b8",
              }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1e293b",
                border: "1px solid #334155",
                borderRadius: "8px",
              }}
              labelStyle={{ color: "#fff" }}
              itemStyle={{ color: "#94a3b8" }}
              formatter={(value) => {
                const num = Number(value);
                return isNaN(num) ? "N/A" : `${num.toFixed(2)} ms`;
              }}
            />
            <Legend />
            {direct && (
              <Line
                type="monotone"
                dataKey="direct"
                name="Direct"
                stroke="#22c55e"
                strokeWidth={2}
                dot={{ fill: "#22c55e", r: 4 }}
                activeDot={{ r: 6 }}
                connectNulls={false}
              />
            )}
            {cascaded && (
              <Line
                type="monotone"
                dataKey="cascaded"
                name="Cascaded"
                stroke="#eab308"
                strokeWidth={2}
                dot={{ fill: "#eab308", r: 4 }}
                activeDot={{ r: 6 }}
                connectNulls={false}
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export function ComparisonBarChart({ direct, cascaded }: LatencyChartsProps) {
  if (!direct && !cascaded) return null;

  const data = [
    {
      name: "Mean Latency",
      direct: direct?.meanLatency || 0,
      cascaded: cascaded?.meanLatency || 0,
    },
    {
      name: "Min Latency",
      direct: direct?.minLatency || 0,
      cascaded: cascaded?.minLatency || 0,
    },
    {
      name: "Max Latency",
      direct: direct?.maxLatency || 0,
      cascaded: cascaded?.maxLatency || 0,
    },
    {
      name: "Jitter (σ)",
      direct: direct?.jitter || 0,
      cascaded: cascaded?.jitter || 0,
    },
  ];

  return (
    <div className="bg-[#0f172a] rounded-xl p-6 border border-slate-700/50">
      <h3 className="text-lg font-semibold text-white mb-4">
        Direct vs Cascaded Comparison
      </h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barGap={8}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis
              dataKey="name"
              stroke="#94a3b8"
              tick={{ fill: "#94a3b8" }}
            />
            <YAxis
              stroke="#94a3b8"
              tick={{ fill: "#94a3b8" }}
              label={{
                value: "Milliseconds",
                angle: -90,
                position: "insideLeft",
                fill: "#94a3b8",
              }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1e293b",
                border: "1px solid #334155",
                borderRadius: "8px",
              }}
              labelStyle={{ color: "#fff" }}
              formatter={(value) => {
                const num = Number(value);
                return isNaN(num) ? "N/A" : `${num.toFixed(2)} ms`;
              }}
            />
            <Legend />
            <Bar
              dataKey="direct"
              name="Direct"
              fill="#22c55e"
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="cascaded"
              name="Cascaded"
              fill="#eab308"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export function JitterScatterPlot({ direct, cascaded }: LatencyChartsProps) {
  if (!direct && !cascaded) return null;

  // Create scatter data with jitter visualization
  const directData =
    direct?.results.map((r: any, i: any) => ({
      x: i + 1,
      y: r.latency,
      type: "direct",
      deviation: Math.abs(r.latency - direct.meanLatency),
    })) || [];

  const cascadedData =
    cascaded?.results.map((r: any, i: any) => ({
      x: i + 1,
      y: r.latency,
      type: "cascaded",
      deviation: Math.abs(r.latency - cascaded!.meanLatency),
    })) || [];

  const allData = [...directData, ...cascadedData];

  return (
    <div className="bg-[#0f172a] rounded-xl p-6 border border-slate-700/50">
      <h3 className="text-lg font-semibold text-white mb-4">
        Jitter Visualization
      </h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis
              type="number"
              dataKey="x"
              name="request"
              stroke="#94a3b8"
              tick={{ fill: "#94a3b8" }}
              label={{
                value: "Request #",
                position: "insideBottom",
                offset: -10,
                fill: "#94a3b8",
              }}
            />
            <YAxis
              type="number"
              dataKey="y"
              name="latency"
              stroke="#94a3b8"
              tick={{ fill: "#94a3b8" }}
              label={{
                value: "Latency (ms)",
                angle: -90,
                position: "insideLeft",
                fill: "#94a3b8",
              }}
            />
            <ZAxis
              type="number"
              dataKey="deviation"
              range={[50, 400]}
              name="deviation"
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1e293b",
                border: "1px solid #334155",
                borderRadius: "8px",
              }}
              labelStyle={{ color: "#fff" }}
              formatter={(value, name) => {
                const num = Number(value);
                if (isNaN(num)) return "N/A";
                if (name === "latency" || name === "deviation") return `${num.toFixed(2)} ms`;
                return num;
              }}
              cursor={{ strokeDasharray: "3 3" }}
            />
            <Legend />
            {direct && (
              <Scatter
                name="Direct"
                data={directData}
                fill="#22c55e"
                shape="circle"
              />
            )}
            {cascaded && (
              <Scatter
                name="Cascaded"
                data={cascadedData}
                fill="#eab308"
                shape="circle"
              />
            )}
          </ScatterChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 text-sm text-slate-400 text-center">
        Circle size represents deviation from mean latency
      </div>
    </div>
  );
}