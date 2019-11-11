// Go through all tiles. If tile owner is "otherPlayer", check if that tile is in "connected". 
// If not, then change owner to "currentPlayer".
export const changeOwnership = (tiles, connected, currentPlayer, otherPlayer) => {
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
            if (tiles[i][j].owner === otherPlayer) {
                if (!connected.includes(i * 5 + j)) {
                    tiles[i][j].owner = currentPlayer;
                    tiles[i][j].playedLast = false;
                    tiles[i][j].hasWallN = false;
                    tiles[i][j].hasWallE = false;
                    tiles[i][j].hasWallS = false;
                    tiles[i][j].hasWallW = false;
                }
            }
        }
    }

    return tiles;
}

// Check which tiles of otherPlayer's tiles are connected to otherPlayer's king
// Return list of these connected tiles
export const checkConnected = (tiles, otherPlayer) => {
    let connected = [];
    let stack = [];
    let currentIndex;
    let x, y;

    if (otherPlayer === 1) stack.push(20);
    else stack.push(4);

    while (Array.isArray(stack) && stack.length) {
        currentIndex = stack.pop();
        x = currentIndex / 5 | 0;
        y = currentIndex % 5;
        if (!connected.includes(currentIndex)) {
            if (tiles[x][y].owner === otherPlayer) {
                connected.push(currentIndex);
                if (currentIndex > 4) { // Check N
                    stack.push(currentIndex - 5);
                }
                if ((currentIndex + 1) % 5 !== 0) { // Check E
                    stack.push(currentIndex + 1);
                }
                if (currentIndex < 20) { // Check S
                    stack.push(currentIndex + 5);
                }
                if (currentIndex % 5 !== 0) { // Check W
                    stack.push(currentIndex - 1);
                }
            }
        }
    }

    return connected;
}

// Check if a player has won and return winner if one exists
export const checkWinner = (tiles) => {
    if (tiles[0][4].owner === 1) return 1;
    if (tiles[4][0].owner === 2) return 2;

    return null;
};

// Check neighboring tiles to determine if move is valid
// Must be an adjacent tile owned by current player without a wall blocking
// the tile in that direction
export const checkNeighbors = (tiles, x, y, currentPlayer) => {
    if (!tiles[x][y].hasWallN) {
        if (x !== 0 && tiles[x - 1][y].owner === currentPlayer) return true;
    }
    if (!tiles[x][y].hasWallE) {
        if (y !== 4 && tiles[x][y + 1].owner === currentPlayer) return true;
    }
    if (!tiles[x][y].hasWallS) {
        if (x !== 4 && tiles[x + 1][y].owner === currentPlayer) return true;
    }
    if (!tiles[x][y].hasWallW) {
        if (y !== 0 && tiles[x][y - 1].owner === currentPlayer) return true;
    }

    return false;
};

// Remove "playedLast" status from tiles owned by player
export const clearPlayedLast = (tiles, player) => {
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
            if (tiles[i][j].owner === player && tiles[i][j].playedLast) tiles[i][j].playedLast = false;
        }
    }

    return tiles;
};