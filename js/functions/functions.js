const rotateButton = document.querySelector(".controls .rotate");
rotateButton.addEventListener("click", rotateGameTable);

function checkInputLength(element) {
    if (element.value.length > 1) {
        element.value = element.value[0];
        showStatusMessage(true, "Only a single digit allowed. Remove the excisting number first.");
    } else {
        showStatusMessage();
    }
}
const statusWindow = document.querySelector(".status");
const statusMessage = document.querySelector(".status .message");
function showStatusMessage(isError, msg) {
    if (isError == undefined) {
        statusMessage.innerHTML = "";
        statusWindow.classList.remove("success");
        statusWindow.classList.remove("error");
    } else {
        if (isError) {
            //classlist
            statusWindow.classList.remove("success");
            statusWindow.classList.add("error");
            statusMessage.innerHTML = `<p>${msg}</p>`;
        } else {
            statusWindow.style.display = "block";
            statusWindow.classList.add("success");
            statusWindow.classList.remove("error");
            statusMessage.innerHTML = `<p>${msg}</p>`;
        }
        setTimeout(() => {
            showStatusMessage();
        }, 5000);
    }
}
const gameTable = document.querySelector(".gametable");
let storage = window.localStorage;

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

const saveTableButton = document.querySelector(".controls .savetable");

saveTableButton.addEventListener("click", saveTable);

function saveTable() {
    //const filledNumbers = "42683 591 859216 77916 5 3896571 28 13486275982745 163 7235 1 9598416273314972 86";
    // or array the same way.
    const currentTableArray = [];

    allInputs.forEach((element) => {
        if (element.value == "") {
            //console.log("This is an empty field");
            currentTableArray.push(" ");
        } else {
            currentTableArray.push(element.value);
        }
    });
    console.log(currentTableArray);
    const currentTableValueString = currentTableArray.join("");
    console.log(currentTableValueString);
    //console.log("Original:");
    //console.log(filledNumbersArray);
    storage.setItem("savedTable", currentTableValueString);
    return currentTableArray;
}

const loadTableButton = document.querySelector(".controls .loadtable");

loadTableButton.addEventListener("click", loadTable);

function loadTable() {
    console.log("Load table...");
    const tableString = storage.getItem("savedTable");
    const tableArray = tableString.split("");
    showFilledNumbers(tableArray);
}

const modifyTableButton = document.querySelector(".controls .modifytable");

modifyTableButton.addEventListener("click", modifyTable);
//() => {
// if (modifyTableButton.classList.contains("enabled")) {
//     modifyTableButton.innerText = "Unlock";
//     disableAlreadyDisabledButtons();
//     clearAllClasses();
//     checkForErrors();
// } else {
//     modifyTableButton.innerText = "Lock";
//     enableAllButtons();
//     // Reset status of fields.
//     allInputs.forEach((e) => {
//         e.classList.remove("wrong");
//         e.classList.remove("success");
//     });
// }
// modifyTableButton.classList.toggle("enabled");
//});

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

let alreadyDisabledFields = [];
function enableAllButtons() {
    alreadyDisabledFields = [];
    allInputs.forEach((element) => {
        if (element.disabled == true) {
            alreadyDisabledFields.push(element.id);
            element.disabled = false;
        }
    });
    //console.log(alreadyDisabledFields);
}
function disableAlreadyDisabledButtons() {
    alreadyDisabledFields.forEach((id) => {
        document.querySelector(`#${id}`).disabled = true;
    });
}

const clearTableButton = document.querySelector(".controls .cleartable");

clearTableButton.addEventListener("click", clearAllFields);
function clearAllFields() {
    console.log("Clearing...");
    allInputs.forEach((element) => {
        element.value = "";
    });
    modifyTable();
    alreadyDisabledFields = [];
}
