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
