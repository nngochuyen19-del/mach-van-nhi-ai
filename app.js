const $=id=>document.getElementById(id);
const topicNames={object:"Tả một đồ vật quen thuộc",animal:"Tả con vật em yêu thích",place:"Tả một cảnh đẹp",person:"Kể về một người em quý mến"};
const gradeNotes={
1:"🌱 Lớp 1 · Quan sát, nói thành câu ngắn, gọi tên màu sắc và viết từ hoặc câu đơn giản.",
2:"🌿 Lớp 2 · Viết 2–4 câu theo câu hỏi gợi ý, chú ý đặc điểm và công dụng.",
3:"🌼 Lớp 3 · Chọn chi tiết tiêu biểu, sắp xếp ý và viết thành đoạn văn mạch lạc.",
4:"🌳 Lớp 4 · Mở rộng vốn từ, dùng hình ảnh so sánh phù hợp và liên kết các ý.",
5:"🌟 Lớp 5 · Phát triển góc nhìn riêng, chọn chi tiết có sức gợi và tự chỉnh sửa bài viết."
};
const hintBank={
object:[
["👀 Quan sát hình dáng","Đồ vật có hình gì? Kích thước ra sao? Em nhìn thấy những bộ phận nào?"],
["🎨 Tìm chi tiết nổi bật","Ngoài màu sắc, có họa tiết, nút bấm, khóa kéo hoặc chi tiết nào làm đồ vật dễ nhận ra?"],
["✋ Khám phá bằng giác quan","Bề mặt nhẵn hay sần? Đồ vật cứng, mềm, nhẹ hay nặng? Chỉ chọn điều em biết thật."],
["💗 Gắn với trải nghiệm","Em thường dùng đồ vật khi nào? Ai tặng hoặc mua cho em? Vì sao em muốn giữ gìn nó?"],
["🧭 Sắp xếp ý","Em có thể giới thiệu đồ vật → tả hình dáng → chọn 2–3 chi tiết → nêu công dụng hoặc tình cảm."]
],
animal:[
["👀 Dáng vẻ","Con vật to hay nhỏ? Bộ lông, màu sắc, đôi mắt hoặc tai có đặc điểm gì?"],
["🐾 Cử động","Nó đi, chạy, nhảy, ăn hoặc phát ra tiếng kêu như thế nào?"],
["🔎 Thói quen riêng","Có hành động nào khiến em dễ nhận ra con vật này? Hãy kể điều em từng quan sát."],
["💗 Tình cảm","Em chăm sóc hoặc chơi với nó ra sao? Em yêu quý nó vì điều gì?"],
["🧭 Sắp xếp ý","Giới thiệu con vật → tả ngoại hình → kể hoạt động → nêu tình cảm."]
],
place:[
["👀 Nhìn toàn cảnh","Nơi đó rộng hay hẹp? Em nhìn thấy gì đầu tiên khi đến nơi?"],
["🌈 Màu sắc và âm thanh","Bầu trời, cây cối, mặt nước hoặc con đường có màu gì? Em nghe thấy âm thanh nào?"],
["🍃 Chi tiết đáng nhớ","Có làn gió, mùi hương hoặc hoạt động nào làm em nhớ nhất?"],
["💗 Cảm xúc","Em cảm thấy thế nào khi ở đó? Điều gì khiến nơi ấy có ý nghĩa với em?"],
["🧭 Sắp xếp ý","Giới thiệu nơi chốn → tả các chi tiết → nêu cảm xúc."]
],
person:[
["👤 Giới thiệu","Em muốn kể về ai? Người đó làm công việc gì hoặc có quan hệ thế nào với em?"],
["🧩 Một việc cụ thể","Em nhớ hành động hoặc sự việc nào người ấy đã làm? Hãy kể điều em thực sự biết."],
["⭐ Phẩm chất","Việc làm đó cho em thấy người ấy chăm chỉ, tốt bụng hay có trách nhiệm như thế nào?"],
["💗 Điều em học được","Em trân trọng hoặc học hỏi điều gì từ người ấy?"],
["🧭 Sắp xếp ý","Giới thiệu người → kể một việc cụ thể → nêu cảm nghĩ hoặc điều em học được."]
]};
const gradeHelp={
1:"Em có thể nói một từ hoặc một câu ngắn. Hãy chọn màu sắc, hình dáng hay tên gọi trước nhé.",
2:"Em thử nói 2–3 đặc điểm. Mỗi câu chỉ cần diễn đạt một ý rõ ràng.",
3:"Em chọn chi tiết tiêu biểu, rồi sắp xếp theo trình tự để người đọc dễ hình dung.",
4:"Em thử tìm từ ngữ chính xác, có thể dùng phép so sánh nếu thật sự phù hợp.",
5:"Em hãy chọn góc nhìn riêng và một chi tiết gợi cảm xúc, sau đó tự đọc lại để chỉnh sửa."
};
let currentGrade=3,currentTopic="object",tvIndex=0,mediaRecorder=null,recordedChunks=[],recordedUrl=null,photoData=null;
const tvQuestions={
object:["Em đang nghĩ đến đồ vật nào?","Đồ vật có hình dáng và màu sắc ra sao?","Chi tiết nào làm đồ vật trở nên đặc biệt?","Đồ vật giúp em làm việc gì?","Em muốn người đọc nhớ điều gì về đồ vật?"],
animal:["Em muốn tả con vật nào?","Con vật có dáng vẻ ra sao?","Nó thường làm những hoạt động gì?","Điều gì khiến em yêu quý nó?","Em muốn kết thúc bài bằng cảm nghĩ nào?"],
place:["Em muốn tả nơi nào?","Em nhìn thấy gì đầu tiên?","Em nghe thấy hoặc cảm nhận được điều gì?","Chi tiết nào đẹp hoặc đáng nhớ nhất?","Em có cảm xúc gì về nơi ấy?"],
person:["Em muốn kể về ai?","Người ấy thường làm gì?","Em nhớ nhất việc làm cụ thể nào?","Việc làm ấy cho em thấy điều gì?","Em học được điều gì từ người ấy?"]
};
function renderHints(){
 const box=$("hintsOutput");box.innerHTML="";
 const intro=document.createElement("p");intro.className="hints-intro";
 intro.textContent=`Mầm Nhí gợi mở cho ${$("workGrade").value==="1"?"bạn nhỏ lớp 1":`bạn lớp ${$("workGrade").value}`}: ${gradeHelp[$("workGrade").value]} Hãy chọn ý phù hợp, không cần dùng hết nhé!`;box.appendChild(intro);
 const grid=document.createElement("div");grid.className="hint-grid";
 (hintBank[currentTopic]||hintBank.object).forEach(([title,body])=>{
  const card=document.createElement("article");card.className="hint-card";
  const h=document.createElement("h4");h.textContent=title;
  const p=document.createElement("p");p.textContent=body;
  const b=document.createElement("button");b.textContent="Chọn gợi ý này";
  b.addEventListener("click",()=>{grid.querySelectorAll(".hint-card").forEach(c=>c.classList.remove("picked"));card.classList.add("picked");b.textContent="Đã chọn ✓";const r=$("reflectionInput");const item=title.replace(/^[^ ]+\s/,"");if(!r.value.includes(item))r.value+=(r.value?"\n":"")+`Em muốn phát triển ý: ${item}.`;});
  card.append(h,p,b);grid.appendChild(card);
 });box.appendChild(grid);box.classList.remove("hidden");
}
function setGrade(grade){
 currentGrade=Number(grade);$("workGrade").value=String(grade);$("gradeNote").textContent=gradeNotes[grade];
 document.querySelectorAll(".grade-tab").forEach(b=>b.classList.toggle("active",Number(b.dataset.grade)===Number(grade)));
}
document.querySelectorAll(".grade-tab").forEach(b=>b.addEventListener("click",()=>setGrade(b.dataset.grade)));
$("workGrade").addEventListener("change",e=>setGrade(e.target.value));
$("workTopic").addEventListener("change",e=>{currentTopic=e.target.value;});
document.querySelectorAll("[data-topic]").forEach(b=>b.addEventListener("click",()=>{currentTopic=b.dataset.topic;$("workTopic").value=currentTopic;document.querySelector("#work").scrollIntoView({behavior:"smooth"});renderHints();}));
$("getHints").addEventListener("click",()=>{currentTopic=$("workTopic").value;setGrade($("workGrade").value);renderHints();});
function openTv(){currentTopic=$("workTopic").value;tvIndex=0;updateTv();$("tvDialog").showModal();}
function updateTv(){const qs=tvQuestions[currentTopic]||tvQuestions.object;$("tvGradeLabel").textContent="LỚP "+currentGrade;$("tvStep").textContent=`CÂU HỎI ${tvIndex+1}/${qs.length}`;$("tvQuestion").textContent=qs[tvIndex];$("tvSupport").textContent=gradeHelp[currentGrade];$("tvPrev").disabled=tvIndex===0;$("tvNext").textContent=tvIndex===qs.length-1?"Quay lại câu đầu ↻":"Câu tiếp theo →";}
$("openTv").addEventListener("click",openTv);$("closeTv").addEventListener("click",()=>$("tvDialog").close());$("tvPrev").addEventListener("click",()=>{tvIndex=Math.max(0,tvIndex-1);updateTv()});$("tvNext").addEventListener("click",()=>{const qs=tvQuestions[currentTopic]||tvQuestions.object;tvIndex=(tvIndex+1)%qs.length;updateTv()});
$("teacherBtn").addEventListener("click",()=>$("teacherDialog").showModal());$("closeTeacher").addEventListener("click",()=>$("teacherDialog").close());$("teacherOpenTv").addEventListener("click",()=>{$("teacherDialog").close();openTv()});
$("menuToggle").addEventListener("click",()=>{$("sidebar").classList.toggle("open");document.querySelector(".top-links").classList.toggle("open")});
document.querySelectorAll(".sidebar .nav").forEach(a=>a.addEventListener("click",()=>{$("sidebar").classList.remove("open");document.querySelectorAll(".sidebar .nav").forEach(n=>n.classList.remove("active"));a.classList.add("active")}));
$("startRecording").addEventListener("click",async()=>{
 if(mediaRecorder&&mediaRecorder.state==="recording"){mediaRecorder.stop();$("startRecording").textContent="🎙️ Ghi âm lại";return;}
 if(!navigator.mediaDevices||!navigator.mediaDevices.getUserMedia){$("recordingStatus").textContent="Trình duyệt hoặc kết nối hiện tại chưa hỗ trợ ghi âm. Hãy mở bằng HTTPS hoặc trình duyệt mới.";return;}
 try{
  const stream=await navigator.mediaDevices.getUserMedia({audio:true});recordedChunks=[];
  mediaRecorder=new MediaRecorder(stream);
  mediaRecorder.ondataavailable=e=>{if(e.data.size)recordedChunks.push(e.data)};
  mediaRecorder.onstop=()=>{const blob=new Blob(recordedChunks,{type:mediaRecorder.mimeType||"audio/webm"});if(recordedUrl)URL.revokeObjectURL(recordedUrl);recordedUrl=URL.createObjectURL(blob);$("audioPreview").src=recordedUrl;$("audioPreview").classList.remove("hidden");$("recordingStatus").textContent="✅ Đã ghi âm. Em có thể nghe lại trước khi lưu.";stream.getTracks().forEach(t=>t.stop());$("startRecording").textContent="🎙️ Ghi âm lại";};
  mediaRecorder.start();$("recordingStatus").textContent="🔴 Đang ghi âm… Nhấn nút một lần nữa để dừng."; $("startRecording").textContent="⏹️ Dừng ghi âm";
 }catch(err){$("recordingStatus").textContent="Không thể truy cập micro. Cô/em hãy cho phép trình duyệt sử dụng micro rồi thử lại.";}
});
$("photoInput").addEventListener("change",e=>{
 const file=e.target.files&&e.target.files[0];if(!file)return;
 if(!file.type.startsWith("image/")){$("recordingStatus").textContent="Vui lòng chọn tệp hình ảnh.";return;}
 if(file.size>5*1024*1024){$("recordingStatus").textContent="Ảnh lớn hơn 5 MB. Hãy chọn ảnh nhỏ hơn để lưu ổn định.";e.target.value="";return;}
 const reader=new FileReader();reader.onload=()=>{photoData=reader.result;$("workPhoto").src=photoData;$("photoPreview").classList.remove("hidden");$("readPhotoText").disabled=false;$("ocrStatus").textContent="Ảnh đã sẵn sàng. Bấm nút để thử nhận diện chữ."};reader.readAsDataURL(file);
});
$("removePhoto").addEventListener("click",()=>{photoData=null;$("photoInput").value="";$("workPhoto").removeAttribute("src");$("photoPreview").classList.add("hidden");$("readPhotoText").disabled=true;$("ocrText").value="";$("ocrStatus").textContent="Chọn ảnh bài viết trước, rồi bấm “Đọc chữ trong ảnh”. "});
function getRecords(){try{return JSON.parse(localStorage.getItem("machVanNhiRecords")||"[]")}catch(e){return []}}
function renderPortfolio(){
 const list=$("portfolioList"),records=getRecords();list.innerHTML="";
 if(!records.length){list.innerHTML='<div class="empty-state"><span>📒</span><b>Chưa có bài làm nào</b><p>Khi em lưu bài làm đầu tiên, bài sẽ xuất hiện ở đây.</p></div>';return}
 records.slice().reverse().forEach(r=>{
  const item=document.createElement("article");item.className="portfolio-item";
  const h=document.createElement("h3");h.textContent=r.topic;
  const meta=document.createElement("div");meta.className="portfolio-meta";meta.textContent=`Lớp ${r.grade} · ${new Date(r.date).toLocaleString("vi-VN")}`;
  const idea=document.createElement("p");idea.textContent=r.idea||"Chưa nhập ý tưởng.";
  item.append(h,meta,idea);
  if(r.reflection){const refl=document.createElement("p");refl.textContent="Tự nhận xét: "+r.reflection;item.appendChild(refl)}
  if(r.photo){const img=document.createElement("img");img.src=r.photo;img.alt="Ảnh bài làm đã lưu";item.appendChild(img)}
  if(r.audio){const a=document.createElement("audio");a.controls=true;a.src=r.audio;item.appendChild(a)}
  list.appendChild(item);
 });
}
$("saveWork").addEventListener("click",()=>{
 const idea=$("ideaInput").value.trim(),reflection=$("reflectionInput").value.trim();
 if(!idea&&!reflection&&!photoData&&!recordedChunks.length){$("recordingStatus").textContent="Hãy nhập ý tưởng, ghi âm hoặc chọn ảnh trước khi lưu nhé.";return}
 let audioData=null;
 if(recordedChunks.length){const blob=new Blob(recordedChunks,{type:mediaRecorder?.mimeType||"audio/webm"});const reader=new FileReader();reader.onload=()=>saveRecord(reader.result);reader.readAsDataURL(blob);return;}
 saveRecord(audioData);
 function saveRecord(audio){
  const records=getRecords();records.push({grade:Number($("workGrade").value),topic:topicNames[$("workTopic").value],topicKey:$("workTopic").value,idea,reflection,photo:photoData,audio,date:new Date().toISOString()});
  try{localStorage.setItem("machVanNhiRecords",JSON.stringify(records));$("recordingStatus").textContent="🌟 Đã lưu trên trình duyệt của thiết bị này.";renderPortfolio();}catch(e){$("recordingStatus").textContent="Không đủ bộ nhớ trình duyệt để lưu. Hãy thử xóa ảnh hoặc tải dữ liệu xuống."; }
 }
});
$("clearWork").addEventListener("click",()=>{$("ideaInput").value="";$("reflectionInput").value="";$("hintsOutput").classList.add("hidden");$("photoInput").value="";photoData=null;$("photoPreview").classList.add("hidden");$("readPhotoText").disabled=true;$("ocrText").value="";$("ocrStatus").textContent="Chọn ảnh bài viết trước, rồi bấm “Đọc chữ trong ảnh”.";$("audioPreview").classList.add("hidden");$("audioPreview").removeAttribute("src");recordedChunks=[];if(recordedUrl){URL.revokeObjectURL(recordedUrl);recordedUrl=null}$("recordingStatus").textContent="🎧 Chưa có bản ghi âm.";});
$("exportData").addEventListener("click",()=>{const data=JSON.stringify(getRecords(),null,2);const blob=new Blob([data],{type:"application/json"});const url=URL.createObjectURL(blob);const a=document.createElement("a");a.href=url;a.download="mach-van-nhi-bai-lam.json";a.click();URL.revokeObjectURL(url)});

// OCR miễn phí chạy trong trình duyệt bằng Tesseract.js. Kết quả chữ viết tay có thể sai.
$("readPhotoText").addEventListener("click", async ()=>{
 if(!photoData){$("ocrStatus").textContent="Cô/bạn hãy chọn ảnh trước nhé.";return}
 if(!window.Tesseract){$("ocrStatus").textContent="Chưa tải được công cụ nhận diện. Kiểm tra Internet rồi tải lại trang.";return}
 const btn=$("readPhotoText");btn.disabled=true;btn.textContent="Đang đọc ảnh…";
 $("ocrStatus").textContent="Đang tải dữ liệu tiếng Việt lần đầu. Có thể mất một lúc; giữ trang này mở nhé.";
 try{
  const result=await Tesseract.recognize(photoData,"vie",{
   logger:m=>{if(m.status==="recognizing text")$("ocrStatus").textContent=`Đang nhận diện chữ: ${Math.round((m.progress||0)*100)}%`;}
  });
  const recognized=(result.data.text||"").trim();
  $("ocrText").value=recognized;
  $("ocrStatus").textContent=recognized
   ?"Đã nhận diện xong. Hãy so sánh từng chữ với ảnh gốc và sửa lỗi trước khi sử dụng."
   :"Chưa đọc được chữ rõ ràng. Hãy chụp lại nơi đủ sáng, giữ máy thẳng và để nét chữ lớn hơn.";
 }catch(err){
  $("ocrStatus").textContent="Không đọc được ảnh lúc này. Hãy kiểm tra Internet, chụp ảnh rõ hơn hoặc nhập lại bằng tay.";
 }finally{btn.disabled=false;btn.textContent="Đọc chữ trong ảnh miễn phí";}
});
$("useOcrText").addEventListener("click",()=>{
 const text=$("ocrText").value.trim();
 if(!text){$("ocrStatus").textContent="Chưa có chữ để đưa vào ý tưởng. Hãy chạy nhận diện hoặc nhập chữ vào ô trên.";return}
 $("ideaInput").value=text;
 $("ideaInput").focus();
 $("ocrStatus").textContent="Đã đưa chữ vào ô ý tưởng. Em hãy tự kiểm tra và chỉnh sửa câu của mình.";
});

renderPortfolio();setGrade(3);
