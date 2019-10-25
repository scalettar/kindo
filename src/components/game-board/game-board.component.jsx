import React from "react";
// import { Link } from "react-router-dom";

import GameBoardTile from "../game-board-tile/game-board-tile.component";

import * as utils from "../../utils/functions.utils";

import { BackgroundContainer, GameBoardContainer } from "./game-board.styles";

class GameBoard extends React.Component {
  // constructor(props) {
  //   super(props);
  //   // Initialize board state
  //   this.state = INITIAL_STATE;
  // }
  state = {
    tiles: this.initializeTiles(5, 5),
    // tiles: Array(25).fill(null),
    p1Next: true
  };

  // Initialize basic tile properties
  initializeTiles(height, width) {
    let data = [];

    for (let i = 0; i < height; i++) {
      data.push([]);
      for (let j = 0; j < width; j++) {
        data[i][j] = {
          x: i,
          y: j,
          owner: 0,
          king: false,
          wallN: false,
          wallE: false,
          wallS: false,
          wallW: false,
          playedLast: false,
          theme: "default"
        };
      }
    }
    // Kings
    data[0][4].owner = 2;
    data[4][0].owner = 1;
    // console.log(data);
    return data;
  }

  // Handle tile clicks
  handleTileClick = index => {
    // Get current state of tiles
    const tiles = this.state.tiles.slice();
    // End game if board is in winning state
    if (utils.checkWinner(tiles) || tiles[index]) {
      return;
    }
    // Update tile
    tiles[index] = this.state.p1Next ? "x" : "o";
    // Update board state with new data
    this.setState({
      tiles: tiles,
      p1Next: !this.state.p1Next
    });
  };

  // Restart board (reset to initial state)
  handleBoardRestart = () => {
    this.setState({
      height: 5,
      width: 5,
      tiles: this.initializeTiles(this.height, this.width),
      // tiles: Array(25).fill(null),
      p1Next: true
    });
  };

  // Load all tiles based on tile properties in state
  displayBoard(tiles) {
    return tiles.map(row => {
      return row.map(data => {
        return (
          <div key={data.x * row.length + data.y}>
            {console.log("datax: " + data.x)}
            {console.log("datay: " + data.y)}
            <GameBoardTile onClick={() => this.handleTileClick(data.x, data.y)} data={data}/>
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
      status = `${this.state.p1Next ? "P1" : "P2"}'s turn.`;
    }

    return (
      <BackgroundContainer>
        {/* <Link to="/" className="board-link">Scoreboard</Link> */}
        <div className="board-wrapper">
          <div className="board">
            <h2 className="board-heading">{status}</h2>
            <GameBoardContainer>
              {this.displayBoard(this.state.tiles)}
            </GameBoardContainer>
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
