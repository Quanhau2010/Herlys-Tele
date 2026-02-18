// ╔══════════════════════════════════════════════════════════════╗
// ║         TEMPLATE MODULE — Copy file này để tạo lệnh mới     ║
// ╚══════════════════════════════════════════════════════════════╝
//
// Đổi tên file thành tên lệnh, VD: ping.js
// Tất cả module đặt trong thư mục /modules/
// Bot tự động load khi khởi động!

const axios = require("axios"); // nếu cần gọi API

module.exports = {
  // ─── Thông tin lệnh (BẮT BUỘC) ──────────────────────────────
  config: {
    name:            "template",          // Tên lệnh (không dấu, không space)
    version:         "1.0",               // Phiên bản
    author:          "Tên của bạn",       // Tác giả
    description:     "Mô tả lệnh này",   // Mô tả
    commandCategory: "General",           // Danh mục: System | Utility | Info | Social | Entertainment | Admin | Tool
    usages:          "template [args]",   // Hướng dẫn dùng
    aliases:         ["tp", "temp"],      // Tên thay thế (có thể bỏ trống [])
    cooldowns:       5,                   // Cooldown (giây), 0 = không giới hạn
    adminOnly:       false,               // true = chỉ admin nhóm mới dùng được
    superAdminOnly:  false,               // true = chỉ super admin (trong config.json)
  },

  // ─── Hàm chạy lệnh (BẮT BUỘC) ───────────────────────────────
  //
  // ctx (context) chứa tất cả những gì bạn cần:
  //
  // api              — Gửi tin nhắn, ảnh, video...
  //   .sendMessage(text)          Gửi tin nhắn
  //   .sendPhoto(url/buf, opts)   Gửi ảnh
  //   .sendVideo(url/buf, opts)   Gửi video
  //   .sendAudio(url/buf, opts)   Gửi audio
  //   .reply(text)                Reply vào tin nhắn gốc
  //   .replyPhoto(url, opts)      Reply bằng ảnh
  //   .replyVideo(url, opts)      Reply bằng video
  //   .deleteMessage(messageId)   Xóa tin nhắn
  //   .editMessage(mid, text)     Sửa tin nhắn
  //   .banMember(userId)          Ban user
  //   .unbanMember(userId)        Unban user
  //   .muteMember(uid, until)     Mute user
  //   .unmuteMember(uid)          Unmute user
  //
  // event / message  — Toàn bộ object tin nhắn Telegram
  // args             — Mảng các tham số sau lệnh, VD: /cmd a b c → ["a","b","c"]
  // sender           — Thông tin người gửi { id, first_name, username, ... }
  // chat             — Thông tin nhóm/chat
  // threadID/chatId  — ID nhóm
  // senderID         — ID người gửi
  // messageID        — ID tin nhắn
  //
  // isAdmin()        — async, true nếu user là admin nhóm
  // isSuperAdmin()   — true nếu user trong config.adminIds
  //
  // tag(user)        — <a href="tg://...">Tên</a>
  // uname(user)      — @username hoặc first_name
  // sleep(ms)        — Delay
  // nowVN()          — Thời gian hiện tại (VN)
  //
  // config           — Toàn bộ config.json
  // commands         — Map tất cả lệnh đang load
  // bot              — Instance TelegramBot gốc (nâng cao)
  //
  run: async ({ api, args, sender, tag, nowVN, config }) => {
    // Kiểm tra args
    if (!args[0]) {
      return api.reply(
        `⚠️ <b>Thiếu tham số!</b>\n` +
        `💡 Dùng: <code>${config.prefix}template [nội dung]</code>`
      );
    }

    // Ví dụ xử lý
    const input = args.join(" ");

    // Gửi kết quả
    await api.reply(
      `✅ <b>TEMPLATE</b>\n┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄\n` +
      `👤 Người dùng: ${tag(sender)}\n` +
      `📝 Input: <code>${input}</code>\n` +
      `┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄\n` +
      `<i>⏰ ${nowVN()}</i>`
    );
  },
};