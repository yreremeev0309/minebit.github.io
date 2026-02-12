// IP сервера
const SERVER_IP = '37.9.15.81:32568';

// Копирование IP
function copyIP() {
    navigator.clipboard.writeText(SERVER_IP).then(() => {
        const feedback = document.getElementById('copyFeedback');
        feedback.textContent = '✅ IP СКОПИРОВАН!';
        feedback.classList.add('show');
        setTimeout(() => feedback.classList.remove('show'), 2000);
    });
}

// Навигация по вкладкам
document.addEventListener('DOMContentLoaded', function() {
    const navButtons = document.querySelectorAll('.nav-btn');
    const tabs = document.querySelectorAll('.tab');

    navButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            // Убираем активный класс у всех
            navButtons.forEach(b => b.classList.remove('active'));
            tabs.forEach(t => t.classList.remove('active'));

            // Активируем текущую кнопку
            this.classList.add('active');

            // Активируем соответствующую вкладку
            const tabId = this.dataset.tab;
            document.getElementById(tabId).classList.add('active');
        });
    });

    // Статус сервера
    function updateServerStatus() {
        const indicator = document.getElementById('statusIndicator');
        const statusText = document.getElementById('statusText');
        const onlineCount = document.getElementById('onlineCount');
        const playersOnline = document.getElementById('playersOnline');

        fetch('https://api.mcsrvstat.us/2/37.9.15.81:32568')
            .then(res => res.json())
            .then(data => {
                if (data.online) {
                    indicator.style.background = '#ff8800';
                    indicator.style.boxShadow = '0 0 20px #ff8800';
                    statusText.textContent = 'ОНЛАЙН';
                    const count = data.players?.online || 0;
                    onlineCount.textContent = count;
                    if (playersOnline) playersOnline.textContent = count;
                } else {
                    indicator.style.background = '#e74c3c';
                    indicator.style.boxShadow = '0 0 20px #e74c3c';
                    statusText.textContent = 'ОФФЛАЙН';
                    onlineCount.textContent = '0';
                    if (playersOnline) playersOnline.textContent = '0';
                }
            })
            .catch(() => {
                indicator.style.background = '#95a5a6';
                indicator.style.boxShadow = 'none';
                statusText.textContent = 'ОШИБКА';
                onlineCount.textContent = '?';
                if (playersOnline) playersOnline.textContent = '?';
            });
    }

    updateServerStatus();
    setInterval(updateServerStatus, 60000);
});
