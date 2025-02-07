class Calculator {
    constructor() {
        this.display = document.querySelector('.calculator__input');
        this.historyDisplay = document.querySelector('.calculator__history');
        this.buttons = document.querySelector('.calculator__buttons');
        
        this.currentOperand = '0';
        this.previousOperand = '';
        this.operation = undefined;
        this.shouldResetScreen = false;
        
        this.init();
        this.loadFromLocalStorage();
    }

    init() {
        this.buttons.addEventListener('click', (e) => {
            if (!e.target.matches('button')) return;

            const button = e.target;
            const digit = button.dataset.digit;
            const operator = button.dataset.operator;
            const action = button.dataset.action;

            if (digit) this.appendDigit(digit);
            if (operator) this.handleOperator(operator);
            if (action) this.handleAction(action);

            this.saveToLocalStorage();
        });
    }

    appendDigit(digit) {
        if (this.shouldResetScreen) {
            this.currentOperand = '';
            this.shouldResetScreen = false;
        }

        if (digit === '.' && this.currentOperand.includes('.')) return;
        if (this.currentOperand === '0' && digit !== '.') {
            this.currentOperand = digit;
        } else {
            this.currentOperand += digit;
        }
        this.updateDisplay();
    }

    handleOperator(operator) {
        if (this.currentOperand === '') return;
        if (this.previousOperand !== '') {
            this.calculate();
        }
        
        this.operation = operator;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
        this.updateDisplay();
    }

    handleAction(action) {
        switch (action) {
            case 'clear':
                this.clear();
                break;
            case 'delete':
                this.delete();
                break;
            case 'calculate':
                this.calculate();
                break;
            case 'power':
                this.handleOperator('^');
                break;
        }
    }

    calculate() {
        if (this.operation === undefined || this.previousOperand === '') return;

        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        let result;

        switch (this.operation) {
            case '+':
                result = prev + current;
                break;
            case '-':
                result = prev - current;
                break;
            case '*':
                result = prev * current;
                break;
            case '/':
                if (current === 0) {
                    alert('Деление на ноль невозможно');
                    this.clear();
                    return;
                }
                result = prev / current;
                break;
            case '^':
                result = Math.pow(prev, current);
                break;
        }

        this.currentOperand = result.toString();
        this.operation = undefined;
        this.previousOperand = '';
        this.shouldResetScreen = true;
        this.updateDisplay();
    }

    clear() {
        this.currentOperand = '0';
        this.previousOperand = '';
        this.operation = undefined;
        this.updateDisplay();
    }

    delete() {
        if (this.currentOperand.length === 1) {
            this.currentOperand = '0';
        } else {
            this.currentOperand = this.currentOperand.slice(0, -1);
        }
        this.updateDisplay();
    }

    updateDisplay() {
        this.display.textContent = this.currentOperand;
        if (this.previousOperand) {
            this.historyDisplay.textContent = `${this.previousOperand} ${this.operation}`;
        } else {
            this.historyDisplay.textContent = '';
        }
    }

    saveToLocalStorage() {
        const calculatorState = {
            currentOperand: this.currentOperand,
            previousOperand: this.previousOperand,
            operation: this.operation
        };
        localStorage.setItem('calculatorState', JSON.stringify(calculatorState));
    }

    loadFromLocalStorage() {
        const savedState = localStorage.getItem('calculatorState');
        if (savedState) {
            const state = JSON.parse(savedState);
            this.currentOperand = state.currentOperand;
            this.previousOperand = state.previousOperand;
            this.operation = state.operation;
            this.updateDisplay();
        }
    }
}

// Инициализация калькулятора
const calculator = new Calculator();
