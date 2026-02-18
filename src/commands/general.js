// ╔══════════════════════════════════════════════════════╗
// ║          HERLYS BOT — GENERAL COMMANDS               ║
// ╚══════════════════════════════════════════════════════╝

const axios = require("axios");
const fs = require("fs");
const gtts = require("gtts");
const { UI, nowVN } = require("../ui");
const { logCmd, deleteAfter, downloadBuffer, sleep } = require("../middleware");
const cfg = require("../config");

module.exports = function registerGeneral(bot) {
  const HTML = { parse_mode: "HTML" };
  const send = (chatId, text) => bot.sendMessage(chatId, text, HTML);
  const reply = (msg, text) =>
    bot.sendMessage(msg.chat.id, text, { ...HTML, reply_to_message_id: msg.message_id });

  // ─── /start ────────────────────────────────────────
  bot.onText(/\/start/, async (msg) => {
    logCmd(msg, "/start");
    await bot.sendVideo(msg.chat.id, cfg.MEDIA.WELCOME_VIDEO, {
      caption: UI.start(msg.from),
      parse_mode: "HTML",
      reply_to_message_id: msg.message_id,
      supports_streaming: true,
    });
  });

  // ─── /menu ─────────────────────────────────────────
  bot.onText(/\/menu/, async (msg) => {
    logCmd(msg, "/menu");
    await send(msg.chat.id, UI.menu(msg.from));
  });

  // ─── /tv ───────────────────────────────────────────
  bot.onText(/\/tv/, async (msg) => {
    logCmd(msg, "/tv");
    await bot.sendAnimation(msg.chat.id, cfg.MEDIA.DEFAULT_GIF, {
      caption:
        `Xin chào ${require("../ui").tag(msg.from)}!\n` +
        `<blockquote expandable><a href="https://t.me/setlanguage/abcxyz">🇻🇳 Tiếng Việt</a>\n` +
        `<a href="https://t.me/setlanguage/vi-beta">🇻🇳 Tiếng Việt (Beta)</a></blockquote>`,
      parse_mode: "HTML",
      reply_to_message_id: msg.message_id,
    });
  });

  // ─── /contact ──────────────────────────────────────
  bot.onText(/\/contact/, async (msg) => {
    logCmd(msg, "/contact");
    await send(msg.chat.id,
      `📞 <b>LIÊN HỆ ADMIN</b>\n${require("../ui").DIV2}\n` +
      `<blockquote expandable>` +
      `🔵 Facebook: <a href="https://www.facebook.com/Quanhau210">Quan Hậu</a>\n` +
      `🟢 Zalo: <a href="https://zalo.me/0794268460">0794268460</a>\n` +
      `✈️ Telegram: <a href="https://t.me/Quanhau2010">@Quanhau2010</a>\n` +
      `👥 Nhóm: <a href="https://t.me/herlyswartool">Herlys War Tool</a>` +
      `</blockquote>`
    );
  });

  // ─── /muavip ───────────────────────────────────────
  bot.onText(/\/muavip/, async (msg) => {
    logCmd(msg, "/muavip");
    await bot.sendPhoto(msg.chat.id, cfg.MEDIA.MUAVIP_IMG, {
      caption: UI.muavip(msg.from.id),
      parse_mode: "HTML",
      reply_to_message_id: msg.message_id,
    });
  });

  // ─── /getid ────────────────────────────────────────
  bot.onText(/\/getid/, async (msg) => {
    logCmd(msg, "/getid");
    const user = msg.reply_to_message ? msg.reply_to_message.from : msg.from;
    await reply(msg,
      `🪪 <b>TELEGRAM ID</b>\n${require("../ui").DIV}\n` +
      `👤 ${user.first_name}: <code>${user.id}</code>`
    );
  });

  // ─── /idbox ────────────────────────────────────────
  bot.onText(/\/idbox/, async (msg) => {
    logCmd(msg, "/idbox");
    await reply(msg,
      `📦 <b>GROUP ID</b>\n${require("../ui").DIV}\n` +
      `🆔 <code>${msg.chat.id}</code>`
    );
  });

  // ─── /qrbank ───────────────────────────────────────
  bot.onText(/\/qrbank (.+)/, async (msg, match) => {
    logCmd(msg, "/qrbank");
    const parts = match[1].trim().split(/\s+/);
    if (parts.length < 2)
      return reply(msg, UI.usage("/qrbank [STK] [Ngân hàng]", "/qrbank 444888365 MBbank"));
    const [stk, bank] = parts;
    const qrUrl = `${cfg.API.VIETQR}/${bank}-${stk}-compact.png`;
    await bot.sendPhoto(msg.chat.id, qrUrl, {
      caption: `🏦 <b>QR CHUYỂN KHOẢN</b>\n${require("../ui").DIV}\n` +
               `├ <b>STK:</b> <code>${stk}</code>\n└ <b>Ngân hàng:</b> ${bank}`,
      parse_mode: "HTML",
      reply_to_message_id: msg.message_id,
    });
  });

  // ─── /qrcode ───────────────────────────────────────
  bot.onText(/\/qrcode (.+)/, async (msg, match) => {
    logCmd(msg, "/qrcode");
    const content = match[1];
    const qrUrl = `${cfg.API.QRSERVER}/?data=${encodeURIComponent(content)}&size=300x300`;
    await bot.sendPhoto(msg.chat.id, qrUrl, {
      caption: `🔲 <b>QR CODE</b>\n${require("../ui").DIV}\n📝 <code>${content}</code>`,
      parse_mode: "HTML",
      reply_to_message_id: msg.message_id,
    });
  });

  // ─── /cap ──────────────────────────────────────────
  bot.onText(/\/cap (.+)/, async (msg, match) => {
    logCmd(msg, "/cap");
    const website = match[1].trim();
    const proc = await bot.sendMessage(msg.chat.id,
      `⏳ <b>Đang chụp màn hình...</b>\n<code>${website}</code>`,
      { ...HTML, reply_to_message_id: msg.message_id }
    );
    try {
      const url = `${cfg.API.HERLYS}/cap.php?url=${website}`;
      const res = await axios.get(url, { responseType: "arraybuffer" });
      const buf = Buffer.from(res.data);
      await bot.sendPhoto(msg.chat.id, buf, {
        caption: `📸 <b>SCREENSHOT</b>\n${require("../ui").DIV}\n🌐 <a href="${website}">${website}</a>`,
        parse_mode: "HTML",
        reply_to_message_id: msg.message_id,
      });
    } catch (e) {
      await reply(msg, UI.error(e.message));
    } finally {
      await bot.deleteMessage(msg.chat.id, proc.message_id).catch(() => {});
    }
  });

  // ─── /voice ────────────────────────────────────────
  bot.onText(/\/voice (.+)/, async (msg, match) => {
    logCmd(msg, "/voice");
    const text = match[1];
    const filePath = `/tmp/voice_${msg.from.id}_${Date.now()}.mp3`;
    try {
      const tts = new gtts(text, "vi");
      await new Promise((res, rej) => tts.save(filePath, (e) => (e ? rej(e) : res())));
      await bot.sendAudio(msg.chat.id, filePath, {
        caption: `🔊 <b>TEXT TO SPEECH</b>\n${require("../ui").DIV}\n💬 ${text}`,
        parse_mode: "HTML",
        reply_to_message_id: msg.message_id,
      });
      fs.unlinkSync(filePath);
    } catch (e) {
      await reply(msg, UI.error("Không thể tạo voice: " + e.message));
    }
  });

  // ─── /imgur ────────────────────────────────────────
  bot.onText(/\/imgur/, async (msg) => {
    logCmd(msg, "/imgur");
    if (!msg.reply_to_message?.photo)
      return reply(msg, "⚠️ Reply vào một ảnh để upload lên Imgur!");
    const photos = msg.reply_to_message.photo;
    const fileId = photos[photos.length - 1].file_id;
    const proc = await reply(msg, "⏳ <b>Đang upload lên Imgur...</b>");
    try {
      const fileInfo = await bot.getFile(fileId);
      const fileUrl = `https://api.telegram.org/file/bot${cfg.TOKEN}/${fileInfo.file_path}`;
      const buf = await downloadBuffer(fileUrl);
      const base64 = buf.toString("base64");
      const uploadRes = await axios.post(
        cfg.API.IMGUR_UPLOAD,
        { image: base64, type: "base64" },
        { headers: { Authorization: `Client-ID ${cfg.IMGUR_CLIENT_ID}` } }
      );
      const link = uploadRes.data.data.link;
      await reply(msg,
        `📤 <b>IMGUR UPLOAD</b>\n${require("../ui").DIV2}\n` +
        `✅ <b>Upload thành công!</b>\n` +
        `🔗 <a href="${link}">${link}</a>\n` +
        `${require("../ui").DIV}\n<i>⏰ ${nowVN()}</i>`
      );
    } catch (e) {
      await reply(msg, UI.error(e.message));
    } finally {
      bot.deleteMessage(msg.chat.id, proc.message_id).catch(() => {});
    }
  });

  // ─── /base64 ───────────────────────────────────────
  bot.onText(/\/base64 (encode|decode) (.+)/, async (msg, match) => {
    logCmd(msg, "/base64");
    const [, mode, input] = match;
    try {
      const result =
        mode === "encode"
          ? Buffer.from(input).toString("base64")
          : Buffer.from(input, "base64").toString("utf-8");
      await reply(msg, UI.base64(mode, input, result));
    } catch (e) {
      await reply(msg, UI.error(e.message));
    }
  });
  bot.onText(/^\/base64$/, (msg) =>
    reply(msg, UI.usage("/base64 encode|decode [text]", "/base64 encode Hello World"))
  );

  // ─── /calc ─────────────────────────────────────────
  bot.onText(/\/calc (.+)/, async (msg, match) => {
    logCmd(msg, "/calc");
    const expr = match[1].replace(/[^0-9+\-*/().\s%]/g, "");
    try {
      // eslint-disable-next-line no-new-func
      const result = Function(`"use strict"; return (${expr})`)();
      if (typeof result !== "number" || !isFinite(result))
        throw new Error("Kết quả không hợp lệ");
      await reply(msg, UI.calc(expr, result));
    } catch {
      await reply(msg, UI.usage("/calc [biểu thức]", "/calc (100 + 50) * 2"));
    }
  });

  // ─── /short (URL shortener) 🆕 ─────────────────────
  bot.onText(/\/short (.+)/, async (msg, match) => {
    logCmd(msg, "/short");
    const url = match[1].trim();
    try {
      const res = await axios.get(`https://tinyurl.com/api-create.php?url=${encodeURIComponent(url)}`);
      await reply(msg,
        `🔗 <b>URL SHORTENER</b>\n${require("../ui").DIV}\n` +
        `📎 Gốc: <code>${url}</code>\n` +
        `✂️ Short: <a href="${res.data}">${res.data}</a>`
      );
    } catch {
      await reply(msg, UI.error("Không thể rút gọn URL."));
    }
  });
};