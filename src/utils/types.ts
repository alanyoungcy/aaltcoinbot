/**
 * Common types for the application
 */

// Dexscreener API response types
export interface DexscreenerResponse {
  pairs?: DexPair[];
}

export interface DexPair {
  chainId: string;
  dexId: string;
  url: string;
  pairAddress: string;
  baseToken: {
    address: string;
    name: string;
    symbol: string;
  };
  quoteToken: {
    symbol: string;
  };
  priceUsd?: number;
  priceNative?: number;
  liquidity?: {
    usd?: number;
  };
}

// Pocket API response types
export interface PocketResponse {
  valid: boolean;
  message?: string;
  data?: any;
}

// RugCheck API response types
export interface RugCheckResponse {
  status: 'good' | 'warning' | 'danger';
  message?: string;
  details?: any;
} 