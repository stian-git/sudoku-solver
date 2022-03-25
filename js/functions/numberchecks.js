const allBoxes = document.querySelectorAll(".gametable__box");
const expectedArrayString = "123456789";

function checkArray(arr) {
    const sortedArray = arr.sort((a, b) => {
        return a.value - b.value;
    });
    let currentValueString = "";
    sortedArray.forEach((element) => {
        currentValueString += element.value;
    });
    // Checks
    checkExpectedArrayValues(currentValueString);
    checkforDuplicatesInArray(arr);
}

function checkExpectedArrayValues(values) {
    if (values === expectedArrayString) {
        //console.log("Array Total: OK");
        return true;
    } else {
        //console.log("Array Total: Wrong");
        return false;
    }
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
    markItems(duplicates);
    return duplicates;
}

function markItems(arr, isWrong = true) {
    if (isWrong === true) {
        //console.log("This is an error. (default)");
        arr.forEach((element) => {
            if (element.value != "") {
                document.querySelector(element.id).classList.add("wrong");
            }
        });
    } else {
        //console.log("This is an not error.");
    }
}
