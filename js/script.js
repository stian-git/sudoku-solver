const allInputs = document.querySelectorAll(".gametable__box__table input");
const numberOfRows = Math.sqrt(allInputs.length);
const filledNumbers = "42683 591 859216 77916 5 3896571 28 13486275982745 163 7235 1 9598416273314972 86";
const filledNumbersArray = filledNumbers.split("");

function showFilledNumbers(arr) {
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

function clearAllClasses() {
    // make all non-empty fields success by default.
    allInputs.forEach((e) => {
        e.classList.remove("wrong");
        if (e.value != "") {
            e.classList.add("success");
        }
    })
}

allInputs.forEach((element) => {
    element.addEventListener("keyup", (e) => {
        if (e.key !== "Tab") {
            // Reset status of fields.
            clearAllClasses();
            checkInputLength(e.target);
            checkForErrors();
            checkForVictory();
        }
    });
});

function checkForVictory() {
    const totalFields = filledNumbers.length;
    const fieldsToNotFill = document.querySelectorAll(".gametable__box__table input:disabled").length
    const filledFields = document.querySelectorAll(".gametable__box__table input.success:not([disabled])").length;
    if (totalFields - fieldsToNotFill == filledFields) {
        showStatusMessage(false, "Congratulations! You nailed it!");
        // 
    };
}