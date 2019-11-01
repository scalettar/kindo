import React from "react";

import { PlayedLastContainer, TileContainer } from "./game-tile.styles";

import crown from "./crown.png";
import wallN from "./wallN.png";
import wallE from "./wallE.png";
import wallS from "./wallS.png";
import wallW from "./wallW.png";

class GameTile extends React.Component {
  getValue() {
    const { data } = this.props;

    if (data.isKing)
      return <img style={{ width: "90px", height: "90px" }} alt="crown" src={crown} />;
    else if (data.hasWallN)
      return <img style={{ width: "90px", height: "90px" }} alt="crown" src={wallN} />;
    else if (data.hasWallE)
      return <img style={{ width: "90px", height: "90px" }} alt="crown" src={wallE} />;
    else if (data.hasWallS)
      return <img style={{ width: "90px", height: "90px" }} alt="crown" src={wallS} />;
    else if (data.hasWallW)
      return <img style={{ width: "90px", height: "90px" }} alt="crown" src={wallW} />;
    if (data.playedLast) return <PlayedLastContainer></PlayedLastContainer>;
    // if (data.isUnwallable) return <UnwallableContainer></UnwallableContainer>;
    else return null;
  }
  render() {
    const { data, theme, onClick } = this.props;
    return (
      <TileContainer theme={theme} owner={data.owner} onClick={onClick}>
        {this.getValue()}
      </TileContainer>
    );
  }
}

export default GameTile;
