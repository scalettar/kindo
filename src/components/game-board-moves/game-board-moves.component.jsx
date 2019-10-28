import React from "react";

import {
  MovesContainer,
  PipsContainer,
  PipContainer,
  PlayerContainer
} from "./game-board-moves.styles";

class GameBoardMoves extends React.Component {
  getPipColors(player, pipNumber) {
    if (player === this.props.currentPlayer) {
      if (this.props.currentMoves >= pipNumber) return "color";
      else if (this.props.nextMoves[player - 1] >= pipNumber) return "dark";
      else return "neutral";
    } else {
      if ((this.props.nextMoves[player - 1] || 2) >= pipNumber) return "dark";
      else return "neutral";
    }
  }

  render() {
    const { theme } = this.props;
    return (
      <MovesContainer>
        <PlayerContainer>
          <PipsContainer>
            <PipContainer theme={theme} player={1} pipColor={this.getPipColors(1, 1)} />
            <PipContainer theme={theme} player={1} pipColor={this.getPipColors(1, 2)} />
            <PipContainer theme={theme} player={1} pipColor={this.getPipColors(1, 3)} />
            <PipContainer theme={theme} player={1} pipColor={this.getPipColors(1, 4)} />
          </PipsContainer>
        </PlayerContainer>
        <PlayerContainer>
          <PipsContainer>
            <PipContainer theme={theme} player={2} pipColor={this.getPipColors(2, 1)} />
            <PipContainer theme={theme} player={2} pipColor={this.getPipColors(2, 2)} />
            <PipContainer theme={theme} player={2} pipColor={this.getPipColors(2, 3)} />
            <PipContainer theme={theme} player={2} pipColor={this.getPipColors(2, 4)} />
          </PipsContainer>
        </PlayerContainer>
      </MovesContainer>
    );
  }
}

export default GameBoardMoves;
