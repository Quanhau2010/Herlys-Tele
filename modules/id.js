// ╔══════════════════════════════════════════════════════════════╗
// ║                           GET ID                             ║
// ╚══════════════════════════════════════════════════════════════╝

module.exports = {
  config: {
    name:            "id",
    version:         "2.0",
    author:          "Herlys",
    description:     "Xem ID người dùng hoặc nhóm",
    commandCategory: "Utility",
    usages:          "id | id reply | id <userID> | id box",
    aliases:         ["uid", "chatid"],
    cooldowns:       2,
    adminOnly:       false,
    superAdminOnly:  false,
  },

  run: async ({
    api,
    event,
    args,
    sender,
    chat,
    tag,
    nowVN
  }) => {

    const chatId = chat.id;
    const isGroup = chat.type !== "private";

    // ─────────────────────────────
    // 📦 ID BOX (NHÓM)
    // ─────────────────────────────
    if (args[0]?.toLowerCase() === "box") {
      if (!isGroup) {
        return api.reply("❌ Lệnh này chỉ dùng trong nhóm.");
      }

      return api.reply(
        `📦 <b>THÔNG TIN NHÓM</b>\n` +
        `┄┄┄┄┄┄┄┄┄┄┄┄\n` +
        `📛 Tên nhóm: ${chat.title}\n` +
        `🆔 Chat ID: <code>${chatId}</code>\n` +
        `👥 Loại: ${chat.type}\n` +
        `┄┄┄┄┄┄┄┄┄┄┄┄\n` +
        `<i>⏰ ${nowVN()}</i>`
      );
    }

    // ─────────────────────────────
    // 📌 REPLY
    // ─────────────────────────────
    if (event.reply_to_message) {
      const target = event.reply_to_message.from;

      return api.reply(
        `🆔 <b>ID NGƯỜI ĐƯỢC REPLY</b>\n` +
        `┄┄┄┄┄┄┄┄┄┄┄┄\n` +
        `👤 ${tag(target)}\n` +
        `🆔 User ID: <code>${target.id}</code>\n` +
        `📛 Username: ${target.username ? "@" + target.username : "Không có"}\n` +
        `┄┄┄┄┄┄┄┄┄┄┄┄`
      );
    }

    // ─────────────────────────────
    // 🔎 ID CỤ THỂ
    // ─────────────────────────────
    if (args[0] && !isNaN(args[0])) {
      const userId = parseInt(args[0]);

      try {
        const member = await api.bot.getChatMember(chatId, userId);

        return api.reply(
          `🆔 <b>THÔNG TIN USER</b>\n` +
          `┄┄┄┄┄┄┄┄┄┄┄┄\n` +
          `👤 ${tag(member.user)}\n` +
          `🆔 User ID: <code>${member.user.id}</code>\n` +
          `📛 Username: ${member.user.username ? "@" + member.user.username : "Không có"}\n` +
          `📌 Trạng thái: ${member.status}\n` +
          `┄┄┄┄┄┄┄┄┄┄┄┄`
        );

      } catch {
        return api.reply(
          "❌ Không tìm thấy user trong nhóm.\n" +
          "⚠️ Có thể user chưa từng vào nhóm."
        );
      }
    }

    // ─────────────────────────────
    // 👤 ID CHÍNH MÌNH
    // ─────────────────────────────
    return api.reply(
      `🆔 <b>ID CỦA BẠN</b>\n` +
      `┄┄┄┄┄┄┄┄┄┄┄┄\n` +
      `👤 ${tag(sender)}\n` +
      `🆔 User ID: <code>${sender.id}</code>\n` +
      `💬 Chat ID: <code>${chatId}</code>\n` +
      `📦 Loại chat: ${isGroup ? "Nhóm" : "Private"}\n` +
      `┄┄┄┄┄┄┄┄┄┄┄┄\n` +
      `<i>⏰ ${nowVN()}</i>`
    );
  },
};
