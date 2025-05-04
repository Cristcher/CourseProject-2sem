document.addEventListener('DOMContentLoaded', function() {
    // Загрузка данных из XML
    loadAnimals();
    
    // Фильтрация животных
    setupFilters();
});

function loadAnimals() {
    const container = document.getElementById('animals-container');
    const loading = document.getElementById('loading');
    const noResults = document.getElementById('no-results');
    
    // Показываем индикатор загрузки
    loading.style.display = 'block';
    container.innerHTML = '';
    noResults.style.display = 'none';
    
    // Загружаем XML файл
    fetch('data/animals.xml')
        .then(response => response.text())
        .then(str => (new window.DOMParser()).parseFromString(str, "text/xml"))
        .then(data => {
            const animals = data.querySelectorAll('animal');
            displayAnimals(animals);
        })
        .catch(error => {
            console.error('Error loading animals:', error);
            loading.style.display = 'none';
            noResults.style.display = 'block';
            noResults.innerHTML = '<p>Произошла ошибка при загрузке данных. Пожалуйста, попробуйте позже.</p>';
        });
}

function displayAnimals(animals) {
    const container = document.getElementById('animals-container');
    const loading = document.getElementById('loading');
    const noResults = document.getElementById('no-results');
    
    container.innerHTML = '';
    
    if (animals.length === 0) {
        noResults.style.display = 'block';
        loading.style.display = 'none';
        return;
    }
    
    animals.forEach(animal => {
        const id = animal.querySelector('id').textContent;
        const name = animal.querySelector('name').textContent;
        const type = animal.querySelector('type').textContent;
        const breed = animal.querySelector('breed').textContent;
        const age = animal.querySelector('age').textContent;
        const size = animal.querySelector('size').textContent;
        const status = animal.querySelector('status').textContent;
        const description = animal.querySelector('description').textContent;
        const image = animal.querySelector('image').textContent;
        
        const card = document.createElement('div');
        card.className = 'animal-card';
        card.dataset.id = id;
        card.dataset.type = type;
        card.dataset.age = getAgeGroup(parseInt(age));
        card.dataset.size = size;
        card.dataset.status = status;
        
        card.innerHTML = `
            <img src="${image}" alt="${name}" class="animal-image" loading="lazy">
            <div class="animal-content">
                <h3>${name}</h3>
                <div class="animal-meta">
                    <span>${type === 'dog' ? 'Собака' : 'Кошка'}, ${age} ${getAgeSuffix(parseInt(age))}</span>
                    <span class="animal-status ${status}">${status === 'available' ? 'Ищет дом' : 'Усыновлен'}</span>
                </div>
                <p class="animal-description">${description}</p>
                <button class="btn-details" onclick="displayanimals(animals)">Забрать</button>
            </div>
        `;
        
        container.appendChild(card);
    });
    
    loading.style.display = 'none';
}

function getAgeGroup(age) {
    if (age < 1) return 'young';
    if (age <= 5) return 'adult';
    return 'senior';
}

function getAgeSuffix(age) {
    const lastDigit = age % 10;
    const lastTwoDigits = age % 100;
    
    if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
        return 'лет';
    }
    
    switch (lastDigit) {
        case 1: return 'год';
        case 2:
        case 3:
        case 4: return 'года';
        default: return 'лет';
    }
}

function setupFilters() {
    const typeFilter = document.getElementById('type-filter');
    const ageFilter = document.getElementById('age-filter');
    const sizeFilter = document.getElementById('size-filter');
    const statusFilter = document.getElementById('status-filter');
    const resetButton = document.getElementById('reset-filters');
    
    [typeFilter, ageFilter, sizeFilter, statusFilter].forEach(filter => {
        filter.addEventListener('change', filterAnimals);
    });
    
    if (resetButton) {
        resetButton.addEventListener('click', function() {
            typeFilter.value = 'all';
            ageFilter.value = 'all';
            sizeFilter.value = 'all';
            statusFilter.value = 'available';
            filterAnimals();
        });
    }
}

function filterAnimals() {
    const typeValue = document.getElementById('type-filter').value;
    const ageValue = document.getElementById('age-filter').value;
    const sizeValue = document.getElementById('size-filter').value;
    const statusValue = document.getElementById('status-filter').value;
    
    const cards = document.querySelectorAll('.animal-card');
    let visibleCount = 0;
    
    cards.forEach(card => {
        const typeMatch = typeValue === 'all' || card.dataset.type === typeValue;
        const ageMatch = ageValue === 'all' || card.dataset.age === ageValue;
        const sizeMatch = sizeValue === 'all' || card.dataset.size === sizeValue;
        const statusMatch = statusValue === 'all' || card.dataset.status === statusValue;
        
        if (typeMatch && ageMatch && sizeMatch && statusMatch) {
            card.style.display = 'block';
            visibleCount++;
        } else {
            card.style.display = 'none';
        }
    });
    
    const noResults = document.getElementById('no-results');
    if (visibleCount === 0) {
        noResults.style.display = 'block';
    } else {
        noResults.style.display = 'none';
    }
}

function displayAnimals(animals) {
    const container = document.getElementById('animals-container');
    const loading = document.getElementById('loading');
    const noResults = document.getElementById('no-results');
    
    container.innerHTML = '';
    
    if (animals.length === 0) {
        noResults.style.display = 'block';
        loading.style.display = 'none';
        return;
    }
    
    animals.forEach(animal => {
        const id = animal.querySelector('id').textContent;
        const name = animal.querySelector('name').textContent;
        const type = animal.querySelector('type').textContent;
        const breed = animal.querySelector('breed').textContent;
        const age = animal.querySelector('age').textContent;
        const size = animal.querySelector('size').textContent;
        const status = animal.querySelector('status').textContent;
        const description = animal.querySelector('description').textContent;
        const image = animal.querySelector('image').textContent;
        
        const card = document.createElement('div');
        card.className = 'animal-card';
        card.dataset.id = id;
        card.dataset.type = type;
        card.dataset.age = getAgeGroup(parseInt(age));
        card.dataset.size = size;
        card.dataset.status = status;
        
        card.innerHTML = `
            <img src="${image}" alt="${name}" class="animal-image" loading="lazy">
            <div class="animal-content">
                <h3>${name}</h3>
                <div class="animal-meta">
                    <span>${type === 'dog' ? 'Собака' : 'Кошка'}, ${age} ${getAgeSuffix(parseInt(age))}</span>
                    <span class="animal-status ${status}">${status === 'available' ? 'Ищет дом' : 'Усыновлен'}</span>
                </div>
                <p class="animal-description">${description}</p>
                <button class="btn-details" data-id="${id}" data-name="${name}">Забрать</button>
            </div>
        `;
        
        container.appendChild(card);
    });
    
    // Добавляем обработчики для кнопок "Забрать"
    document.querySelectorAll('.btn-details').forEach(button => {
        button.addEventListener('click', function() {
            const animalId = this.getAttribute('data-id');
            const animalName = this.getAttribute('data-name');
            openAdoptionModal(animalId, animalName);
        });
    });
    
    loading.style.display = 'none';
}

// Функция для открытия модального окна
function openAdoptionModal(animalId, animalName) {
    const modal = document.getElementById('adoption-modal');
    const modalTitle = modal.querySelector('h2');
    const animalIdInput = modal.querySelector('#animal-id');
    
    modalTitle.textContent = `Забрать ${animalName}`;
    animalIdInput.value = animalId;
    modal.style.display = 'block';
    
    // Закрытие при клике на крестик
    modal.querySelector('.close-modal').addEventListener('click', () => {
        modal.style.display = 'none';
    });
    
    // Закрытие при клике вне модального окна
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
}

// Обработчик отправки формы
document.getElementById('adoption-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const animalId = formData.get('animal-id');
    
    // Здесь можно добавить AJAX-запрос для отправки данных на сервер
    alert(`Заявка на животное с ID ${animalId} отправлена! Мы свяжемся с вами в ближайшее время.`);
    
    // Закрываем модальное окно
    document.getElementById('adoption-modal').style.display = 'none';
    
    // Очищаем форму
    this.reset();
});

function getSizeText(size) {
    switch (size) {
        case 'small': return 'Маленький';
        case 'medium': return 'Средний';
        case 'large': return 'Крупный';
        default: return size;
    }
}

