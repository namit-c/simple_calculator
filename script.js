const display = document.querySelector(".screen");
const keypad = document.querySelector(".buttons");
// created the num as an array to make it easier to add and remove numbers
let num = [];
let expression = [];
let memory = 0;

// Operations
const add = (num1,num2) => {
    num2 = num2 || 0;   // making sure num2 is always a number
    num1 = num1 || 0;
    return num1+num2;
}

const subtract = (num1,num2) => {
    num2 = num2 || 0;   // setting default value of num2 as 0
    num1 = num1 || 0;
    return num1-num2;
}

const multiply = (num1,num2) => {
    num2 = num2 || 1;   // setting default value of num2 as 1
    num1 = num1 || 0;
    return num1*num2;
}

const divide = (num1,num2 = 1) => {
    num2 = num2 || 1;   // setting default value of num2 as 1
    num1 = num1 || 0;
    return Math.round(100*(num1/num2))/100;  // to the nearest hundredth
}

const negate = (num) => {
    num = num || 0;
    return -1*num;
}


// Function that control which operation to call
const operate = (num1, num2, operation) => {
    console.log(num1, num2, operation);
    let ans;
    switch(operation){
        case '+':
            ans = add(num1, num2);
            break;
        case '-':
            ans = subtract(num1, num2);
            break;
        case 'x':
            ans = multiply(num1, num2);
            break;
        case '÷':
            ans = divide(num1, num2);
            break;
        case '+/-':
            ans = negate(num1);
            break;
    }
    return ans; 
}


// Function that takes the 2 input values and operation and computes the result
// to display on the screen
const compute = (expression, num, memory) => {
    let answer = operate(parseFloat(expression[0]), 
                    parseFloat(expression[2]), expression[1]);
    display.textContent = answer || 0;  // to ensure there is always a number on the screen
    return answer;
};


// Takes the button that is clicked by the user and performs the corresponding
// function; as of now, only way to show to results is to click the equals btn
keypad.addEventListener("click", e => {
    let buttonPressed = e.target;

    //checking which button is pressed and performing corresponding steps
    if(buttonPressed.className === "digit"){
        // checks if the decimal button is pressed and the number
        // does not already contain a decimal point
        if(buttonPressed.id === "decimal" && !num.includes(".")){
            num.push(".");
            display.textContent = num.join("");
        }
        else{
            num.push(buttonPressed.textContent);
            display.textContent = num.join("");
        }
    }
    else if(buttonPressed.className === "all-clear"){
        // resetting the calculator values
        num = [];
        expression = []
        memory = 0;
        display.textContent = 0;
    }
    else if(buttonPressed.className === "clear"){
        // removing the last element from the num arary
        num.pop();
        console.log(num)
        // makes sure there is 0 on the screen when num is empty
        display.textContent = num.length != 0 ? num.join("") : 0;
    }
    else if(buttonPressed.className.includes("operator")){
        // moving number from input to memory
        if(num.length < 1){
            expression.push(memory);
            display.textContent = memory;
        }
        else{
            expression.push(num.join(""));
        }
        // getting the operator clicked
        expression.push(buttonPressed.textContent);
        num = [];
        console.log(expression)
    }
    else if(buttonPressed.className === "equals"){
        expression.push(num.join(""));  // adding the second input number
        answer = compute(expression, num, memory);
        // clearing the current expression and numbers
        num = [];
        expression = []
        //storing only the previous answer if needed for the next calculation
        memory = answer; 
    }
    // console.log(expression);
});