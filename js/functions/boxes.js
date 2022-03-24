function checkAllBoxes() {
    for (let i = 1; i <= numberOfRows; i++) {
        const boxItems = getBoxArray(i);
    }
}

function getBoxArray(box) {
    let tempValues = [];
    const boxId = ".gametable__box_" + box;
    const currentBoxValues = document.querySelectorAll(`${boxId} input`);
    for (let i = 0; i < numberOfRows; i++) {
        const elementId = `#${currentBoxValues[i].id}`;
        const currentValue = `${currentBoxValues[i].value}`;
        currentObject = {
            "id": elementId,
            "value": currentValue,
        } 
        tempValues.push(currentObject);
    }
    checkArray(tempValues);
    return tempValues;
}
