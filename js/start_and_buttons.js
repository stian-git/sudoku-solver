// button help functions:

function checkInputLength(element) {
    if (element.value.length > 1) {
        element.value = element.value[0];
        showStatusMessage(true, "Only a single digit allowed. Remove the excisting number first.");
    } else {
        showStatusMessage();
    }
}

function enableAllButtons() {
    alreadyDisabledFields = [];
    allInputs.forEach((element) => {
        if (element.disabled == true) {
            alreadyDisabledFields.push(element.id);
            element.disabled = false;
        }
    });
}
function disableAlreadyDisabledButtons() {
    alreadyDisabledFields.forEach((id) => {
        document.querySelector(`#${id}`).disabled = true;
    });
}

function clearAllClasses() {
    // Clears errors and make all non-empty fields success by default.
    allInputs.forEach((e) => {
        e.classList.remove("wrong");
        if (e.value != "") {
            e.classList.add("success");
        }
    });
}

// button actions and eventlisteners:

rotateButton.addEventListener("click", rotateGameTable);

function rotateGameTable() {
    switch (storage.getItem("gameRotation")) {
        case "90":
            storage.setItem("gameRotation", "180");
            break;
        case "180":
            storage.setItem("gameRotation", "270");
            break;
        case "270":
            storage.setItem("gameRotation", "0");
            break;
        default:
            storage.setItem("gameRotation", "90");
            break;
    }
    gameTable.style.transform = `rotate(${storage.getItem("gameRotation")}deg)`;
    allInputs.forEach((e) => {
        e.style.transform = `rotate(-${storage.getItem("gameRotation")}deg)`;
    });
}

saveTableButton.addEventListener("click", saveTable);
function saveTable() {
    const currentTableArray = [];
    allInputs.forEach((element) => {
        if (element.value == "") {
            currentTableArray.push(" ");
        } else {
            currentTableArray.push(element.value);
        }
    });
    const currentTableValueString = currentTableArray.join("");
    console.log(currentTableValueString);
    storage.setItem("savedTable", currentTableValueString);
    return currentTableArray;
}

loadTableButton.addEventListener("click", loadTable);
function loadTable() {
    const tableString = storage.getItem("savedTable");
    const tableArray = tableString.split("");
    //showFilledNumbers(tableArray);
    startGame(tableArray);
}

clearTableButton.addEventListener("click", clearAllFields);
function clearAllFields() {
    console.log("Clearing...");
    allInputs.forEach((element) => {
        element.value = "";
    });
    modifyTable();
    alreadyDisabledFields = [];
}

modifyTableButton.addEventListener("click", modifyTable);
function modifyTable() {
    if (modifyTableButton.classList.contains("enabled")) {
        modifyTableButton.innerText = "Unlock";
        disableAlreadyDisabledButtons();
        clearAllClasses();
        checkForErrors();
    } else {
        modifyTableButton.innerText = "Lock";
        enableAllButtons();
        // Reset status of fields.
        allInputs.forEach((e) => {
            e.classList.remove("wrong");
            e.classList.remove("success");
        });
    }
    modifyTableButton.classList.toggle("enabled");
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

helpButton.addEventListener("click", solveFunction);
function solveFunction() {
    while (shouldRecheck === true) {
        console.log("Running loop");
        shouldRecheck = false;
        // check for only option (all alternatives), function returns true if things are changed;
        shouldRecheck = checkForOnlyOption();
        if (shouldRecheck === false) {
            shouldRecheck = findLonelyValueInRowOrColumn();
        }
        // Add other checks here, but make sure a false don`t override a previous true for recheck.
    }
    shouldRecheck = true;
    clearAllClasses();
    checkForErrors();
    checkForVictory();
}

function startGame(arr) {
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
startGame(filledNumbersArray);

//probeLonelyFieldforPairsInOtherElements()
