import bot from './bot';
import logger from './utils/logger';

// Import other middlewares

// Import commands

// Removed DB-related shutdown handlers as DB is not used

// Start the bot directly
try {
  bot.start();
  logger.info('🤖 Bot started successfully');
} catch (err) {
  logger.error('Failed to start bot:', err);
}
