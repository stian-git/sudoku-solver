// Functionlist:
// fillNumber(field, value)
// getRowArray(rowNumber)
// getColumnArray(columnNumber)
// getBoxArray(boxNumber)
// getAllFieldsWithNoValue()
// markItems(arr, isWrong = true)
// checkForVictory()
// checkForErrors()
// checkArray(arr)
// checkforDuplicatesInArray(arr)
// showStatusMessage(isError, msg)

// Functions overview:

// fillNumber(field, value)
//

// getRowArray(rowNumber)
// Input value 1-9, returns all values in Row incl. empty fields.
// Counts from top to bottom.

// getColumnArray(columnNumber)
// Input value 1-9, returns all values in Column incl. empty fields.
// Counts from left to right.

// getBoxArray(boxNumber)
// Input value 1-9, returns all values in Column incl. empty fields.
// Counts first row of boxes first: 1-3, second: 4-6, bottom: 7-9.

// getAllFieldsWithNoValue()
// Returns an array of all fields with no value.

// markItems(arr, isWrong = true)
// input is an array of fields that should be marked.
// Currently all elements are marked green when changed,
// and then this function only handles the marking of errors.

// checkForVictory()
// Errorcheck should be run before this one.
// If all fields are filled out and no errors present, we win.

// checkForErrors()
// Retrieves values for all rows, cols and boxes,
// and passes it to checkForDuplicatesInArray(), which returns
// an array of any duplicated items. These are put in combined
// arrays and passed to markItems().

// checkforDuplicatesInArray(arr)
// Input value is all values for a row,box or column.
// These values are compared and all duplicates are returned
// in an array.

// showStatusMessage(isError, msg)
// Shows a statusmessage. Styled as error if first arg = True.
// msg is the content to display.

function fillNumber(field, value) {
    console.log("Filling " + field + " with: " + value);
    document.querySelector(field).value = value;
    // log this.
}

function getRowArray(rowNumber) {
    let tempValues = [];
    for (let i = 1; i <= numberOfRows; i++) {
        const elementId = `#r${rowNumber}c${i}`;
        const currentValue = document.querySelector(elementId).value;
        currentObject = {
            id: elementId,
            value: currentValue,
        };
        tempValues.push(currentObject);
    }
    return tempValues;
}

function getColumnArray(columnNumber) {
    let tempValues = [];
    for (let i = 1; i <= numberOfRows; i++) {
        const elementId = `#r${i}c${columnNumber}`;
        const currentValue = document.querySelector(elementId).value;
        currentObject = {
            id: elementId,
            value: currentValue,
        };
        tempValues.push(currentObject);
    }
    return tempValues;
}

function getBoxArray(box) {
    let tempValues = [];
    let currentValueArray = [];
    const boxId = ".gametable__box_" + box;
    const currentBoxValues = document.querySelectorAll(`${boxId} input`);
    for (let i = 0; i < numberOfRows; i++) {
        const elementId = `#${currentBoxValues[i].id}`;
        const currentValue = `${currentBoxValues[i].value}`;
        currentObject = {
            id: elementId,
            value: currentValue,
        };
        currentValueArray.push(currentObject);
        tempValues.push(currentObject);
    }
    return currentValueArray;
}

function getAllFieldsWithNoValue() {
    let emptyFieldListArray = [];
    //console.log(allInputs);
    allInputs.forEach((element) => {
        if (element.value === "") {
            //console.log(element.id + " got no value");
            emptyFieldListArray.push(element);
        }
    });
    return emptyFieldListArray;
}

function markItems(arr, isWrong = true) {
    if (isWrong === true) {
        arr.forEach((element) => {
            if (element.value != "") {
                document.querySelector(element.id).classList.add("wrong");
            }
        });
    } else {
        //console.log("This is not an error."); Not needed?
    }
}

function checkForVictory() {
    const totalFields = filledNumbers.length;
    const fieldsToNotFill = document.querySelectorAll(".gametable__box__table input:disabled").length;
    const filledFields = document.querySelectorAll(".gametable__box__table input.success:not([disabled])").length;
    if (totalFields - fieldsToNotFill == filledFields) {
        showStatusMessage(false, "Congratulations! You nailed it!");
        // Do more than just show the status msg?
    }
}

function checkForErrors() {
    for (let i = 1; i <= numberOfRows; i++) {
        // Checks if each box got all 9 numbers and store it to array;
        const rowDuplicates = checkforDuplicatesInArray(getRowArray(i));
        // Checks if all columns got all 9 numbers and store it to array;
        const columnDuplicates = checkforDuplicatesInArray(getColumnArray(i));
        // Checks if all rows got all 9 numbers and store it to array;
        const boxDuplicates = checkforDuplicatesInArray(getBoxArray(i));
        // Combine all the arrays:
        const allDuplicates = rowDuplicates.concat(columnDuplicates, boxDuplicates);
        // Mark the duplicated items:
        markItems(allDuplicates);
    }
}

function checkforDuplicatesInArray(arr) {
    let duplicates = [];
    for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[i].value === arr[j].value) {
                if (arr[i].value !== "") {
                    duplicates.push(arr[i]);
                    duplicates.push(arr[j]);
                }
            }
        }
    }
    return duplicates;
}

function showStatusMessage(isError, msg) {
    if (isError == undefined) {
        statusMessage.innerHTML = "";
        statusWindow.classList.remove("success");
        statusWindow.classList.remove("error");
    } else {
        if (isError) {
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
