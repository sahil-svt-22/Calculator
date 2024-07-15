const display = document.getElementById('display');
const history = document.getElementById('history');
const buttons = document.querySelectorAll('.btn');
let lastWasEval = false;

buttons.forEach(button => {
    button.addEventListener('click', () => {
        handleInput(button.value, button.id);
    });
});

document.addEventListener('keydown', (event) => {
    const key = event.key;
    if (key === 'Enter') {
        handleInput('=', 'equal');
    } else if (key === 'Backspace') {
        handleInput('', 'delete');
    } else if (key === 'Escape') {
        handleInput('', 'clear');
    } else if ('0123456789+-*/.'.includes(key)) {
        handleInput(key);
    }
});

function handleInput(value, id) {
    if (id === 'clear') {
        display.innerText = '0';
        history.innerHTML = '';
        lastWasEval = false;
    } else if (id === 'delete') {
        display.innerText = display.innerText.slice(0, -1) || '0';
        lastWasEval = false;
    } else if (value === '=') {
        try {
            const result = eval(display.innerText);
            history.innerHTML += `<div>${display.innerText} = ${result}</div>`;
            history.scrollTop = history.scrollHeight; // Auto-scroll to the latest calculation
            display.innerText = result;
            lastWasEval = true;
        } catch {
            display.innerText = 'Error';
            lastWasEval = false;
        }
    } else {
        if (lastWasEval) {
            display.innerText = value;
            lastWasEval = false;
        } else {
            if (display.innerText === '0' && value !== '.') {
                display.innerText = value;
            } else {
                display.innerText += value;
            }
        }
    }
}
