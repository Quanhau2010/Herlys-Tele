// ╔══════════════════════════════════════════════════════╗
// ║              HERLYS BOT — MIDDLEWARE                 ║
// ╚══════════════════════════════════════════════════════╝

const { ADMIN_IDS } = require("./config");
const logger = require("./logger");

/**
 * Kiểm tra user có phải admin nhóm không
 */
async function isAdmin(bot, chatId, userId) {
  try {
    const admins = await bot.getChatAdministrators(chatId);
    return admins.some((a) => a.user.id === userId);
  } catch {
    return false;
  }
}

/**
 * Kiểm tra user có phải super admin (trong ADMIN_IDS) không
 */
function isSuperAdmin(userId) {
  return ADMIN_IDS.includes(userId);
}

/**
 * Require admin nhóm — nếu không phải, gửi lỗi và return false
 */
async function requireAdmin(bot, msg, ui) {
  const ok = await isAdmin(bot, msg.chat.id, msg.from.id);
  if (!ok) {
    await bot.sendMessage(msg.chat.id, ui.noPermission(), { parse_mode: "HTML" });
    return false;
  }
  return true;
}

/**
 * Require super admin — nếu không phải, gửi lỗi và return false
 */
async function requireSuperAdmin(bot, msg, ui) {
  if (!isSuperAdmin(msg.from.id)) {
    await bot.sendMessage(msg.chat.id, ui.noPermission(), { parse_mode: "HTML" });
    return false;
  }
  return true;
}

/**
 * Safe send — tự bắt lỗi và log
 */
async function safeSend(fn, context = "") {
  try {
    return await fn();
  } catch (e) {
    logger.error(`safeSend [${context}]`, e);
    return null;
  }
}

/**
 * Delay helper
 */
function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

/**
 * Xóa tin nhắn sau delay ms
 */
async function deleteAfter(bot, chatId, messageId, delayMs) {
  await sleep(delayMs);
  try {
    await bot.deleteMessage(chatId, messageId);
  } catch {}
}

/**
 * Send và tự xóa sau delayMs
 */
async function sendAndDelete(bot, chatId, text, opts, delayMs) {
  const sent = await bot.sendMessage(chatId, text, opts);
  deleteAfter(bot, chatId, sent.message_id, delayMs);
  return sent;
}

/**
 * Download file về buffer từ URL
 */
async function downloadBuffer(url) {
  const axios = require("axios");
  const res = await axios.get(url, { responseType: "arraybuffer" });
  return Buffer.from(res.data);
}

/**
 * Log command usage
 */
function logCmd(msg, cmd) {
  const user = msg.from.username
    ? `@${msg.from.username}`
    : msg.from.first_name;
  logger.cmd(user, cmd, msg.chat.id);
}

module.exports = {
  isAdmin,
  isSuperAdmin,
  requireAdmin,
  requireSuperAdmin,
  safeSend,
  sleep,
  deleteAfter,
  sendAndDelete,
  downloadBuffer,
  logCmd,
};