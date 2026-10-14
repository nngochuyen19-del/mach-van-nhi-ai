const $=id=>document.getElementById(id);
const topics={
 object:{title:"Tả một đồ vật quen thuộc",intro:"Hãy nghĩ về đồ vật em muốn giới thiệu.",questions:["Em đang nghĩ đến đồ vật nào? Em nhớ nhất điều gì về nó?","Khi quan sát kỹ, em thấy chi tiết nào nổi bật về hình dáng hoặc màu sắc?","Em muốn sắp xếp các ý theo thứ tự nào để người đọc dễ hình dung?","Em có thể tự đọc lại bài và kiểm tra từ ngữ, viết hoa, dấu câu không?"]},
 place:{title:"Tả cảnh đẹp quê hương",intro:"Hãy nhớ lại một nơi em từng nhìn thấy.",questions:["Em muốn tả nơi nào? Điều gì hiện lên đầu tiên trong trí nhớ?","Em nhìn thấy những màu sắc, âm thanh hay chuyển động nào?","Em muốn đưa người đọc đi từ đâu đến đâu trong bài viết?","Em đã tự kiểm tra xem các chi tiết có đúng với điều mình quan sát không?"]},
 animal:{title:"Tả con vật em yêu thích",intro:"Hãy nghĩ về một con vật em biết.",questions:["Con vật em chọn có đặc điểm nào dễ nhận ra nhất?","Em quan sát được gì ở dáng đi, bộ lông hoặc tiếng kêu?","Chi tiết nào giúp người đọc hình dung con vật rõ hơn?","Em đã đọc lại bài và sửa câu nào cho rõ ý hơn chưa?"]},
 person:{title:"Kể về một người lao động",intro:"Hãy nghĩ về một người làm công việc có ích.",questions:["Em muốn kể về ai và người đó làm công việc gì?","Em đã nhìn thấy hành động nào cho thấy sự chăm chỉ của người ấy?","Em muốn kể sự việc theo trình tự nào?","Em đã nêu được điều em học hỏi hoặc trân trọng ở người ấy chưa?"]}
};
let activeTopic="object",tvIndex=0;
function openPractice(topic="object"){activeTopic=topic;const t=topics[topic]||topics.object;$("dialogTitle").textContent=t.title;$("dialogIntro").textContent=t.intro;$("studentThought").value="";$("reflection").value="";$("hintBox").classList.add("hidden");$("finishMessage").classList.add("hidden");$("lessonDialog").showModal();}
function openTv(topic="object"){activeTopic=topic;tvIndex=0;updateTv();$("tvDialog").showModal();}
function updateTv(){const t=topics[activeTopic]||topics.object;$("tvTitle").textContent=t.title;$("tvQuestion").textContent=t.questions[tvIndex];$("tvCount").textContent=`Câu hỏi ${tvIndex+1}/${t.questions.length}`;$("prevQuestion").disabled=tvIndex===0;$("nextQuestion").textContent=tvIndex===t.questions.length-1?"Quay lại câu đầu ↻":"Câu tiếp theo →";}
document.querySelectorAll("[data-open='practice']").forEach(b=>b.addEventListener("click",()=>openPractice()));
document.querySelectorAll("[data-open='tv']").forEach(b=>b.addEventListener("click",()=>openTv()));
document.querySelectorAll("[data-topic]").forEach(b=>b.addEventListener("click",()=>openPractice(b.dataset.topic)));
$("hintBtn").addEventListener("click",()=>{const t=topics[activeTopic]||topics.object;const thought=$("studentThought").value.trim();let question=t.questions[0];if(thought.length>0){question=`Em vừa nghĩ: “${thought.slice(0,160)}”. ${t.questions[1]}`;} $("hintBox").textContent=question;$("hintBox").classList.remove("hidden");});
$("finishBtn").addEventListener("click",()=>{$("finishMessage").textContent="🌟 Hoan hô! Em đã dành thời gian suy nghĩ và tự viết. Hãy cất bài viết để lần sau xem mình tiến bộ thế nào nhé.";$("finishMessage").classList.remove("hidden");});
$("prevQuestion").addEventListener("click",()=>{tvIndex=Math.max(0,tvIndex-1);updateTv()});
$("nextQuestion").addEventListener("click",()=>{const t=topics[activeTopic]||topics.object;tvIndex=(tvIndex+1)%t.questions.length;updateTv()});
$("closeTv").addEventListener("click",()=>$("tvDialog").close());
$("teacherBtn").addEventListener("click",()=>$("teacherDialog").showModal());
$("teacherStartTv").addEventListener("click",()=>{$("teacherDialog").close();openTv()});
$("menuToggle").addEventListener("click",()=>{$("sidebar").classList.toggle("open");document.querySelector(".toplinks").classList.toggle("open")});
document.querySelectorAll(".sidebar .nav").forEach(a=>a.addEventListener("click",()=>{$("sidebar").classList.remove("open");document.querySelectorAll(".sidebar .nav").forEach(n=>n.classList.remove("active"));a.classList.add("active")}));
document.addEventListener("keydown",e=>{if(e.key==="Escape"){$("sidebar").classList.remove("open");document.querySelector(".toplinks").classList.remove("open")}});
