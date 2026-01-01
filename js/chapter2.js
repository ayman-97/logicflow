// js/chapter2.js

Object.assign(window.topicsData, {

    // =================================================================
    // الدرس 1: أساسيات الجبر البولياني
    // =================================================================
    "bool_basics": {
        title: "1. المتغيرات والعمليات البوليانية",
        content: `
            <h3>1. مفهوم المتغير البولياني</h3>
            <p>
                في الدوائر الرقمية، المتغير (مثل A, B) يمثل نقطة في الدائرة قد تكون جهد عالي <strong>(1)</strong> أو جهد منخفض <strong>(0)</strong>.
            </p>

            <h3>2. جدول العمليات الأساسية</h3>
            <table class="comparison-table" style="text-align:center;">
                <tr style="background:#2c3e50; color:white;">
                    <th>العملية</th><th>الرمز</th><th>المعنى</th>
                </tr>
                <tr>
                    <td><strong>NOT</strong> (النفي)</td>
                    <td><span class="math"><span class="bar">A</span></span></td>
                    <td>اعكس الحالة (0 ↔ 1).</td>
                </tr>
                <tr>
                    <td><strong>AND</strong> (الضرب)</td>
                    <td><span class="math">A <span class="dot">·</span> B</span></td>
                    <td>يجب تحقق الشرطين معاً.</td>
                </tr>
                <tr>
                    <td><strong>OR</strong> (الجمع)</td>
                    <td><span class="math">A + B</span></td>
                    <td>يكفي تحقق شرط واحد.</td>
                </tr>
            </table>

            <h3>3. أولويات العمليات (Order of Operations)</h3>
            <p>لتجنب الأخطاء، اتبع الترتيب الصارم:</p>
            <ol>
                <li><strong>الأقواس ( )</strong>.</li>
                <li><strong>النفي (NOT)</strong>: <span class="math"><span class="bar">A</span></span>.</li>
                <li><strong>الضرب (AND)</strong>.</li>
                <li><strong>الجمع (OR)</strong>.</li>
            </ol>

            <div class="solved-example">
                <strong>مثال 1: أوجد ناتج المعادلة لـ (A=1, B=0, C=1)</strong>
                <br>
                <div style="background:#fff; padding:10px; border:1px solid #ddd; text-align:center; margin:10px 0;">
                    <span class="math">F = (A + B) <span class="dot">·</span> <span class="bar">C</span></span>
                </div>
                
                <div class="step-row">
                    <span class="step-num">1</span>
                    <span class="math-text">تعويض مباشر</span>
                    <span class="note-text math">(1 + 0) <span class="dot">·</span> <span class="bar">1</span></span>
                </div>
                <div class="step-row">
                    <span class="step-num">2</span>
                    <span class="math-text">داخل الأقواس (OR)</span>
                    <span class="note-text math">(1) <span class="dot">·</span> <span class="bar">1</span></span>
                </div>
                <div class="step-row">
                    <span class="step-num">3</span>
                    <span class="math-text">النفي (NOT)</span>
                    <span class="note-text math">1 <span class="dot">·</span> 0</span>
                </div>
                <div class="step-row">
                    <span class="step-num">4</span>
                    <span class="math-text">الضرب (AND)</span>
                    <span class="note-text math">0</span>
                </div>
                <div style="text-align:center; font-weight:bold; color:#27ae60;">النتيجة النهائية: 0</div>
            </div>

            <hr>
            <h3>المولد التفاعلي (مع الخطوات):</h3>
        `,
        toolHTML: `
            <div class="simulator-box">
                <div style="display:flex; gap:10px; margin-bottom:15px;">
                    <input id="eqInput" type="text" placeholder="مثال: A * B + !C" class="input-field" style="direction:ltr; font-family:monospace;">
                    <button onclick="generateSmartTable()" class="btn-action">تحليل وإنشاء الجدول</button>
                </div>
                <div id="tableOutput" style="overflow-x:auto;"></div>
            </div>
        `
    },

    // =================================================================
    // الدرس 2: القوانين والتبسيط
    // =================================================================
    "bool_laws": {
        title: "2. قوانين التبسيط ونظريات ديمورغان",
        content: `
            <p>الهدف: تحويل دائرة معقدة ومكلفة إلى دائرة بسيطة ورخيصة.</p>

            <h3 style="background:#e8f8f5; padding:10px; border-right:5px solid #2ecc71;">
                أهم القوانين (للحفظ)
            </h3>
            <div style="display:flex; gap:20px; flex-wrap:wrap;">
                <div style="flex:1; min-width:300px;">
                    <table class="comparison-table">
                        <tr><th colspan="2">قوانين AND</th></tr>
                        <tr><td><span class="math">A <span class="dot">·</span> 1 = A</span></td><td>(المحايد)</td></tr>
                        <tr><td><span class="math">A <span class="dot">·</span> 0 = 0</span></td><td>(Null)</td></tr>
                        <tr><td><span class="math">A <span class="dot">·</span> A = A</span></td><td>(تكرار)</td></tr>
                        <tr><td><span class="math">A <span class="dot">·</span> <span class="bar">A</span> = 0</span></td><td>(تناقض)</td></tr>
                    </table>
                </div>
                <div style="flex:1; min-width:300px;">
                    <table class="comparison-table">
                        <tr><th colspan="2">قوانين OR</th></tr>
                        <tr><td><span class="math">A + 0 = A</span></td><td>(المحايد)</td></tr>
                        <tr><td><span class="math">A + 1 = 1</span></td><td>(هيمنة)</td></tr>
                        <tr><td><span class="math">A + A = A</span></td><td>(تكرار)</td></tr>
                        <tr><td><span class="math">A + <span class="bar">A</span> = 1</span></td><td>(تكامل)</td></tr>
                    </table>
                </div>
            </div>

            <h3 style="margin-top:40px; border-bottom:2px solid #f39c12; display:inline-block;">ورشة حل المسائل (Simplification Workshop)</h3>
            
            <div class="solved-example">
                <strong>مستوى 1: العامل المشترك</strong>
                <br>المعادلة: <span class="math">F = A <span class="dot">·</span> B + A <span class="dot">·</span> <span class="bar">B</span></span>
                <div class="step-row"><span class="step-num">1</span><span class="math-text">عامل مشترك A</span><span class="note-text math">A (B + <span class="bar">B</span>)</span></div>
                <div class="step-row"><span class="step-num">2</span><span class="math-text">تكامل</span><span class="note-text math">B + <span class="bar">B</span> = 1</span></div>
                <div class="step-row"><span class="step-num">3</span><span class="math-text">الناتج</span><span class="note-text math">A</span></div>
            </div>

            <div class="solved-example">
                <strong>مستوى 2: قانون الامتصاص (Absorption)</strong>
                <br>المعادلة: <span class="math">F = A + (A <span class="dot">·</span> B)</span>
                <div class="step-row"><span class="step-num">1</span><span class="math-text">A هي (A . 1)</span><span class="note-text math">A(1 + B)</span></div>
                <div class="step-row"><span class="step-num">2</span><span class="math-text">هيمنة</span><span class="note-text math">1 + B = 1</span></div>
                <div class="step-row"><span class="step-num">3</span><span class="math-text">الناتج</span><span class="note-text math">A</span></div>
            </div>

            <div class="solved-example">
                <strong>مستوى 3: ديمورغان (كسر الخط)</strong>
                <br>بسط المعادلة: <span class="math">F = <span class="bar"> <span class="bar">A</span> <span class="dot">·</span> B </span></span>
                <div class="step-row"><span class="step-num">1</span><span class="math-text">كسر الخط</span><span class="note-text math"><span class="bar"><span class="bar">A</span></span> + <span class="bar">B</span></span></div>
                <div class="step-row"><span class="step-num">2</span><span class="math-text">نفي النفي</span><span class="note-text math">A + <span class="bar">B</span></span></div>
            </div>

            <div class="solved-example">
                <strong>مستوى 4: التخلص من الحدود (Elimination)</strong>
                <br>بسط: <span class="math">F = (A + B)(A + <span class="bar">B</span>)</span>
                <p style="font-size:14px; color:#666;">يمكن حلها بفك الأقواس.</p>
                <div class="step-row"><span class="step-num">1</span><span class="math-text">فك الأقواس</span><span class="note-text math">AA + A<span class="bar">B</span> + AB + B<span class="bar">B</span></span></div>
                <div class="step-row"><span class="step-num">2</span><span class="math-text">تطبيق القوانين</span><span class="note-text math">A + A(<span class="bar">B</span> + B) + 0</span></div>
                <div class="step-row"><span class="step-num">3</span><span class="math-text">التبسيط</span><span class="note-text math">A + A(1) = A</span></div>
            </div>

            <div class="solved-example">
                <strong>مستوى 5: قاعدة الاختصار الهامة (Rule 11)</strong>
                <br>أثبت أن: <span class="math">A + <span class="bar">A</span>B = A + B</span>
                <p style="font-size:14px; color:#666;">هذه القاعدة توفر الكثير من الوقت وتستخدم لإلغاء النفي.</p>
                <div class="step-row"><span class="step-num">1</span><span class="math-text">استخدم التوزيع (A+!A)(A+B)</span><span class="note-text math">(A + <span class="bar">A</span>)(A + B)</span></div>
                <div class="step-row"><span class="step-num">2</span><span class="math-text">التكامل</span><span class="note-text math">(1) <span class="dot">·</span> (A + B)</span></div>
                <div class="step-row"><span class="step-num">3</span><span class="math-text">الناتج</span><span class="note-text math">A + B</span></div>
            </div>
            
            <hr>
            <h3>🛠️ المساعد الذكي للتبسيط (Simplification Engine)</h3>
            <p>أدخل معادلة تحتاج لتبسيط (مثال: <code>A*1 + B*0</code> أو <code>A + A</code>) وسيقوم النظام بتطبيق القوانين عليها.</p>
        `,
        toolHTML: `
            <div class="simulator-box">
                <div style="display:flex; gap:10px; margin-bottom:15px;">
                    <input id="simplifyInput" type="text" placeholder="مثال: A*1 + B*!B" class="input-field" style="direction:ltr; font-family:monospace;">
                    <button onclick="simplifyEquation()" class="btn-action">بسط المعادلة</button>
                </div>
                <div id="simplifyOutput" style="text-align:right;"></div>
            </div>
        `
    }
});

// =================================================================
// محرك تحليل المعادلات الذكي (Smart Parser Engine)
// يقوم بتقسيم المعادلة إلى خطوات بناءً على الأولويات
// =================================================================

window.generateSmartTable = function(inputId = 'eqInput') {
    let rawEq = document.getElementById(inputId).value.toUpperCase().replace(/\s/g, '');
    if(!rawEq) { alert("الرجاء إدخال معادلة."); return; }

    // 1. تحديد المتغيرات
    const vars = [...new Set(rawEq.match(/[A-Z]/g))].sort();
    if (vars.length === 0) { alert("لا توجد متغيرات!"); return; }

    // 2. تحويل المعادلة إلى صيغة RPN (Reverse Polish Notation) لسهولة المعالجة
    // الأولويات: ! (3) > * (2) > + (1)
    const precedence = { '!': 3, '*': 2, '+': 1, '(': 0 };
    const outputQueue = [];
    const operatorStack = [];
    
    // تقسيم النص إلى رموز (Tokens)
    // يدعم A, B, !, *, +, (, )
    const tokens = rawEq.match(/([A-Z]|!|\*|\+|\(|\))/g);

    if (!tokens) { alert("رموز غير مدعومة"); return; }

    // خوارزمية Shunting-yard لتحويل Infix إلى Postfix
    tokens.forEach(token => {
        if (/[A-Z]/.test(token)) {
            outputQueue.push(token); // متغير
        } else if (token === '(') {
            operatorStack.push(token);
        } else if (token === ')') {
            while (operatorStack.length && operatorStack[operatorStack.length - 1] !== '(') {
                outputQueue.push(operatorStack.pop());
            }
            operatorStack.pop(); // إخراج القوس المفتوح
        } else {
            // العمليات (! * +)
            while (operatorStack.length && 
                   precedence[operatorStack[operatorStack.length - 1]] >= precedence[token]) {
                outputQueue.push(operatorStack.pop());
            }
            operatorStack.push(token);
        }
    });
    while (operatorStack.length) {
        outputQueue.push(operatorStack.pop());
    }

    // 3. بناء الجدول
    // الخطوة الذكية: سنقوم بمحاكاة حساب RPN لتحديد عناوين الأعمدة الوسيطة
    
    // سنقوم بتخزين الخطوات (الأعمدة) بترتيب حدوثها
    let stepHeaders = [];
    
    // دالة مساعدة لحساب القيم لكل صف
    const rowsCount = Math.pow(2, vars.length);
    let tableData = []; // سيخزن البيانات: [ [A,B, Step1, Step2, Final] ... ]

    for(let i=0; i<rowsCount; i++) {
        let bin = i.toString(2).padStart(vars.length, '0');
        let varValues = {};
        vars.forEach((v, idx) => varValues[v] = parseInt(bin[idx]));

        // حساب قيم RPN لهذا الصف
        let evalStack = [];
        let stepIndex = 0; // لتتبع أي خطوة نحن فيها
        
        let rowValues = [...Object.values(varValues)]; // نبدأ بقيم المتغيرات
        
        // تنفيذ RPN
        outputQueue.forEach(token => {
            if (/[A-Z]/.test(token)) {
                evalStack.push({ val: varValues[token], expr: token });
            } else {
                // عملية
                let resVal, resExpr;
                
                if (token === '!') {
                    let op = evalStack.pop();
                    resVal = op.val === 0 ? 1 : 0;
                    resExpr = `<span style="text-decoration:overline">${op.expr}</span>`;
                } else {
                    let op2 = evalStack.pop();
                    let op1 = evalStack.pop();
                    
                    if (token === '*') {
                        resVal = (op1.val && op2.val) ? 1 : 0;
                        resExpr = `(${op1.expr} · ${op2.expr})`;
                    } else if (token === '+') {
                        resVal = (op1.val || op2.val) ? 1 : 0;
                        resExpr = `(${op1.expr} + ${op2.expr})`;
                    }
                }
                
                evalStack.push({ val: resVal, expr: resExpr });
                
                // في الصف الأول فقط، نقوم بتسجيل عناوين الأعمدة
                if (i === 0) {
                    // تنظيف العنوان للعرض
                    let cleanHeader = resExpr.replace(/\(/g, '').replace(/\)/g, '');
                    // إذا كانت العملية الأخيرة، نسميها F
                    if (stepHeaders.length === outputQueue.filter(t => "!*+".includes(t)).length - 1) {
                         // cleanHeader = `F`; // اختياري: تسمية العمود الأخير F
                    }
                    stepHeaders.push(cleanHeader);
                }
                
                // إضافة القيمة المحسوبة للصف الحالي
                rowValues.push(resVal);
            }
        });
        
        tableData.push(rowValues);
    }

    // 4. رسم الجدول HTML
    let container = document.getElementById(inputId === 'eqInput' ? 'tableOutput' : 'tableOutput2');
    
    let html = '<table class="comparison-table" style="text-align:center; direction:ltr; min-width:100%;"><thead><tr style="background:#34495e; color:white;">';
    
    // عناوين المتغيرات
    vars.forEach(v => html += `<th>${v}</th>`);
    // عناوين الخطوات
    stepHeaders.forEach((h, idx) => {
        let isLast = idx === stepHeaders.length - 1;
        html += `<th style="background:${isLast ? '#2c3e50' : '#7f8c8d'}">${h}</th>`;
    });
    html += '</tr></thead><tbody>';

    // تعبئة البيانات
    tableData.forEach(row => {
        html += '<tr>';
        row.forEach((cell, idx) => {
            // تلوين آخر عمود (النتيجة النهائية)
            let isLastCol = idx === row.length - 1;
            let style = "";
            if (isLastCol) style = `font-weight:bold; color:${cell===1 ? '#27ae60' : '#c0392b'}; font-size:1.2em; background:#f9f9f9;`;
            
            html += `<td style="${style}">${cell}</td>`;
        });
        html += '</tr>';
    });
    
    html += '</tbody></table>';
    container.innerHTML = html;
}

// =================================================================
// 2. محرك التبسيط الذكي (Smart Simplification Engine - إصدار محسن)
// =================================================================

window.simplifyEquation = function() {
    // 1. تنظيف المدخلات
    let eq = document.getElementById('simplifyInput').value.toUpperCase().replace(/\s/g, '');
    let container = document.getElementById('simplifyOutput');
    container.innerHTML = ""; 

    if(!eq) { alert("أدخل معادلة أولاً"); return; }

    const term = "(!?[A-Z])"; 

    // قائمة القواعد (نفس القواعد السابقة)
    const rules = [
        { regex: new RegExp(`${term}\\*0`, 'g'), replace: "0", name: "Null Law (ضرب بصفر)" },
        { regex: new RegExp(`0\\*${term}`, 'g'), replace: "0", name: "Null Law" },
        { regex: new RegExp(`${term}\\*1`, 'g'), replace: "$1", name: "Identity Law (محايد ضربي)" },
        { regex: new RegExp(`1\\*${term}`, 'g'), replace: "$1", name: "Identity Law" },
        { regex: new RegExp(`${term}\\+0`, 'g'), replace: "$1", name: "Identity Law (محايد جمعي)" },
        { regex: new RegExp(`0\\+${term}`, 'g'), replace: "$1", name: "Identity Law" },
        { regex: new RegExp(`${term}\\+1`, 'g'), replace: "1", name: "Domination Law (هيمنة)" },
        { regex: new RegExp(`1\\+${term}`, 'g'), replace: "1", name: "Domination Law" },
        { regex: /(!?[A-Z])\+\1/g, replace: "$1", name: "Idempotent (A+A=A)" },
        { regex: /(!?[A-Z])\*\1/g, replace: "$1", name: "Idempotent (A.A=A)" },
        { regex: /([A-Z])\+!\1/g, replace: "1", name: "Complement (A+!A=1)" }, 
        { regex: /!([A-Z])\+\1/g, replace: "1", name: "Complement (!A+A=1)" },
        { regex: /([A-Z])\*!\1/g, replace: "0", name: "Complement (A.!A=0)" },
        { regex: /!([A-Z])\*\1/g, replace: "0", name: "Complement (!A.A=0)" },
        { regex: /!!([A-Z])/g, replace: "$1", name: "Double Negation (!!A=A)" },
        // قواعد حسابية بسيطة
        { regex: /0\+0/g, replace: "0", name: "حساب" },
        { regex: /1\+1/g, replace: "1", name: "حساب" },
        { regex: /1\+0/g, replace: "1", name: "حساب" },
        { regex: /0\+1/g, replace: "1", name: "حساب" },
        { regex: /0\*0/g, replace: "0", name: "حساب" },
        { regex: /1\*1/g, replace: "1", name: "حساب" },
        { regex: /1\*0/g, replace: "0", name: "حساب" },
        { regex: /0\*1/g, replace: "0", name: "حساب" }
    ];

    let stepsHtml = "";
    let currentEq = eq;
    let stepCount = 1;
    let hasChanged = true;

    // عرض المعادلة الأصلية دائماً
    stepsHtml += `
        <div class="step-row" style="background:#ecf0f1; border-bottom: 2px solid #bdc3c7;">
            <span class="step-num">0</span>
            <span class="math-text" style="font-size:16px;">المعادلة المدخلة</span>
            <span class="note-text math" style="direction:ltr; font-size:1.4em;">${formatMath(currentEq)}</span>
        </div>
    `;

    // حلقة التبسيط
    let safetyCounter = 0;
    while(hasChanged && safetyCounter < 15) {
        hasChanged = false;
        
        for (let rule of rules) {
            if (currentEq.search(rule.regex) !== -1) {
                let newEq = currentEq.replace(rule.regex, rule.replace);
                
                if (newEq !== currentEq) {
                    stepsHtml += `
                        <div class="step-row">
                            <span class="step-num">${stepCount++}</span>
                            <span class="math-text">${rule.name}</span>
                            <span class="note-text math" style="direction:ltr;">${formatMath(newEq)}</span>
                        </div>
                    `;
                    currentEq = newEq;
                    hasChanged = true;
                    break; 
                }
            }
        }
        safetyCounter++;
    }

    // --- هنا التعديل: التعامل مع النتيجة النهائية ---
    if (stepCount === 1) {
        // لم يحدث أي تغيير (المعادلة مبسطة أصلاً)
        stepsHtml += `
            <div style="text-align:center; padding:20px; background:#fff; margin-top:10px; border:1px solid #ddd; border-radius:8px;">
                <div style="color:#27ae60; font-weight:bold; font-size:1.1em; margin-bottom:10px;">
                    ✅ المعادلة في أبسط صورة (Minimal Form)
                </div>
                <div style="color:#7f8c8d; font-size:0.9em;">
                    لا توجد قواعد اختصار مباشرة تنطبق على هذه المعادلة.
                </div>
                <div class="math" style="margin-top:15px; font-size:1.5em; direction:ltr;">
                    F = ${formatMath(currentEq)}
                </div>
            </div>`;
    } else {
        // تم التبسيط
        stepsHtml += `
            <div style="text-align:center; font-weight:bold; color:#27ae60; margin-top:15px; font-size:1.4em; padding:15px; border:2px solid #27ae60; border-radius:8px; background:#e8f8f5;">
                النتيجة النهائية: <span class="math" style="direction:ltr;">${formatMath(currentEq)}</span>
            </div>`;
    }

    container.innerHTML = stepsHtml;
}

// دالة التنسيق (تأكد أنها موجودة في الملف)
function formatMath(str) {
    return str
        .replace(/!([A-Z])/g, '<span style="text-decoration:overline">$1</span>')
        .replace(/\*/g, ' · ')
        .replace(/\+/g, ' + ');
}