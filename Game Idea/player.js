let playerPos = { row: 0, col: 0 };
let playerHealth = 3;
let playerScore = 0;

function updateUIStats() {
    document.getElementById("score-value").textContent = playerScore;
    document.getElementById("health-value").textContent = playerHealth;
}

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
    const oldPos = { ...playerPos };
    let moved = false;

    switch (e.key.toLowerCase()) {
        case "w":
            movePlayer(0, -1);
            moved = true;
            break;
        case "a":
            movePlayer(-1, 0);
            moved = true;
            break;
        case "s":
            movePlayer(0, 1);
            moved = true;
            break;
        case "d":
            movePlayer(1, 0);
            moved = true;
            break;
        case " ":
            logStatus("Action made");
            moved = true;
            break;
    }

    if (moved) {
        handleTileCollision(oldPos);
        onPlayerAction();
    }
});
updateUIStats();
});

function handleTileCollision(oldPos) {
    const { row, col } = playerPos;
    const tile = boardArray[row][col];

    if (tile.state === "white") {
        logStatus("Quarry claimed");
        playerScore += 1;
        tile.state = "empty";
        tile.element.style.backgroundColor = "#444";
        updateUIStats();
    }

    if (tile.state === "red") {
        logStatus("Player damaged");
        playerHealth -= 1;
        updateUIStats();

        // Reset position
        placePlayer(oldPos.row, oldPos.col);
    }
}
