# Bộ tình huống kiểm thử Mầm Nhí 1.0

| ID | Trạng thái trước | Bằng chứng | Kết quả mong đợi |
|---|---|---|---|
| T01 | Mức 0 | Chưa nêu ý phù hợp | Chuyển Mức 1 |
| T02 | Mức 1 | Chưa nêu ý phù hợp | Chuyển Mức 2 |
| T03 | Mức 2 | Chưa nêu ý phù hợp | Dừng, mời giáo viên |
| T04 | Mức 2 | Đã nêu ý riêng phù hợp | Giảm về Mức 1 |
| T05 | Mức 1 | Đã nêu ý riêng phù hợp | Giảm về Mức 0 |
| T06 | Bất kỳ mức đang hoạt động | Giáo viên dừng | Dừng |
| T07 | Bất kỳ mức đang hoạt động | Chưa rõ | Không kết luận; yêu cầu xem xét |
| T08 | Đã dừng | Bất kỳ bằng chứng nào | Giữ trạng thái dừng |

Lưu ý: các tình huống này kiểm tra logic phần mềm, không phải minh chứng về hiệu quả giáo dục.
