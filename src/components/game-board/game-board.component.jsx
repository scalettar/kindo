import React from "react";

import GameBoardTile from "../game-board-tile/game-board-tile.component";

import * as utils from "../../utils/functions.utils";

import { BackgroundContainer, GameBoardContainer, MovesContainer } from "./game-board.styles";

class GameBoard extends React.Component {
  state = {
    theme: "default",
    tiles: this.initializeTiles(5, 5),
    currentPlayer: 1,
    currentMoves: 1,
    nextMoves: [2, 2],
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
    console.log(
      "START, CurrentPlayer: " +
        currentPlayer +
        " CurrentMoves: " +
        this.state.currentMoves +
        " nextMoves: " +
        this.state.nextMoves[0] +
        ", " +
        this.state.nextMoves[1]
    );
    let otherPlayer = currentPlayer === 1 ? 2 : 1;
    // Define variables to update for next setState
    let updatedTiles = this.state.tiles.slice();
    let updatedCurrentMoves = this.state.currentMoves;
    let updatedNextMoves = this.state.nextMoves;
    // Perform updates
    if (updatedTiles[x][y].owner === currentPlayer) {
      // !!! TODO !!!
      // After player clicks on tile, they can press one of 4 keys.
      // Each key corresponds to a direction to place a wall
    } else if (updatedTiles[x][y].owner === 0) {
      if (utils.checkNeighbors(updatedTiles, x, y, currentPlayer)) {
        updatedTiles[x][y].owner = currentPlayer;
        updatedTiles[x][y].playedLast = true;
        updatedCurrentMoves--;
      }
      if (currentPlayer === 1);
    } else {
      if (utils.checkNeighbors(updatedTiles, x, y, currentPlayer)) {
        if (updatedTiles[x][y].playedLast) updatedNextMoves[otherPlayer - 1]++;
        updatedTiles[x][y].owner = currentPlayer;
        updatedTiles[x][y].playedLast = true;
        updatedCurrentMoves--;
      }
    }
    // Check if any tiles detached from king and update accordingly

    // !!! TODO !!!
    // 1. Use DFS from otherPlayer's king tile to check which of their tiles are still attached
    // Make a list of these attached tiles
    // 2. Go through all tiles. If tile owner is otherPlayer, check if that tile is in the list
    // made in step 1. If not then change owner to current player.

    // Determine next player
    let nextPlayer = currentPlayer;
    if (updatedCurrentMoves < 1) {
      nextPlayer = otherPlayer;
      updatedCurrentMoves = this.state.nextMoves[nextPlayer - 1];
      updatedNextMoves[currentPlayer - 1] = 2;
      // Clear "played last" flag from new current player's tiles
      for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
          if (updatedTiles[i][j].owner === nextPlayer && updatedTiles[i][j].playedLast)
            updatedTiles[i][j].playedLast = false;
        }
      }
    }
    // Update board state with new data
    this.setState({
      tiles: updatedTiles,
      currentPlayer: nextPlayer,
      currentMoves: updatedCurrentMoves,
      nextMoves: updatedNextMoves
    });
    // End game if king tile is captured
    if (utils.checkWinner(updatedTiles)) {
      return;
    }
  };

  // Restart board (reset to initial state)
  handleBoardRestart = () => {
    this.setState({
      tiles: this.initializeTiles(5, 5),
      currentPlayer: 1,
      currentMoves: 1,
      nextMoves: [2, 2],
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
            <MovesContainer currentPlayer={this.state.currentPlayer}>{`P1 Moves: ${
              this.state.nextMoves[0]
            }, P2 Moves: ${this.state.nextMoves[1]}`}</MovesContainer>
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
