// Export utilities for API Latency Testing Dashboard
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import type { ComparisonResult, EndpointStats } from "./types";

function isBrowser(): boolean {
  return typeof window !== "undefined" && typeof document !== "undefined";
}

function runAutoTable(
  doc: jsPDF,
  options: Parameters<typeof autoTable>[1]
): void {
  if (typeof autoTable === "function") {
    autoTable(doc, options);
    return;
  }

  const fallback = (doc as unknown as { autoTable?: (opts: unknown) => void })
    .autoTable;
  if (typeof fallback === "function") {
    fallback(options);
  }
}

/**
 * Export results to CSV format
 */
export function exportToCSV(result: ComparisonResult): boolean {
  if (!isBrowser()) return false;
  const rows: string[][] = [];

  // Header row
  rows.push([
    "Request #",
    "Direct Latency (ms)",
    "Direct Status",
    "Cascaded Latency (ms)",
    "Cascaded Status",
  ]);

  // Data rows
  const maxResults = Math.max(
    result.direct?.results.length || 0,
    result.cascaded?.results.length || 0
  );

  for (let i = 0; i < maxResults; i++) {
    const directResult = result.direct?.results[i];
    const cascadedResult = result.cascaded?.results[i];

    rows.push([
      String(i + 1),
      directResult ? directResult.latency.toFixed(2) : "N/A",
      directResult ? String(directResult.status) : "N/A",
      cascadedResult ? cascadedResult.latency.toFixed(2) : "N/A",
      cascadedResult ? String(cascadedResult.status) : "N/A",
    ]);
  }

  // Summary rows
  rows.push([]);
  rows.push(["Summary Statistics"]);
  rows.push(["Metric", "Direct", "Cascaded"]);
  rows.push([
    "Mean Latency (ms)",
    result.direct?.meanLatency?.toFixed(2) ?? "N/A",
    result.cascaded?.meanLatency?.toFixed(2) ?? "N/A",
  ]);
  rows.push([
    "Min Latency (ms)",
    result.direct?.minLatency?.toFixed(2) ?? "N/A",
    result.cascaded?.minLatency?.toFixed(2) ?? "N/A",
  ]);
  rows.push([
    "Max Latency (ms)",
    result.direct?.maxLatency?.toFixed(2) ?? "N/A",
    result.cascaded?.maxLatency?.toFixed(2) ?? "N/A",
  ]);
  rows.push([
    "Jitter (ms)",
    result.direct?.jitter?.toFixed(2) ?? "N/A",
    result.cascaded?.jitter?.toFixed(2) ?? "N/A",
  ]);
  rows.push([
    "Success Rate (%)",
    result.direct?.successRate?.toFixed(1) ?? "N/A",
    result.cascaded?.successRate?.toFixed(1) ?? "N/A",
  ]);
  rows.push(["Cascading Penalty (%)", result.penaltyPercentage?.toFixed(2) ?? "N/A"]);

  // Convert to CSV string
  const csvContent = rows.map((row) => row.join(",")).join("\n");

  // Download
  try {
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `latency-test-${new Date().toISOString().split("T")[0]}.csv`
    );
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    return true;
  } catch (error) {
    console.error("CSV export failed:", error);
    return false;
  }
}

/**
 * Generate a shareable link with encoded test configuration
 */
export function generateShareableLink(
  directUrl: string,
  cascadedUrl: string
): string {
  const params = new URLSearchParams();
  params.set("direct", encodeURIComponent(directUrl));
  params.set("cascaded", encodeURIComponent(cascadedUrl));

  return `${window.location.origin}${window.location.pathname}?${params.toString()}`;
}

/**
 * Copy text to clipboard
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  if (!isBrowser()) return false;

  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    // fall back below
  }

  try {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.setAttribute("readonly", "true");
    textarea.style.position = "absolute";
    textarea.style.left = "-9999px";
    document.body.appendChild(textarea);
    textarea.select();
    const success = document.execCommand("copy");
    document.body.removeChild(textarea);
    return success;
  } catch {
    return false;
  }
}

/**
 * Export results to PDF
 */
export function exportToPDF(result: ComparisonResult): boolean {
  if (!isBrowser()) return false;
  try {
  const doc = new jsPDF();

  // Title
  doc.setFontSize(20);
  doc.setTextColor(59, 130, 246); // Blue accent
  doc.text("API Latency Test Report", 14, 22);

  // Date
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  doc.text(`Generated: ${new Date(result.timestamp).toLocaleString()}`, 14, 32);

  // Summary section
  doc.setFontSize(14);
  doc.setTextColor(0, 0, 0);
  doc.text("Summary", 14, 45);

  const summaryData = [
    ["Metric", "Direct", "Cascaded"],
    [
      "Mean Latency",
      result.direct?.meanLatency != null ? `${result.direct.meanLatency.toFixed(2)} ms` : "N/A",
      result.cascaded?.meanLatency != null ? `${result.cascaded.meanLatency.toFixed(2)} ms` : "N/A",
    ],
    [
      "Min Latency",
      result.direct?.minLatency != null ? `${result.direct.minLatency.toFixed(2)} ms` : "N/A",
      result.cascaded?.minLatency != null ? `${result.cascaded.minLatency.toFixed(2)} ms` : "N/A",
    ],
    [
      "Max Latency",
      result.direct?.maxLatency != null ? `${result.direct.maxLatency.toFixed(2)} ms` : "N/A",
      result.cascaded?.maxLatency != null ? `${result.cascaded.maxLatency.toFixed(2)} ms` : "N/A",
    ],
    [
      "Jitter (Std Dev)",
      result.direct?.jitter != null ? `${result.direct.jitter.toFixed(2)} ms` : "N/A",
      result.cascaded?.jitter != null ? `${result.cascaded.jitter.toFixed(2)} ms` : "N/A",
    ],
    [
      "Success Rate",
      result.direct?.successRate != null ? `${result.direct.successRate.toFixed(1)}%` : "N/A",
      result.cascaded?.successRate != null ? `${result.cascaded.successRate.toFixed(1)}%` : "N/A",
    ],
  ];

  runAutoTable(doc, {
    startY: 50,
    head: [summaryData[0]],
    body: summaryData.slice(1),
    theme: "striped",
    headStyles: { fillColor: [59, 130, 246] },
  });

  // Cascading Penalty
  const finalY = (doc as unknown as { lastAutoTable: { finalY: number } }).lastAutoTable.finalY || 100;
  doc.setFontSize(12);
  doc.text(
    `Cascading Penalty: ${result.penaltyPercentage?.toFixed(2) ?? "N/A"}%`,
    14,
    finalY + 15
  );

  // Endpoint URLs
  doc.setFontSize(14);
  doc.text("Tested Endpoints", 14, finalY + 30);

  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  doc.text(`Direct: ${result.direct?.url || "N/A"}`, 14, finalY + 40);
  doc.text(`Cascaded: ${result.cascaded?.url || "N/A"}`, 14, finalY + 48);

  // Detailed results table
  doc.setFontSize(14);
  doc.setTextColor(0, 0, 0);
  doc.text("Detailed Results", 14, finalY + 65);

  const detailData: string[][] = [];
  const maxResults = Math.max(
    result.direct?.results.length || 0,
    result.cascaded?.results.length || 0
  );

  for (let i = 0; i < maxResults; i++) {
    const directResult = result.direct?.results[i];
    const cascadedResult = result.cascaded?.results[i];

    detailData.push([
      String(i + 1),
      directResult ? `${directResult.latency.toFixed(2)} ms` : "N/A",
      directResult ? String(directResult.status) : "N/A",
      cascadedResult ? `${cascadedResult.latency.toFixed(2)} ms` : "N/A",
      cascadedResult ? String(cascadedResult.status) : "N/A",
    ]);
  }

  runAutoTable(doc, {
    startY: finalY + 70,
    head: [["Request #", "Direct (ms)", "Direct Status", "Cascaded (ms)", "Cascaded Status"]],
    body: detailData,
    theme: "striped",
    headStyles: { fillColor: [59, 130, 246] },
  });

  // Formula explanation
  const finalY2 = (doc as unknown as { lastAutoTable: { finalY: number } }).lastAutoTable.finalY || 200;
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  doc.text("Cascading Latency Formula: Lt = Σ(Pk + Sk + Ik + J(t)) + ε", 14, finalY2 + 15);
  doc.text("Where: Pk = Processing, Sk = Serialization, Ik = Network, J(t) = Jitter, ε = Error", 14, finalY2 + 22);

  // Save
  doc.save(`latency-test-${new Date().toISOString().split("T")[0]}.pdf`);
  return true;
  } catch (error) {
    console.error("PDF export failed:", error);
    return false;
  }
}

/**
 * Parse URL parameters for shared links
 */
export function parseSharedParams(): {
  directUrl: string | null;
  cascadedUrl: string | null;
} {
  const params = new URLSearchParams(window.location.search);
  return {
    directUrl: params.get("direct") ? decodeURIComponent(params.get("direct")!) : null,
    cascadedUrl: params.get("cascaded") ? decodeURIComponent(params.get("cascaded")!) : null,
  };
}
