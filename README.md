# aaltcoinbot

Atsolution to develop this bot for altcoin trading

## Installation

1.  Clone the repository:
    ```bash
    git clone <your-repository-url>
    cd aaltcoinbot
    ```
2.  Install dependencies using pnpm:
    ```bash
    pnpm install
    ```

## Environment Setup

1.  Create a `.env` file in the root directory of the project.
2.  Copy the contents from `config.env.sample` or use the following template, filling in your actual values:

    ```dotenv
    BOT_TOKEN=your_telegram_bot_token
    DEXSCREENER_API_URL=https://api.dexscreener.com/latest/dex/search
    POCKET_API_URL=your_pocket_api_url
    POCKET_API_KEY=your_pocket_api_key
    RUGCHECK_URL=https://rugcheck.xyz/api/v1/verify
    COIN_BLACKLIST=token_address1,token_symbol2
    DEV_BLACKLIST=developer_address1,developer_address2
    DEBUG=false
    ```

## Running the Bot

1.  **Development Mode (with hot-reloading):**
    This command compiles the TypeScript code and restarts the bot automatically when changes are detected.
    ```bash
    pnpm run dev
    ```

2.  **Production Mode:**
    First, ensure the project is built:
    ```bash
    pnpm run build
    ```
    Then, start the bot:
    ```bash
    pnpm start
    ```

## Building for Production

To compile the TypeScript code into JavaScript (output to the `build` directory):

```bash
pnpm run build
```
