// ╔══════════════════════════════════════════════════════╗
// ║                  HERLYS BOT LOGGER                   ║
// ╚══════════════════════════════════════════════════════╝

const { TIMEZONE } = require("./config");

const COLORS = {
  reset:  "\x1b[0m",
  bold:   "\x1b[1m",
  cyan:   "\x1b[36m",
  green:  "\x1b[32m",
  yellow: "\x1b[33m",
  red:    "\x1b[31m",
  blue:   "\x1b[34m",
  magenta:"\x1b[35m",
  gray:   "\x1b[90m",
  white:  "\x1b[97m",
};

function getTime() {
  return new Date().toLocaleString("vi-VN", {
    timeZone: TIMEZONE,
    hour: "2-digit", minute: "2-digit", second: "2-digit",
    day: "2-digit", month: "2-digit", year: "numeric",
    hour12: false,
  });
}

function pad(str, len = 8) {
  return str.padEnd(len);
}

const logger = {
  info(msg) {
    console.log(
      `${COLORS.gray}[${getTime()}]${COLORS.reset} ${COLORS.cyan}${COLORS.bold}[ INFO  ]${COLORS.reset} ${COLORS.white}${msg}${COLORS.reset}`
    );
  },
  success(msg) {
    console.log(
      `${COLORS.gray}[${getTime()}]${COLORS.reset} ${COLORS.green}${COLORS.bold}[  OK   ]${COLORS.reset} ${COLORS.white}${msg}${COLORS.reset}`
    );
  },
  warn(msg) {
    console.log(
      `${COLORS.gray}[${getTime()}]${COLORS.reset} ${COLORS.yellow}${COLORS.bold}[ WARN  ]${COLORS.reset} ${COLORS.yellow}${msg}${COLORS.reset}`
    );
  },
  error(msg, err) {
    console.error(
      `${COLORS.gray}[${getTime()}]${COLORS.reset} ${COLORS.red}${COLORS.bold}[ ERROR ]${COLORS.reset} ${COLORS.red}${msg}${err ? ` → ${err.message}` : ""}${COLORS.reset}`
    );
  },
  cmd(user, cmd, chatId) {
    console.log(
      `${COLORS.gray}[${getTime()}]${COLORS.reset} ${COLORS.magenta}${COLORS.bold}[  CMD  ]${COLORS.reset} ${COLORS.blue}${pad(cmd, 16)}${COLORS.reset} ${COLORS.gray}by${COLORS.reset} ${COLORS.white}${user}${COLORS.reset} ${COLORS.gray}in chat ${chatId}${COLORS.reset}`
    );
  },
  banner() {
    console.log(`
${COLORS.cyan}${COLORS.bold}
 ██╗  ██╗███████╗██████╗ ██╗  ██╗   ██╗███████╗    ██████╗  ██████╗ ████████╗
 ██║  ██║██╔════╝██╔══██╗██║  ╚██╗ ██╔╝██╔════╝    ██╔══██╗██╔═══██╗╚══██╔══╝
 ███████║█████╗  ██████╔╝██║   ╚████╔╝ ███████╗    ██████╔╝██║   ██║   ██║   
 ██╔══██║██╔══╝  ██╔══██╗██║    ╚██╔╝  ╚════██║    ██╔══██╗██║   ██║   ██║   
 ██║  ██║███████╗██║  ██║███████╗██║   ███████║    ██████╔╝╚██████╔╝   ██║   
 ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚══════╝╚═╝   ╚══════╝    ╚═════╝  ╚═════╝    ╚═╝   
${COLORS.reset}${COLORS.gray}                          Version 3.0.0 — Node.js Edition${COLORS.reset}
${COLORS.cyan}═══════════════════════════════════════════════════════════════════════════${COLORS.reset}
`);
  },
};

module.exports = logger;