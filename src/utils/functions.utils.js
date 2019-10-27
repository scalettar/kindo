export function checkWinner(tiles) {
    if(tiles[0][4].owner === 1) return "P1";
    if(tiles[4][0].owner === 2) return "P2";
    return null;
};

export function checkNeighbors(tiles, x, y, currentPlayer) {
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