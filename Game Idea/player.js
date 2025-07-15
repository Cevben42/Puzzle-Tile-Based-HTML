let playerPos = { row: 0, col: 0 };

function placePlayer(row, col) {
    // Remove existing player
    document.querySelectorAll(".tile.player").forEach(tile => {
        tile.classList.remove("player");
    });

    const tile = boardArray[row][col].element;
    tile.classList.add("player");

    playerPos.row = row;
    playerPos.col = col;
}

function movePlayer(dx, dy) {
    const newRow = playerPos.row + dy;
    const newCol = playerPos.col + dx;

    if (
        newRow >= 0 && newRow < boardRows &&
        newCol >= 0 && newCol < boardCols
    ) {
        placePlayer(newRow, newCol);
    }
}

function logStatus(message) {
    const log = document.getElementById("log-entries");
    const entry = document.createElement("div");
    entry.textContent = message;
    log.prepend(entry); // Latest entry on top
}

window.addEventListener("DOMContentLoaded", () => {
    placePlayer(0, 0); // initial position
    document.addEventListener("keydown", (e) => {
        switch (e.key.toLowerCase()) {
            case "w":
                movePlayer(0, -1);
                break;
            case "a":
                movePlayer(-1, 0);
                break;
            case "s":
                movePlayer(0, 1);
                break;
            case "d":
                movePlayer(1, 0);
                break;
            case " ":
                logStatus("Action made");
                break;
        }
    });
});
