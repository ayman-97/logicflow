// js/chapter4.js

Object.assign(window.topicsData, {

    // =================================================================
    // الدرس 1: الصيغ القياسية (SOP & POS) - محدث بأمثلة مقارنة
    // =================================================================
    "canonical_forms": {
        title: "1. الصيغ القياسية (SOP vs POS)",
        content: `
            <h3>مقارنة شاملة: وجهان لعملة واحدة</h3>
            <p>أي دالة منطقية يمكن كتابتها بطريقتين. النتيجة واحدة، ولكن الشكل يختلف.</p>

            <table class="comparison-table" style="text-align:center;">
                <tr style="background:#2c3e50; color:white;">
                    <th>المقارنة</th>
                    <th>SOP (مجموع المضارب)</th>
                    <th>POS (مضروب المجاميع)</th>
                </tr>
                <tr>
                    <td><strong>نبحث عن</strong></td>
                    <td>الواحدات (1)</td>
                    <td>الأصفار (0)</td>
                </tr>
                <tr>
                    <td><strong>التمثيل</strong></td>
                    <td><span class="math">A</span>=1, <span class="math"><span class="bar">A</span></span>=0</td>
                    <td><span class="math">A</span>=0, <span class="math"><span class="bar">A</span></span>=1 <span style="color:#c0392b">(عكس!)</span></td>
                </tr>
                <tr>
                    <td><strong>الرابط</strong></td>
                    <td>حدود مضروبة يجمعها (+)</td>
                    <td>أقواس مجموعة يربطها (&middot;)</td>
                </tr>
            </table>

            <div class="solved-example">
                <strong>مثال 1: إثبات التكافؤ (بوابة XOR)</strong>
                <br>جدول الحقيقة لبوابة XOR هو: (0, 1, 1, 0).
                
                <div style="display:flex; gap:10px; margin-top:10px;">
                    <div style="flex:1; border:1px solid #2980b9; padding:5px;">
                        <strong style="color:#2980b9">طريقة SOP</strong>
                        <br>نأخذ الواحدات (عند 01 و 10).
                        <br>1. <span class="math"><span class="bar">A</span>B</span>
                        <br>2. <span class="math">A<span class="bar">B</span></span>
                        <br><strong>F = <span class="math"><span class="bar">A</span>B + A<span class="bar">B</span></span></strong>
                    </div>
                    <div style="flex:1; border:1px solid #c0392b; padding:5px;">
                        <strong style="color:#c0392b">طريقة POS</strong>
                        <br>نأخذ الأصفار (عند 00 و 11).
                        <br>1. (00) &#8594; <span class="math">(A + B)</span>
                        <br>2. (11) &#8594; <span class="math">(<span class="bar">A</span> + <span class="bar">B</span>)</span>
                        <br><strong>F = <span class="math">(A+B)(<span class="bar">A</span>+<span class="bar">B</span>)</span></strong>
                    </div>
                </div>

                <div style="background:#f9f9f9; padding:5px; margin-top:5px; font-size:14px;">
                    <strong>هل هما متساويان؟</strong> لنفك أقواس POS رياضياً:
                    <br><span class="math">(A+B)(<span class="bar">A</span>+<span class="bar">B</span>) = A<span class="bar">A</span> + A<span class="bar">B</span> + B<span class="bar">A</span> + B<span class="bar">B</span></span>
                    <br>بما أن <span class="math">A<span class="bar">A</span>=0</span> و <span class="math">B<span class="bar">B</span>=0</span>
                    <br>النتيجة: <span class="math">A<span class="bar">B</span> + <span class="bar">A</span>B</span> (وهي نفسها SOP! ✅)
                </div>
            </div>

            <div class="solved-example">
                <strong>مثال 2: أيهما أختار؟ (الكفاءة)</strong>
                <p>لدينا دالة تخرج (1) في 7 حالات، وتخرج (0) في حالة واحدة فقط.</p>
                <ul>
                    <li><strong>باستخدام SOP:</strong> سنكتب معادلة طويلة جداً (7 حدود). 😫</li>
                    <li><strong>باستخدام POS:</strong> سنكتب معادلة من قوس واحد فقط (حد واحد). 🤩</li>
                </ul>
                <div class="note-box"><strong>القاعدة:</strong> عد الواحدات والأصفار في الجدول. اختر الأقل عدداً لتوفير الوقت والجهد!</div>
            </div>
        `,
        toolHTML: "" 
    },

    // =================================================================
    // الدرس 2: خرائط كارنوف (كما هو)
    // =================================================================
    "kmap_basics": {
        title: "2. الحل اليدوي (2, 3, 4 Variables)",
        content: `
            <h3 style="border-bottom:2px solid #3498db; display:inline-block;">أولاً: خريطة متغيرين (2 Variables)</h3>
            <p><strong>المثال:</strong> لدينا واحدات في الخلايا (0, 1, 2) وصفر في (3).</p>
            
            <div style="display:flex; justify-content:center; gap:20px; flex-wrap:wrap;">
                <table class="kmap-table" style="font-size:14px; width:auto;">
                    <tr><th>A\\B</th><th>0</th><th>1</th></tr>
                    <tr><th>0</th><td class="ones">1</td><td class="ones">1</td></tr>
                    <tr><th>1</th><td class="ones">1</td><td class="zeros">0</td></tr>
                </table>
            </div>

            <div class="solved-example">
                <strong>1. الحل بصيغة SOP (تجميع الواحدات):</strong>
                <br>لدينا مجموعتان:
                <ul>
                    <li><strong>الصف العلوي (0,1):</strong> A ثابتة عند 0 (<span class="math"><span class="bar">A</span></span>)، B تغيرت (تحذف). &#8594; الحد: <span class="math"><span class="bar">A</span></span></li>
                    <li><strong>العمود الأيسر (0,2):</strong> B ثابتة عند 0 (<span class="math"><span class="bar">B</span></span>)، A تغيرت (تحذف). &#8594; الحد: <span class="math"><span class="bar">B</span></span></li>
                </ul>
                <div style="text-align:center; color:#27ae60; font-weight:bold;">F(SOP) = <span class="math"><span class="bar">A</span> + <span class="bar">B</span></span></div>
            </div>

            <div class="solved-example" style="border-right-color:#c0392b; background:#f9ebea;">
                <strong>2. الحل بصيغة POS (تجميع الأصفار):</strong>
                <br>لدينا صفر وحيد عند (1,1).
                <ul>
                    <li>A ثابتة عند 1 (في POS الواحد يعني منفي) &#8594; <span class="math"><span class="bar">A</span></span></li>
                    <li>B ثابتة عند 1 (في POS الواحد يعني منفي) &#8594; <span class="math"><span class="bar">B</span></span></li>
                </ul>
                <div style="text-align:center; color:#c0392b; font-weight:bold;">F(POS) = <span class="math">(<span class="bar">A</span> + <span class="bar">B</span>)</span></div>
            </div>

            <hr>

            <h3 style="border-bottom:2px solid #3498db; display:inline-block; margin-top:30px;">ثانياً: خريطة 3 متغيرات (خاصية الالتفاف)</h3>
            <p><strong>المثال:</strong> الواحدات في الأطراف (0, 2, 4, 6).</p>
            <div style="display:flex; justify-content:center;">
                <table class="kmap-table" style="font-size:12px; width:auto;">
                    <tr><th>A\\BC</th><th>00</th><th>01</th><th>11</th><th>10</th></tr>
                    <tr><th>0</th><td class="ones" style="border:2px solid red;">1</td><td>0</td><td>0</td><td class="ones" style="border:2px solid red;">1</td></tr>
                    <tr><th>1</th><td class="ones" style="border:2px solid red;">1</td><td>0</td><td>0</td><td class="ones" style="border:2px solid red;">1</td></tr>
                </table>
            </div>

            <div class="solved-example">
                <strong>التحليل (SOP):</strong>
                <div class="step-row"><span class="step-num">1</span> <span class="math-text">الصفوف (A)</span> <span class="note-text">غطينا الصف 0 والصف 1 &#8594; A تغيرت &#8594; <strong>تحذف</strong>.</span></div>
                <div class="step-row"><span class="step-num">2</span> <span class="math-text">الأعمدة (BC)</span> <span class="note-text">غطينا العمود (00) والعمود (10).<br>B: كانت 0 وأصبحت 1 (تغيرت &#8594; تحذف).<br>C: كانت 0 وبقيت 0 (ثابتة &#8594; <span class="math"><span class="bar">C</span></span>).</span></div>
                <div style="text-align:center; color:#27ae60; font-weight:bold; margin-top:10px;">النتيجة النهائية: F = <span class="math"><span class="bar">C</span></span></div>
            </div>

            <hr>

            <h3 style="border-bottom:2px solid #3498db; display:inline-block; margin-top:30px;">ثالثاً: خريطة 4 متغيرات (تجميع المربع)</h3>
            <p><strong>المثال:</strong> مربع في الوسط (5, 7, 13, 15).</p>
            <div style="display:flex; justify-content:center;">
                <table class="kmap-table" style="font-size:12px; width:auto;">
                    <tr><th>AB\\CD</th><th>00</th><th>01</th><th>11</th><th>10</th></tr>
                    <tr><th>00</th><td>0</td><td>0</td><td>0</td><td>0</td></tr>
                    <tr><th>01</th><td>0</td><td class="ones" style="background:#a9dfbf;">1</td><td class="ones" style="background:#a9dfbf;">1</td><td>0</td></tr>
                    <tr><th>11</th><td>0</td><td class="ones" style="background:#a9dfbf;">1</td><td class="ones" style="background:#a9dfbf;">1</td><td>0</td></tr>
                    <tr><th>10</th><td>0</td><td>0</td><td>0</td><td>0</td></tr>
                </table>
            </div>

            <div class="solved-example">
                <strong>التحليل (SOP):</strong>
                <ul>
                    <li><strong>الصفوف (AB):</strong> الصفوف هي (01) و (11).<br>A تغيرت (0&#8594;1) تحذف. B ثابتة عند 1 &#8594; <span class="math">B</span>.</li>
                    <li><strong>الأعمدة (CD):</strong> الأعمدة هي (01) و (11).<br>C تغيرت (0&#8594;1) تحذف. D ثابتة عند 1 &#8594; <span class="math">D</span>.</li>
                </ul>
                <div style="text-align:center; color:#27ae60; font-weight:bold;">النتيجة: F = <span class="math">B &middot; D</span></div>
            </div>

            <hr>
            <h3>🛠️ جرب بنفسك الآن (المحاكي):</h3>
        `,
        toolHTML: `
            <div class="simulator-box">
                <div style="display:flex; justify-content:center; gap:20px; flex-wrap:wrap; margin-bottom:15px;">
                    <div>
                        <label>نوع الخريطة: </label>
                        <select id="kmapType" onchange="renderKMap()" style="padding:8px; font-size:16px;">
                            <option value="2">2 متغيرات</option>
                            <option value="3">3 متغيرات</option>
                            <option value="4" selected>4 متغيرات</option>
                        </select>
                    </div>
                    <div>
                        <label>الناتج: </label>
                        <select id="resultMode" onchange="calculateResults()" style="padding:8px; font-size:16px; border:2px solid #2980b9; border-radius:5px;">
                            <option value="SOP">SOP (للوحدات)</option>
                            <option value="POS">POS (للأصفار)</option>
                        </select>
                    </div>
                </div>
                <div id="kmapContainer" class="kmap-container"></div>
                <div style="margin-top:20px; text-align:center;">
                    <div style="background:#fff; padding:20px; border:2px solid #34495e; border-radius:8px; display:inline-block; min-width:300px;">
                        <div id="resTitle" style="font-size:1em; color:#555; margin-bottom:10px; font-weight:bold;">النتيجة</div>
                        <div id="finalResult" class="math" style="font-size:1.5em; direction:ltr; color:#2c3e50;">F = 0</div>
                    </div>
                </div>
            </div>
        `
    },

    // =================================================================
    // الدرس 3: خرائط 5 متغيرات (كما هو)
    // =================================================================
    "kmap_advanced": {
        title: "3. خرائط 5 متغيرات (3D Stacking)",
        content: `
            <h3>كيف نحل خريطة 32 خلية (5 متغيرات)؟</h3>
            <p>نرسم خريطتين (4 متغيرات) بجانب بعضهما. الخريطة اليسرى لـ <strong>A=0</strong> واليمنى لـ <strong>A=1</strong>.</p>
            <p><strong>قاعدة التجاور:</strong> الخلية في الخريطة اليسرى تجاور "نفس الخلية" في الخريطة اليمنى (كأنهما طابقان فوق بعض).</p>

            <div class="solved-example">
                <strong>مثال شامل: F = &sum;m(0,1,2,3, 16,17,18,19)</strong>
                <p style="font-size:14px; color:#666;">(الأرقام 0-15 في A=0، والأرقام 16-31 في A=1)</p>

                <div style="display:flex; justify-content:center; gap:20px; flex-wrap:wrap; margin:20px 0;">
                    <div style="text-align:center;">
                        <strong>Map 1 (A=0)</strong>
                        <table class="kmap-table" style="font-size:10px;">
                            <tr><th>BC\\DE</th><th>00</th><th>01</th><th>11</th><th>10</th></tr>
                            <tr><th>00</th><td class="ones" style="background:#f1c40f;">1</td><td class="ones" style="background:#f1c40f;">1</td><td class="ones" style="background:#f1c40f;">1</td><td class="ones" style="background:#f1c40f;">1</td></tr>
                            <tr><th>01</th><td>0</td><td>0</td><td>0</td><td>0</td></tr>
                        </table>
                    </div>
                    <div style="text-align:center;">
                        <strong>Map 2 (A=1)</strong>
                        <table class="kmap-table" style="font-size:10px;">
                            <tr><th>BC\\DE</th><th>00</th><th>01</th><th>11</th><th>10</th></tr>
                            <tr><th>00</th><td class="ones" style="background:#f1c40f;">1</td><td class="ones" style="background:#f1c40f;">1</td><td class="ones" style="background:#f1c40f;">1</td><td class="ones" style="background:#f1c40f;">1</td></tr>
                            <tr><th>01</th><td>0</td><td>0</td><td>0</td><td>0</td></tr>
                        </table>
                    </div>
                </div>

                <div class="step-row">
                    <span class="step-num">1</span>
                    <span class="math-text">داخل الخريطة الواحدة</span>
                    <span class="note-text">في كل خريطة، لدينا الصف الأول كاملاً (00). هذا يعني <span class="math"><span class="bar">B</span><span class="bar">C</span></span>.</span>
                </div>
                <div class="step-row">
                    <span class="step-num">2</span>
                    <span class="math-text">بين الخريطتين (Stacking)</span>
                    <span class="note-text">المجموعة موجودة في A=0 وموجودة في A=1.</span>
                </div>
                <div class="step-row">
                    <span class="step-num">3</span>
                    <span class="math-text">المتغير الخامس (A)</span>
                    <span class="note-text">بما أن A تغيرت من 0 لـ 1، فإنها <strong>تحذف</strong>.</span>
                </div>
                
                <div style="text-align:center; font-weight:bold; color:#27ae60; margin-top:10px; font-size:1.2em;">
                    النتيجة النهائية: F = <span class="math"><span class="bar">B</span><span class="bar">C</span></span>
                </div>
                <p style="text-align:center; font-size:12px; color:#777;">(تخلصنا من A, D, E)</p>
            </div>
        `,
        toolHTML: "" 
    }
});


// =================================================================
// منطق خرائط كارنوف (K-Map Logic)
// =================================================================

window.kmapData = new Array(32).fill(0); 

const gray2 = [0, 1];
const gray4 = [0, 1, 3, 2];

window.renderKMap = function() {
    const type = document.getElementById('kmapType').value;
    const container = document.getElementById('kmapContainer');
    let html = '<table class="kmap-table">';

    if (type === "2") {
        html += `<tr><th class="kmap-diag"><span class="var-row">A</span><span class="var-col">B</span></th><th>0</th><th>1</th></tr>`;
        for(let r=0; r<2; r++) {
            html += `<tr><th>${r}</th>`;
            for(let c=0; c<2; c++) {
                let idx = (r << 1) | c;
                html += createCell(idx);
            }
            html += `</tr>`;
        }

    } else if (type === "3") {
        html += `<tr><th class="kmap-diag"><span class="var-row">A</span><span class="var-col">BC</span></th><th>00</th><th>01</th><th>11</th><th>10</th></tr>`;
        for(let r=0; r<2; r++) {
            html += `<tr><th>${r}</th>`;
            for(let c of gray4) {
                let idx = (r << 2) | c;
                html += createCell(idx);
            }
            html += `</tr>`;
        }

    } else if (type === "4") {
        html += `<tr><th class="kmap-diag"><span class="var-row">AB</span><span class="var-col">CD</span></th><th>00</th><th>01</th><th>11</th><th>10</th></tr>`;
        const labels = ["00", "01", "11", "10"];
        for(let rIdx=0; rIdx<4; rIdx++) {
            let r = gray4[rIdx];
            html += `<tr><th>${labels[rIdx]}</th>`;
            for(let c of gray4) {
                let idx = (r << 2) | c;
                html += createCell(idx);
            }
            html += `</tr>`;
        }
    }

    html += '</table>';
    container.innerHTML = html;
    calculateResults();
}

function createCell(idx) {
    const val = window.kmapData[idx] || 0;
    let displayVal = val;
    let cls = "zeros";
    
    if (val === 1) { displayVal = "1"; cls = "ones"; }
    else if (val === 2) { displayVal = "X"; cls = "dont-care"; }
    else { displayVal = "0"; cls = "zeros"; }

    return `<td onclick="toggleKCell(${idx})" class="${cls}">
                ${displayVal}
                <span class="cell-index">${idx}</span>
            </td>`;
}

window.toggleKCell = function(idx) {
    let current = window.kmapData[idx] || 0;
    if (current === 0) window.kmapData[idx] = 1;
    else if (current === 1) window.kmapData[idx] = 2; // X
    else window.kmapData[idx] = 0;
    renderKMap();
}

window.calculateResults = function() {
    const type = parseInt(document.getElementById('kmapType').value);
    const mode = document.getElementById('resultMode').value;
    const maxCells = Math.pow(2, type);
    
    const minterms = []; 
    const maxterms = []; 
    const dontcares = []; 

    for(let i=0; i < maxCells; i++) {
        const val = window.kmapData[i] || 0;
        if (val === 1) minterms.push(i);
        else if (val === 0) maxterms.push(i);
        else if (val === 2) dontcares.push(i);
    }

    const resDiv = document.getElementById('finalResult');
    const titleDiv = document.getElementById('resTitle');
    let mainTerms = "", dcTerms = "";

    if(mode === 'SOP') {
        titleDiv.innerHTML = "SOP المعادلة بصيغة (تجميع الواحدات)";
        titleDiv.style.color = "#2980b9";
        resDiv.style.color = "#2980b9";

        if(minterms.length > 0) mainTerms = minterms.map(m => getTermHTML(m, type, 'SOP')).join(" + ");
        else mainTerms = "0";

        if(dontcares.length > 0) dcTerms = ` <span style="color:#7f8c8d;">+ &sum;d(${dontcares.join(',')})</span>`;

    } else {
        titleDiv.innerHTML = "POS المعادلة بصيغة (تجميع الأصفار)";
        titleDiv.style.color = "#c0392b";
        resDiv.style.color = "#c0392b";

        if(maxterms.length > 0) mainTerms = maxterms.map(m => getTermHTML(m, type, 'POS')).join(" &middot; ");
        else mainTerms = "1";

        if(dontcares.length > 0) dcTerms = ` <span style="color:#7f8c8d;">&middot; &prod;d(${dontcares.join(',')})</span>`;
    }

    resDiv.innerHTML = `F = ${mainTerms}${dcTerms}`;
}

function getTermHTML(val, varsCount, mode) {
    let bin = val.toString(2).padStart(varsCount, '0');
    let chars = ['A','B','C','D','E'];
    let html = "";
    
    if (mode === 'SOP') {
        for(let i=0; i<varsCount; i++) {
            if(bin[i] === '0') html += `<span class="bar">${chars[i]}</span>`;
            else html += chars[i];
        }
    } else {
        let subTerms = [];
        for(let i=0; i<varsCount; i++) {
            if(bin[i] === '0') subTerms.push(chars[i]);
            else subTerms.push(`<span class="bar">${chars[i]}</span>`);
        }
        html = `(${subTerms.join(" + ")})`;
    }
    return html;
}