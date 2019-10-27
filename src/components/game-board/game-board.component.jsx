import React from "react";

import GameBoardTile from "../game-board-tile/game-board-tile.component";

import * as utils from "../../utils/functions.utils";

import { BackgroundContainer, GameBoardContainer } from "./game-board.styles";

class GameBoard extends React.Component {
  state = {
    theme: "default",
    tiles: this.initializeTiles(5, 5),
    currentPlayer: 1,
    moves: [1, 2],
    winner: 0
  };

  // Initialize basic tile properties
  initializeTiles(height, width) {
    let data = [];

    // Create default tile data
    for (let i = 0; i < height; i++) {
      data.push([]);
      for (let j = 0; j < width; j++) {
        data[i][j] = {
          x: i,
          y: j,
          owner: 0,
          isKing: false,
          hasWallN: false,
          hasWallE: false,
          hasWallS: false,
          hasWallW: false,
          isUnwallable: false,
          playedLast: false
        };
      }
    }
    // Set king tiles
    data[0][4].isKing = true;
    data[4][0].isKing = true;
    data[0][4].owner = 2;
    data[4][0].owner = 1;
    // Set unwallable tiles
    data[1][1].isUnwallable = true;
    data[2][2].isUnwallable = true;
    data[3][3].isUnwallable = true;
    // Return
    return data;
  }

  // Handle tile clicks
  handleTileClick = (x, y) => {
    const { currentPlayer } = this.state;
    console.log("currentPlayer: " + currentPlayer + " x: " + x + " y: " + y);
    // Get current state of tiles
    // const tiles = this.state.tiles.slice();
    // Define variables to update for next setState
    let updatedTiles = this.state.tiles.slice();
    let updatedMoves = this.state.moves;
    // Perform updates
    if (updatedTiles[x][y].owner === currentPlayer) {
      console.log("Player already owns this.");
    } else if (updatedTiles[x][y].owner === 0) {
      console.log("No one owns this tile.");
      if (utils.checkNeighbors(updatedTiles, x, y, currentPlayer)) {
        updatedTiles[x][y].owner = currentPlayer;
        updatedTiles[x][y].playedLast = true;
        updatedMoves[currentPlayer - 1]--;
      }
      if (currentPlayer === 1);
    } else {
      console.log("Opponent owns this tile.");
      if (utils.checkNeighbors(updatedTiles, x, y, currentPlayer)) {
        updatedTiles[x][y].owner = currentPlayer;
        updatedTiles[x][y].playedLast = true;
        updatedMoves[currentPlayer - 1]--;
      }
    }
    // Check if any tiles detached from king and update accordingly

    // !!!TODO!!!

    // Determine next player
    let nextPlayer = currentPlayer;
    let otherPlayer = currentPlayer === 1 ? 2 : 1;
    if(updatedMoves[currentPlayer - 1] < 1) {
      updatedMoves[currentPlayer -1] = 2;
      nextPlayer = otherPlayer;
    }
    // Update board state with new data
    this.setState({
      tiles: updatedTiles,
      currentPlayer: nextPlayer,
      moves: updatedMoves
    });
    // End game if king tile is captured
    if (utils.checkWinner(updatedTiles)){
      return;
    }
  };

  // Restart board (reset to initial state)
  handleBoardRestart = () => {
    this.setState({
      tiles: this.initializeTiles(5, 5),
      currentPlayer: 1,
      moves: [1, 2],
      winner: 0
    });
  };

  // Load all tiles based on state tile data
  displayBoard(tiles) {
    return tiles.map(row => {
      return row.map(data => {
        return (
          <div key={data.x * row.length + data.y}>
            <GameBoardTile
              onClick={() => this.handleTileClick(data.x, data.y)}
              data={data}
              theme={this.state.theme}
            />
          </div>
        );
      });
    });
  }

  render() {
    // Destructure common properties
    const { tiles } = this.state;
    // Get winner if exists
    const winner = utils.checkWinner(tiles);
    // Status message
    let status;
    if (winner) {
      // Winner exists
      status = `${winner} wins!`;
    } else {
      // No winner yet, next turn
      status = `${this.state.currentPlayer === 1 ? "P1" : "P2"}'s turn.`;
    }

    return (
      <BackgroundContainer>
        <div className="board-wrapper">
          <div className="board">
            <h2 className="board-heading">{status}</h2>
            <h3 className="moves">{`P1 Moves: ${this.state.moves[0]}, P2 Moves: ${
              this.state.moves[1]
            }`}</h3>
            <GameBoardContainer>{this.displayBoard(this.state.tiles)}</GameBoardContainer>
          </div>
          {winner && (
            <button className="new-game-button" onClick={this.handleBoardRestart}>
              New Game
            </button>
          )}
        </div>
      </BackgroundContainer>
    );
  }
}

export default GameBoard;
