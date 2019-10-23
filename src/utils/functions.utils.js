export function checkWinner(tiles) {
    const rows = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6]
    ]

    for (let i=0; i<rows.length; i++) {
        const [a, b, c] = rows[i];

        if(tiles[a] && tiles[a] === tiles[b] && tiles[a] === tiles[c]){
            // Return winner ('x' or 'o')
            return tiles[a];
        }
    }
    // No winner so return null
    return null;
};