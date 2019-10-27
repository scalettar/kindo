import React from 'react';

import {
    TileContainer
} from './game-board-tile.styles';

class GameBoardTile extends React.Component {
    getValue(){
        const { data } = this.props;

        if(data.isKing) return "K";
        else if(data.hasWallN) return "^";
        else if(data.hasWallE) return ">";
        else if(data.hasWallS) return "v";
        else if(data.hasWallW) return "<";
        if(data.playedLast) return "o";
        else return null;
    }
    render() {
        const { data, theme, onClick } = this.props;
        return(
        <TileContainer theme={theme} owner={data.owner} onClick={onClick}>
            {this.getValue()}
        </TileContainer>
        );
    }
};

export default GameBoardTile;