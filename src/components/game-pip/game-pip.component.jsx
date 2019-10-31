import React from "react";

import {
    PipContainer
} from "./game-pip.styles";

const GamePip = ({theme, player, pipColor}) => (
    <PipContainer theme={theme} player={player} pipColor={pipColor} />
);

export default GamePip;