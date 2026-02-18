// ╔══════════════════════════════════════════════════════╗
// ║           HERLYS BOT - CONFIGURATION FILE            ║
// ║                  Version 3.0.0                       ║
// ╚══════════════════════════════════════════════════════╝

module.exports = {
  // ─── Bot Core ───────────────────────────────────────
  TOKEN: "7989078149:AAFzULl4OEgO2upMeoOuf0AkcDpRqP9nR8w",
  BOT_NAME: "Herlys Bot",
  BOT_VERSION: "3.0.0",
  BOT_PREFIX: "/",

  // ─── Admin IDs ──────────────────────────────────────
  ADMIN_IDS: [8022468254],

  // ─── API Keys ───────────────────────────────────────
  IMGUR_CLIENT_ID: "c76eb7edd1459f3",
  WEATHER_API_KEY: "deae5206758c44f38b0184151232208",
  FB_ACCESS_TOKEN: "2712477385668128|b429aeb53369951d411e1cae8e810640",

  // ─── API Base URLs ───────────────────────────────────
  API: {
    HERLYS: "https://keyherlyswar.x10.mx/Apidocs",
    OFFVN: "https://offvn.x10.mx",
    GAITIKTOK: "https://gaitiktok.onrender.com",
    IPAPI: "http://ip-api.com/json",
    GITHUB: "https://api.github.com",
    WEATHER: "http://api.weatherapi.com/v1",
    VIETQR: "https://img.vietqr.io/image",
    QRSERVER: "https://api.qrserver.com/v1/create-qr-code",
    RESTCOUNTRIES: "https://restcountries.com/v3.1",
    ZALO: "https://keyherlyswar.x10.mx/Apidocs/getinfozalo.php",
    CAPCUT: "https://subhatde.id.vn/capcut/info",
    SUMI: "https://api.sumiproject.net",
    IMGUR_UPLOAD: "https://api.imgur.com/3/image",
  },

  // ─── Media Assets ────────────────────────────────────
  MEDIA: {
    WELCOME_VIDEO: "https://keyherlyswar.x10.mx/VID_20241009_190557_165.mp4",
    DEFAULT_GIF: "https://offvn.io.vn/bot.gif",
    MUAVIP_IMG: "https://files.catbox.moe/rkvxsm.jpg",
  },

  // ─── Timing ──────────────────────────────────────────
  NSFW_DELETE_DELAY: 60000, // 1 phút
  MSG_DELETE_DELAY: 5000,

  // ─── Timezone ────────────────────────────────────────
  TIMEZONE: "Asia/Ho_Chi_Minh",

  // ─── World Timezones (cho /thoigian) ─────────────────
  WORLD_TIMEZONES: [
    { emoji: "🇻🇳", name: "Việt Nam",  tz: "Asia/Ho_Chi_Minh" },
    { emoji: "🇯🇵", name: "Tokyo",     tz: "Asia/Tokyo" },
    { emoji: "🇸🇬", name: "Singapore", tz: "Asia/Singapore" },
    { emoji: "🇦🇪", name: "Dubai",     tz: "Asia/Dubai" },
    { emoji: "🇩🇪", name: "Berlin",    tz: "Europe/Berlin" },
    { emoji: "🇬🇧", name: "London",    tz: "Europe/London" },
    { emoji: "🇺🇸", name: "New York",  tz: "America/New_York" },
    { emoji: "🇦🇺", name: "Sydney",    tz: "Australia/Sydney" },
  ],

  // ─── Jokes ───────────────────────────────────────────
  JOKES: [
    "Tại sao lập trình viên không thể nấu ăn?\n→ Vì họ luôn gặp lỗi <b>runtime</b> trong bếp! 🍳",
    "Con gà đi qua đường để làm gì?\n→ Vì bên kia đường có <b>WiFi miễn phí</b>! 📶",
    "Tại sao máy tính không bao giờ sợ?\n→ Vì nó luôn có <b>backup</b>! 💾",
    "Tại sao dev luôn nhầm Halloween và Christmas?\n→ Vì <code>OCT 31 == DEC 25</code>! 🎃",
    "Bug hay Feature?\n→ Tất cả đều là <b>feature</b> chưa được document! 📝",
    "Có bao nhiêu lập trình viên để thay bóng đèn?\n→ Không xác định — đó là <b>hardware problem</b>! 💡",
    "Vì sao các dev thích dùng dark mode?\n→ Vì light <b>attracts bugs</b>! 🐛",
  ],
};