import { Bot } from 'grammy';
import { config } from './config';
import track from './commands/track';
import logger from './utils/logger';
import error from './middlewares/error';

// Create bot instance to be exported and used in index.ts
const bot = new Bot(config.token);

// Register error middleware first
bot.use(error);

// Register commands
bot.use(track);

// Setup error handling
bot.catch((err) => {
  logger.error('Bot error:', err);
});

export default bot;
