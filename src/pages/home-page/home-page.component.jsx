// NOTE: Not currently in use

import React from "react";

import Game from "../../components/game-board/game-board.component";

import { GameContainer, HomePageContainer } from "./home-page.styles";

const HomePage = () => (
  <HomePageContainer>
    <GameContainer>
      <Game />
    </GameContainer>
  </HomePageContainer>
);

export default HomePage;
