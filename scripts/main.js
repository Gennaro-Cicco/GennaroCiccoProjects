//page objects variables
display = document.getElementById('txtResult');
lastResultsSection = document.getElementById('lastResults');

//Operation operands
let firstOperand;
let secondOperand;
let selectedSign;
let result;

//Array for the operation and related variables
let lastResults = [];
let currentOperation;
let i = -1;


//Function that at the buttons pression it puts 
//the related number on display
function placeNumber(num){
    display.value += num.toString();
}

//Function that calculates the square root 
//of the diplayed value on the screen
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

//Function that calcultaes the power of the 
// displayed value by an exponent
function Pow(){
    selectedSign = '^';
    let temp = display.value
    firstOperand = parseFloat(temp);
    display.value = '';
    secondOperand = parseFloat(display.value);
    display.value = '';
    i++;
}

//Function that sets the operand
//  for the operation
function selectOperand(sign){
    selectedSign = sign.toString();
    firstOperand = parseFloat(display.value);
    display.value = ''
}

//Function that calculates the result
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


//Function that clears the display and 
// sets the variables to null
function clearDisplay(){
    display.value='';
    currentOperation = null;
    firstOperand = null;
    secondOperand = null;
    selectedSign = null;
    result = '';
}