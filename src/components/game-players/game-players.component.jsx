import React from "react";

import GamePip from "../game-pip/game-pip.component";

import {
  AvatarContainer,
  PipsContainer,
  PlayerContainer,
  PlayersContainer
} from "./game-players.styles";

class GamePlayers extends React.Component {
  getPipColors(player, pipNumber) {
    if (player === this.props.currentPlayer) {
      if (this.props.currentMoves >= pipNumber) return "color";
      else if (this.props.nextMoves[player - 1] >= pipNumber) return "dark";
      else return "empty";
    } else {
      if ((this.props.nextMoves[player - 1] || 2) >= pipNumber) return "dark";
      else return "empty";
    }
  }

  render() {
    const { theme } = this.props;
    return (
      <PlayersContainer>
        <PlayerContainer>
          <AvatarContainer theme={theme} player={1} />
          <PipsContainer>
            <GamePip theme={theme} player={1} pipColor={this.getPipColors(1, 1)} />
            <GamePip theme={theme} player={1} pipColor={this.getPipColors(1, 2)} />
            <GamePip theme={theme} player={1} pipColor={this.getPipColors(1, 3)} />
            <GamePip theme={theme} player={1} pipColor={this.getPipColors(1, 4)} />
          </PipsContainer>
        </PlayerContainer>
        <PlayerContainer>
          <AvatarContainer theme={theme} player={2} />
          <PipsContainer>
            <GamePip theme={theme} player={2} pipColor={this.getPipColors(2, 1)} />
            <GamePip theme={theme} player={2} pipColor={this.getPipColors(2, 2)} />
            <GamePip theme={theme} player={2} pipColor={this.getPipColors(2, 3)} />
            <GamePip theme={theme} player={2} pipColor={this.getPipColors(2, 4)} />
          </PipsContainer>
        </PlayerContainer>
      </PlayersContainer>
    );
  }
}

export default GamePlayers;
