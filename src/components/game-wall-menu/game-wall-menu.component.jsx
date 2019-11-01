import React from "react";

import GameTile from "../game-tile/game-tile.component";

import { GameWallMenuContainer } from "./game-wall-menu.styles";

class GameWallMenu extends React.Component {
  handleTileClick() {
    return;
  }

  render() {
    return (
      <GameWallMenuContainer>
        <GameTile
          onClick={() => this.handleTileClick()}
          data={this.props.data}
          theme={this.props.theme}
        />
        <GameTile
          onClick={() => this.handleTileClick()}
          data={this.props.data}
          theme={this.props.theme}
        />
        <GameTile
          onClick={() => this.handleTileClick()}
          data={this.props.data}
          theme={this.props.theme}
        />
        <GameTile
          onClick={() => this.handleTileClick()}
          data={this.props.data}
          theme={this.props.theme}
        />
        <GameTile
          onClick={() => this.handleTileClick()}
          data={this.props.data}
          theme={this.props.theme}
        />
      </GameWallMenuContainer>
    );
  }
}

export default GameWallMenu;
