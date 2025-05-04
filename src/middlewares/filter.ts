import { NextFunction, Context } from 'grammy';
import { config } from '../config';
import {
  fetchDexData,
  verifyWithPocket,
  verifyWithRugCheck,
} from '../services/api';
import logger from '../utils/logger';

// 币种黑名单
export async function coinBlacklist(ctx: Context, next: NextFunction): Promise<void> {
  const coin = ctx.match?.toString().toLowerCase();
  if (coin && config.blacklist.coins.includes(coin)) {
    await ctx.reply('❌ 该币种已被列入黑名单，无法追踪。');
    return;
  }
  await next();
}

// 开发者黑名单
export async function devBlacklist(ctx: Context, next: NextFunction): Promise<void> {
  // 假设我们通过命令参数获得 dev 地址
  const devAddr = ctx.match?.toString().toLowerCase();
  if (devAddr && config.blacklist.devs.includes(devAddr)) {
    await ctx.reply('❌ 该开发者已被列入黑名单，无法追踪。');
    return;
  }
  await next();
}

// 核心防 rug 检测
export async function rugCheck(ctx: Context, next: NextFunction): Promise<void> {
  const address = ctx.match?.toString();
  if (!address) {
    await ctx.reply('请输入合法的代币地址。');
    return;
  }

  try {
    // 1. Dexscreener 数据交叉
    const dexData = await fetchDexData('ethereum', address);
    if (!dexData.pairs?.length) {
      await ctx.reply('❌ 未在 Dexscreener 上找到该代币，可能为恶意合约。');
      return;
    }

    // 2. Pocket Universe 验真
    const pocketRes = await verifyWithPocket(address);
    if (!pocketRes.valid) {
      await ctx.reply('❌ Pocket 验证未通过，疑似假交易量或水军刷量。');
      return;
    }

    // 3. RugCheck 最终验证
    const rugRes = await verifyWithRugCheck(address);
    if (rugRes.status !== 'good') {
      await ctx.reply('❌ RugCheck 检测不通过，已列入黑名单。');
      return;
    }

    // 4. 进一步检查发行合约是否包含锁仓/捆绑
    // 假设我们可以通过 Dexscreener API 或 Pocket API 获取这类信息
    const hasLiquidity = dexData.pairs[0]?.liquidity?.usd && dexData.pairs[0].liquidity.usd > 1000;
    if (!hasLiquidity) {
      await ctx.reply('❌ 代币流动性不足，风险过高。');
      return;
    }

    // 全部通过，继续后续逻辑
    await next();
  } catch (error) {
    logger.error('Rug check failed:', error);
    await ctx.reply('❌ 安全检查时发生错误，请稍后再试。');
    // Note: We return here, stopping the middleware chain in case of error
  }
}
