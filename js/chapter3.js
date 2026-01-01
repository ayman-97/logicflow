// js/chapter3.js

Object.assign(window.topicsData, {

    // =================================================================
    // الدرس 1: البوابات الأساسية (Basic Logic Gates)
    // =================================================================
    "basic_gates": {
        title: "1. البوابات المنطقية الأساسية",
        content: `
            <h3>مقدمة: حجر البناء (Building Blocks)</h3>
            <p>
                البوابات المنطقية هي "الترانزستورات" التي تتخذ القرارات داخل المعالج.
                <br>تذكر القاعدة: <strong>(1 = جهد عالي/High)</strong> و <strong>(0 = جهد منخفض/Low)</strong>.
            </p>

            <table class="comparison-table" style="text-align:center;">
                <tr style="background:#2c3e50; color:white;">
                    <th>البوابة</th>
                    <th>الرمز والوصف</th>
                    <th>جدول الحقيقة</th>
                </tr>
                <tr>
                    <td><strong style="color:#2980b9; font-size:1.2em;">AND</strong> (و)</td>
                    <td style="text-align:right; padding:10px;">
                        <strong>الوظيفة:</strong> الضرب المنطقي (<span class="math">A &middot; B</span>).<br>
                        <strong>السلوك:</strong> صارمة جداً! لا تخرج (1) إلا إذا كانت <strong>كل</strong> المداخل (1).<br>
                        <strong>التشبيه:</strong> قفلان على خزنة، يجب فتح الاثنين معاً.
                    </td>
                    <td>
                        <table style="margin:auto; font-size:12px; border:1px solid #ccc; width:80px;">
                            <tr><td>A</td><td>B</td><td>Y</td></tr>
                            <tr><td>0</td><td>0</td><td>0</td></tr>
                            <tr><td>0</td><td>1</td><td>0</td></tr>
                            <tr><td>1</td><td>0</td><td>0</td></tr>
                            <tr style="background:#d5f5e3;"><td>1</td><td>1</td><td>1</td></tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td><strong style="color:#e67e22; font-size:1.2em;">OR</strong> (أو)</td>
                    <td style="text-align:right; padding:10px;">
                        <strong>الوظيفة:</strong> الجمع المنطقي (<span class="math">A + B</span>).<br>
                        <strong>السلوك:</strong> متساهلة. تخرج (1) إذا كان <strong>أي</strong> مدخل (1).<br>
                        <strong>التشبيه:</strong> جرس باب بزرين، أي زر يرن الجرس.
                    </td>
                    <td>
                        <table style="margin:auto; font-size:12px; border:1px solid #ccc; width:80px;">
                            <tr><td>A</td><td>B</td><td>Y</td></tr>
                            <tr><td>0</td><td>0</td><td>0</td></tr>
                            <tr style="background:#d5f5e3;"><td>0</td><td>1</td><td>1</td></tr>
                            <tr style="background:#d5f5e3;"><td>1</td><td>0</td><td>1</td></tr>
                            <tr style="background:#d5f5e3;"><td>1</td><td>1</td><td>1</td></tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td><strong style="color:#c0392b; font-size:1.2em;">NOT</strong> (العاكس)</td>
                    <td style="text-align:right; padding:10px;">
                        <strong>الوظيفة:</strong> العكس/النفي (<span class="math"><span class="bar">A</span></span>).<br>
                        <strong>السلوك:</strong> المتمرد! يقلب الحقائق. يدخل 1 يخرج 0.<br>
                        <strong>الرمز:</strong> مثلث برأسه دائرة صغيرة (Bubble).
                    </td>
                    <td>
                        <table style="margin:auto; font-size:12px; border:1px solid #ccc; width:80px;">
                            <tr><td>A</td><td>Y</td></tr>
                            <tr><td>0</td><td>1</td></tr>
                            <tr><td>1</td><td>0</td></tr>
                        </table>
                    </td>
                </tr>
            </table>

            <hr>
            <h3>🔌 المختبر التفاعلي (Basic Simulator):</h3>
            <p>اختر البوابة، وغير المداخل (A, B) بالضغط عليها لرؤية النتيجة.</p>
        `,
        toolHTML: `
            <div style="text-align:center; margin-bottom:10px;">
                <label>اختر البوابة: </label>
                <select id="gateSelector" onchange="drawCircuit()" style="padding:8px; font-size:16px; border-radius:5px;">
                    <option value="AND">AND (الضرب)</option>
                    <option value="OR">OR (الجمع)</option>
                    <option value="NOT">NOT (العاكس)</option>
                </select>
            </div>

            <div class="circuit-board">
                <div class="input-group">
                    <button id="btnA" class="circuit-btn off" onclick="togglePin('A')">A=0</button>
                    <button id="btnB" class="circuit-btn off" onclick="togglePin('B')">B=0</button>
                </div>

                <svg id="gateSvg" class="gate-svg" viewBox="0 0 200 120">
                    </svg>

                <div class="output-group">
                    <div id="outBulb" class="bulb"></div>
                    <div style="text-align:center; color:#fff; margin-top:5px; font-weight:bold;">OUT</div>
                </div>
            </div>
        `
    },

    // =================================================================
    // الدرس 2: البوابات الشاملة والخاصة (Universal & Special Gates)
    // =================================================================
    "universal_gates": {
        title: "2. البوابات الشاملة والخاصة",
        content: `
            <h3>أولاً: البوابات الشاملة (Universal Gates)</h3>
            <p>سميت "شاملة" لأننا نستطيع صناعة <strong>أي دائرة منطقية</strong> في العالم باستخدام نوع واحد منها فقط (NAND فقط أو NOR فقط)، مما يوفر التكلفة في التصنيع.</p>

            <div class="step-row">
                <div style="flex:1;">
                    <h4 style="color:#c0392b; border-bottom:2px solid #c0392b; display:inline-block;">1. بوابة NAND</h4>
                    <p>هي اختصار لـ (<strong>N</strong>ot <strong>AND</strong>).</p>
                    <p><strong>المعادلة:</strong> <span class="math">F = <span class="bar">A &middot; B</span></span></p>
                    <p><strong>السلوك:</strong> عكس الـ AND تماماً. تطفئ (0) فقط إذا كان الكل مشتعلاً.</p>
                </div>
                <div style="flex:1; border-right:3px solid #eee; padding-right:20px;">
                    <h4 style="color:#2980b9; border-bottom:2px solid #2980b9; display:inline-block;">2. بوابة NOR</h4>
                    <p>هي اختصار لـ (<strong>N</strong>ot <strong>OR</strong>).</p>
                    <p><strong>المعادلة:</strong> <span class="math">F = <span class="bar">A + B</span></span></p>
                    <p><strong>السلوك:</strong> عكس الـ OR تماماً. تضيء (1) فقط إذا كان الكل مطفأً.</p>
                </div>
            </div>
             

[Image of NAND and NOR logic gate symbols]


            <h3 style="margin-top:40px; border-top:1px dashed #ccc; padding-top:20px;">ثانياً: البوابات الخاصة (Exclusive Gates)</h3>
            <p>تستخدم بشكل أساسي في العمليات الحسابية (مثل الجمع والطرح) ومقارنة البيانات.</p>

            <table class="comparison-table" style="text-align:center;">
                <tr style="background:#8e44ad; color:white;">
                    <th>البوابة</th><th>المعادلة</th><th>الوظيفة "بالعامية"</th>
                </tr>
                <tr>
                    <td><strong>XOR</strong></td>
                    <td><span class="math">F = A &oplus; B</span></td>
                    <td>"يا أنا يا أنت". تخرج (1) إذا كانت المداخل <strong>مختلفة</strong>.</td>
                </tr>
                <tr>
                    <td><strong>XNOR</strong></td>
                    <td><span class="math">F = <span class="bar">A &oplus; B</span></span></td>
                    <td>"التطابق". تخرج (1) إذا كانت المداخل <strong>متشابهة</strong>.</td>
                </tr>
            </table>
             

            <hr>
            <h3>🔮 المختبر المتقدم (Advanced Sim):</h3>
        `,
        toolHTML: `
            <div style="text-align:center; margin-bottom:10px;">
                <label>اختر البوابة: </label>
                <select id="univSelector" onchange="drawUnivCircuit()" style="padding:8px; font-size:16px; border-radius:5px;">
                    <option value="NAND">NAND</option>
                    <option value="NOR">NOR</option>
                    <option value="XOR">XOR</option>
                    <option value="XNOR">XNOR</option>
                </select>
            </div>

            <div class="circuit-board">
                <div class="input-group">
                    <button id="uBtnA" class="circuit-btn off" onclick="toggleUnivPin('A')">A=0</button>
                    <button id="uBtnB" class="circuit-btn off" onclick="toggleUnivPin('B')">B=0</button>
                </div>

                <svg id="univSvg" class="gate-svg" viewBox="0 0 200 120">
                    </svg>

                <div class="output-group">
                    <div id="univBulb" class="bulb"></div>
                    <div style="text-align:center; color:#fff; margin-top:5px; font-weight:bold;">OUT</div>
                </div>
            </div>
        `
    }
});

// =================================================================
// محرك الرسم والمحاكاة (Graphics & Logic Engine)
// =================================================================

// --- متغيرات الحالة العامة ---
window.circuitState = { A: 0, B: 0 };
window.univState = { A: 0, B: 0 };

// 1. دوال المختبر الأساسي
window.togglePin = function(pin) {
    window.circuitState[pin] = window.circuitState[pin] === 0 ? 1 : 0;
    const btn = document.getElementById('btn' + pin);
    btn.className = `circuit-btn ${window.circuitState[pin] ? 'on' : 'off'}`;
    btn.innerText = `${pin}=${window.circuitState[pin]}`;
    drawCircuit();
};

window.drawCircuit = function() {
    const type = document.getElementById('gateSelector').value;
    const svg = document.getElementById('gateSvg');
    const bulb = document.getElementById('outBulb');
    const { A, B } = window.circuitState;
    
    // إخفاء B في حالة NOT
    const btnB = document.getElementById('btnB');
    if (type === 'NOT') btnB.style.visibility = 'hidden';
    else btnB.style.visibility = 'visible';

    // المنطق
    let out = 0;
    if (type === 'AND') out = A && B;
    if (type === 'OR') out = A || B;
    if (type === 'NOT') out = !A;

    // المصباح
    bulb.className = `bulb ${out ? 'on' : 'off'}`;

    // الألوان
    const colorA = A ? "on" : "off";
    const colorB = B ? "on" : "off";
    const colorOut = out ? "on" : "off";

    let path = "", wires = "";

    if (type === 'AND') {
        path = `<path d="M50,10 L100,10 A50,50 0 0,1 100,110 L50,110 Z" class="gate-body" />`;
        wires = `
            <line x1="0" y1="30" x2="50" y2="30" class="wire ${colorA}" />
            <line x1="0" y1="90" x2="50" y2="90" class="wire ${colorB}" />
            <line x1="150" y1="60" x2="200" y2="60" class="wire ${colorOut}" />`;
    } else if (type === 'OR') {
        path = `<path d="M50,10 Q100,10 150,60 Q100,110 50,110 Q80,60 50,10 Z" class="gate-body" />`;
        wires = `
            <line x1="0" y1="30" x2="60" y2="30" class="wire ${colorA}" />
            <line x1="0" y1="90" x2="60" y2="90" class="wire ${colorB}" />
            <line x1="150" y1="60" x2="200" y2="60" class="wire ${colorOut}" />`;
    } else if (type === 'NOT') {
        path = `<path d="M60,20 L130,60 L60,100 Z" class="gate-body" /><circle cx="136" cy="60" r="6" class="gate-body" fill="white" />`;
        wires = `
            <line x1="0" y1="60" x2="60" y2="60" class="wire ${colorA}" />
            <line x1="142" y1="60" x2="200" y2="60" class="wire ${colorOut}" />`;
    }

    svg.innerHTML = wires + path;
};

// 2. دوال المختبر المتقدم
window.toggleUnivPin = function(pin) {
    window.univState[pin] = window.univState[pin] === 0 ? 1 : 0;
    const btn = document.getElementById('uBtn' + pin);
    btn.className = `circuit-btn ${window.univState[pin] ? 'on' : 'off'}`;
    btn.innerText = `${pin}=${window.univState[pin]}`;
    drawUnivCircuit();
};

window.drawUnivCircuit = function() {
    const type = document.getElementById('univSelector').value;
    const svg = document.getElementById('univSvg');
    const bulb = document.getElementById('univBulb');
    const { A, B } = window.univState;

    let out = 0;
    if (type === 'NAND') out = !(A && B);
    if (type === 'NOR') out = !(A || B);
    if (type === 'XOR') out = (A ^ B);
    if (type === 'XNOR') out = !(A ^ B);

    bulb.className = `bulb ${out ? 'on' : 'off'}`;
    const colorA = A ? "on" : "off";
    const colorB = B ? "on" : "off";
    const colorOut = out ? "on" : "off";

    let path = "", wires = "";

    if (type === 'NAND') {
        path = `<path d="M50,10 L100,10 A50,50 0 0,1 100,110 L50,110 Z" class="gate-body" /><circle cx="156" cy="60" r="6" class="gate-body" fill="white" />`;
        wires = `<line x1="0" y1="30" x2="50" y2="30" class="wire ${colorA}" /><line x1="0" y1="90" x2="50" y2="90" class="wire ${colorB}" /><line x1="162" y1="60" x2="200" y2="60" class="wire ${colorOut}" />`;
    } else if (type === 'NOR') {
        path = `<path d="M50,10 Q100,10 150,60 Q100,110 50,110 Q80,60 50,10 Z" class="gate-body" /><circle cx="156" cy="60" r="6" class="gate-body" fill="white" />`;
        wires = `<line x1="0" y1="30" x2="60" y2="30" class="wire ${colorA}" /><line x1="0" y1="90" x2="60" y2="90" class="wire ${colorB}" /><line x1="162" y1="60" x2="200" y2="60" class="wire ${colorOut}" />`;
    } else if (type === 'XOR') {
        path = `<path d="M60,10 Q110,10 160,60 Q110,110 60,110 Q90,60 60,10 Z" class="gate-body" /><path d="M40,10 Q70,60 40,110" fill="none" stroke="#bdc3c7" stroke-width="3" />`;
        wires = `<line x1="0" y1="30" x2="50" y2="30" class="wire ${colorA}" /><line x1="0" y1="90" x2="50" y2="90" class="wire ${colorB}" /><line x1="160" y1="60" x2="200" y2="60" class="wire ${colorOut}" />`;
    } else if (type === 'XNOR') {
        path = `<path d="M60,10 Q110,10 160,60 Q110,110 60,110 Q90,60 60,10 Z" class="gate-body" /><path d="M40,10 Q70,60 40,110" fill="none" stroke="#bdc3c7" stroke-width="3" /><circle cx="166" cy="60" r="6" class="gate-body" fill="white" />`;
        wires = `<line x1="0" y1="30" x2="50" y2="30" class="wire ${colorA}" /><line x1="0" y1="90" x2="50" y2="90" class="wire ${colorB}" /><line x1="172" y1="60" x2="200" y2="60" class="wire ${colorOut}" />`;
    }

    svg.innerHTML = wires + path;
};