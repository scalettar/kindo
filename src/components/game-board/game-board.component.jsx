import React from "react";

import GameBoardTile from "../game-board-tile/game-board-tile.component";
import GameBoardPlayers from "../game-board-players/game-board-players.component";

import * as utils from "../../utils/functions.utils";

import { BackgroundContainer, GameBoardContainer } from "./game-board.styles";

class GameBoard extends React.Component {
  state = {
    theme: "default",
    tiles: this.initializeTiles(5, 5),
    tileCount: [1, 1],
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
    let otherPlayer = currentPlayer === 1 ? 2 : 1;
    // Define variables to update for next setState
    let updatedTiles = this.state.tiles.slice();
    let updatedTileCount = this.state.tileCount;
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
        updatedTileCount[currentPlayer - 1]++;
      }
      if (currentPlayer === 1);
    } else {
      if (utils.checkNeighbors(updatedTiles, x, y, currentPlayer)) {
        if (updatedTiles[x][y].playedLast && updatedNextMoves[otherPlayer - 1] < 4)
          updatedNextMoves[otherPlayer - 1]++;
        updatedTiles[x][y].owner = currentPlayer;
        updatedTiles[x][y].playedLast = true;
        updatedCurrentMoves--;
        updatedTileCount[currentPlayer - 1]++;
        updatedTileCount[otherPlayer - 1]--;
      }
    }
    // Check if any tiles detached from king and update accordingly
    let otherPlayerConnectedTiles = utils.checkConnected(updatedTiles, otherPlayer);
    console.log("connected list: " + otherPlayerConnectedTiles);
    if (otherPlayerConnectedTiles.length < updatedTileCount[otherPlayer - 1]) {
      updatedTiles = utils.changeOwnership(
        updatedTiles,
        otherPlayerConnectedTiles,
        currentPlayer,
        otherPlayer
      );
      if(updatedNextMoves[currentPlayer - 1] < 4) updatedNextMoves[currentPlayer - 1]++;
      let numSwapped = updatedTileCount[otherPlayer - 1] - otherPlayerConnectedTiles.length;
      updatedTileCount[currentPlayer - 1] += numSwapped;
      updatedTileCount[otherPlayer - 1] -= numSwapped;
    }
    // Determine next player
    let nextPlayer = currentPlayer;
    if (updatedCurrentMoves < 1) {
      nextPlayer = otherPlayer;
      updatedCurrentMoves = this.state.nextMoves[nextPlayer - 1];
      updatedNextMoves[nextPlayer - 1] = 2;
      // Clear "played last" flag from new current player's tiles
      updatedTiles = utils.clearPlayedLast(updatedTiles, otherPlayer);
    }
    // Update board state with new data
    this.setState({
      tiles: updatedTiles,
      tileCount: updatedTileCount,
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
      tileCount: [1, 1],
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
    // Logs
    console.log("# of Tiles (P1, P2): " + this.state.tileCount[0] + ", " + this.state.tileCount[1]);
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
            <GameBoardPlayers
              theme={this.state.theme}
              currentPlayer={this.state.currentPlayer}
              currentMoves={this.state.currentMoves}
              nextMoves={this.state.nextMoves}
            />
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
