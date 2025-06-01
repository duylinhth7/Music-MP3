# 🎵 Dự án Nghe Nhạc Trực Tuyến - Node.js + Express + MongoDB

## 📌 Giới thiệu
Đây là dự án nghe nhạc trực tuyến được xây dựng bằng Node.js theo kiến trúc SSR (Server-side Rendering) sử dụng ExpressJS và MongoDB.  
Ứng dụng chia làm hai phần chính:
- **Client**: Cho phép người dùng đăng ký, đăng nhập, nghe nhạc, like và thêm bài hát yêu thích.
- **Admin**: Quản lý toàn bộ nội dung như bài hát, ca sĩ, danh mục; phân quyền người dùng.

---

## 🚀 Tính năng

### 👨‍🎤 Client
- 🔐 Đăng ký / Đăng nhập / Đăng xuất
- 🔁 Quên mật khẩu (Reset password qua email)
- 🎧 Nghe nhạc trực tuyến với giao diện thân thiện
- ❤️ Thêm bài hát vào danh sách yêu thích
- 👍 Like bài hát
- 🔍 Tìm kiếm bài hát / nghệ sĩ / chủ đề

### 🛠️ Admin
- ➕ Thêm / ✏️ Sửa / 🗑️ Xóa bài hát
- 📂 Quản lý danh mục / thể loại bài hát
- 👨‍🎤 Quản lý ca sĩ
- 👤 Quản lý người dùng & phân quyền tài khoản Admin

---

## 🛠️ Công nghệ sử dụng

| Công nghệ      | Mô tả                                  |
|----------------|------------------------------------------|
| Node.js        | Nền tảng backend chính                   |
| ExpressJS      | Web framework nhẹ, nhanh và hiệu quả     |
| MongoDB        | Cơ sở dữ liệu NoSQL                      |
| Mongoose       | ORM để làm việc với MongoDB              |
| Pug            | Template engine dùng cho SSR             |
| Bootstrap 5    | Giao diện responsive                     |
| md5            | Mã hóa mật khẩu người dùng               |
| express-session| Quản lý phiên đăng nhập                  |
| nodemailer     | Gửi email (reset password)               |
| moment         | Định dạng thời gian                      |
