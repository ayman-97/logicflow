// --- 1. قاعدة بيانات المنهج الدراسي ---
const topicsData = {
    // --- الفصل 1: الأساسيات ---
    "num_systems": {
        title: "أنظمة العد (Number Systems)",
        content: `
            <p>تستخدم الحواسيب النظام الثنائي (Binary) لأنه الأنسب للدوائر الإلكترونية (تشغيل/إيقاف).</p>
            <h3>الأنظمة الشائعة:</h3>
            <ul>
                <li><strong>الثنائي (Binary):</strong> الأساس 2 (0, 1).</li>
                <li><strong>العهشري (Decimal):</strong> الأساس 10 (0-9).</li>
                <li><strong>الثماني (Octal):</strong> الأساس 8 (0-7).</li>
                <li><strong>السداسي عشر (Hexadecimal):</strong> الأساس 16 (0-9, A-F).</li>
            </ul>
        `,
        hasSimulator: false 
    },
    "conversions": {
        title: "التحويل بين الأنظمة",
        content: `<p>كيفية التحويل من العشري إلى الثنائي وبالعكس، ومن الثنائي إلى السداسي عشر.</p>`,
        hasSimulator: false 
    },
    "binary_math": {
        title: "العمليات الحسابية على الأعداد الثنائية",
        content: `<p>شرح الجمع والطرح (1's Complement و 2's Complement) في النظام الثنائي.</p>`,
        hasSimulator: false 
    },

    // --- الفصل 2: الجبر البولياني ---
    "bool_basics": {
        title: "المتغيرات البوليانية (Boolean Variables)",
        content: `<p>الجبر البولياني هو الرياضات التي تحكم المنطق الرقمي. المتغيرات لها قيمتان فقط: صح (1) أو خطأ (0).</p>`,
        hasSimulator: true,
        defaultGate: "AND"
    },
    "bool_laws": {
        title: "قوانين الجبر البولياني ونظريات ديمورغان",
        content: `
            <h3>نظرية ديمورغان (De Morgan's Laws):</h3>
            <p>1. (A . B)' = A' + B' <br> 2. (A + B)' = A' . B'</p>
            <p>تساعد هذه القوانين في تبسيط المعادلات وتقليل عدد البوابات المستخدمة.</p>
        `,
        hasSimulator: true,
        defaultGate: "NAND" // ممتاز لاختبار ديمورغان
    },
    "truth_tables": {
        title: "الجداول المنطقية (Truth Tables)",
        content: `<p>جدول الحقيقة يوضح جميع الاحتمالات الممكنة للمداخل وما يقابلها من مخارج.</p>`,
        hasSimulator: false
    },
    "k_maps": {
        title: "خرائط كارنوف (K-Maps)",
        content: `
            
            <p>أداة رسومية لتبسيط معادلات الجبر البولي يدوياً بدلاً من استخدام القوانين الجبرية المعقدة. تعتمد على تجميع الوحدات (1s) المتجاورة.</p>
        `,
        hasSimulator: false // يحتاج تطوير محرك خاص
    },
    "canonical": {
        title: "الدوال القياسية (SOP & POS)",
        content: `<p>Sum of Products (SOP) و Product of Sums (POS) هي الطرق القياسية لكتابة المعادلات المنطقية.</p>`,
        hasSimulator: false
    },

    // --- الفصل 3: البوابات المنطقية ---
    "basic_gates": {
        title: "البوابات المنطقية الأساسية",
        content: `<p>بوابات AND, OR, NOT, XOR, XNOR هي حجر الأساس لأي دائرة.</p>`,
        hasSimulator: true,
        defaultGate: "XOR"
    },
    "universal_gates": {
        title: "البوابات العالمية (NAND & NOR)",
        content: `<p>يمكن استخدام NAND أو NOR لبناء أي بوابة أخرى.</p>`,
        hasSimulator: true,
        defaultGate: "NOR"
    },

    // --- الفصل 4: الدوائر التوافقية ---
    "adders": {
        title: "الجامع النصفي والكامل (Adders)",
        content: `
            <h3>Half Adder:</h3> يقوم بجمع بتين (A, B) وينتج المجموع (Sum) والفائض (Carry).
            <br><h3>Full Adder:</h3> يقوم بجمع 3 بتات (A, B, Carry_in).
        `,
        hasSimulator: false 
    },
    "comparators": {
        title: "المقارنات (Comparators)",
        content: `<p>دائرة تقارن بين رقمين ثنائيين وتحدد أيهما أكبر أو إذا كانا متساويين.</p>`,
        hasSimulator: false 
    },
    "mux_demux": {
        title: "المجمعات (Multiplexers)",
        content: `<p>الـ Multiplexer يعمل كمحول سكة قطار: يختار مدخلاً واحداً من عدة مداخل ليمرره إلى المخرج.</p>`,
        hasSimulator: false 
    },
    "encoders": {
        title: "الشيفرات ومفككاتها (Encoders & Decoders)",
        content: `<p>تحويل البيانات من صيغة إلى أخرى (مثل تحويل كود الزر المضغوط إلى رقم ثنائي).</p>`,
        hasSimulator: false 
    },

    // --- الفصل 5: الدوائر التتابعية ---
    "latches": {
        title: "الحالات والمنطق التتابعي",
        content: `<p>الدوائر التتابعية تعتمد على الزمن (Clock) والذاكرة، عكس الدوائر التوافقية التي تعتمد فقط على المدخلات الحالية.</p>`,
        hasSimulator: false
    },
    "flip_flops": {
        title: "القلابات (Flip-Flops)",
        content: `
            
            <p>وحدة الذاكرة الأساسية (Bit Storage). أنواعها: SR, JK, D, T.</p>
        `,
        hasSimulator: false // يحتاج محاكي مع نبضات ساعة
    }
};

// --- دوال التحميل والتشغيل (نفس المنطق السابق) ---
function loadTopic(topicId) {
    const mainContent = document.getElementById('main-content');
    const data = topicsData[topicId];
    
    // التعامل مع القائمة النشطة
    document.querySelectorAll('.menu-list li').forEach(li => li.classList.remove('active'));
    // (هنا نحتاج لطريقة لتحديد العنصر الذي تم الضغط عليه، سنستخدم event.target بحذر أو نمرر this)
    if(event && event.target) event.target.classList.add('active');

    if (!data) return;

    let html = `<h1>${data.title}</h1>`;
    html += `<div class="theory-section">${data.content}</div>`;

    if (data.hasSimulator) {
        html += getSimulatorHTML(); // دالة مساعدة لجلب كود HTML للمحاكي
    } else {
        html += `<div class="info-box">⚠️ المحاكي الخاص بهذا الدرس قيد التطوير (يحتاج أدوات خاصة مثل K-Map Grid أو Clock Signal).</div>`;
    }

    mainContent.innerHTML = html;

    if (data.hasSimulator) {
        document.getElementById('simGateSelector').value = data.defaultGate;
        updateSimulator();
    }
}

// دالة مساعدة لترتيب الكود
function getSimulatorHTML() {
    return `
        <div class="simulator-box">
            <h3>المختبر العملي (Logic Lab)</h3>
            <div class="gate-controls">
                <label>نوع البوابة: </label>
                <select id="simGateSelector" onchange="updateSimulator()">
                    <option value="AND">AND</option>
                    <option value="OR">OR</option>
                    <option value="NOT">NOT</option>
                    <option value="NAND">NAND</option>
                    <option value="NOR">NOR</option>
                    <option value="XOR">XOR</option>
                </select>
            </div>
            <div class="circuit-display">
                <div><input type="checkbox" id="simA" class="switch" onchange="updateSimulator()"> <br> A</div>
                <div id="inputB_container"><input type="checkbox" id="simB" class="switch" onchange="updateSimulator()"> <br> B</div>
                <div class="gate-shape"><span id="simGateName">GATE</span></div>
                <div><div id="simBulb" class="bulb"></div><span id="simResult">0</span></div>
            </div>
            <div style="background:#222; color:#0f0; padding:10px; font-family:monospace; direction:ltr;">
                Y = <span id="simEquation">?</span>
            </div>
        </div>
    `;
}

// دالة منطق المحاكي (نفس الدالة السابقة)
function updateSimulator() {
    const gateSelect = document.getElementById('simGateSelector');
    if (!gateSelect) return;

    const gate = gateSelect.value;
    const a = document.getElementById('simA').checked;
    const inputBContainer = document.getElementById('inputB_container');
    let b = false;

    if (gate === 'NOT') {
        inputBContainer.style.display = 'none';
    } else {
        inputBContainer.style.display = 'block';
        b = document.getElementById('simB').checked;
    }

    let result = false;
    let eq = "";

    switch (gate) {
        case 'AND': result = a && b; eq = "A . B"; break;
        case 'OR': result = a || b; eq = "A + B"; break;
        case 'NOT': result = !a; eq = "A'"; break;
        case 'NAND': result = !(a && b); eq = "(A . B)'"; break;
        case 'NOR': result = !(a || b); eq = "(A + B)'"; break;
        case 'XOR': result = (a !== b); eq = "A ⊕ B"; break;
    }

    const bulb = document.getElementById('simBulb');
    const resText = document.getElementById('simResult');
    const eqText = document.getElementById('simEquation');
    const gateName = document.getElementById('simGateName');

    if (result) bulb.classList.add('on'); else bulb.classList.remove('on');
    resText.innerText = result ? "1" : "0";
    eqText.innerText = eq;
    gateName.innerText = gate;
}

// تحميل افتراضي
window.onload = function() { loadTopic('num_systems'); };