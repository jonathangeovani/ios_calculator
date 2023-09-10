// TODO: ADD SUPORTE A CONTAS COM FLOAT VALUES;

const result = document.getElementById('resultado');

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
        result.innerHTML = resultValue;
        if (operator == '=') {
            isFirstOperation = true;
        }
        return false;
    }

    isFirstOperation = false;
}

function getResult(x, sign, y) {
    switch (sign) {
        case '+': return parseInt(x) + parseInt(y);
        case '-': return parseInt(x) - parseInt(y);
        case '*': return parseInt(x) * parseInt(y);
        case '/': return parseInt(x) / parseInt(y);
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
