import React from 'react';
import { BrowserRouter, Route } from "react-router-dom";

// import HomePage from './pages/home-page/home-page.component';
import Game from './components/game/game.component';

import './App.css';

class App extends React.Component {
  render() {
    return (
      <div className="app">
        <BrowserRouter>
          <Route exact path="/" component={Game} />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
