// API Latency Testing Engine
import type { TestResult, EndpointStats, TestConfig } from "./types";

/**
 * Measures latency for a single API request
 */
async function measureRequest(
  url: string,
  timeout: number,
  headers?: Record<string, string>,
  body?: string
): Promise<TestResult> {
  const requestNumber = 0; // Will be set by caller
  const startTime = performance.now();
  const timestamp = Date.now();

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      method: body ? "POST" : "GET",
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      body: body ? body : undefined,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);
    const endTime = performance.now();
    const latency = endTime - startTime;

    return {
      requestNumber,
      latency,
      status: response.status,
      timestamp,
    };
  } catch (error) {
    clearTimeout(timeoutId);
    const endTime = performance.now();
    const latency = endTime - startTime;

    return {
      requestNumber,
      latency,
      status: 0,
      timestamp,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

/**
 * Runs multiple requests to an endpoint and collects statistics
 */
export async function testEndpoint(
  url: string,
  label: string,
  config: TestConfig
): Promise<EndpointStats> {
  const results: TestResult[] = [];

  for (let i = 0; i < config.requestCount; i++) {
    const result = await measureRequest(
      url,
      config.timeout,
      config.headers,
      config.body
    );
    result.requestNumber = i + 1;
    results.push(result);

    // Small delay between requests to avoid rate limiting
    if (i < config.requestCount - 1) {
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
  }

  return calculateStats(url, label, results);
}

/**
 * Calculates statistics from test results
 */
export function calculateStats(
  url: string,
  label: string,
  results: TestResult[]
): EndpointStats {
  const successfulResults = results.filter(
    (r) => !r.error && r.status >= 200 && r.status < 400
  );
  const latencies = successfulResults.map((r) => r.latency);

  const totalRequests = results.length;
  const successfulRequests = successfulResults.length;
  const successRate = (successfulRequests / totalRequests) * 100;

  let meanLatency = 0;
  let minLatency = 0;
  let maxLatency = 0;
  let variance = 0;
  let jitter = 0;

  if (latencies.length > 0) {
    meanLatency = latencies.reduce((a, b) => a + b, 0) / latencies.length;
    minLatency = Math.min(...latencies);
    maxLatency = Math.max(...latencies);

    // Calculate variance
    variance =
      latencies.reduce((sum, lat) => sum + Math.pow(lat - meanLatency, 2), 0) /
      latencies.length;

    // Jitter is standard deviation
    jitter = Math.sqrt(variance);
  }

  return {
    url,
    label,
    results,
    meanLatency,
    minLatency,
    maxLatency,
    jitter,
    variance,
    successRate,
    totalRequests,
    successfulRequests,
  };
}

/**
 * Calculates the cascading penalty percentage
 * Using the formula: Lt = Σ(Pk + Sk + Ik + J(t)) + ε
 * Penalty = ((Cascaded - Direct) / Direct) * 100
 */
export function calculatePenalty(
  direct: EndpointStats | null,
  cascaded: EndpointStats | null
): number {
  if (!direct || !cascaded || direct.meanLatency === 0) {
    return 0;
  }

  return ((cascaded.meanLatency - direct.meanLatency) / direct.meanLatency) * 100;
}

/**
 * Get latency rating for color coding
 */
export function getLatencyRating(latency: number): "fast" | "medium" | "slow" {
  if (latency < 200) return "fast";
  if (latency < 500) return "medium";
  return "slow";
}

/**
 * Get jitter rating for color coding
 */
export function getJitterRating(jitter: number): "fast" | "medium" | "slow" {
  if (jitter < 50) return "fast";
  if (jitter < 100) return "medium";
  return "slow";
}