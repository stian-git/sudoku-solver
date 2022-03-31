// Source: https://no.cm-santiago-do-cacem.pt/how-solve-sudoku-puzzles-any-difficulty

// 1. get an empty field:
// 2. if empty field is only in row or column:
// 3. get possible values for field:
// 4. verify if remaining rows or columns got the remaining values.

// Test with r9c4

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

function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}

function findMissingNumbersInArray(unSortedArr) {
    let missingValues;
    for (let i = 1; i <= unSortedArr.length; i++) {
        if (!unSortedArr.some((element) => element.value == i)) {
            if (i !== "") {
                missingValues.push(i);
            }
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
