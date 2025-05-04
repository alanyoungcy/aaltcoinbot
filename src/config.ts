import { config as loadEnv } from 'dotenv';

loadEnv();

export interface BotConfig {
  token: string;
  dexscreenerApiUrl: string;
  pocketApiUrl: string;
  pocketApiKey: string;
  rugCheckUrl: string;
  blacklist: {
    coins: string[]; // 币种黑名单 address or symbol
    devs: string[]; // 开发者钱包黑名单
  };
}

export const config: BotConfig = {
  token: process.env.BOT_TOKEN!,
  dexscreenerApiUrl: process.env.DEXSCREENER_API_URL || 'https://api.dexscreener.com/latest/dex/search',
  pocketApiUrl: process.env.POCKET_API_URL!,
  pocketApiKey: process.env.POCKET_API_KEY!,
  rugCheckUrl: process.env.RUGCHECK_URL || 'https://rugcheck.xyz/api/v1/verify',
  blacklist: {
    coins: (process.env.COIN_BLACKLIST || '').split(',').filter(Boolean),
    devs: (process.env.DEV_BLACKLIST || '').split(',').filter(Boolean),
  },
};
