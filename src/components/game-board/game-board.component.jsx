import React from "react";
// import { Link } from "react-router-dom";

import GameBoardTile from "../game-board-tile/game-board-tile.component";

import * as utils from "../../utils/functions.utils";

import { BackgroundContainer, GameBoardContainer } from "./game-board.styles";

class GameBoard extends React.Component {
  constructor(props){
    super(props)
    // Initialize board state
    this.state = {
      tiles: Array(25).fill(null),
      p1Next: true
    }
  };

  // Handle tile clicks
  handleTileClick(index) {
    // Get current state of tiles
    const tiles = this.state.tiles.slice();
    // End game if board is in winning state
    if(utils.checkWinner(tiles) || tiles[index]) {
      return;
    }
    // Update tile
    tiles[index] = this.state.p1Next ? 'x' : 'o';
    // Update board state with new data
    this.setState({
      tiles: tiles,
      p1Next: !this.state.p1Next
    })
  };

  // Restart board (reset to initial state)
  handleBoardRestart = () => {
    this.setState({
      tiles: Array(25).fill(null),
      p1Next: true
    })
  };

  render() {
    // Get winner if exists
    const winner = utils.checkWinner(this.state.tiles);
    // Status message
    let status;
    if (winner) {
      // Winner exists
      status = `${winner} wins!`;
    } else {
      // No winner yet, next turn
      status = `${(this.state.p1Next ? 'P1' : 'P2')}'s turn.`;
    }

    return (
      <BackgroundContainer>
        {/* <Link to="/" className="board-link">Scoreboard</Link> */}
        <div className="board-wrapper">
          <div className="board">
            <h2 className="board-heading">{status}</h2>
            <GameBoardContainer>
              <GameBoardTile value={this.state.tiles[0]} onClick={() => this.handleTileClick(0)}/>
              <GameBoardTile value={this.state.tiles[1]} onClick={() => this.handleTileClick(1)} />
              <GameBoardTile value={this.state.tiles[2]} onClick={() => this.handleTileClick(2)} />
              <GameBoardTile value={this.state.tiles[3]} onClick={() => this.handleTileClick(3)} />
              <GameBoardTile value={this.state.tiles[4]} onClick={() => this.handleTileClick(4)} />
              <GameBoardTile value={this.state.tiles[5]} onClick={() => this.handleTileClick(5)} />
              <GameBoardTile value={this.state.tiles[6]} onClick={() => this.handleTileClick(6)} />
              <GameBoardTile value={this.state.tiles[7]} onClick={() => this.handleTileClick(7)} />
              <GameBoardTile value={this.state.tiles[8]} onClick={() => this.handleTileClick(8)} />
              <GameBoardTile value={this.state.tiles[9]} onClick={() => this.handleTileClick(9)} />
              <GameBoardTile value={this.state.tiles[10]} onClick={() => this.handleTileClick(10)} />
              <GameBoardTile value={this.state.tiles[11]} onClick={() => this.handleTileClick(11)} />
              <GameBoardTile value={this.state.tiles[12]} onClick={() => this.handleTileClick(12)} />
              <GameBoardTile value={this.state.tiles[13]} onClick={() => this.handleTileClick(13)} />
              <GameBoardTile value={this.state.tiles[14]} onClick={() => this.handleTileClick(14)} />
              <GameBoardTile value={this.state.tiles[15]} onClick={() => this.handleTileClick(15)} />
              <GameBoardTile value={this.state.tiles[16]} onClick={() => this.handleTileClick(16)} />
              <GameBoardTile value={this.state.tiles[17]} onClick={() => this.handleTileClick(17)} />
              <GameBoardTile value={this.state.tiles[18]} onClick={() => this.handleTileClick(18)} />
              <GameBoardTile value={this.state.tiles[19]} onClick={() => this.handleTileClick(19)} />
              <GameBoardTile value={this.state.tiles[20]} onClick={() => this.handleTileClick(20)} />
              <GameBoardTile value={this.state.tiles[21]} onClick={() => this.handleTileClick(21)} />
              <GameBoardTile value={this.state.tiles[22]} onClick={() => this.handleTileClick(22)} />
              <GameBoardTile value={this.state.tiles[23]} onClick={() => this.handleTileClick(23)} />
              <GameBoardTile value={this.state.tiles[24]} onClick={() => this.handleTileClick(24)} />
            </GameBoardContainer>
          </div>
          { winner && <button className="board__btn btn" onClick={this.handleBoardRestart}>New Game</button> }
      </div>
    </BackgroundContainer>
    )
  }
};

export default GameBoard;
