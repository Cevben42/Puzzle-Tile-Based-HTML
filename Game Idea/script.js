const boardCols = 12;
const boardRows = 8;
let boardArray = [];

function createBoard() {
    const gameBoard = document.getElementById("game-board");

    for (let row = 0; row < boardRows; row++) {
        let rowArray = [];

        for (let col = 0; col < boardCols; col++) {
            const tile = document.createElement("div");
            tile.classList.add("tile");
            tile.dataset.row = row;
            tile.dataset.col = col;

            tile.addEventListener("click", () => {
                console.log(`Tile clicked: (${row}, ${col})`);
            });

            gameBoard.appendChild(tile);

            rowArray.push({
                row,
                col,
                element: tile,
                state: "empty"
            });
        }

        boardArray.push(rowArray);
    }
}

window.addEventListener("DOMContentLoaded", () => {
    createBoard();
});