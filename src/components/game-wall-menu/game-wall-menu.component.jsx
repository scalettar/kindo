import React from "react";

import { GameWallMenuContainer, WallMenuButtonContainer } from "./game-wall-menu.styles";

import wallN from "../../assets/wallN.png";
import wallE from "../../assets/wallE.png";
import wallS from "../../assets/wallS.png";
import wallW from "../../assets/wallW.png";

class GameWallMenu extends React.Component {
  state = {
    wallSelection: "None"
  };

  handleClick(wallType) {
    this.setState({ wallSelection: wallType });
  }

  render() {
    return (
      <GameWallMenuContainer>
        <WallMenuButtonContainer
          theme={this.props.theme}
          currentPlayer={this.props.currentPlayer}
          wallSelection={this.state.wallSelection}
          wallButtonType="None"
          onClick={() => this.handleClick("None")}
        ></WallMenuButtonContainer>
        <WallMenuButtonContainer
          theme={this.props.theme}
          currentPlayer={this.props.currentPlayer}
          wallSelection={this.state.wallSelection}
          wallButtonType="N"
          onClick={() => this.handleClick("N")}
        >
          <img style={{ width: "90px", height: "90px" }} alt="crown" src={wallN} />
        </WallMenuButtonContainer>
        <WallMenuButtonContainer
          theme={this.props.theme}
          currentPlayer={this.props.currentPlayer}
          wallSelection={this.state.wallSelection}
          wallButtonType="E"
          onClick={() => this.handleClick("E")}
        >
          <img style={{ width: "90px", height: "90px" }} alt="crown" src={wallE} />
        </WallMenuButtonContainer>
        <WallMenuButtonContainer
          theme={this.props.theme}
          currentPlayer={this.props.currentPlayer}
          wallSelection={this.state.wallSelection}
          wallButtonType="S"
          onClick={() => this.handleClick("S")}
        >
          <img style={{ width: "90px", height: "90px" }} alt="crown" src={wallS} />
        </WallMenuButtonContainer>
        <WallMenuButtonContainer
          theme={this.props.theme}
          currentPlayer={this.props.currentPlayer}
          wallSelection={this.state.wallSelection}
          wallButtonType="W"
          onClick={() => this.handleClick("W")}
        >
          <img style={{ width: "90px", height: "90px" }} alt="crown" src={wallW} />
        </WallMenuButtonContainer>
      </GameWallMenuContainer>
    );
  }
}

export default GameWallMenu;
