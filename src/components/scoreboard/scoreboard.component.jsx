import React from 'react';
import { Link } from 'react-router-dom';

// import Storage from '../../storage/storage.js';

class Scoreboard extends React.Component {
    state = {
        scoreboard: []
    }

    // async componentDidMount() {
    //     let storage = await new Storage.getData();

    //     // After component mounts, load data from local storage
    //     this.setState({
    //         scoreboard: storage
    //     });
    // }

    render() {
        return (
            <div className="game">
                <h1>Recent Games</h1>
                <ul>
                    {this.state.scoreboard.map((leader, key) => {
                        return <li key={key}>{leader}</li>
                    })}
                </ul>
                <Link to="/board">
                    <button className="btn">New Game</button>
                </Link>
            </div>
        )
    }
}

export default Scoreboard;