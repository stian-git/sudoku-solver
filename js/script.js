const allInputs = document.querySelectorAll(".gametable__box__table input");
const numberOfRows = Math.sqrt(allInputs.length);
//console.log("Rows: " + numberOfRows);
const filledNumbers = "42683 5919859216977916 5 3896571 28 13486275982745 163 7235 1 9598416273314972 86";
const filledNumbersArray = filledNumbers.split("");
//console.log(filledNumbersArray);

function showFilledNumbers(arr) {
    //console.log(arr.length);
    if (arr.length === 81) {
        for (let i = 0; i < filledNumbers.length; i++) {
            if (isNaN(Number(arr[i])) || arr[i] == " ") {
                //console.log("This is an empty field: " + arr[i]);
            } else {
                allInputs[i].value = arr[i];
                allInputs[i].disabled = true;
            }
        }
    } else {
        showStatusMessage(true, "The provided gamedata do not contain 81 fields");
    }
}
showFilledNumbers(filledNumbersArray);

allInputs.forEach((element) => {
    element.addEventListener("keyup", (e) => {
        // Check input length as it will not work with css on numbers:
        checkInputLength(e.target);
        //checkForErrors();
        //checkRow(1);
    });
});

//mark failed inputs with class: wrong;

// checkAllBoxes();
// checkAllRows();
// checkAllColumns();
checkBox(2);
//checkForErrors();
