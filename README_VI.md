# Bộ tích hợp Mạch Văn Nhí AI — Mầm Nhí biết lùi lại 1.0

## Mục đích
Đây là **bộ tích hợp thử nghiệm** cho website GitHub Pages hiện tại. Nó bổ sung panel chuyển mức hỗ trợ vào trang, nhưng chưa kết nối mô hình AI trực tuyến và không tự động đánh giá học sinh. Giáo viên chọn loại bằng chứng để kiểm tra quy tắc trước.

## Các tệp
- `support-controller.js`: logic trạng thái Mức 0/1/2, dừng an toàn, nhật ký.
- `support-panel.html`: khối giao diện cần chèn vào `index.html`.
- `support-panel.css`: kiểu hiển thị.
- `support-panel.js`: nối giao diện với logic.
- `INTEGRATE_STEP_BY_STEP.md`: hướng dẫn tích hợp thủ công.

## Vì sao không thay toàn bộ index.html/app.js?
Tệp nguồn đầy đủ không được sửa trực tiếp trong gói này để tránh vô tình ghi đè các chỉnh sửa mới nhất trên GitHub của cô. Hãy sao lưu trước và thêm đúng các phần trong hướng dẫn.
