const helpButton = document.querySelector(".controls .help");

helpButton.addEventListener("click", solveFunction);

function solveFunction() {
    let safeMoves = [];
    // rows

    for (let i = 1; i <= numberOfRows; i++) {
        //console.log("Box: " + i);
        const currentitems = getBoxArray(i);
        //console.log(currentitems);
        const emptyValueArray = findEmptyFields(currentitems);
        // avoid running if there are no values to find:
        if (emptyValueArray.length > 0) {
            findMissingNumbers(currentitems, emptyValueArray);
        }
    }
    // Add similar to above for rows and columns.
}

function findMissingNumbers(unSortedArr, emptyValueArr) {
    //const backupArr = unSortedArr.slice(0);
    // const sortedArray = unSortedArr.sort((a, b) => {
    //     return a.value - b.value;
    // });
    //const fieldsToFind = emptyValueArr.length;
    let missingValues = [];
    for (let i = 1; i <= unSortedArr.length; i++) {
        if (!unSortedArr.some((element) => element.value == i)) {
            missingValues.push(i);
        }
    }
    if (emptyValueArr.length === 1) {
        console.log("This is an easy pick...I got this...");
        fillNumber(emptyValueArr[0].id, missingValues[0]);
    }
}
function fillNumber(field, value) {
    console.log("Filling " + field + " with: " + value);
    document.querySelector(field).value = value;
    // log this.
    // make it green.
    // Recheck.
}
// 1: missing in row
// 2: missing in column
// 3: missing in box.

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

// 4: check row and column

// 5: check row and box

// 6: check column and box

// 7: only option left due to blockage in other elements.
