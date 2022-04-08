//GameTable: Create new ones by clearing and entering a new table, when saving the new string will be shown in console.

// lvl1   #1: const filledNumbers = "42683 591 859216 77916 5 3896571 28 13486275982745 163 7235 1 9598416273314972 86";
// lvl2  #91: const filledNumbers = "1 93 5 242 846  7   7  19 6948 1673275 3  91 1 379 5 8  3251  71  6478  27 38 61 ";
// lvl3 #379: const filledNumbers = "5  4  8 3  18  24 8  95271 2 69   4873 1  95    68 32 6  37 182317        8  957 ";
// lvl3 #380: const filledNumbers = "     1 52 345 79  6  4   3  6  47  5458 1972 17   3 4 9       83  896 45 8 32   7";
// lvl4 #432: const filledNumbers = "43   91  96    7  2  7  98   4 2 591   3       2 7  6  15   74843 589  262    395";
// lvl4 #431 (unsolved):
const filledNumbers = "  3 57 4 5     6     263 5     813 9 4   38 1 38   5 2 1  36 25     549   57    6";

// lvl4 #440 (unsolved):
// const filledNumbers = "265 1 84 3    4 51 94  8   5784 6  2         93  81  7 2      1 63  8 92  5 2 4  ";
//const filledNumbers = "265 1 84 387 24 51194  8   578436192  6279835932581647 2  5  81 63  8 92  5 2 4  ";
// lvl 431 (ready to solve scenario where two of 3 values are occupied. r1c2 = 9 ) :
// const filledNumbers = "  3 57 485     6     26395 5 24813 9 4   38 11386  542 14 36 25     549   57   16";

const filledNumbersArray = filledNumbers.split("");

let storage = window.localStorage;
const expectedArrayString = "123456789";
let alreadyDisabledFields = [];
let shouldRecheck = true; // is this used elsewhere?
//
const gameTable = document.querySelector(".gametable");

const allBoxes = document.querySelectorAll(".gametable__box");

const loadTableButton = document.querySelector(".controls .loadtable");
const clearTableButton = document.querySelector(".controls .cleartable");
const saveTableButton = document.querySelector(".controls .savetable");
const rotateButton = document.querySelector(".controls .rotate");
const modifyTableButton = document.querySelector(".controls .modifytable");
const helpButton = document.querySelector(".controls .help");
const resetButton = document.querySelector(".controls .reset");
const statusWindow = document.querySelector(".status");
const statusMessage = document.querySelector(".status .message");
const allInputs = document.querySelectorAll(".gametable__box__table input");
const numberOfRows = Math.sqrt(allInputs.length);
