# ⚡ Herlys-Tele ⚡

**Herlys-Tele** là một bộ mã nguồn Robot Telegram thế hệ mới, chạy trên nền tảng **Node.js**. Được xây dựng với kiến trúc **Modular System** lấy cảm hứng từ Mirai Bot (Facebook), giúp việc quản lý và phát triển tính năng trở nên cực kỳ đơn giản.

> **Trạng thái:** Hoạt động ổn định (v1.0.0)  
> **Khu vực:** Asia/Ho_Chi_Minh 🇻🇳

---

## 🌟 Tính năng nổi bật

* **🚀 Core Engine**: Tự động quét và nạp module từ thư mục `modules/`.
* **🧩 Cấu trúc Mirai**: Mỗi file `.js` là một lệnh riêng biệt, dễ bảo trì.
* **🖼️ Media Rich**: Tích hợp sẵn Welcome Video, GIF và ảnh quảng bá từ hệ thống Media của Herlys.
* **🔌 Ecosystem API**: Kết nối sẵn hơn 10+ API dịch vụ (Weather, Capcut, VietQR, TikTok, GitHub...).
* **🛡️ Security**: Hệ thống phân quyền Admin dựa trên `adminIds`.

---

## 📂 Cấu trúc thư mục



```text
Herlys-Tele/
├── 📁 modules/         # Kho chứa lệnh (Tự động load)
│   ├── 📄 menu.js      # Lệnh hiển thị danh sách chức năng
│   └── 📄 TEMPLATE.js  # File mẫu để tạo lệnh mới
├── 📄 index.js         # Lõi điều khiển (Core Engine)
├── 📄 config.json      # Cấu hình Token, API & Media
├── 📄 package.json     # Thông tin thư viện sử dụng
└── 📄 README.md        # Hướng dẫn sử dụng
⚡ Cài đặt & Chạy
1. Yêu cầu hệ thống
Node.js v16.x trở lên.

Một Token Bot từ @BotFather.

2. Tải mã nguồn
Bash
git clone [https://github.com/Quanhau2010/Herlys-Tele.git](https://github.com/Quanhau2010/Herlys-Tele.git)
cd Herlys-Tele
3. Cài đặt Dependencies
Bash
npm install
4. Cấu hình config.json
Điền Token và Admin ID của bạn vào file cấu hình:

JSON
{
  "token": "YOUR_TOKEN_HERE",
  "prefix": "/",
  "adminIds": [8022468254],
  "botName": "Herlys Bot"
}
5. Khởi động
Bash
# Chạy trực tiếp
node index.js

# Chạy lâu dài với PM2
npm install pm2 -g
pm2 start index.js --name "Herlys-Tele"
✍️ Cách tạo Module mới
Mọi module trong Herlys-Tele đều tuân thủ cấu trúc đồng nhất để Core Engine có thể nhận diện:

JavaScript
module.exports = {
  config: {
    name: "ten_lenh",
    version: "1.0.0",
    permission: 0, // 0: User, 1: Admin
    description: "Mô tả lệnh",
    usage: "/ten_lenh"
  },
  run: async ({ bot, msg, args, config }) => {
    // Code xử lý logic ở đây
    bot.sendMessage(msg.chat.id, "Chào mừng bạn đến với Herlys-Tele! ⚡");
  }
};
🛰️ Hệ thống API tích hợp
Bot đã được cấu hình sẵn các Endpoint mạnh mẽ:

Tài chính: VietQR (Tạo mã QR thanh toán).

Tiện ích: WeatherAPI, IP-API, GitHub API.

Giải trí: Capcut Info, TikTok, Sumi API.

Lưu trữ: Imgur API.

🤝 Đóng góp & Bản quyền
Author: QuanHau & Herlys

Cảm hứng: Mirai Bot Project.

Vui lòng tôn trọng quyền tác giả và không xóa phần DEVELOPER trong mã nguồn.
