# ⚡ Herlys-Tele ⚡

**Herlys-Tele** là một framework Telegram Bot thế hệ mới, được xây dựng hoàn toàn bằng **Node.js** với kiến trúc **Modular** lấy cảm hứng từ Mirai Bot (Facebook).  
Thiết kế giúp việc phát triển, bảo trì và mở rộng tính năng trở nên cực kỳ đơn giản và hiệu quả.

<p align="center">
  <img src="[https://via.placeholder.com/728x90/000000/FFFFFF?text=Herlys-Tele+v1.0.0](https://keyherlyswar.x10.mx/bannertele.png)" alt="Herlys-Tele Banner" />
</p>

<p align="center">
  <strong>Trạng thái:</strong> Ổn định • 
  <strong>Phiên bản:</strong> v1.0.0 • 
  <strong>Khu vực:</strong> Asia/Ho_Chi_Minh 🇻🇳
</p>

---

## 🌟 Tính năng nổi bật

- 🚀 **Core Engine mạnh mẽ**: Tự động quét và load toàn bộ module từ thư mục `modules/`.
- 🧩 **Cấu trúc Mirai-style**: Mỗi lệnh là một file `.js` độc lập → dễ bảo trì, dễ mở rộng.
- 🖼️ **Media Rich ngay từ đầu**: Hỗ trợ Welcome Video, GIF chào mừng, ảnh quảng bá.
- 🔌 **Hệ sinh thái API tích hợp sẵn**: 10+ dịch vụ (Weather, Capcut, VietQR, TikTok, GitHub, Imgur, IP-API, Sumi API…).
- 🛡️ **Bảo mật & Phân quyền**: Hệ thống Admin dựa trên `adminIds`.

---

## 📂 Cấu trúc thư mục dự án

```text
Herlys-Tele/
├── modules/                # Tất cả các lệnh (tự động load)
│   ├── menu.js             # Lệnh hiển thị danh sách lệnh
│   └── TEMPLATE.js         # Mẫu để tạo module mới
├── index.js                # Core Engine - Điểm khởi chạy chính
├── config.json             # Cấu hình Token, Prefix, Admin, API Keys...
├── package.json            # Dependencies & Scripts
└── README.md               # Tài liệu này
```

---

## ⚡ Cài đặt & Khởi chạy nhanh

### 🔹 Yêu cầu hệ thống

- Node.js v16.x trở lên (khuyến nghị v18.x hoặc v20.x)
- Telegram Bot Token (tạo miễn phí qua @BotFather)
- Git

---

### 🔹 Các bước cài đặt

#### 1️⃣ Clone mã nguồn

```bash
git clone https://github.com/Quanhau2010/Herlys-Tele.git
cd Herlys-Tele
```

#### 2️⃣ Cài đặt dependencies

```bash
npm install
```

#### 3️⃣ Cấu hình file `config.json`

```json
{
  "token": "YOUR_BOT_TOKEN_HERE",
  "prefix": "/",
  "adminIds": [8022468254],
  "botName": "Herlys Bot"
}
```

Thêm API key nếu cần (Weather, Imgur, Capcut, v.v.).

---

### 🔹 Khởi động bot

#### ▶ Chạy test:

```bash
node index.js
```

#### 🚀 Chạy production (khuyến nghị dùng PM2):

```bash
npm install -g pm2
pm2 start index.js --name "Herlys-Tele"
pm2 save
pm2 startup
```

---

## ✍️ Hướng dẫn tạo module mới

Mỗi lệnh tuân thủ cấu trúc sau:

```javascript
module.exports = {
  config: {
    name: "tenlenh",
    version: "1.0.0",
    permission: 0, // 0: Mọi người | 1: Chỉ Admin
    description: "Mô tả ngắn gọn về lệnh",
    usage: "/tenlenh [tham số]"
  },

  run: async ({ bot, msg, args, config }) => {
    await bot.sendMessage(
      msg.chat.id,
      "Chào mừng bạn đến với Herlys-Tele! ⚡"
    );
  }
};
```

Lưu file vào thư mục `modules/` (ví dụ: `ping.js`) và khởi động lại bot → hệ thống sẽ tự động load.

---

## 🛰️ Các API & Dịch vụ tích hợp

| Loại        | Dịch vụ                | Chức năng chính                    |
|-------------|------------------------|-------------------------------------|
| Tài chính   | VietQR                 | Tạo mã QR thanh toán ngân hàng     |
| Tiện ích    | WeatherAPI, IP-API     | Thời tiết, thông tin IP            |
| Giải trí    | Capcut, TikTok, Sumi   | Thông tin & tải nội dung video     |
| Lưu trữ     | Imgur API              | Upload ảnh nhanh                   |
| Phát triển  | GitHub API             | Tương tác repo, issue, v.v.        |

Dễ dàng mở rộng bằng cách thêm key vào `config.json`.

---

## 🤝 Đóng góp & Bản quyền

- **Tác giả:** QuanHau & Herlys Team  
- **Cảm hứng:** Mirai Bot Project (Facebook)  
- **Bản quyền:** Giữ nguyên credit developer trong source. Không xóa/sửa thông tin tác giả.

---

<p align="center">
⭐ Đừng quên star repository nếu bạn thấy dự án hữu ích! ⭐
</p>
