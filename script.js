// وظيفة إظهار القسم المحدد
function showSection(sectionId) {
    // إخفاء جميع الأقسام
    const sections = document.querySelectorAll('.section');
    sections.forEach((section) => {
        section.classList.remove('active');
    });

    // إظهار القسم المطلوب
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
    }
}


// إخفاء رسالة الترحيب بعد 5 ثوانٍ
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        const welcomeMessage = document.getElementById('welcome-message');
        if (welcomeMessage) {
            welcomeMessage.style.display = 'none';
        }
    }, 5000);
});
