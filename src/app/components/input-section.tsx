"use client";

import { useState } from "react";
import type { TestConfig } from "../lib/types";
import { EXAMPLE_URLS } from "../lib/types";

interface InputSectionProps {
  config: TestConfig;
  onConfigChange: (config: TestConfig) => void;
  onTest: () => void;
  isTesting: boolean;
}

export function InputSection({
  config,
  onConfigChange,
  onTest,
  isTesting,
}: InputSectionProps) {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleLoadExample = () => {
    onConfigChange({
      ...config,
      directUrl: EXAMPLE_URLS.direct,
      cascadedUrl: EXAMPLE_URLS.cascaded,
    });
  };

  return (
    <div className="bg-[#0f172a] rounded-xl p-6 border border-slate-700/50">
      <h2 className="text-xl font-semibold text-white mb-4">
        API Endpoint Configuration
      </h2>

      <div className="space-y-4">
        {/* Direct URL Input */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Direct Endpoint URL
          </label>
          <input
            type="url"
            value={config.directUrl}
            onChange={(e) =>
              onConfigChange({ ...config, directUrl: e.target.value })
            }
            placeholder="https://api.example.com/v1/endpoint"
            className="w-full px-4 py-3 bg-[#1e293b] border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>

        {/* Cascaded URL Input */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Cascaded/Repackaged Endpoint URL
          </label>
          <input
            type="url"
            value={config.cascadedUrl}
            onChange={(e) =>
              onConfigChange({ ...config, cascadedUrl: e.target.value })
            }
            placeholder="https://proxy.example.com/v1/endpoint"
            className="w-full px-4 py-3 bg-[#1e293b] border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>

        {/* Advanced Options Toggle */}
        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
        >
          {showAdvanced ? "▼ Hide" : "▶ Show"} Advanced Options
        </button>

        {/* Advanced Options */}
        {showAdvanced && (
          <div className="space-y-4 p-4 bg-[#1e293b] rounded-lg border border-slate-600">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Number of Requests
              </label>
              <input
                type="number"
                min="1"
                max="100"
                value={config.requestCount}
                onChange={(e) =>
                  onConfigChange({
                    ...config,
                    requestCount: parseInt(e.target.value) || 10,
                  })
                }
                className="w-32 px-3 py-2 bg-[#0f172a] border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Timeout (ms)
              </label>
              <input
                type="number"
                min="1000"
                max="60000"
                step="1000"
                value={config.timeout}
                onChange={(e) =>
                  onConfigChange({
                    ...config,
                    timeout: parseInt(e.target.value) || 30000,
                  })
                }
                className="w-32 px-3 py-2 bg-[#0f172a] border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Custom Headers (JSON)
              </label>
              <textarea
                value={config.headers ? JSON.stringify(config.headers, null, 2) : ""}
                onChange={(e) => {
                  try {
                    const headers = e.target.value ? JSON.parse(e.target.value) : undefined;
                    onConfigChange({ ...config, headers });
                  } catch {
                    // Invalid JSON, keep previous value
                  }
                }}
                placeholder='{"Authorization": "Bearer token"}'
                className="w-full px-3 py-2 bg-[#0f172a] border border-slate-600 rounded-lg text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
              />
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 pt-2">
          <button
            onClick={onTest}
            disabled={isTesting || (!config.directUrl && !config.cascadedUrl)}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-all flex items-center gap-2"
          >
            {isTesting ? (
              <>
                <svg
                  className="animate-spin h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Testing...
              </>
            ) : (
              <>
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Test Now
              </>
            )}
          </button>

          <button
            onClick={handleLoadExample}
            className="px-4 py-3 bg-slate-700 hover:bg-slate-600 text-slate-300 font-medium rounded-lg transition-all"
          >
            Load Example URLs
          </button>
        </div>
      </div>
    </div>
  );
}
