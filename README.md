# Mạch Văn Nhí AI — website công khai bản đầu

Đây là website tĩnh responsive, có các nút điều hướng, bài học mẫu, hộp thoại luyện tập và chế độ trình chiếu. Nội dung tiếng Việt dùng UTF-8.

## Chạy trên Mac
1. Giải nén ZIP.
2. Mở `index.html` bằng Chrome để xem thử, hoặc chạy máy chủ tĩnh:
   - Mở Terminal tại thư mục này.
   - Chạy `python3 -m http.server 8000`
   - Mở `http://localhost:8000`

Không cần Node.js cho bản tĩnh này.

## Đưa lên mạng để mọi người bấm link — GitHub Pages miễn phí
1. Tạo tài khoản GitHub nếu chưa có tại https://github.com/
2. Tạo repository mới, ví dụ `mach-van-nhi-ai`.
3. Upload ba file `index.html`, `style.css`, `app.js` lên thư mục gốc của repository.
4. Vào **Settings → Pages**.
5. Trong **Build and deployment**, chọn **Deploy from a branch**; Branch `main`, folder `/ (root)`; nhấn **Save**.
6. Đợi vài phút, GitHub sẽ hiển thị địa chỉ công khai dạng `https://TEN-TAI-KHOAN.github.io/mach-van-nhi-ai/`.
7. Gửi link đó cho giáo viên/phụ huynh; mọi người có thể mở mà không cần tài khoản GitHub.

## Quan trọng
- Website chưa được xuất bản lên mạng. Người tạo phải thực hiện bước triển khai GitHub Pages để có link thật.
- Các câu hỏi hiện là mẫu minh họa, không phải AI trực tuyến. Nút “Mầm Nhí gợi ý” hiện dùng câu hỏi mẫu dựa theo nội dung nhập. Muốn AI thật cần API server-side, xác thực, giới hạn lượt gọi và bảo vệ dữ liệu; không đặt API key trong JavaScript công khai.
- Không nhập dữ liệu cá nhân của học sinh vào bản thử nghiệm này.
