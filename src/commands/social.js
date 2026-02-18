// ╔══════════════════════════════════════════════════════╗
// ║          HERLYS BOT — SOCIAL INFO COMMANDS           ║
// ╚══════════════════════════════════════════════════════╝

const axios = require("axios");
const { UI } = require("../ui");
const { logCmd } = require("../middleware");
const cfg = require("../config");
const { DIV2 } = require("../ui");

module.exports = function registerSocial(bot) {
  const HTML = { parse_mode: "HTML" };
  const reply = (msg, text) =>
    bot.sendMessage(msg.chat.id, text, { ...HTML, reply_to_message_id: msg.message_id });

  // ─── /fb ───────────────────────────────────────────
  bot.onText(/\/fb (.+)/, async (msg, match) => {
    logCmd(msg, "/fb");
    let fbId = match[1].trim();
    const proc = await reply(msg, "⏳ <b>Đang lấy thông tin Facebook...</b>");
    try {
      if (!fbId.match(/^\d+$/)) {
        const conv = await axios.get(`${cfg.API.OFFVN}/Fb/convertID.php?url=${fbId}`);
        fbId = conv.data.id;
        if (!fbId) throw new Error("Không thể chuyển đổi link thành ID");
      }
      const avatarUrl = `https://graph.facebook.com/${fbId}/picture?width=1500&height=1500&access_token=${cfg.FB_ACCESS_TOKEN}`;
      const res = await axios.get(
        `${cfg.API.HERLYS}/getinfofb.php?uid=${fbId}&apikey=31122010`
      );
      await bot.sendPhoto(msg.chat.id, avatarUrl, {
        caption: UI.fb(res.data, avatarUrl),
        parse_mode: "HTML",
        reply_to_message_id: msg.message_id,
      });
    } catch (e) {
      await reply(msg, UI.error(e.message));
    } finally {
      bot.deleteMessage(msg.chat.id, proc.message_id).catch(() => {});
    }
  });

  // ─── /tt ───────────────────────────────────────────
  bot.onText(/\/tt (.+)/, async (msg, match) => {
    logCmd(msg, "/tt");
    const acc = match[1].trim();
    const proc = await reply(msg, "⏳ <b>Đang lấy thông tin TikTok...</b>");
    try {
      const res = await axios.get(`https://tiktok.com/@${acc}`, {
        headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)" },
      });
      const html = res.data;
      const get = (key) => html.split(`"${key}":"`)[1]?.split('"')[0];
      const nickname  = get("nickname");
      const username  = get("uniqueId");
      const follow    = html.split('"followerCount":')[1]?.split(",")[0];
      const following = html.split('"followingCount":')[1]?.split(",")[0];
      const heart     = html.split('"heart":')[1]?.split(",")[0];
      const videos    = html.split('"videoCount":')[1]?.split(",")[0];
      const verified  = html.split('"verified":')[1]?.split(",")[0] === "true";
      const avatar    = get("avatarLarger")?.replace(/\\u002F/g, "/");

      const text =
        `📱 <b>TIKTOK INFO</b>\n${DIV2}\n` +
        `├ <b>Tên:</b> ${nickname}\n` +
        `├ <b>Username:</b> @${username}\n` +
        `├ <b>Link:</b> <a href="https://tiktok.com/@${username}">Xem Profile</a>\n` +
        `├ <b>Followers:</b> ${Number(follow).toLocaleString("vi-VN")}\n` +
        `├ <b>Following:</b> ${Number(following).toLocaleString("vi-VN")}\n` +
        `├ <b>Likes:</b> ${Number(heart).toLocaleString("vi-VN")}\n` +
        `├ <b>Videos:</b> ${videos}\n` +
        `└ <b>Xác thực:</b> ${verified ? "✅" : "❌"}`;

      await bot.sendPhoto(msg.chat.id, avatar, {
        caption: text,
        parse_mode: "HTML",
        reply_to_message_id: msg.message_id,
      });
    } catch (e) {
      await reply(msg, UI.error("Không tìm thấy tài khoản TikTok: " + acc));
    } finally {
      bot.deleteMessage(msg.chat.id, proc.message_id).catch(() => {});
    }
  });

  // ─── /ff ───────────────────────────────────────────
  bot.onText(/\/ff (.+)/, async (msg, match) => {
    logCmd(msg, "/ff");
    const playerId = match[1].trim();
    const proc = await reply(msg, "⏳ <b>Đang lấy thông tin Free Fire...</b>");
    try {
      const res = await axios.get(`${cfg.API.HERLYS}/getinfoff.php?id=${playerId}`);
      const data = res.data.rapidapi_info.data;
      await bot.sendMessage(msg.chat.id, UI.ff(
        data.basicInfo,
        data.petInfo,
        data.clanBasicInfo,
        data.captainBasicInfo,
        data.socialInfo
      ), { ...HTML, reply_to_message_id: msg.message_id });
    } catch (e) {
      await reply(msg, UI.error("Không tìm thấy ID người chơi: " + playerId));
    } finally {
      bot.deleteMessage(msg.chat.id, proc.message_id).catch(() => {});
    }
  });

  // ─── /zalo ─────────────────────────────────────────
  bot.onText(/\/zalo (.+)/, async (msg, match) => {
    logCmd(msg, "/zalo");
    const phone = match[1].trim();
    const proc = await reply(msg, "⏳ <b>Đang lấy thông tin Zalo...</b>");
    try {
      const res = await axios.get(`${cfg.API.ZALO}?phone=${phone}&apikey=offvn`);
      const d = res.data;
      if (d.error === true) throw new Error("Không tìm thấy số Zalo này");
      await bot.sendPhoto(msg.chat.id, d.avatar, {
        caption: UI.zalo(d, phone),
        parse_mode: "HTML",
        reply_to_message_id: msg.message_id,
      });
    } catch (e) {
      await reply(msg, UI.error(e.message));
    } finally {
      bot.deleteMessage(msg.chat.id, proc.message_id).catch(() => {});
    }
  });

  // ─── /cc ───────────────────────────────────────────
  bot.onText(/\/cc (.+)/, async (msg, match) => {
    logCmd(msg, "/cc");
    const link = match[1].trim();
    const proc = await reply(msg, "⏳ <b>Đang lấy thông tin CapCut...</b>");
    try {
      const res = await axios.get(`${cfg.API.CAPCUT}?url=${link}`);
      const d = res.data;
      const u = d.user;
      const us = d.user_statistics;
      const vip = d.vip_info;
      const tiktok = u.tiktok_user_info;
      const text =
        `🎬 <b>CAPCUT INFO</b>\n${DIV2}\n` +
        `├ <b>UID:</b> <code>${u.uid}</code>\n` +
        `├ <b>Tên:</b> ${u.name}\n` +
        `├ <b>ID:</b> ${u.unique_id}\n` +
        `├ <b>Bio:</b> ${u.description?.substring(0, 80) || "N/A"}\n` +
        `├ <b>Giới tính:</b> ${u.gender === 1 ? "Nam" : "Nữ"}\n` +
        `├ <b>Followers:</b> ${u.relation_info?.statistics?.follower_count}\n\n` +
        `📊 <b>Thống kê</b>\n` +
        `├ <b>Mẫu:</b> ${us.template_count}\n` +
        `├ <b>Tác phẩm:</b> ${us.work_count}\n` +
        `├ <b>Likes:</b> ${us.like_count}\n\n` +
        `💎 <b>VIP</b>\n` +
        `├ <b>Trạng thái:</b> ${vip.flag === 1 ? "✅ Đang dùng" : "❌ Không"}\n` +
        `├ <b>Hết hạn:</b> ${vip.end_time || "N/A"}\n\n` +
        `🎵 <b>TikTok liên kết</b>\n` +
        `└ <a href="${tiktok.deeplink}">${tiktok.name}</a>`;

      await bot.sendPhoto(msg.chat.id, u.avatar_url, {
        caption: text,
        parse_mode: "HTML",
        reply_to_message_id: msg.message_id,
      });
    } catch (e) {
      await reply(msg, UI.error(e.message));
    } finally {
      bot.deleteMessage(msg.chat.id, proc.message_id).catch(() => {});
    }
  });

  // ─── /gh ───────────────────────────────────────────
  bot.onText(/\/gh (.+)/, async (msg, match) => {
    logCmd(msg, "/gh");
    const username = match[1].trim();
    const proc = await reply(msg, "⏳ <b>Đang lấy thông tin GitHub...</b>");
    try {
      const res = await axios.get(`${cfg.API.GITHUB}/users/${username}`, {
        headers: { "User-Agent": "HerlysBot/3.0" },
      });
      await bot.sendPhoto(msg.chat.id, res.data.avatar_url, {
        caption: UI.github(res.data),
        parse_mode: "HTML",
        reply_to_message_id: msg.message_id,
      });
    } catch {
      await reply(msg, UI.error(`Không tìm thấy user GitHub: <code>${username}</code>`));
    } finally {
      bot.deleteMessage(msg.chat.id, proc.message_id).catch(() => {});
    }
  });

  // ─── /weather ──────────────────────────────────────
  bot.onText(/\/weather (.+)/, async (msg, match) => {
    logCmd(msg, "/weather");
    const city = match[1];
    try {
      const res = await axios.get(
        `${cfg.API.WEATHER}/current.json?key=${cfg.WEATHER_API_KEY}&q=${city}&lang=vi`
      );
      await reply(msg, UI.weather(city, res.data.current, res.data.location));
    } catch {
      await reply(msg, UI.error("Không tìm thấy thành phố."));
    }
  });

  // ─── /dinhgiasdt ───────────────────────────────────
  bot.onText(/\/dinhgiasdt (.+)/, async (msg, match) => {
    logCmd(msg, "/dinhgiasdt");
    const sdt = match[1].trim();
    try {
      const res = await axios.get(`${cfg.API.SUMI}/valuation?sdt=${sdt}`);
      const val = res.data?.data?.valuation?.[sdt];
      if (!val) throw new Error("Không tìm thấy định giá");
      await reply(msg, UI.dinhgiasdt(sdt, val));
    } catch (e) {
      await reply(msg, UI.error(e.message));
    }
  });

  // ─── /ip ───────────────────────────────────────────
  bot.onText(/\/ip (.+)/, async (msg, match) => {
    logCmd(msg, "/ip");
    const ip = match[1].trim();
    try {
      const res = await axios.get(`${cfg.API.IPAPI}/${ip}?lang=vi`);
      if (res.data.status !== "success") throw new Error("IP không hợp lệ");
      await reply(msg, UI.ip(res.data, ip));
    } catch (e) {
      await reply(msg, UI.error(e.message));
    }
  });

  // ─── /thoigian ─────────────────────────────────────
  bot.onText(/\/thoigian/, async (msg) => {
    logCmd(msg, "/thoigian");
    await reply(msg, UI.thoigian(cfg.WORLD_TIMEZONES));
  });

  // ─── /thongtin ─────────────────────────────────────
  bot.onText(/\/thongtin/, async (msg) => {
    logCmd(msg, "/thongtin");
    const user = msg.reply_to_message ? msg.reply_to_message.from : msg.from;
    try {
      const member = await bot.getChatMember(msg.chat.id, user.id);
      const statusMap = {
        creator: "👑 Chủ nhóm", administrator: "🛡 Admin",
        member: "👤 Thành viên", restricted: "⛔ Bị hạn chế",
        left: "👋 Rời nhóm", kicked: "🚫 Bị đuổi",
      };
      const status = statusMap[member.status] || "Không xác định";
      const photos = await bot.getUserProfilePhotos(user.id, { limit: 1 });
      const caption = UI.thongtin(user, status, photos.total_count > 0);
      if (photos.total_count > 0) {
        const fileId = photos.photos[0][photos.photos[0].length - 1].file_id;
        await bot.sendPhoto(msg.chat.id, fileId, {
          caption,
          parse_mode: "HTML",
          reply_to_message_id: msg.message_id,
        });
      } else {
        await reply(msg, caption);
      }
    } catch (e) {
      await reply(msg, UI.error(e.message));
    }
  });
};