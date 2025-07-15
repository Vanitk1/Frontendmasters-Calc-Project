const topBar = document.querySelector(".top-bar")

let currentInput = '';
let previousInput = '';
let operator = null;

function updateDisplay(value) {
    topBar.textContent = value || 0;
}

function add(a, b) {
    return a + b
}

function divide(a, b) {
   return a / b
}

function times(a, b) {
    return a * b
}

function minus(a, b) {
    return a - b
}

function operate(a, b, op) {
    a = parseFloat(a);
    b = parseFloat(b);

    switch (op) {
        case '+': return add(a, b);
        case '-': return minus(a, b);
        case '*': return times(a, b);
        case '/': return divide(a, b);
        case '%': return b === 0 ? 'Error' : a % b;
        default: return b;
    }
}

function handleButtonClick(value) {
    if (!isNaN(value) || value === '.') {
        currentInput += value;
        updateDisplay(currentInput);
    } else if (['+', '-', '*', '/', '%'].includes(value)) {
        if (currentInput === '') return;
        if (previousInput && operator) {
            const result = operate(previousInput, currentInput, operator);
            previousInput = result;
            updateDisplay(result);
        } else {
            previousInput = currentInput;
        }
        currentInput = '';
        operator = value;
    } else if (value === '=') {
        if (previousInput && currentInput && operator) {
            const result = operate(previousInput, currentInput, operator);
            updateDisplay(result);
            currentInput = result.toString();
            previousInput = '';
            operator = null;
        }
    } else if (value === 'C') {
        currentInput = '';
        previousInput = '';
        operator = null;
        updateDisplay('0');
    } else if (value === '←') {
        currentInput = currentInput.slice(0, -1);
        updateDisplay(currentInput);
    }
}

document.querySelectorAll('.calc-container button').forEach(button => {
    const value = button.textContent;

    button.addEventListener('click', () => {
        handleButtonClick(value);
    });
});