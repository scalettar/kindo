import React from "react";

import GameBoardTile from "../game-board-tile/game-board-tile.component";

import * as utils from "../../utils/functions.utils";

import { BackgroundContainer, GameBoardContainer } from "./game-board.styles";

class GameBoard extends React.Component {
  state = {
    theme: "default",
    tiles: this.initializeTiles(5, 5),
    isP1Turn: true,
    p1Moves: 1,
    p2Moves: 2
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
          isWallN: false,
          isWallE: false,
          isWallS: false,
          isWallW: false,
          playedLast: false
        };
      }
    }
    // Set king tiles
    data[0][4].owner = 2;
    data[4][0].owner = 1;

    // console.log(data);
    return data;
  }

  // Handle tile clicks
  handleTileClick = (x, y) => {
    // Get current state of tiles
    // const tiles = this.state.tiles.slice();
    // Check if tile is valid move
    // if (!utils.validMove) {
    //   return;
    // }
    // End game if board is in winning state
    // if (utils.checkWinner(tiles) || tiles[index]) {
    //   return;
    // }
    // Update tile
    let updatedTiles = this.state.tiles;
    if(this.state.isP1Turn && this.state.tiles[x][y].owner !== 1) {
      updatedTiles[x][y].owner = 1;
    }
    // Update board state with new data
    this.setState({
      tiles: updatedTiles,
      isP1Turn: !this.state.isP1Turn
    });
  };

  // Restart board (reset to initial state)
  handleBoardRestart = () => {
    this.setState({
      tiles: this.initializeTiles(5, 5),
      isP1Turn: true,
      p1Moves: 1,
      p2Moves: 2
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
      status = `${this.state.isP1Turn ? "P1" : "P2"}'s turn.`;
    }

    return (
      <BackgroundContainer>
        <div className="board-wrapper">
          <div className="board">
            <h2 className="board-heading">{status}</h2>
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
