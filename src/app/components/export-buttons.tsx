"use client";

import { useState } from "react";
import type { ComparisonResult } from "../lib/types";
import {
  exportToCSV,
  exportToPDF,
  generateShareableLink,
  copyToClipboard,
} from "../lib/export-utils";

interface ExportButtonsProps {
  result: ComparisonResult | null;
  directUrl: string;
  cascadedUrl: string;
}

export function ExportButtons({
  result,
  directUrl,
  cascadedUrl,
}: ExportButtonsProps) {
  const [copied, setCopied] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const showError = (message: string) => {
    setErrorMessage(message);
    setTimeout(() => setErrorMessage(null), 3500);
  };

  const handleCopyLink = async () => {
    const link = generateShareableLink(directUrl, cascadedUrl);
    const success = await copyToClipboard(link);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      return;
    }

    showError("Copy failed. Try again or use a different browser.");
  };

  const handleExportCSV = () => {
    if (result) {
      const success = exportToCSV(result);
      if (!success) {
        showError("CSV export failed. Check browser permissions or pop-up blocking.");
      }
    }
  };

  const handleExportPDF = () => {
    if (result) {
      const success = exportToPDF(result);
      if (!success) {
        showError("PDF export failed. Check browser permissions or pop-up blocking.");
      }
    }
  };

  const isDisabled = !result;

  return (
    <div className="bg-[#0f172a] rounded-xl p-6 border border-slate-700/50">
      <h3 className="text-lg font-semibold text-white mb-4">Export Results</h3>

      <div className="flex flex-wrap gap-3">
        <button
          onClick={handleExportCSV}
          disabled={isDisabled}
          className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 disabled:bg-slate-800 disabled:text-slate-500 text-white rounded-lg transition-all"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          Download CSV
        </button>

        <button
          onClick={handleExportPDF}
          disabled={isDisabled}
          className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 disabled:bg-slate-800 disabled:text-slate-500 text-white rounded-lg transition-all"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
            />
          </svg>
          Export PDF
        </button>

        <button
          onClick={handleCopyLink}
          disabled={!directUrl && !cascadedUrl}
          className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 disabled:bg-slate-800 disabled:text-slate-500 text-white rounded-lg transition-all"
        >
          {copied ? (
            <>
              <svg
                className="w-5 h-5 text-green-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              Copied!
            </>
          ) : (
            <>
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                />
              </svg>
              Copy Shareable Link
            </>
          )}
        </button>
      </div>

      {isDisabled && (
        <p className="text-sm text-slate-500 mt-3">
          Run a test to enable export options
        </p>
      )}
      {errorMessage && (
        <p className="mt-3 text-sm text-rose-400">{errorMessage}</p>
      )}
    </div>
  );
}
