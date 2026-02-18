// ╔══════════════════════════════════════════════════════════════════════╗
// ║                                                                      ║
// ║   ██╗  ██╗███████╗██████╗ ██╗  ██╗   ██╗███████╗    ██████╗  ██████╗████████╗  ║
// ║                    HERLYS BOT — Node.js v3.0.0                       ║
// ║                    Built with ❤️ by Herlys War                       ║
// ╚══════════════════════════════════════════════════════════════════════╝

"use strict";

const TelegramBot = require("node-telegram-bot-api");
const logger      = require("./src/logger");
const cfg         = require("./src/config");

// ─── Init ─────────────────────────────────────────────────────────────
const startTime = Date.now();

logger.banner();
logger.info(`Starting ${cfg.BOT_NAME} v${cfg.BOT_VERSION}...`);

const bot = new TelegramBot(cfg.TOKEN, {
  polling: {
    interval: 300,
    autoStart: true,
    params: { timeout: 10 },
  },
});

// ─── Register Modules ────────────────────────────────────────────────
logger.info("Loading command modules...");

require("./src/commands/general")(bot);
logger.success("Loaded: general commands");

require("./src/commands/social")(bot);
logger.success("Loaded: social/info commands");

require("./src/commands/entertainment")(bot);
logger.success("Loaded: entertainment commands");

require("./src/commands/admin")(bot, startTime);
logger.success("Loaded: admin commands");

require("./src/commands/tooldownload")(bot);
logger.success("Loaded: tool download commands");

require("./src/events")(bot);
logger.success("Loaded: event handlers");

// ─── Process Guard ───────────────────────────────────────────────────
process.on("uncaughtException", (err) => {
  logger.error("Uncaught Exception", err);
});
process.on("unhandledRejection", (reason) => {
  logger.warn(`Unhandled Rejection: ${reason}`);
});

// ─── Ready ───────────────────────────────────────────────────────────
bot.getMe().then((me) => {
  logger.success(`Bot ready: @${me.username} (ID: ${me.id})`);
  logger.info(`Admin IDs: [${cfg.ADMIN_IDS.join(", ")}]`);
  logger.info("Listening for messages...\n");
}).catch((e) => {
  logger.error("Failed to connect to Telegram API", e);
  process.exit(1);
});