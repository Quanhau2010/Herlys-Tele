// ╔══════════════════════════════════════════════════════════════╗
// ║                          EVAL COMMAND                        ║
// ╚══════════════════════════════════════════════════════════════╝

module.exports = {
  config: {
    name:            "eval",
    version:         "1.0",
    author:          "Herlys",
    description:     "Thực thi JavaScript trực tiếp",
    commandCategory: "System",
    usages:          "eval <code>",
    aliases:         ["e"],
    cooldowns:       0,
    adminOnly:       false,
    superAdminOnly:  true,
  },

  run: async ({ api, args }) => {

    if (!args[0]) {
      return api.reply("⚠️ Vui lòng nhập code cần chạy.");
    }

    const code = args.join(" ");

    try {
      let result = eval(code);

      if (result instanceof Promise) {
        result = await result;
      }

      if (typeof result === "object") {
        result = JSON.stringify(result, null, 2);
      }

      return api.reply(
        `💻 <b>EVAL RESULT</b>\n` +
        `┄┄┄┄┄┄┄┄┄┄\n` +
        `<pre>${result}</pre>`
      );

    } catch (err) {
      return api.reply(
        `❌ <b>LỖI</b>\n` +
        `<pre>${err.message}</pre>`
      );
    }
  },
};
