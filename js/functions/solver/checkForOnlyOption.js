function checkForOnlyOption() {
    let changeIsMade = false;
    let values = "13456789";
    let emptyFieldsToCheck = [];
    emptyFieldsToCheck = getAllFieldsWithNoValue();
    let allValues = [];
    emptyFieldsToCheck.forEach((field) => {
        // reset :
        values = "123456789";
        allValues = [];
        // find box values.
        const currentBox = field.classList[0];
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
            }
        });
        //find values in column:
        const currentColumn = field.classList[4];
        const allColumnFields = document.querySelectorAll(`.${currentColumn}`);
        allColumnFields.forEach((field) => {
            if (field.value > 0) {
                allValues.push(field.value);
            }
        });
        // Remove found values from the string of all available numbers
        allValues.forEach((value) => {
            if (values.includes(value) === true) {
                values = values.replace(value, "");
            }
        });
        // if possible values are only on left, we fill it:
        if (values.length === 1) {
            fillNumber("#" + field.id, values);
            changeIsMade = true;
        }
    });
    return changeIsMade;
}
