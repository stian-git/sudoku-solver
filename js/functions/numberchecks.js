const allBoxes = document.querySelectorAll(".gametable__box");
//const allRows = document.querySelectorAll(".gametable__box ");

//console.log("Rows: " + allRows.length);
//console.log(allBoxes);
function checkAllBoxes() {
    //console.log("Checking...");
    for (let i = 1; i <= allBoxes.length; i++) {
        //console.log("Checking box: " + i);
        const boxStatus = checkBox(i);
        console.log("Box " + i + ": " + boxStatus);
    }
}

// function checkElement(elementId, valueArr) {
//     const arrayIsUnique = isArrayComplete(valueArr);
//     return arrayIsUnique;
// }

function checkAllRows() {
    for (let i = 1; i <= numberOfRows; i++) {
        const rowStatus = checkRow(i);
        console.log("Row " + i + ": " + rowStatus);
    }
}

function checkAllColumns() {
    for (let i = 1; i <= numberOfRows; i++) {
        const columnStatus = checkColumn(i);
        console.log("Column " + i + ": " + columnStatus);
    }
}
function checkBox(id) {
    const boxid = ".gametable__box_" + id;
    const currentBoxValues = document.querySelectorAll(`${boxid} input`);
    const tempValues = [];
    const tempElementIDs = [];
    currentBoxValues.forEach((element) => {
        tempElementIDs.push(element.id);
        tempValues.push(element.value);
    });
    const arrayIsUnique = isArrayComplete(tempValues);
    //console.log("Array is unique: " + arrayIsUnique);
    //const arrayGotNoDuplicates = checkforDuplicatesInArray()
    // const arrayIsUnique = checkElement(boxid, tempElementIDs);
    return arrayIsUnique;
}

function isArrayComplete(arr) {
    const sortedArr = arr.sort();
    const sortedArrString = sortedArr.join("");
    if (sortedArrString === "123456789") {
        return true;
    } else {
        const duplicates = checkforDuplicatesInArray(sortedArrString);
        if (duplicates.length > 0) {
            console.log("Now handling duplicates....insert identifying here?");
            return duplicates;
        } else {
            return false;
        }
    }
}

function checkRow(id) {
    let tempValues = [];
    for (let i = 1; i <= numberOfRows; i++) {
        const elementId = `#r${id}c${i}`;
        let tempValue = document.querySelector(elementId).value;
        tempValues.push(tempValue);
    }
    const arrayIsUnique = isArrayComplete(tempValues);
    return arrayIsUnique;
}

function checkColumn(id) {
    let tempValues = [];
    for (let i = 1; i <= numberOfRows; i++) {
        const elementId = `#r${i}c${id}`;
        let tempValue = document.querySelector(elementId).value;
        tempValues.push(tempValue);
    }
    const arrayIsUnique = isArrayComplete(tempValues);
    return arrayIsUnique;
}

function checkForErrors() {
    // Checks if each box got all 9 numbers;
    checkAllBoxes();
    // Checks if all rows got all 9 numbers;
    checkAllRows();
    // Checks if all columns got all 9 numbers;
    checkAllColumns();
}

function checkforDuplicatesInArray(arr) {
    console.log("Array is not complete, checking for duplicates now:");
    console.log(arr);
    let duplicates = [];
    for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[i] === arr[j]) {
                console.log("Duplicate found: " + arr[i] + "(index: " + i + ") and " + arr[j] + "(index: " + j + ")");
                duplicates.push(arr[i]);
            }
        }
    }
    console.log(duplicates);
    return duplicates;
}

function findDuplicatesIds(orgArr, dupesArr) {
    // block = row, column or
}
