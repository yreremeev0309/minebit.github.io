// ========== MINEBIT SCRIPT ==========
const SERVER_IP = '37.9.15.81:32568';

// КОПИРОВАНИЕ IP
function copyIP() {
    navigator.clipboard.writeText(SERVER_IP).then(() => {
        const feedback = document.getElementById('copyFeedback');
        feedback.textContent = '✅ IP скопирован! Заходи на сервер!';
        feedback.classList.add('show');
        
        setTimeout(() => {
            feedback.classList.remove('show');
        }, 3000);
    }).catch(err => {
        console.error('Ошибка копирования:', err);
        alert('Не удалось скопировать IP. Вручную: ' + SERVER_IP);
    });
}

// СТАТУС СЕРВЕРА (ONLINE ПО УМОЛЧАНИЮ)
function checkServerStatus() {
    const statusDot = document.querySelector('.status-dot');
    const statusText = document.getElementById('status-text');
    
    statusDot.classList.add('online');
    statusDot.classList.remove('offline');
    statusText.textContent = 'Сервер ONLINE • 24/7';
}

// ЗАГРУЗКА
window.onload = function() {
    checkServerStatus();
    document.body.style.opacity = '1';
};