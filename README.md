# Mạch Văn Nhí AI v3 — Trường TH Trần Quốc Toản

Bản nâng cấp giao diện, minh họa Mầm Nhí, lựa chọn lớp 1–5, chế độ tivi, gợi ý theo chủ đề, ghi âm ý tưởng, chọn ảnh bài viết và lưu bộ sưu tập cục bộ.

## Chạy thử
- Giải nén ZIP.
- Mở `index.html` trong Chrome hoặc Safari.
- Để dùng micro ổn định, chạy qua HTTPS sau khi xuất bản GitHub Pages hoặc dùng máy chủ localhost. Trình duyệt sẽ hỏi quyền truy cập micro.

## Cập nhật GitHub Pages đang có
1. Giải nén ZIP trên máy tính.
2. Mở repository `nngochuyen19-del/mach-van-nhi-ai` trên GitHub.
3. Chọn **Add file → Upload files**.
4. Kéo thả và tải lên cả 3 file `index.html`, `style.css`, `app.js` từ bản v3; chấp nhận thay thế file cũ.
5. Nhấn **Commit changes**. Đợi GitHub Pages cập nhật.
6. Mở website và tải lại mạnh bằng `Cmd + Shift + R`.

## Giới hạn quan trọng
- Bản này chưa có AI trực tuyến; các gợi ý là thư viện câu hỏi được lập trình sẵn theo chủ đề và lớp.
- Ghi âm/ảnh/bài làm được lưu trong localStorage của trình duyệt trên thiết bị hiện tại. Dữ liệu không tự đồng bộ sang giáo viên/thiết bị khác; trình duyệt có thể giới hạn dung lượng lưu ảnh/âm thanh.
- Ảnh được giới hạn 5 MB trước khi lưu. Không nhập tên đầy đủ hoặc thông tin riêng tư của học sinh.
- Trước khi dùng thật trong trường, cần backend có đăng nhập, quyền truy cập riêng, lưu trữ an toàn, chính sách giữ/xóa dữ liệu và sự đồng ý phù hợp cho việc ghi âm/chụp ảnh học sinh.


## Nhận diện chữ trong ảnh (OCR miễn phí — bản thử nghiệm)
- Chọn/chụp ảnh bài viết, sau đó nhấn **Đọc chữ trong ảnh miễn phí**.
- Bản này dùng Tesseract.js chạy trong trình duyệt và dữ liệu ngôn ngữ tiếng Việt tải từ CDN; lần đầu cần Internet.
- Không cần API key và ảnh được xử lý trong trình duyệt, nhưng không cam kết ảnh không được lưu bởi trình duyệt/thiết bị.
- **Giới hạn quan trọng:** Tesseract chủ yếu hoạt động tốt hơn với chữ in; chữ viết tay của học sinh tiểu học, dấu tiếng Việt, ảnh nghiêng hoặc mờ có thể nhận diện sai. Học sinh cần đối chiếu ảnh gốc và sửa văn bản trước khi dùng.
- OCR chưa phải AI hiểu bài, chưa tự nhận xét ngữ nghĩa, chưa chấm điểm và không tự sửa câu thay học sinh.
- Nếu không tải được thư viện hoặc dữ liệu ngôn ngữ, kiểm tra Internet và tải lại trang.
