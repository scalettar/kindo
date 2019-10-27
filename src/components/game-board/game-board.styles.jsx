import styled, { css } from "styled-components";

// ------------------------THEMES---------------------
// Use colorhexa to find new color schemes
// THEME: Kindo (Default)
const kindo1 = css`
  background-color: #5abf84;
`;
const kindo2 = css`
  background-color: #ffb473;
`;

// THEME: Cyber
const cyber1 = css`
  background-color: #00f0ff;
`;
const cyber2 = css`
  background-color: #fcee09;
`;
// ---------------------------------------------------

const getPlayerStyles = props => {
  if (props.theme === "cyber") {
    if (props.currentPlayer === 1) return cyber1;
    else if (props.currentPlayer === 2) return cyber2;
  } else {
    if (props.currentPlayer === 1) return kindo1;
    else if (props.currentPlayer === 2) return kindo2;
  }
};

export const BackgroundContainer = styled.div`
  color: grey;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  height: 100vh;
  /* Use colorhexa to find new color schemes */
  /* Theme (Default): Kindo */
  background: #f7f1eb;
  /* Theme: 2077 */
  /* background: #010001; */
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
