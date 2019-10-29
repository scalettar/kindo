import styled from "styled-components";

import {
  kindoBackground,
  cyberBackground,
} from "../../themes/themes.styles";

const getBackgroundStyles = props => {
  if (props.theme === "cyber") return cyberBackground;
  else return kindoBackground;
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