// Мобильное меню
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.nav-toggle');
    const navList = document.querySelector('.nav-list');
    
    if (navToggle && navList) {
        navToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navList.classList.toggle('active');
        });
    }
    
    // Плавная прокрутка для якорей
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Закрываем мобильное меню, если оно открыто
                if (navToggle && navList) {
                    navToggle.classList.remove('active');
                    navList.classList.remove('active');
                }
            }
        });
    });
    
    // Закрытие модального окна при клике вне его
    const modal = document.getElementById('animal-modal');
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.style.display = 'none';
            }
        });
    }
});

// Функция для закрытия модального окна
function closeModal() {
    const modal = document.getElementById('animal-modal');
    if (modal) {
        modal.style.display = 'none';
    }
}