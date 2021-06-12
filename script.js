

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
    switch(operation){
        case '+':
            console.log(add(num1, num2));
            break;
        case '-':
            console.log(subtract(num1, num2));
            break;
        case '*':
            console.log(multiply(num1, num2));
            break;
        case '/':
            console.log(divide(num1, num2));
            break;
    }
    return 0; 
}