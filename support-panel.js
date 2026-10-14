/* Kết nối panel với bộ điều khiển cục bộ. Không gọi AI thật. */
(function () {
  "use strict";
  const $ = id => document.getElementById(id);
  if (!window.MachVanNhiSupport || !$("supportController")) return;
  let state = MachVanNhiSupport.initialState();
  const topicEl = $("workTopic");
  const levelNames = ["Mức 0 — Tự nghĩ", "Mức 1 — Gợi mở", "Mức 2 — Gợi mở cụ thể"];
  function renderLevel() {
    document.querySelectorAll("[data-level-pill]").forEach(el => {
      el.classList.toggle("is-current", Number(el.dataset.levelPill) === state.level);
    });
  }
  function renderLog() {
    const list = $("supportLog");
    list.innerHTML = "";
    const rows = state.history.slice(-12).reverse();
    if (!rows.length) {
      list.innerHTML = "<li>Chưa có quyết định nào.</li>";
      return;
    }
    rows.forEach(row => {
      const li = document.createElement("li");
      const title = document.createElement("strong");
      title.textContent = `${levelNames[row.levelBefore]} → ${levelNames[row.levelAfter]}`;
      const detail = document.createElement("div");
      detail.textContent = `${row.reason}${row.evidenceText ? " Bằng chứng: " + row.evidenceText : ""}`;
      li.append(title, detail);
      list.appendChild(li);
    });
  }
  $("applySupportRule").addEventListener("click", () => {
    const result = MachVanNhiSupport.decide(state, {
      kind: $("supportEvidence").value,
      answer: $("supportAnswer").value.trim(),
      topic: topicEl ? topicEl.value : "object"
    });
    state = result.state;
    $("supportQuestion").textContent = result.question || (result.action === "teacher" ? "Mời giáo viên hỗ trợ trực tiếp. Không tiếp tục tăng gợi ý tự động." : "Lượt hỗ trợ đã dừng.");
    $("supportReason").textContent = result.reason;
    renderLevel();
    renderLog();
  });
  $("resetSupportRule").addEventListener("click", () => {
    state = MachVanNhiSupport.initialState();
    $("supportEvidence").value = "unclear";
    $("supportAnswer").value = "";
    $("supportQuestion").textContent = MachVanNhiSupport.questionFor(0, topicEl ? topicEl.value : "object", "");
    $("supportReason").textContent = "Bắt đầu lượt mới ở Mức 0. Học sinh có cơ hội tự nghĩ trước.";
    renderLevel();
    renderLog();
  });
  $("exportSupportLog").addEventListener("click", () => {
    const payload = {
      schemaVersion: "1.0",
      exportedAt: new Date().toISOString(),
      note: "Nhật ký thử nghiệm; không phải kết quả nghiên cứu hoặc chẩn đoán năng lực.",
      history: state.history
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "mach-van-nhi-support-log.json"; a.click();
    URL.revokeObjectURL(url);
  });
  renderLevel();
})();
