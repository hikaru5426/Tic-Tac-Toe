const createNewGameBtn = document.querySelector("#createNewGame-btn");
const createGameDialog = document.querySelector("#createGame-dialog");
const firstPlayerNameInput = document.querySelector("#firstPlayerName-input");
const secondPlayerNameInput = document.querySelector("#secondPlayerName-input");
const cancelDialogBtn = document.querySelector("#cancelDialog-btn");
const confirmDialogBtn = document.querySelector("#confirmDialog-btn");

const cellsDiv = document.querySelectorAll(".cell");
const result = document.querySelector("#result");

const playerFactory = (name, playerNumber) => {
    let number = playerNumber;
    let points = 0;
    let turnToPlay = false;

    return {
        name,
        number,
        addPoint() {
            points += 1;
        },
        getPoints() {
            return points;
        },
        resetPoints() {
            points = 0;
        },
        getTurnToPlay(){
            return turnToPlay;
        },
        toggleTurnToPlay(){
            turnToPlay != turnToPlay;
        },
        resetTurnToPlay(){
            turnToPlay = false;
        }
    }
};

const cellFactory = (number) => {
    const cellNumber = number;
    let filled = false;

    return {
        getNumber() {
            return cellNumber;
        },
        getFilled() {
            return filled;
        },
        fillCell(symbol) {
            filled = symbol;
        },
        resetCell() {
            filled = false;
        }

    }
}

const board = (() => {
    const cell1 = cellFactory(1);
    const cell2 = cellFactory(2);
    const cell3 = cellFactory(3);
    const cell4 = cellFactory(4);
    const cell5 = cellFactory(5);
    const cell6 = cellFactory(6);
    const cell7 = cellFactory(7);
    const cell8 = cellFactory(8);
    const cell9 = cellFactory(9);
    const cells = { cell1, cell2, cell3, cell4, cell5, cell6, cell7, cell8, cell9 };

    return {
        fillCellManually(cellNumber, symbol) {
            cells[`cell${cellNumber}`].fillCell(symbol);
        },
        getCells() {
            return cells;
        },
        hasCompleteLine(playerNumber) {
            let symbol;
            playerNumber === 1 ? symbol = "circle" : symbol = "cross";
            if ((cell1.getFilled() === symbol && cell2.getFilled() === symbol && cell3.getFilled() === symbol) // first row
                | (cell4.getFilled() === symbol && cell5.getFilled() === symbol && cell6.getFilled() === symbol) // middle row
                | (cell7.getFilled() === symbol && cell8.getFilled() === symbol && cell9.getFilled() === symbol) // last row
                | (cell1.getFilled() === symbol && cell4.getFilled() === symbol && cell7.getFilled() === symbol) //first column
                | (cell2.getFilled() === symbol && cell5.getFilled() === symbol && cell8.getFilled() === symbol) // middle column
                | (cell3.getFilled() === symbol && cell6.getFilled() === symbol && cell9.getFilled() === symbol) // last column
                | (cell1.getFilled() === symbol && cell5.getFilled() === symbol && cell9.getFilled() === symbol) // top left to bottom right diagonal
                | (cell3.getFilled() === symbol && cell5.getFilled() === symbol && cell7.getFilled() === symbol)) // top right to bottom left diagonal
            {
                return true;
            }else{
                return false;
            }
        },
        resetBoard() {
            for(let number = 1; number <= 9; number++){
                cells[`cell${number}`].resetCell();
            }
        },
        displayBoard() {
            cellsDiv.forEach(cell => {
                const img = document.createElement("img");
                img.classList.add("symbol");
                const symbol = cells[cell.id].getFilled();

                if (symbol === "circle") {
                    img.src = "images/circle.svg";
                } else if (symbol === "cross") {
                    img.src = "images/cross.svg";
                }
                cell.appendChild(img);
            })
        }
    }
})();

const roundFactory = () => {

    let completeLine = false;
    while (completeLine === false) {

    }
}

const game = (() => {
    let gameActive = false;
    
})

// cells.addEventListener("click", () => {

// })

createNewGameBtn.addEventListener("click", () => {
    createGameDialog.showModal();
});

createGameDialog.addEventListener("close", () => {
    createGameDialog.querySelectorAll("input").forEach(input => {
        input.value = "";
    });
})

cancelDialogBtn.addEventListener("click", (event) => {
    event.preventDefault();
    createGameDialog.close();
})

confirmDialogBtn.addEventListener("click", (event) => {
    event.preventDefault();
    player1 = playerFactory(firstPlayerNameInput.value, 1);
    player2 = playerFactory(secondPlayerNameInput.value, 2);
    createGameDialog.close();
})

let player1;
let player2;