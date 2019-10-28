import styled from "styled-components";

import {
  kindoBackground,
  kindoP1,
  kindoP2,
  cyberBackground,
  cyberP1,
  cyberP2
} from "../../themes/themes.styles";

const getBackgroundStyles = props => {
  if (props.theme === "cyber") return cyberBackground;
  else return kindoBackground;
};

const getPlayerStyles = props => {
  if (props.theme === "cyber") {
    if (props.currentPlayer === 1) return cyberP1;
    else if (props.currentPlayer === 2) return cyberP2;
  } else {
    if (props.currentPlayer === 1) return kindoP1;
    else if (props.currentPlayer === 2) return kindoP2;
  }
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

export const GameBoardContainer = styled.div`
  width: 500px;
  height: 500px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: space-around;
  align-items: center;
  justify-content: space-around;
  justify-items: center;
`;

export const MovesContainer = styled.h3`
  color: white;
  padding: 5px;
  width: 50%;
  border-radius: 5px;
  ${getPlayerStyles}
`;
