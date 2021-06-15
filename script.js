const display = document.querySelector(".screen");
const keypad = document.querySelector(".buttons");
// created the num as an array to make it easier to add and remove numbers
let num = [];
let expression = [];
let memory = 0;

// Takes the button that is clicked by the user and performs the corresponding
// function; as of now, only way to show to results is to click the equals btn
keypad.addEventListener("click", e => {
    let buttonPressed = e.target;
    if(buttonPressed.className === "digit"){
        if(buttonPressed.id === "decimal"){
            num.push(".");
            display.textContent = num.join("");
        }
        else{
            num.push(buttonPressed.textContent);
            display.textContent = num.join("");
        }
    }
    else if(buttonPressed.className === "clear"){
        // resetting the calculator values
        num = [];
        expression = []
        memory = 0;
        display.textContent = 0;
    }
    else if(buttonPressed.className.includes("operator")){
        //buttonPressed.classList.add("operator-active");
        // moving number from input to memory
        if(num.length < 1){
            expression.push(memory);
        }
        else{
            expression.push(num.join(""));
        }
        expression.push(buttonPressed.textContent);
        num = [];
        console.log(expression)
    }
    else if(buttonPressed.className === "equals"){
        expression.push(num.join(""));  // adding the second input number
        let answer = operate(parseFloat(expression[0]), 
                            parseFloat(expression[2]), expression[1]);
        console.log(answer);
        display.textContent = answer;
        // clearing the current expression and numbers
        num = [];
        expression = []
        //storing only the previous answer if needed for the next calculation
        memory = answer; 
    }
    // console.log(expression);
});

// Operations
const add = (num1,num2) => {
    return num1+num2;
}

const subtract = (num1,num2) => {
    return num1-num2;
}

const multiply = (num1,num2) => {
    return num1*num2;
}

const divide = (num1,num2) => {
    return Math.round(100*(num1/num2))/100;  // to the nearest hundredth
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
    }
    return ans; 
}