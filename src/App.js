import "./App.css";
import "./circle.css";
import "./modal.css"
import React, { Component } from "react";
import Circle from "./Circle";
import Modal from "./Modal";

let randomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1));
};

class App extends Component {
  state = {
    circle: [1, 2, 3, 4],
    score: 0,
    current: 0,
    pace:1000,
    gameStart: false,
    gameOver: false,
    lives: 3,
    round: 0,
    start:false,
  };
   
  timer;


  nextCircle= () => {
    let nextActive;

    do {
      nextActive=randomNumber(0, this.state.circle.length-1)
    }
    while(nextActive === this.state.current)
  
    this.setState({
      current: nextActive,
      lives: this.state.lives -1
    })

    this.timer= setTimeout(this.nextCircle, this.state.pace*0.95);
  }



  startGameHandler = () => {
    if(this.state.lives===0){
      this.stopGameHandler();
    }
    else{
    console.log("start game")
    this.nextCircle();
    this.setState({
      gameStart: true,
      start:!this.state.start,
     
    })
  }
    };

  stopGameHandler = () => {
    
    clearTimeout(this.timer);
    this.setState({
      current: undefined,
      gameStart: false,
      lives: 3,
      start: false,
      gameOver: true,
    })
    
  
  };

  scoreHandler = (i) => {

    if(i===this.state.current){
    this.setState({ 
      score: this.state.score + 1,
      
     });
    }


    else if(i!==this.state.current){
      this.setState({ 
        lives: this.state.lives-1, 
      });
        if(this.state.lives== 0){
          this.stopGameHandler();
        }
      }
    };

    closeHandler = () => {
      window.location.reload();
    }

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
              <Circle key={i} click={() => this.scoreHandler(i)} id={i + 1}
              active= {this.state.current===i}
              activeEvent={this.state.start} />
            ))}
          </div>

          {this.state.gameOver &&
          (<Modal
          score={this.state.score}
          close={this.closeHandler}
          />)}

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
