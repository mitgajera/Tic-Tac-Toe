let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#ng-btn");

let turnO = true;
let gameActive = true;

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

const resetGame = () => {
    turnO = true;
    gameActive = true;
    enableBtns();
    console.log("Game reset");
};

const disableBtns = () => {
    for (let btn of boxes) {
        btn.disabled = true;
    }
};

const enableBtns = () => {
    for (let btn of boxes) {
        btn.disabled = false;
        btn.innerText = "";
    }
};

const showWinner = (winner) => {
    alert(winner + " Wins!");
    gameActive = false;
    disableBtns();
};

const showDraw = () => {
    alert("It's a draw!");
    gameActive = false;
    disableBtns();
};

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1Value = boxes[pattern[0]].innerText;
        let pos2Value = boxes[pattern[1]].innerText;
        let pos3Value = boxes[pattern[2]].innerText;

        if (pos1Value !== "" && pos1Value === pos2Value && pos2Value === pos3Value) {
            console.log(pos1Value + " Wins");
            showWinner(pos1Value);
            return;
        }
    }

    let allFilled = true;
    for (let box of boxes) {
        if (box.innerText === "") {
            allFilled = false;
            break;
        }
    }

    if (allFilled) {
        console.log("It's a draw");
        showDraw();
    }
};

boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        if (gameActive && box.innerText === "") {
            console.log("Box " + index + " clicked");
            if (turnO) {
                box.innerText = "O";
                box.style.color = "green";
                turnO = false;
            } else {
                box.innerText = "X";
                turnO = true;
            }
            box.disabled = true;
            checkWinner();
        }
    });
});

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);

