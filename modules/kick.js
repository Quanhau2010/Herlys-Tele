// ╔══════════════════════════════════════════════════════════════╗
// ║                          KICK MEMBER                         ║
// ╚══════════════════════════════════════════════════════════════╝

module.exports = {
  config: {
    name:            "kick",
    version:         "1.3",
    author:          "Herlys",
    description:     "Kick thành viên bằng ID",
    commandCategory: "Admin",
    usages:          "kick <userID> [lý do]",
    aliases:         [],
    cooldowns:       3,
    adminOnly:       true,
    superAdminOnly:  false,
  },

  run: async ({
    api,
    event,
    args,
    sender,
    isAdmin,
    isSuperAdmin,
    tag,
    chatId,
  }) => {

    if (!(await isAdmin())) {
      return api.reply("❌ Bạn phải là admin nhóm.");
    }

    let targetId = null;
    let reason = "Không có lý do";

    // 📌 Chỉ kick bằng ID
    if (args[0] && !isNaN(args[0])) {
      targetId = parseInt(args[0]);
      reason = args.slice(1).join(" ") || reason;
    }

    if (!targetId) {
      return api.reply(
        "⚠️ Dùng:\n" +
        "/kick <userID> [lý do]"
      );
    }

    if (targetId === sender.id) {
      return api.reply("❌ Bạn không thể tự kick chính mình.");
    }

    if (isSuperAdmin(targetId)) {
      return api.reply("❌ Không thể kick Super Admin.");
    }

    try {
      const memberInfo = await api.bot.getChatMember(chatId, targetId);

      if (["administrator", "creator"].includes(memberInfo.status)) {
        return api.reply("❌ Không thể kick Admin.");
      }

      await api.banMember(targetId);
      await api.unbanMember(targetId);

      return api.reply(
        `👢 <b>KICK THÀNH CÔNG</b>\n` +
        `🆔 ID: <code>${targetId}</code>\n` +
        `🛡 Thực hiện: ${tag(sender)}\n` +
        `📝 Lý do: <i>${reason}</i>`
      );

    } catch (err) {
      return api.reply(
        "❌ Không thể kick.\n" +
        "⚠️ Có thể:\n" +
        "- ID không tồn tại trong nhóm\n" +
        "- Bot không đủ quyền\n" +
        "- User chưa từng vào nhóm"
      );
    }
  },
};
