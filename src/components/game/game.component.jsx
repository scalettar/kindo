import React from "react";

import GameTile from "../game-tile/game-tile.component";
import GamePlayers from "../game-players/game-players.component";

import * as utils from "../../utils/functions.utils";

import {
  BackgroundContainer,
  GameContainer,
  GameAreaContainer,
  GameWallMenuContainer,
  WallMenuButtonContainer
} from "./game.styles";

import wallN from "../../assets/wallN.png";
import wallE from "../../assets/wallE.png";
import wallS from "../../assets/wallS.png";
import wallW from "../../assets/wallW.png";

class Game extends React.Component {
  state = {
    theme: "default",
    tiles: this.initializeTiles(),
    tileCount: [1, 1],
    currentPlayer: 1,
    currentMoves: 1,
    nextMoves: [2, 2],
    wallSelection: "None",
    winner: 0
  };

  // Initialize basic tile properties
  initializeTiles() {
    let data = [];

    // Create default tile data
    for (let i = 0; i < 5; i++) {
      data.push([]);
      for (let j = 0; j < 5; j++) {
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
    // End game if king tile is captured
    if (utils.checkWinner(updatedTiles)) {
      return;
    }
    // Perform updates
    if (updatedTiles[x][y].owner === currentPlayer) {
      // If currentPlayer selects tile owned by self
      // Place the currently selected wall in the wall menu unless tile isUnwallable
      if (this.state.wallSelection !== "None" && !updatedTiles[x][y].isUnwallable) {
        updatedCurrentMoves--;
        if (this.state.wallSelection === "N") {
          updatedTiles[x][y].hasWallN = true;
          updatedTiles[x][y].hasWallE = false;
          updatedTiles[x][y].hasWallS = false;
          updatedTiles[x][y].hasWallW = false;
        } else if (this.state.wallSelection === "E") {
          updatedTiles[x][y].hasWallN = false;
          updatedTiles[x][y].hasWallE = true;
          updatedTiles[x][y].hasWallS = false;
          updatedTiles[x][y].hasWallW = false;
        } else if (this.state.wallSelection === "S") {
          updatedTiles[x][y].hasWallN = false;
          updatedTiles[x][y].hasWallE = false;
          updatedTiles[x][y].hasWallS = true;
          updatedTiles[x][y].hasWallW = false;
        } else if (this.state.wallSelection === "W") {
          updatedTiles[x][y].hasWallN = false;
          updatedTiles[x][y].hasWallE = false;
          updatedTiles[x][y].hasWallS = false;
          updatedTiles[x][y].hasWallW = true;
        }
      }
    } else if (updatedTiles[x][y].owner === 0) {
      // If currentPlayer selects unowned tile
      if (utils.checkNeighbors(updatedTiles, x, y, currentPlayer)) {
        updatedTiles[x][y].owner = currentPlayer;
        updatedTiles[x][y].playedLast = true;
        updatedCurrentMoves--;
        updatedTileCount[currentPlayer - 1]++;
      }
      if (currentPlayer === 1);
    } else {
      // If currentPlayer selects tile owned by opponent
      if (utils.checkNeighbors(updatedTiles, x, y, currentPlayer)) {
        if (updatedTiles[x][y].playedLast && updatedNextMoves[otherPlayer - 1] < 4)
          updatedNextMoves[otherPlayer - 1]++;
        updatedTiles[x][y].owner = currentPlayer;
        updatedTiles[x][y].playedLast = true;
        updatedTiles[x][y].hasWallN = false;
        updatedTiles[x][y].hasWallE = false;
        updatedTiles[x][y].hasWallS = false;
        updatedTiles[x][y].hasWallW = false;
        updatedCurrentMoves--;
        updatedTileCount[currentPlayer - 1]++;
        updatedTileCount[otherPlayer - 1]--;
        // Check if any tiles were detached from opponent's king and update accordingly
        let otherPlayerConnectedTiles = utils.checkConnected(updatedTiles, otherPlayer);
        if (otherPlayerConnectedTiles.length < updatedTileCount[otherPlayer - 1]) {
          updatedTiles = utils.changeOwnership(
            updatedTiles,
            otherPlayerConnectedTiles,
            currentPlayer,
            otherPlayer
          );
          if (updatedNextMoves[currentPlayer - 1] < 4) updatedNextMoves[currentPlayer - 1]++;
          let numSwapped = updatedTileCount[otherPlayer - 1] - otherPlayerConnectedTiles.length;
          updatedTileCount[currentPlayer - 1] += numSwapped;
          updatedTileCount[otherPlayer - 1] -= numSwapped;
        }
      }
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
      nextMoves: updatedNextMoves,
      wallSelection: "None"
    });
  };

  // Handle wall menu button clicks
  handleWallMenuButtonClick(wallType) {
    this.setState({ wallSelection: wallType });
  }

  // Restart board (reset to initial state)
  handleBoardRestart = () => {
    this.setState({
      tiles: this.initializeTiles(),
      currentPlayer: 1,
      currentMoves: 1,
      nextMoves: [2, 2],
      tileCount: [1, 1],
      wallSelection: "None",
      winner: 0
    });
  };

  // Load all tiles based on state tile data
  displayBoard(tiles) {
    return tiles.map(row => {
      return row.map(data => {
        return (
          <div key={data.x * row.length + data.y}>
            <GameTile
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
    const { currentPlayer, theme, wallSelection } = this.state;
    // Get winner if exists
    const winner = utils.checkWinner(this.state.tiles);
    // Status message
    let status;
    if (winner) {
      status = `${winner} wins!`;
    } else {
      status = `${this.state.currentPlayer === 1 ? "P1" : "P2"}'s turn.`;
    }
    return (
      <BackgroundContainer theme={this.state.theme}>
        <GameAreaContainer>
          <h2>{status}</h2>
          <GamePlayers
            theme={this.state.theme}
            currentPlayer={this.state.currentPlayer}
            currentMoves={this.state.currentMoves}
            nextMoves={this.state.nextMoves}
          />
          <GameContainer>{this.displayBoard(this.state.tiles)}</GameContainer>
        </GameAreaContainer>
        {winner && (
          <button className="new-game-button" onClick={this.handleBoardRestart}>
            New Game
          </button>
        )}
        <GameWallMenuContainer>
          <WallMenuButtonContainer
            theme={theme}
            currentPlayer={currentPlayer}
            wallSelection={wallSelection}
            wallButtonType="None"
            onClick={() => this.handleWallMenuButtonClick("None")}
          ></WallMenuButtonContainer>
          <WallMenuButtonContainer
            theme={theme}
            currentPlayer={currentPlayer}
            wallSelection={wallSelection}
            wallButtonType="N"
            onClick={() => this.handleWallMenuButtonClick("N")}
          >
            <img style={{ width: "90px", height: "90px" }} alt="crown" src={wallN} />
          </WallMenuButtonContainer>
          <WallMenuButtonContainer
            theme={theme}
            currentPlayer={currentPlayer}
            wallSelection={wallSelection}
            wallButtonType="E"
            onClick={() => this.handleWallMenuButtonClick("E")}
          >
            <img style={{ width: "90px", height: "90px" }} alt="crown" src={wallE} />
          </WallMenuButtonContainer>
          <WallMenuButtonContainer
            theme={theme}
            currentPlayer={currentPlayer}
            wallSelection={wallSelection}
            wallButtonType="S"
            onClick={() => this.handleWallMenuButtonClick("S")}
          >
            <img style={{ width: "90px", height: "90px" }} alt="crown" src={wallS} />
          </WallMenuButtonContainer>
          <WallMenuButtonContainer
            theme={theme}
            currentPlayer={currentPlayer}
            wallSelection={wallSelection}
            wallButtonType="W"
            onClick={() => this.handleWallMenuButtonClick("W")}
          >
            <img style={{ width: "90px", height: "90px" }} alt="crown" src={wallW} />
          </WallMenuButtonContainer>
        </GameWallMenuContainer>
      </BackgroundContainer>
    );
  }
}

export default Game;
