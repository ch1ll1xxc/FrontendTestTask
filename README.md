# Веб-калькулятор

Проект веб-калькулятора, разработанный в рамках тестового задания курса React+Vue.js. Калькулятор поддерживает базовые математические операции и работу со степенями.

## 🔗 Демо
- [Живая демонстрация](https://ch1ll1xxc.github.io/FrontendTestTask/)
- [GitHub репозиторий](https://github.com/ch1ll1xxc/FrontendTestTask)

## 🚀 Функциональность

### Математические операции
- Сложение (+)
- Вычитание (-)
- Умножение (×)
- Деление (÷)
- Возведение в степень (^)

### Дополнительные возможности
- История операций
- Сохранение состояния при перезагрузке страницы
- Очистка всего выражения (C)
- Удаление последнего символа (⌫)
- Работа с десятичными числами
- Защита от деления на ноль

## 🛠️ Технологии

- **HTML5** - семантическая структура
- **CSS3**
  - Flexbox для центрирования
  - Grid для расположения кнопок
  - Адаптивный дизайн
  - Анимации при наведении
- **JavaScript (ES6+)**
  - ООП подход
  - Работа с DOM
  - LocalStorage API
- **Git** - система контроля версий

## 📁 Структура проекта
- calculator/
- ├── index.html # Основной HTML файл
- ├── styles/
- │   └── style.css # Стили приложения
- ├── scripts/
- │   └── calculator.js # JavaScript логика
- └── README.md # Документация

## 🎯 Основные особенности реализации

- Использование классов ES6 для организации кода
- Сохранение состояния калькулятора в LocalStorage
- Адаптивный дизайн для всех устройств
- Обработка краевых случаев (деление на ноль, множественные точки)
- Поддержка клавиатурного ввода

## 🚦 Запуск проекта локально

1. Клонируйте репозиторий:
```bash
bash
git clone https://github.com/ch1ll1xxc/FrontendTestTask.git
```
2. Перейдите в директорию проекта:
```bash
cd FrontendTestTask
```

3. Откройте `index.html` в вашем браузере

## 📱 Поддержка браузеров

- Google Chrome (последние версии)
- Mozilla Firefox (последние версии)
- Microsoft Edge (последние версии)
- Safari (последние версии)

## 🔄 Процесс разработки

Проект разрабатывался с использованием следующего процесса:
1. Создание базовой HTML структуры
2. Стилизация с помощью CSS
3. Реализация JavaScript логики
4. Тестирование и отладка
5. Деплой на GitHub Pages

### 📝 Подробная реализация JavaScript (calculator.js)
#### Архитектура
Калькулятор реализован с использованием ООП подхода в виде класса `Calculator`. Это обеспечивает инкапсуляцию данных и методов, а также упрощает поддержку кода.

#### Основные свойства класса
```javascript
class Calculator {
constructor() {
this.currentOperand = '0'; // Текущее число
this.previousOperand = ''; // Предыдущее число
this.operation = undefined; // Текущая операция
this.shouldResetScreen = false; // Флаг сброса экрана
}
```

#### Методы класса
**Обработка ввода**
- `appendDigit(digit)`: Добавляет цифру или десятичную точку
  - Предотвращает множественные десятичные точки
  - Обрабатывает начальный ноль

- `handleOperator(operator)`: Обработка математических операторов
  - Выполняет предыдущую операцию если она существует
  - Сохраняет текущее число как предыдущее

- `handleAction(action)`: Обработка специальных действий
  - clear: Полная очистка калькулятора
  - delete: Удаление последнего символа
  - calculate: Вычисление результата
  - power: Возведение в степень

**Вычисления**
- `calculate()`: Выполняет математические операции
  - Поддерживает: +, -, *, /, ^
  - Включает защиту от деления на ноль
  - Автоматически форматирует результат

**Управление отображением**
- `updateDisplay()`: Обновляет UI калькулятора
  - Отображает текущее число
  - Показывает историю операций
  
**Сохранение состояния**
- `saveToLocalStorage()`: Сохраняет текущее состояние
  - Сохраняет операнды и операцию
  - Вызывается после каждого действия
  
- `loadFromLocalStorage()`: Загружает сохранённое состояние
  - Восстанавливает предыдущие вычисления
  - Вызывается при инициализации

#### Обработка событий
```javascript
init() {
this.buttons.addEventListener('click', (e) => {
if (!e.target.matches('button')) return;
const button = e.target;
const digit = button.dataset.digit;
const operator = button.dataset.operator;
const action = button.dataset.action;
// Маршрутизация действий
if (digit) this.appendDigit(digit);
if (operator) this.handleOperator(operator);
if (action) this.handleAction(action);
this.saveToLocalStorage();
});
}
```

#### Особенности реализации
1. **Защита от ошибок**
   - Проверка деления на ноль
   - Валидация десятичных точек
   - Обработка пустых операндов

2. **Сохранение состояния**
   - Автоматическое сохранение после каждой операции
   - Восстановление состояния при перезагрузке

3. **Удобство использования**
   - История операций
   - Возможность отмены последнего действия
   - Полная очистка калькулятора

4. **Расширяемость**
   - Модульная структура
   - Легкое добавление новых операций
   - Возможность модификации UI

## 🧪 Тестирование

Проект протестирован на следующих сценариях:
- Базовые математические операции
- Граничные случаи (деление на ноль)
- Сохранение состояния
- Адаптивность на различных устройствах
