function checkAllRows() {
    for (let i = 1; i <= numberOfRows; i++) {
        const rowItems = getRowArray(i);
    }
}

function getRowArray(rowNumber) {
    let tempValues = [];
    for (let i = 1; i <= numberOfRows; i++) {
        const elementId = `#r${rowNumber}c${i}`;
        const currentValue = document.querySelector(elementId).value;
        currentObject = {
            id: elementId,
            value: currentValue,
        };
        tempValues.push(currentObject);
    }
    checkArray(tempValues);
    return tempValues;
}
