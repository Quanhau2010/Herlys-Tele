// ╔══════════════════════════════════════════════════════════════╗
// ║                         RELOAD SYSTEM                        ║
// ╚══════════════════════════════════════════════════════════════╝

const fs = require("fs");
const path = require("path");

module.exports = {
  config: {
    name:            "reload",
    version:         "1.0",
    author:          "Herlys",
    description:     "Reload toàn bộ module commands",
    commandCategory: "System",
    usages:          "reload",
    aliases:         ["rl"],
    cooldowns:       0,
    adminOnly:       false,
    superAdminOnly:  true,
  },

  run: async ({ api, commands, config }) => {
    try {
      const modulesPath = path.join(__dirname);
      const files = fs.readdirSync(modulesPath)
        .filter(file => file.endsWith(".js"));

      let success = 0;
      let failed = 0;

      for (const file of files) {
        try {
          const filePath = path.join(modulesPath, file);

          // Xóa cache
          delete require.cache[require.resolve(filePath)];

          // Load lại
          const cmd = require(filePath);

          if (!cmd.config || !cmd.run) {
            failed++;
            continue;
          }

          commands.set(cmd.config.name, cmd);
          success++;

        } catch (err) {
          failed++;
          console.error(`❌ Lỗi reload ${file}:`, err.message);
        }
      }

      return api.reply(
        `🔄 <b>RELOAD HOÀN TẤT</b>\n` +
        `┄┄┄┄┄┄┄┄┄┄┄┄\n` +
        `✅ Thành công: ${success}\n` +
        `❌ Lỗi: ${failed}\n` +
        `📦 Tổng: ${files.length}\n` +
        `┄┄┄┄┄┄┄┄┄┄┄┄\n` +
        `<i>Bot đã cập nhật module mới.</i>`
      );

    } catch (error) {
      return api.reply(
        `❌ <b>Lỗi reload hệ thống!</b>\n<code>${error.message}</code>`
      );
    }
  },
};
