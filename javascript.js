const createNewGameBtn = document.querySelector("#createNewGame-btn");
const createGameDialog = document.querySelector("#createGame-dialog");
const firstPlayerNameInput = document.querySelector("#firstPlayerName-input");
const secondPlayerNameInput = document.querySelector("#secondPlayerName-input");
const cancelDialogBtn = document.querySelector("#cancelDialog-btn");
const confirmDialogBtn = document.querySelector("#confirmDialog-btn");

const scoreDiv = document.getElementById("score-div");
const player1NameP = document.getElementById("player1Name-p");
const scorePlayer1Nb = document.getElementById("scorePlayer1-nb");
const player2NameP = document.getElementById("player2Name-p");
const scorePlayer2Nb = document.getElementById("scorePlayer2-nb");

const cellsDiv = document.querySelectorAll(".cell");

const playerFactory = (name, playerNumber) => {
    let number = playerNumber;
    let points = 0;

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
        setFilled(symbol) {
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

    function resetBoard(){
            cellsDiv.forEach(cellDiv =>{
                cellDiv.innerHTML = "";
            })
        }

    return {
        fillCellManually(cellNumber, symbol) {
            cells[`cell${cellNumber}`].setFill(symbol);
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
            } else {
                return false;
            }
        },
        resetCells() {
            for (let number = 1; number <= 9; number++) {
                cells[`cell${number}`].resetCell();
            }
        },
        displayBoard() {
            resetBoard();
            cellsDiv.forEach(cellDiv => {
                const img = document.createElement("img");
                img.classList.add("symbol");
                const symbol = cells[cellDiv.id].getFilled();

                if (symbol === "circle") {
                    img.src = "images/circle.svg";
                } else if (symbol === "cross") {
                    img.src = "images/cross.svg";
                }
                cellDiv.appendChild(img);
            })
        }
    }
})();

const game = (() => {
    let gameActive = false;
    let turnToPlay;
    return{
        getGameActive(){
            return gameActive;
        },
        setGameActive(state){
            gameActive = state;
        },
        getTurnToPlay() {
            return turnToPlay;
        },
        setTurnToPlay(number){
            turnToPlay = number;
        },
        switchTurnToPlay() {
            if(turnToPlay === 1) turnToPlay = 2;
            else if(turnToPlay === 2) turnToPlay = 1;
        },
        resetTurnToPlay() {
            turnToPlay = Math.floor((Math.random()*2)+1);
        },
        updateScore(){
            scorePlayer1Nb.textContent = player1.getPoints();
            scorePlayer2Nb.textContent = player2.getPoints();
        },
        roundEnd(){
            game.updateScore();
            board.resetCells();
            board.displayBoard();
            game.resetTurnToPlay();
        }
    }
})();

cellsDiv.forEach(cellDiv => {
    cellDiv.addEventListener("click", (event) => {
        if(!game.getGameActive()) return;
        const cellName = cellDiv.id;
        if(game.getTurnToPlay() === 1){
            board.getCells()[cellName].setFilled("circle");
        }else if(game.getTurnToPlay() === 2){
            board.getCells()[cellName].setFilled("cross");
        }
        board.displayBoard();
        game.switchTurnToPlay();
        if(board.hasCompleteLine(1)){
            player1.addPoint();
            game.roundEnd();
        }else if(board.hasCompleteLine(2)){
            player2.addPoint();
            game.roundEnd();
        }
    })
})

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

    player1NameP.firstChild.textContent = firstPlayerNameInput.value;
    player2NameP.firstChild.textContent = secondPlayerNameInput.value;
    scorePlayer1Nb.textContent = "0";
    scorePlayer2Nb.textContent = "0";
    scoreDiv.classList.remove("hidden");

    board.resetCells();
    board.displayBoard();
    game.resetTurnToPlay();
    game.setGameActive(true);

    createGameDialog.close();
})

let player1;
let player2;