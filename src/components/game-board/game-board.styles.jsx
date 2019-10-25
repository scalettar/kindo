import styled from "styled-components";

export const BackgroundContainer = styled.div`
  color: grey;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  height: 100vh;
  /* Theme (Default): Kindo */
  background: #fff8f2;
  /* Theme: 2077 */
  /* background: #010001; */
`;

export const GameBoardContainer = styled.div`
  /* border: 3px solid grey; */
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
