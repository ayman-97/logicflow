// js/chapter1.js

Object.assign(window.topicsData, {

    // =================================================================
    // الدرس 1: أنظمة العد (تم إضافة جدول مضاعفات 2)
    // =================================================================
    "num_systems": {
        title: "1. أساسيات الأنظمة الرقمية (Digital Systems Basis)",
        content: `
            <h3>1. الإشارات والتمثيل (Signals & Representation)</h3>
            <p>
                الأنظمة الرقمية تعتمد على مبدأ "التقطيع" (Discretization)، حيث يتم تمثيل المعلومات بقيم محددة (0 و 1) لضمان الدقة ومقاومة التشويش.
            </p>

            <h3>2. جدول الأنظمة القياسية (Standard Systems)</h3>
            <table class="comparison-table">
                <tr style="background:#2c3e50; color:white;">
                    <th>النظام</th><th>الأساس (Radix)</th><th>الرموز (Symbols)</th>
                </tr>
                <tr><td>الثنائي (Binary)</td><td>2</td><td>0, 1</td></tr>
                <tr><td>العشري (Decimal)</td><td>10</td><td>0-9</td></tr>
                <tr><td>السداسي عشر (Hex)</td><td>16</td><td>0-9, A-F</td></tr>
                <tr><td>الثماني (Octal)</td><td>8</td><td>0-7</td></tr>
            </table>

            <h3 style="margin-top:40px; border-bottom:2px solid #f39c12; display:inline-block;">
                3. جدول مضاعفات العدد 2 (Powers of 2) هام جداً
            </h3>
            <p>
                هذا الجدول هو "المسطرة" التي نقيس عليها قيمة كل خانة (Bit). يجب حفظه غيباً لأنه أساس التحويل السريع.
                <br>كلما تحركنا خانة لليسار، تتضاعف القيمة:
            </p>
            
            <div style="overflow-x:auto;">
                <table class="comparison-table" style="text-align:center; direction:ltr; min-width:600px;">
                    <tr style="background:#34495e; color:white;">
                        <th>الأس (Power)</th>
                        <td>2¹⁰</td><td>2⁹</td><td>2⁸</td><td>2⁷</td><td>2⁶</td><td>2⁵</td><td>2⁴</td><td>2³</td><td>2²</td><td>2¹</td><td>2⁰</td>
                    </tr>
                    <tr style="background:#f1c40f; color:#333; font-weight:bold; font-size:18px;">
                        <th>القيمة (Value)</th>
                        <td>1024</td><td>512</td><td>256</td><td>128</td><td>64</td><td>32</td><td>16</td><td>8</td><td>4</td><td>2</td><td>1</td>
                    </tr>
                </table>
            </div>
            <div class="note-box">
                <strong>كيف نستخدمه؟</strong>
                <br>إذا كان لديك الرقم الثنائي (101)، تضع تحته القيم: (4, 2, 1).
                <br>نجمع القيم التي فوقها (1) فقط: 4 + 1 = 5.
            </div>
        `,
        toolHTML: "" 
    },

    // =================================================================
    // الدرس 2: التحويلات (كما هو - شامل)
    // =================================================================
    "conversions": {
        title: "2. خوارزميات التحويل الشاملة",
        content: `
            <p>تشمل الأمثلة التالية الحالات البسيطة والمركبة (الأعداد الصحيحة والكسور).</p>

            <h3 style="background:#e8f8f5; padding:10px; border-right:5px solid #2ecc71;">
                المستوى 1: الأعداد الصحيحة (Integers)
            </h3>
            <p>القاعدة هنا تعتمد على <strong>القسمة المتكررة</strong> أو <strong>التجميع</strong>.</p>
            
            <div class="solved-example">
                <strong>مثال 1: حول العدد الصحيح (25)₁₀ إلى ثنائي</strong>
                <p>نقسم على 2 ونأخذ الباقي:</p>
                
                <div class="step-row">
                    <span class="step-num">1</span>
                    <span class="math-text">25 ÷ 2 = 12</span>
                    <span class="note-text">الباقي 1</span>
                </div>
                <div class="step-row">
                    <span class="step-num">2</span>
                    <span class="math-text">12 ÷ 2 = 6</span>
                    <span class="note-text">الباقي 0</span>
                </div>
                <div class="step-row">
                    <span class="step-num">3</span>
                    <span class="math-text">6 ÷ 2 = 3</span>
                    <span class="note-text">الباقي 0</span>
                </div>
                <div class="step-row">
                    <span class="step-num">4</span>
                    <span class="math-text">3 ÷ 2 = 1</span>
                    <span class="note-text">الباقي 1</span>
                </div>
                <div class="step-row">
                    <span class="step-num">5</span>
                    <span class="math-text">1 ÷ 2 = 0</span>
                    <span class="note-text">الباقي 1</span>
                </div>
                
                <div style="text-align:center; font-weight:bold; color:#27ae60;">
                    النتيجة (من الأسفل للأعلى): (11001)₂
                </div>
            </div>

            <div class="solved-example">
                <strong>مثال 2: حول (101101)₂ إلى عشري</strong>
                <p>نستخدم مجموع الأوزان ($2^0, 2^1, 2^2...$):</p>
                
                <div class="step-row">
                    <span class="step-num">1</span>
                    <span class="math-text">1×32 + 0×16 + 1×8</span>
                    <span class="note-text">= 40</span>
                </div>
                <div class="step-row">
                    <span class="step-num">2</span>
                    <span class="math-text">1×4 + 0×2 + 1×1</span>
                    <span class="note-text">= 5</span>
                </div>
                
                <div style="text-align:center; font-weight:bold; color:#27ae60;">
                    النتيجة: 40 + 5 = (45)₁₀
                </div>
            </div>

            <h3 style="background:#fef9e7; padding:10px; border-right:5px solid #f39c12; margin-top:40px;">
                المستوى 2: الأعداد الكسرية والشاملة (Fractions)
            </h3>
            <p>هنا نتعامل مع الفاصلة العشرية. الصحيح يُقسم، والكسر <strong>يُضرب</strong>.</p>

            <div class="solved-example">
                <strong>مثال 3: حول الكسر (0.375)₁₀ إلى ثنائي</strong>
                <p>نضرب في 2 ونحتفظ بالعدد الصحيح:</p>

                <div class="step-row">
                    <span class="step-num">1</span>
                    <span class="math-text">0.375 × 2 = 0.75</span>
                    <span class="note-text">صحيح: 0</span>
                </div>
                <div class="step-row">
                    <span class="step-num">2</span>
                    <span class="math-text">0.75 × 2 = 1.50</span>
                    <span class="note-text">صحيح: 1</span>
                </div>
                <div class="step-row">
                    <span class="step-num">3</span>
                    <span class="math-text">0.50 × 2 = 1.00</span>
                    <span class="note-text">صحيح: 1 (قف)</span>
                </div>

                <div style="text-align:center; font-weight:bold; color:#27ae60;">
                    النتيجة (من الأعلى للأسفل): (0.011)₂
                </div>
            </div>

            <div class="solved-example">
                <strong>مثال 4 (شامل): حول العدد المركب (13.5)₁₀ إلى ثنائي</strong>
                
                <p style="border-bottom:1px dashed #ccc; padding-bottom:5px;"><strong>أولاً: الجزء الصحيح (13)</strong></p>
                <div class="step-row">
                    <span class="step-num">1</span>
                    <span class="math-text">13 ÷ 2 = 6</span>
                    <span class="note-text">الباقي 1</span>
                </div>
                <div class="step-row">
                    <span class="step-num">2</span>
                    <span class="math-text">6 ÷ 2 = 3</span>
                    <span class="note-text">الباقي 0</span>
                </div>
                <div class="step-row">
                    <span class="step-num">3</span>
                    <span class="math-text">3 ÷ 2 = 1</span>
                    <span class="note-text">الباقي 1</span>
                </div>
                <div class="step-row">
                    <span class="step-num">4</span>
                    <span class="math-text">1 ÷ 2 = 0</span>
                    <span class="note-text">الباقي 1</span>
                </div>
                <div style="font-family:monospace; margin-bottom:15px;">الناتج الصحيح: <strong>1101</strong></div>

                <p style="border-bottom:1px dashed #ccc; padding-bottom:5px;"><strong>ثانياً: الجزء الكسري (0.5)</strong></p>
                <div class="step-row">
                    <span class="step-num">1</span>
                    <span class="math-text">0.5 × 2 = 1.0</span>
                    <span class="note-text">صحيح: 1</span>
                </div>

                <div style="text-align:center; font-weight:bold; color:#27ae60; border-top:2px solid #eee; padding-top:10px; margin-top:10px;">
                    النتيجة النهائية: (1101.1)₂
                </div>
            </div>

            <h3 style="background:#ebf5fb; padding:10px; border-right:5px solid #3498db; margin-top:40px;">
                المستوى 3: التحويلات السريعة (Hex/Octal)
            </h3>
            <p>نستخدم هنا الأسهم لفك الرموز أو تجميعها.</p>

            <div class="solved-example">
                <strong>مثال 5: حول (1A.C)₁₆ إلى ثنائي</strong>
                <p>كل خانة Hex نفككها إلى 4 خانات ثنائية:</p>
                
                <div style="display:flex; justify-content:center; gap:30px; margin:20px 0;">
                    <div style="text-align:center;">
                        <div style="font-weight:bold; font-size:24px; color:#2c3e50;">1</div>
                        <div style="color:#e67e22; font-size:24px;">⬇</div>
                        <div style="background:#333; color:#fff; padding:5px 10px; border-radius:5px; font-family:monospace;">0001</div>
                    </div>
                    <div style="text-align:center;">
                        <div style="font-weight:bold; font-size:24px; color:#2c3e50;">A</div>
                        <div style="color:#e67e22; font-size:24px;">⬇</div>
                        <div style="background:#333; color:#fff; padding:5px 10px; border-radius:5px; font-family:monospace;">1010</div>
                    </div>
                    <div style="font-weight:bold; font-size:40px; color:#555; align-self:center;">.</div>
                    <div style="text-align:center;">
                        <div style="font-weight:bold; font-size:24px; color:#2c3e50;">C</div>
                        <div style="color:#e67e22; font-size:24px;">⬇</div>
                        <div style="background:#333; color:#fff; padding:5px 10px; border-radius:5px; font-family:monospace;">1100</div>
                    </div>
                </div>

                <div style="text-align:center; font-weight:bold; color:#27ae60; margin-top:15px;">
                    النتيجة: (11010.1100)₂
                </div>
            </div>

            <div class="solved-example">
                <strong>مثال 6: حول (3F)₁₆ إلى ثماني (Octal)</strong>
                <p>الطريقة: نفكك Hex إلى ثنائي (4 بتات)، ثم نجمع كل (3 بتات) للثماني.</p>
                
                <div style="text-align:center; margin-bottom:10px;"><strong>الخطوة 1: الفك (Hex ➔ Binary)</strong></div>
                <div style="display:flex; justify-content:center; gap:40px; margin-bottom:20px;">
                    <div style="text-align:center;">
                        <div style="font-weight:bold; font-size:20px;">3</div>
                        <div style="color:#e67e22; font-size:20px;">⬇</div>
                        <div style="font-family:monospace; background:#eee; padding:5px;">0011</div>
                    </div>
                    <div style="text-align:center;">
                        <div style="font-weight:bold; font-size:20px;">F</div>
                        <div style="color:#e67e22; font-size:20px;">⬇</div>
                        <div style="font-family:monospace; background:#eee; padding:5px;">1111</div>
                    </div>
                </div>

                <div style="text-align:center; margin-bottom:10px;"><strong>الخطوة 2: إعادة التجميع (Binary ➔ Octal)</strong></div>
                <div style="display:flex; justify-content:center; gap:20px; margin-bottom:20px;">
                    <div style="text-align:center;">
                        <div style="font-family:monospace; background:#eee; padding:5px; color:#888;">00</div>
                        <div style="color:#27ae60; font-size:20px;">⬇</div>
                        <div style="font-weight:bold; font-size:20px;">0</div>
                    </div>
                    <div style="text-align:center;">
                        <div style="font-family:monospace; background:#333; color:#fff; padding:5px;">111</div>
                        <div style="color:#27ae60; font-size:20px;">⬇</div>
                        <div style="font-weight:bold; font-size:20px;">7</div>
                    </div>
                    <div style="text-align:center;">
                        <div style="font-family:monospace; background:#333; color:#fff; padding:5px;">111</div>
                        <div style="color:#27ae60; font-size:20px;">⬇</div>
                        <div style="font-weight:bold; font-size:20px;">7</div>
                    </div>
                </div>

                <div style="text-align:center; font-weight:bold; color:#27ae60;">النتيجة النهائية: (77)₈</div>
            </div>

            <hr>
            <h3>المحول الشامل:</h3>
        `,
        toolHTML: `
            <div class="simulator-box">
                <h3>🔄 محول الأنظمة الشامل</h3>
                <div class="converter-grid">
                    <div><label>Decimal (10)</label><input type="number" id="inpDec" oninput="convertAll('dec', this.value)" class="input-field" placeholder="13.5"></div>
                    <div><label>Binary (2)</label><input type="text" id="inpBin" oninput="convertAll('bin', this.value)" class="input-field" placeholder="1101.1"></div>
                    <div><label>Octal (8)</label><input type="text" id="inpOct" oninput="convertAll('oct', this.value)" class="input-field" placeholder="15.4"></div>
                    <div><label>Hex (16)</label><input type="text" id="inpHex" oninput="convertAll('hex', this.value)" class="input-field" placeholder="D.8"></div>
                </div>
            </div>
        `
    },

    // =================================================================
    // الدرس 3: العمليات الحسابية (كما هو)
    // =================================================================
    "binary_math": {
        title: "3. العمليات الحسابية (Arithmetic)",
        content: `
            <p>سنتناول القواعد الأساسية لكل عملية قبل البدء في الأمثلة.</p>

            <h3 style="border-bottom:2px solid #f1c40f; display:inline-block;">1. الجمع الثنائي (Binary Addition)</h3>
            <p>
                الجمع في النظام الثنائي بسيط جداً، فقط تذكر أنك لا تملك سوى الرقمين 0 و 1. إذا تجاوز المجموع 1، يجب عليك ترحيل القيمة (Carry).
            </p>
            <div class="note-box" style="background:#fef9e7; border-right:5px solid #f1c40f;">
                <strong>قواعد الجمع الأربعة:</strong>
                <ul>
                    <li>0 + 0 = 0</li>
                    <li>0 + 1 = 1</li>
                    <li>1 + 0 = 1</li>
                    <li>1 + 1 = <strong>0</strong> (ومعنا 1 باليد/Carry)</li>
                    <li>1 + 1 + 1 = <strong>1</strong> (ومعنا 1 باليد/Carry)</li>
                </ul>
            </div>
            
            <div class="solved-example">
                <strong>مثال 1 (أساسي): اجمع (1010 + 0011)</strong>
                <div class="vertical-math">
      1 0 1 0   (10)<br>
    + 0 0 1 1   (3)<br>
    ---------<br>
      1 1 0 1   (13)
                </div>
            </div>

            <div class="solved-example">
                <strong>مثال 2 (متقدم): اجمع (111 + 101) - تتابع الحمل</strong>
                <div class="vertical-math">
    (1)(1)      <span style="color:#aaa; font-size:12px;">← خانة الحمل (Carries)</span><br>
       1 1 1    (7)<br>
     + 1 0 1    (5)<br>
     -------<br>
     1 1 0 0    (12)
                </div>
                <p style="font-size:14px; color:#555;">شرح: في العمود الثالث (1+1+1) النتيجة 1 ونحمل 1 للعمود الرابع.</p>
            </div>

            <h3 style="border-bottom:2px solid #e74c3c; display:inline-block; margin-top:30px;">2. الطرح الثنائي (Binary Subtraction)</h3>
            <p>
                يعتمد الطرح على فكرة "الاستلاف" (Borrow) عندما يكون المطروح منه أصغر من المطروح.
            </p>
            <div class="note-box" style="background:#fadbd8; border-right:5px solid #e74c3c; color:#c0392b;">
                <strong>قواعد الطرح والاستلاف:</strong>
                <ul>
                    <li>0 - 0 = 0</li>
                    <li>1 - 0 = 1</li>
                    <li>1 - 1 = 0</li>
                    <li>0 - 1 = <strong>1</strong> (نستلف 1 من الخانة اليسرى، فتصبح قيمته 2 في الخانة الحالية).</li>
                </ul>
            </div>
            
            <div class="solved-example">
                <strong>مثال 1 (أساسي): اطرح (110 - 010)</strong>
                <div class="vertical-math">
       1 1 0   (6)<br>
    -  0 1 0   (2)<br>
    --------<br>
       1 0 0   (4)
                </div>
            </div>

            <div class="solved-example">
                <strong>مثال 2 (متقدم): الاستلاف من الصفر (1000 - 0011)</strong>
                <p>نريد طرح (8 - 3). الصفر لا يمكن الطرح منه، فنستلف من أقصى اليسار.</p>
                <div class="vertical-math">
   (0)(1)(1)(2) <span style="color:#aaa; font-size:12px;">← قيم الاستلاف</span><br>
    1  0  0  0<br>
 -  0  0  1  1<br>
 -------------<br>
    0  1  0  1  (النتيجة 5)
                </div>
                <p style="font-size:14px; color:#555;">شرح: عندما نستلف من خانة قيمتها (4) لتذهب لخانة قيمتها (2)، فإننا نأخذ منها واحداً، ولكن قيمته في الخانة الجديدة تتضاعف لتصبح (2).</p>
            </div>

            <h3 style="border-bottom:2px solid #2ecc71; display:inline-block; margin-top:30px;">3. الضرب الثنائي (Multiplication)</h3>
            <p>
                أسهل عملية على الإطلاق! لأنك تضرب إما في 0 أو في 1. لا تحتاج لحفظ جداول الضرب المعقدة.
            </p>
            <div class="note-box" style="background:#e8f8f5; border-right:5px solid #2ecc71; color:#27ae60;">
                <strong>خوارزمية الضرب (Shift & Add):</strong>
                <ul>
                    <li>إذا ضربت في <strong>0</strong>: النتيجة صف من الأصفار.</li>
                    <li>إذا ضربت في <strong>1</strong>: انسخ الرقم كما هو.</li>
                    <li>مع كل خانة جديدة، نقوم بإزاحة (Shift) لليسار.</li>
                </ul>
            </div>
            
            <div class="solved-example">
                <strong>مثال 1 (أساسي): اضرب (110 × 10)</strong>
                <div class="vertical-math">
       1 1 0<br>
     ×   1 0<br>
     -------<br>
       0 0 0   (×0)<br>
     1 1 0 0   (×1 مع إزاحة)<br>
     -------<br>
     1 1 0 0   (النتيجة 12)
                </div>
            </div>

            <div class="solved-example">
                <strong>مثال 2 (متقدم): اضرب (111 × 101)</strong>
                <div class="vertical-math">
         1 1 1   (7)<br>
       × 1 0 1   (5)<br>
       -------<br>
         1 1 1   (×1)<br>
       0 0 0 0   (×0)<br>
   + 1 1 1 0 0   (×1 مع إزاحتين)<br>
   -----------<br>
   1 0 0 0 1 1   (35)
                </div>
            </div>

            <h3 style="border-bottom:2px solid #3498db; display:inline-block; margin-top:30px;">4. القسمة الثنائية (Division)</h3>
            <p>
                نستخدم طريقة "القسمة المطولة" (Long Division) التقليدية.
            </p>
            <div class="note-box" style="background:#ebf5fb; border-right:5px solid #3498db; color:#2980b9;">
                <strong>القاعدة:</strong>
                <br>نقارن المقسوم عليه مع الجزء الحالي من المقسوم:
                <br>• إذا كان أكبر أو يساوي ← نضع 1 ونطرح.
                <br>• إذا كان أصغر ← نضع 0 وننزل خانة جديدة.
            </div>
            
            <div class="solved-example">
                <strong>مثال 1 (بدون باقي): اقسم (1111 ÷ 101)</strong>
                <p>أي (15 ÷ 5)</p>
                <div class="vertical-math">
           0 0 1 1  (الناتج = 3)<br>
         ___________<br>
    1 0 1 | 1 1 1 1<br>
        - 1 0 1<br>
        -------<br>
          0 1 0 1<br>
          - 1 0 1<br>
          -------<br>
            0 0 0
                </div>
            </div>

            <div class="solved-example">
                <strong>مثال 2 (مع باقي): اقسم (1000 ÷ 11)</strong>
                <p>أي (8 ÷ 3). نتوقع الناتج 2 والباقي 2.</p>
                <div class="vertical-math">
           0 0 1 0  (الناتج = 2)<br>
         ___________<br>
      1 1 | 1 0 0 0<br>
        -   1 1     (10 أصغر من 11، نأخذ 100)<br>
        -------<br>
          0 0 1 0   (الباقي 1، ننزل 0)<br>
          - 0 0<br>
          -------<br>
            0 1 0   (الباقي النهائي 2)
                </div>
            </div>
        <div style="color:white; padding:15px; border-radius:8px; margin-top:50px;">
                <h2 style="margin:0; border-bottom:2px solid #f39c12; display:inline-block;"> المتممات (Complements)</h2>
                <p style="color:#555;">
                    المتممات هي طريقة لتمثيل الأعداد السالبة داخل الحاسوب، وتستخدم لتحويل عملية الطرح المعقدة إلى عملية جمع بسيطة.
                </p>
            </div>

            <h3 style="margin-top:20px;">أ) المتمم الأول (1's Complement)</h3>
            <p>يتم الحصول عليه بقلب كل بت (Bit) في الرقم.</p>
            <ul>
                <li>الصفر (0) يصبح واحداً (1).</li>
                <li>الواحد (1) يصبح صفراً (0).</li>
            </ul>

            <div class="solved-example">
                <strong>مثال: أوجد المتمم الأول للعدد (10110)</strong>
                <div style="display:flex; align-items:center; gap:20px; font-family:monospace; font-size:20px; justify-content:center; margin-top:10px;">
                    <div>1 0 1 1 0</div>
                    <div style="color:#e67e22;">⬇ (قلب)</div>
                    <div style="color:#e74c3c; font-weight:bold;">0 1 0 0 1</div>
                </div>
            </div>

            <h3 style="margin-top:30px;">ب) المتمم الثاني (2's Complement) - الأهم</h3>
            <p>هو النظام المستخدم فعلياً في المعالجات. يتم الحصول عليه بإضافة (1) إلى المتمم الأول.</p>
            <div class="note-box" style="text-align:center;">
                <strong>القاعدة الذهبية:</strong><br>
                2's Complement = 1's Complement + 1
            </div>

            <div class="solved-example">
                <strong>مثال: أوجد المتمم الثاني للعدد (0101)</strong>
                
                <div class="step-row">
                    <span class="step-num">1</span>
                    <span class="math-text">العدد الأصلي</span>
                    <span class="note-text">0101</span>
                </div>
                <div class="step-row">
                    <span class="step-num">2</span>
                    <span class="math-text">نوجد المتمم الأول (قلب)</span>
                    <span class="note-text">1010</span>
                </div>
                <div class="step-row">
                    <span class="step-num">3</span>
                    <span class="math-text">نجمع 1</span>
                    <span class="note-text">1010 + 1</span>
                </div>
                
                <div style="text-align:center; font-weight:bold; color:#27ae60; margin-top:10px;">
                    النتيجة النهائية: (1011)
                </div>
            </div>

            <h3 style="margin-top:30px;">ج) الطرح باستخدام المتمم الثاني</h3>
            <p>لطرح (A - B)، نقوم بجمع (A + المتمم الثاني لـ B).</p>
            
            <div class="solved-example">
                <strong>مثال: اطرح (7 - 5) باستخدام المتممات</strong>
                <p>نعلم أن 7 = 0111 ، و 5 = 0101.</p>
                
                <div class="step-row">
                    <span class="step-num">1</span>
                    <span class="math-text">المتمم الثاني للرقم 5 (0101)</span>
                    <span class="note-text">1011</span>
                </div>
                
                <p>الآن نجمع (7) + (المتمم الثاني لـ 5):</p>
                <div class="vertical-math">
      0 1 1 1   (7)<br>
    + 1 0 1 1   (-5)<br>
    ---------<br>
    1 0 0 1 0
                </div>
                <p><strong>ملاحظة هامة:</strong> نهمل الحمل الأخير (الرقم 1 في أقصى اليسار) لأنه خارج عدد الخانات. النتيجة المتبقية هي <strong>(0010)</strong> وهي تساوي 2. الحل صحيح!</p>
            </div>

            <hr>
            <h3>المختبر الحسابي والمتممات:</h3>
        `,
        toolHTML: `
            <div class="simulator-box">
                <div style="max-width:600px; margin:0 auto;">
                    <h4>🧮 الآلة الحاسبة المنطقية</h4>
                    <div style="display:flex; gap:10px; align-items:center; justify-content:center; margin-bottom:20px;">
                        <input id="calcA" placeholder="Binary A" class="bin-input" style="width:150px">
                        <select id="opSelect" style="padding:10px; font-size:18px; border-radius:5px;">
                            <option value="+">➕</option>
                            <option value="-">➖</option>
                            <option value="*">✖️</option>
                            <option value="/">➗</option>
                        </select>
                        <input id="calcB" placeholder="Binary B" class="bin-input" style="width:150px">
                    </div>
                    <button onclick="calcOp()" class="btn-action" style="width:100%;">احسب النتيجة</button>
                    <div id="opResult" class="result-box" style="display:none; margin-top:20px; text-align:right;">
                        <div><strong>Binary:</strong> <span id="resBin" style="color:#27ae60; font-weight:bold;"></span></div>
                        <div><strong>Decimal:</strong> <span id="resDec"></span></div>
                    </div>

                    <div style="border-top:2px dashed #ccc; padding-top:20px;">
                        <h4>🔄 حاسبة المتممات (Complements)</h4>
                        <p style="font-size:14px; color:#666;">أدخل رقماً لرؤية متمماته فوراً:</p>
                        <input id="compInput" placeholder="Binary Number (e.g. 0101)" class="bin-input" style="width:100%;" oninput="updateComplements()">
                        
                        <div id="compOutput" style="display:none; margin-top:15px;">
                            <div class="step-row" style="margin-bottom:5px; padding:10px;">
                                <span class="math-text" style="font-size:16px; min-width:120px;">1's Comp:</span>
                                <span id="out1s" class="note-text" style="border:none; color:#e67e22;">-</span>
                            </div>
                            <div class="step-row" style="margin-bottom:5px; padding:10px;">
                                <span class="math-text" style="font-size:16px; min-width:120px;">2's Comp:</span>
                                <span id="out2s" class="note-text" style="border:none; color:#27ae60;">-</span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
                </div>
            </div>
            
        `
    }
});

// =================================================================
// المنطق البرمجي
// =================================================================

function convertAll(source, value) {
    value = value.trim();
    if (value === "") {
        ['inpDec','inpBin','inpOct','inpHex'].forEach(id => document.getElementById(id).value = "");
        return;
    }
    
    let dec = 0;
    try {
        if (source === 'dec') dec = parseFloat(value);
        else if (source === 'bin') dec = parseInt(value, 2); 
        else if (source === 'oct') dec = parseInt(value, 8);
        else if (source === 'hex') dec = parseInt(value, 16);
    } catch (e) { return; }
    
    if (isNaN(dec)) return;

    if (source !== 'dec') document.getElementById('inpDec').value = dec;
    
    // دعم العرض المبسط للأعداد الصحيحة في المحول التعليمي
    if (source !== 'bin') document.getElementById('inpBin').value = Math.floor(dec).toString(2);
    if (source !== 'oct') document.getElementById('inpOct').value = Math.floor(dec).toString(8);
    if (source !== 'hex') document.getElementById('inpHex').value = Math.floor(dec).toString(16).toUpperCase();
}

function calcOp() {
    const aVal = document.getElementById('calcA').value.trim();
    const bVal = document.getElementById('calcB').value.trim();
    const op = document.getElementById('opSelect').value;

    if(/[^01]/.test(aVal) || /[^01]/.test(bVal) || aVal==="" || bVal==="") {
        alert("خطأ: الرجاء إدخال أرقام ثنائية صحيحة");
        return;
    }

    const numA = parseInt(aVal, 2);
    const numB = parseInt(bVal, 2);
    let res = 0;

    switch(op) {
        case "+": res = numA + numB; break;
        case "-": res = numA - numB; break;
        case "*": res = numA * numB; break;
        case "/": 
            if(numB === 0) { alert("Error"); return; }
            res = Math.floor(numA / numB);
            break;
    }

    document.getElementById('opResult').style.display = 'block';
    if (res < 0) {
        document.getElementById('resBin').innerText = "-" + Math.abs(res).toString(2);
    } else {
        document.getElementById('resBin').innerText = res.toString(2);
    }
    document.getElementById('resDec').innerText = res;
}
function updateComplements() {
    const val = document.getElementById('compInput').value.trim();
    if (val === "" || /[^01]/.test(val)) {
        document.getElementById('compOutput').style.display = 'none';
        return;
    }

    // 1's Complement
    let ones = "";
    for (let char of val) {
        ones += (char === '0' ? '1' : '0');
    }

    // 2's Complement (Manual Logic)
    let twos = "";
    let foundOne = false;
    for (let i = val.length - 1; i >= 0; i--) {
        if (!foundOne) {
            if (val[i] === '1') foundOne = true;
            twos = val[i] + twos;
        } else {
            twos = (val[i] === '0' ? '1' : '0') + twos;
        }
    }

    document.getElementById('compOutput').style.display = 'block';
    document.getElementById('out1s').innerText = ones;
    document.getElementById('out2s').innerText = twos;
}