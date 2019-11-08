import styled, { css } from "styled-components";

import { getBackground, getNeutral, getP1, getP2 } from "../../themes/themes.styles";

const getBackgroundStyles = props => {
  return getBackground(props.theme);
};

const getButtonStyles = props => {
  if(props.winner===1) return getP1(props.theme);
  else if (props.winner===2) return getP2(props.theme);
  else return getNeutral(props.theme);
}

export const BackgroundContainer = styled.div`
  color: grey;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  ${getBackgroundStyles}
`;

export const BoardContainer = styled.div`
  width: 500px;
  height: 500px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: space-around;
  justify-content: space-around;
`;

export const BoardAndWallContainer = styled.div`
  width: 650px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const GameAreaContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const NewGameButtonContainer = styled.button`
  margin: 15px;
  border: none;
  border-radius: 5px;
  width: 150px;
  height: 40px;
  font-size: 20px;
  color: white;
  ${getButtonStyles}
`;

// ==================================WALL MENU=================================

const wallSelected = css`
  opacity: 0.5;
`;

const getWallMenuTileStyles = props => {
  if (props.currentPlayer === 1) return getP1(props.theme);
  else return getP2(props.theme);
};

const getSelectedStyles = props => {
  if (props.wallSelection === props.wallButtonType) return wallSelected;
};

export const GameWallMenuContainer = styled.div`
  height: 500px;
  width: 100px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

export const WallMenuTileContainer = styled.button`
  width: 90px;
  height: 90px;
  border-radius: 5px;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  &:focus {
    outline: none;
  }
  &:hover {
    opacity: 0.5;
  }
  ${getWallMenuTileStyles}
  ${getSelectedStyles}
`;
