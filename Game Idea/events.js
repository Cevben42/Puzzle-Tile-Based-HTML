let playerMoveCount = 0;

function onPlayerAction() {
    playerMoveCount++;
    logStatus(playerMoveCount);

    updateWhiteTiles();
    updateRedTiles();

    if (playerMoveCount == 5) {
        triggerEvent();
        playerMoveCount = 0;
    }
}

function triggerEvent() {
    const eventIndex = Math.floor(Math.random() * 5) + 1;
    switch (eventIndex) {
        case 1:
            logStatus("A lone square spawns in.");
            spawnWhiteTile(1);
            break;
        case 2:
            logStatus("This is event two.");
            break;
        case 3:
            logStatus("A pair of squares roam about");
            spawnWhiteTile(2);
            break;
        case 4:
            const name = randomEnemyName();
            logStatus(`${name} has risen.`);
            spawnRedTile(name);
            break;
        case 5:
            logStatus("This is event five.");
            break;
    }
}

