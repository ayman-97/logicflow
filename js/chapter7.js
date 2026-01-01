// js/chapter7.js

Object.assign(window.topicsData, {

    // =================================================================
    // الدرس 1: مقدمة في الذاكرة (RAM & ROM)
    // =================================================================
    "memory_basics": {
        title: "1. أنواع الذاكرة (RAM vs ROM)",
        content: `
            <h3>أين يخزن الكمبيوتر برامجه؟</h3>
            <p>الذاكرة هي مصفوفة ضخمة من "الخزائن" (Cells)، كل خزانة لها عنوان فريد (Address) وتحتوي على بيانات (Data).</p>

            <table class="comparison-table" style="text-align:center;">
                <tr style="background:#2c3e50; color:white;">
                    <th>المقارنة</th>
                    <th>RAM (ذاكرة الوصول العشوائي)</th>
                    <th>ROM (ذاكرة القراءة فقط)</th>
                </tr>
                <tr>
                    <td><strong>الاسم الكامل</strong></td>
                    <td>Random Access Memory</td>
                    <td>Read-Only Memory</td>
                </tr>
                <tr>
                    <td><strong>القابلية للكتابة</strong></td>
                    <td><span style="color:#27ae60;">قراءة وكتابة (R/W)</span></td>
                    <td><span style="color:#c0392b;">قراءة فقط (غالباً)</span></td>
                </tr>
                <tr>
                    <td><strong>التطاير</strong></td>
                    <td><strong>Volatile:</strong> تفقد البيانات عند انقطاع الكهرباء.</td>
                    <td><strong>Non-Volatile:</strong> تحتفظ بالبيانات دائماً.</td>
                </tr>
                <tr>
                    <td><strong>الاستخدام</strong></td>
                    <td>تخزين البرامج المفتوحة حالياً (المتغيرات).</td>
                    <td>تخزين نظام التشغيل الأساسي (BIOS/Boot).</td>
                </tr>
            </table>
             

            <div class="note-box">
                <strong>معلومة هامة:</strong> كلمة "Access Random" تعني أننا نستطيع الوصول للعنوان رقم 1000 بنفس سرعة الوصول للعنوان رقم 0 (لا نحتاج للمرور بالكل).
            </div>
        `,
        toolHTML: "" 
    },

    // =================================================================
    // الدرس 2: تشغيل الذاكرة (RAM Operations)
    // =================================================================
    "ram_operation": {
        title: "2. كيف تعمل الذاكرة؟ (Write & Read)",
        content: `
            <h3>هيكلية الذاكرة</h3>
            <p>تتكون الذاكرة من ثلاثة خطوط رئيسية:</p>
            <ol>
                <li><strong>خطوط العنوان (Address Bus):</strong> لتحديد "رقم الخزانة" التي نريد التعامل معها.</li>
                <li><strong>خطوط البيانات (Data Bus):</strong> لنقل المعلومات من وإلى الخزانة.</li>
                <li><strong>خطوط التحكم (Control):</strong>
                    <ul>
                        <li><strong>Write Enable (WE):</strong> إذا كان (1) نكتب، وإذا كان (0) نقرأ.</li>
                        <li><strong>Chip Select (CS):</strong> لتشغيل شريحة الذاكرة.</li>
                    </ul>
                </li>
            </ol>

            <hr>
            <h3>💾 مختبر الذاكرة (Mini RAM)</h3>
            <p>هذه ذاكرة صغيرة حجمها (8x4). أي 8 أماكن، كل مكان يخزن 4-بت.</p>
            <ol>
                <li>اختر العنوان (Address).</li>
                <li>حدد البيانات (Data In).</li>
                <li>اضغط <strong>Write</strong> للحفظ.</li>
                <li>غير العنوان ثم عد للأول لتتأكد أن البيانات محفوظة!</li>
            </ol>
        `,
        toolHTML: `
            <div class="simulator-box" style="direction:ltr;">
                <div style="display:flex; justify-content:center; gap:30px; flex-wrap:wrap;">
                    
                    <div style="flex:1; min-width:250px; background:#ecf0f1; padding:15px; border-radius:10px; border:2px solid #bdc3c7;">
                        <h4 style="margin-top:0; color:#2c3e50;">Control Panel</h4>
                        
                        <div style="margin-bottom:15px;">
                            <label style="font-weight:bold;">Address (0-7):</label>
                            <div style="display:flex; gap:5px; margin-top:5px;">
                                <button id="addr0" class="circuit-btn off" style="flex:1;" onclick="setAddress(0)">0</button>
                                <button id="addr1" class="circuit-btn off" style="flex:1;" onclick="setAddress(1)">1</button>
                                <button id="addr2" class="circuit-btn off" style="flex:1;" onclick="setAddress(2)">2</button>
                                <button id="addr3" class="circuit-btn off" style="flex:1;" onclick="setAddress(3)">3</button>
                            </div>
                            <div style="display:flex; gap:5px; margin-top:5px;">
                                <button id="addr4" class="circuit-btn off" style="flex:1;" onclick="setAddress(4)">4</button>
                                <button id="addr5" class="circuit-btn off" style="flex:1;" onclick="setAddress(5)">5</button>
                                <button id="addr6" class="circuit-btn off" style="flex:1;" onclick="setAddress(6)">6</button>
                                <button id="addr7" class="circuit-btn off" style="flex:1;" onclick="setAddress(7)">7</button>
                            </div>
                        </div>

                        <div style="margin-bottom:15px;">
                            <label style="font-weight:bold;">Data Input (4-bit):</label>
                            <div style="display:flex; gap:5px; margin-top:5px;">
                                <button id="din3" class="circuit-btn off" onclick="toggleDataBit(3)">0</button>
                                <button id="din2" class="circuit-btn off" onclick="toggleDataBit(2)">0</button>
                                <button id="din1" class="circuit-btn off" onclick="toggleDataBit(1)">0</button>
                                <button id="din0" class="circuit-btn off" onclick="toggleDataBit(0)">0</button>
                            </div>
                        </div>

                        <button class="circuit-btn" style="background:#e74c3c; width:100%;" onclick="writeToRam()">
                            ✍️ WRITE to Memory
                        </button>
                        <div id="ramStatus" style="margin-top:10px; color:#27ae60; font-weight:bold; min-height:20px;"></div>
                    </div>

                    <div style="flex:1; min-width:200px;">
                        <h4 style="margin-top:0; color:#2c3e50;">Memory State (8x4)</h4>
                        <table class="kmap-table" style="width:100%;">
                            <tr><th>Addr</th><th>Stored Data</th></tr>
                            <tr id="row0"><td>000 (0)</td><td id="cell0">0000</td></tr>
                            <tr id="row1"><td>001 (1)</td><td id="cell1">0000</td></tr>
                            <tr id="row2"><td>010 (2)</td><td id="cell2">0000</td></tr>
                            <tr id="row3"><td>011 (3)</td><td id="cell3">0000</td></tr>
                            <tr id="row4"><td>100 (4)</td><td id="cell4">0000</td></tr>
                            <tr id="row5"><td>101 (5)</td><td id="cell5">0000</td></tr>
                            <tr id="row6"><td>110 (6)</td><td id="cell6">0000</td></tr>
                            <tr id="row7"><td>111 (7)</td><td id="cell7">0000</td></tr>
                        </table>
                    </div>

                </div>
            </div>
        `
    }
});


// =================================================================
// منطق محاكي الذاكرة (RAM Logic)
// =================================================================

// مصفوفة الذاكرة (8 أماكن، كل مكان يخزن نصاً يمثل 4 بت)
window.ramData = ["0000", "0000", "0000", "0000", "0000", "0000", "0000", "0000"];
window.currentAddr = 0;
window.inputData = [0, 0, 0, 0]; // 4 bits

window.setAddress = function(addr) {
    window.currentAddr = addr;
    
    // تحديث أزرار العناوين
    for(let i=0; i<8; i++) {
        let btn = document.getElementById('addr' + i);
        if(i === addr) btn.className = 'circuit-btn on'; // الزر المختار
        else btn.className = 'circuit-btn off';
        
        // تظليل الصف في الجدول
        let row = document.getElementById('row' + i);
        if(i === addr) row.style.backgroundColor = "#f1c40f";
        else row.style.backgroundColor = "white";
    }
    
    document.getElementById('ramStatus').innerText = `Selected Address: ${addr}`;
    
    // (اختياري) قراءة البيانات تلقائياً عند تغيير العنوان
    // يمكننا عرض البيانات المخزنة في لوحة التحكم، لكن في هذا التصميم سنتركها للمستخدم ليكتب
}

window.toggleDataBit = function(bitIndex) {
    window.inputData[bitIndex] = window.inputData[bitIndex] ? 0 : 1;
    
    let btn = document.getElementById('din' + bitIndex);
    btn.className = `circuit-btn ${window.inputData[bitIndex] ? 'on' : 'off'}`;
    btn.innerText = window.inputData[bitIndex];
}

window.writeToRam = function() {
    // تحويل المصفوفة إلى نص (مثلاً "1011")
    // نعكس الترتيب لأن bit3 هو اليسار
    let dataStr = `${window.inputData[3]}${window.inputData[2]}${window.inputData[1]}${window.inputData[0]}`;
    
    // الحفظ في الذاكرة
    window.ramData[window.currentAddr] = dataStr;
    
    // تحديث الجدول
    let cell = document.getElementById('cell' + window.currentAddr);
    cell.innerText = dataStr;
    cell.style.color = "#c0392b"; // ومضة حمراء
    setTimeout(() => { cell.style.color = "black"; }, 500);
    
    document.getElementById('ramStatus').innerText = `Data ${dataStr} Written to Addr ${window.currentAddr}`;
}

// تهيئة أولية عند التحميل
setTimeout(() => {
    if(window.setAddress) window.setAddress(0);
}, 500);