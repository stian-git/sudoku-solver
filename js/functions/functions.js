function checkInputLength(element) {
    if (element.value.length > 1) {
        element.value = element.value[0];
        showStatusMessage(true, "Only a single digit allowed. Remove the excisting number first.");
    } else {
        showStatusMessage();
    }
}
const statusWindow = document.querySelector(".status");
function showStatusMessage(isError, msg) {
    if (isError == undefined) {
        statusWindow.classList.remove("success");
        statusWindow.classList.remove("error");
    } else {
        if (isError) {
            //classlist
            statusWindow.classList.remove("success");
            statusWindow.classList.add("error");
            document.querySelector(".status .message").innerHTML = `<p>${msg}</p>`;
        } else {
            statusWindow.style.display = "block";
            statusWindow.classList.add("success");
            statusWindow.classList.remove("error");
            document.querySelector(".status .message").innerHTML = `<p>${msg}</p>`;
        }
        setTimeout(() => {
            showStatusMessage();
        }, 5000);
    }
}
const gameTable = document.querySelector(".gametable");
let storage = window.localStorage;

function rotateGameTable() {
    // if (!storage.getItem("gameRotation")) {
    //     storage.setItem("gameRotation","90");
    // } else {
        
        switch (storage.getItem("gameRotation")) {
            case "90":
                storage.setItem("gameRotation","180")
                break;
            case "180":
                storage.setItem("gameRotation","270")
                break;
            case "270":
                storage.setItem("gameRotation","0")
                break;
            default:
                storage.setItem("gameRotation","90");
                break;
        
    }
    gameTable.style.transform = `rotate(${storage.getItem("gameRotation")}deg)`;
    allInputs.forEach((e) => {
        e.style.transform = `rotate(-${storage.getItem("gameRotation")}deg)`;
    });
}