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
        // check for only option (all alternatives);
        checkForOnlyOption();
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
    //console.log(missingValues);
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

//function checkBothDirections(mainArr, secArr, idx) {}

//checkBothDirections(7)

// below is not in use at the moment.
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

// 5: check row and box

// 6: check column and box

// 7: only option left due to blockage in other elements.

// 8: 3 or 4 in row or column missing, where 1 is alone in a box,
//    and the rest is the only missing in another box.

// 9
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

// Function above works, but it`s not added to anything yet. Just tested with a single field and expected values.
// probeForValueInRow("#r2c7", [4, 8])

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

function checkForOnlyOption() {
    //const values = expectedArrayString.indexOf("2");
    //let values = expectedArrayString;
    let values = "13456789";
    //console.log("Values: " + expectedArrayString.length);
    //console.log(values.replace("2",""));
    let emptyFieldsToCheck = [];
    emptyFieldsToCheck = getAllFieldsWithNoValue();
    //console.log(emptyFieldsToCheck.length);
    //foreach allInputs.id =
    let allValues = [];

    emptyFieldsToCheck.forEach((field) => {
        // reset :
        values = "123456789";
        allValues = [];
        // 1. find box:
        const currentBox = field.classList[0];

        // 2. find box values.
        const allBoxFields = document.querySelectorAll(`.${currentBox}`);
        allBoxFields.forEach((field) => {
            if (field.value > 0) {
                allValues.push(field.value);
            }
        });
        //find values in row:
        const currentRow = field.classList[3];
        const allRowFields = document.querySelectorAll(`.${currentRow}`);
        allRowFields.forEach((field) => {
            if (field.value > 0) {
                allValues.push(field.value);
                // add values to an array or remove from one?
            }
        });
        const currentColumn = field.classList[4];
        const allColumnFields = document.querySelectorAll(`.${currentColumn}`);
        allColumnFields.forEach((field) => {
            if (field.value > 0) {
                allValues.push(field.value);
            }
        });
        //console.log("All values: ");
        //console.log(allValues);
        allValues.forEach((value) => {
            if (values.includes(value) === true) {
                //console.log("Included: " + value);
                values = values.replace(value, "");
            } else {
                //console.log("Not included: " + value);
            }
            // if present => remove it.
        });
        if (values.length === 1) {
            //console.log(`Field ${field.id} should get: ` + values);
            // Place value now.
            fillNumber("#" + field.id, values);
        }
        //console.log("Remaining options for " + field.id + ":");
        //console.log(values);
    });
}
