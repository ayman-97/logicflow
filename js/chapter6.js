// js/chapter6.js

Object.assign(window.topicsData, {

    // =================================================================
    // الدرس 1: القلابات (Flip-Flops) - ذاكرة البت الواحد
    // =================================================================
    "flip_flops": {
        title: "1. القلابات (Flip-Flops) ونبضة الساعة",
        content: `
            <h3>ما الفرق بين الدوائر التوافقية والتتابعية؟</h3>
            <ul>
                <li><strong>التوافقية (Combinational):</strong> الناتج يعتمد على المدخلات الحالية فقط (مثل الجمع). ليس لها ذاكرة.</li>
                <li><strong>التتابعية (Sequential):</strong> الناتج يعتمد على المدخلات الحالية <strong>+ الحالة السابقة</strong>. لها ذاكرة!</li>
            </ul>

            <h3>نبضة الساعة (The Clock ⏰)</h3>
            <p>هي "قلب" النظام. إشارة تتذبذب بين 0 و 1 بانتظام. التغيير يحدث فقط عند <strong>الحافة الصاعدة (Rising Edge)</strong> (لحظة الانتقال من 0 إلى 1).</p>

            <h3>أهم القلابات:</h3>
            <div style="display:flex; gap:10px; flex-wrap:wrap;">
                <div style="flex:1; border:1px solid #ccc; padding:10px; border-radius:5px;">
                    <strong style="color:#e67e22;">SR Latch</strong>
                    <br>أبسط نوع ذاكرة.
                    <br>S (Set): اجعل الناتج 1.
                    <br>R (Reset): اجعل الناتج 0.
                </div>
                <div style="flex:1; border:1px solid #ccc; padding:10px; border-radius:5px;">
                    <strong style="color:#2980b9;">D Flip-Flop</strong>
                    <br>العمود الفقري للكمبيوتر.
                    <br>يأخذ القيمة من D، ولكنه <strong>لا يمررها</strong> للمخرج Q إلا عند وصول نبضة الساعة.
                </div>
            </div>
             

            <hr>
            <h3>💾 محاكي D Flip-Flop</h3>
            <p>غير قيمة المدخل (Data)، ولاحظ أن المخرج (Q) لن يتغير إلا عندما تضغط زر <strong>نبضة الساعة (Clock Pulse)</strong>.</p>
        `,
        toolHTML: `
            <div class="simulator-box" style="direction:ltr;">
                <div style="display:flex; justify-content:center; align-items:center; gap:30px;">
                    
                    <div style="display:flex; flex-direction:column; gap:20px; align-items:center;">
                        <button id="ffData" class="circuit-btn off" onclick="toggleFFData()">Data (D): 0</button>
                        
                        <button id="ffClock" class="circuit-btn" style="background:#34495e; border-color:#2c3e50; color:white;" onclick="triggerClock()">
                            ⚡ Clock Pulse 
                        </button>
                    </div>

                    <div style="position:relative; width:120px; height:150px; background:#ecf0f1; border:3px solid #7f8c8d; display:flex; flex-direction:column; justify-content:space-between; padding:10px;">
                        <strong style="text-align:center; color:#2c3e50;">D Flip-Flop</strong>
                        <div style="font-size:0.8em; font-weight:bold;">D &rarr;</div>
                        <div style="font-size:0.8em; font-weight:bold;">&larr; Q</div>
                        
                        <div style="position:absolute; bottom:20px; left:0; width:0; height:0; border-top:10px solid transparent; border-bottom:10px solid transparent; border-left:15px solid #7f8c8d;"></div>
                    </div>

                    <div style="text-align:center;">
                        <div id="ffQ" class="bulb off" style="width:60px; height:60px; font-size:1.5em; display:flex; align-items:center; justify-content:center;">0</div>
                        <div style="font-weight:bold; margin-top:5px;">Output (Q)</div>
                        <div style="font-size:0.8em; color:#777;">(Saved Bit)</div>
                    </div>

                </div>
                <div id="ffStatus" style="text-align:center; margin-top:20px; font-weight:bold; color:#e74c3c;">Waiting for Clock...</div>
            </div>
        `
    },

    // =================================================================
    // الدرس 2: المسجلات (Registers)
    // =================================================================
    "registers": {
        title: "2. المسجلات (Registers)",
        content: `
            <h3>كيف نخزن كلمة كاملة (Word)؟</h3>
            <p>القلاب الواحد يخزن بت واحد (0 أو 1). لتخزين 4-بت، نضع 4 قلابات بجانب بعضها ونربطها بنفس الساعة.</p>
            <p>هذا الترتيب يسمى <strong>"المسجل" (Register)</strong>، وهو الوحدة الأساسية لذاكرة المعالج ومسجلات الإزاحة (Shift Registers).</p>
             

[Image of 4 bit shift register logic diagram]


            <div class="solved-example">
                <strong>أنواع المسجلات:</strong>
                <ul>
                    <li><strong>Parallel In / Parallel Out:</strong> تخزين البيانات دفعة واحدة (مثل RAM).</li>
                    <li><strong>Serial In / Serial Out:</strong> إدخال البيانات بالتسلسل (مثل USB).</li>
                </ul>
            </div>
        `,
        toolHTML: "" 
    },

    // =================================================================
    // الدرس 3: العدادات (Counters)
    // =================================================================
    "counters": {
        title: "3. العدادات (Binary Counters)",
        content: `
            <h3>كيف يعد الكمبيوتر؟</h3>
            <p>العداد هو سلسلة من القلابات، حيث يقوم خرج القلاب الأول بتفعيل القلاب الثاني، وهكذا.</p>
            <p>مع كل نبضة ساعة، تتغير الحالة لتعطي الرقم التالي في النظام الثنائي (000, 001, 010...).</p>

            <table class="comparison-table" style="text-align:center;">
                <tr style="background:#2c3e50; color:white;">
                    <th>النبضة (Clock)</th>
                    <th>Q2 Q1 Q0 (Binary)</th>
                    <th>Decimal</th>
                </tr>
                <tr><td>0</td><td>0 0 0</td><td>0</td></tr>
                <tr><td>1</td><td>0 0 1</td><td>1</td></tr>
                <tr><td>2</td><td>0 1 0</td><td>2</td></tr>
                <tr><td>3</td><td>0 1 1</td><td>3</td></tr>
            </table>
             

            <hr>
            <h3>🔢 محاكي العداد (3-Bit Counter)</h3>
            <p>اضغط على "Clock" لزيادة العداد. لاحظ كيف تتغير البتات.</p>
        `,
        toolHTML: `
            <div class="simulator-box" style="direction:ltr;">
                <div style="display:flex; flex-direction:column; align-items:center; gap:20px;">
                    
                    <div style="background:#222; color:#e74c3c; font-family:'Courier New', monospace; font-size:3em; padding:10px 40px; border:4px solid #555; border-radius:10px; box-shadow:inset 0 0 20px black;">
                        <span id="countDec">0</span>
                    </div>

                    <div style="display:flex; gap:20px;">
                        <div style="text-align:center;">
                            <div id="q2" class="bulb off"></div>
                            <div style="font-size:0.8em; margin-top:5px;">Q2 (4)</div>
                        </div>
                        <div style="text-align:center;">
                            <div id="q1" class="bulb off"></div>
                            <div style="font-size:0.8em; margin-top:5px;">Q1 (2)</div>
                        </div>
                        <div style="text-align:center;">
                            <div id="q0" class="bulb off"></div>
                            <div style="font-size:0.8em; margin-top:5px;">Q0 (1)</div>
                        </div>
                    </div>

                    <button class="circuit-btn" style="background:#2980b9; width:200px; margin-top:20px;" onclick="incrementCounter()">
                        Pulse Clock (+1)
                    </button>
                    
                    <button class="circuit-btn off" style="background:#c0392b; width:100px;" onclick="resetCounter()">
                        Reset
                    </button>

                </div>
            </div>
        `
    }
});


// =================================================================
// منطق الدوائر التتابعية (Sequential Logic Engine)
// =================================================================

// 1. Flip-Flop Logic
window.ffState = { D: 0, Q: 0 };

window.toggleFFData = function() {
    window.ffState.D = window.ffState.D ? 0 : 1;
    let btn = document.getElementById('ffData');
    btn.className = `circuit-btn ${window.ffState.D ? 'on' : 'off'}`;
    btn.innerText = `Data (D): ${window.ffState.D}`;
    
    document.getElementById('ffStatus').innerText = "Data Ready. Waiting for Clock...";
    document.getElementById('ffStatus').style.color = "#e67e22";
}

window.triggerClock = function() {
    // عند الحافة الصاعدة، تنتقل البيانات من D إلى Q
    window.ffState.Q = window.ffState.D;
    
    // تحديث المخرج
    let qDiv = document.getElementById('ffQ');
    qDiv.className = `bulb ${window.ffState.Q ? 'on' : 'off'}`;
    qDiv.innerText = window.ffState.Q;

    // تأثير بصري للزر
    let clkBtn = document.getElementById('ffClock');
    clkBtn.style.background = "#2ecc71";
    setTimeout(() => { clkBtn.style.background = "#34495e"; }, 200);

    document.getElementById('ffStatus').innerText = "Clock Triggered! Data Saved.";
    document.getElementById('ffStatus').style.color = "#27ae60";
}


// 2. Counter Logic
window.counterVal = 0;

window.incrementCounter = function() {
    window.counterVal++;
    if(window.counterVal > 7) window.counterVal = 0; // 3-bit counter resets after 7
    updateCounterDisplay();
}

window.resetCounter = function() {
    window.counterVal = 0;
    updateCounterDisplay();
}

window.updateCounterDisplay = function() {
    // تحديث الرقم العشري
    document.getElementById('countDec').innerText = window.counterVal;

    // تحديث اللمبات (Binary)
    // Q0 = Bit 0, Q1 = Bit 1, Q2 = Bit 2
    let q0 = window.counterVal & 1;
    let q1 = (window.counterVal >> 1) & 1;
    let q2 = (window.counterVal >> 2) & 1;

    document.getElementById('q0').className = `bulb ${q0 ? 'on' : 'off'}`;
    document.getElementById('q1').className = `bulb ${q1 ? 'on' : 'off'}`;
    document.getElementById('q2').className = `bulb ${q2 ? 'on' : 'off'}`;
}