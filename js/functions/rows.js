function checkAllRows() {
    for (let i = 1; i <= numberOfRows; i++) {
        const rowItems = getRowArray(i);
        //console.log(rowItems);
    }
}

function getRowArray(rowNumber) {
    let tempValues = [];
    //let currentObject = [];
    for (let i = 1; i <= numberOfRows; i++) {
        const elementId = `#r${rowNumber}c${i}`;
        const currentValue = document.querySelector(elementId).value;
        //const currentIndex = i-1;
        currentObject = {
            id: elementId,
            value: currentValue,
            // "index": currentIndex
        };
        //tempValues.push(tempValue);
        tempValues.push(currentObject);
    }
    checkArray(tempValues);
    //console.log(tempValues);
    //const arrayIsUnique = isArrayComplete(tempValues);
    //console.log(arrayIsUnique);
    return tempValues;
}
