# ⚡ Herlys-Tele ⚡

**Herlys-Tele** là một framework Telegram Bot thế hệ mới, được xây dựng hoàn toàn bằng **Node.js** với kiến trúc **Modular** lấy cảm hứng từ Mirai Bot (Facebook). Thiết kế giúp việc phát triển, bảo trì và mở rộng tính năng trở nên cực kỳ đơn giản và hiệu quả.

<p align="center">
  <img src="https://via.placeholder.com/728x90/000000/FFFFFF?text=Herlys-Tele+v1.0.0" alt="Herlys-Tele Banner" />
</p>

<p align="center">
  <strong>Trạng thái:</strong> Ổn định • <strong>Phiên bản:</strong> v1.0.0 • <strong>Khu vực:</strong> Asia/Ho_Chi_Minh 🇻🇳
</p>

---

## 🌟 Tính năng nổi bật

- 🚀 **Core Engine mạnh mẽ**: Tự động quét và load toàn bộ module từ thư mục `modules/`.
- 🧩 **Cấu trúc Mirai-style**: Mỗi lệnh chỉ là **một file .js** độc lập → dễ bảo trì, dễ mở rộng.
- 🖼️ **Media Rich ngay từ đầu**: Hỗ trợ Welcome Video, GIF chào mừng, ảnh quảng bá từ hệ thống Media Herlys.
- 🔌 **Hệ sinh thái API tích hợp sẵn**: Hơn **10+ dịch vụ** (Weather, Capcut, VietQR, TikTok, GitHub, Imgur, IP-API, Sumi API…).
- 🛡️ **Bảo mật & Phân quyền**: Hệ thống Admin dựa trên `adminIds`, kiểm soát chặt chẽ quyền sử dụng lệnh.

---

## 📂 Cấu trúc thư mục dự án

```text
Herlys-Tele/
├── modules/                # Tất cả các lệnh (tự động load)
│   ├── menu.js             # Lệnh hiển thị danh sách lệnh
│   └── TEMPLATE.js         # Mẫu để tạo module mới
├── index.js                # Core Engine - Điểm khởi chạy chính
├── config.json             # Cấu hình Token, Prefix, Admin, API Keys, Media...
├── package.json            # Dependencies & Scripts
└── README.md               # Tài liệu này

⚡ Cài đặt & Khởi chạy nhanh
Yêu cầu hệ thống

Node.js: v16.x trở lên (khuyến nghị v18.x hoặc v20.x)
Telegram Bot Token: Tạo bot miễn phí qua @BotFather
Git (để clone repository)

Các bước cài đặt

Clone mã nguồnBashgit clone https://github.com/Quanhau2010/Herlys-Tele.git
cd Herlys-Tele
Cài đặt dependenciesBashnpm install
Cấu hình file config.jsonJSON{
  "token": "YOUR_BOT_TOKEN_HERE",
  "prefix": "/",
  "adminIds": [8022468254],
  "botName": "Herlys Bot"
  // Thêm các API key nếu cần (Weather, Imgur, Capcut, v.v.)
}
Khởi động bot
Chạy trực tiếp (test):Bashnode index.js
Chạy lâu dài (production - khuyến nghị):Bashnpm install -g pm2
pm2 start index.js --name "Herlys-Tele"
pm2 save
pm2 startup



✍️ Hướng dẫn tạo module mới
Mọi lệnh tuân thủ cấu trúc thống nhất:
JavaScriptmodule.exports = {
  config: {
    name: "tenlenh",              // Tên lệnh (không dấu, không space)
    version: "1.0.0",
    permission: 0,                // 0: Mọi người | 1: Chỉ Admin
    description: "Mô tả ngắn gọn về lệnh",
    usage: "/tenlenh [tham số]"
  },

  run: async ({ bot, msg, args, config }) => {
    // Logic lệnh của bạn
    await bot.sendMessage(msg.chat.id, "Chào mừng bạn đến với Herlys-Tele! ⚡");
  }
};

Lưu file vào modules/ (ví dụ: ping.js)
Khởi động lại bot → tự load.


🛰️ Các API & Dịch vụ đã tích hợp sẵn



































LoạiDịch vụChức năng chínhTài chínhVietQRTạo mã QR thanh toán ngân hàngTiện íchWeatherAPI, IP-APIThời tiết, thông tin IPGiải tríCapcut, TikTok, Sumi APIThông tin video, tải nội dungLưu trữImgur APIUpload ảnh nhanh chóngPhát triểnGitHub APITương tác repo, issue, v.v.
Dễ dàng mở rộng bằng cách thêm key vào config.

🤝 Đóng góp & Bản quyền

Tác giả: QuanHau & Herlys Team
Cảm hứng: Mirai Bot Project (Facebook)
Bản quyền: Giữ nguyên credit developer trong source. Không xóa/sửa thông tin tác giả.
