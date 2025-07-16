let whiteTiles = [];

function spawnWhiteTile(count = 1) {
    const edgeTiles = [];

    for (let r = 0; r < boardRows; r++) {
        for (let c = 0; c < boardCols; c++) {
            const isEdge = r === 0 || r === boardRows - 1 || c === 0 || c === boardCols - 1;
            if (isEdge && boardArray[r][c].state === "empty") {
                edgeTiles.push({ row: r, col: c });
            }
        }
    }

    for (let i = 0; i < count && edgeTiles.length > 0; i++) {
        const idx = Math.floor(Math.random() * edgeTiles.length);
        const { row, col } = edgeTiles.splice(idx, 1)[0];

        boardArray[row][col].state = "white";
        boardArray[row][col].element.style.backgroundColor = "white";
        whiteTiles.push({ row, col, moveTimer: 2 });
    }
}

function updateWhiteTiles() {
    whiteTiles.forEach(tile => {
        tile.moveTimer--;
        if (tile.moveTimer <= 0) {
            try {
                moveTileRandomly(tile, "white");
            } catch (err) {
                console.error("White tile movement error:", err);
            }
            tile.moveTimer = 2;
        }
    });
}

function moveTileRandomly(tileObj, stateType) {
    const directions = [
        [0, 1], [1, 0], [0, -1], [-1, 0]
    ];
    const shuffled = directions.sort(() => Math.random() - 0.5);

    let moved = false;

    for (let [dx, dy] of shuffled) {
        const newRow = tileObj.row + dy;
        const newCol = tileObj.col + dx;

        if (
            newRow >= 0 && newRow < boardRows &&
            newCol >= 0 && newCol < boardCols &&
            boardArray[newRow][newCol].state === "empty"
        ) {
            // Clear old tile
            boardArray[tileObj.row][tileObj.col].state = "empty";
            boardArray[tileObj.row][tileObj.col].element.style.backgroundColor = "#444";

            // Set new tile
            boardArray[newRow][newCol].state = stateType;
            boardArray[newRow][newCol].element.style.backgroundColor = (stateType === "white") ? "white" : "red";

            tileObj.row = newRow;
            tileObj.col = newCol;

            moved = true;
            break;
        }
    }

    if (!moved) {
        // Could not move, just log for now
        console.warn(`Tile of type ${stateType} at (${tileObj.row}, ${tileObj.col}) could not move.`);
    }
}