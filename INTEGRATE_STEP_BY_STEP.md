# Tích hợp vào GitHub Pages — từng bước trên Mac

Website hiện tại: https://nngochuyen19-del.github.io/mach-van-nhi-ai/

## 0. Sao lưu
1. Mở repo GitHub `nngochuyen19-del/mach-van-nhi-ai`.
2. Tải về bản ZIP hiện tại hoặc lưu bản sao của `index.html`, `style.css`, `app.js`.
3. Không xóa hoặc thay thế toàn bộ `app.js`.

## 1. Tải 4 tệp mới lên repo
Trong GitHub repo → Add file → Upload files, tải lên:
- `support-controller.js`
- `support-panel.js`
- `support-panel.css`
Nhấn Commit changes.
`support-panel.html` chỉ là đoạn HTML để chèn, không tải lên như một trang độc lập.

## 2. Sửa index.html
A. Trong `<head>`, ngay sau `<link rel="stylesheet" href="style.css">`, thêm:
```html
<link rel="stylesheet" href="support-panel.css">
```

B. Tìm dòng:
```html
<div id="hintsOutput" class="hints-output hidden"></div>
```
Ngay sau dòng đó, dán toàn bộ nội dung tệp `support-panel.html`.

C. Cuối trang, ngay trước `</body>`, sau `<script src="app.js"></script>` (hoặc sau script app.js hiện có), thêm:
```html
<script src="support-controller.js"></script>
<script src="support-panel.js"></script>
```
Lưu ý: các script phải nằm trước `</body>` và `support-controller.js` phải đứng trước `support-panel.js`.

## 3. Kiểm tra
1. Mở website.
2. Nhấn `Cmd + Shift + R` để tải mới.
3. Vào “Góc bài làm”, kéo xuống dưới phần gợi ý.
4. Thử các trường hợp:
   - “Chưa nêu được ý phù hợp” từ Mức 0 → Mức 1 → Mức 2 → dừng và mời giáo viên.
   - “Đã nêu ý riêng phù hợp” → giảm mức.
   - “Giáo viên dừng hỗ trợ tự động” → dừng.
   - “Chưa rõ” → không kết luận năng lực.
5. Bấm “Xuất nhật ký JSON” để kiểm tra nhật ký.

## 4. Giới hạn hiện tại
- Không gọi AI thật.
- Giáo viên tự chọn loại bằng chứng; không tự động suy luận năng lực.
- Nhật ký không đồng bộ, không đăng nhập, không có cơ sở dữ liệu.
- Chưa phù hợp để dùng làm căn cứ chấm điểm học sinh.
- Trước khi kết nối AI thật, cần tạo backend và lưu API key phía máy chủ; tuyệt đối không đặt API key trong JS công khai.
