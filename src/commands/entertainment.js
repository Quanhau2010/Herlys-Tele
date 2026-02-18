// ╔══════════════════════════════════════════════════════╗
// ║         HERLYS BOT — ENTERTAINMENT COMMANDS          ║
// ╚══════════════════════════════════════════════════════╝

const axios = require("axios");
const fs = require("fs");
const { UI } = require("../ui");
const { logCmd, deleteAfter, downloadBuffer } = require("../middleware");
const cfg = require("../config");

module.exports = function registerEntertainment(bot) {
  const HTML = { parse_mode: "HTML" };
  const reply = (msg, text) =>
    bot.sendMessage(msg.chat.id, text, { ...HTML, reply_to_message_id: msg.message_id });

  // ─── Helper: Gửi ảnh từ API + tự xóa ──────────────
  async function sendNsfwPhoto(msg, apiUrl, label) {
    const proc = await reply(msg, "⏳ <b>Đang tải ảnh...</b>");
    try {
      const res = await axios.get(apiUrl);
      const imgUrl = res.data.url;
      const buf = await downloadBuffer(imgUrl);
      const username = msg.from.username
        ? `@${msg.from.username}`
        : msg.from.first_name;
      const sent = await bot.sendPhoto(msg.chat.id, buf, {
        caption: `${label} — ${username}`,
        parse_mode: "HTML",
        reply_to_message_id: msg.message_id,
      });
      deleteAfter(bot, msg.chat.id, sent.message_id, cfg.NSFW_DELETE_DELAY);
    } catch {
      await reply(msg, UI.error("Không thể tải ảnh, thử lại sau!"));
    } finally {
      bot.deleteMessage(msg.chat.id, proc.message_id).catch(() => {});
    }
  }

  // ─── /anhgai ───────────────────────────────────────
  bot.onText(/\/anhgai/, (msg) => {
    logCmd(msg, "/anhgai");
    sendNsfwPhoto(msg, `${cfg.API.HERLYS}/anhgirl.php`, "📸 <b>Ảnh Gái</b>");
  });

  // ─── /anhdu ────────────────────────────────────────
  bot.onText(/\/anhdu/, (msg) => {
    logCmd(msg, "/anhdu");
    sendNsfwPhoto(msg, `${cfg.API.HERLYS}/anhgirl.php`, "📸 <b>Ảnh Dú</b>");
  });

  // ─── /anhlon ───────────────────────────────────────
  bot.onText(/\/anhlon/, (msg) => {
    logCmd(msg, "/anhlon");
    sendNsfwPhoto(msg, `${cfg.API.HERLYS}/anhlon.php`, "📸 <b>Ảnh</b>");
  });

  // ─── /anhnude ──────────────────────────────────────
  bot.onText(/\/anhnude/, (msg) => {
    logCmd(msg, "/anhnude");
    sendNsfwPhoto(msg, `${cfg.API.HERLYS}/anhnude.php`, "📸 <b>Ảnh Nude</b>");
  });

  // ─── /gaitt ────────────────────────────────────────
  bot.onText(/\/gaitt/, async (msg) => {
    logCmd(msg, "/gaitt");
    const proc = await reply(msg, "⏳ <b>Đang tải video TikTok...</b>");
    try {
      const res = await axios.get(`${cfg.API.GAITIKTOK}/random?apikey=randomtnt`);
      const d = res.data.data;
      const buf = await downloadBuffer(d.play);
      const caption =
        `🎵 <b>RANDOM GÁI TIKTOK</b>\n${require("../ui").DIV2}\n` +
        `├ <b>Kênh:</b> ${d.author.nickname} (@${d.author.unique_id})\n` +
        `├ <b>Tiêu đề:</b> ${d.title?.substring(0, 60) || "N/A"}\n` +
        `├ <b>Quốc gia:</b> ${d.region}\n` +
        `├ <b>Thời gian:</b> ${d.duration}s\n` +
        `├ ❤️ ${Number(d.digg_count).toLocaleString("vi-VN")}  ` +
        `💬 ${Number(d.comment_count).toLocaleString("vi-VN")}  ` +
        `👁 ${Number(d.play_count).toLocaleString("vi-VN")}`;
      await bot.sendVideo(msg.chat.id, buf, {
        caption,
        parse_mode: "HTML",
        reply_to_message_id: msg.message_id,
        supports_streaming: true,
      });
    } catch {
      await reply(msg, UI.error("Không thể tải video TikTok!"));
    } finally {
      bot.deleteMessage(msg.chat.id, proc.message_id).catch(() => {});
    }
  });

  // ─── /videogai ─────────────────────────────────────
  bot.onText(/\/videogai/, async (msg) => {
    logCmd(msg, "/videogai");
    const proc = await reply(msg, "⏳ <b>Đang tải video...</b>");
    try {
      const res = await axios.get(`${cfg.API.HERLYS}/videogai.php`);
      const buf = await downloadBuffer(res.data.url);
      const username = msg.from.username ? `@${msg.from.username}` : msg.from.first_name;
      await bot.sendVideo(msg.chat.id, buf, {
        caption: `🎬 <b>Video</b> — ${username}`,
        parse_mode: "HTML",
        reply_to_message_id: msg.message_id,
        supports_streaming: true,
      });
    } catch {
      await reply(msg, UI.error("Không thể tải video!"));
    } finally {
      bot.deleteMessage(msg.chat.id, proc.message_id).catch(() => {});
    }
  });

  // ─── /dice ─────────────────────────────────────────
  bot.onText(/\/dice/, async (msg) => {
    logCmd(msg, "/dice");
    const result = Math.floor(Math.random() * 6) + 1;
    await reply(msg, UI.dice(result));
  });

  // ─── /joke ─────────────────────────────────────────
  bot.onText(/\/joke/, async (msg) => {
    logCmd(msg, "/joke");
    const joke = cfg.JOKES[Math.floor(Math.random() * cfg.JOKES.length)];
    await reply(msg, UI.joke(joke));
  });

  // ─── /cat 🆕 ───────────────────────────────────────
  bot.onText(/\/cat/, async (msg) => {
    logCmd(msg, "/cat");
    const proc = await reply(msg, "🐱 <b>Đang tìm mèo cute...</b>");
    try {
      const res = await axios.get("https://api.thecatapi.com/v1/images/search");
      const imgUrl = res.data[0].url;
      await bot.sendPhoto(msg.chat.id, imgUrl, {
        caption: `🐱 <b>Random Mèo</b>\n<i>Meow~ 🐾</i>`,
        parse_mode: "HTML",
        reply_to_message_id: msg.message_id,
      });
    } catch {
      await reply(msg, UI.error("Không tìm được mèo!"));
    } finally {
      bot.deleteMessage(msg.chat.id, proc.message_id).catch(() => {});
    }
  });

  // ─── /dog 🆕 ───────────────────────────────────────
  bot.onText(/\/dog/, async (msg) => {
    logCmd(msg, "/dog");
    const proc = await reply(msg, "🐶 <b>Đang tìm cún cute...</b>");
    try {
      const res = await axios.get("https://dog.ceo/api/breeds/image/random");
      await bot.sendPhoto(msg.chat.id, res.data.message, {
        caption: `🐶 <b>Random Cún</b>\n<i>Woof! 🐾</i>`,
        parse_mode: "HTML",
        reply_to_message_id: msg.message_id,
      });
    } catch {
      await reply(msg, UI.error("Không tìm được cún!"));
    } finally {
      bot.deleteMessage(msg.chat.id, proc.message_id).catch(() => {});
    }
  });

  // ─── /meme 🆕 ──────────────────────────────────────
  bot.onText(/\/meme/, async (msg) => {
    logCmd(msg, "/meme");
    const proc = await reply(msg, "😂 <b>Đang tải meme...</b>");
    try {
      const res = await axios.get("https://meme-api.com/gimme");
      const d = res.data;
      await bot.sendPhoto(msg.chat.id, d.url, {
        caption:
          `😂 <b>RANDOM MEME</b>\n${require("../ui").DIV}\n` +
          `📝 ${d.title}\n` +
          `📌 r/${d.subreddit}  •  👍 ${d.ups}`,
        parse_mode: "HTML",
        reply_to_message_id: msg.message_id,
      });
    } catch {
      await reply(msg, UI.error("Không tải được meme!"));
    } finally {
      bot.deleteMessage(msg.chat.id, proc.message_id).catch(() => {});
    }
  });
};