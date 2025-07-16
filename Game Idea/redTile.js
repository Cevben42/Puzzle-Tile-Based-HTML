const enemyNames = ["Giraud", "Benoît", "Éloi", "Armand", "Lucien", "Marceau", "Rémy", "Renard", "Thibaut", "Vernier"];
let redTiles = [];

function randomEnemyName() {
    return enemyNames[Math.floor(Math.random() * enemyNames.length)];
}

function spawnRedTile(name) {
    const emptyTiles = [];

    for (let r = 0; r < boardRows; r++) {
        for (let c = 0; c < boardCols; c++) {
            if (boardArray[r][c].state === "empty") {
                emptyTiles.push({ row: r, col: c });
            }
        }
    }

    if (emptyTiles.length === 0) return;

    const { row, col } = emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
    boardArray[row][col].state = "red";
    boardArray[row][col].element.style.backgroundColor = "red";

    redTiles.push({ row, col, moveTimer: 3, decay: 7, name });
}

function updateRedTiles() {
    redTiles = redTiles.filter(tile => {
        // Decay check first
        tile.decay--;
        if (tile.decay <= 0) {
            boardArray[tile.row][tile.col].state = "empty";
            boardArray[tile.row][tile.col].element.style.backgroundColor = "#444";
            logStatus(`${tile.name} decayed`);
            return false; // remove from array
        }

        // Then movement
        tile.moveTimer--;
        if (tile.moveTimer <= 0) {
            try {
                moveTileRandomly(tile, "red");
            } catch (err) {
                console.error("Red tile movement error:", err);
            }
            tile.moveTimer = 3;
        }

        return true; // keep it in array
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
            // Clear old
            boardArray[tileObj.row][tileObj.col].state = "empty";
            boardArray[tileObj.row][tileObj.col].element.style.backgroundColor = "#444";

            // Set new
            boardArray[newRow][newCol].state = stateType;
            boardArray[newRow][newCol].element.style.backgroundColor = (stateType === "white") ? "white" : "red";

            tileObj.row = newRow;
            tileObj.col = newCol;

            moved = true;
            break;
        }
    }

    if (!moved) {
        console.warn(`Tile of type ${stateType} at (${tileObj.row}, ${tileObj.col}) could not move.`);
    }
}