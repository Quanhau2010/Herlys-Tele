# 🤖 Herlys Bot — Node.js v3.0.0

> Bot Telegram đa năng, chuyên nghiệp — kiến trúc module, logger đẹp, UI nhất quán.

## 📁 Cấu trúc dự án

```
herlys-bot/
├── index.js                  ← Entry point chính
├── package.json
├── src/
│   ├── config.js             ← Cấu hình (token, API, media...)
│   ├── logger.js             ← Logger màu sắc + ASCII banner
│   ├── ui.js                 ← Template engine messages
│   ├── middleware.js         ← Helper (isAdmin, sleep, download...)
│   ├── events.js             ← Events (welcome, goodbye, errors)
│   └── commands/
│       ├── general.js        ← Lệnh chung + công cụ
│       ├── social.js         ← Mạng xã hội & thông tin
│       ├── entertainment.js  ← Giải trí, ảnh, video
│       ├── admin.js          ← Quản trị
│       └── tooldownload.js   ← Tool Herlys War
```

## ⚡ Cài đặt & Chạy

```bash
npm install
npm start          # Production
npm run dev        # Development (auto-reload)
```

**Dùng PM2 (khuyên dùng):**
```bash
npm install -g pm2
pm2 start index.js --name herlys-bot
pm2 logs herlys-bot
```

## 🆕 Thay đổi v3.0.0
- Kiến trúc module hoàn chỉnh
- Logger ASCII banner + màu sắc
- UI template engine thống nhất
- Progress bar cho RAM/humidity
- Lệnh mới: /cat /dog /meme /kick /short /ip /thoigian /gh
- Error handling + loading message cleanup
- Log từng lệnh chi tiết
