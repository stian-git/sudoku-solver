const allInputs = document.querySelectorAll(".gametable__box__table input");
const numberOfRows = Math.sqrt(allInputs.length);

const helpButton = document.querySelector(".controls .help");
helpButton.addEventListener("click", solveFunction);

let shouldRecheck = true;

function solveFunction() {
    while (shouldRecheck === true) {
        console.log("Running loop");
        //changes = 0;
        shouldRecheck = false;

        // checks single elements (row, column, box):
        for (let i = 1; i <= numberOfRows; i++) {
            let arrayOfValueArrays = [];
            const currentBoxObject = {
                type: "box",
                objects: getBoxArray(i),
            };
            const currentRowObject = {
                type: "row",
                objects: getRowArray(i),
            };
            const currentColumnObject = {
                type: "column",
                objects: getColumnArray(i),
            };
            arrayOfValueArrays.push(currentBoxObject, currentRowObject, currentColumnObject);
            //console.log(arrayOfValueArrays);
            for (let j = 0; j < arrayOfValueArrays.length; j++) {
                const currentElementItems = arrayOfValueArrays[j].objects;
                const emptyValueArray = findEmptyFields(currentElementItems);
                if (emptyValueArray.length > 0) {
                    const missingNumbers = findMissingNumbers(currentElementItems, emptyValueArray);
                    //console.log(missingNumbers);
                    if (missingNumbers.length == 1) {
                        shouldRecheck = true;
                        //what if there are more?
                    }
                }
            }
        }
    }
    shouldRecheck = true;
    clearAllClasses();
    checkForErrors();
    checkForVictory();
    // Add similar to above for rows and columns.
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
    return missingValues;
    // handle if there are more options?
}
function fillNumber(field, value) {
    console.log("Filling " + field + " with: " + value);
    document.querySelector(field).value = value;
    // log this.
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

// 1: OK. missing in row
// 2: OK. missing in column
// 3: OK. missing in box.

// 4: check row and column

function checkBothDirections(mainArr, secArr, idx) {}

//checkBothDirections(7)

function getArrFromBothDirections(fieldid) {
    // NB: this function will only work with Sudoku sized: 9x9
    console.log(fieldid);
    //row

    const rowNumber = fieldid[2];
    const columnNumber = fieldid[4];
    const thisRow = getRowArray(rowNumber);
    const thisColumn = getColumnArray(columnNumber);
    console.log(rowNumber);
    console.log(thisRow);
    console.log(columnNumber);
    console.log(thisColumn);
}

getArrFromBothDirections("#r5c1");

// 5: check row and box

// 6: check column and box

// 7: only option left due to blockage in other elements.

// 8: 3 or 4 in row or column missing, where 1 is alone in a box,
//    and the rest is the only missing in another box.

// 9
