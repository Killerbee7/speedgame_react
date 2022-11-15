import "./App.css";
import "./circle.css";
import React, { Component } from "react";
import Circle from "./Circle";

let randomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1));
};

class App extends Component {
  state = {
    circle: [1, 2, 3, 4],
    score: 0,
    current: 0,
  };

  startGameHandler = (e) => {
    console.log("start game");
  };

  stopGameHandler = (e) => {
    console.log("stop game");
  };

  scoreHandler = (i) => {
    this.setState({ score: this.state.score + 1 });
  };

  render() {
    return (
      <div className="App">
        <div className="container">
          <h1>Speed Game</h1>
          <div id="lives">
            <p>
              &hearts; <span id="lives1">3</span>
            </p>
          </div>

          <h2>
            Score:<span>{this.state.score}</span>{" "}
          </h2>
          <div className="circle">
            {this.state.circle.map((_, i) => (
              <Circle key={i} click={() => this.scoreHandler(i)} id={i + 1} />
            ))}
          </div>

          <div className="btn">
            <a href="#" onClick={this.startGameHandler}>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              Start Game
            </a>
            <a href="#" onClick={this.stopGameHandler}>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              Stop Game
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
