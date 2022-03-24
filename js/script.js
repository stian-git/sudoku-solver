// set maxLength.
//import "functions/checkInputLength";
const statusWindow = document.querySelector(".status");
// statusWindow.style.display = "none";
const allInputs = document.querySelectorAll(".gametable__box__table input");

allInputs.forEach((element) => {
    element.addEventListener("keyup", (e) => {
        // Check input length as it will not work with css on numbers:
        checkInputLength(e.target);
    });
});
