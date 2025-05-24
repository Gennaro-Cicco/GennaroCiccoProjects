display = document.getElementById('txtResult');
lastResultsSection = document.getElementById('lastResults');
let currentOperation;
let firstOperand;
let secondOperand;
let selectedSign;
let lastResults = [];
let i = -1;
let result;
let isCalc = false //turned off

function placeNumber(num){
    placedNum = num.toString();
    display.value += placedNum;
}

function insertComma(comma){
    display.value += comma.toString();
}

function squareRoot(){
    let temp;
    temp = display.value;
    result = Math.sqrt(parseFloat(display.value))
    currentOperation = `√${temp.toString()}=${result.toString()}`;
    lastResults.push(currentOperation);
    display.value = result.toString()
    i++;
    lastResultsSection.innerHTML+= `${lastResults[i].toString()}<br>`;
}

function Pow(){
    selectedSign = '^';
    let temp = display.value
    firstOperand = parseFloat(temp);
    display.value = '';
    secondOperand = parseFloat(display.value);
    display.value = '';
    i++;
}

function selectOperand(sign){
    selectedSign = sign.toString();
    firstOperand = parseFloat(display.value);
    display.value = ''
}

function calculateResult(){
    secondOperand = parseFloat(display.value);
    display.value = '';

    if(selectedSign === '+'){
        result = firstOperand + secondOperand;
        currentOperation = firstOperand.toString() + '+' + secondOperand.toString() + `=${result.toString()}`
    }
    else if (selectedSign === '-'){
        result = firstOperand - secondOperand;
        currentOperation = firstOperand.toString() + '-' + secondOperand.toString() + `=${result.toString()}`
    }
    else if (selectedSign === '*'){
        result = firstOperand * secondOperand;
        currentOperation = firstOperand.toString() + '*' + secondOperand.toString() + `=${result.toString()}`
    }
    else if (selectedSign === '/'){
        result = firstOperand / secondOperand;
        currentOperation = firstOperand.toString() + '/' + secondOperand.toString() + `=${result.toString()}`
    }
    else if(selectedSign === '^'){
        result = firstOperand ** secondOperand;
        currentOperation = `${firstOperand}^${secondOperand}=${result}`;
        lastResults.push(currentOperation);
    }

    display.value = result.toString();
    lastResults.push(currentOperation);
    console.log(`New operation inserted in the array: ${currentOperation.toString()}`);
    i++;
    lastResultsSection.innerHTML+= `${lastResults[i].toString()}<br>`;
}

function clearDisplay(){
    display.value='';
    currentOperation = null;
    firstOperand = null;
    secondOperand = null;
    selectedSign = null;
    result = '';
}