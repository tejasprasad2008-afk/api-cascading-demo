// Types for API Latency Testing Dashboard

export interface TestResult {
  requestNumber: number;
  latency: number; // in milliseconds
  status: number;
  timestamp: number;
  error?: string;
}

export interface EndpointStats {
  url: string;
  label: string;
  results: TestResult[];
  meanLatency: number;
  minLatency: number;
  maxLatency: number;
  jitter: number; // standard deviation
  variance: number;
  successRate: number;
  totalRequests: number;
  successfulRequests: number;
}

export interface ComparisonResult {
  direct: EndpointStats | null;
  cascaded: EndpointStats | null;
  penaltyPercentage: number;
  timestamp: number;
}

export interface TestConfig {
  directUrl: string;
  cascadedUrl: string;
  requestCount: number;
  timeout: number;
  headers?: Record<string, string>;
  body?: string;
}

// Cascading Latency Formula: Lt = Σ(Pk + Sk + Ik + J(t)) + ε
// Where:
// Pk = Processing time at each hop
// Sk = Serialization time
// Ik = Network latency between hops
// J(t) = Jitter at time t
// ε = Error/overhead term

export interface LatencyComponent {
  processing: number;
  serialization: number;
  network: number;
  jitter: number;
  error: number;
}

export const DEFAULT_CONFIG: TestConfig = {
  directUrl: "",
  cascadedUrl: "",
  requestCount: 10,
  timeout: 30000,
};

export const EXAMPLE_URLS = {
  direct: "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd",
  cascaded: "https://api.allorigins.win/get?url=https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd",
};
