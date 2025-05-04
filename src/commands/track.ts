import { Composer } from 'grammy';
import { coinBlacklist, devBlacklist, rugCheck } from '../middlewares/filter';

const track = new Composer();

track
  .command('track', coinBlacklist, async (ctx) => {
    // 格式: /track <token_address>
    await ctx.reply('开始基础追踪：', { parse_mode: 'Markdown' });
    // ... 调用 Dexscreener API 存储&分析
  })
  .command('deeptrack', coinBlacklist, devBlacklist, rugCheck, async (ctx) => {
    // 高级追踪：通过所有安全检测
    await ctx.reply('✅ 已通过所有安全过滤，开始深度分析……');
    // ... 进一步逻辑
  });

export default track;
