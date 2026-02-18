// ╔══════════════════════════════════════════════════════════════╗
// ║                         HERLYS MENU                          ║
// ╚══════════════════════════════════════════════════════════════╝

module.exports = {
  config: {
    name:            "menu",
    version:         "6.0",
    author:          "Herlys",
    description:     "Hiển thị danh sách lệnh chuyên nghiệp",
    commandCategory: "System",
    usages:          "menu [tên lệnh | all <trang>]",
    aliases:         ["help", "commands"],
    cooldowns:       5,
    adminOnly:       false,
    superAdminOnly:  false,
  },

  run: async ({ api, args, commands, config, nowVN }) => {
    const prefix = config.prefix;
    const allCmds = Array.from(commands.values())
      .sort((a, b) => a.config.name.localeCompare(b.config.name));

    // ─────────────────────────────────────────────
    // 🔎 XEM CHI TIẾT LỆNH
    // ─────────────────────────────────────────────
    if (args[0] && args[0] !== "all") {
      const query = args[0].toLowerCase();
      const cmd = commands.get(query);

      if (!cmd) {
        return api.reply(
          `❌ <b>Lệnh không tồn tại!</b>\n` +
          `💡 Dùng: <code>${prefix}menu</code>`
        );
      }

      const c = cmd.config;

      return api.reply(
        `📌 <b>${c.name.toUpperCase()}</b>\n` +
        `┄┄┄┄┄┄┄┄┄┄┄┄\n` +
        `📝 Mô tả: ${c.description || "Không có"}\n` +
        `📂 Nhóm: ${c.commandCategory}\n` +
        `⏱ Cooldown: ${c.cooldowns}s\n` +
        `👤 Admin only: ${c.adminOnly ? "Có" : "Không"}\n` +
        `👑 SuperAdmin: ${c.superAdminOnly ? "Có" : "Không"}\n` +
        `🛠 Dùng: <code>${prefix}${c.usages}</code>\n` +
        `┄┄┄┄┄┄┄┄┄┄┄┄\n` +
        `<i>⏰ ${nowVN()}</i>`
      );
    }

    // ─────────────────────────────────────────────
    // 📜 MENU ALL (PHÂN TRANG)
    // ─────────────────────────────────────────────
    if (args[0] === "all") {
      const perPage = 15;
      const totalPage = Math.ceil(allCmds.length / perPage);
      let page = parseInt(args[1]) || 1;

      if (page < 1) page = 1;
      if (page > totalPage) page = totalPage;

      const start = (page - 1) * perPage;
      const pageCmds = allCmds.slice(start, start + perPage);

      let msg =
        `📜 <b>HERLYS COMMAND LIST</b>\n` +
        `Trang ${page}/${totalPage}\n` +
        `┄┄┄┄┄┄┄┄┄┄┄┄\n`;

      pageCmds.forEach((cmd, i) => {
        msg += `${i + 1}. <code>${cmd.config.name}</code>\n`;
      });

      msg +=
        `┄┄┄┄┄┄┄┄┄┄┄┄\n` +
        `📌 Dùng: <code>${prefix}menu [tên lệnh]</code>\n` +
        `<i>⏰ ${nowVN()}</i>`;

      return api.reply(msg);
    }

    // ─────────────────────────────────────────────
    // 📂 MENU THEO CATEGORY
    // ─────────────────────────────────────────────
    const categories = {};

    for (const cmd of allCmds) {
      const cat = cmd.config.commandCategory || "Other";
      if (!categories[cat]) categories[cat] = [];
      categories[cat].push(cmd.config.name);
    }

    let msg =
      `🤖 <b>HERLYS BOT MENU</b>\n` +
      `┄┄┄┄┄┄┄┄┄┄┄┄\n`;

    Object.keys(categories).forEach((cat) => {
      msg += `📂 <b>${cat}</b> (${categories[cat].length})\n`;
    });

    msg +=
      `┄┄┄┄┄┄┄┄┄┄┄┄\n` +
      `📊 Tổng lệnh: ${allCmds.length}\n` +
      `💡 Dùng: <code>${prefix}menu all</code>\n` +
      `<i>⏰ ${nowVN()}</i>`;

    return api.reply(msg);
  },
};
