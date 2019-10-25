import React from 'react';

import {
    TileContainer
} from './game-board-tile.styles';

class GameBoardTile extends React.Component {
    getValue(){
        const { data } = this.props;

        if(data.isKing) return "K";
        else if(data.isWallN) return "^";
        else if(data.isWallE) return ">";
        else if(data.isWallS) return "v";
        else if(data.isWallW) return "<";
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