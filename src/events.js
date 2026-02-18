// ╔══════════════════════════════════════════════════════╗
// ║           HERLYS BOT — EVENT HANDLERS                ║
// ╚══════════════════════════════════════════════════════╝

const { UI } = require("./ui");
const cfg = require("./config");
const logger = require("./logger");

module.exports = function registerEvents(bot) {

  // ─── Thành viên mới ────────────────────────────────
  bot.on("new_chat_members", async (msg) => {
    for (const member of msg.new_chat_members) {
      if (member.is_bot) continue;
      logger.info(`New member: ${member.first_name} joined ${msg.chat.title}`);
      try {
        await bot.sendVideo(msg.chat.id, cfg.MEDIA.WELCOME_VIDEO, {
          caption: UI.welcome(member, msg.chat.title || "nhóm"),
          parse_mode: "HTML",
          reply_to_message_id: msg.message_id,
          supports_streaming: true,
        });
      } catch (e) {
        logger.error("Welcome message failed", e);
      }
    }
  });

  // ─── Thành viên rời ────────────────────────────────
  bot.on("left_chat_member", async (msg) => {
    const member = msg.left_chat_member;
    if (member.is_bot) return;
    logger.info(`Member left: ${member.first_name} from ${msg.chat.title}`);
    try {
      await bot.sendMessage(msg.chat.id, UI.goodbye(member, msg.chat.title || "nhóm"), {
        parse_mode: "HTML",
      });
    } catch (e) {
      logger.error("Goodbye message failed", e);
    }
  });

  // ─── Polling error ─────────────────────────────────
  bot.on("polling_error", (err) => {
    logger.error("Polling error", err);
  });

  // ─── Webhook error ─────────────────────────────────
  bot.on("webhook_error", (err) => {
    logger.error("Webhook error", err);
  });
};