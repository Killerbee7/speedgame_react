import "./App.css";
import "./circle.css";
import "./modal.css";
import React, { Component } from "react";
import Circle from "./Circle";
import Modal from "./Modal";

//Sounds
import clicks from "./sound/click.wav";
import wrongClicks from "./sound/wrongclick.wav";
import start from "./sound/gamestartbtn.wav";
import game from "./sound/gameover.wav";
import gameSounds from "./sound/game.wav";



const click =new Audio(clicks);
const wrongClick = new Audio(wrongClicks);
const startBtn = new Audio(start);
const gameOver= new Audio(game)
const gameSound = new Audio(gameSounds);

let randomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1));
};

class App extends Component {
  state = {
    circle: [1, 2, 3, 4],
    score: 0,
    current: 0,
    pace: 1000,
    gameStart: false,
    gameOver: false,
    lives: 3,
    round: 0,
    start: false,
  };

  timer;

  nextCircle = () => {
    if (this.state.lives <= 0) {
      this.stopGameHandler();
      return;
    }

    let nextActive;

    do {
      nextActive = randomNumber(0, this.state.circle.length - 1);
    } while (nextActive === this.state.current);

    this.setState({
      current: nextActive,
    });

    this.timer = setTimeout(this.nextCircle, this.state.pace * 0.85);
  };

  startGameHandler = () => {
    startBtn.play();
    if (this.state.lives === 0) {
      this.stopGameHandler();
    } else {
      gameSound.play();
      console.log("start game");
      this.nextCircle();
      this.setState({
        gameStart: true,
        start: !this.state.start,
      });
    }
  };

  stopGameHandler = () => {
    gameSound.pause();
    gameOver.play();
    clearTimeout(this.timer);
    this.setState({
      current: undefined,
      gameStart: false,
      lives: 3,
      start: false,
      gameOver: true,
    });
  };

  scoreHandler = (i) => {
    if (i === this.state.current) {
      this.setState({
        score: this.state.score + 1,
      });
      click.play();
    } else if (i !== this.state.current) {
      this.setState({
        lives: this.state.lives - 1,
      });
      wrongClick.play();
    }
  };

  closeHandler = () => {
    window.location.reload();
  };

  render() {
    return (
      <div className="App">
        <div className="container">
          <h1>Speed Game</h1>
          <div id="lives">
            <p>
              &hearts; <span id="lives1">{this.state.lives}</span>
            </p>
          </div>

          <h2>
            Score:<span>{this.state.score}</span>{" "}
          </h2>
          <div className="circle">
            {this.state.circle.map((_, i) => (
              <Circle
                key={i}
                click={() => this.scoreHandler(i)}
                id={i + 1}
                active={this.state.current === i}
                activeEvent={this.state.start}
              />
            ))}
          </div>

          {this.state.gameOver && (
            <Modal
              score={this.state.score}
              close={this.closeHandler}
              message={
                this.state.score === 0
                  ? "Try Harder Next Time"
                  : this.state.score <= 10
                  ? `Nice! You scored ${this.state.score}. You are getting better.`
                  : this.state.score >= 20
                  ? `Great! You scored ${this.state.score}. You are awesome.`
                  : `Excellent! You scored ${this.state.score}`
              }
            />
          )}

          <div className="btn">
            {!this.state.gameStart && !this.state.gameOver && (
              <div className="a" onClick={this.startGameHandler}>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                Start Game
              </div>
            )}
            {this.state.gameStart && (
              <div className="a" onClick={this.stopGameHandler}>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                Stop Game
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
