//SETTING VARIABLES

let allButtons = document.querySelectorAll(".buttons button");

let inputField = document.querySelector(".screen input");

let buttonSound = new Audio("sounds/mixkit-message-pop-alert-2354.mp3")

let operators = ["/","+","-","*"];
let numbers = ["0","1","2","3","4","5","6","7","8","9"];

let displayedVal = [];
inputField.value = "";

//key events

inputField.addEventListener("keydown", function (event) {

    inputField.focus();

    const allowedKeys = [...operators, ".", "Enter", "Backspace", "Delete", "Escape", "="];

  // Check if it's a number key
    if (!numbers.includes(event.key) && !allowedKeys.includes(event.key)) {

        event.preventDefault(); 
        
        inputField.classList.add("shake");
        setTimeout(() => inputField.classList.remove("shake"), 300); 

    }else if (event.key === "=" || event.key === "Enter") {

        event.preventDefault();
        resultFunction();

    }else if (event.key === "Escape") {

        clearFunction();

    }else if (event.key === "Delete") {
            displayedVal = (inputField.value).split("");
    }
});


//buttons events:

allButtons.forEach(button => {
    button.onclick = function () {

        inputField.focus();

        buttonSound.currentTime = 0;

        buttonSound.play();

        let buttonVal = button.textContent;
        
        
        //DISPLAY NUMBERS AND OPEREATOR TO THE SCREEN:

        if (numbers.includes(buttonVal) || operators.includes(buttonVal) || buttonVal === ".") {

            displayedVal.push(buttonVal);

            inputField.value = displayedVal.join("");
            
            inputField.scrollLeft = inputField.scrollWidth;

        }else if (buttonVal === "=" && inputField.value !== "") {

            resultFunction();

        }else if(buttonVal === "C"){

            clearFunction();

        }else if(button.classList.contains("delete")){

            inputField.value = (inputField.value).slice(0,(inputField.value).length-1);

            inputField.scrollLeft = inputField.scrollWidth;

            displayedVal = (inputField.value).split("");
            
        }else if(buttonVal === "%"){

            let myRegex = /(\d+\.?\d*)$/;

            let lastDegit = (inputField.value).match(myRegex)[0];
            
            inputField.value = (inputField.value).slice(0,(inputField.value).lastIndexOf(lastDegit)) + lastDegit/100;

            displayedVal = (inputField.value).split("");
            
        }
    }
});

//DARK MODE

let dardModeButton = document.querySelector(".mode");

dardModeButton.onclick = function () {
    
    inputField.focus();
    document.body.classList.toggle("dark");
    dardModeButton.classList.toggle("dark");
    
}

//FUNCTIONS:

//GET THE RESULT FUNCTION:

function resultFunction() {

    try {
        let result = eval(inputField.value);

        inputField.value = result;
        inputField.scrollLeft = inputField.scrollWidth;
        displayedVal = [result];

    } catch (error) {
        inputField.value = "error";
        displayedVal = [];
    }

}


function clearFunction() {
    inputField.value = "";
    displayedVal = [];
}

