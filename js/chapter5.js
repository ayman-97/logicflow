// js/chapter5.js

Object.assign(window.topicsData, {

    // =================================================================
    // الدرس 1: دوائر الجمع (Adders)
    // =================================================================
    "adders": {
        title: "1. الجامع النصفي والكامل (Adders)",
        content: `
            <h3>كيف يجمع الكمبيوتر 1 + 1؟</h3>
            <p>الجمع هو العملية الأساسية في المعالج. هناك نوعان من دوائر الجمع:</p>

            <table class="comparison-table" style="text-align:center;">
                <tr style="background:#2c3e50; color:white;">
                    <th>المقارنة</th>
                    <th>Half Adder (الجامع النصفي)</th>
                    <th>Full Adder (الجامع الكامل)</th>
                </tr>
                <tr>
                    <td><strong>المدخلات</strong></td>
                    <td>مدخلين (A, B)</td>
                    <td>3 مداخل (A, B, <span style="color:#e67e22">Carry In</span>)</td>
                </tr>
                <tr>
                    <td><strong>الوظيفة</strong></td>
                    <td>يجمع الخانة الأولى فقط (الآحاد).</td>
                    <td>يجمع الخانات التالية (لأنه يستقبل الحمل السابق).</td>
                </tr>
                <tr>
                    <td><strong>المخارج</strong></td>
                    <td colspan="2">
                        1. <strong>Sum (S)</strong>: ناتج الجمع.<br>
                        2. <strong>Carry (C)</strong>: المحمول (باليد).
                    </td>
                </tr>
            </table>

            <div class="solved-example">
                <strong>معادلات التصميم:</strong>
                <br>
                <strong>Half Adder:</strong>
                <br>Sum = <span class="math">A &oplus; B</span> (بوابة XOR)
                <br>Carry = <span class="math">A &middot; B</span> (بوابة AND)
                <br><br>
                <strong>Full Adder:</strong>
                <br>Sum = <span class="math">A &oplus; B &oplus; Cin</span>
                <br>Cout = <span class="math">AB + Cin(A &oplus; B)</span>
            </div>
             

[Image of Half Adder and Full Adder circuit diagrams]


            <hr>
            <h3>🧮 محاكي الجامع الكامل (Full Adder Sim)</h3>
            <p>جرب جمع 1 + 1 (وشاهد كيف يضيء Carry Out).</p>
        `,
        toolHTML: `
            <div class="simulator-box" style="direction:ltr;">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px;">
                    
                    <div style="display:flex; flex-direction:column; gap:10px;">
                        <button id="addA" class="circuit-btn off" onclick="toggleAdder('A')">A = 0</button>
                        <button id="addB" class="circuit-btn off" onclick="toggleAdder('B')">B = 0</button>
                        <button id="addCin" class="circuit-btn off" style="border-style:dashed;" onclick="toggleAdder('Cin')">Cin = 0</button>
                    </div>

                    <div style="position:relative; width:150px; height:150px; background:#34495e; border-radius:10px; display:flex; flex-direction:column; justify-content:center; align-items:center; box-shadow:0 5px 15px rgba(0,0,0,0.3);">
                        <div style="color:white; font-weight:bold; font-size:1.2em;">Full Adder</div>
                        <div style="color:#bdc3c7; font-size:0.8em; margin-top:5px;">&sum; (Sum)</div>
                        <div style="color:#bdc3c7; font-size:0.8em;">Cout (Carry)</div>
                    </div>

                    <div style="display:flex; flex-direction:column; gap:20px; align-items:center;">
                        <div style="text-align:center;">
                            <div id="outSum" class="bulb" style="width:40px; height:40px;"></div>
                            <span style="font-weight:bold; color:#2c3e50;">Sum</span>
                        </div>
                        <div style="text-align:center;">
                            <div id="outCout" class="bulb" style="width:40px; height:40px;"></div>
                            <span style="font-weight:bold; color:#c0392b;">C-Out</span>
                        </div>
                    </div>

                </div>
                <div style="text-align:center; margin-top:10px; font-weight:bold; font-size:1.2em; color:#27ae60;" id="adderText">Result: 0 + 0 + 0 = 0</div>
            </div>
        `
    },

    // =================================================================
    // الدرس 2: المفكك والمشفر (Decoders & Encoders)
    // =================================================================
    "decoders": {
        title: "2. المفكك والمشفر (Decoders)",
        content: `
            <h3>1. المفكك (Decoder)</h3>
            <p>هو "مترجم العناوين". تعطيه كود ثنائي (مثل 11)، فيقوم بتفعيل خط واحد فقط يقابل هذا الرقم (الخط رقم 3).</p>
            <ul>
                <li><strong>المدخلات:</strong> <span class="math">n</span> (مثلاً 2).</li>
                <li><strong>المخارج:</strong> <span class="math">2<sup>n</sup></span> (مثلاً 4).</li>
                <li><strong>الاستخدام:</strong> اختيار موقع في الذاكرة (RAM).</li>
            </ul>

            <h3>2. المشفر (Encoder)</h3>
            <p>عكس المفكك تماماً. تضغط على زر (مثل حرف 'A' في الكيبورد)، فيخرج الكود الثنائي لهذا الزر.</p>
             

            <hr>
            <h3>🔍 محاكي المفكك (2-to-4 Decoder)</h3>
            <p>أدخل كود ثنائي (A, B) ولاحظ أي مخرج سيضيء (D0-D3).</p>
        `,
        toolHTML: `
            <div class="simulator-box" style="direction:ltr;">
                <div style="display:flex; justify-content:center; gap:40px;">
                    
                    <div style="text-align:center;">
                        <h4>Inputs (Binary)</h4>
                        <div style="display:flex; gap:10px;">
                            <button id="decA" class="circuit-btn off" onclick="toggleDecoder('A')">A (MSB)</button>
                            <button id="decB" class="circuit-btn off" onclick="toggleDecoder('B')">B (LSB)</button>
                        </div>
                        <div id="decVal" style="margin-top:10px; font-weight:bold; font-size:1.5em; color:#2980b9;">00</div>
                    </div>

                    <div style="text-align:center;">
                        <h4>Outputs (Decimal)</h4>
                        <div style="display:flex; flex-direction:column; gap:5px;">
                            <div id="d0" class="dec-out on">D0 (0)</div>
                            <div id="d1" class="dec-out">D1 (1)</div>
                            <div id="d2" class="dec-out">D2 (2)</div>
                            <div id="d3" class="dec-out">D3 (3)</div>
                        </div>
                    </div>

                </div>
            </div>
            
            <style>
                /* تنسيق خاص للمفكك */
                .dec-out {
                    padding: 8px 30px;
                    background: #ecf0f1;
                    border: 2px solid #bdc3c7;
                    border-radius: 5px;
                    font-weight: bold;
                    color: #7f8c8d;
                    transition: 0.2s;
                }
                .dec-out.on {
                    background: #2ecc71;
                    color: white;
                    border-color: #27ae60;
                    box-shadow: 0 0 10px #2ecc71;
                    transform: scale(1.05);
                }
            </style>
        `
    },

    // =================================================================
    // الدرس 3: النواخب (Multiplexers)
    // =================================================================
    "multiplexers": {
        title: "3. النواخب (Multiplexers - MUX)",
        content: `
            <h3>ما هو الـ MUX؟</h3>
            <p>يسمى <strong>"مختار البيانات" (Data Selector)</strong>. تخيل أنه سكة قطار لها 4 مسارات قادمة، ومسار واحد للمغادرة. المتحكم (Select Lines) يقرر أي قطار سيمر.</p>

            <table class="comparison-table" style="text-align:center;">
                <tr style="background:#8e44ad; color:white;">
                    <th>المكون</th>
                    <th>الوصف</th>
                </tr>
                <tr>
                    <td><strong>المدخلات (Inputs)</strong></td>
                    <td>مصادر البيانات (<span class="math">2<sup>n</sup></span>). مثلاً 4 كاميرات مراقبة.</td>
                </tr>
                <tr>
                    <td><strong>المتحكم (Selectors)</strong></td>
                    <td>مفاتيح الاختيار (<span class="math">n</span>). تحدد أي مدخل سيمر.</td>
                </tr>
                <tr>
                    <td><strong>المخرج (Output)</strong></td>
                    <td>خط واحد فقط (Y).</td>
                </tr>
            </table>

            <div class="solved-example">
                <strong>المعادلة لـ 4x1 MUX:</strong>
                <br>
                <span class="math">Y = <span class="bar">S1</span><span class="bar">S0</span>(I0) + <span class="bar">S1</span>S0(I1) + S1<span class="bar">S0</span>(I2) + S1S0(I3)</span>
                <br>
                <small>ببساطة: إذا كان العنوان 00 مرر I0، وإذا كان 01 مرر I1...</small>
            </div>
             

[Image of 4 to 1 multiplexer logic diagram]


            <hr>
            <h3>🔀 محاكي الناخب (4-to-1 MUX)</h3>
            <p>تحكم بمفاتيح الاختيار (S1, S0) لتقرر أي "مدخل" سيمر إلى "المخرج".</p>
        `,
        toolHTML: `
            <div class="simulator-box" style="direction:ltr;">
                <div style="display:flex; justify-content:center; align-items:center; gap:20px;">
                    
                    <div style="display:flex; flex-direction:column; gap:10px;">
                        <button id="muxI0" class="circuit-btn on" style="width:80px;" onclick="toggleMuxData('I0')">I0: 1</button>
                        <button id="muxI1" class="circuit-btn off" style="width:80px;" onclick="toggleMuxData('I1')">I1: 0</button>
                        <button id="muxI2" class="circuit-btn on" style="width:80px;" onclick="toggleMuxData('I2')">I2: 1</button>
                        <button id="muxI3" class="circuit-btn off" style="width:80px;" onclick="toggleMuxData('I3')">I3: 0</button>
                    </div>

                    <div style="position:relative;">
                        <svg width="120" height="200" viewBox="0 0 120 200">
                            <path d="M20,10 L100,40 L100,160 L20,190 Z" fill="#34495e" stroke="#2c3e50" stroke-width="3" />
                            <line id="muxLine" x1="20" y1="30" x2="100" y2="100" stroke="#f1c40f" stroke-width="4" />
                            <text x="45" y="110" fill="white" font-weight="bold">MUX</text>
                        </svg>
                        
                        <div style="position:absolute; bottom:-40px; left:10px; display:flex; gap:5px;">
                            <button id="selS1" class="circuit-btn off" style="width:50px; padding:5px; font-size:12px;" onclick="toggleMuxSel('S1')">S1:0</button>
                            <button id="selS0" class="circuit-btn off" style="width:50px; padding:5px; font-size:12px;" onclick="toggleMuxSel('S0')">S0:0</button>
                        </div>
                    </div>

                    <div style="text-align:center;">
                        <div id="muxOut" class="bulb" style="width:50px; height:50px;"></div>
                        <div style="font-weight:bold; margin-top:5px;">Output Y</div>
                    </div>

                </div>
                <div id="muxStatus" style="text-align:center; margin-top:50px; color:#8e44ad; font-weight:bold;">Selected: I0</div>
            </div>
        `
    }
});


// =================================================================
// منطق الدوائر التوافقية (Logic Engine)
// =================================================================

// 1. منطق الجامع (Adder)
window.adderState = { A: 0, B: 0, Cin: 0 };
window.toggleAdder = function(key) {
    window.adderState[key] = window.adderState[key] ? 0 : 1;
    // تحديث الأزرار
    let btn = document.getElementById('add' + key);
    btn.className = `circuit-btn ${window.adderState[key] ? 'on' : 'off'}`;
    btn.innerText = `${key} = ${window.adderState[key]}`;
    
    // الحساب
    let sum = window.adderState.A ^ window.adderState.B ^ window.adderState.Cin;
    // قانون Carry: AB + Cin(A^B)
    let cout = (window.adderState.A & window.adderState.B) | (window.adderState.Cin & (window.adderState.A ^ window.adderState.B));

    // تحديث اللمبات
    document.getElementById('outSum').className = `bulb ${sum ? 'on' : 'off'}`;
    document.getElementById('outCout').className = `bulb ${cout ? 'on' : 'off'}`;
    
    document.getElementById('adderText').innerText = 
        `Result: ${window.adderState.A} + ${window.adderState.B} + ${window.adderState.Cin} = ${cout}${sum} (binary)`;
}

// 2. منطق المفكك (Decoder)
window.decState = { A: 0, B: 0 };
window.toggleDecoder = function(key) {
    window.decState[key] = window.decState[key] ? 0 : 1;
    
    // تحديث الأزرار
    let btn = document.getElementById('dec' + key);
    btn.className = `circuit-btn ${window.decState[key] ? 'on' : 'off'}`;
    btn.innerText = `${key} ${key==='A'?'(MSB)':'(LSB)'}`;
    
    // حساب القيمة العشرية
    let val = (window.decState.A * 2) + window.decState.B;
    
    // تحديث العرض النصي
    document.getElementById('decVal').innerText = `${window.decState.A}${window.decState.B}`;
    
    // تصفير الجميع ثم تفعيل المختار
    for(let i=0; i<4; i++) {
        document.getElementById('d' + i).className = 'dec-out';
    }
    document.getElementById('d' + val).className = 'dec-out on';
}

// 3. منطق الناخب (Multiplexer)
window.muxData = { I0: 1, I1: 0, I2: 1, I3: 0 }; // قيم افتراضية
window.muxSel = { S1: 0, S0: 0 };

window.toggleMuxData = function(id) {
    window.muxData[id] = window.muxData[id] ? 0 : 1;
    let btn = document.getElementById('mux' + id);
    btn.className = `circuit-btn ${window.muxData[id] ? 'on' : 'off'}`;
    btn.innerText = `${id}: ${window.muxData[id]}`;
    updateMux();
}

window.toggleMuxSel = function(id) {
    window.muxSel[id] = window.muxSel[id] ? 0 : 1;
    let btn = document.getElementById('sel' + id);
    btn.className = `circuit-btn ${window.muxSel[id] ? 'on' : 'off'}`;
    btn.innerText = `${id}:${window.muxSel[id]}`;
    updateMux();
}

window.updateMux = function() {
    // تحديد القناة المختارة
    let selected = (window.muxSel.S1 * 2) + window.muxSel.S0; // 0, 1, 2, or 3
    let selectedId = 'I' + selected;
    
    // القيمة المختارة
    let outputVal = window.muxData[selectedId];
    
    // تحديث المخرج
    document.getElementById('muxOut').className = `bulb ${outputVal ? 'on' : 'off'}`;
    document.getElementById('muxStatus').innerText = `Selected Channel: ${selectedId} (Passing Value: ${outputVal})`;

    // تحديث الرسم (تحريك الخط الأصفر)
    // الإحداثيات التقريبية لمداخل البيانات في شبه المنحرف
    const yPositions = [35, 80, 125, 170]; 
    let line = document.getElementById('muxLine');
    line.setAttribute('y1', yPositions[selected]);
    
    // تغيير لون الخط حسب البيانات المارة
    line.setAttribute('stroke', outputVal ? '#2ecc71' : '#c0392b');
}