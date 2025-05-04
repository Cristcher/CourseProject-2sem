document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    const formSuccess = document.createElement('div');
    formSuccess.className = 'form-success-message';
    formSuccess.style.display = 'none';
    formSuccess.textContent = 'Спасибо за сообщение!';
    contactForm.parentNode.insertBefore(formSuccess, contactForm.nextSibling);

    // Стили для сообщения (можно вынести в CSS)
    formSuccess.style.cssText = `
        display: none;
        padding: 15px;
        margin-top: 20px;
        background-color: #4CAF50;
        color: white;
        text-align: center;
        border-radius: 4px;
        animation: fadeIn 0.5s;
    `;

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Валидация формы
        let isValid = true;
        
        // Проверка обязательных полей
        const requiredFields = contactForm.querySelectorAll('[required]');
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.nextElementSibling.textContent = 'Это поле обязательно для заполнения';
                field.style.borderColor = '#ff4444';
            } else {
                field.nextElementSibling.textContent = '';
                field.style.borderColor = '#ddd';
            }
        });
        
        // Проверка email
        const emailField = contactForm.querySelector('#email');
        if (emailField.value && !isValidEmail(emailField.value)) {
            isValid = false;
            emailField.nextElementSibling.textContent = 'Пожалуйста, введите корректный email';
            emailField.style.borderColor = '#ff4444';
        }
        
        if (isValid) {
            contactForm.style.display = 'none';
            
            // Показываем сообщение
            formSuccess.style.display = 'block';
            
            // Через 5 секунд возвращаем форму
            setTimeout(() => {
                formSuccess.style.display = 'none';
                contactForm.style.display = 'block';
                contactForm.reset();
            }, 5000);
        }
    });
    
    // Функция проверки email
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
});