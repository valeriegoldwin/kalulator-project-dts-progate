
const inputScreen = document.querySelector(".input-screen");
const calcuScreen = document.querySelector(".calculation-screen");

const updateInputScreen = (number) => {
    inputScreen.value = number;
}

let prevNumber = '';
let calculationOperator = '';
let currNumber = '0';

const inputNumber = (number) => {

    if(currNumber === '0') {
        currNumber = number;
    }
    else {
        currNumber += number;
    }
    
}

const deleteNumber = (number) => {
    if(currNumber.length == 1) {
        currNumber = '0';
    }
    else{
        currNumber = currNumber.substring(0,currNumber.length-1);
    }
}

const inputOperator = (operator) => {

    if(calculationOperator === ""){
        prevNumber = currNumber;
    }
    calculationOperator = operator;
    currNumber = '0';
}

const numbers = document.querySelectorAll(".number");

numbers.forEach((number)=>{
    number.addEventListener("click", (event) => {
        inputNumber(event.target.value);
        updateInputScreen(currNumber);
    });

});

const backSpace = document.querySelector(".backspace");

backSpace.addEventListener("click", (event) => {
    deleteNumber(currNumber);
    updateInputScreen(currNumber);
});

const operators = document.querySelectorAll(".operator");

operators.forEach((operator) => {
    operator.addEventListener("click", (event) => {
        inputOperator(event.target.value);
        calcuScreen.textContent = prevNumber + " " + calculationOperator;
        
    })
});

const calculate = () => {

    if(calculationOperator != ''){

        calcuScreen.textContent = prevNumber + " " + calculationOperator + " " + currNumber + " =";
        let result = '';
        switch(calculationOperator) {
            case "+":
                result = parseFloat(prevNumber) + parseFloat(currNumber);
                break;
            case "−":
                result = parseFloat(prevNumber) - parseFloat(currNumber);
                break;
            case "*":
                result = prevNumber * currNumber;
                break;
            case "/":
                result = prevNumber / currNumber;
                break;
            default:
                break;
            
        }

        currNumber = result;

    }

}

const equalSign = document.querySelector(".equal-sign");

equalSign.addEventListener("click", (event) => {
    calculate();
    updateInputScreen(currNumber);
})

const clearBtn = document.querySelector(".all-clear");

const clearAll = () => {
    prevNumber = '';
    calculationOperator = '';
    currNumber = '0';
    calcuScreen.textContent = "";
}

clearBtn.addEventListener("click", (event) => {
    clearAll();
    updateInputScreen(currNumber);
})

inputDecimal = (dot) => {
    if(currNumber.includes('.')) {
        return;
    }
    currNumber += dot;
}


const decimal = document.querySelector(".decimal");

decimal.addEventListener("click", (event) => {
    inputDecimal(event.target.value);
    updateInputScreen(currNumber);
})

inputPercentage = (percen) => {
    if(currNumber.includes('%')) {
        return;
    }
    currNumber += percen;
}

const percentage = document.querySelector(".percentage");

percentage.addEventListener("click", (event) => {
    let tempNumber = currNumber + '%';

    if(prevNumber != ''){

        if(calculationOperator === '+' || calculationOperator === '−'){
            currNumber = currNumber / 100 * prevNumber;
        }
        else{
            currNumber = currNumber / 100;
        }
        
        calcuScreen.textContent = calcuScreen.textContent + " " + tempNumber;
    }
    else{
        currNumber = currNumber / 100;
        calcuScreen.textContent = tempNumber;
    }

    updateInputScreen(currNumber);
})