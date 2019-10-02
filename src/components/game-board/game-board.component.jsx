import React from "react";

import GameBoardTile from "../game-board-tile/game-board-tile.component";

import { GameBoardContainer } from "./game-board.styles";

const GameBoard = () => (
  <GameBoardContainer>
    {/* Loop over GameTile component to generate 5x5 board */}
    <GameBoardTile />
    <GameBoardTile />
    <GameBoardTile />
    <GameBoardTile />
    <GameBoardTile />
    <GameBoardTile />
    <GameBoardTile />
    <GameBoardTile />
    <GameBoardTile />
    <GameBoardTile />
    <GameBoardTile />
    <GameBoardTile />
    <GameBoardTile />
    <GameBoardTile />
    <GameBoardTile />
    <GameBoardTile />
    <GameBoardTile />
    <GameBoardTile />
    <GameBoardTile />
    <GameBoardTile />
    <GameBoardTile />
    <GameBoardTile />
    <GameBoardTile />
    <GameBoardTile />
    <GameBoardTile />
    <GameBoardTile />
  </GameBoardContainer>
);

export default GameBoard;
