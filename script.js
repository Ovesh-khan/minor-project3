document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    const keys = document.querySelectorAll('.key');
    let currentInput = '0';
    let operator = '';
    let firstOperand = null;
    let shouldResetDisplay = false;
    let string='';

    keys.forEach(key => {
        key.addEventListener('click', () => {
            const keyContent = key.textContent;
            const action = key.dataset.action;

            if (!action) {
                if (currentInput === '0' || shouldResetDisplay) {
                    currentInput = keyContent;
                    shouldResetDisplay = false;
                } else {
                    currentInput += keyContent;
                }
                display.textContent = currentInput ;
            }

            if (action === 'operator') {
                if (firstOperand === null) {
                    firstOperand = parseFloat(currentInput);
                } else if (operator) {
                    firstOperand = calculate(firstOperand, operator, parseFloat(currentInput));
                    display.textContent = firstOperand;
                }
                operator = keyContent;
                shouldResetDisplay = true;

            }

            if (key.id === 'equals') {
                if (firstOperand !== null && operator) {
                    currentInput = calculate(firstOperand, operator, parseFloat(currentInput)).toString();
                    display.textContent = currentInput;
                    firstOperand = null;
                    operator = '';
                }
            }

            if (key.id === 'clear') {
                currentInput = '0';
                display.textContent = currentInput;
                firstOperand = null;
                operator = '';
            }

            if (key.id === 'backspace') {
                currentInput = currentInput.slice(0, -4) || '0';
                display.textContent = currentInput;
            }
        });
    });

    function calculate(firstOperand, operator, secondOperand) {
        switch (operator) {
            case '+':
                return firstOperand + secondOperand;
            case '-':
                return firstOperand - secondOperand;
            case 'x':
                return firstOperand * secondOperand;
            case '/':
                return firstOperand / secondOperand;
            default:
                return secondOperand;
        }
    }
});
