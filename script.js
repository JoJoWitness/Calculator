const soluDisplay= document.getElementById('solutionDisplay');
const opDisplay= document.getElementById('operationDisplay');

const numButton = document.querySelectorAll('#num');
const numberPoint = document.getElementById('num.');
const numberNegative = document.getElementById('num-');

const op = document.querySelectorAll('#op');
const opES = document.querySelectorAll('#esOP');
const opPer = document.getElementById('opPer')
const opClear= document.getElementById('clear');
const opDelete= document.getElementById('delete');
const opEqual= document.getElementById('equal');


let negative =false;
let point= false;
let calculate= false;
let opType="";
let tempA =0, tempB=NaN;
let number= false;
let symboltoUse=""
let numDisplay ="";
let result=NaN;
let error = false;

// utility functions
function deleteNum(){
    numDisplay=numDisplay.slice(0, -1);
    opDisplay.textContent= numDisplay;
};

function clearDisplay(){
    opDisplay.textContent= "";
    soluDisplay.textContent= "";
    numDisplay="";
    resultDisplay="";
    tempA=0;
    tempB=NaN;
    calculate=false
    result="";
    number= false;
    error = false;
};

function writeNegative(){
    if(negative===false){
    numDisplay = "-" + numDisplay;
    opDisplay.textContent=`${numDisplay}`;
    negative=true;
} else if(negative===true){
        numDisplay = numDisplay.split("-");
        numDisplay.shift();
        opDisplay.textContent=numDisplay;
        negative= false;
}
}

function writePoint(){
    if(point===false){
        numDisplay +=".";
        opDisplay.textContent=numDisplay;
        point=true;
    }
}

function isEqual(){
if(error===false){
    if(calculate===false){
        soluDisplay.textContent = tempA;
    }
    else if(calculate===true){
        console.log(calculate);
        tempA = parseFloat(result);
        result= operationCalc();
        soluDisplay.textContent = `${result}`;
        opDisplay.textContent= "";
        numDisplay="";
        tempB=NaN;
        negative=false;
        point=false;
    }
    calculate=false;
    number= false;
}}

// Number function

function writeNumber(numero){
if(error===false){
    if(numDisplay.length<15){
        numDisplay += numero;
        opDisplay.textContent= `${numDisplay}`;
        if(calculate===false){
            tempA=parseFloat(numDisplay);
            result = parseFloat(numDisplay);}
        else if(calculate===true){ 
            tempB=parseFloat(numDisplay);
            }
        number = true;
    }}
}

function writeOperation(simbolo){
if(error===false){    
    if(number === true){
        symboltoUse= simbolo;
        opDisplay.textContent= "";
        numDisplay="";
        soluDisplay.textContent = `${result}${symboltoUse}`
        if(!isNaN(tempB)){
            tempA = result;
            isEqual();
            soluDisplay.textContent += `${symboltoUse}`
        }
       
        negative= false;  
    }}}

function writeSpecialOp(e){
    if(number === true){
        esSymbolToUse= e.target.textContent;
        result = operationCalcEs(); calculate = true;
        console.log(result);
        soluDisplay.textContent=`${result}`;
            if(isNaN(result)){
                soluDisplay.textContent= 'Math Error';
                error = true;
            }
        opDisplay.textContent="";
        numDisplay="";
        negative= false;
        
    }
}
// Operation functions
function operationCalc(){
    switch (symboltoUse){
        case "+":
            return plus(tempA, tempB);    
        case "-": 
            return minus(tempA, tempB);
        case "x":
            return times(tempA, tempB);
        case "/":
            return divide(tempA, tempB);
        case"^":
            return Math.pow(tempA,tempB);
        }
}

function operationCalcEs(){
    switch (esSymbolToUse){
        case "√":
            return Math.sqrt(result);    
        case "inv": 
            console.log(result); 
            return Math.pow(result, -1)
        case "ln":
            return Math.log(result);
        case "log":
            return Math.log10(result);
        }
}

function opPercentage(){
    numDisplay = numDisplay/100;
    if(numDisplay.toString().length<15){
    opDisplay.textContent= `${numDisplay}`;
}
}

function plus(tempA, tempB){
    return result = tempA + tempB;  
}
function minus(tempA, tempB){
    return result = tempA - tempB;
}
function times(tempA, tempB){
    return result = tempA * tempB;
}
function divide(tempA, tempB){
    return result = tempA / tempB;
}

// Key Events//

function getKeyboardInput(e) {
    if (e.key >= 0 && e.key <= 9){ writeNumber(e.key);}
    if (e.key === '.'){ writePoint();}
    if (e.key === '=' || e.key === 'Enter'){isEqual();}
    if (e.key === 'Backspace'){deleteNum();}
    if (e.key === 'Escape'){clearDisplay();}
    if (e.key === '+' || e.key === '-' || e.key === 'x' || e.key === '/' || e.key ==='^'){
      writeOperation(e.key);
    }
}


window.addEventListener('keydown', getKeyboardInput)
// Number Event// 

numberNegative.addEventListener('click',writeNegative);
numberPoint.addEventListener('click',writePoint);
numButton.forEach(numbers => numbers.addEventListener('click', (e) => writeNumber(e.target.textContent)));


// Utility Event

opClear.addEventListener('click', clearDisplay);
opDelete.addEventListener('click', deleteNum);
opEqual.addEventListener('click', isEqual);

// Operation Events
op.forEach(operation => operation.addEventListener('click', (e) => writeOperation(e.target.textContent)));
opES.forEach(especial => especial.addEventListener('click', writeSpecialOp));
opPer.addEventListener('click', opPercentage)