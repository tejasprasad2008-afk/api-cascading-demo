"use client";

import { useEffect, useState, useRef } from "react";

interface ApiChainDiagramProps {
  isAnimating: boolean;
  directUrl: string;
  cascadedUrl: string;
}

interface Particle {
  id: number;
  progress: number;
  path: "direct" | "cascaded";
}

// Particle animation component that manages its own lifecycle
function ParticleAnimation({ 
  isAnimating 
}: { 
  isAnimating: boolean 
}) {
  const [particles, setParticles] = useState<Particle[]>([]);
  const particleIdRef = useRef(0);

  useEffect(() => {
    if (!isAnimating) {
      // Clear particles when animation stops via interval callback
      return;
    }

    // Add particles periodically
    const addInterval = setInterval(() => {
      particleIdRef.current += 2;
      const id = particleIdRef.current;
      setParticles((prev) => [
        ...prev,
        { id: id, progress: 0, path: "direct" },
        { id: id + 1, progress: 0, path: "cascaded" },
      ]);
    }, 500);

    // Animate particles
    const animateInterval = setInterval(() => {
      setParticles((prev) =>
        prev
          .map((p) => ({ ...p, progress: p.progress + 2 }))
          .filter((p) => p.progress <= 100)
      );
    }, 30);

    return () => {
      clearInterval(addInterval);
      clearInterval(animateInterval);
      // Clear on unmount or when animation stops
      setParticles([]);
    };
  }, [isAnimating]);

  if (!isAnimating && particles.length === 0) return null;

  return (
    <>
      {particles.map((particle) => {
        const path =
          particle.path === "direct"
            ? "M 80 128 Q 200 80 320 128 Q 440 176 560 128"
            : "M 80 128 Q 200 176 320 128 Q 440 80 560 128";
        const color = particle.path === "direct" ? "#22c55e" : "#eab308";

        return (
          <svg
            key={particle.id}
            className="absolute inset-0 w-full h-full pointer-events-none"
          >
            <circle r="6" fill={color} opacity="0.8">
              <animateMotion
                dur="1.5s"
                repeatCount="1"
                path={path}
                begin={`${particle.id * 0.01}s`}
              />
            </circle>
          </svg>
        );
      })}
    </>
  );
}

export function ApiChainDiagram({
  isAnimating,
  directUrl,
  cascadedUrl,
}: ApiChainDiagramProps) {
  const getNodeName = (url: string, fallback: string) => {
    try {
      const urlObj = new URL(url);
      return urlObj.hostname.replace("www.", "");
    } catch {
      return fallback;
    }
  };

  return (
    <div className="bg-[#0f172a] rounded-xl p-6 border border-slate-700/50">
      <h3 className="text-lg font-semibold text-white mb-6">
        API Request Chain
      </h3>

      <div className="relative h-64 overflow-hidden">
        {/* Background Grid */}
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%">
            <defs>
              <pattern
                id="grid"
                width="20"
                height="20"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 20 0 L 0 0 0 20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.5"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Nodes */}
        <div className="absolute inset-0 flex items-center justify-between px-4">
          {/* User Node */}
          <div className="flex flex-col items-center z-10">
            <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
            <span className="text-xs text-slate-400 mt-2">User</span>
          </div>

          {/* Direct Path - Single Node */}
          <div className="flex flex-col items-center z-10">
            <div className="w-16 h-16 rounded-full bg-green-600 flex items-center justify-center shadow-lg shadow-green-500/30">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"
                />
              </svg>
            </div>
            <span className="text-xs text-slate-400 mt-2 text-center max-w-20 truncate">
              {directUrl ? getNodeName(directUrl, "Direct API") : "Direct API"}
            </span>
          </div>

          {/* Cascaded Path - Intermediate Node */}
          <div className="flex flex-col items-center z-10">
            <div className="w-16 h-16 rounded-full bg-yellow-600 flex items-center justify-center shadow-lg shadow-yellow-500/30">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                />
              </svg>
            </div>
            <span className="text-xs text-slate-400 mt-2 text-center max-w-20 truncate">
              {cascadedUrl
                ? getNodeName(cascadedUrl, "Proxy")
                : "Intermediate"}
            </span>
          </div>

          {/* Provider Node */}
          <div className="flex flex-col items-center z-10">
            <div className="w-16 h-16 rounded-full bg-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/30">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
            </div>
            <span className="text-xs text-slate-400 mt-2">Provider</span>
          </div>
        </div>

        {/* Connection Lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {/* Direct Path Line (User -> Direct API -> Provider) */}
          <path
            d="M 80 128 Q 200 80 320 128 Q 440 176 560 128"
            fill="none"
            stroke="#22c55e"
            strokeWidth="2"
            strokeDasharray="5,5"
            opacity="0.5"
          />

          {/* Cascaded Path Line (User -> Proxy -> Provider) */}
          <path
            d="M 80 128 Q 200 176 320 128 Q 440 80 560 128"
            fill="none"
            stroke="#eab308"
            strokeWidth="2"
            strokeDasharray="5,5"
            opacity="0.5"
          />
        </svg>

        {/* Animated Particles */}
        <ParticleAnimation isAnimating={isAnimating} />

        {/* Legend */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-6 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className="text-slate-400">Direct Path</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <span className="text-slate-400">Cascaded Path</span>
          </div>
        </div>
      </div>
    </div>
  );
}