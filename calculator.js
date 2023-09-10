const result = document.getElementById('resultado');
const windowWidth = window.innerWidth;

let operand1, operand2, resultValue = 0;
let operator;
let isFirstNum = false;
let isFirstOperation = true;
let isNewOperation = true;

function reset() {
    result.innerText = operand1 = operand2 = 0;
    isFirstOperation = true;
}

function addNum(x) {
    if (!isFirstNum) {
        if (result.innerText == 0 && x != ',') {
            result.innerText = x;
        } else if (x == ',' && !result.innerText.match(',')) {
            result.innerText += ',';
        } else if (x != ','){
            result.innerText += x;
        }
    } else {
        if (x != ',') {
            result.innerText = x;
        } else {
            result.innerText = '0,';
        }
        isFirstNum = false;
    }
}

function updateOperation(newOperator) {
    isFirstNum = true;
    
    if (isFirstOperation) {
        operand1 = result.innerText;
        operator = newOperator;
        resultValue = operand1;
    } else {
        operand2 = result.innerText;
        resultValue = getResult(operand1,operator,operand2);
        operator = newOperator;
        operand1 = resultValue;        
        result.innerHTML = checkLength(resultValue.toString());
        if (operator == '=') {
            isFirstOperation = true;
        }
        return false;
    }

    isFirstOperation = false;
}

function getResult(x, sign, y) {
    x = x.replace(',','.');
    y = y.replace(',','.');
    switch (sign) {
        case '+': return parseFloat(x) + parseFloat(y);
        case '-': return parseFloat(x) - parseFloat(y);
        case '*': return parseFloat(x) * parseFloat(y);
        case '/': return parseFloat(x) / parseFloat(y);
        case '=': return resultValue;
    }
}

function invert() {
    if (result.innerText > 0) {
        result.innerText = '-' + result.innerText;
    } else if (result.innerText < 0) {
        result.innerText = result.innerText.split('-')[1];
    }
}

function percent () {
    if (!result.innerText.match(/([,])/)) {
        let percent = result.innerText / 100;
        result.innerText = percent.toString().replace('.',',');
    }
}

function checkLength(text) {
    if (text.length >= 8) {
        result.style.fontSize = changeSize('3.5rem');
        result.innerText = text.slice(0,11);
        return text.slice(0,11).replace('.',',');
    } else if (text.length < 8) {
        result.style.fontSize = changeSize('5rem');
    }
    return text.replace('.',',');
}

function changeSize(newSize) {
    if (windowWidth > 360 && windowWidth <= 428) {
        switch (newSize) {
            case '3.5rem': return '3.5rem';
            case '5rem': return newSize;
        }
    } else if (windowWidth <= 360 && windowWidth > 340) {
        switch (newSize) {
            case '3.5rem': return '3rem';
            case '5rem': return '4rem';
        }
    } else if (windowWidth <= 340) {
        switch (newSize) {
            case '3.5rem': return '2rem';
            case '5rem': return '3rem';
        }
    } else {
        switch (newSize) {
            case '3.5rem': return '2.8rem';
            case '5rem': return '4.5rem';
        }
    }
}

document.addEventListener('click', () => {
    result.innerText = checkLength(result.innerText);
})