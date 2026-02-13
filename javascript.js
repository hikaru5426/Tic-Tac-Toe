const cellsDiv = document.querySelectorAll(".cell");
const result = document.querySelector("#result");

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
        fillCell(playerNumber) {
            if (playerNumber === 1) {
                filled = "circle";
            } else {
                filled = "cross";
            }
        },
        resetCell() {
            filled = false;
        },

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
                if (symbol === circle) {
                    result.textContent = "player1 won";
                } else {
                    result.textContent = "player2 won";
                }
            }
        },
        displayBoard() {
            resetBoard;
            cellsDiv.forEach(cell => {
                const cellDiv = document.querySelector(`#${cell}`);
                const img = document.createElement("img");
                img.classList.add("symbol");
                const symbol = cells[cell.id].getFilled();

                if (symbol === "circle") {
                    img.src = "images/circle.svg";
                } else if(symbol === "cross"){
                    img.src = "images/cross.svg";
                }
                cellDiv.appendChild(img);
            })
        },
        resetBoard(){
            cellsDiv.forEach(cell =>{
                cell.innerHTML="";
            })
        }
    }
})();


// cells.addEventListener("click", () => {

// })

const player1 = playerFactory("Alice", 1);
const player2 = playerFactory("Michael", 2);