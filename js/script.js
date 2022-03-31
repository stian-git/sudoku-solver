// lvl1 #1: const filledNumbers = "42683 591 859216 77916 5 3896571 28 13486275982745 163 7235 1 9598416273314972 86";
// lvl2 #91: const filledNumbers = "1 93 5 242 846  7   7  19 6948 1673275 3  91 1 379 5 8  3251  71  6478  27 38 61 ";
// lvl3 #379: const filledNumbers = "5  4  8 3  18  24 8  95271 2 69   4873 1  95    68 32 6  37 182317        8  957 ";
// lvl3 #380: const filledNumbers = "     1 52 345 79  6  4   3  6  47  5458 1972 17   3 4 9       83  896 45 8 32   7";
//lvl4 #432:
const filledNumbers = "43   91  96    7  2  7  98   4 2 591   3       2 7  6  15   74843 589  262    395";
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
        return true;
    } else {
        showStatusMessage(true, "The provided gamedata do not contain 81 fields");
        return false;
    }
}
showFilledNumbers(filledNumbersArray);

function clearAllClasses() {
    //console.log("Now clearing classes...");
    // make all non-empty fields success by default.
    allInputs.forEach((e) => {
        e.classList.remove("wrong");
        if (e.value != "") {
            e.classList.add("success");
        }
    });
}

allInputs.forEach((element) => {
    element.addEventListener("keyup", (e) => {
        let disabledCount = 0;
        allInputs.forEach((field) => {
            if (field.disabled == true) {
                disabledCount++;
            }
        });
        console.log("Disabled fields: " + disabledCount);
        if (e.key !== "Tab" || disabledCount > 0) {
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
    const fieldsToNotFill = document.querySelectorAll(".gametable__box__table input:disabled").length;
    const filledFields = document.querySelectorAll(".gametable__box__table input.success:not([disabled])").length;
    if (totalFields - fieldsToNotFill == filledFields) {
        showStatusMessage(false, "Congratulations! You nailed it!");
        // Do more than just show the status msg?
    }
}

//probeForValueInRow("#r2c7", [4, 8]);

////
