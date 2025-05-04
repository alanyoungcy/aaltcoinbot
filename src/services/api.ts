import fetch from 'node-fetch';
import { config } from '../config';
import { DexscreenerResponse, PocketResponse, RugCheckResponse } from '../utils/types';

export async function fetchDexData(chain: string, address: string): Promise<DexscreenerResponse> {
  const res = await fetch(
    `${config.dexscreenerApiUrl}?chain=${chain}&q=${address}`,
  );
  return res.json();
}

export async function verifyWithPocket(address: string): Promise<PocketResponse> {
  const res = await fetch(`${config.pocketApiUrl}/token/${address}`, {
    headers: { 'x-api-key': config.pocketApiKey },
  });
  return res.json();
}

export async function verifyWithRugCheck(address: string): Promise<RugCheckResponse> {
  const res = await fetch(config.rugCheckUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ address }),
  });
  return res.json();
}
