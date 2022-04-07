// Source: https://no.cm-santiago-do-cacem.pt/how-solve-sudoku-puzzles-any-difficulty

function findLonelyValueInRow() {
    const fieldsToCheck = getAllFieldsWithNoValue();
    console.log("Length: " + fieldsToCheck.length);
    let fieldsToProbe = [];
    if (fieldsToCheck.length > 0) {
        fieldsToCheck.forEach((field) => {
            const fieldIsAlone = isFieldAloneInBoxRowOrColumn(field, true);
            if (fieldIsAlone === true) {
                fieldsToProbe.push("#" + field.id);
            }
        });
    }
    fieldsToProbe.forEach((element) => {
        probeLonelyFieldforPairsInOtherElements(element, true);
    });
}

function findLonelyValueInColumn() {
    const fieldsToCheck = getAllFieldsWithNoValue();
    let fieldsToProbe = [];
    if (fieldsToCheck.length > 0) {
        fieldsToCheck.forEach((field) => {
            const fieldIsAlone = isFieldAloneInBoxRowOrColumn(field, false);
            if (fieldIsAlone === true) {
                fieldsToProbe.push("#" + field.id);
            }
        });
    }
    fieldsToProbe.forEach((element) => {
        probeLonelyFieldforPairsInOtherElements(element, false);
    });
}

function probeLonelyFieldforPairsInOtherElements(id, checkRow) {
    // abort this function if checkrow is not defined.
    console.log(id);
    if (checkRow === undefined) {
        console.error("checkRow is not defined");
        return;
    }
    const currentItemElement = document.querySelector(id);
    const rowNumber = id[2];
    const columnNumber = id[4];
    const boxNumber = currentItemElement.classList[0][3];
    const currentItemRow = getRowArray(rowNumber);
    const currentItemColumn = getColumnArray(columnNumber);
    const currentItemBox = getBoxArray(boxNumber);
    const pairedRowsArray = getPairedElements(rowNumber);
    const pairedColumnsArray = getPairedElements(columnNumber);

    const allCurrentValuesInRowOrColumn = currentItemRow.concat(currentItemColumn, currentItemBox);
    let allCurrentValuesOnly = [];
    allCurrentValuesInRowOrColumn.forEach((element) => {
        if (element.value !== "") {
            allCurrentValuesOnly.push(element.value);
        }
    });
    const allCurrentUniqueValues = allCurrentValuesOnly.filter(onlyUnique);

    for (let i = 0; i <= 1 + (numberOfRows - allCurrentUniqueValues.length); i++) {
        allCurrentUniqueValues.push("");
    }
    const allPossibleValues = findMissingNumbersInArray(allCurrentUniqueValues);
    console.log(allPossibleValues);

    // Get missing values for the current field:
    // Check paired rows:
    let pairedRowsValuesArray = [];
    let pairedColumnsValuesArray = [];
    pairedColumnsArray.forEach((column) => {
        const columnValues = getColumnArray(column);
        pairedColumnsValuesArray.push(columnValues);
    });
    pairedRowsArray.forEach((row) => {
        const rowValues = getRowArray(row);
        pairedRowsValuesArray.push(rowValues);
    });
    console.log(pairedRowsValuesArray);

    if (checkRow === true) {
        allPossibleValues.forEach((value) => {
            console.log("Checking rows...");
            for (let j = 0; j < pairedRowsValuesArray[0].length; j++) {
                if (value == pairedRowsValuesArray[0][j].value) {
                    console.log("Match: " + pairedRowsValuesArray[0][j].value);
                    for (let k = 0; k < pairedRowsValuesArray[1].length; k++) {
                        if (value == pairedRowsValuesArray[0][j].value && value == pairedRowsValuesArray[1][k].value) {
                            console.log("Matched in both places: " + value);
                            fillNumber(id, value);
                        }
                    }
                }
            }
        });
    } else {
        console.log("Checking columns...");
        allPossibleValues.forEach((value) => {
            for (let s = 0; s < pairedColumnsValuesArray[0].length; s++) {
                if (value == pairedColumnsValuesArray[0][s].value) {
                    console.log("Match: " + pairedColumnsValuesArray[0][s].value);
                    for (let t = 0; t < pairedColumnsValuesArray[1].length; t++) {
                        if (value == pairedColumnsValuesArray[0][s].value && value == pairedColumnsValuesArray[1][t].value) {
                            console.log("Matched in both places: " + value);
                            // add this value to this field.
                            fillNumber(id, value);
                        }
                    }
                }
            }
        });
    }
}

function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}

function findMissingNumbersInArray(unSortedArr) {
    let missingValues = [];
    for (let i = 1; i <= unSortedArr.length; i++) {
        if (!unSortedArr.some((element) => element == i)) {
            missingValues.push(i);
        }
    }
    return missingValues;
}
function findMissingNumbersInTwoArrays(arr1, arr2) {
    // This should remove duplicates.
    const missingNumbersArr1 = findMissingNumbersInOneArray(arr1);
    const missingNumbersArr2 = findMissingNumbersInOneArray(arr2);
    const combinedArray = missingNumbersArr1.concat(missingNumbersArr2);
    console.log(combinedArray);
    const possibleValues = [];
}

function findMissingNumbersInOneArray(unSortedArr) {
    let missingValues = [];
    for (let i = 1; i <= unSortedArr.length; i++) {
        if (!unSortedArr.some((element) => element.value == i)) {
            missingValues.push(i);
        }
    }
    return missingValues;
}

function findEmptyFields(unSortedArr) {
    //sorting array:
    const sortedArray = unSortedArr.sort((a, b) => {
        return a.value - b.value;
    });
    let emptyFields = [];
    for (let i = 0; i < sortedArray.length; i++) {
        if (sortedArray[i].value == "") {
            emptyFields.push(sortedArray[i]);
        }
    }
    return emptyFields;
}

function getPairedElements(elementnumber) {
    let pairs = [];
    switch (elementnumber) {
        case "1":
            pairs = [2, 3];
            break;
        case "2":
            pairs = [1, 3];
            break;
        case "3":
            pairs = [1, 2];
            break;
        case "4":
            pairs = [5, 6];
            break;
        case "5":
            pairs = [4, 6];
            break;
        case "6":
            pairs = [4, 5];
            break;
        case "7":
            pairs = [8, 9];
            break;
        case "8":
            pairs = [7, 9];
            break;
        case "9":
            pairs = [7, 8];
            break;
        default:
            break;
    }
    return pairs;
}

function isFieldAloneInBoxRowOrColumn(id, isRow) {
    // Make sure the call has defined what to check.
    if (isRow === undefined) {
        console.error("iskRow is not defined");
        return;
    }
    console.log("#" + id.id);
    let result = false;
    const emptyFieldId = id.id;
    let firstFieldId;
    let secondFieldId;
    if (isRow === true) {
        const currentColumnIndex = id.id[3];
        const columnsToCheck = getPairedElements(currentColumnIndex);
        firstFieldId = "#" + emptyFieldId.slice(0, -1) + columnsToCheck[0];
        secondFieldId = "#" + emptyFieldId.slice(0, -1) + columnsToCheck[1];
    } else {
        const currentRowIndex = id.id[1];
        const rowsToCheck = getPairedElements(currentRowIndex);
        firstFieldId = "#" + emptyFieldId.replace(emptyFieldId[1], rowsToCheck[0]);
        secondFieldId = "#" + emptyFieldId.replace(emptyFieldId[1], rowsToCheck[1]);
    }
    if (document.querySelector(firstFieldId).value !== "" && document.querySelector(secondFieldId).value !== "") {
        result = true;
    }
    return result;
}

function findLonelyValueInRowOrColumn() {
    const fieldsToCheck = getAllFieldsWithNoValue();
    console.log("Length: " + fieldsToCheck.length);
    findLonelyValueInRow();
    findLonelyValueInColumn();
    const emptyFieldsAfterRun = getAllFieldsWithNoValue();
    if (emptyFieldsAfterRun.length < fieldsToCheck.length) {
        console.log("Something changed.");
        return true;
    } else {
        return false;
    }
}
