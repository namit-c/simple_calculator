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
    //console.log(num1)
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
    // num2 = num2;
    // num1 = num1;
    if(num2 === 0){
        alert("Oops! Invalid Operation. Try Again!")
        return 0;
    }
    return num1/num2;  // to the nearest hundredth
}

const negate = (num) => {
    num = num || 0;
    return -1*num;
}


// Function that control which operation to call
const operate = (num1, num2, operation) => {
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


// Function that takes the 2 input values and operation and computes the result
// to display on the screen
const compute = (expression) => {
    let answer = operate(parseFloat(expression[0]), 
                    parseFloat(expression[2]), expression[1]);

    // limiting the digits of the answer to 10 or 11 (with negative sign)
    if(answer < 0 && answer.toString().length > 11){
        alert("Overflow! Use smaller numbers.")
        answer = 0;
    }
    else if(answer > 0 && answer.toString().length > 10){
        // checking if exponential form is required or the number is improper
        // 999999999 is the largest number that can fit on the screen without exponene form
        if(!(answer > 9999999999)){
            answer = parseFloat(answer.toString().split("").splice(0,10).join(""));
        }
        else{
            alert("Overflow! Use smaller numbers.")
            answer = 0;
        }
    }
    display.textContent = answer || 0;  // to ensure there is always a number on the screen
    return answer;
};


// Takes the button that is clicked by the user and performs the corresponding
// function; as of now, only way to show to results is to click the equals btn
keypad.addEventListener("click", e => {
    let buttonPressed = e.target;

    // checking which button is pressed and performing corresponding steps
    if(buttonPressed.className === "digit"){

        // only allow another digit to be added if it fits on the screen
        // max space is 10 without the negative sign and 11 with
        if(num.length < 10 || (num.length < 11 && num[0] == "-")){
            
            // checks if the decimal button is pressed and the number
            // does not already contain a decimal point
            if(buttonPressed.textContent != "."){
                num.push(buttonPressed.textContent);
                display.textContent = num.join("");
            }
            else if(!num.includes('.')){
                num.push(buttonPressed.textContent);
                display.textContent = num.join("");
            }
        }
    }
    else if(buttonPressed.className === "all-clear"){
        // resetting the calculator values
        num = [];
        expression = []
        memory = 0;
        //console.log(memory)
        display.textContent = 0;
    }
    else if(buttonPressed.className === "clear"){
        // removing the last element from the num arary
        num.pop();
        // makes sure there is 0 on the screen when num is empty
        display.textContent = num.length != 0 ? num.join("") : 0;
    }
    else if(buttonPressed.className.includes("operator")){
        // checking if the sign change button is pressed
        if(buttonPressed.className.includes("sign-change")){
            // to ensure it is pressed fore the operator is pressed
            if(num.length === 0){
                alert("Invalid Operation. Use before operator.")
            }
            else{
                // joins the array into a string, which is then converted into
                // into a number so it can be converted to either positive or negative;
                // changed back into string array after conversion
                num = (-1*parseFloat(num.join(""))).toString().split("");
                display.textContent = num.join("");
            }
        }
        else{
            // adding the current input into the expression
            expression.push(num.length < 1 ? memory : num.join(""));
            
            // multiple clicks of the operations button; 
            // checks the last element in the expression and replaces with the new one
            if (["+", "-", "x", "÷"].includes(expression[expression.length - 1])){
                expression.pop(); // remove the operator at the end of the array; new added later
            }

            // to ensure the several operations can be used without pressing "="
            if(expression.length > 2){
                answer = compute(expression);
                expression = [answer];
                memory = 0;
            }
            // getting the operator clicked
            expression.push(buttonPressed.textContent);
            num = [];
        }
    }
    else if(buttonPressed.className === "equals"){
        if(expression.length > 1){
            expression.push(num.join(""));  // adding the second input number
            answer = compute(expression);
            // clearing the current expression and numbers
            num = [answer];
            expression = []
            //storing only the previous answer if needed for the next calculation
            memory = 0; 
        }
    }
    //console.log(expression, num)
});

// Keyboard Support
document.addEventListener("keydown", e => {
    // using switch statement for the keyboard input
    switch(e.key){
        case "+":
        case "-":
        case "*":
        case "/":
            // can't operate on any numbers that in exponential form (too large)
            if((num.length < 1 ? memory : num.join("")).includes("e")){
                alert("Number too large! Can't Operate.");
            }
            else{
                // adding the current input into the expression
                expression.push(num.length < 1 ? memory : num.join(""));
                
                // multiple clicks of the operations button; 
                // checks the last element in the expression and replaces with the new one
                if (["+", "-", "x", "÷"].includes(expression[expression.length - 1])){
                    expression.pop(); // remove the operator at the end of the array; new added later
                }

                // to ensure the several operations can be used without pressing "="
                if(expression.length > 2){
                    answer = compute(expression);
                    expression = [answer];
                    memory = 0;
                }
                // getting the operator clicked
                if (e.key !== "*" && e.key !== "/"){
                    expression.push(e.key);
                }
                else if (e.key === "*"){
                    expression.push("x");
                }
                else{
                    expression.push("÷");
                }
                num = [];
            }
            break;
        
        // "C" on the keypad
        case "Backspace":
            // removing the last element from the num arary
            num.pop();
            // makes sure there is 0 on the screen when num is empty
            display.textContent = num.length != 0 ? num.join("") : 0;
            break;
        
        // "AC" on the keypad; All-clear
        case "Escape":
            // resetting the calculator values
            num = [];
            expression = []
            memory = 0;
            //console.log(memory)
            display.textContent = 0;
            break;

        // for negation
        case "n":
            // can't operate on any numbers that in exponential form (too large)
            if((num.length < 1 ? memory : num.join("")).includes("e")){
                alert("Number too large! Can't Operate.");
            }
            else{
                // to ensure it is pressed fore the operator is pressed
                if(num.length === 0){
                    alert("Invalid Operation. Use before operator.")
                }
                else{
                    // joins the array into a string, which is then converted into
                    // into a number so it can be converted to either positive or negative;
                    // changed back into string array after conversion
                    num = (-1*parseFloat(num.join(""))).toString().split("");
                    display.textContent = num.join("");
                }
            }
            break;

        case "Enter":
            if(expression.length > 1){
                expression.push(num.join(""));  // adding the second input number
                answer = compute(expression);
                // clearing the current expression and numbers
                num = answer.toString().split("");
                expression = []
                //storing only the previous answer if needed for the next calculation
                memory = answer; 
            }
            break;
        
        default:
            // only allow another digit to be added if it fits on the screen
            // max space is 10 without the negative sign and 11 with
            if(num.length < 10 || (num.length < 11 && num[0] == "-")){
                // checks if the decimal button is pressed and the number
                // does not already contain a decimal point
                if(e.key !== "." && isFinite(e.key)){
                    num.push(e.key);
                    display.textContent = num.join("");
                }
                else if(!num.includes('.') && e.key === "."){
                    num.push(e.key);
                    display.textContent = num.join("");
                }
            }
            break;
    }
})