function checkForErrors() {
    for (let i = 1; i <= numberOfRows; i++) {
        // Checks if each box got all 9 numbers and store it to array;
        const rowDuplicates = checkforDuplicatesInArray(getRowArray(i));
        // Checks if all columns got all 9 numbers and store it to array;
        const columnDuplicates = checkforDuplicatesInArray(getColumnArray(i));
        // Checks if all rows got all 9 numbers and store it to array;
        const boxDuplicates = checkforDuplicatesInArray(getBoxArray(i));
        // Combine all the arrays:
        const allDuplicates = rowDuplicates.concat(columnDuplicates, boxDuplicates);
        // Mark the duplicated items:
        markItems(allDuplicates);
    }
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
    return duplicates;
}
