const btn = document.querySelector("#button-container")
const calcdisplay = document.querySelector("#calculation")
const resultdisplay = document.querySelector("#result")


let firstNumber = ""
let secondNumber = ""
let operator = null
//let resetDisplay = false

btn.addEventListener('click', (e) => {
    if(!e.target.matches("button")) 
        return;
    const value = e.target.textContent;
    onButtonClick(value);
})

document.addEventListener("keydown", (e) => {

    if(!isNaN(e.key)){
        onButtonClick(e.key)
        return;
    }

    if(["+","-","*","/"].includes(e.key)){
        onButtonClick(e.key)
        return;
    }

    if(e.key === "."){
        onButtonClick(".")
        return
    }

    if(e.key === "Enter"){
        onButtonClick("=")
        return
    }

    if(e.key === "Backspace"){
        onButtonClick("DEL")
        return
    }

    if(e.key === "Escape"){
        onButtonClick("AC")
        return
    }
});


function onButtonClick(value){

    if(!isNaN(value)){
        if (operator === null){
            firstNumber += value;
                //display.textContent = firstNumber;

        }
        else{
            secondNumber += value;
               // display.textContent = secondNumber;

        }  
        updateCalculationDisplay()
        return ;
    } 
       if(value === "+" || value === "-" || value === "*" || value ==="/"){

        if(operator != null && secondNumber != ""){
            const result = calculation(operator,firstNumber,secondNumber);
            resultdisplay.textContent = `=${result}`
            firstNumber = result.toString();
            secondNumber = ""
            //display.textContent = firstNumber;

        }
            operator = value;
            updateCalculationDisplay()
            return;
     } 

     if(value === "="){

       // if(secondNumber === "") return;
       if(firstNumber === "" || secondNumber === "" || operator === null) return
        const result = calculation(operator,firstNumber,secondNumber);
        //display.textContent = result;
        calcdisplay.textContent = `${firstNumber}${operator}${secondNumber}`
        resultdisplay.textContent = `=${result}`

        firstNumber = result.toString(); 
        secondNumber = "";
        operator = null;
        return
     }

     if(value === "AC") {
        firstNumber = "";
        secondNumber = "";
        operator = null;
        calcdisplay.textContent = "";
        resultdisplay.textContent = "";     
        return
     }
    
     if (value === "."){
        if(operator === null){
            if(!firstNumber.includes(".")){
                firstNumber = firstNumber === "" ? "0." : firstNumber + ".";
                //display.textContent = firstNumber;
        }
     }
      else {
        if(!secondNumber.includes(".")){
            secondNumber = secondNumber === "" ? "0." : secondNumber + ".";
            //display.textContent = secondNumber;
        }
     }
     updateCalculationDisplay()
     return;
    }

    if(value === "DEL"){
        if (secondNumber !== ""){
            secondNumber = secondNumber.slice(0,-1);
            // display.textContent = secondNumber || 0;
            // return;
        }
        
        else if(operator != null){
            operator = null;
            // display.textContent = firstNumber;
            // return
        }

        else if(firstNumber !== ""){
            firstNumber = firstNumber.slice(0,-1);
            // display.textContent = firstNumber || 0;
            // return
        }
        updateCalculationDisplay()
        return
    }
}


function calculation(operator,firstNumber,secondNumber){

        let a = Number(firstNumber)
        let b = Number(secondNumber)

        
        if(operator === "+") {return a+b;}

        else if(operator === "-") {return a-b;}

        else if(operator === "*") {return a*b;}

        else if(operator === "/") {
            if(b === 0){
                return "0 is not Divisible"
            }
            else {
            return a/b;}
     }
  
    }

    function updateCalculationDisplay(){
            calcdisplay.textContent = `${firstNumber} ${operator ?? ""} ${secondNumber}`
    }
