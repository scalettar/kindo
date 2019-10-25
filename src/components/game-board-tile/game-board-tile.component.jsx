import React from 'react';

import {
    TileContainer
} from './game-board-tile.styles';

const GameBoardTile = (props) => (
    <TileContainer owner={props.data.owner} onClick={props.onClick}>
        {props.data.owner}
    </TileContainer>
);

export default GameBoardTile;