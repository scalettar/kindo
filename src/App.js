import React from 'react';
import { BrowserRouter, Route } from "react-router-dom";

// import HomePage from './pages/home-page/home-page.component';
import GameBoard from './components/game-board/game-board.component';
import Scoreboard from './components/scoreboard/scoreboard.component';

import './App.css';

class App extends React.Component {
  render() {
    return (
      <div className="app">
        <BrowserRouter>
          <Route exact path="/" component={GameBoard} />
          <Route path="/score" component={Scoreboard} />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
