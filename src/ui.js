// ╔══════════════════════════════════════════════════════╗
// ║             HERLYS BOT — UI TEMPLATE ENGINE          ║
// ║    Craft beautiful, consistent Telegram messages     ║
// ╚══════════════════════════════════════════════════════╝

const { TIMEZONE } = require("./config");

// ─── Time Helpers ────────────────────────────────────────────
function nowVN() {
  return new Date().toLocaleString("vi-VN", {
    timeZone: TIMEZONE,
    hour: "2-digit", minute: "2-digit", second: "2-digit",
    day: "2-digit", month: "2-digit", year: "numeric",
    hour12: false,
  });
}

function timeInZone(tz) {
  return new Date().toLocaleString("vi-VN", {
    timeZone: tz,
    hour: "2-digit", minute: "2-digit", second: "2-digit",
    hour12: false,
  });
}

// ─── User Tag ────────────────────────────────────────────────
function tag(user) {
  const name = [user.first_name, user.last_name].filter(Boolean).join(" ");
  return `<a href="tg://user?id=${user.id}">${name}</a>`;
}

// ─── Progress Bar ────────────────────────────────────────────
function progressBar(percent, width = 10) {
  const filled = Math.round((percent / 100) * width);
  const empty = width - filled;
  return "█".repeat(filled) + "░".repeat(empty);
}

// ─── Dividers ────────────────────────────────────────────────
const DIV  = "┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄";
const DIV2 = "━━━━━━━━━━━━━━━━━━━━━━━━━━";
const DIV3 = "══════════════════════════";

// ─── Section builder ─────────────────────────────────────────
function section(title, lines) {
  const body = lines
    .filter(([_, v]) => v !== undefined && v !== null && v !== "" && v !== "N/A")
    .map(([k, v], i, arr) => {
      const isLast = i === arr.length - 1;
      return `${isLast ? "└" : "├"} <b>${k}:</b> ${v}`;
    })
    .join("\n");
  return `<b>${title}</b>\n${body}`;
}

// ═══════════════════════════════════════════════════════
//                   MESSAGE TEMPLATES
// ═══════════════════════════════════════════════════════

const UI = {

  // ── /start ──────────────────────────────────────────
  start: (user) => `
🤖 <b>HERLYS BOT</b> <code>v3.0</code>
${DIV2}
Xin chào, ${tag(user)}!

Tôi là bot đa năng của <b>Herlys War</b> — được trang bị hàng chục tính năng từ tra cứu thông tin, công cụ tiện ích đến giải trí.

📌 <b>Bắt đầu:</b> /menu — xem toàn bộ lệnh
💳 <b>Nâng cấp VIP:</b> /muavip
📞 <b>Liên hệ:</b> /contact
${DIV}
<i>⏰ ${nowVN()}</i>`.trim(),

  // ── /menu ───────────────────────────────────────────
  menu: (user) => `
🏠 <b>MENU CHÍNH</b> — Herlys Bot <code>v3.0</code>
${DIV2}
Xin chào ${tag(user)}!

<blockquote expandable>
⚙️ <b>CHUNG</b>
  /start · /menu · /upt · /tv · /muavip · /contact

🛠 <b>CÔNG CỤ</b>
  /getid · /idbox · /qrbank · /qrcode · /cap
  /voice · /imgur · /base64 · /calc · /short 🆕

📊 <b>THÔNG TIN</b>
  /weather · /thongtin · /dinhgiasdt
  /ip · /thoigian · /countryinfo

🌐 <b>MXH & GAME</b>
  /tt · /fb · /ff · /cc · /zalo · /gh

🎭 <b>GIẢI TRÍ</b>
  /gaitt · /videogai · /anhgai · /anhdu
  /anhlon · /anhnude · /joke · /dice
  /cat 🆕 · /dog 🆕 · /meme 🆕

🔧 <b>TOOL HERLYS WAR</b>
  /taitool_adr · /taitool_ios
  /setuptool_adr · /setuptool_ios

👑 <b>ADMIN</b>  →  /mad
</blockquote>
${DIV}
<i>💡 Gõ lệnh hoặc bấm vào để dùng ngay</i>`.trim(),

  // ── /mad ────────────────────────────────────────────
  mad: (user) => `
👑 <b>ADMIN PANEL</b>
${DIV2}
Xin chào, ${tag(user)}!

<blockquote expandable>
🛡 <b>QUẢN LÝ THÀNH VIÊN</b>
  /ban [ID]         — Cấm thành viên
  /unban [ID]       — Gỡ cấm
  /mute [ID] [giờ] — Tắt tiếng
  /unmute [ID]      — Bỏ tắt tiếng
  /kick [ID]        — Kick (không ban) 🆕

📢 <b>THÔNG BÁO</b>
  /everyone [tin]   — Tag toàn bộ admin
  /broadcast [tin]  — Broadcast tới tất cả

⚙️ <b>HỆ THỐNG</b>
  /upt              — Trạng thái server
  /reset            — Khởi động lại bot
</blockquote>

⚠️ <i>Chỉ admin nhóm mới sử dụng được các lệnh trên.</i>`.trim(),

  // ── /upt ────────────────────────────────────────────
  upt: ({ uptime, mem, nodeVer, os, cpuCount, user }) => {
    const bar = progressBar(parseFloat(mem.percent));
    return `
📊 <b>SYSTEM STATUS</b>
${DIV2}
${section("🤖 Bot", [
  ["Trạng thái",   "🟢 Online"],
  ["Uptime",       `<code>${uptime}</code>`],
  ["Phiên bản",    "<code>v3.0.0</code>"],
])}

${DIV}
${section("🖥 Server", [
  ["OS",           `<code>${os}</code>`],
  ["Node.js",      `<code>${nodeVer}</code>`],
  ["CPU",          `${cpuCount} lõi`],
  ["RAM",          `${bar} <code>${mem.percent}%</code> (${mem.used}/${mem.total} GB)`],
])}

${DIV}
<i>👤 Yêu cầu bởi ${tag(user)}  •  ${nowVN()}</i>`.trim();
  },

  // ── Welcome ─────────────────────────────────────────
  welcome: (member, chatTitle) => `
👋 <b>CHÀO MỪNG THÀNH VIÊN MỚI!</b>
${DIV2}
Xin chào, ${tag(member)}!

Bạn vừa tham gia <b>${chatTitle}</b> 🎉

<blockquote expandable>
📌 Dùng /menu để xem tất cả tính năng
💳 Dùng /muavip để nâng cấp tài khoản
📞 Dùng /contact để liên hệ admin
</blockquote>
${DIV}
<i>⏰ ${nowVN()}</i>`.trim(),

  // ── Goodbye ─────────────────────────────────────────
  goodbye: (member, chatTitle) => `
👋 <b>TẠM BIỆT!</b>
${DIV}
${tag(member)} vừa rời <b>${chatTitle}</b>

<i>Chúc bạn mọi điều tốt đẹp 🌟 Hẹn gặp lại!</i>`.trim(),

  // ── /thongtin ────────────────────────────────────────
  thongtin: (user, status, hasAvatar) => `
👤 <b>THÔNG TIN NGƯỜI DÙNG</b>
${DIV2}
${section("📋 Hồ sơ", [
  ["ID",        `<code>${user.id}</code>`],
  ["Tên",       `${user.first_name}${user.last_name ? " " + user.last_name : ""}`],
  ["Username",  user.username ? `@${user.username}` : null],
  ["Ngôn ngữ", user.language_code],
  ["Trạng thái", status],
  ["Avatar",    hasAvatar ? "✅ Đã có" : "❌ Chưa có"],
])}
${DIV}
<i>⏰ ${nowVN()}</i>`.trim(),

  // ── /weather ─────────────────────────────────────────
  weather: (city, w, l) => {
    const humid = progressBar(w.humidity);
    const cloud = progressBar(w.cloud);
    return `
🌤 <b>THỜI TIẾT — ${city.toUpperCase()}</b>
${DIV2}
${section("🌡 Nhiệt độ", [
  ["Hiện tại", `<b>${w.temp_c}°C</b> (${w.temp_f}°F)`],
  ["Cảm giác",  `${w.feelslike_c}°C`],
  ["Dự báo",    w.condition.text],
])}

${DIV}
${section("💨 Khí quyển", [
  ["Gió",       `${w.wind_kph} km/h ${w.wind_dir}`],
  ["Gió giật",  `${w.gust_kph} km/h`],
  ["Áp suất",   `${w.pressure_mb} mb`],
  ["UV Index",  w.uv],
])}

${DIV}
💧 Độ ẩm  ${humid} <code>${w.humidity}%</code>
☁️ Mây    ${cloud} <code>${w.cloud}%</code>
🌧 Mưa   <code>${w.precip_mm} mm</code>
${DIV}
<i>📍 ${l.name}, ${l.country}  •  ${nowVN()}</i>`.trim();
  },

  // ── /ip ──────────────────────────────────────────────
  ip: (d, ip) => `
🌐 <b>THÔNG TIN IP</b>
${DIV2}
${section("📍 Địa chỉ", [
  ["IP",       `<code>${ip}</code>`],
  ["Quốc gia", `${d.country} (${d.countryCode})`],
  ["Vùng",     d.regionName],
  ["Thành phố", d.city],
  ["Mã bưu chính", d.zip],
])}

${DIV}
${section("🏢 Mạng", [
  ["ISP",    d.isp],
  ["Tổ chức", d.org],
  ["AS",     d.as],
])}

${DIV}
${section("🗺 Vị trí", [
  ["Tọa độ",  `${d.lat}, ${d.lon}`],
  ["Múi giờ", d.timezone],
])}
${DIV}
<i>⏰ ${nowVN()}</i>`.trim(),

  // ── /gh ──────────────────────────────────────────────
  github: (d) => `
🐙 <b>GITHUB PROFILE</b>
${DIV2}
${section("👤 Người dùng", [
  ["Username",  `<a href="${d.html_url}">@${d.login}</a>`],
  ["Tên",       d.name],
  ["Bio",       d.bio],
  ["Công ty",   d.company],
  ["Blog",      d.blog ? `<a href="${d.blog}">${d.blog}</a>` : null],
  ["Location",  d.location],
])}

${DIV}
${section("📈 Thống kê", [
  ["Followers",   d.followers],
  ["Following",   d.following],
  ["Public Repos", d.public_repos],
  ["Gists",       d.public_gists],
  ["Tạo lúc",     new Date(d.created_at).toLocaleDateString("vi-VN")],
  ["Cập nhật",    new Date(d.updated_at).toLocaleDateString("vi-VN")],
])}
${DIV}
<i>⏰ ${nowVN()}</i>`.trim(),

  // ── /ff ──────────────────────────────────────────────
  ff: (cay, pet, clan, captain, social) => `
🎮 <b>FREE FIRE INFO</b>
${DIV2}
${section("👤 Người chơi", [
  ["Tên",       cay.nickname],
  ["UID",       `<code>${cay.accountId}</code>`],
  ["Level",     `${cay.level}  •  EXP: ${cay.exp}`],
  ["Khu vực",   cay.region],
  ["Likes",     cay.liked],
  ["Bio",       social?.signature],
  ["BR Rank",   cay.rank],
  ["CS Rank",   cay.csRank],
])}

${DIV}
${section("🐾 Pet", [
  ["Tên",   pet.name],
  ["Level", `${pet.level}  •  EXP: ${pet.exp}`],
])}

${DIV}
${section("🏰 Quân đoàn", [
  ["Tên",         clan.clanName],
  ["ID",          `<code>${clan.clanId}</code>`],
  ["Level",       clan.clanLevel],
  ["Thành viên",  clan.memberNum],
  ["Chủ tướng",   captain.nickname],
])}
${DIV}
<i>⏰ ${nowVN()}</i>`.trim(),

  // ── /fb ──────────────────────────────────────────────
  fb: (d, avatarUrl) => `
📘 <b>FACEBOOK INFO</b>
${DIV2}
${section("👤 Hồ sơ", [
  ["Tên",       d.name],
  ["ID",        `<code>${d.id}</code>`],
  ["Username",  d.username],
  ["Ngôn ngữ", d.language],
  ["Avatar",    `<a href="${avatarUrl}">Xem ảnh</a>`],
  ["Link",      d.link],
  ["Ngày sinh", d.birthday],
  ["Giới tính", d.gender],
  ["Xác thực",  d.is_verified ? "✅ Đã xác thực" : "❌ Chưa xác thực"],
  ["Ngày tạo",  d.created_time?.split("T")[0]],
])}

${DIV}
${section("📊 Tương tác", [
  ["Followers", d.subscribers?.summary?.total_count?.toLocaleString("vi-VN")],
  ["Giới thiệu", d.about],
])}
${DIV}
<i>⏰ ${nowVN()}</i>`.trim(),

  // ── /thoigian ────────────────────────────────────────
  thoigian: (zones) => {
    const rows = zones
      .map((z) => `${z.emoji} <b>${z.name.padEnd(11)}</b>  <code>${timeInZone(z.tz)}</code>`)
      .join("\n");
    return `
🕐 <b>GIỜ THỜI GIAN THỰC</b>
${DIV2}
${rows}
${DIV}
<i>⏰ Cập nhật lúc ${nowVN()}</i>`.trim();
  },

  // ── /base64 ──────────────────────────────────────────
  base64: (mode, input, result) => `
🔐 <b>BASE64 ${mode.toUpperCase()}</b>
${DIV}
📥 <b>Input:</b>
<code>${input}</code>

📤 <b>Output:</b>
<code>${result}</code>
${DIV}
<i>⏰ ${nowVN()}</i>`.trim(),

  // ── /calc ────────────────────────────────────────────
  calc: (expr, result) => `
🧮 <b>MÁY TÍNH</b>
${DIV}
📝 <b>Biểu thức:</b> <code>${expr}</code>
✅ <b>Kết quả:</b>   <code>${result}</code>
${DIV}
<i>⏰ ${nowVN()}</i>`.trim(),

  // ── /muavip ──────────────────────────────────────────
  muavip: (userId) => `
💎 <b>NÂNG CẤP VIP</b>
${DIV2}
${section("💳 Thông tin thanh toán", [
  ["Ngân hàng",  "TechcomBank 🏦"],
  ["STK",        `<code>311220044444</code>`],
  ["Chủ TK",     "NGUYEN THI ANH"],
  ["Nội dung",   `<code>muavip_${userId}</code>`],
  ["Số tiền",    "<b>50.000 VNĐ</b>"],
  ["HSD",        "30 ngày"],
  ["Liên hệ",    "@quanhau2010"],
])}
${DIV}
<i>⚠️ Điền đúng nội dung chuyển khoản để kích hoạt tự động.</i>`.trim(),

  // ── /zalo ────────────────────────────────────────────
  zalo: (d, phone) => `
💚 <b>ZALO INFO</b>
${DIV2}
${section("👤 Người dùng", [
  ["SĐT",         `<code>${phone}</code>`],
  ["Tên",         d.name],
  ["Tên Zalo",    d.zalo_name],
  ["Loại TK",     d.acc_type],
  ["Avatar",      `<a href="${d.avatar}">Xem ảnh</a>`],
  ["Mã QR",       `<a href="${d.qrCodeUrl}">Xem QR</a>`],
])}
${DIV}
<i>⏰ ${nowVN()}</i>`.trim(),

  // ── /dinhgiasdt ──────────────────────────────────────
  dinhgiasdt: (sdt, val) => `
📱 <b>ĐỊNH GIÁ SỐ ĐIỆN THOẠI</b>
${DIV2}
${section("💰 Kết quả", [
  ["Số điện thoại", `<code>${sdt}</code>`],
  ["Định giá",      `<b>${val} VNĐ</b>`],
])}
${DIV}
<i>⏰ ${nowVN()}</i>`.trim(),

  // ── /dice ────────────────────────────────────────────
  dice: (result) => {
    const faces = ["⚀","⚁","⚂","⚃","⚄","⚅"];
    return `
🎲 <b>TUNG XÚC XẮC</b>
${DIV}
Kết quả: ${faces[result - 1]}  →  <b>${result}</b>
${DIV}
<i>⏰ ${nowVN()}</i>`.trim();
  },

  // ── /joke ────────────────────────────────────────────
  joke: (text) => `
😂 <b>JOKE OF THE DAY</b>
${DIV}
${text}
${DIV}
<i>⏰ ${nowVN()}</i>`.trim(),

  // ── Errors ──────────────────────────────────────────
  error: (msg) => `❌ <b>Lỗi:</b> ${msg}`,
  noPermission: () => `🚫 <b>Bạn không có quyền sử dụng lệnh này!</b>`,
  usage: (cmd, example) =>
    `⚠️ <b>Cú pháp sai!</b>\n\n📌 Dùng: <code>${cmd}</code>\n💡 Ví dụ: <code>${example}</code>`,
};

module.exports = { UI, nowVN, tag, progressBar, DIV, DIV2, DIV3, timeInZone };