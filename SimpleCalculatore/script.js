const resultInput = document.getElementById('result');
const historyDiv = document.getElementById('history');
const buttons = document.querySelectorAll('.buttons button');

let currentInput = '';
let history = [];

// Function to load history from localStorage
function loadHistory() {
    const storedHistory = localStorage.getItem('calculatorHistory');
    if (storedHistory) {
        history = JSON.parse(storedHistory);
        updateHistory();
    }
}

// Function to save history to localStorage
function saveHistory() {
    localStorage.setItem('calculatorHistory', JSON.stringify(history));
}

function updateDisplay() {
    resultInput.value = currentInput;
}

function updateHistory() {
    historyDiv.textContent = history.join('\n');
}

function clear() {
    currentInput = '';
    updateDisplay();
}

function calculate() {
    try {
        const expression = currentInput.replace(/==/g, '===').replace(/!=/g, '!==');
        const result = eval(expression);

        if (isNaN(result) || !isFinite(result)) {
            throw new Error("Invalid calculation");
        }

        // Add to history
        history.push(`${currentInput} = ${result}`);
        while (history.length > 5) {
            history.shift();
        }
        updateHistory();
        saveHistory(); // Save history to localStorage

        currentInput = result.toString();
        updateDisplay();

    } catch (error) {
        currentInput = 'Error';
        updateDisplay();
        console.error("Calculation error:", error);
    }
}

function handleScientific(operation) {
    try {
        const num = parseFloat(currentInput);
        if (isNaN(num)) {
            throw new Error("Invalid input for scientific operation");
        }

        let result;
        switch (operation) {
            case 'sin': result = Math.sin(num); break;
            case 'cos': result = Math.cos(num); break;
            case 'tan': result = Math.tan(num); break;
            case 'log': result = Math.log10(num); break;
            case 'ln': result = Math.log(num); break;
            case 'sqrt': result = Math.sqrt(num); break;
            case 'x^y':
                currentInput += '^';
                updateDisplay();
                return;
            case 'n!':
                result = factorial(num);
                break;

            default: throw new Error("Unknown scientific operation");
        }

        currentInput = result.toString();
        updateDisplay();
    } catch (error) {
        currentInput = 'Error';
        updateDisplay();
        console.error("Scientific operation error:", error);
    }
}

function factorial(n) {
    if (n === 0) return 1;
    if (n < 0) return NaN;
    let result = 1;
    for (let i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
}

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const buttonText = button.textContent;

        if (buttonText === 'C') {
            clear();
        } else if (buttonText === '=') {
            calculate();
        } else if (button.classList.contains('scientific')) {
            handleScientific(buttonText);
        }
        else {
            currentInput += buttonText;
            updateDisplay();
        }
    });
});

// Load history on page load
loadHistory();