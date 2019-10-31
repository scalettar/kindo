import styled from "styled-components";

import { getBackground } from "../../themes/themes.styles";

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

export const GameBoardContainer = styled.div`
  width: 500px;
  height: 500px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: space-around;
  justify-content: space-around;
`;
