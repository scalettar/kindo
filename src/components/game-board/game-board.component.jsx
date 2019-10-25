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
    console.log(data);
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
  displayBoard(tiles){
    return tiles.map((row) => {
      return row.map((data) => {
        return(
          <div key={data.x * row.length + data.y}>
            <GameBoardTile 
            onClick={() => this.handleTileClick(data.x, data.y)}
            data={data}
            />
          </div>
        )
      })
    })
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
              {/* <GameBoardTile theme={theme} owner={owner} value={tiles[0]} onClick={() => this.handleTileClick(0)} />
              <GameBoardTile theme={theme} owner={owner} value={tiles[1]} onClick={() => this.handleTileClick(1)} />
              <GameBoardTile theme={theme} owner={owner} value={tiles[2]} onClick={() => this.handleTileClick(2)} />
              <GameBoardTile theme={theme} owner={owner} value={tiles[3]} onClick={() => this.handleTileClick(3)} />
              <GameBoardTile theme={theme} owner={owner} value={tiles[4]} onClick={() => this.handleTileClick(4)} />
              <GameBoardTile theme={theme} owner={owner} value={tiles[5]} onClick={() => this.handleTileClick(5)} />
              <GameBoardTile theme={theme} owner={owner} value={tiles[6]} onClick={() => this.handleTileClick(6)} />
              <GameBoardTile theme={theme} owner={owner} value={tiles[7]} onClick={() => this.handleTileClick(7)} />
              <GameBoardTile theme={theme} owner={owner} value={tiles[8]} onClick={() => this.handleTileClick(8)} />
              <GameBoardTile theme={theme} owner={owner} value={tiles[9]} onClick={() => this.handleTileClick(9)} />
              <GameBoardTile theme={theme} owner={owner} value={tiles[10]} onClick={() => this.handleTileClick(10)} />
              <GameBoardTile theme={theme} owner={owner} value={tiles[11]} onClick={() => this.handleTileClick(11)} />
              <GameBoardTile theme={theme} owner={owner} value={tiles[12]} onClick={() => this.handleTileClick(12)} />
              <GameBoardTile theme={theme} owner={owner} value={tiles[13]} onClick={() => this.handleTileClick(13)} />
              <GameBoardTile theme={theme} owner={owner} value={tiles[14]} onClick={() => this.handleTileClick(14)} />
              <GameBoardTile theme={theme} owner={owner} value={tiles[15]} onClick={() => this.handleTileClick(15)} />
              <GameBoardTile theme={theme} owner={owner} value={tiles[16]} onClick={() => this.handleTileClick(16)} />
              <GameBoardTile theme={theme} owner={owner} value={tiles[17]} onClick={() => this.handleTileClick(17)} />
              <GameBoardTile theme={theme} owner={owner} value={tiles[18]} onClick={() => this.handleTileClick(18)} />
              <GameBoardTile theme={theme} owner={owner} value={tiles[19]} onClick={() => this.handleTileClick(19)} />
              <GameBoardTile theme={theme} owner={owner} value={tiles[20]} onClick={() => this.handleTileClick(20)} />
              <GameBoardTile theme={theme} owner={owner} value={tiles[21]} onClick={() => this.handleTileClick(21)} />
              <GameBoardTile theme={theme} owner={owner} value={tiles[22]} onClick={() => this.handleTileClick(22)} />
              <GameBoardTile theme={theme} owner={owner} value={tiles[23]} onClick={() => this.handleTileClick(23)} />
              <GameBoardTile theme={theme} owner={owner} value={tiles[24]} onClick={() => this.handleTileClick(24)} /> */}
              { this.displayBoard(this.state.tiles)}
            </GameBoardContainer>
          </div>
          {winner && (
            <button className="board__btn btn" onClick={this.handleBoardRestart}>
              New Game
            </button>
          )}
        </div>
      </BackgroundContainer>
    );
  }
}

export default GameBoard;
