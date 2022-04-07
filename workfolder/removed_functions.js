function checkExpectedArrayValues(values) {
    if (values === expectedArrayString) {
        //console.log("Array Total: OK");
        return true;
    } else {
        //console.log("Array Total: Wrong");
        return false;
    }
}

// was meant to sort the array before passing it to checkforduplicatesinarray:
function checkArray(arr) {
    const sortedArray = arr.sort((a, b) => {
        return a.value - b.value;
    });
    let currentValueString = "";
    sortedArray.forEach((element) => {
        currentValueString += element.value;
    });
    // Checks
    //console.log()
    const arrOfDuplicates = checkforDuplicatesInArray(arr);
    markItems(arrOfDuplicates);
}

function getArrFromBothDirections(fieldid) {
    // NB: this function will only work with Sudoku sized: 9x9
    console.log(fieldid);
    //row
    const rowNumber = fieldid[2];
    const columnNumber = fieldid[4];
    // NB: The rows returned in the below function are sorted on value.
    const thisRow = getRowArray(rowNumber);
    const thisColumn = getColumnArray(columnNumber);
    //console.log(rowNumber);
    console.log(thisRow);
    //console.log(columnNumber);
    console.log(thisColumn);
}
//getArrFromBothDirections("#r5c1");

function probeForValueInRow(fieldid, alternativeValues) {
    // colum has already been checked, and we have retrieved missing values in the column.
    //console.log(fieldid);
    console.log(alternativeValues);
    console.log(alternativeValues.length);
    const row = getRowArray(fieldid[2]);
    console.log(row);

    for (let i = 0; i < row.length; i++) {
        alternativeValues.forEach((value, idx) => {
            if (row[i].value == value) {
                console.log(value + " should be removed from options. Index: " + idx);
                alternativeValues.splice(idx, 1);
            }
        });
        //console.log(row[i].value);
    }
    console.log(alternativeValues.length);
    console.log(alternativeValues);
    if (alternativeValues.length == 1) {
        fillNumber(fieldid, alternativeValues[0]);
    }
    // handle if alternative values are more than one?
}

function findMissingNumbers(unSortedArr, emptyValueArr) {
    let missingValues = [];
    for (let i = 1; i <= unSortedArr.length; i++) {
        if (!unSortedArr.some((element) => element.value == i)) {
            missingValues.push(i);
        }
    }
    //handle if there is only one option:
    if (emptyValueArr.length === 1) {
        //console.log("This is an easy pick...I got this...");
        fillNumber(emptyValueArr[0].id, missingValues[0]);
    }
    //console.log(missingValues);
    return missingValues;

    // handle if there are more options?
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

/// incomplete below:

function probeLonelyFieldforPairsInOtherElements(id) {
    id = "#r9c4";
    const rowNumber = id[2];
    const columnNumber = id[4];
    const currentItemRow = getRowArray(rowNumber);
    const currentItemColumn = getColumnArray(columnNumber);

    const pairedRowsArray = getPairedElements(rowNumber);
    const pairedColumnsArray = getPairedElements(columnNumber);

    //const missingRowValues = findMissingNumbers(currentItemRow);
    const allCurrentValuesInRowOrColumn = currentItemRow.concat(currentItemColumn);
    //console.log(allCurrentValuesInRowOrColumn);
    //const possibleValues = findMissingNumbersInArray(allCurrentValuesInRowOrColumn);
    //const possibleValues = allCurrentValuesInRowOrColumn.filter(onlyUnique);
    let allCurrentValuesOnly = [];
    allCurrentValuesInRowOrColumn.forEach((element) => {
        //console.log(element.value);
        //allCurrentValuesOnly.push(element.value);
        if (element.value !== "") {
            allCurrentValuesOnly.push(element.value);
        }
    });
    console.log(allCurrentValuesOnly);
    const allCurrentUniqueValues = allCurrentValuesOnly.filter(onlyUnique);
    //console.log(allCurrentUniqueValues);

    const allPossibleValues = findMissingNumbersInArray(allCurrentValuesOnly);

    //const missingValuesInRow = findMissingNumbersInArray(currentItemRow);
    //const missingValuesInColumn = findMissingNumbersInArray(currentItemColumn);
    const allMissingValuesInRowOrColumn = missingValuesInRow.concat(missingValuesInColumn);
    console.log(allMissingValuesInRowOrColumn);
    const allCurrentUniqueValuesMissing = allMissingValuesInRowOrColumn.filter(onlyUnique);
    //console.log(allPossibleValues);
    console.log(allCurrentUniqueValuesMissing);
    //console.log(missingRowValues);
    //console.log(possibleValues);

    // Get missing values for the current field:
}

function isFieldAloneInBoxRow(id) {
    let result = false;
    const currentColumnIndex = id.id[3];
    const emptyFieldId = id.id;
    const columnsToCheck = getPairedElements(currentColumnIndex);
    const firstFieldId = "#" + emptyFieldId.slice(0, -1) + columnsToCheck[0];
    const secondFieldId = "#" + emptyFieldId.slice(0, -1) + columnsToCheck[1];
    if (document.querySelector(firstFieldId).value !== "" && document.querySelector(secondFieldId).value !== "") {
        result = true;
    }
    return result;
}

function isFieldAloneInBoxColumn(id) {
    let result = false;
    const currentRowIndex = id.id[1];
    const emptyFieldId = id.id;
    const rowsToCheck = getPairedElements(currentRowIndex);
    const firstFieldId = "#" + emptyFieldId.replace(emptyFieldId[1], rowsToCheck[0]);
    const secondFieldId = "#" + emptyFieldId.replace(emptyFieldId[1], rowsToCheck[1]);
    console.log(firstFieldId + " - " + secondFieldId);
    if (document.querySelector(firstFieldId).value !== "" && document.querySelector(secondFieldId).value !== "") {
        result = true;
    }
    return result;
}
