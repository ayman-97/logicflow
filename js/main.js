// js/main.js

// دالة تحميل المحتوى
function loadTopic(topicId) {
    const mainContent = document.getElementById('main-content');
    const topic = window.topicsData[topicId];

    if (topic) {
        mainContent.innerHTML = `
            <div class="topic-header">
                <h1>${topic.title}</h1>
            </div>
            <div class="content-body">
                ${topic.content}
            </div>
            ${topic.toolHTML ? `<div class="interactive-tool">${topic.toolHTML}</div>` : ''}
        `;
        
        // إعادة تهيئة المخرجات إذا كانت الصفحة تحتوي على محاكيات
        if(document.getElementById('gateSelector')) window.updateGateSim();
        if(document.getElementById('univSelector')) window.updateUnivSim();
        
    } else {
        mainContent.innerHTML = `
            <div style="text-align:center; padding:50px; color:#7f8c8d;">
                <h2>🚧 جاري العمل...</h2>
                <p>لم يتم إضافة محتوى هذا الدرس بعد.</p>
            </div>
        `;
    }

    // إغلاق القائمة في الجوال (اختياري)
    if (window.innerWidth <= 768) {
        document.querySelector('.sidebar').classList.remove('active');
    }

    // 🔥 أضف هذا السطر الجديد في نهاية الدالة 🔥
    if (topicId === 'final_exam' && window.renderQuiz) {
        window.renderQuiz();
    }
}

// تحميل الصفحة الافتراضية
window.onload = function() {
    loadTopic('num_systems');
};