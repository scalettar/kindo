import styled, {css} from "styled-components";

import { getBackground, getP1, getP2 } from "../../themes/themes.styles";

const getBackgroundStyles = props => {
  return getBackground(props.theme);
};

export const BackgroundContainer = styled.div`
  color: grey;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  height: 100vh;
  ${getBackgroundStyles}
`;

export const GameAreaContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const GameContainer = styled.div`
  width: 500px;
  height: 500px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: space-around;
  justify-content: space-around;
`;

const wallSelected = css`
  opacity: 0.7;
`;

// ==================================WALL MENU=================================

const getButtonStyles = props => {
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
  flex-direction: row;
  justify-content: center;
`;

export const WallMenuButtonContainer = styled.button`
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
    opacity: 0.9;
  }
  ${getButtonStyles}
  ${getSelectedStyles}
`;