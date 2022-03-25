function checkAllBoxes() {
    for (let i = 1; i <= numberOfRows; i++) {
        const boxItems = getBoxArray(i);
        //console.log(boxItems);
    }
}

function getBoxArray(box) {
    let tempValues = [];
    let currentValueArray = [];
    const boxId = ".gametable__box_" + box;
    const currentBoxValues = document.querySelectorAll(`${boxId} input`);
    for (let i = 0; i < numberOfRows; i++) {
        const elementId = `#${currentBoxValues[i].id}`;
        const currentValue = `${currentBoxValues[i].value}`;
        currentObject = {
            id: elementId,
            value: currentValue,
        };
        currentValueArray.push(currentObject);
        tempValues.push(currentObject);
    }
    //const currentValueArray = tempValues;
    //console.log(currentValueArray);
    //console.log(tempValues);

    checkArray(tempValues);
    return currentValueArray;
}
