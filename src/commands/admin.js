// ╔══════════════════════════════════════════════════════╗
// ║           HERLYS BOT — ADMIN COMMANDS                ║
// ╚══════════════════════════════════════════════════════╝

const os = require("os");
const { exec } = require("child_process");
const { UI } = require("../ui");
const { requireAdmin, requireSuperAdmin, logCmd, sleep, formatUptime } = require("../middleware");
const { ADMIN_IDS } = require("../config");
const logger = require("../logger");

// Re-export formatUptime helper since it's used here
function fmtUptime(ms) {
  const s = Math.floor(ms / 1000);
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  return `${h}h ${m}m ${sec}s`;
}

function getMemUsage() {
  const total = os.totalmem();
  const free = os.freemem();
  const used = total - free;
  return {
    total: (total / 1024 ** 3).toFixed(2),
    used: (used / 1024 ** 3).toFixed(2),
    percent: ((used / total) * 100).toFixed(1),
  };
}

module.exports = function registerAdmin(bot, startTime) {
  const HTML = { parse_mode: "HTML" };
  const reply = (msg, text) =>
    bot.sendMessage(msg.chat.id, text, { ...HTML, reply_to_message_id: msg.message_id });
  const send = (chatId, text) => bot.sendMessage(chatId, text, HTML);

  // ─── /upt ──────────────────────────────────────────
  bot.onText(/\/upt/, async (msg) => {
    logCmd(msg, "/upt");
    const mem = getMemUsage();
    await reply(msg, UI.upt({
      uptime: fmtUptime(Date.now() - startTime),
      mem,
      nodeVer: process.version,
      os: `${os.type()} ${os.release()}`,
      cpuCount: os.cpus().length,
      user: msg.from,
    }));
  });

  // ─── /mad ──────────────────────────────────────────
  bot.onText(/\/mad/, async (msg) => {
    logCmd(msg, "/mad");
    await reply(msg, UI.mad(msg.from));
  });

  // ─── /ban ──────────────────────────────────────────
  bot.onText(/\/ban(?:\s+(\d+))?/, async (msg, match) => {
    logCmd(msg, "/ban");
    if (!(await requireAdmin(bot, msg, UI))) return;
    const targetId = match[1]
      ? parseInt(match[1])
      : msg.reply_to_message?.from?.id;
    if (!targetId)
      return reply(msg, UI.usage("/ban [ID]", "/ban 123456789"));
    try {
      await bot.banChatMember(msg.chat.id, targetId);
      await reply(msg, `🔨 <b>Đã ban</b> người dùng <code>${targetId}</code>`);
      logger.success(`Banned ${targetId} in chat ${msg.chat.id}`);
    } catch (e) {
      await reply(msg, UI.error(e.message));
    }
  });

  // ─── /unban ────────────────────────────────────────
  bot.onText(/\/unban (\d+)/, async (msg, match) => {
    logCmd(msg, "/unban");
    if (!(await requireAdmin(bot, msg, UI))) return;
    const targetId = parseInt(match[1]);
    try {
      await bot.unbanChatMember(msg.chat.id, targetId);
      await reply(msg, `✅ <b>Đã gỡ ban</b> người dùng <code>${targetId}</code>`);
    } catch (e) {
      await reply(msg, UI.error(e.message));
    }
  });

  // ─── /mute ─────────────────────────────────────────
  bot.onText(/\/mute (\d+) (\d+)/, async (msg, match) => {
    logCmd(msg, "/mute");
    if (!(await requireAdmin(bot, msg, UI))) return;
    const targetId = parseInt(match[1]);
    const hours = parseInt(match[2]);
    const until = Math.floor(Date.now() / 1000) + hours * 3600;
    try {
      await bot.restrictChatMember(msg.chat.id, targetId, {
        permissions: { can_send_messages: false },
        until_date: until,
      });
      await reply(msg,
        `🔇 <b>Đã mute</b> <code>${targetId}</code> trong <b>${hours} giờ</b>`
      );
    } catch (e) {
      await reply(msg, UI.error(e.message));
    }
  });

  // ─── /unmute ───────────────────────────────────────
  bot.onText(/\/unmute (\d+)/, async (msg, match) => {
    logCmd(msg, "/unmute");
    if (!(await requireAdmin(bot, msg, UI))) return;
    const targetId = parseInt(match[1]);
    try {
      await bot.restrictChatMember(msg.chat.id, targetId, {
        permissions: {
          can_send_messages: true,
          can_send_media_messages: true,
          can_send_polls: true,
          can_send_other_messages: true,
          can_add_web_page_previews: true,
          can_invite_users: true,
        },
      });
      await reply(msg, `🔊 <b>Đã unmute</b> người dùng <code>${targetId}</code>`);
    } catch (e) {
      await reply(msg, UI.error(e.message));
    }
  });

  // ─── /kick 🆕 ──────────────────────────────────────
  bot.onText(/\/kick(?:\s+(\d+))?/, async (msg, match) => {
    logCmd(msg, "/kick");
    if (!(await requireAdmin(bot, msg, UI))) return;
    const targetId = match[1]
      ? parseInt(match[1])
      : msg.reply_to_message?.from?.id;
    if (!targetId)
      return reply(msg, UI.usage("/kick [ID]", "/kick 123456789"));
    try {
      await bot.banChatMember(msg.chat.id, targetId);
      await bot.unbanChatMember(msg.chat.id, targetId); // ban rồi unban = kick
      await reply(msg, `👢 <b>Đã kick</b> người dùng <code>${targetId}</code>`);
    } catch (e) {
      await reply(msg, UI.error(e.message));
    }
  });

  // ─── /everyone ─────────────────────────────────────
  bot.onText(/\/everyone (.+)/, async (msg, match) => {
    logCmd(msg, "/everyone");
    if (!(await requireAdmin(bot, msg, UI))) return;
    const notification =
      `📢 <b>THÔNG BÁO</b>\n${require("../ui").DIV2}\n` +
      match[1];
    const admins = await bot.getChatAdministrators(msg.chat.id);
    let sent = 0;
    for (const admin of admins) {
      if (!admin.user.is_bot) {
        try {
          await bot.sendMessage(admin.user.id, notification, HTML);
          sent++;
        } catch {}
      }
    }
    await send(msg.chat.id, notification);
    await reply(msg, `✅ Đã gửi thông báo đến <b>${sent}</b> admin.`);
  });

  // ─── /broadcast ────────────────────────────────────
  bot.onText(/\/broadcast (.+)/, async (msg, match) => {
    logCmd(msg, "/broadcast");
    if (!(await requireSuperAdmin(bot, msg, UI))) return;
    const content = match[1];
    await send(msg.chat.id,
      `📣 <b>BROADCAST</b>\n${require("../ui").DIV2}\n${content}`
    );
  });

  // ─── /reset ────────────────────────────────────────
  bot.onText(/\/reset/, async (msg) => {
    logCmd(msg, "/reset");
    if (!(await requireSuperAdmin(bot, msg, UI))) return;
    const mem = getMemUsage();
    await reply(msg,
      `🔄 <b>KHỞI ĐỘNG LẠI BOT</b>\n${require("../ui").DIV2}\n` +
      `⏱ Uptime: <code>${fmtUptime(Date.now() - startTime)}</code>\n` +
      `💾 RAM: ${mem.percent}%\n` +
      `\n⏳ <i>Đang khởi động lại...</i>`
    );
    logger.warn("Bot restarting by admin command...");
    await sleep(1500);
    exec(`node ${process.argv[1]}`);
    process.exit(0);
  });

  // ─── Xóa file document nếu không phải admin ────────
  bot.on("document", async (msg) => {
    const chatId = msg.chat.id;
    const userId = msg.from.id;
    if (msg.chat.type === "private") return;
    const admins = await bot.getChatAdministrators(chatId).catch(() => []);
    const isAdm = admins.some((a) => a.user.id === userId);
    if (!isAdm) {
      bot.deleteMessage(chatId, msg.message_id).catch(() => {});
    }
  });
};