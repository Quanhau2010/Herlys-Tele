"use strict";

// ╔══════════════════════════════════════════════════════════════════╗
// ║                                                                  ║
// ║        ██╗  ██╗███████╗██████╗ ██╗  ██╗   ██╗███████╗          ║
// ║        ██║  ██║██╔════╝██╔══██╗██║  ╚██╗ ██╔╝██╔════╝          ║
// ║        ███████║█████╗  ██████╔╝██║   ╚████╔╝ ███████╗          ║
// ║        ██╔══██║██╔══╝  ██╔══██╗██║    ╚██╔╝  ╚════██║          ║
// ║        ██║  ██║███████╗██║  ██║███████╗██║   ███████║          ║
// ║        ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚══════╝╚═╝   ╚══════╝          ║
// ║                    Telegram Bot — Mirai Style                    ║
// ║                          v1.0.0                                  ║
// ╚══════════════════════════════════════════════════════════════════╝

const TelegramBot = require("node-telegram-bot-api");
const fs          = require("fs");
const path        = require("path");

// ─── Config ──────────────────────────────────────────────────────
const config = JSON.parse(fs.readFileSync("./config.json", "utf-8"));

// ─── Logger ──────────────────────────────────────────────────────
const C = {
  reset: "\x1b[0m", bold: "\x1b[1m",
  cyan: "\x1b[36m", green: "\x1b[32m", yellow: "\x1b[33m",
  red: "\x1b[31m", magenta: "\x1b[35m", gray: "\x1b[90m", white: "\x1b[97m",
  blue: "\x1b[34m",
};

function ts() {
  return new Date().toLocaleString("vi-VN", {
    timeZone: "Asia/Ho_Chi_Minh", hour12: false,
    hour: "2-digit", minute: "2-digit", second: "2-digit",
    day: "2-digit", month: "2-digit", year: "numeric",
  });
}

const log = {
  info:  (m) => console.log(`${C.gray}[${ts()}]${C.reset} ${C.cyan}${C.bold}[ INFO  ]${C.reset} ${C.white}${m}${C.reset}`),
  ok:    (m) => console.log(`${C.gray}[${ts()}]${C.reset} ${C.green}${C.bold}[  OK   ]${C.reset} ${C.white}${m}${C.reset}`),
  warn:  (m) => console.log(`${C.gray}[${ts()}]${C.reset} ${C.yellow}${C.bold}[ WARN  ]${C.reset} ${C.yellow}${m}${C.reset}`),
  error: (m, e) => console.error(`${C.gray}[${ts()}]${C.reset} ${C.red}${C.bold}[ ERROR ]${C.reset} ${C.red}${m}${e ? " → " + e.message : ""}${C.reset}`),
  load:  (name, ver, auth) => console.log(`${C.gray}[${ts()}]${C.reset} ${C.blue}${C.bold}[ LOAD  ]${C.reset} ${C.cyan}${name.padEnd(14)}${C.reset} ${C.gray}v${ver} by ${auth}${C.reset}`),
  cmd:   (user, cmd, chat) => console.log(`${C.gray}[${ts()}]${C.reset} ${C.magenta}${C.bold}[ CMD   ]${C.reset} ${C.cyan}${cmd.padEnd(14)}${C.reset} ${C.gray}by${C.reset} ${C.white}${user}${C.reset} ${C.gray}chat:${chat}${C.reset}`),
  event: (type, chat) => console.log(`${C.gray}[${ts()}]${C.reset} ${C.yellow}${C.bold}[ EVENT ]${C.reset} ${C.yellow}${type.padEnd(14)}${C.reset} ${C.gray}chat:${chat}${C.reset}`),
  banner: () => console.log(`\n${C.cyan}${C.bold}
  ██╗  ██╗███████╗██████╗ ██╗  ██╗   ██╗███████╗
  ██║  ██║██╔════╝██╔══██╗██║  ╚██╗ ██╔╝██╔════╝
  ███████║█████╗  ██████╔╝██║   ╚████╔╝ ███████╗
  ██╔══██║██╔══╝  ██╔══██╗██║    ╚██╔╝  ╚════██║
  ██║  ██║███████╗██║  ██║███████╗██║   ███████║
  ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚══════╝╚═╝   ╚══════╝
${C.reset}${C.gray}             Telegram Bot — Mirai Module Style${C.reset}
${C.cyan}  ══════════════════════════════════════════════${C.reset}\n`),
};

// ─── Bot init ────────────────────────────────────────────────────
log.banner();
log.info("Starting bot...");

const bot      = new TelegramBot(config.token, {
  polling: { interval: 300, params: { timeout: 10 } },
});
const START_MS = Date.now();

// ─── Module registry ─────────────────────────────────────────────
const commands  = new Map(); // name → module
const aliases   = new Map(); // alias → name
const cooldowns = new Map(); // userId:cmdName → timestamp

// ─── Load modules ────────────────────────────────────────────────
const MODULE_DIR = path.join(__dirname, "modules");
if (!fs.existsSync(MODULE_DIR)) fs.mkdirSync(MODULE_DIR);

let loadedCount = 0;
let failedCount = 0;

function loadModules() {
  const files = fs.readdirSync(MODULE_DIR).filter((f) => f.endsWith(".js"));

  for (const file of files) {
    const filePath = path.join(MODULE_DIR, file);
    try {
      delete require.cache[require.resolve(filePath)]; // hot-reload support
      const mod = require(filePath);

      if (!mod.config || !mod.run) {
        log.warn(`Skipped ${file} — missing config or run()`);
        failedCount++;
        continue;
      }

      const { name, version = "1.0", author = "Unknown", aliases: als = [] } = mod.config;

      if (!name) {
        log.warn(`Skipped ${file} — missing config.name`);
        failedCount++;
        continue;
      }

      commands.set(name.toLowerCase(), mod);
      for (const alias of als) aliases.set(alias.toLowerCase(), name.toLowerCase());

      log.load(name, version, author);
      loadedCount++;
    } catch (e) {
      log.error(`Failed to load ${file}`, e);
      failedCount++;
    }
  }

  log.ok(`Loaded ${loadedCount} modules, ${failedCount} failed.\n`);
}

loadModules();

// ─── Helpers ─────────────────────────────────────────────────────
const sleep   = (ms) => new Promise((r) => setTimeout(r, ms));
const nowVN   = () => new Date().toLocaleString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh", hour12: false });
const tag     = (u) => `<a href="tg://user?id=${u.id}">${[u.first_name, u.last_name].filter(Boolean).join(" ")}</a>`;
const uname   = (u) => u.username ? `@${u.username}` : u.first_name;
const isAdmin = async (chatId, userId) => {
  try { return (await bot.getChatAdministrators(chatId)).some((a) => a.user.id === userId); }
  catch { return false; }
};
const isSuperAdmin = (userId) => config.adminIds.includes(userId);

// ─── Context builder ─────────────────────────────────────────────
// Giống Mirai: mỗi lệnh nhận 1 object context
function buildContext(msg, args) {
  const chatId    = msg.chat.id;
  const threadID  = chatId; // alias quen thuộc
  const senderID  = msg.from.id;
  const messageID = msg.message_id;

  return {
    // Core
    api: {
      sendMessage:   (text, opts = {}) => bot.sendMessage(chatId, text, { parse_mode: "HTML", ...opts }),
      sendPhoto:     (photo, opts = {}) => bot.sendPhoto(chatId, photo, { parse_mode: "HTML", ...opts }),
      sendVideo:     (video, opts = {}) => bot.sendVideo(chatId, video, { parse_mode: "HTML", ...opts }),
      sendAudio:     (audio, opts = {}) => bot.sendAudio(chatId, audio, { parse_mode: "HTML", ...opts }),
      sendAnimation: (anim, opts = {}) => bot.sendAnimation(chatId, anim, { parse_mode: "HTML", ...opts }),
      sendSticker:   (sticker, opts = {}) => bot.sendSticker(chatId, sticker, opts),
      reply:         (text, opts = {}) => bot.sendMessage(chatId, text, { parse_mode: "HTML", reply_to_message_id: messageID, ...opts }),
      replyPhoto:    (photo, opts = {}) => bot.sendPhoto(chatId, photo, { parse_mode: "HTML", reply_to_message_id: messageID, ...opts }),
      replyVideo:    (video, opts = {}) => bot.sendVideo(chatId, video, { parse_mode: "HTML", reply_to_message_id: messageID, ...opts }),
      deleteMessage: (mid = messageID) => bot.deleteMessage(chatId, mid).catch(() => {}),
      editMessage:   (mid, text, opts = {}) => bot.editMessageText(text, { chat_id: chatId, message_id: mid, parse_mode: "HTML", ...opts }),
      getAdmins:     () => bot.getChatAdministrators(chatId),
      getChat:       () => bot.getChat(chatId),
      getMember:     (uid) => bot.getChatMember(chatId, uid),
      banMember:     (uid) => bot.banChatMember(chatId, uid),
      unbanMember:   (uid) => bot.unbanChatMember(chatId, uid),
      muteMember:    (uid, until) => bot.restrictChatMember(chatId, uid, { permissions: { can_send_messages: false }, until_date: until }),
      unmuteMember:  (uid) => bot.restrictChatMember(chatId, uid, { permissions: { can_send_messages: true, can_send_media_messages: true, can_send_polls: true, can_send_other_messages: true, can_add_web_page_previews: true } }),
    },

    // Event info
    event:    msg,
    message:  msg,
    threadID,
    chatId,
    senderID,
    messageID,
    args,

    // User info
    sender:   msg.from,
    chat:     msg.chat,

    // Utils
    isAdmin:      () => isAdmin(chatId, senderID),
    isSuperAdmin: () => isSuperAdmin(senderID),
    tag,
    uname,
    sleep,
    nowVN,

    // Bot & config
    bot,
    config,
    commands,
    startTime: START_MS,
  };
}

// ─── Cooldown check ──────────────────────────────────────────────
function checkCooldown(userId, cmdName, seconds) {
  if (!seconds || seconds <= 0) return false;
  const key = `${userId}:${cmdName}`;
  const now = Date.now();
  const last = cooldowns.get(key) || 0;
  const diff = (now - last) / 1000;
  if (diff < seconds) return (seconds - diff).toFixed(1);
  cooldowns.set(key, now);
  return false;
}

// ─── Message handler ─────────────────────────────────────────────
bot.on("message", async (msg) => {
  if (!msg.text || !msg.from) return;

  const text   = msg.text.trim();
  const prefix = config.prefix || "/";

  if (!text.startsWith(prefix)) return;

  const withoutPrefix = text.slice(prefix.length).trim();
  const parts         = withoutPrefix.split(/\s+/);
  const cmdRaw        = parts[0].toLowerCase();
  const args          = parts.slice(1);

  // Resolve alias
  const cmdName = aliases.get(cmdRaw) || cmdRaw;
  const mod     = commands.get(cmdName);

  if (!mod) return;

  const { config: cfg, run } = mod;

  // Log
  log.cmd(uname(msg.from), prefix + cmdName, msg.chat.id);

  // Permission check
  if (cfg.adminOnly) {
    const ok = await isAdmin(msg.chat.id, msg.from.id);
    if (!ok) {
      return bot.sendMessage(msg.chat.id, "🚫 <b>Lệnh này chỉ dành cho admin nhóm!</b>", {
        parse_mode: "HTML",
        reply_to_message_id: msg.message_id,
      });
    }
  }

  if (cfg.superAdminOnly) {
    if (!isSuperAdmin(msg.from.id)) {
      return bot.sendMessage(msg.chat.id, "🚫 <b>Lệnh này chỉ dành cho Super Admin!</b>", {
        parse_mode: "HTML",
        reply_to_message_id: msg.message_id,
      });
    }
  }

  // Cooldown check
  const remaining = checkCooldown(msg.from.id, cmdName, cfg.cooldowns);
  if (remaining) {
    return bot.sendMessage(
      msg.chat.id,
      `⏳ <b>Hãy chờ</b> <code>${remaining}s</code> trước khi dùng lệnh này lại!`,
      { parse_mode: "HTML", reply_to_message_id: msg.message_id }
    );
  }

  // Run command
  const ctx = buildContext(msg, args);
  try {
    await run(ctx);
  } catch (e) {
    log.error(`Error running /${cmdName}`, e);
    bot.sendMessage(
      msg.chat.id,
      `❌ <b>Lỗi khi chạy lệnh:</b> <code>${e.message}</code>`,
      { parse_mode: "HTML", reply_to_message_id: msg.message_id }
    );
  }
});

// ─── Events ──────────────────────────────────────────────────────
bot.on("new_chat_members", async (msg) => {
  log.event("new_member", msg.chat.id);
  for (const m of msg.new_chat_members) {
    if (m.is_bot) continue;
    try {
      await bot.sendVideo(msg.chat.id, config.media?.welcome || config.media?.gif, {
        caption:
          `👋 <b>CHÀO MỪNG THÀNH VIÊN MỚI!</b>\n` +
          `━━━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
          `Xin chào, ${tag(m)}!\n\n` +
          `Bạn vừa tham gia <b>${msg.chat.title}</b> 🎉\n\n` +
          `<blockquote expandable>📌 ${config.prefix}help — xem tất cả lệnh\n💳 ${config.prefix}muavip — nâng cấp VIP\n📞 ${config.prefix}contact — liên hệ admin</blockquote>\n` +
          `<i>⏰ ${nowVN()}</i>`,
        parse_mode: "HTML",
        supports_streaming: true,
      });
    } catch (e) { log.error("Welcome failed", e); }
  }
});

bot.on("left_chat_member", async (msg) => {
  log.event("left_member", msg.chat.id);
  const m = msg.left_chat_member;
  if (m.is_bot) return;
  try {
    await bot.sendMessage(msg.chat.id,
      `👋 <b>TẠM BIỆT!</b>\n━━━━━━━━━━━━━━━━\n${tag(m)} vừa rời <b>${msg.chat.title}</b>\n<i>Chúc bạn mọi điều tốt đẹp! 🌟</i>`,
      { parse_mode: "HTML" }
    );
  } catch (e) { log.error("Goodbye failed", e); }
});

// Xóa file document nếu không phải admin
bot.on("document", async (msg) => {
  if (msg.chat.type === "private") return;
  const admins = await bot.getChatAdministrators(msg.chat.id).catch(() => []);
  if (!admins.some((a) => a.user.id === msg.from.id)) {
    bot.deleteMessage(msg.chat.id, msg.message_id).catch(() => {});
  }
});

// ─── Error handlers ──────────────────────────────────────────────
bot.on("polling_error", (e) => log.error("Polling error", e));
bot.on("webhook_error",  (e) => log.error("Webhook error", e));
process.on("uncaughtException",  (e) => log.error("Uncaught exception", e));
process.on("unhandledRejection", (r)  => log.warn(`Unhandled rejection: ${r}`));

// ─── Ready ───────────────────────────────────────────────────────
bot.getMe()
  .then((me) => {
    log.ok(`Connected → @${me.username} (ID: ${me.id})`);
    log.info(`Prefix: "${config.prefix}" | Commands: ${commands.size}`);
    log.info(`Super admins: [${config.adminIds.join(", ")}]`);
    log.info("Ready!\n");
  })
  .catch((e) => {
    log.error("Failed to connect", e);
    process.exit(1);
  });