import React from 'react';

import {
    TileContainer
} from './game-board-tile.styles';

const GameBoardTile = (props) => (
    <TileContainer onClick={props.onClick}>
        {props.value}
    </TileContainer>
);

export default GameBoardTile;