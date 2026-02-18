// ╔══════════════════════════════════════════════════════╗
// ║           HERLYS BOT — TOOL DOWNLOAD COMMANDS        ║
// ╚══════════════════════════════════════════════════════╝

const { logCmd } = require("../middleware");
const cfg = require("../config");
const { DIV2, DIV } = require("../ui");

module.exports = function registerTools(bot) {
  const HTML = { parse_mode: "HTML" };
  const sendVid = (chatId, vid, caption, replyId) =>
    bot.sendVideo(chatId, vid, {
      caption,
      parse_mode: "HTML",
      reply_to_message_id: replyId,
      supports_streaming: true,
    });

  // ─── /taitool_adr ──────────────────────────────────
  bot.onText(/\/taitool_adr/, (msg) => {
    logCmd(msg, "/taitool_adr");
    sendVid(msg.chat.id, cfg.MEDIA.DEFAULT_GIF,
      `📦 <b>TẢI TOOL — ANDROID</b>\n${DIV2}\n` +
      `<blockquote expandable>📥 <a href="https://keyherlyswar.x10.mx/huongdan">Nhấn vào đây để tải</a></blockquote>`,
      msg.message_id
    );
  });

  // ─── /taitool_ios ──────────────────────────────────
  bot.onText(/\/taitool_ios/, (msg) => {
    logCmd(msg, "/taitool_ios");
    sendVid(msg.chat.id, cfg.MEDIA.DEFAULT_GIF,
      `📦 <b>TẢI TOOL — IOS</b>\n${DIV2}\n` +
      `<blockquote expandable>📥 <a href="https://www.mediafire.com/file/72dfs4b1gzwts0z/ToolGopHerlysWar.py/file">Nhấn vào đây để tải</a></blockquote>`,
      msg.message_id
    );
  });

  // ─── /setuptool_adr ────────────────────────────────
  bot.onText(/\/setuptool_adr/, (msg) => {
    logCmd(msg, "/setuptool_adr");
    sendVid(msg.chat.id, cfg.MEDIA.DEFAULT_GIF,
      `⚙️ <b>CÀI ĐẶT TOOL — ANDROID</b>\n${DIV2}\n` +
      `<b>B1:</b> Tải Termux mới nhất:\n` +
      `<a href="https://apkcombo.com/termux/com.termux/">Tải Termux tại đây</a>\n\n` +
      `<b>B2:</b> Mở Termux, chạy lệnh:\n` +
      `<blockquote expandable><code>termux-setup-storage && pkg update && pkg upgrade && pkg install python && pip install requests && cd /sdcard/download && python ToolGopHerlysWar.py</code></blockquote>\n\n` +
      `<b>Lần sau:</b>\n` +
      `<blockquote expandable><code>cd /sdcard/download && python ToolGopHerlysWar.py</code></blockquote>`,
      msg.message_id
    );
  });

  // ─── /setuptool_ios ────────────────────────────────
  bot.onText(/\/setuptool_ios/, (msg) => {
    logCmd(msg, "/setuptool_ios");
    sendVid(msg.chat.id, cfg.MEDIA.DEFAULT_GIF,
      `⚙️ <b>CÀI ĐẶT TOOL — IOS</b>\n${DIV2}\n` +
      `<b>B1:</b> Tải iSH Shell:\n` +
      `<a href="https://apps.apple.com/app/id1436902243">Tải tại App Store</a>\n\n` +
      `<b>B2:</b> Mở iSH, chạy lệnh:\n` +
      `<blockquote expandable><code>apk update && apk upgrade && apk add python3</code></blockquote>\n\n` +
      `<b>Lần sau:</b>\n` +
      `<blockquote expandable><code>python3 ToolGopHerlysWar.py</code></blockquote>`,
      msg.message_id
    );
  });
};