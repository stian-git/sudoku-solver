function checkAllColumns() {
    for (let i = 1; i <= numberOfRows; i++) {
        const columnItems = getColumnArray(i);
    }
}

function getColumnArray(columnNumber) {
    let tempValues = [];
    for (let i = 1; i <= numberOfRows; i++) {
        const elementId = `#r${i}c${columnNumber}`;
        const currentValue = document.querySelector(elementId).value;
        currentObject = {
            "id": elementId,
            "value": currentValue,
        } 
        tempValues.push(currentObject);
    }
    checkArray(tempValues);
    return tempValues;
}
