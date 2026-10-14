/* Mạch Văn Nhí AI — bộ điều khiển mức hỗ trợ 1.0
   Không gọi AI, không lưu dữ liệu cá nhân. Đây là bộ quy tắc cục bộ để thử nghiệm.
*/
(function (global) {
  "use strict";
  const MAX_LEVEL = 2;
  const MAX_LEVEL2_ATTEMPTS = 1;

  function initialState() {
    return {
      level: 0,
      level2Attempts: 0,
      status: "active",
      history: []
    };
  }

  function decide(state, evidence) {
    const prev = state || initialState();
    const ev = evidence || {};
    const answer = String(ev.answer || "").trim();
    const kind = ev.kind || "unclear";
    let next = { ...prev, history: [...(prev.history || [])] };
    let action = "ask";
    let reason = "";
    let question = "";

    if (prev.status === "stopped") {
      return { state: prev, action: "stopped", reason: "Lượt hỗ trợ đã dừng; giáo viên cần khởi tạo lượt mới.", question: "" };
    }

    if (kind === "teacher_stop") {
      next.status = "stopped";
      action = "teacher";
      reason = "Giáo viên yêu cầu dừng hỗ trợ tự động.";
    } else if (kind === "help_request") {
      if (prev.level < MAX_LEVEL) {
        next.level = Math.min(MAX_LEVEL, prev.level + 1);
        reason = "Học sinh yêu cầu trợ giúp; chỉ tăng một mức trong giới hạn.";
      } else {
        next.status = "stopped";
        action = "teacher";
        reason = "Đã đạt mức hỗ trợ tối đa; chuyển giáo viên hỗ trợ.";
      }
    } else if (kind === "relevant_idea") {
      next.level = Math.max(0, prev.level - 1);
      next.level2Attempts = 0;
      reason = "Đã có ý riêng liên quan; giảm hỗ trợ để học sinh tiếp tục tự làm.";
      action = "continue";
    } else if (kind === "no_relevant_idea") {
      if (prev.level === 0) {
        next.level = 1;
        reason = "Chưa có ý phù hợp sau thời gian tự nghĩ; chuyển sang câu hỏi mở.";
      } else if (prev.level === 1) {
        next.level = 2;
        reason = "Chưa có ý phù hợp sau câu hỏi mở; tăng một mức gợi mở cụ thể.";
      } else {
        next.level2Attempts = (prev.level2Attempts || 0) + 1;
        next.status = "stopped";
        action = "teacher";
        reason = "Vẫn chưa có ý phù hợp ở mức tối đa; dừng tự động để giáo viên hỗ trợ.";
      }
    } else {
      // Không kết luận năng lực từ câu trả lời ngắn, mơ hồ hoặc ngoài chủ đề.
      action = "clarify";
      reason = "Chưa đủ bằng chứng để xác định mức độ phù hợp; hỏi lại tối đa một lần hoặc mời giáo viên xem xét.";
    }

    if (next.status !== "stopped") {
      question = questionFor(next.level, ev.topic || "object", answer);
    }
    const entry = {
      timestamp: new Date().toISOString(),
      levelBefore: prev.level,
      levelAfter: next.level,
      evidenceKind: kind,
      evidenceText: answer,
      action,
      reason,
      question
    };
    next.history.push(entry);
    return { state: next, action, reason, question, entry };
  }

  function questionFor(level, topic, answer) {
    const map = {
      object: {
        0: "Em hãy tự quan sát đồ vật và ghi một điều em nhận thấy.",
        1: "Điều gì về đồ vật khiến em chú ý nhất?",
        2: "Em thử quan sát hình dáng hoặc màu sắc. Em tự nhận thấy điều gì?"
      },
      animal: {
        0: "Em hãy tự nghĩ về con vật và ghi một điều em nhớ.",
        1: "Đặc điểm nào của con vật khiến em chú ý nhất?",
        2: "Em thử quan sát dáng vẻ hoặc hoạt động của con vật. Em nhận thấy điều gì?"
      },
      place: {
        0: "Em hãy tự nghĩ về nơi em muốn tả và ghi một điều em nhớ.",
        1: "Điều gì em nhìn thấy hoặc nghe thấy ở nơi đó?",
        2: "Em thử tập trung vào màu sắc hoặc âm thanh. Em tự nhận thấy điều gì?"
      },
      person: {
        0: "Em hãy tự nghĩ về người em muốn kể và ghi một điều em nhớ.",
        1: "Việc làm nào của người ấy khiến em nhớ nhất?",
        2: "Em thử nhớ lại một việc cụ thể người ấy đã làm. Em tự kể lại điều em biết nhé."
      }
    };
    const topicMap = map[topic] || map.object;
    return topicMap[level] || topicMap[0];
  }

  function classifyByTeacherSelection(value) {
    // Bản tích hợp thử: giáo viên chọn bằng chứng; không tự động suy đoán năng lực học sinh.
    return value || "unclear";
  }

  global.MachVanNhiSupport = { initialState, decide, questionFor, classifyByTeacherSelection };
})(window);
