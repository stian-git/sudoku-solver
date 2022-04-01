// Source: https://no.cm-santiago-do-cacem.pt/how-solve-sudoku-puzzles-any-difficulty

// 1. get an empty field:
// 2. if empty field is only in row or column:
// 3. get possible values for field:
// 4. verify if remaining rows or columns got the remaining values.

// Test with r9c4

function probeLonelyFieldforPairsInOtherElements(id, checkRow) {
    // abort this function if checkrow is not defined.
    if (checkRow === undefined) {
        console.error("checkRow is not defined");
        return;
    }
    //id = "#r9c4";
    const currentItemElement = document.querySelector(id);
    const rowNumber = id[2];
    const columnNumber = id[4];
    const boxNumber = currentItemElement.classList[0][3];
    const currentItemRow = getRowArray(rowNumber);
    const currentItemColumn = getColumnArray(columnNumber);
    const currentItemBox = getBoxArray(boxNumber);

    //console.log(currentItemElement.classList[0][3]);
    //const currentItemBox = getBoxArray()

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
        // rowValues.forEach((rowValue) => {
        //     pairedRowsValuesArray.push(rowValue.value);
        // } )
    });
    console.log(pairedRowsValuesArray);

    if (checkRow === true) {
        allPossibleValues.forEach((value) => {
            console.log("Checking rows...");
            //console.log(pairedRowsArray[0].length);
            for (let j = 0; j < pairedRowsValuesArray[0].length; j++) {
                //console.log(pairedRowsValuesArray[0][j].value);
                if (value == pairedRowsValuesArray[0][j].value) {
                    console.log("Match: " + pairedRowsValuesArray[0][j].value);
                    for (let k = 0; k < pairedRowsValuesArray[1].length; k++) {
                        if (value == pairedRowsValuesArray[0][j].value && value == pairedRowsValuesArray[1][k].value) {
                            console.log("Matched in both places: " + value);
                            // add this value to this field.
                            fillNumber(id, value);
                        }
                    }
                }
                //console.log("Something: " +j);
            }
        });
    } else {
        console.log("Checking columns...");
        allPossibleValues.forEach((value) => {
            //console.log("Test");
            //console.log(pairedRowsArray[0].length);
            // for (let j = 0; j < pairedRowsValuesArray[0].length; j++) {
            //     //console.log(pairedRowsValuesArray[0][j].value);
            //     if (value == pairedRowsValuesArray[0][j].value) {
            //         console.log("Match: " + pairedRowsValuesArray[0][j].value);
            //         for (let k = 0; k < pairedRowsValuesArray[1].length; k++) {
            //             if (value == pairedRowsValuesArray[0][j].value && value == pairedRowsValuesArray[1][k].value) {
            //                 console.log("Matched in both places: " + value);
            //                 // add this value to this field.
            //             }
            //         }
            //     }
            //     //console.log("Something: " +j);
            // }
            //Check paired columns:
            for (let s = 0; s < pairedColumnsValuesArray[0].length; s++) {
                //console.log(pairedRowsValuesArray[0][j].value);
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
                //console.log("Something: " +j);
            }
        });
    }

    // ONLY ROW IS TESTED OK. COLUMN also gives a match, Must be checked!

    // Check paired columns:
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
