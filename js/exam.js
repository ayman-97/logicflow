// js/exam.js

Object.assign(window.topicsData, {
    "final_exam": {
        title: "🎓 الاختبار النهائي الشامل",
        content: `
            <h3>هل أنت جاهز للتحدي؟</h3>
            <p>يتكون هذا الاختبار من أسئلة تغطي كافة مواضيع المنهج (الأنظمة العددية، البوابات، كارنوف، الدوائر التوافقية والتتابعية).</p>
            <div class="note-box">
                <strong>تعليمات:</strong> اختر الإجابة الصحيحة لكل سؤال، ثم اضغط على زر "تسليم الإجابة" في الأسفل لمعرفة نتيجتك.
            </div>
            <hr>
        `,
        toolHTML: `
            <div id="quizContainer" class="simulator-box" style="text-align:right; direction:rtl;">
                </div>
            <div style="text-align:center; margin-top:20px;">
                <button class="circuit-btn" onclick="submitExam()" style="background:#27ae60; width:200px; font-size:1.2em;">تسليم الإجابة 📝</button>
                <div id="examResult" style="margin-top:20px; font-weight:bold; font-size:1.5em; color:#2c3e50;"></div>
            </div>
        `
    }
});

// =================================================================
// محرك الاختبار (Quiz Engine)
// =================================================================

const questions = [
    {
        q: "1. ما هو المكافئ الثنائي للرقم العشري (5)؟",
        options: ["100", "101", "110", "111"],
        ans: 1 // الإجابة الصحيحة هي الاندكس 1 (101)
    },
    {
        q: "2. أي بوابة منطقية تمثل عملية 'الضرب' (Multiplication)؟",
        options: ["OR", "NOT", "AND", "XOR"],
        ans: 2
    },
    {
        q: "3. في خريطة كارنوف، ما هو عدد الخلايا لمجموعة مكونة من 3 متغيرات؟",
        options: ["4 خلايا", "6 خلايا", "8 خلايا", "16 خلية"],
        ans: 2
    },
    {
        q: "4. معادلة SOP تعتمد على تجميع...؟",
        options: ["الأصفار (Zeros)", "الواحدات (Ones)", "حالات Don't Care فقط", "لا شيء مما ذكر"],
        ans: 1
    },
    {
        q: "5. ما هي البوابة التي تخرج (1) فقط إذا كانت المداخل مختلفة؟",
        options: ["AND", "XNOR", "XOR", "NAND"],
        ans: 2
    },
    {
        q: "6. الجامع الكامل (Full Adder) له ... مداخل.",
        options: ["مدخل واحد", "مدخلين (A, B)", "3 مداخل (A, B, Cin)", "4 مداخل"],
        ans: 2
    },
    {
        q: "7. أي دائرة تسمى 'مختار البيانات' (Data Selector)؟",
        options: ["Decoder", "Encoder", "Multiplexer (MUX)", "Counter"],
        ans: 2
    },
    {
        q: "8. ما هو الفرق الرئيسي بين الدوائر التوافقية والتتابعية؟",
        options: ["التتابعية تحتوي على ذاكرة (Memory)", "التوافقية تحتوي على ذاكرة", "لا يوجد فرق", "التتابعية أسرع"],
        ans: 0
    },
    {
        q: "9. متى يغير D Flip-Flop مخرجاته؟",
        options: ["عندما تتغير D فوراً", "عند وصول نبضة الساعة (Clock Edge)", "عشوائياً", "دائماً ثابت"],
        ans: 1
    },
    {
        q: "10. الذاكرة التي تفقد بياناتها عند انقطاع التيار تسمى:",
        options: ["ROM", "Flash", "Volatile (مثل RAM)", "Non-Volatile"],
        ans: 2
    }
];

// دالة رسم الأسئلة عند تحميل الصفحة
// سنستخدم خدعة صغيرة: ننتظر حتى يتم تحميل المحتوى ثم ننفذ الرسم
setTimeout(() => {
    // هذه الدالة ستستدعى يدوياً أو تلقائياً عند فتح صفحة الامتحان
    if(window.renderQuiz) window.renderQuiz();
}, 1000);

window.renderQuiz = function() {
    const container = document.getElementById('quizContainer');
    if(!container) return; // لم يتم فتح صفحة الامتحان بعد

    let html = "";
    questions.forEach((item, index) => {
        html += `
            <div class="question-box" id="qBox${index}">
                <div class="question-title">${item.q}</div>
                <div class="options-grid">
                    ${item.options.map((opt, i) => `
                        <label class="option-label">
                            <input type="radio" name="q${index}" value="${i}">
                            <span>${opt}</span>
                        </label>
                    `).join('')}
                </div>
                <div class="feedback" id="feedback${index}"></div>
            </div>
        `;
    });
    container.innerHTML = html;
}

// دالة التصحيح
window.submitExam = function() {
    let score = 0;
    let total = questions.length;

    questions.forEach((item, index) => {
        const selected = document.querySelector(`input[name="q${index}"]:checked`);
        const feedback = document.getElementById(`feedback${index}`);
        const box = document.getElementById(`qBox${index}`);

        if (!selected) {
            feedback.innerHTML = "<span style='color:#e74c3c'>لم يتم الإجابة!</span>";
            box.style.borderRight = "5px solid #e74c3c";
        } else {
            const val = parseInt(selected.value);
            if (val === item.ans) {
                score++;
                feedback.innerHTML = "<span style='color:#27ae60'>✅ إجابة صحيحة</span>";
                box.style.borderRight = "5px solid #27ae60";
            } else {
                feedback.innerHTML = `<span style='color:#c0392b'>❌ خطأ. الإجابة الصحيحة: ${item.options[item.ans]}</span>`;
                box.style.borderRight = "5px solid #c0392b";
            }
        }
    });

    // حساب النسبة
    let percent = Math.round((score / total) * 100);
    let msg = "";
    if(percent >= 90) msg = "ممتاز! أنت مهندس رقمي محترف 🥇";
    else if(percent >= 75) msg = "جيد جداً! 🥈";
    else if(percent >= 50) msg = "جيد، لكن تحتاج للمراجعة 🥉";
    else msg = "حاول مرة أخرى، لا تيأس! 💪";

    document.getElementById('examResult').innerHTML = `النتيجة: ${score} من ${total} (${percent}%) <br> <small>${msg}</small>`;
    
    // تمرير الشاشة للأسفل لرؤية النتيجة
    document.getElementById('examResult').scrollIntoView({behavior: "smooth"});
}

// استدعاء دالة الرسم عند فتح الموضوع
// نقوم بربط الدالة بحدث تحميل الموضوع في main.js (أو نستدعيها ببساطة عند النقر)
// الحل الأبسط: أضفنا استدعاء renderQuiz داخل topicsData.toolHTML عبر وسم script، لكن بما أن innerHTML لا ينفذ السكربت،
// سنعتمد على استدعاء الدالة عند الضغط على الزر في القائمة، أو استخدام MutationObserver.
// الحل الفعال هنا: عدل دالة loadTopic في main.js لتستدعي renderQuiz إذا كان الموضوع هو final_exam.