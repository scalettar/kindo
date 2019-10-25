// NOTE: Not currently in use

import React from "react";

import GameBoard from "../../components/game-board/game-board.component";

import { GameBoardContainer, HomePageContainer } from "./home-page.styles";

const HomePage = () => (
  <HomePageContainer>
    <GameBoardContainer>
      <GameBoard />
    </GameBoardContainer>
  </HomePageContainer>
);

export default HomePage;
