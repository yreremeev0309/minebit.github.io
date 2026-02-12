// IP сервера
const SERVER_IP = '37.9.15.81:32568';

// Копирование IP
function copyIP() {
    navigator.clipboard.writeText(SERVER_IP).then(() => {
        const feedback = document.getElementById('copyFeedback');
        feedback.textContent = '✅ IP скопирован! Заходи на сервер!';
        feedback.classList.add('show');
        
        setTimeout(() => {
            feedback.classList.remove('show');
        }, 3000);
    }).catch(() => {
        alert('Не удалось скопировать IP. Ручной ввод: ' + SERVER_IP);
    });
}

// Переключение вкладок
function switchTab(tabName) {
    // Скрываем все вкладки
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => tab.classList.remove('active'));
    
    // Убираем активный класс у всех кнопок
    const navTabs = document.querySelectorAll('.nav-tab');
    navTabs.forEach(tab => tab.classList.remove('active'));
    
    // Показываем выбранную вкладку
    const activeTab = document.getElementById(`tab-${tabName}`);
    if (activeTab) activeTab.classList.add('active');
    
    // Активируем кнопку
    const activeButton = Array.from(navTabs).find(tab => 
        tab.textContent.toLowerCase().includes(tabName)
    );
    if (activeButton) activeButton.classList.add('active');
}

// Проверка статуса сервера
function checkServerStatus() {
    const statusDot = document.getElementById('statusDot');
    const statusText = document.getElementById('statusText');
    const onlineElement = document.getElementById('onlinePlayers');
    
    fetch(`https://api.mcsrvstat.us/2/37.9.15.81:32568`)
        .then(response => response.json())
        .then(data => {
            if (data.online) {
                statusDot.style.background = '#ffaa00';
                statusDot.style.boxShadow = '0 0 20px #ffaa00';
                statusText.textContent = `ОНЛАЙН • ${data.players?.online || 0}/${data.players?.max || 100}`;
                if (onlineElement) {
                    onlineElement.textContent = data.players?.online || 0;
                }
            } else {
                statusDot.style.background = '#e74c3c';
                statusDot.style.boxShadow = '0 0 20px #e74c3c';
                statusText.textContent = 'ОФФЛАЙН';
                if (onlineElement) onlineElement.textContent = '0';
            }
        })
        .catch(() => {
            statusDot.style.background = '#95a5a6';
            statusDot.style.boxShadow = 'none';
            statusText.textContent = 'Нет данных';
            if (onlineElement) onlineElement.textContent = '?';
        });
}

// Загрузка страницы
window.onload = function() {
    checkServerStatus();
    setInterval(checkServerStatus, 60000);
    
    // Проверяем, что активна главная вкладка
    const activeTab = document.querySelector('.tab-content.active');
    if (!activeTab) {
        document.getElementById('tab-home')?.classList.add('active');
    }
};
