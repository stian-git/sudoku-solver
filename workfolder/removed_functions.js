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
